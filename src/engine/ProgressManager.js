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
        const parsed = JSON.parse(raw);
        if (typeof parsed.techPoints !== 'number') {
          parsed.techPoints = 0;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    // 預設進度：1-1 解鎖，科技研究點數為 0
    return {
      unlockedLevels: ['1-1'],
      levelStars: {}, // { '1-1': 3, '1-2': 2 }
      unlockedTechs: [], // ['pa_1', 'cm_1', ...]
      techPoints: 0 // 科技研究點數 (一開始為 0，每防守完成一波 +1)
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

  // 取得累積獲得的科技研究點數 (一開始為 0，每防守成功一波增加 1 點)
  getTotalStars() {
    return typeof this.data.techPoints === 'number' ? this.data.techPoints : 0;
  }

  getTechPoints() {
    return this.getTotalStars();
  }

  // 每一波防守成功增加 1 點科技研究點數
  addTechPoints(amount = 1) {
    if (typeof this.data.techPoints !== 'number') {
      this.data.techPoints = 0;
    }
    this.data.techPoints += amount;
    this.save();
    return this.data.techPoints;
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

  // 取得無盡試煉最高紀錄波次
  getEndlessRecord() {
    return this.data.endlessRecord || 0;
  }

  // 更新無盡試煉紀錄
  updateEndlessRecord(waveNumber) {
    if (waveNumber > (this.data.endlessRecord || 0)) {
      this.data.endlessRecord = waveNumber;
      this.save();
      return true;
    }
    return false;
  }

  // 取得魔王連戰最高通關階段 (0 ~ 5)
  getBossRushRecord() {
    return this.data.bossRushRecord || 0;
  }

  // 更新魔王連戰紀錄
  updateBossRushRecord(stageCleared) {
    if (stageCleared > (this.data.bossRushRecord || 0)) {
      this.data.bossRushRecord = stageCleared;
      this.save();
      return true;
    }
    return false;
  }

  // 重置遊戲所有進度與 LocalStorage，恢復最初狀態
  resetAllProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.clear();
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
    this.data = {
      unlockedLevels: ['1-1'],
      levelStars: {},
      unlockedTechs: [],
      techPoints: 0,
      endlessRecord: 0,
      bossRushRecord: 0
    };
  }

  // 完全清除所有 LocalStorage 存檔並重置至遊戲最初始狀態
  clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.clear();
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
    this.resetProgress();
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
export const progressManager = progress;

