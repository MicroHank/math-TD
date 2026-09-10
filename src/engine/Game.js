// Main Game Engine for Math Tower Defense
import { Tower, TOWER_TYPES } from '../entities/Tower.js';
import { Particle, CoinFloat } from '../entities/Projectile.js';
import { WaveManager } from '../levels/WaveManager.js';
import { LEVELS } from '../levels/LevelData.js';
import { progress } from './ProgressManager.js';
import { sound } from './Audio.js';
import { SpellManager } from './SpellManager.js';
import { GeometricResonanceManager } from './GeometricResonanceManager.js';
import { LcmMergeManager } from './LcmMergeManager.js';
import { techTree } from './TechTreeManager.js';
import { endlessManager } from './EndlessManager.js';
import { TutorialManager } from './TutorialManager.js';

export function distToSegment(p, v, w) {
  const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
}

export class Game {
  constructor(canvas, uiCallbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ui = uiCallbacks || {};

    // 遊戲參數與經濟
    this.gameMode = 'adventure'; // 'adventure', 'endless', 'boss_rush', 'tutorial'
    this.bossRushStageIndex = 1;
    this.currentLevelId = '1-1';
    this.currentLevel = LEVELS['1-1'];
    this.gold = this.currentLevel.initialGold + techTree.getInitialGoldBonus();
    const baseInitialLives = (this.currentLevel.initialLives || 10);
    this.lives = Math.max(25, baseInitialLives * 2);
    this.maxLives = this.lives;
    this.gameSpeed = 1;
    this.isPaused = false;
    this.isGameOver = false;
    this.isGameOverReported = false;

    // 世界維度與虛擬攝影機 (支援隨關卡循序漸進地圖尺度)
    this.worldWidth = this.currentLevel.worldWidth || 960;
    this.worldHeight = this.currentLevel.worldHeight || 560;
    this.camera = {
      x: 0,
      y: 0,
      width: 960,
      height: 560
    };

    // 教學學院管理器
    this.tutorialManager = new TutorialManager(this);

    // 指揮官主動秘術與算力管理器
    this.spellManager = new SpellManager(this);

    // 模組二：幾何共鳴矩陣管理器
    this.resonanceManager = new GeometricResonanceManager(this);

    // 模組三：公倍數合體危機管理器
    this.lcmManager = new LcmMergeManager(this);

    // 地圖路線點 (支援單路或多路)
    this.lanes = this.currentLevel.lanes;
    this.buildPads = this.currentLevel.buildPads ? this.currentLevel.buildPads.map(p => ({ ...p, tower: null })) : [];

    // 實體清單
    this.monsters = [];
    this.towers = [];
    this.projectiles = [];
    this.monsterProjectiles = [];
    this.beams = [];
    this.particles = [];
    this.coinFloats = [];
    this.activeBoss = null;

    this.waveManager = new WaveManager(this.currentLevel);

    // 互動狀態：防禦塔拖曳、地圖平移、自由建造點
    this.selectedBuildType = null;
    this.selectedTower = null;
    this.selectedPad = null;
    this.selectedBuildPos = null; // 自由地面建造點 { x, y }
    this.mousePos = { x: -100, y: -100 }; // 世界座標
    this.mouseScreenPos = { x: -100, y: -100 }; // 螢幕座標
    this.hoveredPad = null;

    // 視野平移與小地圖拖曳
    this.isPanningCamera = false;
    this.panStartCamera = { x: 0, y: 0 };
    this.mouseDownScreenPos = { x: 0, y: 0 };
    this.isDraggingMiniMap = false;

    // 時間
    this.lastTime = performance.now();
    this.portalPulse = 0;

    this.initCanvasDPI();
    this.setupEvents();
    queueMicrotask(() => this.syncUI());

    // 啟動主迴圈
    requestAnimationFrame(this.loop.bind(this));
  }

  clampCamera() {
    const maxX = Math.max(0, this.worldWidth - this.camera.width);
    const maxY = Math.max(0, this.worldHeight - this.camera.height);
    this.camera.x = Math.max(0, Math.min(maxX, this.camera.x));
    this.camera.y = Math.max(0, Math.min(maxY, this.camera.y));
  }

  getCoreEndPoints() {
    const endPoints = [];
    if (this.lanes) {
      for (const lane of this.lanes) {
        if (!lane || lane.length === 0) continue;
        const pt = lane[lane.length - 1];
        if (!endPoints.some(ep => Math.hypot(ep.x - pt.x, ep.y - pt.y) < 25)) {
          endPoints.push(pt);
        }
      }
    }
    return endPoints;
  }

  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.camera.x,
      y: screenY + this.camera.y
    };
  }

  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.camera.x,
      y: worldY - this.camera.y
    };
  }

  isValidTowerPosition(x, y, ignoreTower = null) {
    const padMargin = 32;
    if (x < padMargin || x > this.worldWidth - padMargin || y < padMargin || y > this.worldHeight - padMargin) {
      return false;
    }

    // 與怪物行走路線中心距離 (至少 32px，不阻擋道路行進)
    const minPathDist = 32;
    if (this.lanes) {
      for (const lane of this.lanes) {
        for (let i = 0; i < lane.length - 1; i++) {
          const d = distToSegment({ x, y }, lane[i], lane[i + 1]);
          if (d < minPathDist) return false;
        }
      }
    }

    // 與其他防禦塔保持距離 (至少 40px)
    const minTowerDist = 40;
    for (const t of this.towers) {
      if (t === ignoreTower) continue;
      if (Math.hypot(t.x - x, t.y - y) < minTowerDist) return false;
    }

    return true;
  }

  selectBuildPos(pos) {
    this.selectedBuildPos = pos;
    if (this.ui.onBuildPosSelect) {
      this.ui.onBuildPosSelect(pos);
    }
  }

  syncPanelPositions() {
    if (this.ui.onSyncPanels) {
      this.ui.onSyncPanels();
    }
  }

  loadLevel(levelId, mode = 'adventure', stageIndex = 1) {
    let levelData;
    if (mode === 'tutorial' || (typeof levelId === 'string' && levelId.startsWith('tutorial_'))) {
      this.gameMode = 'tutorial';
      this.currentLevelId = levelId;
      levelData = LEVELS[levelId] || LEVELS['tutorial_master'];
      if (this.tutorialManager) {
        this.tutorialManager.startLesson(levelId);
      }
    } else if (mode === 'endless' || (typeof levelId === 'string' && levelId.startsWith('endless'))) {
      this.gameMode = 'endless';
      this.endlessMapId = (typeof stageIndex === 'string' ? stageIndex : (typeof levelId === 'string' && levelId !== 'endless' ? levelId : 'endless_delta'));
      this.currentLevelId = this.endlessMapId;
      levelData = endlessManager.getEndlessLevelConfig(1, this.endlessMapId);
      if (this.tutorialManager) this.tutorialManager.stopLesson();
    } else if (mode === 'boss_rush' || (typeof levelId === 'string' && levelId.startsWith('boss_rush'))) {
      this.gameMode = 'boss_rush';
      this.bossRushStageIndex = stageIndex || (parseInt(levelId.split('_')[2]) || 1);
      this.currentLevelId = `boss_rush_${this.bossRushStageIndex}`;
      levelData = endlessManager.getBossRushLevelConfig(this.bossRushStageIndex);
      if (this.tutorialManager) this.tutorialManager.stopLesson();
    } else {
      this.gameMode = 'adventure';
      levelData = LEVELS[levelId] || LEVELS['1-1'];
      this.currentLevelId = levelId;
      if (this.tutorialManager) this.tutorialManager.stopLesson();
    }

    this.currentLevel = levelData;
    this.gold = (levelData.initialGold !== undefined ? levelData.initialGold : (levelData.gold || 200)) + techTree.getInitialGoldBonus();
    const baseInitialLives = (levelData.initialLives || 10);
    this.lives = Math.max(25, baseInitialLives * 2);
    this.maxLives = this.lives;
    this.lanes = levelData.lanes;
    this.buildPads = levelData.buildPads ? levelData.buildPads.map(p => ({ ...p, tower: null })) : [];

    // 世界維度與攝影機初始化 (隨關卡循序漸進，並自動偵測基座與路徑極限座標作為防呆保護)
    let autoMaxX = 960;
    let autoMaxY = 560;
    if (this.lanes) {
      for (const lane of this.lanes) {
        for (const pt of lane) {
          if (pt.x > autoMaxX) autoMaxX = Math.round(pt.x + 80);
          if (pt.y > autoMaxY) autoMaxY = Math.round(pt.y + 80);
        }
      }
    }
    if (this.buildPads) {
      for (const pad of this.buildPads) {
        if (pad.x > autoMaxX) autoMaxX = Math.round(pad.x + 80);
        if (pad.y > autoMaxY) autoMaxY = Math.round(pad.y + 80);
      }
    }

    this.worldWidth = levelData.worldWidth || autoMaxX;
    this.worldHeight = levelData.worldHeight || autoMaxY;

    const coreEndPoints = this.getCoreEndPoints();
    if (coreEndPoints.length > 0 && this.lanes && this.lanes[0] && this.lanes[0].length > 0) {
      const pEnd = coreEndPoints[0];
      const pStart = this.lanes[0][0];
      // 若核心位於地圖中央區域 (如 World 4 與 World 5)，開局鏡頭聚焦於中央守護核心
      const isCenterCore = Math.abs(pEnd.x - this.worldWidth / 2) < this.worldWidth * 0.18 &&
                           Math.abs(pEnd.y - this.worldHeight / 2) < this.worldHeight * 0.18;
      if (isCenterCore) {
        this.camera.x = Math.max(0, Math.min(this.worldWidth - this.camera.width, pEnd.x - this.camera.width / 2));
        this.camera.y = Math.max(0, Math.min(this.worldHeight - this.camera.height, pEnd.y - this.camera.height / 2));
      } else {
        this.camera.x = Math.max(0, Math.min(this.worldWidth - this.camera.width, pStart.x - 150));
        this.camera.y = Math.max(0, Math.min(this.worldHeight - this.camera.height, pStart.y - 200));
      }
    } else {
      this.camera.x = 0;
      this.camera.y = 0;
    }
    this.clampCamera();

    this.monsters = [];
    this.towers = [];
    this.projectiles = [];
    this.monsterProjectiles = [];
    this.beams = [];
    this.particles = [];
    this.coinFloats = [];
    this.activeBoss = null;
    this.selectedTower = null;
    this.selectedPad = null;
    this.selectedBuildPos = null;
    this.selectedBuildType = null;
    this.dragTargetTower = null;
    this.isDraggingTower = false;
    this.isPanningCamera = false;
    this.isGameOver = false;
    this.isGameOverReported = false;

    if (this.spellManager) {
      this.spellManager.reset();
    }
    if (this.resonanceManager) {
      this.resonanceManager.recalculate();
    }

    this.waveManager = new WaveManager(levelData);
    this.syncUI();
  }

  initCanvasDPI() {
    const dpr = window.devicePixelRatio || 1;
    this.logicalWidth = 960;
    this.logicalHeight = 560;
    this.camera.width = this.logicalWidth;
    this.camera.height = this.logicalHeight;
    this.canvas.width = this.logicalWidth * dpr;
    this.canvas.height = this.logicalHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  setupEvents() {
    const getCoords = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.logicalWidth / rect.width;
      const scaleY = this.logicalHeight / rect.height;
      const screenX = (clientX - rect.left) * scaleX;
      const screenY = (clientY - rect.top) * scaleY;
      const worldX = screenX + this.camera.x;
      const worldY = screenY + this.camera.y;
      return { screenX, screenY, worldX, worldY };
    };

    const handlePointerDown = (clientX, clientY) => {
      sound.init();
      if (this.isGameOver) return;

      const { screenX, screenY, worldX, worldY } = getCoords(clientX, clientY);

      // 0. 點擊戰略小地圖跳轉視野
      if (this.handleMiniMapClick(screenX, screenY)) {
        this.isDraggingMiniMap = true;
        return;
      }

      // 1. 若處於秘術瞄準施法狀態 -> 施放秘術
      if (this.spellManager && this.spellManager.isAiming) {
        this.spellManager.castAt(worldX, worldY);
        this.syncUI();
        return;
      }

      this.mouseDownScreenPos = { x: screenX, y: screenY };
      this.mouseDownWorldPos = { x: worldX, y: worldY };

      // 啟動攝影機視野拖曳準備 (若未拖曳則在 pointerUp 中進行點選判定)
      this.isPanningCamera = true;
      this.panStartCamera = { x: this.camera.x, y: this.camera.y };
      this.canvas.style.cursor = 'grab';
    };

    const handlePointerMove = (clientX, clientY) => {
      const { screenX, screenY, worldX, worldY } = getCoords(clientX, clientY);
      this.mouseScreenPos = { x: screenX, y: screenY };
      this.mousePos = { x: worldX, y: worldY };

      // A. 小地圖拖曳視野
      if (this.isDraggingMiniMap) {
        this.handleMiniMapClick(screenX, screenY);
        return;
      }

      // B. 拖曳地圖視野平移
      if (this.isPanningCamera) {
        const dx = screenX - this.mouseDownScreenPos.x;
        const dy = screenY - this.mouseDownScreenPos.y;
        if (Math.hypot(dx, dy) > 3) {
          this.camera.x = this.panStartCamera.x - dx;
          this.camera.y = this.panStartCamera.y - dy;
          this.clampCamera();
          this.canvas.style.cursor = 'grabbing';
          this.syncPanelPositions();
        }
        return;
      }

      // C. 常態懸停基座
      this.hoveredPad = this.buildPads.find(p => Math.hypot(p.x - worldX, p.y - worldY) <= 32);
    };

    const handlePointerUp = (clientX, clientY) => {
      if (this.isDraggingMiniMap) {
        this.isDraggingMiniMap = false;
        return;
      }

      const { screenX, screenY, worldX, worldY } = getCoords(clientX, clientY);

      // 結束地圖視野平移 / 點擊基座或砲塔判定
      if (this.isPanningCamera) {
        const moved = Math.hypot(screenX - this.mouseDownScreenPos.x, screenY - this.mouseDownScreenPos.y);
        this.isPanningCamera = false;
        this.canvas.style.cursor = 'default';

        if (moved <= 6) {
          // 原地輕點：優先檢測是否點擊在已有防禦塔上 (半徑 30)
          const clickedTower = this.towers.find(
            t => Math.hypot(t.x - worldX, t.y - worldY) <= 30
          );

          if (clickedTower) {
            this.selectTower(clickedTower);
            this.selectPad(null);
            this.selectBuildPos(null);
            this.syncUI();
            return;
          }

          // 原地輕點地面：檢查是否點在空基座上 (半徑 30)
          const clickedEmptyPad = this.buildPads.find(
            p => !p.tower && Math.hypot(p.x - worldX, p.y - worldY) <= 30
          );

          if (clickedEmptyPad) {
            this.selectTower(null);
            this.selectPad(clickedEmptyPad);
            this.selectBuildPos({ x: clickedEmptyPad.x, y: clickedEmptyPad.y });
          } else {
            // 點在空白地面 -> 取消選取 (關閉面板)
            this.selectTower(null);
            this.selectPad(null);
            this.selectBuildPos(null);
          }
          this.syncUI();
        }
      }
    };

    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) handlePointerDown(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isPanningCamera || this.dragTargetTower || this.isDraggingMiniMap) {
        handlePointerMove(e.clientX, e.clientY);
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isPanningCamera && !this.dragTargetTower && !this.isDraggingMiniMap) {
        handlePointerMove(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (this.isPanningCamera || this.dragTargetTower || this.isDraggingMiniMap) {
        handlePointerUp(e.clientX, e.clientY);
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      if (!this.isPanningCamera && !this.dragTargetTower) {
        this.mousePos.x = -100;
        this.mousePos.y = -100;
        this.hoveredPad = null;
      }
    });

    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.spellManager && this.spellManager.isAiming) {
        this.spellManager.cancelAiming();
        this.syncUI();
      }
    });

    // 觸控支援
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if ((this.isPanningCamera || this.dragTargetTower || this.isDraggingMiniMap) && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (this.isPanningCamera || this.dragTargetTower || this.isDraggingMiniMap) {
        const t = e.changedTouches[0] || { clientX: 0, clientY: 0 };
        handlePointerUp(t.clientX, t.clientY);
      }
    });
  }

  selectBuildType(typeKey) {
    this.selectedBuildType = typeKey;
    this.syncUI();
  }

  selectPad(pad) {
    this.selectedPad = pad;
    if (this.ui.onPadSelect) {
      this.ui.onPadSelect(pad);
    }
  }

  selectTower(tower) {
    this.selectedTower = tower;
    if (this.ui.onTowerSelect) {
      this.ui.onTowerSelect(tower);
    }
  }

  getTowerTypeCount(towerTypeOrKey) {
    const config = TOWER_TYPES[towerTypeOrKey];
    const targetType = config ? config.type : towerTypeOrKey;
    return this.towers.filter(t => t.type === targetType).length;
  }

  canBuildTowerType(towerTypeOrKey, padOrTower = this.selectedPad) {
    const config = TOWER_TYPES[towerTypeOrKey];
    const targetType = config ? config.type : towerTypeOrKey;
    const category = config ? config.category : null;

    // 質數重砲不受限制；代數與力場以及複合神塔，所有型號全場最多各只能建造 1 座
    const isLimited = category === 'special' || category === 'fusion' ||
      ['absolute', 'sqrt', 'operator', 'zero', 'trig', 'fusion_6', 'fusion_15', 'fusion_abs_sqrt', 'fusion_factorial', 'fusion_derivative', 'fusion_monte_carlo'].includes(targetType);

    if (!isLimited) return true;

    const existingTower = padOrTower && (padOrTower.tower ? padOrTower.tower : (padOrTower.type ? padOrTower : null));
    const isSameType = existingTower && existingTower.type === targetType;
    const count = this.getTowerTypeCount(targetType) - (isSameType ? 1 : 0);

    return count < 1;
  }

  getSpecialTowerCount() {
    return this.towers.filter(t => (t.isSpecialTower ? t.isSpecialTower() : ['absolute', 'sqrt', 'operator', 'zero', 'trig'].includes(t.type))).length;
  }

  getFusionTowerCount() {
    return this.towers.filter(t => (t.isFusionTower ? t.isFusionTower() : ['fusion_6', 'fusion_15', 'fusion_abs_sqrt', 'fusion_factorial', 'fusion_derivative', 'fusion_monte_carlo'].includes(t.type))).length;
  }

  getFactorialTowerCount() {
    return this.getTowerTypeCount('fusion_factorial');
  }

  canBuildFactorialTower(padOrTower = this.selectedPad) {
    return this.canBuildTowerType('FUSION_FACTORIAL', padOrTower);
  }

  canBuildSpecialTower(pad = this.selectedPad) {
    return true;
  }

  canBuildFusionTower(padOrTower = this.selectedPad) {
    return true;
  }

  buildTowerOnSelectedPad(towerType, pad = this.selectedPad) {
    const config = TOWER_TYPES[towerType];
    if (!config) return false;

    let targetX = pad ? pad.x : (this.selectedBuildPos ? this.selectedBuildPos.x : null);
    let targetY = pad ? pad.y : (this.selectedBuildPos ? this.selectedBuildPos.y : null);

    if (targetX === null || targetY === null) return false;

    // 檢查全場限建
    if (!this.canBuildTowerType(towerType, pad)) {
      sound.playResist();
      this.coinFloats.push(new CoinFloat({
        x: targetX,
        y: targetY - 20,
        text: `⚠️ ${config.name} 全場限建 1 座！`,
        color: '#ec4899'
      }));
      return false;
    }

    // 若非固定基座，需驗證自由座標合法性 (不靠近怪物路線、不與其他塔重疊)
    if (!pad && !this.isValidTowerPosition(targetX, targetY)) {
      sound.playResist();
      this.coinFloats.push(new CoinFloat({
        x: targetX,
        y: targetY - 20,
        text: `⚠️ 無法建在此處 (靠近路線或重疊)！`,
        color: '#f43f5e'
      }));
      return false;
    }

    const techDiscount = (config.type === 'prime' ? techTree.getPrimeUpgradeDiscount() : 0);
    const finalCost = Math.round(config.cost * (1 - techDiscount));

    if (this.gold >= finalCost) {
      this.gold -= finalCost;

      const existingTower = pad && pad.tower;
      if (existingTower) {
        this.towers = this.towers.filter(t => t !== existingTower);
      }

      const tower = new Tower({
        id: `t_${Date.now()}_${Math.random()}`,
        x: Math.round(targetX),
        y: Math.round(targetY),
        type: config.type,
        range: config.range,
        fireRate: config.fireRate,
        damage: config.damage,
        cost: finalCost,
        color: config.color,
        label: config.label,
        factor: config.factor
      });

      if (pad) {
        pad.tower = tower;
      } else {
        const nearbyPad = this.buildPads.find(p => !p.tower && Math.hypot(p.x - targetX, p.y - targetY) <= 24);
        if (nearbyPad) nearbyPad.tower = tower;
      }

      this.towers.push(tower);
      sound.playBuild();
      this.createSparks(targetX, targetY, config.color, 14);

      // 建造完成，關閉建造面板
      this.selectPad(null);
      this.selectBuildPos(null);
      this.selectTower(null);
      this.selectedBuildType = null;

      if (this.resonanceManager) {
        this.resonanceManager.recalculate();
      }
      this.syncUI();
      return true;
    } else {
      sound.playResist();
      return false;
    }
  }

  buildTower(pad, config) {
    const finalCost = config.cost;
    this.gold -= finalCost;

    const tower = new Tower({
      id: `t_${Date.now()}_${Math.random()}`,
      x: pad.x,
      y: pad.y,
      type: config.type,
      range: config.range,
      fireRate: config.fireRate,
      damage: config.damage,
      cost: finalCost,
      color: config.color,
      label: config.label,
      factor: config.factor
    });

    pad.tower = tower;
    this.towers.push(tower);
    sound.playBuild();
    this.createSparks(pad.x, pad.y, config.color, 14);
    // 建立好砲塔時，先不直接出現升級選單，等待玩家點擊砲塔再出現升級選單
    this.selectTower(null);
    if (this.resonanceManager) {
      this.resonanceManager.recalculate();
    }
  }

  upgradeSelectedTowerStat(statType) {
    if (!this.selectedTower) return false;

    // n! 階乘神塔為終極神域，無法升級
    if (this.selectedTower.type === 'fusion_factorial' || !this.selectedTower.isUpgradeable) {
      sound.playResist();
      this.coinFloats.push(new CoinFloat({
        x: this.selectedTower.x,
        y: this.selectedTower.y - 20,
        text: '⚠️ n! 階乘神塔為終極神域，無法升級！',
        color: '#ec4899'
      }));
      return false;
    }

    let cost = 0;
    let canUpgrade = false;

    if (statType === 'range') {
      cost = this.selectedTower.getUpgradeRangeCost();
      canUpgrade = this.selectedTower.rangeLevel < this.selectedTower.maxRangeLevel;
    } else if (statType === 'damage') {
      cost = this.selectedTower.getUpgradeDamageCost();
      canUpgrade = this.selectedTower.damageLevel < this.selectedTower.maxDamageLevel;
    } else if (statType === 'speed') {
      cost = this.selectedTower.getUpgradeSpeedCost();
      canUpgrade = this.selectedTower.speedLevel < this.selectedTower.maxSpeedLevel;
    }

    if (canUpgrade && cost > 0 && this.gold >= cost) {
      this.gold -= cost;
      let sparkColor = '#38bdf8';
      if (statType === 'range') {
        this.selectedTower.upgradeRange();
        sparkColor = '#38bdf8';
      } else if (statType === 'damage') {
        this.selectedTower.upgradeDamage();
        sparkColor = '#f43f5e';
      } else if (statType === 'speed') {
        this.selectedTower.upgradeSpeed();
        sparkColor = '#eab308';
      }
      this.createSparks(this.selectedTower.x, this.selectedTower.y, sparkColor, 16);
      this.syncUI();
      if (this.ui.onTowerSelect) this.ui.onTowerSelect(this.selectedTower);
      return true;
    } else {
      sound.playResist();
      return false;
    }
  }

  upgradeSelectedTower() {
    if (!this.selectedTower) return;

    // n! 階乘神塔為終極神域，無法升級
    if (this.selectedTower.type === 'fusion_factorial' || !this.selectedTower.isUpgradeable) {
      sound.playResist();
      this.coinFloats.push(new CoinFloat({
        x: this.selectedTower.x,
        y: this.selectedTower.y - 20,
        text: '⚠️ n! 階乘神塔為終極神域，無法升級！',
        color: '#ec4899'
      }));
      return;
    }

    const cost = this.selectedTower.upgradeCost;
    if (cost > 0 && this.gold >= cost) {
      this.gold -= cost;
      this.selectedTower.upgrade();
      this.createSparks(this.selectedTower.x, this.selectedTower.y, '#f59e0b', 16);
      this.syncUI();
      if (this.ui.onTowerSelect) this.ui.onTowerSelect(this.selectedTower);
    } else {
      sound.playResist();
    }
  }

  sellSelectedTower() {
    if (!this.selectedTower) return;
    const pad = this.buildPads.find(p => p.tower === this.selectedTower);
    const refundRatio = 0.7;
    const refund = Math.floor(this.selectedTower.totalInvested * refundRatio);
    this.addGold(refund, this.selectedTower.x, this.selectedTower.y);

    if (pad) pad.tower = null;
    this.towers = this.towers.filter(t => t !== this.selectedTower);
    sound.playEliminate();
    this.selectTower(null);
    if (this.resonanceManager) {
      this.resonanceManager.recalculate();
    }
    this.syncUI();
  }

  startNextWave() {
    if (this.waveManager.startNextWave()) {
      sound.playWaveComplete();
      // 模組四：量子數論核心 (每波開始時立即全額回滿算力)
      if (techTree.hasQuantumRefill() && this.spellManager) {
        this.spellManager.mana = this.spellManager.maxMana;
      }
      this.syncUI();
    }
  }

  toggleSpeed() {
    if (this.gameSpeed === 5) {
      this.gameSpeed = 1;
    } else {
      this.gameSpeed++;
    }
    this.syncUI();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.syncUI();
  }

  addMonster(monster) {
    this.monsters.push(monster);
  }

  spawnSplitClone(parentMonster, newVal) {
    const clone = new (parentMonster.constructor)({
      id: `m_split_${Date.now()}_${Math.random()}`,
      value: newVal,
      waypoints: parentMonster.waypoints,
      speed: parentMonster.speed * 1.15,
      splitOnDivide: false,
      hpMultiplier: parentMonster.hpMultiplier || 1.0
    });
    clone.x = parentMonster.x + (Math.random() * 16 - 8);
    clone.y = parentMonster.y + (Math.random() * 16 - 8);
    clone.currentWaypointIndex = parentMonster.currentWaypointIndex;
    clone.progress = Math.max(0, parentMonster.progress - 10);
    this.monsters.push(clone);
    this.createSparks(clone.x, clone.y, '#fbbf24', 10);
  }

  spawnCantorSubSwarm(parentMonster) {
    const subVal = Math.max(2, Math.floor(Math.abs(parentMonster.originalValue || parentMonster.value) / 3));
    const nextDepth = (parentMonster.cantorDepth || 0) + 1;
    for (let i = 0; i < 2; i++) {
      const offset = (i === 0 ? -12 : 12);
      const dust = new (parentMonster.constructor)({
        id: `m_cantor_${Date.now()}_${i}_${Math.random()}`,
        value: subVal,
        waypoints: parentMonster.waypoints,
        speed: parentMonster.baseSpeed * 1.35,
        isCantor: true,
        cantorDepth: nextDepth,
        hpMultiplier: (parentMonster.hpMultiplier || 1.0) * 0.75
      });
      dust.x = parentMonster.x + offset;
      dust.y = parentMonster.y + offset;
      dust.currentWaypointIndex = parentMonster.currentWaypointIndex;
      dust.progress = Math.max(0, parentMonster.progress + (i === 0 ? -8 : 8));
      dust.addFloatingText('🪓 康托爾三分塵埃!', '#facc15');
      this.monsters.push(dust);
      this.createSparks(dust.x, dust.y, '#facc15', 10);
    }
  }

  addProjectile(proj) {
    this.projectiles.push(proj);
  }

  addMonsterProjectile(proj) {
    this.monsterProjectiles.push(proj);
  }

  repairSelectedTower() {
    if (!this.selectedTower) return false;
    if (this.selectedTower.repair) {
      const ok = this.selectedTower.repair(this);
      if (ok) {
        this.syncUI();
        if (this.ui.onTowerSelect) this.ui.onTowerSelect(this.selectedTower);
      }
      return ok;
    }
    return false;
  }

  addBeam(beam) {
    this.beams.push(beam);
  }

  addGold(amount, x, y) {
    this.gold += amount;
    this.coinFloats.push(new CoinFloat({ x, y, amount }));
    this.syncUI();
  }

  damageBase(amount = 1) {
    // 教學關卡不計算核心被破壞的數量
    const isTutorial = this.gameMode === 'tutorial' || (this.currentLevelId && this.currentLevelId.startsWith('tutorial'));
    if (isTutorial) {
      return;
    }
    this.lives = Math.max(0, this.lives - amount);
    this.syncUI();
    if (this.lives <= 0) {
      this.isGameOver = true;
    }
  }

  createSparks(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 100;
      this.particles.push(new Particle({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        radius: 2 + Math.random() * 2.5,
        maxLife: 0.4 + Math.random() * 0.3
      }));
    }
  }

  createExplosion(x, y, color, count = 20) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 140;
      this.particles.push(new Particle({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        radius: 3 + Math.random() * 3,
        maxLife: 0.6 + Math.random() * 0.4
      }));
    }
  }

  onWaveCompleted() {
    sound.playWaveComplete();
    const completedWaveNum = this.waveManager.currentWaveIndex;
    const chapterNum = parseInt(this.currentLevelId.split('-')[0]) || 1;
    const isBossStage = this.currentLevelId.endsWith('-4');
    const multiplier = (1 + (chapterNum - 1) * 0.4) * (isBossStage ? 1.3 : 1.0);
    const bonus = Math.round((70 + completedWaveNum * 30) * multiplier);
    this.addGold(bonus, 480, 280);

    // 每波完成獲得 +1 點數論研究院科技研究點數 (教學關卡與無盡模式不給予科研獎勵)
    const isTutorialLevel = this.gameMode === 'tutorial' || (this.currentLevelId && this.currentLevelId.startsWith('tutorial'));
    const isEndlessLevel = this.gameMode === 'endless' || this.currentLevelId === 'endless' || (this.waveManager && this.waveManager.isEndlessMode);
    if (!isTutorialLevel && !isEndlessLevel) {
      progress.addTechPoints(1);
      this.coinFloats.push(new CoinFloat({ x: 480, y: 230, text: '✨ 研究點數 +1 ⭐', color: '#38bdf8' }));
    }

    this.syncUI();
  }

  onLevelCompleted() {
    sound.playWaveComplete();
    let stars = 1;
    if (this.lives === this.maxLives) {
      stars = 3;
    } else if (this.lives >= Math.ceil(this.maxLives * 0.5)) {
      stars = 2;
    }

    // 教學學院模式勝利結算 (無科研獎勵)
    if (this.gameMode === 'tutorial' || (this.currentLevelId && this.currentLevelId.startsWith('tutorial'))) {
      const isMaster = this.currentLevelId === 'tutorial_master';
      const rewardText = isMaster ? '🎓 特訓通關！已掌握全塔功用！' : '🎓 課堂特訓通關！已掌握該塔克制技巧！';
      this.coinFloats.push(new CoinFloat({ x: 480, y: 230, text: rewardText, color: '#38bdf8' }));
      if (this.ui.onLevelVictory) {
        this.ui.onLevelVictory({
          levelId: this.currentLevelId,
          levelName: this.currentLevel.name,
          stars: stars,
          isTutorial: true,
          nextLevelId: this.currentLevel.nextLevelId
        });
      }
      this.syncUI();
      return;
    }

    // 魔王連戰勝利結算
    if (this.gameMode === 'boss_rush') {
      progress.updateBossRushRecord(this.bossRushStageIndex);
      progress.addTechPoints(3);
      this.coinFloats.push(new CoinFloat({ x: 480, y: 230, text: '👑 魔王討伐！研究點數 +3 ⭐', color: '#fbbf24' }));
      if (this.ui.onLevelVictory) {
        this.ui.onLevelVictory({
          levelId: this.currentLevelId,
          levelName: this.currentLevel.name,
          stars: stars,
          isBossRush: true,
          bossRushStage: this.bossRushStageIndex,
          nextLevelId: this.bossRushStageIndex < 5 ? `boss_rush_${this.bossRushStageIndex + 1}` : null
        });
      }
      this.syncUI();
      return;
    }

    // 完成常規關卡最後一波獲得 +1 點數論研究院科技研究點數
    progress.addTechPoints(1);
    this.coinFloats.push(new CoinFloat({ x: 480, y: 230, text: '✨ 研究點數 +1 ⭐', color: '#38bdf8' }));

    progress.completeLevel(this.currentLevelId, stars, this.currentLevel.nextLevelId);

    if (this.ui.onLevelVictory) {
      this.ui.onLevelVictory({
        levelId: this.currentLevelId,
        levelName: this.currentLevel.name,
        stars: stars,
        nextLevelId: this.currentLevel.nextLevelId
      });
    }
    this.syncUI();
  }

  syncUI() {
    if (this.ui.onStatsChange) {
      const waveData = this.waveManager.currentWaveData;
      const totalWaves = this.waveManager.totalWaves;
      const remainingEnemies = (this.waveManager.spawnQueue ? this.waveManager.spawnQueue.length : 0) + this.monsters.length;

      this.ui.onStatsChange({
        gold: this.gold,
        lives: this.lives,
        maxLives: this.maxLives,
        gameMode: this.gameMode,
        isTutorial: this.gameMode === 'tutorial',
        tutorialStep: (this.tutorialManager && this.tutorialManager.isTutorialActive)
          ? this.tutorialManager.getCurrentStepInfo(this.waveManager.currentWaveIndex)
          : null,
        bossRushStageIndex: this.bossRushStageIndex,
        wave: this.waveManager.currentWaveIndex + (this.waveManager.waveInProgress ? 1 : 0),
        displayWaveNumber: this.waveManager.currentWaveIndex + 1,
        totalWaves: totalWaves,
        remainingEnemies: remainingEnemies,
        waveTitle: waveData ? waveData.title : '關卡挑戰成功！',
        waveTip: waveData ? waveData.tip : '防守核心完好，準備前進下一關！',
        waveInProgress: this.waveManager.waveInProgress,
        isLevelFinished: this.waveManager.isLevelFinished,
        gameSpeed: this.gameSpeed,
        isPaused: this.isPaused,
        selectedBuildType: this.selectedBuildType,
        selectedTower: this.selectedTower,
        selectedPad: this.selectedPad,
        isGameOver: this.isGameOver,
        currentLevelId: this.currentLevelId,
        currentLevelName: this.currentLevel.name,
        mana: this.spellManager ? Math.round(this.spellManager.mana) : 100,
        maxMana: this.spellManager ? this.spellManager.maxMana : 100,
        spellCooldowns: this.spellManager ? this.spellManager.cooldowns : {},
        aimingSpell: this.spellManager ? this.spellManager.aimingSpell : null,
        isOverdriveActive: this.spellManager ? this.spellManager.isOverdriveActive : false,
        overdriveRemaining: this.spellManager ? +this.spellManager.goldenOverdriveTimer.toFixed(1) : 0,
        matrix: this.resonanceManager ? this.resonanceManager.getStats() : {},
        activeBoss: this.activeBoss ? {
          name: this.activeBoss.bossName,
          value: this.activeBoss.value,
          originalValue: this.activeBoss.originalValue,
          percent: Math.max(0, Math.min(100, Math.round((Math.abs(this.activeBoss.value) / Math.abs(this.activeBoss.originalValue)) * 100)))
        } : null
      }, this);
    }
  }

  restart() {
    if (this.gameMode === 'endless') {
      this.loadLevel(this.currentLevelId, 'endless', this.endlessMapId);
    } else if (this.gameMode === 'boss_rush') {
      this.loadLevel(this.currentLevelId, 'boss_rush', this.bossRushStageIndex);
    } else {
      this.loadLevel(this.currentLevelId, this.gameMode);
    }
  }

  // 更新邏輯
  update(dt) {
    if (this.isPaused || this.isGameOver) return;

    this.portalPulse += dt * 2.5;

    // 定期同步 UI (更新剩餘怪量與狀態)
    this.uiSyncTimer = (this.uiSyncTimer || 0) - dt;
    if (this.uiSyncTimer <= 0) {
      this.syncUI();
      this.uiSyncTimer = 0.25;
    }

    // 波次生成器
    this.waveManager.update(dt, this);

    // 尋找當前魔王
    this.activeBoss = this.monsters.find(m => m.isBoss && !m.isDead) || null;

    // 更新怪物
    for (let i = this.monsters.length - 1; i >= 0; i--) {
      const m = this.monsters[i];
      m.update(dt, this);
      if (m.isDead) {
        this.monsters.splice(i, 1);
      }
    }

    // 更新秘術管理器
    if (this.spellManager) {
      this.spellManager.update(dt);
    }

    // 更新幾何共鳴矩陣
    if (this.resonanceManager) {
      this.resonanceManager.update(dt);
    }

    // 更新公倍數合體危機管理器
    if (this.lcmManager) {
      this.lcmManager.update(dt);
    }

    // 更新防禦塔
    for (const t of this.towers) {
      t.update(dt, this.monsters, this);
    }

    // 更新子彈與光束
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt, this);
      if (p.isDead) this.projectiles.splice(i, 1);
    }

    // 更新怪物反擊砲彈
    for (let i = this.monsterProjectiles.length - 1; i >= 0; i--) {
      const mp = this.monsterProjectiles[i];
      mp.update(dt, this);
      if (mp.isDead) this.monsterProjectiles.splice(i, 1);
    }

    for (let i = this.beams.length - 1; i >= 0; i--) {
      const b = this.beams[i];
      b.update(dt, this);
      if (b.isDead) this.beams.splice(i, 1);
    }

    // 更新粒子與浮動金幣
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.update(dt);
      if (pt.isDead) this.particles.splice(i, 1);
    }

    for (let i = this.coinFloats.length - 1; i >= 0; i--) {
      const cf = this.coinFloats[i];
      cf.update(dt);
      if (cf.isDead) this.coinFloats.splice(i, 1);
    }

    // 檢查行列式方陣奇異矩陣坍縮
    this.checkDeterminantQuads();
  }

  // 行列式方陣共鳴檢查 (det = ad - bc = 0)
  checkDeterminantQuads() {
    if (!this.monsters || this.monsters.length < 2) return;
    const quads = new Map();
    for (const m of this.monsters) {
      if (m.isDead || !m.determinantQuadId) continue;
      if (!quads.has(m.determinantQuadId)) quads.set(m.determinantQuadId, []);
      quads.get(m.determinantQuadId).push(m);
    }

    for (const [quadId, members] of quads.entries()) {
      if (members.length < 2) continue;
      const a = members.find(m => m.detIndex === 0);
      const b = members.find(m => m.detIndex === 1);
      const c = members.find(m => m.detIndex === 2);
      const d = members.find(m => m.detIndex === 3);

      if (a && b && c && d) {
        const valA = typeof a.value === 'number' ? a.value : 0;
        const valB = typeof b.value === 'number' ? b.value : 0;
        const valC = typeof c.value === 'number' ? c.value : 0;
        const valD = typeof d.value === 'number' ? d.value : 0;
        const det = valA * valD - valB * valC;

        if (det === 0) {
          sound.playEliminate();
          for (const m of members) {
            m.addFloatingText('💥 det=0 奇異矩陣坍縮 (3倍金幣)!', '#f59e0b');
            this.addGold(Math.max(35, Math.floor(Math.abs(m.originalValue || m.value) * 1.5)), m.x, m.y);
            this.createExplosion(m.x, m.y, '#f59e0b', 35);
            m.isDead = true;
          }
        }
      }
    }
  }
  // 繪製地圖與背景（支援大世界、多起點與幾何斜線路徑）
  drawMap() {
    const ctx = this.ctx;
    const w = this.worldWidth;
    const h = this.worldHeight;

    // 1. 科技深色網格背景 (覆蓋全地圖大世界)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    // 網格線裝飾
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 100) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 數學微光符號背景裝飾
    ctx.fillStyle = 'rgba(56, 189, 248, 0.035)';
    ctx.font = '24px "JetBrains Mono", monospace';
    const mathSymbols = ['÷', '×', '|x|', '∑', 'π', '2', '3', '5', '±1', '√', '∫', 'd/dx', 'n!', 'lim'];
    for (let x = 60; x < w; x += 140) {
      for (let y = 70; y < h; y += 120) {
        const sym = mathSymbols[((x + y) / 10) % mathSymbols.length | 0];
        ctx.fillText(sym, x, y);
      }
    }

    // 地圖邊界霓虹防護網
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // 2. 怪物行走軌跡（多路徑與幾何斜線渲染）
    const laneLabels = ['上路 α', '下路 β', '中路 γ', '右路 δ', '翼道 ε'];
    const laneColors = ['#38bdf8', '#c084fc', '#34d399', '#f59e0b', '#ec4899'];

    for (let laneIdx = 0; laneIdx < this.lanes.length; laneIdx++) {
      const waypoints = this.lanes[laneIdx];
      if (!waypoints || waypoints.length === 0) continue;

      const themeColor = laneColors[laneIdx % laneColors.length];

      ctx.beginPath();
      ctx.moveTo(waypoints[0].x, waypoints[0].y);
      for (let i = 1; i < waypoints.length; i++) {
        ctx.lineTo(waypoints[i].x, waypoints[i].y);
      }

      // 底層道路寬瀝青
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 38;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // 內側幾何流光光軌
      ctx.strokeStyle = themeColor + '44';
      ctx.lineWidth = 6;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 每個起點的獨立傳送門
      const pStart = waypoints[0];
      const startLabel = this.lanes.length > 1 ? (laneLabels[laneIdx] || `起點 ${laneIdx + 1}`) : '起點';
      ctx.save();
      ctx.beginPath();
      ctx.arc(pStart.x, pStart.y, 22 + Math.sin(this.portalPulse + laneIdx) * 3, 0, Math.PI * 2);
      ctx.fillStyle = themeColor + '33';
      ctx.fill();
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 3;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(startLabel, pStart.x, pStart.y);
      ctx.restore();
    }

    // 終點防守核心 (支援多終點核心或單一共享核心)
    const endPoints = this.getCoreEndPoints();
    if (endPoints.length > 0) {
      const hpRatio = Math.max(0, this.lives / this.maxLives);
      let coreColor = '#22c55e';
      let coreBg = 'rgba(34, 197, 94, 0.2)';
      if (hpRatio <= 0.3) {
        coreColor = '#ef4444';
        coreBg = 'rgba(239, 68, 68, 0.25)';
      } else if (hpRatio <= 0.6) {
        coreColor = '#f59e0b';
        coreBg = 'rgba(245, 158, 11, 0.25)';
      }

      for (const pEnd of endPoints) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(pEnd.x, pEnd.y, 26 + Math.cos(this.portalPulse) * 3, 0, Math.PI * 2);
        ctx.fillStyle = coreBg;
        ctx.fill();
        ctx.strokeStyle = coreColor;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = coreColor;
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 核心旋轉符文環
        ctx.save();
        ctx.translate(pEnd.x, pEnd.y);
        ctx.rotate(this.portalPulse * 0.8);
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = coreColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('核心', pEnd.x, pEnd.y);

        // 核心生命值條
        const badgeY = pEnd.y - 36;
        const badgeW = 74;
        const badgeH = 20;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = coreColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pEnd.x - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 6);
        } else {
          ctx.rect(pEnd.x - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = coreColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const isTutorialLevel = this.gameMode === 'tutorial' || (this.currentLevelId && this.currentLevelId.startsWith('tutorial'));
        ctx.fillText(isTutorialLevel ? '🛡️ ∞ (教學)' : `🛡️ ${this.lives}/${this.maxLives}`, pEnd.x, badgeY - 1);

        const barW = badgeW - 10;
        const barH = 3;
        const barX = pEnd.x - barW / 2;
        const barY = badgeY + badgeH / 2 - 3;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = coreColor;
        ctx.fillRect(barX, barY, barW * hpRatio, barH);

        ctx.restore();
      }
    }

    // 繪製防禦塔建造基座 (若有關卡定義)
    for (const pad of this.buildPads) {
      if (pad.tower) continue;

      const isHovered = this.hoveredPad === pad;
      const isSelected = this.selectedPad === pad;
      ctx.save();
      ctx.beginPath();
      ctx.arc(pad.x, pad.y, isSelected ? 23 : 20, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? 'rgba(245, 158, 11, 0.25)' : (isHovered ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.6)');
      ctx.fill();
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.strokeStyle = isSelected ? '#fbbf24' : (isHovered ? '#38bdf8' : '#334155');
      if (isSelected) {
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 14;
      } else if (isHovered) {
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
      }
      ctx.stroke();

      ctx.fillStyle = isSelected ? '#fbbf24' : (isHovered ? '#38bdf8' : '#64748b');
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', pad.x, pad.y);
      ctx.restore();
    }

    // 自由建造點高亮圈 (若選中任意地面)
    if (this.selectedBuildPos && !this.selectedPad) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.selectedBuildPos.x, this.selectedBuildPos.y, 23, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', this.selectedBuildPos.x, this.selectedBuildPos.y);
      ctx.restore();
    }
  }

  // 繪製選定建造時的懸停預覽
  drawBuildPreview() {
    if (!this.selectedBuildType) return;
    const config = TOWER_TYPES[this.selectedBuildType];
    if (!config) return;

    const pad = this.hoveredPad;
    const x = pad ? pad.x : this.mousePos.x;
    const y = pad ? pad.y : this.mousePos.y;

    if (x < 0 || y < 0) return;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, config.range, 0, Math.PI * 2);
    this.ctx.fillStyle = config.color + '18';
    this.ctx.fill();
    this.ctx.strokeStyle = config.color;
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([4, 4]);
    this.ctx.stroke();

    this.ctx.globalAlpha = 0.7;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, 0, Math.PI * 2);
    this.ctx.fillStyle = config.color;
    this.ctx.fill();
    this.ctx.fillStyle = '#0f172a';
    this.ctx.font = 'bold 12px "Outfit", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(config.label, x, y);
    this.ctx.restore();
  }

  // 繪製戰略小地圖 HUD (Screen Space)
  drawMiniMap() {
    if (this.worldWidth <= this.logicalWidth && this.worldHeight <= this.logicalHeight) return;

    const ctx = this.ctx;
    const mmW = 160;
    const mmH = 95;
    const margin = 12;
    const mmX = this.logicalWidth - mmW - margin;
    const mmY = this.logicalHeight - mmH - margin;

    ctx.save();
    // 半透明科技底板
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(mmX, mmY, mmW, mmH);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(mmX, mmY, mmW, mmH);

    const scaleX = mmW / this.worldWidth;
    const scaleY = mmH / this.worldHeight;

    // 繪製各條路線
    const laneColors = ['#38bdf8', '#c084fc', '#34d399', '#f59e0b'];
    for (let laneIdx = 0; laneIdx < this.lanes.length; laneIdx++) {
      const waypoints = this.lanes[laneIdx];
      if (!waypoints || waypoints.length === 0) continue;

      ctx.beginPath();
      ctx.moveTo(mmX + waypoints[0].x * scaleX, mmY + waypoints[0].y * scaleY);
      for (let i = 1; i < waypoints.length; i++) {
        ctx.lineTo(mmX + waypoints[i].x * scaleX, mmY + waypoints[i].y * scaleY);
      }
      ctx.strokeStyle = laneColors[laneIdx % laneColors.length] + '88';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 起點
      ctx.fillStyle = laneColors[laneIdx % laneColors.length];
      ctx.beginPath();
      ctx.arc(mmX + waypoints[0].x * scaleX, mmY + waypoints[0].y * scaleY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 終點核心 (支援單一共享核心或多終點核心)
    for (const pEnd of this.getCoreEndPoints()) {
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(mmX + pEnd.x * scaleX, mmY + pEnd.y * scaleY, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 防禦塔雷達點
    for (const t of this.towers) {
      ctx.fillStyle = t.color || '#38bdf8';
      ctx.beginPath();
      ctx.arc(mmX + t.x * scaleX, mmY + t.y * scaleY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 怪物雷達點
    for (const m of this.monsters) {
      if (m.isDead) continue;
      ctx.fillStyle = m.isBoss ? '#ef4444' : (m.isNegative ? '#c084fc' : '#fbbf24');
      ctx.beginPath();
      ctx.arc(mmX + m.x * scaleX, mmY + m.y * scaleY, m.isBoss ? 3 : 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // 當前視野視窗矩形框 (白色發光)
    const camBoxX = mmX + this.camera.x * scaleX;
    const camBoxY = mmY + this.camera.y * scaleY;
    const camBoxW = Math.min(mmW, this.camera.width * scaleX);
    const camBoxH = Math.min(mmH, this.camera.height * scaleY);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(camBoxX, camBoxY, camBoxW, camBoxH);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(camBoxX, camBoxY, camBoxW, camBoxH);

    // 小地圖標籤文字
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '9px "Outfit", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('🗺️ 全域戰略 (點擊跳轉)', mmX + 5, mmY + 4);

    ctx.restore();
  }

  handleMiniMapClick(screenX, screenY) {
    if (this.worldWidth <= this.logicalWidth && this.worldHeight <= this.logicalHeight) return false;

    const mmW = 160;
    const mmH = 95;
    const margin = 12;
    const mmX = this.logicalWidth - mmW - margin;
    const mmY = this.logicalHeight - mmH - margin;

    if (screenX >= mmX && screenX <= mmX + mmW && screenY >= mmY && screenY <= mmY + mmH) {
      const relX = (screenX - mmX) / mmW;
      const relY = (screenY - mmY) / mmH;
      const targetWorldX = relX * this.worldWidth;
      const targetWorldY = relY * this.worldHeight;
      this.camera.x = targetWorldX - this.camera.width / 2;
      this.camera.y = targetWorldY - this.camera.height / 2;
      this.clampCamera();
      this.syncPanelPositions();
      return true;
    }
    return false;
  }

  render() {
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);

    // 進入大世界空間 (虛擬攝影機變換)
    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);

    this.drawMap();

    // 繪製幾何共鳴矩陣 (雷射光弦與共振三角結界)
    if (this.resonanceManager) {
      this.resonanceManager.draw(this.ctx);
    }

    // 繪製防禦塔
    for (const t of this.towers) {
      t.draw(this.ctx, t === this.selectedTower);
    }

    // 繪製光束
    for (const b of this.beams) {
      b.draw(this.ctx);
    }

    // 繪製怪物
    for (const m of this.monsters) {
      m.draw(this.ctx);
    }

    // 繪製子彈
    for (const p of this.projectiles) {
      p.draw(this.ctx);
    }

    // 繪製怪物砲彈
    for (const mp of this.monsterProjectiles) {
      mp.draw(this.ctx);
    }

    // 繪製粒子特效
    for (const pt of this.particles) {
      pt.draw(this.ctx);
    }

    // 繪製漂浮金幣文字
    for (const cf of this.coinFloats) {
      cf.draw(this.ctx);
    }

    // 繪製秘術實體與瞄準光圈
    if (this.spellManager) {
      this.spellManager.draw(this.ctx);
    }

    // 繪製公倍數融合與裂變震波特效
    if (this.lcmManager) {
      this.lcmManager.draw(this.ctx);
    }

    // 建造預覽
    this.drawBuildPreview();

    // 離開大世界空間
    this.ctx.restore();

    // 螢幕空間渲染：戰略小地圖
    this.drawMiniMap();
  }

  loop(timestamp) {
    const rawDt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;
    const dt = Math.min(rawDt, 0.1) * this.gameSpeed;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }
}

