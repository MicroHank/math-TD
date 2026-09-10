import { Game } from './engine/Game.js';
import { TOWER_TYPES } from './entities/Tower.js';
import { LEVELS, CHAPTERS } from './levels/LevelData.js';
import { progress } from './engine/ProgressManager.js';
import { sound } from './engine/Audio.js';
import { techTree, TECH_BRANCHES, TECH_NODES } from './engine/TechTreeManager.js';
import { endlessManager } from './engine/EndlessManager.js';
import { TUTORIAL_LESSONS, TUTORIAL_MASTER_STEPS } from './engine/TutorialManager.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');

  // 畫面容器引用
  const homeView = document.getElementById('home-view');
  const battleView = document.getElementById('battle-view');

  // 首頁 DOM 元素引用
  const btnHomeTutorial = document.getElementById('btn-home-tutorial');
  const homeTutorialBadge = document.getElementById('home-tutorial-badge');
  const btnHomeAdventure = document.getElementById('btn-home-adventure');
  const btnHomeEndless = document.getElementById('btn-home-endless');
  const btnHomeBossRush = document.getElementById('btn-home-boss-rush');
  const btnHomeTechTree = document.getElementById('btn-home-tech-tree');
  const btnHomeGuide = document.getElementById('btn-home-guide');
  const homeEndlessBadge = document.getElementById('home-endless-badge');
  const homeBossRushBadge = document.getElementById('home-boss-rush-badge');
  const homeTechTreeBadge = document.getElementById('home-tech-tree-badge');
  const homeTechDesc = document.getElementById('home-tech-desc');
  const btnHomeSound = document.getElementById('btn-home-sound');
  const homeSoundIcon = document.getElementById('home-sound-icon');
  const homeSoundText = document.getElementById('home-sound-text');
  const btnHomeReset = document.getElementById('btn-home-reset');
  const homeStatStages = document.getElementById('home-stat-stages');
  const homeStatStars = document.getElementById('home-stat-stars');

  // 數論作戰學院 DOM 元素
  const modalTutorialAcademy = document.getElementById('modal-tutorial-academy');
  const btnCloseAcademy = document.getElementById('btn-close-academy');
  const btnStartMasterTut = document.getElementById('btn-start-master-tut');
  const cardTutorialMaster = document.getElementById('card-tutorial-master');
  const academyLessonsGrid = document.getElementById('academy-lessons-grid');

  // 無盡模式選圖 DOM 元素
  const modalEndlessSelect = document.getElementById('modal-endless-select');
  const btnCloseEndlessSelect = document.getElementById('btn-close-endless-select');
  const endlessMapsGrid = document.getElementById('endless-maps-grid');
  const endlessGlobalRecordText = document.getElementById('endless-global-record-text');

  // 砲塔 / 秘術特寫 Spotlight DOM 元素
  const modalTowerSpotlight = document.getElementById('modal-tower-spotlight');
  const spotlightCanvas = document.getElementById('spotlight-canvas');
  const spotlightBadge = document.getElementById('spotlight-badge');
  const spotlightStepTag = document.getElementById('spotlight-step-tag');
  const spotlightHalo = document.getElementById('spotlight-halo');
  const spotlightIconLabel = document.getElementById('spotlight-icon-label');
  const spotlightTitle = document.getElementById('spotlight-title');
  const spotlightFormula = document.getElementById('spotlight-formula');
  const spotlightTargets = document.getElementById('spotlight-targets');
  const spotlightDesc = document.getElementById('spotlight-desc');
  const btnCloseSpotlight = document.getElementById('btn-close-spotlight');
  const btnSpotlightX = document.getElementById('btn-spotlight-x');

  // 戰鬥動態教學指引看板 DOM 元素
  const hudTutorialBanner = document.getElementById('hud-tutorial-banner');
  const tutStepTitle = document.getElementById('tut-step-title');
  const tutTargetTag = document.getElementById('tut-target-tag');
  const tutFormulaText = document.getElementById('tut-formula-text');
  const tutActionPrompt = document.getElementById('tut-action-prompt');

  // 戰鬥頂部導航
  const btnBackHome = document.getElementById('btn-back-home');
  const btnGuideInGame = document.getElementById('btn-guide-in-game');

  // 戰鬥 HUD 元素引用
  const elGold = document.getElementById('hud-gold');
  const elLives = document.getElementById('hud-lives');
  const elWave = document.getElementById('hud-wave');
  const elEnemies = document.getElementById('hud-enemies');
  const elWaveTitle = document.getElementById('wave-title');
  const elWaveTip = document.getElementById('wave-tip');
  const hudLevelName = document.getElementById('hud-level-name');

  const btnStartWave = document.getElementById('btn-start-wave');
  const btnSpeed = document.getElementById('btn-speed');
  const btnPause = document.getElementById('btn-pause');
  const btnGuide = document.getElementById('btn-guide');
  const modalGuide = document.getElementById('modal-guide');
  const btnCloseGuide = document.getElementById('btn-close-guide');

  // 關卡地圖元素
  const btnMap = document.getElementById('btn-map');
  const modalStageMap = document.getElementById('modal-stage-map');
  const btnCloseMap = document.getElementById('btn-close-map');
  const btnUnlockAll = document.getElementById('btn-unlock-all');
  const btnResetGameMap = document.getElementById('btn-reset-game-map');
  const stagesGrid = document.getElementById('stages-grid');
  const chapterTabs = document.querySelectorAll('.chapter-tabs .tab-btn');

  // 專屬魔王連戰元素
  const modalBossRush = document.getElementById('modal-boss-rush');
  const btnCloseBossRush = document.getElementById('btn-close-boss-rush');
  const bossRushRecordText = document.getElementById('boss-rush-record-text');
  const bossRushGrid = document.getElementById('boss-rush-grid');

  // 數論研究院科技樹元素
  const btnTechTree = document.getElementById('btn-tech-tree');
  const modalTechTree = document.getElementById('modal-tech-tree');
  const btnCloseTechTree = document.getElementById('btn-close-tech-tree');
  const btnResetTech = document.getElementById('btn-reset-tech');
  const techAvailableStars = document.getElementById('tech-available-stars');
  const techTotalStars = document.getElementById('tech-total-stars');
  const techBranchesContainer = document.getElementById('tech-branches-container');

  // 指揮官秘術元素
  const hudManaVal = document.getElementById('hud-mana-val');
  const hudManaFill = document.getElementById('hud-mana-fill');
  const btnSpellGcd = document.getElementById('btn-spell-gcd');
  const btnSpellVortex = document.getElementById('btn-spell-vortex');
  const btnSpellOverdrive = document.getElementById('btn-spell-overdrive');
  const cdSpellGcd = document.getElementById('cd-spell-gcd');
  const cdSpellVortex = document.getElementById('cd-spell-vortex');
  const cdSpellOverdrive = document.getElementById('cd-spell-overdrive');

  // 魔王血條
  const bossBarContainer = document.getElementById('boss-bar-container');
  const bossName = document.getElementById('boss-name');
  const bossHpText = document.getElementById('boss-hp-text');
  const bossHpFill = document.getElementById('boss-hp-fill');

  // 塔詳細操作面板
  const panelTower = document.getElementById('tower-details-panel');
  const towerName = document.getElementById('selected-tower-name');
  const towerLevel = document.getElementById('selected-tower-level');

  // 三向升級 DOM
  const statRangeLvl = document.getElementById('stat-range-lvl');
  const statRangeVal = document.getElementById('stat-range-val');
  const btnUpgradeRange = document.getElementById('btn-upgrade-range');
  const costUpgradeRange = document.getElementById('cost-upgrade-range');

  const statDamageLvl = document.getElementById('stat-damage-lvl');
  const statDamageVal = document.getElementById('stat-damage-val');
  const btnUpgradeDamage = document.getElementById('btn-upgrade-damage');
  const costUpgradeDamage = document.getElementById('cost-upgrade-damage');

  const statSpeedLvl = document.getElementById('stat-speed-lvl');
  const statSpeedVal = document.getElementById('stat-speed-val');
  const btnUpgradeSpeed = document.getElementById('btn-upgrade-speed');
  const costUpgradeSpeed = document.getElementById('cost-upgrade-speed');

  const btnFuseTower = document.getElementById('btn-fuse-tower');
  const btnRepairTower = document.getElementById('btn-repair-tower');
  const btnSell = document.getElementById('btn-sell-tower');
  const btnDeselect = document.getElementById('btn-deselect-tower');

  // 點選空基座建造面板 DOM
  const panelPadBuild = document.getElementById('pad-build-panel');
  const btnCloseBuildPanel = document.getElementById('btn-close-build-panel');
  const tabBuildPrime = document.getElementById('tab-build-prime');
  const tabBuildSpecial = document.getElementById('tab-build-special');
  const tabBuildFusion = document.getElementById('tab-build-fusion');
  const buildListPrime = document.getElementById('build-list-prime');
  const buildListSpecial = document.getElementById('build-list-special');
  const buildListFusion = document.getElementById('build-list-fusion');
  const buildOptionCards = document.querySelectorAll('.build-option-card');

  let currentBuildTab = 'prime';

  function switchBuildTab(tabKey) {
    currentBuildTab = tabKey;
    if (tabBuildPrime) tabBuildPrime.classList.toggle('active', tabKey === 'prime');
    if (tabBuildSpecial) tabBuildSpecial.classList.toggle('active', tabKey === 'special');
    if (tabBuildFusion) tabBuildFusion.classList.toggle('active', tabKey === 'fusion');

    if (buildListPrime) buildListPrime.classList.toggle('hidden', tabKey !== 'prime');
    if (buildListSpecial) buildListSpecial.classList.toggle('hidden', tabKey !== 'special');
    if (buildListFusion) buildListFusion.classList.toggle('hidden', tabKey !== 'fusion');
  }

  if (tabBuildPrime) tabBuildPrime.addEventListener('click', () => switchBuildTab('prime'));
  if (tabBuildSpecial) tabBuildSpecial.addEventListener('click', () => switchBuildTab('special'));
  if (tabBuildFusion) tabBuildFusion.addEventListener('click', () => switchBuildTab('fusion'));

  if (btnCloseBuildPanel) {
    btnCloseBuildPanel.addEventListener('click', () => {
      if (game) {
        game.selectPad(null);
        game.selectBuildPos(null);
      }
    });
  }

  function updateBuildOptions(goldAmount) {
    const specialCount = game ? game.getSpecialTowerCount() : 0;
    const fusionCount = game ? game.getFusionTowerCount() : 0;

    if (tabBuildSpecial) {
      tabBuildSpecial.innerHTML = `⚡ 代數力場 <span class="tab-count">(${specialCount}/6)</span>`;
      tabBuildSpecial.classList.toggle('tab-capped', specialCount >= 6);
    }
    if (tabBuildFusion) {
      tabBuildFusion.innerHTML = `⚛️ 複合神塔 <span class="tab-count">(${fusionCount}/6)</span>`;
      tabBuildFusion.classList.toggle('tab-capped', fusionCount >= 6);
    }

    buildOptionCards.forEach(card => {
      const typeKey = card.dataset.towerType;
      const config = TOWER_TYPES[typeKey];
      if (config) {
        const costEl = card.querySelector('.option-cost');
        const isLimited = config.category === 'special' || config.category === 'fusion' ||
          ['ABSOLUTE', 'SQRT', 'OPERATOR', 'ZERO_FREEZE', 'TRIG', 'FUSION_6', 'FUSION_15', 'FUSION_ABS_SQRT', 'FUSION_FACTORIAL', 'FUSION_DERIVATIVE', 'FUSION_MONTE_CARLO'].includes(typeKey);

        if (isLimited) {
          const isCapped = game ? !game.canBuildTowerType(typeKey, game.selectedPad) : false;
          if (isCapped) {
            card.disabled = true;
            card.classList.add('limit-reached');
            if (costEl) costEl.textContent = '已建置 (1/1)';
          } else {
            card.disabled = (goldAmount < config.cost);
            card.classList.remove('limit-reached');
            if (costEl) costEl.textContent = `${config.cost} 🪙`;
          }
        } else {
          card.disabled = (goldAmount < config.cost);
          card.classList.remove('limit-reached');
          if (costEl) costEl.textContent = `${config.cost} 🪙`;
        }
      }
    });
  }

  // 教學關卡指定砲塔自動切換分頁與高亮
  function applyTutorialTowerHighlight(levelId) {
    document.querySelectorAll('.tut-target-chip').forEach(el => el.remove());
    buildOptionCards.forEach(card => card.classList.remove('tutorial-target'));

    if (!levelId || !levelId.startsWith('tutorial')) return;
    const lesson = TUTORIAL_LESSONS.find(l => l.id === levelId);
    if (!lesson || !lesson.requiredTower || lesson.requiredTower === 'ALL') return;

    const req = lesson.requiredTower;
    let targetTab = 'prime';
    if (['ABSOLUTE', 'SQRT', 'OPERATOR', 'ZERO_FREEZE', 'TRIG'].includes(req)) {
      targetTab = 'special';
    } else if (req.startsWith('FUSION_')) {
      targetTab = 'fusion';
    }

    switchBuildTab(targetTab);

    buildOptionCards.forEach(card => {
      const isTarget = req === 'TRIANGLE_PRIMES'
        ? ['PRIME_2', 'PRIME_3', 'PRIME_5', 'PRIME_7'].includes(card.dataset.towerType)
        : (card.dataset.towerType === req);
      if (isTarget) {
        card.classList.add('tutorial-target');
        const info = card.querySelector('.option-info');
        if (info && !card.querySelector('.tut-target-chip')) {
          const chip = document.createElement('span');
          chip.className = 'tut-target-chip';
          chip.textContent = '🎯 本課指定';
          info.appendChild(chip);
        }
      }
    });
  }

  // 依據目標在世界座標與攝影機視角，動態將面板定位在砲塔/基座身旁 (而非固定在右側)
  function positionPanelNear(panelElement, targetX, targetY) {
    if (!panelElement || targetX === undefined || targetY === undefined) return;
    const container = canvas.parentElement;
    if (!container) return;

    const rect = canvas.getBoundingClientRect();
    const containerWidth = container.clientWidth || rect.width;
    const containerHeight = container.clientHeight || rect.height;

    // 將世界座標轉換為攝影機螢幕座標
    const screenPos = game ? game.worldToScreen(targetX, targetY) : { x: targetX, y: targetY };

    const scaleX = rect.width / (game ? game.logicalWidth : 960);
    const scaleY = rect.height / (game ? game.logicalHeight : 560);
    const targetCssX = screenPos.x * scaleX;
    const targetCssY = screenPos.y * scaleY;

    const panelWidth = panelElement.offsetWidth || (panelElement.id === 'pad-build-panel' ? 310 : 275);
    const panelHeight = panelElement.offsetHeight || 290;

    const offsetDist = (26 * scaleX) + 14;
    let left;

    // 優先放置於目標右側；若右側超出邊界，則放置於左側
    if (targetCssX + offsetDist + panelWidth <= containerWidth - 10) {
      left = targetCssX + offsetDist;
    } else if (targetCssX - offsetDist - panelWidth >= 10) {
      left = targetCssX - offsetDist - panelWidth;
    } else {
      // 兩邊皆緊湊時，在螢幕範圍內取適當位置
      left = Math.max(10, Math.min(containerWidth - panelWidth - 10, targetCssX - panelWidth / 2));
    }

    // 垂直方向：以目標中心居中
    let top = targetCssY - panelHeight / 2;
    // 限制在容器上下邊界內 (保留 10px 邊距)
    top = Math.max(10, Math.min(containerHeight - panelHeight - 10, top));

    panelElement.style.left = `${Math.round(left)}px`;
    panelElement.style.right = 'auto';
    panelElement.style.bottom = 'auto';
  }

  // 更新首頁選單動態狀態（戰績、科技樹解鎖狀態、音效圖示等）
  function updateHomeScreenState() {
    if (homeStatStages) homeStatStages.textContent = `${progress.getClearedLevelsCount()} / 20`;
    if (homeStatStars) homeStatStars.textContent = `${techTree.getAvailableStars()} ⭐ (${techTree.getTotalEarnedStars()} 總獲取)`;

    if (homeTutorialBadge) {
      homeTutorialBadge.textContent = '進入學院 ➔';
    }

    if (homeEndlessBadge) {
      const rec = progress.getEndlessRecord();
      homeEndlessBadge.textContent = rec > 0 ? `紀錄: 第 ${rec} 波` : '尚未挑戰';
    }

    if (homeBossRushBadge) {
      const rec = progress.getBossRushRecord();
      homeBossRushBadge.textContent = `紀錄: Stage ${rec}/5`;
    }

    // 需求4: 數論研究所 科技樹 放在遊戲首頁選單，必須通關後才能點擊科技樹
    const hasCleared = progress.hasClearedAnyLevel();
    if (btnHomeTechTree && homeTechTreeBadge && homeTechDesc) {
      if (hasCleared) {
        btnHomeTechTree.classList.remove('locked');
        homeTechTreeBadge.textContent = `⭐ ${techTree.getAvailableStars()} 點可用`;
        homeTechTreeBadge.classList.remove('locked');
        homeTechDesc.textContent = '研發三大領域 15 項永久數論科技天賦';
      } else {
        btnHomeTechTree.classList.add('locked');
        homeTechTreeBadge.textContent = '🔒 需通關任意關卡';
        homeTechTreeBadge.classList.add('locked');
        homeTechDesc.textContent = '🔒 需通關任意關卡後方可解鎖數論科技樹';
      }
    }

    // 需求2: 音效放在遊戲首頁做 ON、OFF 的設定
    if (homeSoundIcon && homeSoundText) {
      homeSoundIcon.textContent = sound.muted ? '🔇' : '🔊';
      homeSoundText.textContent = sound.muted ? '音效：已靜音' : '音效：開啟';
    }
  }

  // 渲染數論作戰學院選單
  function renderTutorialAcademy() {
    if (!academyLessonsGrid) return;

    academyLessonsGrid.innerHTML = '';
    TUTORIAL_LESSONS.filter(l => l.lessonNum > 0).forEach(lesson => {
      const card = document.createElement('div');
      card.className = 'academy-lesson-card';
      card.innerHTML = `
        <div class="lesson-card-top">
          <div class="lesson-card-icon" style="background: ${lesson.color}22; color: ${lesson.color}; border: 1px solid ${lesson.color}66;">${lesson.icon}</div>
          <span class="lesson-badge">${lesson.badge}</span>
        </div>
        <div class="lesson-card-title">${lesson.title}</div>
        <div class="lesson-tower-pill"><span class="pill-icon">🎯</span> 指定砲塔：<strong>${lesson.requiredTowerName || '全防禦塔'}</strong></div>
        <div class="lesson-card-desc">${lesson.description}</div>
        <div class="lesson-card-footer">
          <span class="lesson-waves">波次: 1 波</span>
          <span class="lesson-reward">開始特訓 ➔</span>
        </div>
      `;

      card.addEventListener('click', () => {
        if (modalTutorialAcademy) modalTutorialAcademy.classList.add('hidden');
        showBattleScreen(lesson.id, 'tutorial');
      });

      academyLessonsGrid.appendChild(card);
    });
  }

  // 學院入口按鈕綁定
  if (btnHomeTutorial) {
    btnHomeTutorial.addEventListener('click', () => {
      if (modalTutorialAcademy) {
        renderTutorialAcademy();
        modalTutorialAcademy.classList.remove('hidden');
      }
    });
  }

  if (btnCloseAcademy) {
    btnCloseAcademy.addEventListener('click', () => {
      if (modalTutorialAcademy) modalTutorialAcademy.classList.add('hidden');
    });
  }

  if (btnStartMasterTut) {
    btnStartMasterTut.addEventListener('click', () => {
      if (modalTutorialAcademy) modalTutorialAcademy.classList.add('hidden');
      showBattleScreen('tutorial_master', 'tutorial');
    });
  }

  if (cardTutorialMaster) {
    cardTutorialMaster.addEventListener('click', (e) => {
      if (e.target !== btnStartMasterTut) {
        if (modalTutorialAcademy) modalTutorialAcademy.classList.add('hidden');
        showBattleScreen('tutorial_master', 'tutorial');
      }
    });
  }

  // 切換至遊戲首頁
  function showHomeScreen() {
    if (game) {
      game.isPaused = true;
      if (btnPause) btnPause.textContent = '▶ 繼續';
    }
    if (battleView) battleView.classList.add('hidden');
    if (homeView) homeView.classList.remove('hidden');
    updateHomeScreenState();
  }

  // 切換至戰鬥主畫面並載入關卡
  function showBattleScreen(levelId = null, mode = 'adventure', stageIndex = 1) {
    if (homeView) homeView.classList.add('hidden');
    if (battleView) battleView.classList.remove('hidden');
    if (game) {
      if (levelId) {
        game.loadLevel(levelId, mode, stageIndex);
      }
      game.isPaused = false;
      if (btnPause) btnPause.textContent = '⏸ 暫停';
      game.syncUI();
    }
  }

  // 單關通關結算彈窗
  const modalLevelVictory = document.getElementById('modal-level-victory');
  const victoryLevelTitle = document.getElementById('victory-level-title');
  const victoryStars = document.getElementById('victory-stars');
  const victoryLevelDesc = document.getElementById('victory-level-desc');
  const btnNextLevel = document.getElementById('btn-next-level');
  const btnBackToMap = document.getElementById('btn-back-to-map');
  const btnReplayLevel = document.getElementById('btn-replay-level');

  // 遊戲結束彈窗
  const modalGameOver = document.getElementById('modal-gameover');
  const gameoverTitle = document.getElementById('gameover-title');
  const gameoverDesc = document.getElementById('gameover-desc');
  const btnRestart = document.getElementById('btn-restart');
  const btnGameoverMap = document.getElementById('btn-gameover-map');

  let currentActiveChapter = 'world-1';
  let currentMapMode = 'adventure';

  // 渲染大地圖關卡清單
  function renderStageMap(chapterId) {
    currentActiveChapter = chapterId;
    if (!stagesGrid) return;
    stagesGrid.innerHTML = '';

    // 更新分頁按鈕高亮
    chapterTabs.forEach(tab => {
      if (tab.dataset.chapter === chapterId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    if (chapterId === 'tutorial') {
      // 渲染所有教學關卡
      TUTORIAL_LESSONS.forEach(tut => {
        const lvl = LEVELS[tut.id];
        if (!lvl) return;

        const card = document.createElement('div');
        card.className = 'stage-card';
        card.innerHTML = `
          <div class="stage-header-row">
            <span class="stage-name">${lvl.name}</span>
            <span class="stage-stars" style="color: #38bdf8; font-size: 13px;">📚 專項特訓</span>
          </div>
          <div class="stage-tower-pill"><span class="pill-icon">🎯</span> 指定砲塔：<strong>${tut.requiredTowerName || '全防禦塔'}</strong></div>
          <div class="stage-desc">${lvl.subtitle}</div>
          <span class="stage-badge badge-normal">
            波次: 1 波 ｜ 核心免傷
          </span>
        `;

        card.addEventListener('click', () => {
          modalStageMap.classList.add('hidden');
          showBattleScreen(tut.id, 'tutorial');
        });

        stagesGrid.appendChild(card);
      });
      return;
    }

    const chapter = CHAPTERS.find(c => c.id === chapterId);
    if (!chapter) return;

    chapter.levels.forEach(levelId => {
      const lvl = LEVELS[levelId];
      if (!lvl) return;
      const isUnlocked = progress.isUnlocked(levelId);
      const stars = progress.getStars(levelId);
      const isBossStage = levelId.endsWith('-4');

      const card = document.createElement('div');
      card.className = `stage-card ${isUnlocked ? '' : 'locked'} ${isBossStage ? 'boss-stage' : ''}`;

      let starsDisplay = '☆☆☆';
      if (stars === 3) starsDisplay = '⭐⭐⭐';
      else if (stars === 2) starsDisplay = '⭐⭐☆';
      else if (stars === 1) starsDisplay = '⭐☆☆';

      card.innerHTML = `
        <div class="stage-header-row">
          <span class="stage-name">${lvl.name}</span>
          <span class="stage-stars">${isUnlocked ? starsDisplay : '🔒 鎖定'}</span>
        </div>
        <div class="stage-desc">${lvl.subtitle}</div>
        <span class="stage-badge ${isBossStage ? 'badge-boss' : 'badge-normal'}">
          ${isBossStage ? '👑 大魔王關' : '波次: ' + lvl.waves.length}
        </span>
      `;

      card.addEventListener('click', () => {
        if (!isUnlocked) {
          if (confirm(`關卡【${lvl.name}】尚未依序解鎖，是否直接解鎖並進入遊玩？`)) {
            if (!progress.data.unlockedLevels.includes(levelId)) {
              progress.data.unlockedLevels.push(levelId);
              progress.save();
            }
            modalStageMap.classList.add('hidden');
            showBattleScreen(levelId);
          }
          return;
        }
        modalStageMap.classList.add('hidden');
        showBattleScreen(levelId);
      });

      stagesGrid.appendChild(card);
    });
  }

  function renderBossRush() {
    if (!bossRushGrid) return;
    const stages = endlessManager.getBossRushStages();
    const currentRecord = progress.getBossRushRecord();
    if (bossRushRecordText) {
      bossRushRecordText.textContent = `Stage ${currentRecord}/5`;
    }

    bossRushGrid.innerHTML = '';
    stages.forEach(s => {
      const isCleared = currentRecord >= s.stageIndex;
      const card = document.createElement('div');
      card.className = `boss-rush-card ${isCleared ? 'cleared' : ''}`;

      const skillsHtml = s.boss.skills.map(sk => {
        let label = sk;
        if (sk === 'split_adds') label = '分裂侍從';
        else if (sk === 'polarity_flip') label = '極性反轉';
        return `<span class="rush-skill-chip">${label}</span>`;
      }).join('');

      card.innerHTML = `
        <div class="rush-card-header">
          <span class="rush-stage-badge">Stage ${s.stageIndex}</span>
          <span class="rush-boss-icon">👑</span>
        </div>
        <div class="rush-boss-name">${s.name}</div>
        <div class="rush-boss-value">首領數值: ${s.boss.val} [${s.adds.length} 隨從]</div>
        <div class="rush-skills-row">${skillsHtml}</div>
        <button class="btn-challenge-rush">${isCleared ? '✔ 再次挑戰 (+3⭐)' : '⚔️ 開始討伐'}</button>
      `;

      card.addEventListener('click', () => {
        if (modalBossRush) modalBossRush.classList.add('hidden');
        showBattleScreen(s.id, 'boss_rush', s.stageIndex);
      });

      bossRushGrid.appendChild(card);
    });
  }

  // 渲染數論研究院科技樹
  function renderTechTree() {
    if (!techBranchesContainer || !techAvailableStars || !techTotalStars) return;

    techAvailableStars.textContent = techTree.getAvailableStars();
    techTotalStars.textContent = `/ ${techTree.getTotalEarnedStars()} 獲得`;
    techBranchesContainer.innerHTML = '';

    TECH_BRANCHES.forEach(branch => {
      const col = document.createElement('div');
      col.className = 'tech-branch-column';

      col.innerHTML = `
        <div class="tech-branch-header">
          <span class="tech-branch-icon">${branch.icon}</span>
          <div>
            <div class="tech-branch-title">${branch.name}</div>
            <div class="tech-branch-desc">${branch.desc}</div>
          </div>
        </div>
        <div class="tech-nodes-list" id="nodes-${branch.id}"></div>
      `;

      const nodesList = col.querySelector(`#nodes-${branch.id}`);
      const branchNodes = Object.values(TECH_NODES)
        .filter(n => n.branch === branch.id)
        .sort((a, b) => a.tier - b.tier);

      branchNodes.forEach(node => {
        const isUnlocked = techTree.isUnlocked(node.id);
        const canUnlock = techTree.canUnlock(node.id);

        const card = document.createElement('div');
        let stateClass = 'locked';
        let costLabel = `🔒 需前置/點數 (${node.cost} ⭐)`;

        if (isUnlocked) {
          stateClass = 'unlocked';
          costLabel = '✔ 已研發';
        } else if (canUnlock) {
          stateClass = 'available';
          costLabel = `${node.cost} ⭐ 研發`;
        }

        card.className = `tech-node-card ${stateClass}`;
        card.innerHTML = `
          <div class="tech-node-top">
            <div class="tech-node-identity">
              <span class="tech-node-icon">${node.icon}</span>
              <span class="tech-node-name">${node.name}</span>
            </div>
            <span class="tech-node-cost">${costLabel}</span>
          </div>
          <div class="tech-node-desc">${node.desc}</div>
        `;

        if (canUnlock && !isUnlocked) {
          card.addEventListener('click', () => {
            const ok = techTree.unlock(node.id);
            if (ok) {
              renderTechTree();
              if (game) game.syncUI();
            }
          });
        }

        nodesList.appendChild(card);
      });

      techBranchesContainer.appendChild(col);
    });
  }

  if (btnTechTree) {
    btnTechTree.addEventListener('click', () => {
      renderTechTree();
      modalTechTree.classList.remove('hidden');
    });
  }

  if (btnCloseTechTree) {
    btnCloseTechTree.addEventListener('click', () => {
      modalTechTree.classList.add('hidden');
    });
  }

  if (btnResetTech) {
    btnResetTech.addEventListener('click', () => {
      techTree.reset();
      renderTechTree();
      if (game) game.syncUI();
    });
  }

  function updateSpellButtons(stats) {
    if (!hudManaVal || !hudManaFill) return;
    hudManaVal.textContent = `${stats.mana} / ${stats.maxMana}`;
    hudManaFill.style.width = `${Math.min(100, Math.max(0, (stats.mana / stats.maxMana) * 100))}%`;

    const spellDefs = [
      { id: 'gcd', btn: btnSpellGcd, cdEl: cdSpellGcd, cost: 50 },
      { id: 'vortex', btn: btnSpellVortex, cdEl: cdSpellVortex, cost: 85 },
      { id: 'overdrive', btn: btnSpellOverdrive, cdEl: cdSpellOverdrive, cost: 50 }
    ];

    spellDefs.forEach(({ id, btn, cdEl, cost }) => {
      if (!btn) return;
      const cd = stats.spellCooldowns ? (stats.spellCooldowns[id] || 0) : 0;
      const isAiming = stats.aimingSpell === id;

      if (cd > 0) {
        btn.disabled = true;
        btn.classList.remove('aiming');
        if (cdEl) {
          cdEl.classList.remove('hidden');
          cdEl.textContent = `${cd.toFixed(1)}s`;
        }
      } else {
        btn.disabled = stats.mana < cost;
        if (cdEl) cdEl.classList.add('hidden');
        if (isAiming) {
          btn.classList.add('aiming');
        } else {
          btn.classList.remove('aiming');
        }
      }
    });
  }

  // ==========================================================
  // 砲塔 / 秘術放大特寫 Spotlight 動態渲染控制
  // ==========================================================
  let spotlightAnimFrame = null;

  function drawSpotlightCanvas(ctx, type, icon, color, timestamp) {
    if (!ctx) return;
    ctx.clearRect(0, 0, 160, 160);
    const cx = 80;
    const cy = 80;
    const t = (timestamp || 0) * 0.001;

    // 1. 背景能量微波光環
    ctx.save();
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 70);
    grad.addColorStop(0, `${color}44`);
    grad.addColorStop(0.7, `${color}11`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. 外圍旋轉符文結界環
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.8);
    ctx.strokeStyle = `${color}66`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, 58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // 3. 核心底座與旋轉砲管/幾何結晶
    ctx.save();
    ctx.translate(cx, cy);

    if (type === 'PRIME_2') {
      // 雙子砲：雙重旋轉砲管
      ctx.rotate(t * 1.5);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fillRect(-6, -42, 12, 28);
      ctx.fillRect(-6, 14, 12, 28);
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (type === 'PRIME_3') {
      // 三元激光：三角旋轉棱鏡
      ctx.rotate(t * 1.2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 3);
        ctx.fillRect(-5, -42, 10, 26);
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (type === 'PRIME_5') {
      // 五芒衝擊：五芒星砲台
      ctx.rotate(t * 1.0);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 5);
        ctx.fillRect(-4, -40, 8, 24);
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 25, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (type === 'PRIME_7') {
      // 七曜天琴：七曜星弦
      ctx.rotate(t * 0.9);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      for (let i = 0; i < 7; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 7);
        ctx.fillRect(-3, -42, 6, 26);
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (type === 'ABSOLUTE') {
      // 絕對值稜鏡：旋轉晶體鑽石
      ctx.rotate(t * 1.2);
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(0, -38);
      ctx.lineTo(32, 0);
      ctx.lineTo(0, 38);
      ctx.lineTo(-32, 0);
      ctx.closePath();
      ctx.strokeStyle = '#f3e8ff';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = 'rgba(192, 132, 252, 0.3)';
      ctx.fill();
    } else if (type === 'SQRT') {
      // 方根重力井：旋轉雙層方框
      ctx.rotate(t * 1.1);
      ctx.strokeStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 16;
      ctx.lineWidth = 3;
      ctx.strokeRect(-26, -26, 52, 52);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = '#fde047';
      ctx.strokeRect(-20, -20, 40, 40);
    } else if (type === 'OPERATOR') {
      // 運算子調整塔：八角量子脈衝陣
      ctx.rotate(t * 1.4);
      ctx.strokeStyle = '#14b8a6';
      ctx.shadowColor = '#14b8a6';
      ctx.shadowBlur = 16;
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 2);
        ctx.strokeRect(-18, -18, 36, 36);
        ctx.restore();
      }
    } else if (type === 'ZERO_FREEZE') {
      // 絕對零度塔：冰晶雪花
      ctx.rotate(-t * 1.0);
      ctx.strokeStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -40);
        ctx.moveTo(-10, -26);
        ctx.lineTo(0, -34);
        ctx.lineTo(10, -26);
        ctx.stroke();
        ctx.restore();
      }
    } else if (type === 'UPGRADE_SELL') {
      // 升級變賣：旋轉金環與升級箭頭
      ctx.rotate(t * 1.2);
      ctx.strokeStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 16;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 2);
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(8, -30);
        ctx.lineTo(-8, -30);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    } else if (type === 'SPELLS') {
      // 指揮官秘術：三色量子奧義陣
      ctx.rotate(t * 1.6);
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath(); ctx.arc(0, 0, 42, 0, (Math.PI * 2) / 3); ctx.stroke();
      ctx.strokeStyle = '#c084fc';
      ctx.shadowColor = '#c084fc';
      ctx.beginPath(); ctx.arc(0, 0, 42, (Math.PI * 2) / 3, (Math.PI * 4) / 3); ctx.stroke();
      ctx.strokeStyle = '#fbbf24';
      ctx.shadowColor = '#fbbf24';
      ctx.beginPath(); ctx.arc(0, 0, 42, (Math.PI * 4) / 3, Math.PI * 2); ctx.stroke();
    } else if (type === 'FUSION_DERIVATIVE') {
      // 費馬導數天琴：微分求導音刃與切線光刀
      ctx.rotate(t * 2.2);
      ctx.strokeStyle = '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(0, 0, 36, -Math.PI / 3, Math.PI / 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 36, (2 * Math.PI) / 3, (4 * Math.PI) / 3);
      ctx.stroke();
      // 切線光刃
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-42, -20);
      ctx.lineTo(42, 20);
      ctx.stroke();
    } else if (type === 'FUSION_MONTE_CARLO') {
      // 蒙地卡羅機率投擲機：量子多面體骰子
      ctx.rotate(t * 1.5);
      ctx.strokeStyle = '#a855f7';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 3;
      ctx.strokeRect(-24, -24, 48, 48);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(-18, -18, 36, 36);
    } else if (type === 'FUSION_FACTORIAL') {
      // n! 階乘坍縮波：三重同心因數擴散衝擊環
      ctx.rotate(t * 1.8);
      ctx.strokeStyle = '#ec4899';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 22;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.strokeStyle = '#f43f5e';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#fbbf24';
      ctx.stroke();
    } else if (type && type.startsWith('FUSION_')) {
      // 複合神塔通用：雙環陀螺儀
      ctx.rotate(t * 2);
      ctx.strokeStyle = '#ec4899';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 44, 20, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.rotate(Math.PI / 2);
      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.ellipse(0, 0, 44, 20, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (type === 'RESONANCE_TRIANGLE') {
      // 幾何共鳴結界：旋轉三角結界光環與質數頂點
      ctx.rotate(t * 0.9);
      ctx.strokeStyle = '#c084fc';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 3;
      const r = 40;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const ang = (i * Math.PI * 2) / 3 - Math.PI / 2;
        const x = Math.cos(ang) * r;
        const y = Math.sin(ang) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = 'rgba(168, 85, 247, 0.22)';
      ctx.fill();

      // 頂點質數能量節點
      const nodeColors = ['#38bdf8', '#fbbf24', '#34d399'];
      for (let i = 0; i < 3; i++) {
        const ang = (i * Math.PI * 2) / 3 - Math.PI / 2;
        const x = Math.cos(ang) * r;
        const y = Math.sin(ang) * r;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = nodeColors[i];
        ctx.shadowColor = nodeColors[i];
        ctx.shadowBlur = 10;
        ctx.fill();
      }
    } else {
      // 結業考核 / 預設
      ctx.rotate(t * 1.2);
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 4. 中心文字符號 (不隨整體旋轉)
    ctx.restore();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.font = 'bold 22px "Outfit", "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.fillText(icon || 'TD', 0, 0);
    ctx.restore();
  }

  function showTowerSpotlight(stepInfo, waveNum = 1, totalWaves = 12) {
    if (!modalTowerSpotlight || !stepInfo) return;
    const sp = stepInfo.spotlight || {};
    const color = sp.color || '#38bdf8';
    const icon = sp.icon || 'TD';
    const type = sp.towerType || 'PRIME_2';

    const activeLevelId = game ? game.currentLevelId : null;
    const lesson = activeLevelId ? TUTORIAL_LESSONS.find(l => l.id === activeLevelId) : null;

    if (spotlightBadge) spotlightBadge.textContent = sp.category || '🌟 數論特訓';
    if (spotlightStepTag) {
      if (lesson && lesson.lessonNum) {
        spotlightStepTag.textContent = `第 ${lesson.lessonNum} 課`;
      } else {
        spotlightStepTag.textContent = `第 ${waveNum} / ${totalWaves} 課`;
      }
    }
    if (spotlightTitle) spotlightTitle.textContent = sp.name || stepInfo.title;
    if (spotlightFormula) spotlightFormula.textContent = sp.formula || stepInfo.formula;
    if (spotlightTargets) spotlightTargets.textContent = sp.targets || stepInfo.targetEnemies;
    if (spotlightDesc) spotlightDesc.textContent = sp.desc || stepInfo.keyPoint;
    if (spotlightIconLabel) {
      spotlightIconLabel.textContent = icon;
      spotlightIconLabel.style.color = color;
      spotlightIconLabel.style.borderColor = `${color}66`;
    }
    if (spotlightHalo) {
      spotlightHalo.style.background = `radial-gradient(circle, ${color}55 0%, transparent 70%)`;
    }

    modalTowerSpotlight.classList.remove('hidden');

    // 啟動 Canvas 旋轉動畫循環
    if (spotlightCanvas) {
      const ctx = spotlightCanvas.getContext('2d');
      if (spotlightAnimFrame) cancelAnimationFrame(spotlightAnimFrame);

      const loop = (ts) => {
        drawSpotlightCanvas(ctx, type, icon, color, ts);
        if (!modalTowerSpotlight.classList.contains('hidden')) {
          spotlightAnimFrame = requestAnimationFrame(loop);
        }
      };
      spotlightAnimFrame = requestAnimationFrame(loop);
    }
  }

  function closeTowerSpotlight() {
    if (spotlightAnimFrame) {
      cancelAnimationFrame(spotlightAnimFrame);
      spotlightAnimFrame = null;
    }
    if (modalTowerSpotlight) {
      modalTowerSpotlight.classList.add('hidden');
    }
  }

  if (btnCloseSpotlight) {
    btnCloseSpotlight.addEventListener('click', closeTowerSpotlight);
  }

  if (btnSpotlightX) {
    btnSpotlightX.addEventListener('click', closeTowerSpotlight);
  }

  if (modalTowerSpotlight) {
    modalTowerSpotlight.addEventListener('click', (e) => {
      if (e.target === modalTowerSpotlight) {
        closeTowerSpotlight();
      }
    });
  }

  // 初始化遊戲實體
  let game;
  let currentGold = 0;
  let currentNextLevelId = null;

  game = new Game(canvas, {
    onStatsChange: (stats, gameInstance) => {
      currentGold = stats.gold;
      elGold.textContent = stats.gold;
      elLives.textContent = stats.isTutorial ? `🛡️ ∞ (核心免傷)` : `${stats.lives} / ${stats.maxLives}`;
      hudLevelName.textContent = stats.currentLevelName;

      const currentWave = stats.isLevelFinished ? stats.totalWaves : Math.min(Math.max(1, stats.displayWaveNumber), stats.totalWaves === '∞' ? 999 : stats.totalWaves);
      elWave.textContent = `第 ${currentWave} / ${stats.totalWaves} 波`;
      if (elEnemies) {
        elEnemies.textContent = stats.remainingEnemies !== undefined ? stats.remainingEnemies : 0;
      }
      elWaveTitle.textContent = stats.waveTitle;
      elWaveTip.textContent = stats.waveTip;

      if (stats.waveInProgress) {
        btnStartWave.disabled = true;
        btnStartWave.classList.add('in-progress');
        btnStartWave.innerHTML = '<span class="pulse-dot"></span> 波次進行中...';
      } else {
        btnStartWave.disabled = false;
        btnStartWave.classList.remove('in-progress');
        btnStartWave.innerHTML = '▶ 開始下一波 (Space)';
      }

      btnSpeed.textContent = stats.gameSpeed + 'x 速度';
      btnPause.textContent = stats.isPaused ? '▶ 繼續' : '⏸ 暫停';

      // 教學指引看板與 Spotlight 特寫彈窗觸發
      if (stats.isTutorial && stats.tutorialStep) {
        if (hudTutorialBanner) {
          hudTutorialBanner.classList.remove('hidden');
          if (tutStepTitle) tutStepTitle.textContent = stats.tutorialStep.title;
          if (tutTargetTag) tutTargetTag.textContent = stats.tutorialStep.targetEnemies;
          if (tutFormulaText) tutFormulaText.textContent = stats.tutorialStep.formula;
          if (tutActionPrompt) tutActionPrompt.textContent = stats.tutorialStep.actionPrompt;
        }

        // 當切換至新教學波次時，彈出 4 秒放大特寫標示 (Spotlight Highlight)
        if (game && game.tutorialManager && game.tutorialManager.lastSpotlightWave !== stats.waveIndex && !stats.isLevelFinished) {
          game.tutorialManager.lastSpotlightWave = stats.waveIndex;
          showTowerSpotlight(stats.tutorialStep, currentWave, stats.totalWaves);
        }

        // 推薦防禦塔引導光效 (Guided Highlight)
        const recTower = stats.tutorialStep.recommendedTower;
        const spotTower = stats.tutorialStep.spotlight ? stats.tutorialStep.spotlight.towerType : null;

        // 1. 建造面板卡片高亮
        buildOptionCards.forEach(card => {
          if (recTower && card.dataset.towerType === recTower) {
            card.classList.add('guided-highlight');
          } else {
            card.classList.remove('guided-highlight');
          }
        });

        // 2. 升級與變賣操作按鈕高亮 (第 9 課)
        const isUpgradeSellLesson = (recTower === 'UPGRADE_SELL' || spotTower === 'UPGRADE_SELL');
        if (btnUpgradeDamage) btnUpgradeDamage.classList.toggle('guided-highlight', isUpgradeSellLesson);
        if (btnUpgradeSpeed) btnUpgradeSpeed.classList.toggle('guided-highlight', isUpgradeSellLesson);
        if (btnSell) btnSell.classList.toggle('guided-highlight', isUpgradeSellLesson);

        // 3. QWE 指揮官秘術按鈕高亮 (第 10 課)
        const isSpellsLesson = (recTower === 'SPELLS' || spotTower === 'SPELLS');
        if (btnSpellGcd) btnSpellGcd.classList.toggle('guided-highlight', isSpellsLesson);
        if (btnSpellVortex) btnSpellVortex.classList.toggle('guided-highlight', isSpellsLesson);
        if (btnSpellOverdrive) btnSpellOverdrive.classList.toggle('guided-highlight', isSpellsLesson);
      } else {
        if (hudTutorialBanner) hudTutorialBanner.classList.add('hidden');
        buildOptionCards.forEach(card => card.classList.remove('guided-highlight'));
        if (btnUpgradeDamage) btnUpgradeDamage.classList.remove('guided-highlight');
        if (btnUpgradeSpeed) btnUpgradeSpeed.classList.remove('guided-highlight');
        if (btnSell) btnSell.classList.remove('guided-highlight');
        if (btnSpellGcd) btnSpellGcd.classList.remove('guided-highlight');
        if (btnSpellVortex) btnSpellVortex.classList.remove('guided-highlight');
        if (btnSpellOverdrive) btnSpellOverdrive.classList.remove('guided-highlight');
      }

      // 魔王血條更新
      if (stats.activeBoss) {
        bossBarContainer.classList.remove('hidden');
        bossName.textContent = `👑 魔王：${stats.activeBoss.name}`;
        bossHpText.textContent = `剩餘數值: ${stats.activeBoss.value} / ${stats.activeBoss.originalValue}`;
        bossHpFill.style.width = `${stats.activeBoss.percent}%`;
      } else {
        bossBarContainer.classList.add('hidden');
      }

      // 檢查遊戲結束
      const targetInstance = gameInstance || game;
      if (stats.lives <= 0 && targetInstance && !targetInstance.isGameOverReported) {
        targetInstance.isGameOverReported = true;
        if (targetInstance.gameMode === 'endless') {
          const reachedWave = targetInstance.waveManager.currentWaveIndex;
          const bestWave = progress.getEndlessRecord(targetInstance.endlessMapId);
          gameoverTitle.textContent = '♾️ 無盡試煉結算！';
          gameoverDesc.textContent = `你在【${stats.currentLevelName}】成功防守至 第 ${reachedWave} 波！（本圖歷史最佳：第 ${bestWave} 波）`;
        } else {
          gameoverTitle.textContent = '💀 核心受損，防線崩潰！';
          gameoverDesc.textContent = `你在【${stats.currentLevelName}】奮戰至最後。複習質因數、絕對值與運算子技巧，再來挑戰一次吧！`;
        }
        modalGameOver.classList.remove('hidden');
      }

      // 更新建造按鈕金幣可負擔狀態
      updateBuildOptions(stats.gold);

      // 更新選取塔按鈕狀態
      if (stats.selectedTower) {
        updateTowerPanel(stats.selectedTower, stats.gold);
      }

      // 更新指揮官秘術與能量條狀態 (扣除能量與冷卻即時刷新)
      updateSpellButtons(stats);
    },

    onTowerSelect: (tower) => {
      if (tower) {
        panelTower.classList.remove('hidden');
        if (panelPadBuild) panelPadBuild.classList.add('hidden');
        updateTowerPanel(tower, currentGold);
        positionPanelNear(panelTower, tower.x, tower.y);
        requestAnimationFrame(() => {
          positionPanelNear(panelTower, tower.x, tower.y);
        });
      } else {
        panelTower.classList.add('hidden');
      }
    },

    onPadSelect: (pad) => {
      if (pad) {
        if (panelPadBuild) panelPadBuild.classList.remove('hidden');
        panelTower.classList.add('hidden');
        updateBuildOptions(currentGold);
        applyTutorialTowerHighlight(game.currentLevelId);
        positionPanelNear(panelPadBuild, pad.x, pad.y);
        requestAnimationFrame(() => {
          positionPanelNear(panelPadBuild, pad.x, pad.y);
        });
      } else {
        if (panelPadBuild && !game.selectedBuildPos) panelPadBuild.classList.add('hidden');
      }
    },

    onBuildPosSelect: (pos) => {
      if (pos) {
        if (panelPadBuild) panelPadBuild.classList.remove('hidden');
        panelTower.classList.add('hidden');
        updateBuildOptions(currentGold);
        applyTutorialTowerHighlight(game.currentLevelId);
        positionPanelNear(panelPadBuild, pos.x, pos.y);
        requestAnimationFrame(() => {
          positionPanelNear(panelPadBuild, pos.x, pos.y);
        });
      } else {
        if (panelPadBuild && !game.selectedPad) panelPadBuild.classList.add('hidden');
      }
    },

    onSyncPanels: () => {
      if (game.selectedTower && !panelTower.classList.contains('hidden')) {
        positionPanelNear(panelTower, game.selectedTower.x, game.selectedTower.y);
      }
      if (game.selectedPad && !panelPadBuild.classList.contains('hidden')) {
        positionPanelNear(panelPadBuild, game.selectedPad.x, game.selectedPad.y);
      }
      if (game.selectedBuildPos && !panelPadBuild.classList.contains('hidden')) {
        positionPanelNear(panelPadBuild, game.selectedBuildPos.x, game.selectedBuildPos.y);
      }
    },

    onLevelVictory: ({ levelId, levelName, stars, nextLevelId, isBossRush, bossRushStage, isTutorial }) => {
      currentNextLevelId = nextLevelId;

      if (isTutorial) {
        const isMaster = levelId === 'tutorial_master';
        victoryLevelTitle.textContent = isMaster ? `🎓 數論作戰學院特訓畢業！` : `🎓 課堂特訓守衛成功！`;
        victoryStars.textContent = '🎓🎓🎓';
        victoryLevelDesc.textContent = isMaster
          ? `恭喜你！已完全掌握所有 8 大基礎防禦塔、4 大複合神塔與指揮官秘術功用！`
          : `成功通關【${levelName}】！已掌握該項目之數論克制與戰術技巧！`;
      } else if (isBossRush) {
        victoryLevelTitle.textContent = `👑 魔王 Stage ${bossRushStage} 討伐成功！`;
        let starsDisplay = '⭐⭐⭐';
        if (stars === 2) starsDisplay = '⭐⭐☆';
        else if (stars === 1) starsDisplay = '⭐☆☆';
        victoryStars.textContent = starsDisplay;
        victoryLevelDesc.textContent = nextLevelId
          ? `成功擊潰魔王！準備迎戰下一階強敵！(獲得 +3 研究點數 ⭐)`
          : `🎉 恭喜！你已成功通關全部 5 階魔王連戰！`;
      } else {
        victoryLevelTitle.textContent = `🏆 關卡【${levelName}】守衛成功！`;
        let starsDisplay = '⭐⭐⭐';
        if (stars === 2) starsDisplay = '⭐⭐☆';
        else if (stars === 1) starsDisplay = '⭐☆☆';
        victoryStars.textContent = starsDisplay;
        victoryLevelDesc.textContent = `成功擊潰該關卡全部怪物波次！(獲得 +1 研究點數 ⭐)`;
      }

      if (nextLevelId) {
        btnNextLevel.style.display = 'block';
        if (isTutorial) {
          btnNextLevel.textContent = levelId === 'tutorial_master' ? `🚀 開始挑戰第一章冒險` : `▶ 前進下一堂特訓課`;
        } else if (isBossRush) {
          btnNextLevel.textContent = `▶ 挑戰魔王 Stage ${bossRushStage + 1}`;
        } else {
          btnNextLevel.textContent = `▶ 前進下一關卡`;
        }
      } else {
        btnNextLevel.style.display = 'none';
      }

      modalLevelVictory.classList.remove('hidden');
    }
  });

  function updateTowerPanel(tower, goldAmount) {
    let labelDesc = `${tower.label}號質數砲`;
    if (tower.label === '|x|') labelDesc = '絕對值稜鏡';
    else if (tower.label === '±1') labelDesc = '運算子調整塔';
    else if (tower.label === '√x') labelDesc = '方根重力井';
    else if (tower.label === '×0') labelDesc = '絕對零度力場塔';
    else if (tower.label === '2×3') labelDesc = '六芒雙曜神塔';
    else if (tower.label === '3×5') labelDesc = '星軌聚財加農';
    else if (tower.label === '|√x|') labelDesc = '虛數引力稜鏡';
    else if (tower.label === 'n!') labelDesc = '階乘坍縮波 (限2座·終極神域)';

    towerName.textContent = `${tower.label} - ${labelDesc}`;

    if (tower.type === 'fusion_factorial' || !tower.isUpgradeable) {
      towerLevel.textContent = '終極神域 (不可升級)';
      towerLevel.style.color = '#ec4899';

      // 1. 射程維度
      statRangeLvl.textContent = 'MAX';
      statRangeLvl.classList.add('max-tag');
      statRangeVal.textContent = `${tower.range}px (終極)`;
      costUpgradeRange.textContent = 'MAX';
      btnUpgradeRange.disabled = true;

      // 2. 威力維度
      statDamageLvl.textContent = 'MAX';
      statDamageLvl.classList.add('max-tag');
      statDamageVal.textContent = `${tower.damage} (終極)`;
      costUpgradeDamage.textContent = 'MAX';
      btnUpgradeDamage.disabled = true;

      // 3. 攻速維度
      statSpeedLvl.textContent = 'MAX';
      statSpeedLvl.classList.add('max-tag');
      statSpeedVal.textContent = `${tower.fireRate}/s (終極)`;
      costUpgradeSpeed.textContent = 'MAX';
      btnUpgradeSpeed.disabled = true;
    } else {
      towerLevel.style.color = '';
      const totalUpgradePoints = (tower.rangeLevel - 1) + (tower.damageLevel - 1) + (tower.speedLevel - 1);
      towerLevel.textContent = totalUpgradePoints > 0 ? `Lv ${tower.level} (★+${totalUpgradePoints})` : `Lv 1`;

      // 1. 射程維度
      statRangeLvl.textContent = `Lv ${tower.rangeLevel}/${tower.maxRangeLevel}`;
      if (tower.rangeLevel >= tower.maxRangeLevel) {
        statRangeLvl.classList.add('max-tag');
        statRangeVal.textContent = `${tower.range}px (已達上限)`;
        costUpgradeRange.textContent = 'MAX';
        btnUpgradeRange.disabled = true;
      } else {
        statRangeLvl.classList.remove('max-tag');
        const nextRange = tower.getNextRange();
        statRangeVal.innerHTML = `${tower.range}px <span class="val-arrow">➔</span> <span class="val-next">${nextRange}px</span>`;
        const cost = tower.getUpgradeRangeCost();
        costUpgradeRange.textContent = `${cost}🪙`;
        btnUpgradeRange.disabled = goldAmount < cost;
      }

      // 2. 威力維度
      statDamageLvl.textContent = `Lv ${tower.damageLevel}/${tower.maxDamageLevel}`;
      if (tower.damageLevel >= tower.maxDamageLevel) {
        statDamageLvl.classList.add('max-tag');
        statDamageVal.textContent = `${tower.damage} (已達上限)`;
        costUpgradeDamage.textContent = 'MAX';
        btnUpgradeDamage.disabled = true;
      } else {
        statDamageLvl.classList.remove('max-tag');
        const nextDamage = tower.getNextDamage();
        statDamageVal.innerHTML = `${tower.damage} <span class="val-arrow">➔</span> <span class="val-next">${nextDamage}</span>`;
        const cost = tower.getUpgradeDamageCost();
        costUpgradeDamage.textContent = `${cost}🪙`;
        btnUpgradeDamage.disabled = goldAmount < cost;
      }

      // 3. 攻速維度
      statSpeedLvl.textContent = `Lv ${tower.speedLevel}/${tower.maxSpeedLevel}`;
      if (tower.speedLevel >= tower.maxSpeedLevel) {
        statSpeedLvl.classList.add('max-tag');
        statSpeedVal.textContent = `${tower.fireRate}/s (已達上限)`;
        costUpgradeSpeed.textContent = 'MAX';
        btnUpgradeSpeed.disabled = true;
      } else {
        statSpeedLvl.classList.remove('max-tag');
        const nextSpeed = tower.getNextFireRate();
        statSpeedVal.innerHTML = `${tower.fireRate}/s <span class="val-arrow">➔</span> <span class="val-next">${nextSpeed}/s</span>`;
        const cost = tower.getUpgradeSpeedCost();
        costUpgradeSpeed.textContent = `${cost}🪙`;
        btnUpgradeSpeed.disabled = goldAmount < cost;
      }
    }

    // 4. 複合神塔融合選項
    if (btnFuseTower) {
      const fusions = tower.getAvailableFusions ? tower.getAvailableFusions(game) : [];
      if (fusions.length > 0) {
        const fusion = fusions[0];
        btnFuseTower.classList.remove('hidden');
        const canFuse = game ? game.canBuildTowerType(fusion.key, tower) : true;
        if (!canFuse) {
          btnFuseTower.textContent = `⚛️ ${fusion.targetType.label} 全場已建置 (1/1)`;
          btnFuseTower.disabled = true;
        } else {
          btnFuseTower.textContent = `⚛️ 升級為 ${fusion.targetType.label} (${fusion.cost}🪙)`;
          btnFuseTower.disabled = goldAmount < fusion.cost;
          btnFuseTower.onclick = () => {
            if (game.gold >= fusion.cost) {
              const success = tower.fuseInto(fusion.key, game);
              if (success) {
                game.gold -= fusion.cost;
                game.syncUI();
                updateTowerPanel(tower, game.gold);
              }
            }
          };
        }
      } else {
        btnFuseTower.classList.add('hidden');
      }
    }

    // 5. 變賣按鈕 (含快捷鍵提示 [S])
    btnSell.textContent = `💰 變賣 (+${tower.sellValue}🪙) [S]`;

    // 6. 損毀/受損修復按鈕 (快捷鍵 [R])
    if (btnRepairTower) {
      if (tower.isBroken || tower.hp < tower.maxHp) {
        btnRepairTower.classList.remove('hidden');
        const rCost = tower.getRepairCost ? tower.getRepairCost() : 20;
        btnRepairTower.textContent = `🔧 修復 (${rCost}🪙) [R]`;
        btnRepairTower.disabled = goldAmount < rCost;
      } else {
        btnRepairTower.classList.add('hidden');
      }
    }
  }

  // 綁定上方空基座建造面板中的塔選項點擊
  buildOptionCards.forEach(card => {
    card.addEventListener('click', () => {
      const typeKey = card.dataset.towerType;
      game.buildTowerOnSelectedPad(typeKey);
    });
  });

  // 波次控制按鈕
  btnStartWave.addEventListener('click', () => {
    game.startNextWave();
  });

  // 需求5: 速度與暫停放在遊戲區塊
  btnSpeed.addEventListener('click', () => {
    game.toggleSpeed();
  });

  btnPause.addEventListener('click', () => {
    game.togglePause();
  });

  // 返回主選單首頁
  if (btnBackHome) {
    btnBackHome.addEventListener('click', () => {
      showHomeScreen();
    });
  }

  // 首頁主選單按鈕綁定
  if (btnHomeAdventure) {
    btnHomeAdventure.addEventListener('click', () => {
      renderStageMap(currentActiveChapter);
      modalStageMap.classList.remove('hidden');
    });
  }

  // 渲染無盡模式地圖選擇卡片清單
  function renderEndlessMaps() {
    if (!endlessMapsGrid) return;
    endlessMapsGrid.innerHTML = '';

    if (endlessGlobalRecordText) {
      const globalRec = progress.getEndlessRecord();
      endlessGlobalRecordText.textContent = globalRec > 0 ? `第 ${globalRec} 波` : '尚未挑戰';
    }

    const maps = endlessManager.getEndlessMaps();
    maps.forEach(m => {
      const record = progress.getEndlessRecord(m.id);
      const card = document.createElement('div');
      card.className = 'endless-map-card';

      const isMythic = m.difficultyStars === '👑';
      const badgeClass = isMythic ? 'endless-diff-badge mythic' : 'endless-diff-badge';
      const recordText = record > 0 ? `🏆 最佳紀錄: 第 ${record} 波` : '尚未挑戰';
      const recordBadgeClass = record > 0 ? 'endless-record-badge' : 'endless-record-badge no-record';

      card.innerHTML = `
        <div class="endless-card-header">
          <span class="endless-map-icon">${m.icon}</span>
          <span class="${badgeClass}">${m.difficultyStars} ${m.difficulty}</span>
        </div>
        <div class="endless-map-name">${m.name}</div>
        <div class="endless-map-subtitle">${m.subtitle}</div>
        <div class="endless-tag-row">
          <span class="endless-tag">${m.tag}</span>
          <span class="endless-gold-tag">${m.gold}🪙</span>
        </div>
        <div class="endless-map-desc">${m.desc}</div>
        <div class="${recordBadgeClass}">
          <span>${recordText}</span>
          <span>▶</span>
        </div>
        <button class="btn-start-endless-map">進入挑戰 ➔</button>
      `;

      card.addEventListener('click', () => {
        if (modalEndlessSelect) modalEndlessSelect.classList.add('hidden');
        showBattleScreen(m.id, 'endless', m.id);
      });

      endlessMapsGrid.appendChild(card);
    });
  }

  if (btnHomeEndless) {
    btnHomeEndless.addEventListener('click', () => {
      renderEndlessMaps();
      if (modalEndlessSelect) modalEndlessSelect.classList.remove('hidden');
    });
  }

  if (btnCloseEndlessSelect) {
    btnCloseEndlessSelect.addEventListener('click', () => {
      if (modalEndlessSelect) modalEndlessSelect.classList.add('hidden');
    });
  }

  if (modalEndlessSelect) {
    modalEndlessSelect.addEventListener('click', (e) => {
      if (e.target === modalEndlessSelect) {
        modalEndlessSelect.classList.add('hidden');
      }
    });
  }

  if (btnHomeBossRush) {
    btnHomeBossRush.addEventListener('click', () => {
      renderBossRush();
      if (modalBossRush) modalBossRush.classList.remove('hidden');
    });
  }

  if (btnCloseBossRush) {
    btnCloseBossRush.addEventListener('click', () => {
      if (modalBossRush) modalBossRush.classList.add('hidden');
    });
  }

  if (modalBossRush) {
    modalBossRush.addEventListener('click', (e) => {
      if (e.target === modalBossRush) {
        modalBossRush.classList.add('hidden');
      }
    });
  }

  // 需求4: 數論研究所 科技樹 放在遊戲首頁選單，必須通關後才能點擊科技樹
  if (btnHomeTechTree) {
    btnHomeTechTree.addEventListener('click', () => {
      if (!progress.hasClearedAnyLevel()) {
        alert('🔒【數論研究院】尚未開放！\n\n您必須至少通關任意冒險關卡、無盡試煉或魔王連戰，獲得數論權限後方可開啟科技樹！');
        return;
      }
      renderTechTree();
      modalTechTree.classList.remove('hidden');
    });
  }

  if (btnHomeGuide) {
    btnHomeGuide.addEventListener('click', () => {
      modalGuide.classList.remove('hidden');
    });
  }

  if (btnGuideInGame) {
    btnGuideInGame.addEventListener('click', () => {
      modalGuide.classList.remove('hidden');
    });
  }

  // 需求2: 音效放在遊戲首頁做 ON、OFF 的設定
  if (btnHomeSound) {
    btnHomeSound.addEventListener('click', () => {
      sound.muted = !sound.muted;
      updateHomeScreenState();
    });
  }

  // 需求3: 重置遊戲放在遊戲首頁
  if (btnHomeReset) {
    btnHomeReset.addEventListener('click', () => {
      handleResetGame();
    });
  }

  // 塔三向獨立升級與變賣
  if (btnUpgradeRange) {
    btnUpgradeRange.addEventListener('click', () => {
      game.upgradeSelectedTowerStat('range');
    });
  }

  if (btnUpgradeDamage) {
    btnUpgradeDamage.addEventListener('click', () => {
      game.upgradeSelectedTowerStat('damage');
    });
  }

  if (btnUpgradeSpeed) {
    btnUpgradeSpeed.addEventListener('click', () => {
      game.upgradeSelectedTowerStat('speed');
    });
  }

  if (btnSell) {
    btnSell.addEventListener('click', () => {
      game.sellSelectedTower();
    });
  }

  if (btnRepairTower) {
    btnRepairTower.addEventListener('click', () => {
      if (game) game.repairSelectedTower();
    });
  }

  if (btnDeselect) {
    btnDeselect.addEventListener('click', (e) => {
      e.stopPropagation();
      game.selectTower(null);
    });
  }

  // 關卡地圖 Modal
  if (btnMap) {
    btnMap.addEventListener('click', () => {
      renderStageMap(currentActiveChapter);
      modalStageMap.classList.remove('hidden');
    });
  }

  if (btnCloseMap) {
    btnCloseMap.addEventListener('click', () => {
      modalStageMap.classList.add('hidden');
    });
  }

  if (modalStageMap) {
    modalStageMap.addEventListener('click', (e) => {
      if (e.target === modalStageMap) {
        modalStageMap.classList.add('hidden');
      }
    });
  }

  chapterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      renderStageMap(tab.dataset.chapter);
    });
  });

  if (btnUnlockAll) {
    btnUnlockAll.addEventListener('click', () => {
      progress.unlockAllLevels();
      renderStageMap(currentActiveChapter);
      updateHomeScreenState();
    });
  }

  // 重置遊戲全部進度與 LocalStorage
  function handleResetGame() {
    const ok = window.confirm('⚠️ 確定要重置整個遊戲嗎？\n\n這將會清除所有本地存檔紀錄，包含已解鎖關卡、數論科技樹研發、研究點數等，完全恢復至最初狀態！');
    if (ok) {
      progress.clearAllData();
      techTree.reset();
      window.location.reload();
    }
  }

  if (btnResetGameMap) {
    btnResetGameMap.addEventListener('click', handleResetGame);
  }

  // 單關通關按鈕
  if (btnNextLevel) {
    btnNextLevel.addEventListener('click', () => {
      modalLevelVictory.classList.add('hidden');
      if (currentNextLevelId) {
        if (currentNextLevelId.startsWith('boss_rush_')) {
          const stageIdx = parseInt(currentNextLevelId.split('_')[2]) || 1;
          showBattleScreen(currentNextLevelId, 'boss_rush', stageIdx);
        } else if (currentNextLevelId.startsWith('tutorial_') || currentNextLevelId === 'tutorial_master') {
          showBattleScreen(currentNextLevelId, 'tutorial');
        } else {
          showBattleScreen(currentNextLevelId);
        }
      }
    });
  }

  if (btnBackToMap) {
    btnBackToMap.addEventListener('click', () => {
      modalLevelVictory.classList.add('hidden');
      switchMapMode('adventure');
      modalStageMap.classList.remove('hidden');
    });
  }

  if (btnReplayLevel) {
    btnReplayLevel.addEventListener('click', () => {
      modalLevelVictory.classList.add('hidden');
      game.restart();
    });
  }

  // 遊戲結束按鈕
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      modalGameOver.classList.add('hidden');
      game.isGameOverReported = false;
      game.restart();
    });
  }

  if (btnGameoverMap) {
    btnGameoverMap.addEventListener('click', () => {
      modalGameOver.classList.add('hidden');
      switchMapMode('adventure');
      modalStageMap.classList.remove('hidden');
    });
  }

  // 遊戲手冊 Modal
  if (btnGuide) {
    btnGuide.addEventListener('click', () => {
      modalGuide.classList.remove('hidden');
    });
  }

  if (btnCloseGuide) {
    btnCloseGuide.addEventListener('click', () => {
      modalGuide.classList.add('hidden');
    });
  }

  if (modalGuide) {
    modalGuide.addEventListener('click', (e) => {
      if (e.target === modalGuide) {
        modalGuide.classList.add('hidden');
      }
    });
  }

  // 防止面板內部點擊觸發向外冒泡
  if (panelTower) {
    panelTower.addEventListener('click', (e) => e.stopPropagation());
  }
  if (panelPadBuild) {
    panelPadBuild.addEventListener('click', (e) => e.stopPropagation());
  }

  // 點擊外部空白處關閉選單 (若點到整個遊戲畫布容器之外，才關閉選單)
  document.addEventListener('click', (e) => {
    if (e.target.closest('.canvas-container') ||
        e.target.closest('#game-canvas') ||
        e.target.closest('#tower-details-panel') ||
        e.target.closest('#pad-build-panel') ||
        e.target.closest('.commander-spells-bar') ||
        e.target.closest('.modal-content') ||
        e.target.closest('.control-btn') ||
        e.target.closest('#btn-start-wave')) {
      return;
    }
    if (game) {
      game.selectTower(null);
      game.selectPad(null);
    }
  });

  // 指揮官秘術按鈕點擊綁定
  if (btnSpellGcd) {
    btnSpellGcd.addEventListener('click', (e) => {
      e.stopPropagation();
      if (game && game.spellManager) {
        game.spellManager.startAiming('gcd');
        game.syncUI();
      }
    });
  }

  if (btnSpellVortex) {
    btnSpellVortex.addEventListener('click', (e) => {
      e.stopPropagation();
      if (game && game.spellManager) {
        game.spellManager.startAiming('vortex');
        game.syncUI();
      }
    });
  }

  if (btnSpellOverdrive) {
    btnSpellOverdrive.addEventListener('click', (e) => {
      e.stopPropagation();
      if (game && game.spellManager) {
        game.spellManager.castInstant('overdrive');
        game.syncUI();
      }
    });
  }

  // 鍵盤快捷鍵支援
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      game.startNextWave();
    } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
      // 1. 若當前選中了砲塔，快捷鍵 1, 2, 3 分別對應三向升級：1-攻擊距離, 2-攻擊威力, 3-攻擊速度
      if (game && game.selectedTower && ['1', '2', '3'].includes(e.key)) {
        e.preventDefault();
        if (e.key === '1') {
          if (btnUpgradeRange && !btnUpgradeRange.disabled) {
            btnUpgradeRange.click();
          } else {
            sound.playResist();
          }
        } else if (e.key === '2') {
          if (btnUpgradeDamage && !btnUpgradeDamage.disabled) {
            btnUpgradeDamage.click();
          } else {
            sound.playResist();
          }
        } else if (e.key === '3') {
          if (btnUpgradeSpeed && !btnUpgradeSpeed.disabled) {
            btnUpgradeSpeed.click();
          } else {
            sound.playResist();
          }
        }
      } else if (game && (game.selectedPad || game.selectedBuildPos)) {
        // 2. 建造砲塔時，點到各種標籤選單，各砲塔的快捷鍵都是從 1 開始 (1, 2, 3, 4, 5, 6)
        const num = parseInt(e.key, 10);
        const activeList = document.querySelector('.build-options-list:not(.hidden)');
        if (activeList) {
          const cards = activeList.querySelectorAll('.build-option-card');
          const targetCard = cards[num - 1];
          if (targetCard) {
            e.preventDefault();
            if (targetCard.disabled) {
              sound.playResist();
            } else {
              targetCard.click();
            }
          }
        }
      }
    } else if (e.key === 'Tab') {
      // 建造面板開啟時，支援 Tab 鍵循環切換選單標籤 (質數 -> 代數力場 -> 複合神塔)
      if (game && (game.selectedPad || game.selectedBuildPos)) {
        e.preventDefault();
        const tabs = ['prime', 'special', 'fusion'];
        const nextIdx = (tabs.indexOf(currentBuildTab) + 1) % tabs.length;
        switchBuildTab(tabs[nextIdx]);
      }
    } else if (e.key === 'r' || e.key === 'R') {
      // 快捷鍵 R: 修復當前選取的受損或損毀砲塔
      if (game && game.selectedTower) {
        e.preventDefault();
        if (btnRepairTower && !btnRepairTower.disabled) {
          btnRepairTower.click();
        } else {
          sound.playResist();
        }
      }
    } else if (e.key === 's' || e.key === 'S') {
      // 快速鍵：s 賣掉砲塔
      if (game.selectedTower) {
        e.preventDefault();
        game.sellSelectedTower();
      }
    } else if (e.key === 'f' || e.key === 'F') {
      if (game.selectedTower && btnFuseTower && !btnFuseTower.classList.contains('hidden') && !btnFuseTower.disabled) {
        e.preventDefault();
        btnFuseTower.click();
      }
    } else if (e.key === 'q' || e.key === 'Q') {
      // 指揮官主動秘術 Q: GCD 引爆
      if (game && game.spellManager) {
        game.spellManager.startAiming('gcd');
        game.syncUI();
      }
    } else if (e.key === 'w' || e.key === 'W') {
      // 指揮官主動秘術 W: 同餘黑洞 mod 5
      if (game && game.spellManager) {
        game.spellManager.startAiming('vortex');
        game.syncUI();
      }
    } else if (e.key === 'e' || e.key === 'E') {
      // 指揮官主動秘術 E: 黃金分割超頻
      if (game && game.spellManager) {
        game.spellManager.castInstant('overdrive');
        game.syncUI();
      }
    } else if (e.key === 'm' || e.key === 'M') {
      renderStageMap(currentActiveChapter);
      modalStageMap.classList.toggle('hidden');
    } else if (e.key === 't' || e.key === 'T') {
      // 快捷鍵 T 開啟數論研究院
      if (progress.hasClearedAnyLevel()) {
        renderTechTree();
        modalTechTree.classList.toggle('hidden');
      } else {
        alert('🔒【數論研究院】尚未開放！\n\n您必須至少通關任意冒險關卡、無盡試煉或魔王連戰，獲得數論權限後方可開啟科技樹！');
      }
    } else if (e.key === 'Escape') {
      if (game && game.spellManager && game.spellManager.isAiming) {
        game.spellManager.cancelAiming();
      }
      game.selectBuildType(null);
      game.selectTower(null);
      game.selectPad(null);
      game.selectBuildPos(null);
      modalGuide.classList.add('hidden');
      modalStageMap.classList.add('hidden');
      if (modalBossRush) modalBossRush.classList.add('hidden');
      if (modalEndlessSelect) modalEndlessSelect.classList.add('hidden');
      modalTechTree.classList.add('hidden');
      game.syncUI();
    }
  });

  // 視窗縮放時重新調整浮動面板座標
  window.addEventListener('resize', () => {
    if (game && game.selectedPad) {
      positionPanelNear(panelPadBuild, game.selectedPad.x, game.selectedPad.y);
    } else if (game && game.selectedBuildPos) {
      positionPanelNear(panelPadBuild, game.selectedBuildPos.x, game.selectedBuildPos.y);
    } else if (game && game.selectedTower) {
      positionPanelNear(panelTower, game.selectedTower.x, game.selectedTower.y);
    }
  });

  // 初始載入時顯示遊戲首頁與主選單
  showHomeScreen();
});
