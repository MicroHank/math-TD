// Bootstrapping and UI Event Wiring for Math Tower Defense
import { Game } from './engine/Game.js';
import { TOWER_TYPES } from './entities/Tower.js';
import { LEVELS, CHAPTERS } from './levels/LevelData.js';
import { progress } from './engine/ProgressManager.js';
import { sound } from './engine/Audio.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');

  // DOM 元素引用
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
  const btnSound = document.getElementById('btn-sound');
  const btnGuide = document.getElementById('btn-guide');
  const modalGuide = document.getElementById('modal-guide');
  const btnCloseGuide = document.getElementById('btn-close-guide');

  // 關卡地圖元素
  const btnMap = document.getElementById('btn-map');
  const modalStageMap = document.getElementById('modal-stage-map');
  const btnCloseMap = document.getElementById('btn-close-map');
  const btnUnlockAll = document.getElementById('btn-unlock-all');
  const stagesGrid = document.getElementById('stages-grid');
  const chapterTabs = document.querySelectorAll('.chapter-tabs .tab-btn');

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

  const btnSell = document.getElementById('btn-sell-tower');
  const btnDeselect = document.getElementById('btn-deselect-tower');

  // 點選空基座建造面板 DOM
  const panelPadBuild = document.getElementById('pad-build-panel');
  const btnCloseBuildPanel = document.getElementById('btn-close-build-panel');
  const tabBuildPrime = document.getElementById('tab-build-prime');
  const tabBuildSpecial = document.getElementById('tab-build-special');
  const buildListPrime = document.getElementById('build-list-prime');
  const buildListSpecial = document.getElementById('build-list-special');
  const buildOptionCards = document.querySelectorAll('.build-option-card');

  function switchBuildTab(tabKey) {
    if (tabKey === 'prime') {
      if (tabBuildPrime) tabBuildPrime.classList.add('active');
      if (tabBuildSpecial) tabBuildSpecial.classList.remove('active');
      if (buildListPrime) buildListPrime.classList.remove('hidden');
      if (buildListSpecial) buildListSpecial.classList.add('hidden');
    } else {
      if (tabBuildPrime) tabBuildPrime.classList.remove('active');
      if (tabBuildSpecial) tabBuildSpecial.classList.add('active');
      if (buildListPrime) buildListPrime.classList.add('hidden');
      if (buildListSpecial) buildListSpecial.classList.remove('hidden');
    }
  }

  if (tabBuildPrime) tabBuildPrime.addEventListener('click', () => switchBuildTab('prime'));
  if (tabBuildSpecial) tabBuildSpecial.addEventListener('click', () => switchBuildTab('special'));
  if (btnCloseBuildPanel) {
    btnCloseBuildPanel.addEventListener('click', () => {
      if (game) game.selectPad(null);
    });
  }

  function updateBuildOptions(goldAmount) {
    buildOptionCards.forEach(card => {
      const typeKey = card.dataset.towerType;
      const config = TOWER_TYPES[typeKey];
      if (config) {
        card.disabled = (goldAmount < config.cost);
      }
    });
  }

  // 依據目標在 Canvas 上的座標，動態將面板定位在砲塔/基座身旁 (而非固定在右側)
  function positionPanelNear(panelElement, targetX, targetY) {
    if (!panelElement || targetX === undefined || targetY === undefined) return;
    const container = canvas.parentElement;
    if (!container) return;

    const rect = canvas.getBoundingClientRect();
    const containerWidth = container.clientWidth || rect.width;
    const containerHeight = container.clientHeight || rect.height;

    const scaleX = rect.width / canvas.width;
    const scaleY = rect.height / canvas.height;
    const targetCssX = targetX * scaleX;
    const targetCssY = targetY * scaleY;

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
    panelElement.style.top = `${Math.round(top)}px`;
    panelElement.style.right = 'auto';
    panelElement.style.bottom = 'auto';
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

  let currentGold = 160;
  let currentNextLevelId = null;
  let currentActiveChapter = 'world-1';

  // 渲染大地圖關卡清單
  function renderStageMap(chapterId) {
    currentActiveChapter = chapterId;
    stagesGrid.innerHTML = '';
    const chapter = CHAPTERS.find(c => c.id === chapterId);
    if (!chapter) return;

    // 更新分頁按鈕高亮
    chapterTabs.forEach(tab => {
      if (tab.dataset.chapter === chapterId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

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
            game.loadLevel(levelId);
            modalStageMap.classList.add('hidden');
          }
          return;
        }
        game.loadLevel(levelId);
        modalStageMap.classList.add('hidden');
      });

      stagesGrid.appendChild(card);
    });
  }

  // 初始化遊戲實體
  let game;
  game = new Game(canvas, {
    onStatsChange: (stats, gameInstance) => {
      currentGold = stats.gold;
      elGold.textContent = stats.gold;
      elLives.textContent = `${stats.lives} / ${stats.maxLives}`;
      hudLevelName.textContent = stats.currentLevelName;

      const currentWave = stats.isLevelFinished ? stats.totalWaves : Math.min(Math.max(1, stats.displayWaveNumber), stats.totalWaves);
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

      btnSpeed.textContent = stats.gameSpeed === 1 ? '1x 速度' : '2x 速度';
      btnPause.textContent = stats.isPaused ? '▶ 繼續' : '⏸ 暫停';

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
        gameoverTitle.textContent = '💀 核心受損，防線崩潰！';
        gameoverDesc.textContent = `你在【${stats.currentLevelName}】奮戰至最後。複習質因數、絕對值與運算子技巧，再來挑戰一次吧！`;
        modalGameOver.classList.remove('hidden');
      }

      // 更新建造按鈕金幣可負擔狀態
      updateBuildOptions(stats.gold);

      // 更新選取塔按鈕狀態
      if (stats.selectedTower) {
        updateTowerPanel(stats.selectedTower, stats.gold);
      }
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
        positionPanelNear(panelPadBuild, pad.x, pad.y);
        requestAnimationFrame(() => {
          positionPanelNear(panelPadBuild, pad.x, pad.y);
        });
      } else {
        if (panelPadBuild) panelPadBuild.classList.add('hidden');
      }
    },

    onLevelVictory: ({ levelId, levelName, stars, nextLevelId }) => {
      currentNextLevelId = nextLevelId;
      modalLevelVictory.classList.remove('hidden');
      victoryLevelTitle.textContent = `🎉【${levelName}】通關！`;

      let starsDisplay = '☆☆☆';
      if (stars === 3) starsDisplay = '⭐⭐⭐ (完美防守！)';
      else if (stars === 2) starsDisplay = '⭐⭐☆ (穩健過關！)';
      else if (stars === 1) starsDisplay = '⭐☆☆ (險勝生還！)';
      victoryStars.textContent = starsDisplay;

      if (nextLevelId) {
        btnNextLevel.style.display = 'block';
        btnNextLevel.textContent = `▶ 前進下一關卡 (${nextLevelId})`;
      } else {
        btnNextLevel.style.display = 'none';
      }
    }
  });

  function updateTowerPanel(tower, goldAmount) {
    let labelDesc = `${tower.label}號質數砲`;
    if (tower.label === '|x|') labelDesc = '絕對值稜鏡';
    else if (tower.label === '±1') labelDesc = '運算子調整塔';
    else if (tower.label === '√x') labelDesc = '方根重力井';
    else if (tower.label === '×0') labelDesc = '絕對零度力場塔';
    towerName.textContent = `${tower.label} - ${labelDesc}`;
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

    // 4. 變賣按鈕 (含快捷鍵提示 [S])
    btnSell.textContent = `💰 變賣 (+${tower.sellValue}🪙) [S]`;
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

  btnSpeed.addEventListener('click', () => {
    game.toggleSpeed();
  });

  btnPause.addEventListener('click', () => {
    game.togglePause();
  });

  btnSound.addEventListener('click', () => {
    sound.muted = !sound.muted;
    btnSound.textContent = sound.muted ? '🔇 靜音' : '🔊 音效';
  });

  // 塔三向獨立升級與變賣
  btnUpgradeRange.addEventListener('click', () => {
    game.upgradeSelectedTowerStat('range');
  });

  btnUpgradeDamage.addEventListener('click', () => {
    game.upgradeSelectedTowerStat('damage');
  });

  btnUpgradeSpeed.addEventListener('click', () => {
    game.upgradeSelectedTowerStat('speed');
  });

  btnSell.addEventListener('click', () => {
    game.sellSelectedTower();
  });

  btnDeselect.addEventListener('click', () => {
    game.selectTower(null);
  });

  // 關卡地圖 Modal
  btnMap.addEventListener('click', () => {
    renderStageMap(currentActiveChapter);
    modalStageMap.classList.remove('hidden');
  });

  btnCloseMap.addEventListener('click', () => {
    modalStageMap.classList.add('hidden');
  });

  modalStageMap.addEventListener('click', (e) => {
    if (e.target === modalStageMap) {
      modalStageMap.classList.add('hidden');
    }
  });

  chapterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      renderStageMap(tab.dataset.chapter);
    });
  });

  if (btnUnlockAll) {
    btnUnlockAll.addEventListener('click', () => {
      progress.unlockAllLevels();
      renderStageMap(currentActiveChapter);
    });
  }

  // 單關通關按鈕
  btnNextLevel.addEventListener('click', () => {
    modalLevelVictory.classList.add('hidden');
    if (currentNextLevelId) {
      game.loadLevel(currentNextLevelId);
    }
  });

  btnBackToMap.addEventListener('click', () => {
    modalLevelVictory.classList.add('hidden');
    renderStageMap(currentActiveChapter);
    modalStageMap.classList.remove('hidden');
  });

  btnReplayLevel.addEventListener('click', () => {
    modalLevelVictory.classList.add('hidden');
    game.restart();
  });

  // 遊戲結束按鈕
  btnRestart.addEventListener('click', () => {
    modalGameOver.classList.add('hidden');
    game.isGameOverReported = false;
    game.restart();
  });

  btnGameoverMap.addEventListener('click', () => {
    modalGameOver.classList.add('hidden');
    renderStageMap(currentActiveChapter);
    modalStageMap.classList.remove('hidden');
  });

  // 數論作戰指南 Modal
  btnGuide.addEventListener('click', () => {
    modalGuide.classList.remove('hidden');
  });

  btnCloseGuide.addEventListener('click', () => {
    modalGuide.classList.add('hidden');
  });

  modalGuide.addEventListener('click', (e) => {
    if (e.target === modalGuide) {
      modalGuide.classList.add('hidden');
    }
  });

  // 點擊外部空白處關閉選單 (需求2: 點到旁邊空白時，就將選單關閉)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#game-canvas') &&
        !e.target.closest('#tower-details-panel') &&
        !e.target.closest('#pad-build-panel') &&
        !e.target.closest('.modal-content') &&
        !e.target.closest('.control-btn') &&
        !e.target.closest('#btn-start-wave')) {
      if (game) {
        game.selectTower(null);
        game.selectPad(null);
      }
    }
  });

  // 鍵盤快捷鍵支援
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      game.startNextWave();
    } else if (e.key === 's' || e.key === 'S') {
      // 需求4: 快速鍵：s 賣掉砲塔
      if (game.selectedTower) {
        e.preventDefault();
        game.sellSelectedTower();
      }
    } else if (e.key === '1') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('PRIME_2');
    } else if (e.key === '2') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('PRIME_3');
    } else if (e.key === '3') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('PRIME_5');
    } else if (e.key === '4') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('PRIME_7');
    } else if (e.key === 'q' || e.key === 'Q') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('ABSOLUTE');
    } else if (e.key === 'w' || e.key === 'W') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('SQRT');
    } else if (e.key === 'e' || e.key === 'E') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('OPERATOR');
    } else if (e.key === 'r' || e.key === 'R') {
      if (game.selectedPad) game.buildTowerOnSelectedPad('ZERO_FREEZE');
    } else if (e.key === 'm' || e.key === 'M') {
      renderStageMap(currentActiveChapter);
      modalStageMap.classList.toggle('hidden');
    } else if (e.key === 'Escape') {
      game.selectBuildType(null);
      game.selectTower(null);
      game.selectPad(null);
      modalGuide.classList.add('hidden');
      modalStageMap.classList.add('hidden');
    }
  });

  // 視窗縮放時重新調整浮動面板座標
  window.addEventListener('resize', () => {
    if (game && game.selectedPad) {
      positionPanelNear(panelPadBuild, game.selectedPad.x, game.selectedPad.y);
    } else if (game && game.selectedTower) {
      positionPanelNear(panelTower, game.selectedTower.x, game.selectedTower.y);
    }
  });
});
