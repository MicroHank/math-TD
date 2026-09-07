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
      levelStars: {} // { '1-1': 3, '1-2': 2 }
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
      levelStars: {}
    };
    this.save();
  }
}

export const progress = new ProgressManager();
