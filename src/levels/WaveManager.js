// Wave Manager supporting custom Levels, Multi-lanes, and Bosses
import { Monster } from '../entities/Monster.js';

export class WaveManager {
  constructor(levelData) {
    this.loadLevel(levelData);
  }

  loadLevel(levelData) {
    this.levelData = levelData;
    this.lanes = levelData.lanes; // Array of waypoints array
    this.waves = levelData.waves;
    this.currentWaveIndex = 0;
    this.isSpawning = false;
    this.waveInProgress = false;
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.monstersCountThisWave = 0;
    this.monsterIdCounter = 1;
  }

  get totalWaves() {
    return this.waves ? this.waves.length : 0;
  }

  get isLevelFinished() {
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
    if (this.waveInProgress || this.isLevelFinished) return false;
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

    // 2. Fisher-Yates 洗牌演算法：打亂普通怪物出場順序，避免固定時間出特定怪
    for (let i = normalEnemies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [normalEnemies[i], normalEnemies[j]] = [normalEnemies[j], normalEnemies[i]];
    }

    // 3. 隨機路線分配 (避免固定在上路或下路) 與時間延遲/速度微幅抖動
    const numLanes = this.lanes ? this.lanes.length : 1;
    const allEnemies = [...normalEnemies, ...bossEnemies];

    this.spawnQueue = allEnemies.map(e => {
      // 若有多條路線，進行隨機路徑分配
      const chosenLane = numLanes > 1
        ? Math.floor(Math.random() * numLanes)
        : (e.lane !== undefined ? e.lane : 0);

      // 出怪間隔隨機抖動 (0.75 ~ 1.25x)
      const baseDelay = e.delay || 0.8;
      const jitteredDelay = +(baseDelay * (0.75 + Math.random() * 0.50)).toFixed(2);

      // 行進速度微幅隨機浮動 (92% ~ 108%)，形成自然的梯隊節奏
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
    return true;
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

      if (this.currentWaveIndex >= this.waves.length) {
        // 全關卡所有波次通關！
        game.onLevelCompleted();
      } else {
        // 單一波次完成，發放波次獎勵
        game.onWaveCompleted();
      }
    }
  }
}
