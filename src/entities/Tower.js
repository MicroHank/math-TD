// Tower Entities for Math Tower Defense
import { PrimeProjectile, AbsoluteBeam, OperatorProjectile } from './Projectile.js';
import { sound } from '../engine/Audio.js';

export class Tower {
  constructor({ id, x, y, type, range, fireRate, cost, color, label, factor = null }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type; // 'prime', 'absolute', 'operator'
    this.factor = factor; // 2, 3, 5 or null
    this.baseRange = range;
    this.range = range;
    this.fireRate = fireRate; // shots per sec
    this.cooldown = 0;
    this.cost = cost;
    this.totalInvested = cost;
    this.level = 1;
    this.maxLevel = 3;
    this.color = color;
    this.label = label;
    this.angle = 0;
    this.target = null;

    // 傷害屬性 (每次命中消耗怪物的階層耐受血量)
    this.baseDamage = (TOWER_TYPES[type] && TOWER_TYPES[type].damage) || 25;
    this.damage = this.baseDamage;
  }

  get upgradeCost() {
    if (this.level >= this.maxLevel) return 0;
    return Math.floor(this.cost * 0.8 * this.level);
  }

  get sellValue() {
    return Math.floor(this.totalInvested * 0.7);
  }

  upgrade() {
    if (this.level >= this.maxLevel) return false;
    this.level++;
    this.totalInvested += this.upgradeCost;
    this.range = Math.floor(this.baseRange * (1 + (this.level - 1) * 0.2));
    this.fireRate = +(this.fireRate * 1.2).toFixed(2);
    this.damage = Math.floor(this.baseDamage * (1 + (this.level - 1) * 0.65));
    sound.playBuild();
    return true;
  }

  findTarget(monsters) {
    let bestTarget = null;

    if (this.type === 'absolute') {
      // 絕對值塔：優先鎖定射程內的「負數怪物」！
      let maxDistTravelled = -1;
      for (const m of monsters) {
        if (m.isDead || !m.isNegative) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= this.range && m.progress > maxDistTravelled) {
          maxDistTravelled = m.progress;
          bestTarget = m;
        }
      }
      return bestTarget;
    }

    if (this.type === 'operator') {
      // 運算子塔：鎖定射程內「無法被 2, 3, 5 整除」的正數怪物（如質數 7, 11, 13）
      let maxDist = -1;
      for (const m of monsters) {
        if (m.isDead || m.isNegative || m.value <= 1 || m.operatorCooldown > 0) continue;
        const dist = Math.hypot(m.x - this.x, m.y - this.y);
        if (dist <= this.range) {
          const isFactored = (m.value % 2 === 0 || m.value % 3 === 0 || m.value % 5 === 0);
          if (!isFactored && m.progress > maxDist) {
            maxDist = m.progress;
            bestTarget = m;
          }
        }
      }
      return bestTarget;
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
        if (dist <= this.range) {
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
      this.cooldown -= dt;
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
      game.addProjectile(new PrimeProjectile({
        x: this.x,
        y: this.y,
        target: target,
        factor: this.factor,
        damage: this.damage
      }));
    } else if (this.type === 'absolute') {
      sound.playShoot('abs');
      game.addBeam(new AbsoluteBeam({
        startX: this.x,
        startY: this.y,
        target: target
      }));
      target.takeAbsolutePurify(game);
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
  }
};
