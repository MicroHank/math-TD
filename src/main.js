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
  const towerStats = document.getElementById('selected-tower-stats');
  const btnUpgrade = document.getElementById('btn-upgrade-tower');
  const btnSell = document.getElementById('btn-sell-tower');
  const btnDeselect = document.getElementById('btn-deselect-tower');

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

  // 塔購買卡片
  const towerCards = document.querySelectorAll('.tower-card');

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

      if (isUnlocked) {
        card.addEventListener('click', () => {
          game.loadLevel(levelId);
          modalStageMap.classList.add('hidden');
        });
      }

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

      const currentWaveDisplay = stats.waveInProgress ? stats.displayWaveNumber : `${stats.displayWaveNumber - 1}`;
      elWave.textContent = `${currentWaveDisplay} / ${stats.totalWaves}`;
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

      // 更新建造卡片的金幣負擔狀態
      towerCards.forEach(card => {
        const typeKey = card.dataset.towerType;
        const config = TOWER_TYPES[typeKey];
        if (config) {
          if (stats.gold < config.cost) {
            card.classList.add('disabled');
          } else {
            card.classList.remove('disabled');
          }

          if (stats.selectedBuildType === typeKey) {
            card.classList.add('selected');
          } else {
            card.classList.remove('selected');
          }
        }
      });

      // 更新選取塔按鈕狀態
      if (stats.selectedTower) {
        updateTowerPanel(stats.selectedTower, stats.gold);
      }
    },

    onTowerSelect: (tower) => {
      if (tower) {
        panelTower.classList.remove('hidden');
        updateTowerPanel(tower, currentGold);
      } else {
        panelTower.classList.add('hidden');
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
    towerName.textContent = `${tower.label} - ${tower.label === '|x|' ? '絕對值稜鏡' : tower.label === '±1' ? '運算子調整塔' : tower.factor + '號質數砲'}`;
    towerLevel.textContent = `等級 ${tower.level} / ${tower.maxLevel}`;
    towerStats.innerHTML = `
      <span>射程: <strong>${tower.range}px</strong></span>
      <span>射速: <strong>${tower.fireRate}/秒</strong></span>
    `;

    if (tower.level < tower.maxLevel) {
      btnUpgrade.disabled = goldAmount < tower.upgradeCost;
      btnUpgrade.textContent = `🔼 升級 (${tower.upgradeCost}🪙)`;
    } else {
      btnUpgrade.disabled = true;
      btnUpgrade.textContent = '⭐ 已達最高等級';
    }

    btnSell.textContent = `💰 變賣 (+${tower.sellValue}🪙)`;
  }

  // 綁定塔購買點擊
  towerCards.forEach(card => {
    card.addEventListener('click', () => {
      const typeKey = card.dataset.towerType;
      const config = TOWER_TYPES[typeKey];
      if (game.gold >= config.cost) {
        if (game.selectedBuildType === typeKey) {
          game.selectBuildType(null);
        } else {
          game.selectBuildType(typeKey);
        }
      } else {
        sound.playResist();
      }
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

  // 塔升級與變賣
  btnUpgrade.addEventListener('click', () => {
    game.upgradeSelectedTower();
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

  // 鍵盤快捷鍵支援
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      game.startNextWave();
    } else if (e.key === '1') {
      game.selectBuildType('PRIME_2');
    } else if (e.key === '2') {
      game.selectBuildType('PRIME_3');
    } else if (e.key === '3') {
      game.selectBuildType('PRIME_5');
    } else if (e.key === '4') {
      game.selectBuildType('ABSOLUTE');
    } else if (e.key === '5') {
      game.selectBuildType('OPERATOR');
    } else if (e.key === 'm' || e.key === 'M') {
      renderStageMap(currentActiveChapter);
      modalStageMap.classList.toggle('hidden');
    } else if (e.key === 'Escape') {
      game.selectBuildType(null);
      game.selectTower(null);
      modalGuide.classList.add('hidden');
      modalStageMap.classList.add('hidden');
    }
  });
});
