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

    this.spawnQueue = [...wave.enemies];
    this.monstersCountThisWave = this.spawnQueue.length;
    this.isSpawning = true;
    this.waveInProgress = true;
    this.spawnTimer = 0.5;
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
          speed: enemyConfig.speed || (36 + Math.min(12, this.currentWaveIndex * 2)),
          splitOnDivide: !!enemyConfig.splitOnDivide,
          isBoss: !!enemyConfig.isBoss,
          bossName: enemyConfig.bossName || '',
          bossSkills: enemyConfig.bossSkills || []
        });
        game.addMonster(monster);

        if (this.spawnQueue.length > 0) {
          this.spawnTimer = enemyConfig.delay || 2.0;
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
