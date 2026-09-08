// Wave Manager supporting custom Levels, Multi-lanes, Bosses, Twin Primes, and Endless Mode
import { Monster } from '../entities/Monster.js';
import { endlessManager } from '../engine/EndlessManager.js';
import { progressManager } from '../engine/ProgressManager.js';

export class WaveManager {
  constructor(levelData) {
    this.loadLevel(levelData);
  }

  loadLevel(levelData) {
    this.levelData = levelData;
    this.lanes = levelData.lanes; // Array of waypoints array
    this.waves = levelData.waves ? [...levelData.waves] : [];
    this.currentWaveIndex = 0;
    this.isSpawning = false;
    this.waveInProgress = false;
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.monstersCountThisWave = 0;
    this.monsterIdCounter = 1;
    this.isEndlessMode = levelData.id === 'endless';
    this.recentTwinSpawn = null;
  }

  get totalWaves() {
    if (this.isEndlessMode) return '∞';
    return this.waves ? this.waves.length : 0;
  }

  get isLevelFinished() {
    if (this.isEndlessMode) return false;
    return this.currentWaveIndex >= this.totalWaves;
  }

  get currentWaveData() {
    if (this.waves && this.currentWaveIndex < this.waves.length) {
      const w = this.waves[this.currentWaveIndex];
      return {
        waveNumber: this.currentWaveIndex + 1,
        title: w.title,
        tip: w.tip,
        enemies: w.enemies
      };
    }
    return null;
  }

  startNextWave() {
    if (this.waveInProgress || (!this.isEndlessMode && this.isLevelFinished)) return false;

    // 若為無盡模式且波次尚未生成，動態生成下一波
    if (this.isEndlessMode && this.currentWaveIndex >= this.waves.length) {
      const nextWaveData = endlessManager.generateEndlessWave(this.currentWaveIndex + 1);
      this.waves.push(nextWaveData);
    }

    const wave = this.currentWaveData;
    if (!wave) return false;

    // 1. 複製敵軍資料並區分普通怪與魔王
    const enemies = wave.enemies.map(e => ({ ...e }));
    const normalEnemies = [];
    const bossEnemies = [];

    enemies.forEach(e => {
      if (e.isBoss) {
        bossEnemies.push(e);
      } else {
        normalEnemies.push(e);
      }
    });

    // 2. Fisher-Yates 洗牌演算法：打亂普通怪物出場順序 (保持成對孿生怪相鄰)
    for (let i = normalEnemies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [normalEnemies[i], normalEnemies[j]] = [normalEnemies[j], normalEnemies[i]];
    }

    // 3. 隨機路線分配 (避免固定在上路或下路) 與時間延遲/速度微幅抖動
    const numLanes = this.lanes ? this.lanes.length : 1;
    const allEnemies = [...normalEnemies, ...bossEnemies];

    this.spawnQueue = allEnemies.map(e => {
      const chosenLane = numLanes > 1
        ? Math.floor(Math.random() * numLanes)
        : (e.lane !== undefined ? e.lane : 0);

      const baseDelay = e.delay || 0.8;
      const jitteredDelay = +(baseDelay * (0.75 + Math.random() * 0.50)).toFixed(2);

      const baseSpeed = e.speed || (58 + Math.min(20, this.currentWaveIndex * 4));
      const jitteredSpeed = Math.round(baseSpeed * (0.92 + Math.random() * 0.16));

      return {
        ...e,
        lane: chosenLane,
        delay: jitteredDelay,
        speed: jitteredSpeed
      };
    });

    this.monstersCountThisWave = this.spawnQueue.length;
    this.isSpawning = true;
    this.waveInProgress = true;
    this.spawnTimer = 0.3 + Math.random() * 0.4;
    this.recentTwinSpawn = null;
    return true;
  }

  // 判定是否為孿生質數數值
  isTwinPrimeValue(val) {
    const v = Math.abs(val);
    const twins = [11, 13, 17, 19, 29, 31, 41, 43, 59, 61, 71, 73];
    return twins.includes(v);
  }

  update(dt, game) {
    if (!this.waveInProgress) return;

    if (this.isSpawning && this.spawnQueue.length > 0) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) {
        const enemyConfig = this.spawnQueue.shift();
        const laneIdx = enemyConfig.lane !== undefined ? enemyConfig.lane : 0;
        const waypoints = this.lanes[laneIdx] || this.lanes[0];

        const monster = new Monster({
          id: `m_${this.monsterIdCounter++}`,
          value: enemyConfig.val,
          waypoints: waypoints,
          speed: enemyConfig.speed || (58 + Math.min(20, this.currentWaveIndex * 4)),
          splitOnDivide: !!enemyConfig.splitOnDivide,
          isBoss: !!enemyConfig.isBoss,
          bossName: enemyConfig.bossName || '',
          bossSkills: enemyConfig.bossSkills || []
        });

        // 孿生質數雙子自動配對機制
        if (this.isTwinPrimeValue(monster.value)) {
          if (this.recentTwinSpawn && !this.recentTwinSpawn.isDead && Math.abs(this.recentTwinSpawn.value - monster.value) === 2) {
            monster.twinPartner = this.recentTwinSpawn;
            this.recentTwinSpawn.twinPartner = monster;
            monster.addFloatingText('⚡ 孿生雙子鏈接!', '#38bdf8');
            this.recentTwinSpawn.addFloatingText('⚡ 孿生雙子鏈接!', '#38bdf8');
            this.recentTwinSpawn = null;
          } else {
            this.recentTwinSpawn = monster;
          }
        }

        game.addMonster(monster);

        if (this.spawnQueue.length > 0) {
          this.spawnTimer = enemyConfig.delay || 0.8;
        } else {
          this.isSpawning = false;
        }
      }
    }

    // 檢查當前波次是否結束
    if (!this.isSpawning && game.monsters.length === 0) {
      this.waveInProgress = false;
      this.currentWaveIndex++;

      if (this.isEndlessMode) {
        // 無盡模式：持續推進波次，更新最高紀錄
        progressManager.updateEndlessRecord(this.currentWaveIndex);
        if (this.currentWaveIndex % 5 === 0) {
          // 每 5 波贈送 +5 點科研研究星級
          progressManager.addTechPoints(5);
          game.addGold(150, game.width / 2, game.height / 2);
        }
        // 動態準備下一波
        const nextWaveData = endlessManager.generateEndlessWave(this.currentWaveIndex + 1);
        this.waves.push(nextWaveData);
        game.onWaveCompleted();
      } else if (this.currentWaveIndex >= this.waves.length) {
        // 全關卡所有波次通關！
        game.onLevelCompleted();
      } else {
        // 單一波次完成，發放波次獎勵
        game.onWaveCompleted();
      }
    }
  }
}

