// Tower Entities for Math Tower Defense
import { 
  PrimeProjectile, 
  AbsoluteBeam, 
  OperatorProjectile, 
  SqrtProjectile, 
  FreezeRingEffect,
  DualPrimeProjectile,
  ImaginaryPrismBeam,
  FactorialDecayWave,
  CoinFloat
} from './Projectile.js';
import { sound } from '../engine/Audio.js';
import { techTree } from '../engine/TechTreeManager.js';

export class Tower {
  constructor({ id, x, y, type, range, fireRate, damage, cost, color, label, factor = null, category = null }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type; // 'prime', 'absolute', 'operator', 'sqrt', 'zero'
    this.factor = factor; // 2, 3, 5, 7 or null
    this.category = category || (TOWER_TYPES[type] && TOWER_TYPES[type].category) || this.deriveCategory(type);
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

  deriveCategory(type) {
    if (['absolute', 'sqrt', 'operator', 'zero'].includes(type)) return 'special';
    if (['fusion_6', 'fusion_15', 'fusion_abs_sqrt', 'fusion_factorial'].includes(type)) return 'fusion';
    return 'prime';
  }

  isSpecialTower() {
    return this.category === 'special' || ['absolute', 'sqrt', 'operator', 'zero'].includes(this.type);
  }

  isFusionTower() {
    return this.category === 'fusion' || ['fusion_6', 'fusion_15', 'fusion_abs_sqrt', 'fusion_factorial'].includes(this.type);
  }

  isPrimeTower() {
    return this.category === 'prime' || this.type === 'prime';
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

  // 判斷砲塔是否允許升級 (n! 階乘神塔每關限 2 座且為終極神域，無法升級)
  get isUpgradeable() {
    return this.type !== 'fusion_factorial';
  }

  // 各自升級費用
  getUpgradeRangeCost() {
    if (!this.isUpgradeable || this.rangeLevel >= this.maxRangeLevel) return 0;
    return Math.round(this.cost * 0.45 * this.rangeLevel);
  }

  getUpgradeDamageCost() {
    if (!this.isUpgradeable || this.damageLevel >= this.maxDamageLevel) return 0;
    return Math.round(this.cost * 0.55 * this.damageLevel);
  }

  getUpgradeSpeedCost() {
    if (!this.isUpgradeable || this.speedLevel >= this.maxSpeedLevel) return 0;
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
    if (!this.isUpgradeable || this.rangeLevel >= this.maxRangeLevel) return false;
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
    if (!this.isUpgradeable || this.damageLevel >= this.maxDamageLevel) return false;
    const cost = this.getUpgradeDamageCost();
    this.totalInvested += cost;
    this.damageLevel++;
    this.damage = Math.round(this.baseDamage * (1 + (this.damageLevel - 1) * 0.50));
    this.updateCompositeLevel();
    sound.playBuild();
    return true;
  }

  upgradeSpeed() {
    if (!this.isUpgradeable || this.speedLevel >= this.maxSpeedLevel) return false;
    const cost = this.getUpgradeSpeedCost();
    this.totalInvested += cost;
    this.speedLevel++;
    this.fireRate = +(this.baseFireRate * (1 + (this.speedLevel - 1) * 0.25)).toFixed(2);
    this.updateCompositeLevel();
    sound.playBuild();
    return true;
  }

  upgrade() {
    if (!this.isUpgradeable) return false;
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
      // 運算子塔：鎖定射程內「無法被 2, 3, 5, 7 整除」的正數怪物（如質數 11, 13, 17, 19, 23），或 0.9̇ 極限偽裝怪
      let maxDist = -1;
      for (const m of monsters) {
        if (m.isDead || m.isNegative || m.operatorCooldown > 0) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          if (m.isRecurring && m.recurringType === '0.9') {
            return m; // 優先鎖定 0.9̇ 進行極限證明坍縮！
          }
          if (m.value <= 1 && !m.isRecurring) continue;
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
      // 質數塔：優先鎖定射程內「可被自身質數整除」的正數怪物，或對應分母的循環小數幽靈
      let bestDivisible = null;
      let maxDivDist = -1;
      let fallbackFirst = null;
      let maxAnyDist = -1;

      for (const m of monsters) {
        if (m.isDead) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          const isRecurringMatch = m.isRecurring && m.recurringDenominator === this.factor;
          const isNormalDivisible = !m.isNegative && !m.isRecurring && typeof m.value === 'number' && m.value % this.factor === 0;
          if (isRecurringMatch || isNormalDivisible) {
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

    if (this.type === 'fusion_6') {
      // 2x3 六芒雙曜：優先鎖定可被 2 或 3 整除的怪，或分母為 2, 3 的循環怪
      let bestDivisible = null;
      let maxDivDist = -1;
      let fallbackFirst = null;
      let maxAnyDist = -1;
      for (const m of monsters) {
        if (m.isDead || m.isNegative) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          const isRecurringMatch = m.isRecurring && (m.recurringDenominator === 2 || m.recurringDenominator === 3);
          const isDiv = !m.isRecurring && (m.value % 2 === 0 || m.value % 3 === 0);
          if ((isRecurringMatch || isDiv) && m.progress > maxDivDist) {
            maxDivDist = m.progress;
            bestDivisible = m;
          }
          if (m.progress > maxAnyDist) {
            maxAnyDist = m.progress;
            fallbackFirst = m;
          }
        }
      }
      return bestDivisible || fallbackFirst;
    }

    if (this.type === 'fusion_15') {
      // 3x5 星軌聚財：優先鎖定可被 3 或 5 整除的怪，或分母為 3, 5 的循環怪
      let bestDivisible = null;
      let maxDivDist = -1;
      let fallbackFirst = null;
      let maxAnyDist = -1;
      for (const m of monsters) {
        if (m.isDead || m.isNegative) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          const isRecurringMatch = m.isRecurring && (m.recurringDenominator === 3 || m.recurringDenominator === 5);
          const isDiv = !m.isRecurring && (m.value % 3 === 0 || m.value % 5 === 0);
          if ((isRecurringMatch || isDiv) && m.progress > maxDivDist) {
            maxDivDist = m.progress;
            bestDivisible = m;
          }
          if (m.progress > maxAnyDist) {
            maxAnyDist = m.progress;
            fallbackFirst = m;
          }
        }
      }
      return bestDivisible || fallbackFirst;
    }

    if (this.type === 'fusion_abs_sqrt') {
      // |√x| 虛數引力：極優先鎖定負數怪，其次完全平方怪，其次進度最前怪
      let bestNeg = null;
      let maxNegDist = -1;
      let bestSq = null;
      let maxSqDist = -1;
      let fallbackFirst = null;
      let maxAnyDist = -1;

      for (const m of monsters) {
        if (m.isDead) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          if (m.isNegative && m.progress > maxNegDist) {
            maxNegDist = m.progress;
            bestNeg = m;
          } else if (m.isSquare && m.progress > maxSqDist) {
            maxSqDist = m.progress;
            bestSq = m;
          }
          if (m.progress > maxAnyDist) {
            maxAnyDist = m.progress;
            fallbackFirst = m;
          }
        }
      }
      return bestNeg || bestSq || fallbackFirst;
    }

    if (this.type === 'fusion_factorial') {
      // n! 階乘坍縮：鎖定射程內數值最大或最前線的怪物
      let bestHighVal = null;
      let maxVal = -1;
      for (const m of monsters) {
        if (m.isDead) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= currentRange) {
          const valScore = Math.abs(m.value) * 10 + m.progress;
          if (valScore > maxVal) {
            maxVal = valScore;
            bestHighVal = m;
          }
        }
      }
      return bestHighVal;
    }

    return null;
  }

  // 取得當前砲塔可進化的複合神塔選項
  getAvailableFusions(game) {
    const fusions = [];
    if (this.type === 'prime' && (this.factor === 2 || this.factor === 3)) {
      fusions.push({
        key: 'FUSION_6',
        targetType: TOWER_TYPES.FUSION_6,
        cost: Math.max(50, TOWER_TYPES.FUSION_6.cost - this.totalInvested)
      });
    }
    if (this.type === 'prime' && (this.factor === 3 || this.factor === 5)) {
      fusions.push({
        key: 'FUSION_15',
        targetType: TOWER_TYPES.FUSION_15,
        cost: Math.max(60, TOWER_TYPES.FUSION_15.cost - this.totalInvested)
      });
    }
    if (this.type === 'absolute' || this.type === 'sqrt') {
      fusions.push({
        key: 'FUSION_ABS_SQRT',
        targetType: TOWER_TYPES.FUSION_ABS_SQRT,
        cost: Math.max(70, TOWER_TYPES.FUSION_ABS_SQRT.cost - this.totalInvested)
      });
    }
    if (this.type === 'operator' || (this.type === 'prime' && this.factor === 7)) {
      const canFactorial = !game || game.canBuildFactorialTower();
      if (canFactorial) {
        fusions.push({
          key: 'FUSION_FACTORIAL',
          targetType: TOWER_TYPES.FUSION_FACTORIAL,
          cost: Math.max(80, TOWER_TYPES.FUSION_FACTORIAL.cost - this.totalInvested)
        });
      }
    }
    return fusions;
  }

  // 執行融合蛻變
  fuseInto(fusionKey, game) {
    const config = TOWER_TYPES[fusionKey];
    if (!config) return false;

    // 檢查每種複合神塔全場限建 1 座
    if (game && !game.canBuildTowerType(fusionKey, this)) {
      if (sound && sound.playResist) sound.playResist();
      if (game && game.coinFloats) {
        game.coinFloats.push(new CoinFloat({ x: this.x, y: this.y - 20, text: `⚠️ ${config.name} 全場限建 1 座！`, color: '#ec4899' }));
      }
      return false;
    }

    this.type = config.type;
    this.category = config.category || 'fusion';
    this.factor = config.factor;
    this.baseRange = config.range;
    this.baseFireRate = config.fireRate;
    this.color = config.color;
    this.label = config.label;
    
    const techDmgMult = techTree.getTowerDamageMultiplier();
    this.baseDamage = Math.round(config.damage * techDmgMult);
    
    this.recalculateRange();
    this.damage = Math.round(this.baseDamage * (1 + (this.damageLevel - 1) * 0.50));
    this.fireRate = +(this.baseFireRate * (1 + (this.speedLevel - 1) * 0.25)).toFixed(2);
    
    if (sound && sound.playWaveComplete) sound.playWaveComplete();
    return true;
  }

  update(dt, monsters, game) {
    if (this.cooldown > 0) {
      const overdriveMult = game && game.spellManager && game.spellManager.isOverdriveActive ? 1.618 : 1.0;
      const matrixSpeedMult = this.geometricSpeedBonus ? (1 + this.geometricSpeedBonus) : 1.0;
      this.cooldown -= dt * overdriveMult * matrixSpeedMult;
    }

    // 絕對零度力場塔 (Zero Freeze Field)：持續範圍減速光環
    if (this.type === 'zero') {
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
        speed: 340,
        isDouble: false
      }));
    } else if (this.type === 'absolute') {
      sound.playShoot('abs');
      game.addBeam(new AbsoluteBeam({
        startX: this.x,
        startY: this.y,
        target: target
      }));
      target.takeAbsolutePurify(game);
      this.cooldown = (1 / this.fireRate) * techTree.getAbsoluteCooldownMultiplier();
    } else if (this.type === 'operator') {
      sound.playShoot(3);
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
    } else if (this.type === 'fusion_6') {
      // 2x3 六芒雙曜：雙質數連除
      sound.playShoot(2);
      sound.playShoot(3);
      game.addProjectile(new DualPrimeProjectile({
        x: this.x,
        y: this.y,
        target: target,
        factors: [2, 3],
        damage: this.damage,
        speed: 380,
        isGoldBonus: false
      }));
    } else if (this.type === 'fusion_15') {
      // 3x5 星軌聚財：雙質數 + 金幣聚寶
      sound.playShoot(3);
      sound.playShoot(5);
      game.addProjectile(new DualPrimeProjectile({
        x: this.x,
        y: this.y,
        target: target,
        factors: [3, 5],
        damage: this.damage,
        speed: 380,
        isGoldBonus: true
      }));
    } else if (this.type === 'fusion_abs_sqrt') {
      // |√x| 虛數引力稜鏡
      sound.playShoot('abs');
      sound.playShoot(5);
      game.addBeam(new ImaginaryPrismBeam({
        startX: this.x,
        startY: this.y,
        target: target
      }));
      if (target.isNegative) {
        target.takeAbsolutePurify(game);
        target.takeSqrtHit(this.damage, game);
        target.addFloatingText('🌀 虛數重力開方!', '#ec4899');
      } else {
        target.takeSqrtHit(Math.round(this.damage * 1.25), game);
        target.applySlow(0.4, 1.8);
      }
    } else if (this.type === 'fusion_factorial') {
      // n! 階乘坍縮波
      sound.playShoot(7);
      game.addBeam(new FactorialDecayWave({
        startX: this.x,
        startY: this.y,
        targetX: target.x,
        targetY: target.y,
        range: this.range,
        damage: this.damage
      }));
    }
  }

  draw(ctx, isSelected = false) {
    ctx.save();

    const isFusion = this.type.startsWith('fusion_');

    // 繪製基座底座
    ctx.beginPath();
    ctx.arc(this.x, this.y, isFusion ? 24 : 22, 0, Math.PI * 2);
    ctx.fillStyle = isFusion ? '#0f172a' : '#1e293b';
    ctx.fill();
    ctx.lineWidth = isFusion ? 3 : 2;
    ctx.strokeStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = isFusion ? 12 : 6;
    ctx.stroke();

    // 複合神塔外環幾何光圈
    if (isFusion) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 27, 0, Math.PI * 2);
      ctx.strokeStyle = this.color + '88';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

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
    } else if (this.type === 'fusion_6') {
      // 雙管蔚藍+橙金砲管
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(8, -6, 15, 4);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(8, 2, 15, 4);

      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#082f49';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    } else if (this.type === 'fusion_15') {
      // 金星聚財加農
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(8, -5, 16, 10);

      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(16, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'fusion_abs_sqrt') {
      // 虛數引力星芒
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(-8, 14);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-8, -14);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#500724';
      ctx.fill();
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    } else if (this.type === 'fusion_factorial') {
      // 階乘坍縮矩陣
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(6, -5, 18, 10);

      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#2e1065';
      ctx.fill();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = '#f0abfc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-7, -7); ctx.lineTo(7, 7);
      ctx.moveTo(-7, 7); ctx.lineTo(7, -7);
      ctx.stroke();
    }
    ctx.restore();

    // 砲塔中央符號標籤
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${isFusion ? 11 : 12}px "Outfit", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, this.x, this.y);

    // 等級指示小星芒
    if (this.level > 1) {
      for (let i = 0; i < this.level; i++) {
        const starX = this.x - ((this.level - 1) * 7) / 2 + i * 7;
        const starY = this.y + (isFusion ? 18 : 16);
        ctx.beginPath();
        ctx.arc(starX, starY, 2, 0, Math.PI * 2);
        ctx.fillStyle = isFusion ? '#ec4899' : '#f59e0b';
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
    category: 'prime',
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
    category: 'prime',
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
    category: 'prime',
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
    category: 'special',
    name: '|x| 絕對值稜鏡',
    subtitle: '全場限建 1 座 ｜ 淨化負數怪 $|-n| \\to n$',
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
    category: 'special',
    name: '[+/-] 運算子調整塔',
    subtitle: '全場限建 1 座 ｜ 加減微調化質為合',
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
    category: 'prime',
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
    category: 'special',
    name: '√x 根號方根重力井',
    subtitle: '全場限建 1 座 ｜ 暴擊平方怪並直接開方',
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
    category: 'special',
    name: '×0 絕對零度力場塔',
    subtitle: '全場限建 1 座 ｜ 乘零歸零範圍強效減速',
    cost: 110,
    range: 140,
    fireRate: 1.6,
    damage: 20,
    color: '#06b6d4',
    label: '×0'
  },

  // 方案一：複合神塔 (Dual-Tower Fusion)
  FUSION_6: {
    type: 'fusion_6',
    factor: [2, 3],
    category: 'fusion',
    name: '2×3 六芒雙曜神塔',
    subtitle: '全場限建 1 座 ｜ 同時執行 ÷2 與 ÷3 連除',
    cost: 160,
    range: 175,
    fireRate: 1.5,
    damage: 38,
    color: '#06b6d4',
    label: '2×3'
  },
  FUSION_15: {
    type: 'fusion_15',
    factor: [3, 5],
    category: 'fusion',
    name: '3×5 星軌聚財加農',
    subtitle: '全場限建 1 座 ｜ 3與5金星軌道奪取金幣',
    cost: 210,
    range: 180,
    fireRate: 1.2,
    damage: 50,
    color: '#f59e0b',
    label: '3×5'
  },
  FUSION_ABS_SQRT: {
    type: 'fusion_abs_sqrt',
    factor: null,
    category: 'fusion',
    name: '|√x| 虛數引力稜鏡',
    subtitle: '全場限建 1 座 ｜ 負數直開虛數根＋極限引力井',
    cost: 260,
    range: 185,
    fireRate: 1.1,
    damage: 60,
    color: '#ec4899',
    label: '|√x|'
  },
  FUSION_FACTORIAL: {
    type: 'fusion_factorial',
    factor: 0,
    category: 'fusion',
    isUpgradeable: false,
    name: 'n! 階乘坍縮衝擊波',
    subtitle: '每關限建 1 座·不可升級',
    cost: 240,
    range: 190,
    fireRate: 0.85,
    damage: 70,
    color: '#ec4899',
    label: 'n!',
    desc: '發射貫穿全路徑的階乘波，使全場怪物數值瞬間衰減因數階層（每關至多建造 2 座，為終極神域無法升級）'
  }
};
