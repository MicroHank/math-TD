// Perk & Roguelike Talents Manager for Math Tower Defense

export const ALL_PERKS = [
  // 1. 經濟流
  {
    id: 'compound_interest',
    name: '複利增長',
    category: 'economy',
    rarity: 'rare',
    icon: '💰',
    subtitle: '經濟流 · 投資分紅',
    desc: '每防守成功一個波次，結算現有庫存金幣的額外利息。',
    formula: '+10% 波次利息 (上限 150 🪙)',
    data: { interestRate: 0.10, cap: 150 }
  },
  {
    id: 'zero_sum',
    name: '零和博弈',
    category: 'economy',
    rarity: 'common',
    icon: '🏷️',
    subtitle: '經濟流 · 建造補貼',
    desc: '透過數學零和分配，大幅降低所有防禦塔的建造與佈署成本。',
    formula: '所有防禦塔建造費用 -15%',
    data: { costDiscount: 0.15 }
  },
  {
    id: 'golden_ratio_bounty',
    name: '黃金收割',
    category: 'economy',
    rarity: 'epic',
    icon: '✨',
    subtitle: '經濟流 · 黃金比例 φ',
    desc: '怪物生命值被完全分解至 1 時，產生的能量金幣大幅加成！',
    formula: '擊殺消滅金幣 +50%',
    data: { goldMultiplier: 0.50 }
  },
  {
    id: 'liquidation',
    name: '破產清算',
    category: 'economy',
    rarity: 'common',
    icon: '🔄',
    subtitle: '經濟流 · 零損耗轉換',
    desc: '變更戰略拆除防禦塔時，全額退還原本消耗的金幣。',
    formula: '防禦塔變賣返還 100% 金幣',
    data: { refundRatio: 1.0 }
  },

  // 2. 質數流
  {
    id: 'prime_theorem',
    name: '質數定理',
    category: 'prime',
    rarity: 'rare',
    icon: '⚡',
    subtitle: '質數流 · 連鎖雙除',
    desc: '質數輕砲與重砲命中時，有機率引發共振，一發除以兩次質數！',
    formula: '質數砲有 25% 機率產生「雙重除法」',
    data: { doubleChance: 0.25 }
  },
  {
    id: 'euler_sieve',
    name: '歐拉篩法',
    category: 'prime',
    rarity: 'epic',
    icon: '🌀',
    subtitle: '質數流 · 因數爆破',
    desc: '任何怪物被完全分解殺死時，向周圍擴散因數震波，對相鄰怪物造成除法衝擊！',
    formula: '消滅時對周圍 130px 敵人造成範圍因數爆破',
    data: { radius: 130 }
  },
  {
    id: 'twin_primes',
    name: '孿生共振',
    category: 'prime',
    rarity: 'common',
    icon: '👥',
    subtitle: '質數流 · 協同火網',
    desc: '當場上同時存在【2號砲】與【3號砲】時，二者產生孿生素數共振。',
    formula: '2號與3號砲攻擊速度提升 +25%',
    data: { speedBuff: 0.25 }
  },
  {
    id: 'coprime_pierce',
    name: '互質削甲',
    category: 'prime',
    rarity: 'rare',
    icon: '🛡️',
    subtitle: '質數流 · 耐受度穿透',
    desc: '質數砲攻擊無法整除的怪物時，強力粉碎其護盾與耐受度防線。',
    formula: '未整除時護盾耐受度削減量 +40%',
    data: { armorBreakBonus: 0.40 }
  },

  // 3. 幾何與射程流
  {
    id: 'archimedes_spiral',
    name: '阿基米德螺旋',
    category: 'geometry',
    rarity: 'common',
    icon: '🎯',
    subtitle: '幾何流 · 空間擴張',
    desc: '以阿基米德等速螺線擴散空間感知，全體防禦塔射程顯著提升。',
    formula: '全場所有防禦塔射程 +20%',
    data: { rangeMultiplier: 0.20 }
  },
  {
    id: 'ballistic_velocity',
    name: '曲率加速',
    category: 'geometry',
    rarity: 'common',
    icon: '🚀',
    subtitle: '幾何流 · 奇異點彈道',
    desc: '質數子彈獲得曲率推進，大幅提升飛行速度與轉向靈敏度。',
    formula: '子彈飛行速度 +50%，絕不脫靶',
    data: { bulletSpeedBonus: 0.50 }
  },

  // 4. 特殊運算暴擊流
  {
    id: 'perfect_square',
    name: '完美平方態',
    category: 'operator',
    rarity: 'rare',
    icon: '√',
    subtitle: '運算流 · 重力坍縮',
    desc: '方根重力井對完全平方數（4, 9, 16, 25, 36...）的開方暴擊更為致命！',
    formula: '方根暴擊傷害由 2.5x 提升至 4.0x',
    data: { critMultiplier: 4.0 }
  },
  {
    id: 'absolute_domain',
    name: '純淨實數軸',
    category: 'operator',
    rarity: 'epic',
    icon: '|x|',
    subtitle: '運算流 · 絕對值淨化',
    desc: '絕對值稜鏡淨化冷卻時間縮短，且怪物穿過時會被強大實數場定身！',
    formula: '稜鏡冷卻 -35%，穿過怪物定身 1.2 秒',
    data: { cooldownReduction: 0.35, stunDuration: 1.2 }
  }
];

export class PerkManager {
  constructor(game) {
    this.game = game;
    this.activePerks = []; // [{ id, name, rarity, icon, ... }]
  }

  reset() {
    this.activePerks = [];
  }

  hasPerk(perkId) {
    return this.activePerks.some(p => p.id === perkId);
  }

  getPerk(perkId) {
    return this.activePerks.find(p => p.id === perkId);
  }

  // 從未持有的卡牌中隨機挑選 3 張
  drawThreePerks() {
    const unowned = ALL_PERKS.filter(p => !this.hasPerk(p.id));
    if (unowned.length <= 3) {
      return [...unowned];
    }

    // 隨機洗牌抽 3 張
    const shuffled = [...unowned].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  // 啟動天賦
  activatePerk(perkId) {
    const perkDef = ALL_PERKS.find(p => p.id === perkId);
    if (!perkDef) return false;

    if (!this.hasPerk(perkId)) {
      this.activePerks.push(perkDef);
    }

    // 針對全體防禦塔進行屬性即時重算
    this.applyInstantBuffs(perkId);
    return true;
  }

  applyInstantBuffs(perkId) {
    if (perkId === 'archimedes_spiral') {
      if (this.game && this.game.towers) {
        this.game.towers.forEach(t => {
          if (typeof t.recalculateRange === 'function') {
            t.recalculateRange(this.getRangeMultiplier());
          }
        });
      }
    }
  }

  // ===== 屬性加成查詢 =====
  getRangeMultiplier() {
    return this.hasPerk('archimedes_spiral') ? 1.20 : 1.0;
  }

  getCostDiscount() {
    return this.hasPerk('zero_sum') ? 0.15 : 0;
  }

  getGoldMultiplier() {
    return this.hasPerk('golden_ratio_bounty') ? 0.50 : 0;
  }

  getRefundRatio() {
    return this.hasPerk('liquidation') ? 1.0 : 0.70;
  }

  getPrimeDoubleChance() {
    return this.hasPerk('prime_theorem') ? 0.25 : 0;
  }

  hasEulerSieve() {
    return this.hasPerk('euler_sieve');
  }

  getBulletSpeedMultiplier() {
    return this.hasPerk('ballistic_velocity') ? 1.50 : 1.0;
  }

  getSquareCritMultiplier() {
    return this.hasPerk('perfect_square') ? 4.0 : 2.5;
  }

  getTwinPrimeAttackSpeedMultiplier(towerType) {
    if (!this.hasPerk('twin_primes')) return 1.0;
    if (towerType === 'PRIME_2' || towerType === 'PRIME_3') {
      const has2 = this.game.towers.some(t => t.type === 'PRIME_2');
      const has3 = this.game.towers.some(t => t.type === 'PRIME_3');
      if (has2 && has3) {
        return 1.25;
      }
    }
    return 1.0;
  }

  getCoprimePierceBonus() {
    return this.hasPerk('coprime_pierce') ? 0.40 : 0;
  }

  getPrismCooldownMultiplier() {
    return this.hasPerk('absolute_domain') ? 0.65 : 1.0;
  }

  getStunDuration() {
    return this.hasPerk('absolute_domain') ? 1.2 : 0;
  }

  // 波次結束利息計算
  calculateInterest(currentGold) {
    if (!this.hasPerk('compound_interest')) return 0;
    const perk = this.getPerk('compound_interest');
    const rate = perk.data.interestRate;
    const cap = perk.data.cap;
    return Math.min(cap, Math.round(currentGold * rate));
  }
}
