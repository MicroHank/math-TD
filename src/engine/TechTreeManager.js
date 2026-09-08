// Tech Tree & Meta-Progression Manager (數論研究院科技樹管理器)
// Manages branches, node unlocking, star points, and persistent game modifiers

import { progress } from './ProgressManager.js';
import { sound } from './Audio.js';

export const TECH_BRANCHES = [
  {
    id: 'prime_algebra',
    name: '質數與代數系',
    icon: '🔢',
    color: '#38bdf8',
    desc: '強化質數砲塔射程、暴擊除法、絕對值淨化與代數運算'
  },
  {
    id: 'compute_mana',
    name: '算力與秘術系',
    icon: '⚡',
    color: '#f59e0b',
    desc: '提升指揮官算力能量、GCD引爆、同餘黑洞與黃金超頻'
  },
  {
    id: 'geometry_economy',
    name: '幾何與經濟系',
    icon: '📐',
    color: '#c084fc',
    desc: '增加開局金幣、擴展幾何共鳴光弦、強化三角結界與公倍數賞金'
  }
];

export const TECH_NODES = {
  // 1. 質數與代數系
  pa_1: {
    id: 'pa_1',
    branch: 'prime_algebra',
    tier: 1,
    cost: 1,
    reqId: null,
    icon: '🎯',
    name: '埃氏篩法射程',
    desc: '質數砲塔基礎攻擊距離提升 +15%',
    formula: 'R_{prime} \\times 1.15'
  },
  pa_2: {
    id: 'pa_2',
    branch: 'prime_algebra',
    tier: 2,
    cost: 2,
    reqId: 'pa_1',
    icon: '💥',
    name: '質數共鳴暴擊',
    desc: '質因數除法有 25% 機率造成雙倍耐受度暴擊打擊',
    formula: 'P_{crit} = 25\\%, Dmg \\times 2'
  },
  pa_3: {
    id: 'pa_3',
    branch: 'prime_algebra',
    tier: 3,
    cost: 3,
    reqId: 'pa_2',
    icon: '🔮',
    name: '絕對值光通量',
    desc: '絕對值稜鏡冷卻時間縮短 30%，淨化時產生微型減速光斑',
    formula: 'CD_{abs} \\times 0.70'
  },
  pa_4: {
    id: 'pa_4',
    branch: 'prime_algebra',
    tier: 4,
    cost: 4,
    reqId: 'pa_3',
    icon: '🌀',
    name: '泰勒展開重力',
    desc: '方根重力井對非平方數的重力壓制減速提升至 50%',
    formula: 'Slow_{\\sqrt{x}} = 50\\%'
  },
  pa_5: {
    id: 'pa_5',
    branch: 'prime_algebra',
    tier: 5,
    cost: 5,
    reqId: 'pa_4',
    icon: '👑',
    name: '算術基本定理',
    desc: '所有質數砲塔升級成本 -20%，全體防禦塔威力 +25%',
    formula: 'Cost -20\\%, Dmg +25\\%'
  },

  // 2. 算力與秘術系
  cm_1: {
    id: 'cm_1',
    branch: 'compute_mana',
    tier: 1,
    cost: 1,
    reqId: null,
    icon: '⚡',
    name: '算力超頻核心',
    desc: '初始算力上限提升至 125，每秒自然恢復速度 +0.8',
    formula: 'Mana_{max} = 125, +0.8/s'
  },
  cm_2: {
    id: 'cm_2',
    branch: 'compute_mana',
    tier: 2,
    cost: 2,
    reqId: 'cm_1',
    icon: '📐',
    name: '歐幾里得爆發',
    desc: 'GCD 引爆範圍 +20%，對互質怪造成的震波傷害提升至 60',
    formula: 'Radius +20\\%, Dmg = 60'
  },
  cm_3: {
    id: 'cm_3',
    branch: 'compute_mana',
    tier: 3,
    cost: 3,
    reqId: 'cm_2',
    icon: '🌌',
    name: '同餘奇異點',
    desc: '同餘黑洞持續時間延長至 8.0s，吸引減速提升至 50%',
    formula: 'Dur = 8.0s, Slow = 50\\%'
  },
  cm_4: {
    id: 'cm_4',
    branch: 'compute_mana',
    tier: 4,
    cost: 4,
    reqId: 'cm_3',
    icon: '⚡',
    name: '斐波那契極速',
    desc: '黃金超頻期間，所有防禦塔攻速倍率提升至 2.0x',
    formula: 'Speed_{\\phi} = 2.0\\times'
  },
  cm_5: {
    id: 'cm_5',
    branch: 'compute_mana',
    tier: 5,
    cost: 5,
    reqId: 'cm_4',
    icon: '✨',
    name: '量子數論核心',
    desc: '每波開始時立即全額回滿算力能量',
    formula: 'WaveStart: Mana = 100\\%'
  },

  // 3. 幾何與經濟系
  ge_1: {
    id: 'ge_1',
    branch: 'geometry_economy',
    tier: 1,
    cost: 1,
    reqId: null,
    icon: '🪙',
    name: '國庫儲備算力',
    desc: '每關開局初始金幣額外獲得 +80',
    formula: 'Gold_{init} + 80'
  },
  ge_2: {
    id: 'ge_2',
    branch: 'geometry_economy',
    tier: 2,
    cost: 2,
    reqId: 'ge_1',
    icon: '🔗',
    name: '幾何光弦擴展',
    desc: '幾何共鳴光弦最大連線距離擴大至 360px',
    formula: 'L_{max} = 360px'
  },
  ge_3: {
    id: 'ge_3',
    branch: 'geometry_economy',
    tier: 3,
    cost: 3,
    reqId: 'ge_2',
    icon: '🔺',
    name: '三角聖域強化',
    desc: '共鳴三角結界攻速加成升至 +18%，怪物減速升至 22%',
    formula: 'Buff +18\\%, Slow 22\\%'
  },
  ge_4: {
    id: 'ge_4',
    branch: 'geometry_economy',
    tier: 4,
    cost: 4,
    reqId: 'ge_3',
    icon: '✨',
    name: '畢氏光能矩陣',
    desc: '畢氏聖光打擊傷害提升至 50 且發動間隔縮短至 2.0s',
    formula: 'Dmg = 50, Int = 2.0s'
  },
  ge_5: {
    id: 'ge_5',
    branch: 'geometry_economy',
    tier: 5,
    cost: 5,
    reqId: 'ge_4',
    icon: '🔮',
    name: '公倍數鍊金術',
    desc: '擊破公倍數合體巨獸額外獲得 +50% 金幣賞金與 +30 算力',
    formula: 'LCM Bounty +50\\%, +30⚡'
  }
};

export class TechTreeManager {
  constructor() {
    this.nodes = TECH_NODES;
    this.branches = TECH_BRANCHES;
  }

  isUnlocked(techId) {
    return progress.isTechUnlocked(techId);
  }

  getTotalEarnedStars() {
    return progress.getTotalStars();
  }

  getSpentStars() {
    const unlocked = progress.getUnlockedTechs();
    let spent = 0;
    unlocked.forEach(id => {
      if (this.nodes[id]) {
        spent += this.nodes[id].cost;
      }
    });
    return spent;
  }

  getAvailableStars() {
    return Math.max(0, this.getTotalEarnedStars() - this.getSpentStars());
  }

  canUnlock(techId) {
    const node = this.nodes[techId];
    if (!node) return false;
    if (this.isUnlocked(techId)) return false;

    // 前置科技檢查
    if (node.reqId && !this.isUnlocked(node.reqId)) {
      return false;
    }

    // 星星點數檢查
    return this.getAvailableStars() >= node.cost;
  }

  unlock(techId) {
    if (!this.canUnlock(techId)) {
      sound.playResist();
      return false;
    }

    const ok = progress.unlockTech(techId);
    if (ok) {
      sound.playTechUnlock();
    }
    return ok;
  }

  reset() {
    progress.resetTechs();
    sound.playTechReset();
    return true;
  }

  // 取得運行時各項加成數值
  getPrimeRangeMultiplier() {
    return this.isUnlocked('pa_1') ? 1.15 : 1.0;
  }

  getPrimeCritChance() {
    return this.isUnlocked('pa_2') ? 0.25 : 0;
  }

  getAbsoluteCooldownMultiplier() {
    return this.isUnlocked('pa_3') ? 0.70 : 1.0;
  }

  getSqrtSlowRatio() {
    return this.isUnlocked('pa_4') ? 0.50 : 0.65;
  }

  getTowerDamageMultiplier() {
    return this.isUnlocked('pa_5') ? 1.25 : 1.0;
  }

  getPrimeUpgradeDiscount() {
    return this.isUnlocked('pa_5') ? 0.20 : 0;
  }

  getMaxManaBonus() {
    return this.isUnlocked('cm_1') ? 25 : 0;
  }

  getManaRegenBonus() {
    return this.isUnlocked('cm_1') ? 0.8 : 0;
  }

  getGcdRadiusMultiplier() {
    return this.isUnlocked('cm_2') ? 1.20 : 1.0;
  }

  getGcdCoprimeDamage() {
    return this.isUnlocked('cm_2') ? 60 : 30;
  }

  getVortexDuration() {
    return this.isUnlocked('cm_3') ? 8.0 : 5.5;
  }

  getOverdriveMultiplier() {
    return this.isUnlocked('cm_4') ? 2.0 : 1.618;
  }

  hasQuantumRefill() {
    return this.isUnlocked('cm_5');
  }

  getInitialGoldBonus() {
    return this.isUnlocked('ge_1') ? 80 : 0;
  }

  getMaxLinkDistance() {
    return this.isUnlocked('ge_2') ? 360 : 300;
  }

  getTriangleSpeedBonus() {
    return this.isUnlocked('ge_3') ? 0.18 : 0.12;
  }

  getTriangleSlowRatio() {
    return this.isUnlocked('ge_3') ? 0.78 : 0.85;
  }

  getPythagoreanPulseDamage() {
    return this.isUnlocked('ge_4') ? 50 : 28;
  }

  getPythagoreanInterval() {
    return this.isUnlocked('ge_4') ? 2.0 : 2.5;
  }

  getLcmGoldBonus() {
    return this.isUnlocked('ge_5') ? 0.50 : 0;
  }

  getLcmManaBonus() {
    return this.isUnlocked('ge_5') ? 30 : 20;
  }
}

export const techTree = new TechTreeManager();
