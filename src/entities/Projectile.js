// Projectiles & Particle Effects for Math Tower Defense

export class PrimeProjectile {
  constructor({ x, y, target, factor, damage = 25, speed = 340 }) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.factor = factor;
    this.damage = damage;
    this.speed = speed;
    this.radius = 8;
    this.isDead = false;

    // 依據質數指定主色調
    const colors = {
      2: '#38bdf8', // 蔚藍 (2)
      3: '#fbbf24', // 橙金 (3)
      5: '#34d399'  // 翠綠 (5)
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
  constructor({ x, y, amount, life = 1.0 }) {
    this.x = x;
    this.y = y;
    this.amount = amount;
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
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 14px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 5;
    ctx.fillText(`+${this.amount} 🪙`, this.x, this.y);
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
