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
    this.buildPads = this.currentLevel.buildPads.map(p => ({ ...p, tower: null }));

    // 實體清單
    this.monsters = [];
    this.towers = [];
    this.projectiles = [];
    this.beams = [];
    this.particles = [];
    this.coinFloats = [];
    this.activeBoss = null;

    this.waveManager = new WaveManager(this.currentLevel);

    // 互動狀態
    this.selectedBuildType = null;
    this.selectedTower = null;
    this.selectedPad = null;
    this.mousePos = { x: -100, y: -100 };
    this.hoveredPad = null;

    // 時間
    this.lastTime = performance.now();
    this.portalPulse = 0;

    this.initCanvasDPI();
    this.setupEvents();
    queueMicrotask(() => this.syncUI());

    // 啟動主迴圈
    requestAnimationFrame(this.loop.bind(this));
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
    } else if (mode === 'endless' || levelId === 'endless') {
      this.gameMode = 'endless';
      this.currentLevelId = 'endless';
      levelData = endlessManager.getEndlessLevelConfig(1);
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
    this.buildPads = levelData.buildPads.map(p => ({ ...p, tower: null }));

    this.monsters = [];
    this.towers = [];
    this.projectiles = [];
    this.beams = [];
    this.particles = [];
    this.coinFloats = [];
    this.activeBoss = null;
    this.selectedTower = null;
    this.selectedPad = null;
    this.selectedBuildType = null;
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
    this.canvas.width = this.logicalWidth * dpr;
    this.canvas.height = this.logicalHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  setupEvents() {
    const updateCoords = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.logicalWidth / rect.width;
      const scaleY = this.logicalHeight / rect.height;
      this.mousePos.x = (clientX - rect.left) * scaleX;
      this.mousePos.y = (clientY - rect.top) * scaleY;

      // 偵測懸停基座
      this.hoveredPad = this.buildPads.find(p => Math.hypot(p.x - this.mousePos.x, p.y - this.mousePos.y) <= 32);
    };

    this.canvas.addEventListener('mousemove', (e) => {
      updateCoords(e.clientX, e.clientY);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mousePos.x = -100;
      this.mousePos.y = -100;
      this.hoveredPad = null;
    });

    this.canvas.addEventListener('click', () => {
      sound.init();
      this.handleClick();
    });

    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.spellManager && this.spellManager.isAiming) {
        this.spellManager.cancelAiming();
        this.syncUI();
      }
    });

    this.canvas.addEventListener('touchstart', (e) => {
      sound.init();
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.handleClick();
    });
  }

  handleClick() {
    if (this.isGameOver) return;

    // 0. 若處於秘術瞄準施法狀態 -> 施放秘術
    if (this.spellManager && this.spellManager.isAiming) {
      this.spellManager.castAt(this.mousePos.x, this.mousePos.y);
      this.syncUI();
      return;
    }

    // 1. 點擊了已有防禦塔的基座 -> 顯示可以升級的項目
    const clickedPadWithTower = this.buildPads.find(
      p => p.tower && Math.hypot(p.x - this.mousePos.x, p.y - this.mousePos.y) <= 26
    );

    if (clickedPadWithTower) {
      this.selectPad(null);
      this.selectTower(clickedPadWithTower.tower);
      this.selectedBuildType = null;
      this.syncUI();
      return;
    }

    // 2. 點擊了尚未建置的基座 -> 上方顯示可以建置的砲塔
    const clickedEmptyPad = this.buildPads.find(
      p => !p.tower && Math.hypot(p.x - this.mousePos.x, p.y - this.mousePos.y) <= 26
    );

    if (clickedEmptyPad) {
      this.selectTower(null);
      this.selectPad(clickedEmptyPad);
      this.selectedBuildType = null;
      this.syncUI();
      return;
    }

    // 3. 點到旁邊空白時 -> 將選單全部關閉
    this.selectTower(null);
    this.selectPad(null);
    this.selectedBuildType = null;
    this.syncUI();
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
      ['absolute', 'sqrt', 'operator', 'zero', 'log', 'trig', 'fusion_6', 'fusion_15', 'fusion_abs_sqrt', 'fusion_factorial', 'fusion_derivative', 'fusion_monte_carlo'].includes(targetType);

    if (!isLimited) return true;

    const existingTower = padOrTower && (padOrTower.tower ? padOrTower.tower : (padOrTower.type ? padOrTower : null));
    const isSameType = existingTower && existingTower.type === targetType;
    const count = this.getTowerTypeCount(targetType) - (isSameType ? 1 : 0);

    return count < 1;
  }

  getSpecialTowerCount() {
    return this.towers.filter(t => (t.isSpecialTower ? t.isSpecialTower() : ['absolute', 'sqrt', 'operator', 'zero', 'log', 'trig'].includes(t.type))).length;
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
    if (!pad) return false;
    const config = TOWER_TYPES[towerType];
    if (!config) return false;

    // 檢查代數與力場、複合神塔各型號全場限建 1 座
    if (!this.canBuildTowerType(towerType, pad)) {
      sound.playResist();
      this.coinFloats.push(new CoinFloat({
        x: pad.x,
        y: pad.y - 20,
        text: `⚠️ ${config.name} 全場限建 1 座！`,
        color: '#ec4899'
      }));
      return false;
    }

    const techDiscount = (config.type === 'prime' ? techTree.getPrimeUpgradeDiscount() : 0);
    const finalCost = Math.round(config.cost * (1 - techDiscount));

    if (this.gold >= finalCost) {
      const existingTower = pad.tower;
      if (existingTower) {
        this.towers = this.towers.filter(t => t !== existingTower);
      }
      this.buildTower(pad, config);
      // 購買成功時，立即關閉建造選單
      this.selectPad(null);
      this.selectTower(null);
      this.selectedBuildType = null;
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

  addBeam(beam) {
    this.beams.push(beam);
  }

  addGold(amount, x, y) {
    this.gold += amount;
    this.coinFloats.push(new CoinFloat({ x, y, amount }));
    this.syncUI();
  }

  damageBase(amount = 1) {
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
      if (this.tutorialManager) {
        this.tutorialManager.onTutorialCompleted(this.currentLevelId);
      }
      const rewardText = isMaster ? '🎓 學院畢業！已掌握全塔功用！' : '🎓 課堂特訓通關！已掌握該塔克制技巧！';
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
    this.loadLevel(this.currentLevelId);
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

  // 繪製地圖與背景（支援多路徑）
  drawMap() {
    const ctx = this.ctx;
    const w = this.logicalWidth;
    const h = this.logicalHeight;

    // 1. 科技深色網格背景
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    // 數學微光符號背景裝飾
    ctx.fillStyle = 'rgba(56, 189, 248, 0.03)';
    ctx.font = '24px "JetBrains Mono", monospace';
    const mathSymbols = ['÷', '×', '|x|', '∑', 'π', '2', '3', '5', '±1', '√'];
    for (let x = 40; x < w; x += 120) {
      for (let y = 50; y < h; y += 100) {
        const sym = mathSymbols[((x + y) / 10) % mathSymbols.length | 0];
        ctx.fillText(sym, x, y);
      }
    }

    // 2. 怪物行走軌跡（多路徑渲染）
    for (let laneIdx = 0; laneIdx < this.lanes.length; laneIdx++) {
      const waypoints = this.lanes[laneIdx];
      ctx.beginPath();
      ctx.moveTo(waypoints[0].x, waypoints[0].y);
      for (let i = 1; i < waypoints.length; i++) {
        ctx.lineTo(waypoints[i].x, waypoints[i].y);
      }

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 36;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      ctx.strokeStyle = laneIdx === 0 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(192, 132, 252, 0.25)';
      ctx.lineWidth = 6;
      ctx.shadowColor = laneIdx === 0 ? '#38bdf8' : '#c084fc';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 每個起點的傳送門
      const pStart = waypoints[0];
      const startLabel = this.lanes.length > 1 ? (laneIdx === 0 ? '上路' : '下路') : '起點';
      ctx.save();
      ctx.beginPath();
      ctx.arc(pStart.x, pStart.y, 22 + Math.sin(this.portalPulse + laneIdx) * 3, 0, Math.PI * 2);
      ctx.fillStyle = laneIdx === 0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(192, 132, 252, 0.2)';
      ctx.fill();
      ctx.strokeStyle = laneIdx === 0 ? '#38bdf8' : '#c084fc';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(startLabel, pStart.x, pStart.y);
      ctx.restore();
    }

    // 終點防守核心 (所有路徑共用最後節點)
    const pEnd = this.lanes[0][this.lanes[0].length - 1];
    const hpRatio = Math.max(0, this.lives / this.maxLives);
    let coreColor = '#22c55e'; // 綠色
    let coreBg = 'rgba(34, 197, 94, 0.2)';
    if (hpRatio <= 0.3) {
      coreColor = '#ef4444'; // 紅色警報
      coreBg = 'rgba(239, 68, 68, 0.25)';
    } else if (hpRatio <= 0.6) {
      coreColor = '#f59e0b'; // 黃色警戒
      coreBg = 'rgba(245, 158, 11, 0.25)';
    }

    ctx.save();
    // 1. 核心能量力場波紋
    ctx.beginPath();
    ctx.arc(pEnd.x, pEnd.y, 25 + Math.cos(this.portalPulse) * 3, 0, Math.PI * 2);
    ctx.fillStyle = coreBg;
    ctx.fill();
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 3;
    ctx.shadowColor = coreColor;
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 2. 核心內核旋轉幾何防禦環
    ctx.save();
    ctx.translate(pEnd.x, pEnd.y);
    ctx.rotate(this.portalPulse * 0.8);
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // 核心文字標籤
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('核心', pEnd.x, pEnd.y);

    // 3. 核心旁邊/上方的生命值徽章與生命條 (Badge & HP Bar)
    const badgeY = pEnd.y - 36;
    const badgeW = 74;
    const badgeH = 20;

    // 徽章背景
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

    // 徽章生命數值文字
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = coreColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`🛡️ ${this.lives}/${this.maxLives}`, pEnd.x, badgeY - 1);

    // 徽章底部的迷你生命進度條
    const barW = badgeW - 10;
    const barH = 3;
    const barX = pEnd.x - barW / 2;
    const barY = badgeY + badgeH / 2 - 3;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = coreColor;
    ctx.fillRect(barX, barY, barW * hpRatio, barH);

    ctx.restore();

    // 繪製防禦塔建造基座
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

  render() {
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);

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
