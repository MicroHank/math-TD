// Projectiles & Particle Effects for Math Tower Defense

export class PrimeProjectile {
  constructor({ x, y, target, factor, damage = 25, speed = 340, isDouble = false }) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.factor = factor;
    this.damage = damage;
    this.speed = speed;
    this.isDouble = isDouble;
    this.radius = 8;
    this.isDead = false;

    // 依據質數指定主色調
    const colors = {
      2: '#38bdf8', // 蔚藍 (2)
      3: '#fbbf24', // 橙金 (3)
      5: '#34d399', // 翠綠 (5)
      7: '#8b5cf6'  // 紫曜 (7)
    };
    this.color = colors[factor] || '#ffffff';
    this.trail = [];
  }

  update(dt, game) {
    if (this.isDead) return;

    // 若目標已經消失或被消滅
    if (!this.target || this.target.isDead) {
      this.isDead = true;
      return;
    }

    // 紀錄尾跡
    this.trail.push({ x: this.x, y: this.y, life: 0.15 });
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].life -= dt;
      if (this.trail[i].life <= 0) this.trail.splice(i, 1);
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (dist <= step || dist < this.radius + this.target.radius) {
      // 命中目標！
      this.target.takePrimeHit(this.factor, this.damage, game);
      if (this.isDouble && !this.target.isDead) {
        this.target.takePrimeHit(this.factor, this.damage, game);
        this.target.addFloatingText('⚡ 質數連除 x2!', '#fde047');
      }
      this.isDead = true;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }
  }

  draw(ctx) {
    // 繪製光尾
    ctx.save();
    this.trail.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, this.radius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, pt.life / 0.15) * 0.4;
      ctx.fill();
    });

    // 繪製飛彈球體
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // 飛彈內部標註其質數
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#090d16';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.factor}`, this.x, this.y);

    ctx.restore();
  }
}

// 絕對值淨化光束 (Absolute Prism Beam)
export class AbsoluteBeam {
  constructor({ startX, startY, target, duration = 0.25 }) {
    this.startX = startX;
    this.startY = startY;
    this.target = target;
    this.duration = duration;
    this.life = duration;
    this.isDead = false;
    this.targetX = target ? target.x : startX;
    this.targetY = target ? target.y : startY;
  }

  update(dt, game) {
    if (this.isDead) return;
    this.life -= dt;
    if (this.target && !this.target.isDead) {
      this.targetX = this.target.x;
      this.targetY = this.target.y;
    }
    if (this.life <= 0) {
      this.isDead = true;
    }
  }

  draw(ctx) {
    ctx.save();
    const progress = Math.max(0, this.life / this.duration);
    ctx.globalAlpha = progress;

    // 外發光光束
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.targetX, this.targetY);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 6 * progress;
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 15;
    ctx.stroke();

    // 內核心高亮光束
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.targetX, this.targetY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2 * progress;
    ctx.stroke();

    ctx.restore();
  }
}

// 粒子系統 (衝擊火花、消除爆裂與金幣浮現)
export class Particle {
  constructor({ x, y, vx, vy, color, radius = 3, maxLife = 0.6 }) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.radius = radius;
    this.life = maxLife;
    this.maxLife = maxLife;
    this.isDead = false;
  }

  update(dt) {
    this.life -= dt;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vx *= 0.96; // 阻尼
    this.vy *= 0.96;
  }

  draw(ctx) {
    ctx.save();
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * alpha, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// 掉落金幣漂浮動畫
export class CoinFloat {
  constructor({ x, y, amount = 0, text = null, color = '#fbbf24', life = 1.2 }) {
    this.x = x;
    this.y = y;
    this.amount = amount;
    this.text = text;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.isDead = false;
  }

  update(dt) {
    this.life -= dt;
    this.y -= dt * 25; // 向上飄逸
    if (this.life <= 0) {
      this.isDead = true;
    }
  }

  draw(ctx) {
    ctx.save();
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.font = 'bold 14px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 5;
    const display = this.text !== null ? this.text : `+${this.amount} 🪙`;
    ctx.fillText(display, this.x, this.y);
    ctx.restore();
  }
}

// 運算子調整飛彈 (+1 / -1)
export class OperatorProjectile {
  constructor({ x, y, target, opValue, speed = 310 }) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.opValue = opValue; // +1 or -1
    this.speed = speed;
    this.radius = 9;
    this.color = '#14b8a6';
    this.isDead = false;
    this.trail = [];
  }

  update(dt, game) {
    if (this.isDead) return;
    if (!this.target || this.target.isDead) {
      this.isDead = true;
      return;
    }

    this.trail.push({ x: this.x, y: this.y, life: 0.15 });
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].life -= dt;
      if (this.trail[i].life <= 0) this.trail.splice(i, 1);
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (dist <= step || dist < this.radius + this.target.radius) {
      this.target.takeOperatorHit(this.opValue, game);
      this.isDead = true;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }
  }

  draw(ctx) {
    ctx.save();
    this.trail.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, this.radius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, pt.life / 0.15) * 0.4;
      ctx.fill();
    });

    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#042f2e';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.opValue > 0 ? '+1' : '-1', this.x, this.y);
    ctx.restore();
  }
}

// 根號方根重力飛彈 (Square Root Gravitational Projectile)
export class SqrtProjectile {
  constructor({ x, y, target, damage = 50, speed = 360 }) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.damage = damage;
    this.speed = speed;
    this.radius = 10;
    this.isDead = false;
    this.color = '#f59e0b';
    this.angle = 0;
    this.trail = [];
  }

  update(dt, game) {
    if (this.isDead) return;
    if (!this.target || this.target.isDead) {
      this.isDead = true;
      return;
    }

    this.angle += dt * 8;
    this.trail.push({ x: this.x, y: this.y, life: 0.15 });
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].life -= dt;
      if (this.trail[i].life <= 0) this.trail.splice(i, 1);
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (dist <= step || dist < this.radius + this.target.radius) {
      this.target.takeSqrtHit(this.damage, game);
      this.isDead = true;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }
  }

  draw(ctx) {
    ctx.save();
    // 尾跡
    this.trail.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, this.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, pt.life / 0.15) * 0.35;
      ctx.fill();
    });

    // 旋轉重力環
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-8, -8, 16, 16);

    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('√', 0, 0);

    ctx.restore();
  }
}

// 零度冰霜減速力場波紋 (Freeze Field Wave)
export class FreezeRingEffect {
  constructor({ x, y, maxRadius = 140, duration = 0.4 }) {
    this.x = x;
    this.y = y;
    this.maxRadius = maxRadius;
    this.radius = 10;
    this.duration = duration;
    this.life = duration;
    this.isDead = false;
    this.color = '#06b6d4';
  }

  update(dt) {
    if (this.isDead) return;
    this.life -= dt;
    const progress = 1 - (this.life / this.duration);
    this.radius = 10 + (this.maxRadius - 10) * progress;
    if (this.life <= 0) {
      this.isDead = true;
    }
  }

  draw(ctx) {
    ctx.save();
    const alpha = Math.max(0, this.life / this.duration);
    ctx.globalAlpha = alpha * 0.7;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    ctx.stroke();

    ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.fill();
    ctx.restore();
  }
}

// 雙質數複合飛彈 (Dual Prime Projectile for 2x3 & 3x5)
export class DualPrimeProjectile {
  constructor({ x, y, target, factors = [2, 3], damage = 35, speed = 360, isGoldBonus = false }) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.factors = factors; // [2, 3] or [3, 5]
    this.damage = damage;
    this.speed = speed;
    this.isGoldBonus = isGoldBonus;
    this.radius = 10;
    this.isDead = false;
    this.angle = 0;
    this.trail = [];
    this.colors = factors.map(f => {
      if (f === 2) return '#38bdf8';
      if (f === 3) return '#fbbf24';
      if (f === 5) return '#34d399';
      return '#8b5cf6';
    });
  }

  update(dt, game) {
    if (this.isDead) return;
    if (!this.target || this.target.isDead) {
      this.isDead = true;
      return;
    }

    this.angle += dt * 10;
    this.trail.push({ x: this.x, y: this.y, life: 0.16 });
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].life -= dt;
      if (this.trail[i].life <= 0) this.trail.splice(i, 1);
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (dist <= step || dist < this.radius + this.target.radius) {
      // 命中目標：發動雙質數連除！
      let didHit = false;
      for (const factor of this.factors) {
        if (!this.target.isDead) {
          const res = this.target.takePrimeHit(factor, this.damage, game);
          if (res) didHit = true;
        }
      }

      if (didHit) {
        this.target.addFloatingText(`⚛️ 雙質數融合 [${this.factors.join('×')}]!`, '#38bdf8');
        if (this.isGoldBonus && game) {
          // 3x5 星軌聚財：額外獲得金幣
          game.addGold(4, this.x, this.y);
          this.target.addFloatingText('💰 +4G 聚財', '#fbbf24');
        }
      }
      this.isDead = true;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }
  }

  draw(ctx) {
    ctx.save();
    // 雙色尾跡
    this.trail.forEach((pt, idx) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, this.radius * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = idx % 2 === 0 ? this.colors[0] : this.colors[1];
      ctx.globalAlpha = Math.max(0, pt.life / 0.16) * 0.4;
      ctx.fill();
    });

    // 雙子星旋轉核心
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // 軌道光環
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 質數球 1
    ctx.beginPath();
    ctx.arc(7, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = this.colors[0];
    ctx.shadowColor = this.colors[0];
    ctx.shadowBlur = 8;
    ctx.fill();

    // 質數球 2
    ctx.beginPath();
    ctx.arc(-7, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = this.colors[1];
    ctx.shadowColor = this.colors[1];
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.restore();
  }
}

// 虛數引力稜鏡射線 (|√x| Imaginary Gravity Prism Beam)
export class ImaginaryPrismBeam {
  constructor({ startX, startY, target, duration = 0.35, color = '#ec4899' }) {
    this.startX = startX;
    this.startY = startY;
    this.target = target;
    this.duration = duration;
    this.life = duration;
    this.isDead = false;
    this.color = color;
    this.targetX = target ? target.x : startX;
    this.targetY = target ? target.y : startY;
  }

  update(dt, game) {
    if (this.isDead) return;
    this.life -= dt;
    if (this.target && !this.target.isDead) {
      this.targetX = this.target.x;
      this.targetY = this.target.y;
    }
    if (this.life <= 0) {
      this.isDead = true;
    }
  }

  draw(ctx) {
    ctx.save();
    const progress = Math.max(0, this.life / this.duration);
    ctx.globalAlpha = progress;

    // 主稜鏡光束
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.targetX, this.targetY);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4 * progress + 2;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 16;
    ctx.stroke();

    // 光束內芯
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.targetX, this.targetY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 命中點引力波紋
    ctx.beginPath();
    ctx.arc(this.targetX, this.targetY, (1 - progress) * 28 + 6, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

// n! 階乘坍縮光波 (Factorial Decay Wave)
export class FactorialDecayWave {
  constructor({ startX, startY, targetX, targetY, range = 200, damage = 70 }) {
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.range = range;
    this.damage = damage;
    this.life = 0.5;
    this.maxLife = 0.5;
    this.isDead = false;
    this.angle = Math.atan2(targetY - startY, targetX - startX);
    this.hitMonsters = new Set();
  }

  update(dt, game) {
    if (this.isDead) return;
    this.life -= dt;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }

    const progress = 1 - (this.life / this.maxLife);
    const waveDist = this.range * progress;
    const waveX = this.x + Math.cos(this.angle) * waveDist;
    const waveY = this.y + Math.sin(this.angle) * waveDist;

    // 貫穿路徑周圍敵人
    if (game && game.monsters) {
      for (const m of game.monsters) {
        if (m.isDead || this.hitMonsters.has(m.id)) continue;
        const d = Math.hypot(m.x - waveX, m.y - waveY);
        if (d <= 45) {
          this.hitMonsters.add(m.id);
          // 階乘坍縮：若是負數轉正，若是大於 2 則嘗試連續削減或因數除法
          if (m.isNegative) {
            m.takeAbsolutePurify(game);
          }
          let reduced = false;
          for (const factor of [7, 5, 3, 2]) {
            if (m.value % factor === 0 && !m.isDead) {
              m.takePrimeHit(factor, this.damage, game);
              reduced = true;
              break;
            }
          }
          if (!reduced && !m.isDead) {
            m.takeOperatorHit(-1, game);
          }
          m.addFloatingText('n! 階乘坍縮!', '#a855f7');
          game.createSparks(m.x, m.y, '#c084fc', 10);
        }
      }
    }
  }

  draw(ctx) {
    ctx.save();
    const progress = 1 - (this.life / this.maxLife);
    const alpha = Math.max(0, this.life / this.maxLife);
    const waveDist = this.range * progress;
    const waveX = this.x + Math.cos(this.angle) * waveDist;
    const waveY = this.y + Math.sin(this.angle) * waveDist;

    ctx.globalAlpha = alpha;
    ctx.translate(waveX, waveY);
    ctx.rotate(this.angle);

    // 弧形衝擊波
    ctx.beginPath();
    ctx.arc(0, 0, 36, -Math.PI / 3, Math.PI / 3);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(4, 0, 24, -Math.PI / 4, Math.PI / 4);
    ctx.strokeStyle = '#e879f9';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

// 1. 對數壓縮光束 (Logarithmic Compression Beam)
export class LogCompressionBeam {
  constructor({ sourceX, sourceY, target, damage = 35 }) {
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.target = target;
    this.damage = damage;
    this.life = 0.28;
    this.maxLife = 0.28;
    this.isDead = false;
    this.hasCompressed = false;
    this.spiralParticles = [];

    // 沿著射線路徑生成對數螺線粒子
    const dx = target.x - sourceX;
    const dy = target.y - sourceY;
    const dist = Math.hypot(dx, dy);
    const steps = Math.min(16, Math.floor(dist / 14));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      this.spiralParticles.push({
        x: sourceX + dx * t,
        y: sourceY + dy * t,
        offset: Math.random() * Math.PI * 2,
        r: 4 + Math.random() * 6
      });
    }
  }

  update(dt, game) {
    if (this.isDead) return;
    this.life -= dt;

    if (!this.hasCompressed && this.target && !this.target.isDead) {
      this.hasCompressed = true;
      // 執行對數降維壓縮
      const oldVal = typeof this.target.value === 'number' ? Math.abs(this.target.value) : 1;
      if (oldVal >= 8 && !this.target.isBoss) {
        const newVal = Math.max(2, Math.floor(Math.log2(oldVal)));
        if (newVal < oldVal) {
          this.target.value = this.target.isNegative ? -newVal : newVal;
          this.target.hp = newVal;
          this.target.addFloatingText(`🪐 log₂(${oldVal}) ➔ ${newVal}!`, '#f59e0b');
          if (game && game.createSparks) game.createSparks(this.target.x, this.target.y, '#f59e0b', 16);
        }
      }
      this.target.stageHp -= this.damage;
      this.target.addFloatingText(`-${this.damage}`, '#fde047');
      if (this.target.stageHp <= 0 && this.target.value > 1) {
        this.target.takePrimeHit(2, 30, game);
      }
    }

    if (this.life <= 0) {
      this.isDead = true;
    }
  }

  draw(ctx) {
    if (!this.target) return;
    ctx.save();
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = alpha;

    // 金色對數雷射核心軸
    ctx.beginPath();
    ctx.moveTo(this.sourceX, this.sourceY);
    ctx.lineTo(this.target.x, this.target.y);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 12;
    ctx.stroke();

    // 白色高能量聚焦內芯
    ctx.beginPath();
    ctx.moveTo(this.sourceX, this.sourceY);
    ctx.lineTo(this.target.x, this.target.y);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 沿途對數螺線光環
    ctx.fillStyle = '#fde047';
    for (const p of this.spiralParticles) {
      const wobble = Math.sin(p.offset + (1 - alpha) * 12) * p.r;
      ctx.beginPath();
      ctx.arc(p.x + wobble, p.y - wobble, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// 2. 傅立葉諧波共振波 (Fourier Trigonometric Wave)
export class FourierTrigWave {
  constructor({ x, y, angle, range = 180, damage = 35 }) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.range = range;
    this.damage = damage;
    this.life = 0.42;
    this.maxLife = 0.42;
    this.hitMonsters = new Set();
    this.isDead = false;
  }

  update(dt, game) {
    if (this.isDead) return;
    this.life -= dt;
    if (this.life <= 0) {
      this.isDead = true;
      return;
    }

    const progress = 1 - (this.life / this.maxLife);
    const currDist = this.range * progress;
    const waveFrontX = this.x + Math.cos(this.angle) * currDist;
    const waveFrontY = this.y + Math.sin(this.angle) * currDist;

    for (const m of (game.monsters || [])) {
      if (m.isDead || this.hitMonsters.has(m.id)) continue;
      const d = Math.hypot(m.x - waveFrontX, m.y - waveFrontY);
      if (d <= 38) {
        this.hitMonsters.add(m.id);
        // 波峰波谷判定
        const isCrest = Math.sin(currDist * 0.1) >= 0;
        if (isCrest) {
          // 波峰重力壓制：減速 55%
          m.slowTimer = Math.max(m.slowTimer, 2.0);
          m.slowRatio = 0.45;
          m.addFloatingText('🌊 波峰壓制 -55%!', '#38bdf8');
        } else {
          // 波谷因數高頻震盪傷害
          m.stageHp -= Math.round(this.damage * 1.3);
          m.addFloatingText(`〰️ 諧波震盪 -${Math.round(this.damage * 1.3)}!`, '#a855f7');
        }
        if (game.createSparks) game.createSparks(m.x, m.y, '#38bdf8', 10);
      }
    }
  }

  draw(ctx) {
    ctx.save();
    const progress = 1 - (this.life / this.maxLife);
    const alpha = Math.max(0, this.life / this.maxLife);
    const currDist = this.range * progress;
    const cx = this.x + Math.cos(this.angle) * currDist;
    const cy = this.y + Math.sin(this.angle) * currDist;

    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy);
    ctx.rotate(this.angle);

    // 繪製正弦/餘弦干涉網曲線
    ctx.beginPath();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 10;
    for (let lx = -25; lx <= 25; lx += 2) {
      const ly = Math.sin(lx * 0.25 + progress * Math.PI * 4) * 14;
      if (lx === -25) ctx.moveTo(lx, ly);
      else ctx.lineTo(lx, ly);
    }
    ctx.stroke();

    // 餘弦反相相位線
    ctx.beginPath();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    for (let lx = -25; lx <= 25; lx += 2) {
      const ly = Math.cos(lx * 0.25 + progress * Math.PI * 4) * 10;
      if (lx === -25) ctx.moveTo(lx, ly);
      else ctx.lineTo(lx, ly);
    }
    ctx.stroke();

    ctx.restore();
  }
}

// 3. 費馬微積分求導音刃 (Calculus Derivative Blade Projectile)
export class DerivativeBladeProjectile {
  constructor({ x, y, target, damage = 65, speed = 400 }) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.damage = damage;
    this.speed = speed;
    this.radius = 10;
    this.isDead = false;
    this.rotation = 0;
    this.trail = [];
  }

  update(dt, game) {
    if (this.isDead) return;
    if (!this.target || this.target.isDead) {
      this.isDead = true;
      return;
    }

    this.rotation += dt * 14;
    this.trail.push({ x: this.x, y: this.y, life: 0.12 });
    for (let i = this.trail.length - 1; i >= 0; i--) {
      this.trail[i].life -= dt;
      if (this.trail[i].life <= 0) this.trail.splice(i, 1);
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (dist <= step || dist < this.radius + this.target.radius) {
      // 命中：求導降階破甲
      const val = typeof this.target.value === 'number' ? Math.abs(this.target.value) : 1;
      const derivativeBonus = (val > 10) ? 1.4 : 1.0;
      const finalDmg = Math.round(this.damage * derivativeBonus);

      this.target.stageHp -= finalDmg;
      this.target.addFloatingText(`🎻 d/dx -${finalDmg}!`, '#ec4899');
      if (game && game.createSparks) game.createSparks(this.target.x, this.target.y, '#ec4899', 14);

      // 若目標血量見底且為 7 的倍數，直接引爆
      if (this.target.value % 7 === 0) {
        this.target.takePrimeHit(7, 40, game);
      }
      this.isDead = true;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }
  }

  draw(ctx) {
    ctx.save();
    // 尾跡
    for (const t of this.trail) {
      ctx.beginPath();
      ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.globalAlpha = Math.max(0, t.life / 0.12) * 0.4;
      ctx.fill();
    }

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // 旋轉雙弧求導音刃
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 10, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 10, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.stroke();

    ctx.restore();
  }
}

// 4. 蒙地卡羅多面體骰子投擲 (Monte Carlo Probability Launcher)
export class MonteCarloDiceProjectile {
  constructor({ x, y, target, damage = 55, speed = 340 }) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.damage = damage;
    this.speed = speed;
    this.radius = 11;
    this.isDead = false;
    this.spin = 0;
  }

  update(dt, game) {
    if (this.isDead) return;
    if (!this.target || this.target.isDead) {
      this.isDead = true;
      return;
    }

    this.spin += dt * 10;
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * dt;

    if (dist <= step || dist < this.radius + this.target.radius) {
      // 擲骰子：隨機 1 ~ 12
      const roll = Math.floor(Math.random() * 12) + 1;
      const isPrimeRoll = [2, 3, 5, 7, 11].includes(roll);
      const isSquareRoll = [4, 9].includes(roll);

      if (isPrimeRoll) {
        // 質數點：300% 暴擊破甲
        const critDmg = Math.round(this.damage * 2.5);
        this.target.stageHp -= critDmg;
        this.target.addFloatingText(`🎲 質數[${roll}]暴擊 -${critDmg}!`, '#38bdf8');
        if (game.createExplosion) game.createExplosion(this.target.x, this.target.y, '#38bdf8', 25);
      } else if (isSquareRoll) {
        // 完全平方點：方根真空衝擊波
        this.target.stageHp -= this.damage;
        this.target.addFloatingText(`🎲 平方[${roll}]開方衝擊!`, '#fbbf24');
        if (this.target.isSquare && !this.target.isBoss) {
          const root = Math.round(Math.sqrt(Math.abs(this.target.value)));
          this.target.value = this.target.isNegative ? -root : root;
          this.target.hp = root;
        }
        if (game.createExplosion) game.createExplosion(this.target.x, this.target.y, '#fbbf24', 28);
      } else if (roll >= 10) {
        // 大數法則：掉落金幣天火
        this.target.stageHp -= this.damage;
        const bonusGold = 18;
        if (game.addGold) game.addGold(bonusGold, this.target.x, this.target.y);
        this.target.addFloatingText(`🎲 大數[${roll}] +${bonusGold}🪙!`, '#34d399');
      } else {
        // 一般點數
        this.target.stageHp -= this.damage;
        this.target.addFloatingText(`🎲 點數[${roll}] -${this.damage}`, '#e2e8f0');
      }

      this.isDead = true;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.spin);

    // 繪製立體數論二十面骰
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const px = Math.cos(a) * this.radius;
      const py = Math.sin(a) * this.radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = '#1e1b4b';
    ctx.fill();
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#6366f1';
    ctx.shadowBlur = 10;
    ctx.stroke();

    // 骰子中央點數問號/點
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎲', 0, 0);

    ctx.restore();
  }
}



