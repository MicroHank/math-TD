// Tower Entities for Math Tower Defense
import { PrimeProjectile, AbsoluteBeam, OperatorProjectile, SqrtProjectile, FreezeRingEffect } from './Projectile.js';
import { sound } from '../engine/Audio.js';
import { techTree } from '../engine/TechTreeManager.js';

export class Tower {
  constructor({ id, x, y, type, range, fireRate, damage, cost, color, label, factor = null }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type; // 'prime', 'absolute', 'operator', 'sqrt', 'zero'
    this.factor = factor; // 2, 3, 5, 7 or null
    // 基礎與當前屬性
    this.baseRange = range;
    this.range = range;
    this.baseFireRate = fireRate;
    this.fireRate = fireRate; // shots per sec
    this.cooldown = 0;
    this.cost = cost;
    this.totalInvested = cost;

    // 三向獨立升級等級 (1 ~ 5)
    this.rangeLevel = 1;
    this.maxRangeLevel = 5;

    this.damageLevel = 1;
    this.maxDamageLevel = 5;

    this.speedLevel = 1;
    this.maxSpeedLevel = 5;

    this.level = 1; // 綜合等級指示
    this.maxLevel = 5;

    this.color = color;
    this.label = label;
    this.angle = 0;
    this.target = null;

    // 傷害屬性 (每次命中消耗怪物的階層耐受血量，享受科技樹算術基本定理增益)
    const techDmgMult = techTree.getTowerDamageMultiplier();
    this.baseDamage = Math.round((damage !== undefined ? damage : ((TOWER_TYPES[type] && TOWER_TYPES[type].damage) || 25)) * techDmgMult);
    this.damage = this.baseDamage;
  }

  // 預覽與計算下一級數值
  getNextRange() {
    if (this.rangeLevel >= this.maxRangeLevel) return this.range;
    return Math.round(this.baseRange * (1 + this.rangeLevel * 0.18));
  }

  getNextDamage() {
    if (this.damageLevel >= this.maxDamageLevel) return this.damage;
    return Math.round(this.baseDamage * (1 + this.damageLevel * 0.50));
  }

  getNextFireRate() {
    if (this.speedLevel >= this.maxSpeedLevel) return this.fireRate;
    return +(this.baseFireRate * (1 + this.speedLevel * 0.25)).toFixed(2);
  }

  // 各自升級費用
  getUpgradeRangeCost() {
    if (this.rangeLevel >= this.maxRangeLevel) return 0;
    return Math.round(this.cost * 0.45 * this.rangeLevel);
  }

  getUpgradeDamageCost() {
    if (this.damageLevel >= this.maxDamageLevel) return 0;
    return Math.round(this.cost * 0.55 * this.damageLevel);
  }

  getUpgradeSpeedCost() {
    if (this.speedLevel >= this.maxSpeedLevel) return 0;
    return Math.round(this.cost * 0.45 * this.speedLevel);
  }

  // 綜合升級成本 (保留給舊介面或快捷升級)
  get upgradeCost() {
    const costs = [
      this.getUpgradeRangeCost(),
      this.getUpgradeDamageCost(),
      this.getUpgradeSpeedCost()
    ].filter(c => c > 0);
    return costs.length > 0 ? Math.min(...costs) : 0;
  }

  // 變賣返還 70% 總投資成本
  get sellValue() {
    return Math.floor(this.totalInvested * 0.7);
  }

  updateCompositeLevel() {
    const totalUpgrades = (this.rangeLevel - 1) + (this.damageLevel - 1) + (this.speedLevel - 1);
    this.level = Math.min(5, 1 + Math.floor(totalUpgrades / 2));
  }

  // 獨立升級方法
  upgradeRange(rangeMultiplier = 1.0) {
    if (this.rangeLevel >= this.maxRangeLevel) return false;
    const cost = this.getUpgradeRangeCost();
    this.totalInvested += cost;
    this.rangeLevel++;
    this.recalculateRange(rangeMultiplier);
    this.updateCompositeLevel();
    sound.playBuild();
    return true;
  }

  recalculateRange(multiplier = 1.0) {
    this.range = Math.round(this.baseRange * (1 + (this.rangeLevel - 1) * 0.18) * multiplier);
  }

  upgradeDamage() {
    if (this.damageLevel >= this.maxDamageLevel) return false;
    const cost = this.getUpgradeDamageCost();
    this.totalInvested += cost;
    this.damageLevel++;
    this.damage = Math.round(this.baseDamage * (1 + (this.damageLevel - 1) * 0.50));
    this.updateCompositeLevel();
    sound.playBuild();
    return true;
  }

  upgradeSpeed() {
    if (this.speedLevel >= this.maxSpeedLevel) return false;
    const cost = this.getUpgradeSpeedCost();
    this.totalInvested += cost;
    this.speedLevel++;
    this.fireRate = +(this.baseFireRate * (1 + (this.speedLevel - 1) * 0.25)).toFixed(2);
    this.updateCompositeLevel();
    sound.playBuild();
    return true;
  }

  upgrade() {
    // 預設綜合升級：依序升級等級最低的項目
    if (this.damageLevel <= this.speedLevel && this.damageLevel <= this.rangeLevel && this.damageLevel < this.maxDamageLevel) {
      return this.upgradeDamage();
    } else if (this.speedLevel <= this.rangeLevel && this.speedLevel < this.maxSpeedLevel) {
      return this.upgradeSpeed();
    } else if (this.rangeLevel < this.maxRangeLevel) {
      return this.upgradeRange();
    }
    return false;
  }

  get effectiveRange() {
    const techPrimeMult = this.type === 'prime' ? techTree.getPrimeRangeMultiplier() : 1.0;
    return Math.round(this.range * (this.geometricRangeBonus ? (1 + this.geometricRangeBonus) : 1.0) * techPrimeMult);
  }

  findTarget(monsters) {
    let bestTarget = null;
    const currentRange = this.effectiveRange;

    if (this.type === 'absolute') {
      // 絕對值塔：優先鎖定射程內的「負數怪物」！
      let maxDistTravelled = -1;
      for (const m of monsters) {
        if (m.isDead || !m.isNegative) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange && m.progress > maxDistTravelled) {
          maxDistTravelled = m.progress;
          bestTarget = m;
        }
      }
      return bestTarget;
    }

    if (this.type === 'operator') {
      // 運算子塔：鎖定射程內「無法被 2, 3, 5, 7 整除」的正數怪物（如質數 11, 13, 17, 19, 23）
      let maxDist = -1;
      for (const m of monsters) {
        if (m.isDead || m.isNegative || m.value <= 1 || m.operatorCooldown > 0) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          const isFactored = (m.value % 2 === 0 || m.value % 3 === 0 || m.value % 5 === 0 || m.value % 7 === 0);
          if (!isFactored && m.progress > maxDist) {
            maxDist = m.progress;
            bestTarget = m;
          }
        }
      }
      return bestTarget;
    }

    if (this.type === 'sqrt') {
      // 根號方根重力井：強烈優先鎖定「完全平方數」！
      let bestSquare = null;
      let maxSqDist = -1;
      let fallbackFirst = null;
      let maxAnyDist = -1;

      for (const m of monsters) {
        if (m.isDead || m.isNegative) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          if (m.isSquare && m.progress > maxSqDist) {
            maxSqDist = m.progress;
            bestSquare = m;
          }
          if (m.progress > maxAnyDist) {
            maxAnyDist = m.progress;
            fallbackFirst = m;
          }
        }
      }
      return bestSquare || fallbackFirst;
    }

    if (this.type === 'prime') {
      // 質數塔：優先鎖定射程內「可被自身質數整除」的正數怪物
      let bestDivisible = null;
      let maxDivDist = -1;
      let fallbackFirst = null;
      let maxAnyDist = -1;

      for (const m of monsters) {
        if (m.isDead) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          if (!m.isNegative && m.value % this.factor === 0) {
            if (m.progress > maxDivDist) {
              maxDivDist = m.progress;
              bestDivisible = m;
            }
          }
          if (m.progress > maxAnyDist) {
            maxAnyDist = m.progress;
            fallbackFirst = m;
          }
        }
      }

      return bestDivisible || fallbackFirst;
    }

    return null;
  }

  update(dt, monsters, game) {
    if (this.cooldown > 0) {
      const perkSpeedMult = game && game.perkManager ? game.perkManager.getTwinPrimeAttackSpeedMultiplier(this.factor === 2 ? 'PRIME_2' : (this.factor === 3 ? 'PRIME_3' : this.type)) : 1.0;
      const overdriveMult = game && game.spellManager && game.spellManager.isOverdriveActive ? 1.618 : 1.0;
      const matrixSpeedMult = this.geometricSpeedBonus ? (1 + this.geometricSpeedBonus) : 1.0;
      this.cooldown -= dt * perkSpeedMult * overdriveMult * matrixSpeedMult;
    }

    // 絕對零度力場塔 (Zero Freeze Field)：持續範圍減速光環
    if (this.type === 'zero') {
      // 基礎減速 45%，隨威力等級強化至 65%
      const slowRatio = Math.max(0.35, 0.55 - (this.damageLevel - 1) * 0.05);
      for (const m of monsters) {
        if (m.isDead) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= this.range) {
          m.applySlow(slowRatio, 0.4);
        }
      }

      if (this.cooldown <= 0) {
        this.cooldown = 1 / this.fireRate;
        game.addBeam(new FreezeRingEffect({
          x: this.x,
          y: this.y,
          maxRadius: this.range,
          duration: 0.45
        }));
        sound.playShoot(2);
      }
      return;
    }

    this.target = this.findTarget(monsters);

    if (this.target) {
      this.angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);

      if (this.cooldown <= 0) {
        this.fire(this.target, game);
        this.cooldown = 1 / this.fireRate;
      }
    }
  }

  fire(target, game) {
    if (this.type === 'prime') {
      sound.playShoot(this.factor);
      const isDouble = game && game.perkManager ? Math.random() < game.perkManager.getPrimeDoubleChance() : false;
      const speedMult = game && game.perkManager ? game.perkManager.getBulletSpeedMultiplier() : 1.0;
      const isTechCrit = Math.random() < techTree.getPrimeCritChance();
      const finalDamage = isTechCrit ? Math.round(this.damage * 2) : this.damage;
      if (isTechCrit) {
        target.addFloatingText('🎯 暴擊!', '#fbbf24');
      }

      game.addProjectile(new PrimeProjectile({
        x: this.x,
        y: this.y,
        target: target,
        factor: this.factor,
        damage: finalDamage,
        speed: 340 * speedMult,
        isDouble: isDouble
      }));
    } else if (this.type === 'absolute') {
      sound.playShoot('abs');
      game.addBeam(new AbsoluteBeam({
        startX: this.x,
        startY: this.y,
        target: target
      }));
      target.takeAbsolutePurify(game);
      if (game && game.perkManager && game.perkManager.getStunDuration() > 0) {
        target.applyStun(game.perkManager.getStunDuration());
      }
      // 絕對值光通量科技冷卻減免
      this.cooldown = (1 / this.fireRate) * techTree.getAbsoluteCooldownMultiplier();
    } else if (this.type === 'operator') {
      sound.playShoot(3);
      // 智慧決定 +1 或 -1
      const v = target.value;
      let opVal = -1;
      if ((v - 1) % 2 === 0 || (v - 1) % 3 === 0 || (v - 1) % 5 === 0) {
        opVal = -1;
      } else if ((v + 1) % 2 === 0 || (v + 1) % 3 === 0 || (v + 1) % 5 === 0) {
        opVal = 1;
      }

      game.addProjectile(new OperatorProjectile({
        x: this.x,
        y: this.y,
        target: target,
        opValue: opVal
      }));
    } else if (this.type === 'sqrt') {
      sound.playShoot(5);
      game.addProjectile(new SqrtProjectile({
        x: this.x,
        y: this.y,
        target: target,
        damage: this.damage
      }));
    }
  }

  draw(ctx, isSelected = false) {
    ctx.save();

    // 繪製基座底座
    ctx.beginPath();
    ctx.arc(this.x, this.y, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;
    ctx.stroke();

    // 旋轉砲管或稜鏡/量子機構
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    if (this.type === 'prime') {
      ctx.fillStyle = this.color;
      ctx.fillRect(8, -4, 14, 8);

      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (this.type === 'absolute') {
      ctx.fillStyle = '#c084fc';
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-8, 12);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, -12);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fillStyle = '#2e1065';
      ctx.fill();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (this.type === 'operator') {
      // 量子運算子八角雙翼機構
      ctx.fillStyle = '#14b8a6';
      ctx.fillRect(6, -3, 15, 6);

      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fillStyle = '#042f2e';
      ctx.fill();
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(14, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#2dd4bf';
      ctx.fill();
    } else if (this.type === 'sqrt') {
      // 根號重力井：金色幾何方菱鏡
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(6, -4, 15, 8);

      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = '#fbbf24';
      ctx.strokeRect(-6, -6, 12, 12);
      ctx.restore();
    } else if (this.type === 'zero') {
      // 絕對零度塔：冰霜十字菱鏡
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#083344';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, 0); ctx.lineTo(10, 0);
      ctx.moveTo(0, -10); ctx.lineTo(0, 10);
      ctx.stroke();
    }
    ctx.restore();

    // 砲塔中央符號標籤
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, this.x, this.y);

    // 等級指示小星芒
    if (this.level > 1) {
      for (let i = 0; i < this.level; i++) {
        const starX = this.x - ((this.level - 1) * 7) / 2 + i * 7;
        const starY = this.y + 16;
        ctx.beginPath();
        ctx.arc(starX, starY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
      }
    }

    // 選取時繪製攻擊範圍圓圈
    if (isSelected) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '15';
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }
}

// 塔型號工廠配置
export const TOWER_TYPES = {
  PRIME_2: {
    type: 'prime',
    factor: 2,
    name: '2號 雙子砲',
    subtitle: '對付偶數 / 2的倍數',
    cost: 50,
    range: 140,
    fireRate: 1.8,
    damage: 25,
    color: '#38bdf8',
    label: '2'
  },
  PRIME_3: {
    type: 'prime',
    factor: 3,
    name: '3號 三元激光',
    subtitle: '對付數字和為3的倍數',
    cost: 75,
    range: 165,
    fireRate: 1.3,
    damage: 32,
    color: '#fbbf24',
    label: '3'
  },
  PRIME_5: {
    type: 'prime',
    factor: 5,
    name: '5號 五芒衝擊',
    subtitle: '對付尾數 0 或 5',
    cost: 100,
    range: 150,
    fireRate: 0.9,
    damage: 45,
    color: '#34d399',
    label: '5'
  },
  ABSOLUTE: {
    type: 'absolute',
    factor: null,
    name: '|x| 絕對值稜鏡',
    subtitle: '淨化負數怪 $|-n| \\to n$',
    cost: 120,
    range: 155,
    fireRate: 1.0,
    damage: 35,
    color: '#c084fc',
    label: '|x|'
  },
  OPERATOR: {
    type: 'operator',
    factor: null,
    name: '[+/-] 運算子調整塔',
    subtitle: '加減微調，化質數為合數',
    cost: 90,
    range: 160,
    fireRate: 1.1,
    damage: 30,
    color: '#14b8a6',
    label: '±1'
  },
  PRIME_7: {
    type: 'prime',
    factor: 7,
    name: '7號 七曜天琴',
    subtitle: '除以 7 ｜ 難纏倍數剋星',
    cost: 130,
    range: 175,
    fireRate: 0.95,
    damage: 55,
    color: '#8b5cf6',
    label: '7'
  },
  SQRT: {
    type: 'sqrt',
    factor: null,
    name: '√x 根號方根重力井',
    subtitle: '暴擊完全平方怪並直接開方！',
    cost: 150,
    range: 160,
    fireRate: 0.85,
    damage: 50,
    color: '#f59e0b',
    label: '√x'
  },
  ZERO_FREEZE: {
    type: 'zero',
    factor: null,
    name: '×0 絕對零度力場塔',
    subtitle: '乘零歸零！範圍強效減速力場',
    cost: 110,
    range: 140,
    fireRate: 1.6,
    damage: 20,
    color: '#06b6d4',
    label: '×0'
  }
};
