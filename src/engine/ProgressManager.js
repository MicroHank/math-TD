// Progress & Save Manager for Math Tower Defense
const STORAGE_KEY = 'math_td_progress_v1';

export class ProgressManager {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    // 預設進度：1-1 解鎖
    return {
      unlockedLevels: ['1-1'],
      levelStars: {}, // { '1-1': 3, '1-2': 2 }
      unlockedTechs: [] // ['pa_1', 'cm_1', ...]
    };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  isUnlocked(levelId) {
    return this.data.unlockedLevels.includes(levelId);
  }

  getStars(levelId) {
    return this.data.levelStars[levelId] || 0;
  }

  // 取得玩家累積獲得的總星數 (若解鎖全關卡則贈送足夠星數以便體驗全科技)
  getTotalStars() {
    let sum = 0;
    for (const k in this.data.levelStars) {
      sum += (this.data.levelStars[k] || 0);
    }
    // 若玩家已解鎖所有 20 關或尚未通關很多，給予保底星星或以解鎖關卡為準
    if (this.data.unlockedLevels.length >= 20) {
      return Math.max(60, sum);
    }
    // 每解鎖一關至少可作為 3 星測試點數
    return Math.max(sum, (this.data.unlockedLevels.length - 1) * 3);
  }

  getUnlockedTechs() {
    return this.data.unlockedTechs || [];
  }

  isTechUnlocked(techId) {
    return (this.data.unlockedTechs || []).includes(techId);
  }

  unlockTech(techId) {
    if (!this.data.unlockedTechs) this.data.unlockedTechs = [];
    if (!this.data.unlockedTechs.includes(techId)) {
      this.data.unlockedTechs.push(techId);
      this.save();
      return true;
    }
    return false;
  }

  resetTechs() {
    this.data.unlockedTechs = [];
    this.save();
  }

  completeLevel(levelId, stars, nextLevelId = null) {
    const prevStars = this.data.levelStars[levelId] || 0;
    if (stars > prevStars) {
      this.data.levelStars[levelId] = stars;
    }

    if (nextLevelId && !this.data.unlockedLevels.includes(nextLevelId)) {
      this.data.unlockedLevels.push(nextLevelId);
    }

    this.save();
  }

  resetProgress() {
    this.data = {
      unlockedLevels: ['1-1'],
      levelStars: {},
      unlockedTechs: []
    };
    this.save();
  }

  unlockAllLevels() {
    const all = [
      '1-1', '1-2', '1-3', '1-4',
      '2-1', '2-2', '2-3', '2-4',
      '3-1', '3-2', '3-3', '3-4',
      '4-1', '4-2', '4-3', '4-4',
      '5-1', '5-2', '5-3', '5-4'
    ];
    this.data.unlockedLevels = [...all];
    this.save();
  }
}

export const progress = new ProgressManager();
