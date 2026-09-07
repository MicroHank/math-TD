// Monster Entity for Math Tower Defense
import { sound } from '../engine/Audio.js';

export class Monster {
  constructor({
    id,
    value,
    waypoints,
    speed = 40,
    splitOnDivide = false,
    isBoss = false,
    bossName = '',
    bossSkills = []
  }) {
    this.id = id;
    this.value = value;
    this.originalValue = value;
    this.waypoints = waypoints;
    this.splitOnDivide = splitOnDivide;
    this.isBoss = isBoss;
    this.bossName = bossName;
    this.bossSkills = bossSkills;

    this.currentWaypointIndex = 0;
    this.x = waypoints[0].x;
    this.y = waypoints[0].y;
    this.progress = 0;
    this.baseSpeed = speed;
    this.speed = speed;

    this.isDead = false;
    this.reachedEnd = false;
    this.radius = isBoss ? 36 : 24;

    this.floatingTexts = []; // { text, color, x, y, life, maxLife }
    this.pulseAngle = Math.random() * Math.PI * 2;

    this.operatorCooldown = 0; // 避免運算子塔在短時間內連續刷同隻怪
    this.bossSkillTimer = 6.0; // 魔王技能計時器
  }

  get isNegative() {
    return this.value < 0;
  }

  // 取得所包含的質因數標籤（用於視覺輔助小圓點）
  getFactors() {
    if (this.isNegative) return [];
    const absVal = Math.abs(this.value);
    const factors = [];
    if (absVal > 1) {
      if (absVal % 2 === 0) factors.push(2);
      if (absVal % 3 === 0) factors.push(3);
      if (absVal % 5 === 0) factors.push(5);
    }
    return factors;
  }

  addFloatingText(text, color = '#ffffff') {
    this.floatingTexts.push({
      text,
      color,
      x: this.x + (Math.random() * 20 - 10),
      y: this.y - this.radius - 8,
      life: 1.0,
      maxLife: 1.0
    });
  }

  // 受到質數砲攻擊
  takePrimeHit(primeFactor, game) {
    if (this.isDead) return false;

    // 負數怪物對常規質數砲免疫！
    if (this.isNegative) {
      sound.playResist();
      this.addFloatingText('負數護盾免疫!', '#f43f5e');
      game.createSparks(this.x, this.y, '#f43f5e', 6);
      return false;
    }

    // 無法整除判定
    if (this.value % primeFactor !== 0) {
      sound.playResist();
      this.addFloatingText(`無法被 ${primeFactor} 整除!`, '#94a3b8');
      game.createSparks(this.x, this.y, '#94a3b8', 5);
      return false;
    }

    // 可以整除！
    sound.playDivide();
    const oldVal = this.value;
    const newVal = Math.floor(oldVal / primeFactor);

    // 彈出運算式動態回饋
    this.addFloatingText(`${oldVal} ÷ ${primeFactor} = ${newVal}`, '#38bdf8');
    game.createSparks(this.x, this.y, '#38bdf8', 12);

    // 魔王分裂護衛侍從機制
    if (this.isBoss && this.bossSkills.includes('split_adds') && newVal > 10) {
      const minionVal = Math.min(30, Math.max(6, Math.floor(newVal / 4)));
      game.spawnSplitClone(this, minionVal);
      this.addFloatingText('召喚因數侍從!', '#f59e0b');
    }

    // 一般特殊分裂怪機制
    if (this.splitOnDivide && newVal > 1) {
      this.value = newVal;
      game.spawnSplitClone(this, newVal);
      this.splitOnDivide = false;
      return true;
    }

    this.value = newVal;

    // 當數字除至 1，宣告完全分解消除！
    if (this.value <= 1) {
      this.isDead = true;
      sound.playEliminate();
      const reward = Math.max(20, Math.floor(Math.abs(this.originalValue) * 1.5));
      game.addGold(reward, this.x, this.y);
      game.createExplosion(this.x, this.y, this.isBoss ? '#f59e0b' : '#22c55e', this.isBoss ? 50 : 24);
    }

    return true;
  }

  // 受到絕對值稜鏡淨化
  takeAbsolutePurify(game) {
    if (this.isDead) return false;

    if (this.isNegative) {
      sound.playPurify();
      const oldVal = this.value;
      this.value = Math.abs(this.value);
      this.addFloatingText(`|${oldVal}| ➔ ${this.value}`, '#a855f7');
      game.createSparks(this.x, this.y, '#c084fc', 18);
      return true;
    }
    return false;
  }

  // 受到運算子調整塔 (+1 / -1) 攻擊
  takeOperatorHit(opValue, game) {
    if (this.isDead || this.operatorCooldown > 0) return false;

    // 負數怪需先淨化
    if (this.isNegative) {
      sound.playResist();
      this.addFloatingText('負數不可運算!', '#f43f5e');
      return false;
    }

    this.operatorCooldown = 1.6;
    sound.playShoot(3);
    const oldVal = this.value;
    this.value = oldVal + opValue;

    const opStr = opValue > 0 ? `+ ${opValue}` : `- ${Math.abs(opValue)}`;
    this.addFloatingText(`${oldVal} ${opStr} = ${this.value}!`, '#2dd4bf');
    game.createSparks(this.x, this.y, '#14b8a6', 15);
    return true;
  }

  // 觸發魔王主動技能
  triggerBossSkill(game) {
    if (this.isDead || !this.isBoss) return;

    // 技能 A：極性反轉波 (Polarity Flip)
    if (this.bossSkills.includes('polarity_flip') && Math.random() < 0.5) {
      sound.playResist();
      this.addFloatingText('⚡ 領域技：極性反轉！', '#c084fc');
      game.createExplosion(this.x, this.y, '#c084fc', 30);

      // 將範圍內正數小怪轉為負數護盾怪
      for (const m of game.monsters) {
        if (m !== this && !m.isBoss && !m.isDead && !m.isNegative) {
          const dist = Math.hypot(m.x - this.x, m.y - this.y);
          if (dist <= 260) {
            m.value = -Math.abs(m.value);
            m.addFloatingText('負數反轉!', '#f43f5e');
          }
        }
      }
      return;
    }

    // 技能 B：乘倍激怒光環 (Multiply Aura)
    if (this.bossSkills.includes('multiply_aura')) {
      sound.playDamage();
      this.addFloatingText('🔥 領域技：乘倍光環 (×2)！', '#f59e0b');
      game.createExplosion(this.x, this.y, '#f59e0b', 30);

      // 使範圍內小怪數值翻倍
      for (const m of game.monsters) {
        if (m !== this && !m.isBoss && !m.isDead) {
          const dist = Math.hypot(m.x - this.x, m.y - this.y);
          if (dist <= 260) {
            m.value = m.value * 2;
            m.addFloatingText('× 2 激怒!', '#fbbf24');
          }
        }
      }
    }
  }

  update(dt, game) {
    this.pulseAngle += dt * 3;

    if (this.operatorCooldown > 0) {
      this.operatorCooldown -= dt;
    }

    // 魔王技能計時與發動
    if (this.isBoss && !this.isDead) {
      this.bossSkillTimer -= dt;
      if (this.bossSkillTimer <= 0) {
        this.triggerBossSkill(game);
        this.bossSkillTimer = 7.5 + Math.random() * 2;
      }
    }

    // 更新浮動文字
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life -= dt;
      ft.y -= dt * 30;
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }

    if (this.isDead) return;

    // 沿著路線節點行進
    if (this.currentWaypointIndex < this.waypoints.length - 1) {
      const target = this.waypoints[this.currentWaypointIndex + 1];
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const dist = Math.hypot(dx, dy);
      const step = this.speed * dt;

      if (dist <= step) {
        this.x = target.x;
        this.y = target.y;
        this.currentWaypointIndex++;
        this.progress += dist;
      } else {
        this.x += (dx / dist) * step;
        this.y += (dy / dist) * step;
        this.progress += step;
      }
    } else {
      // 抵達終點基地
      this.reachedEnd = true;
      this.isDead = true;
      sound.playDamage();
      const dmg = this.isBoss ? 5 : 1;
      game.damageBase(dmg);
      game.createExplosion(this.x, this.y, '#ef4444', 24);
    }
  }

  draw(ctx) {
    ctx.save();

    // 繪製陰影與光環
    ctx.shadowBlur = this.isBoss ? 20 : 12;
    if (this.isBoss) {
      ctx.shadowColor = '#f59e0b';
    } else if (this.isNegative) {
      ctx.shadowColor = '#a855f7';
    } else if (this.splitOnDivide) {
      ctx.shadowColor = '#f59e0b';
    } else {
      ctx.shadowColor = '#0284c7';
    }

    // 怪物外圈與底色
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.isBoss) {
      ctx.fillStyle = '#451a03'; // 深金琥珀核
    } else if (this.isNegative) {
      ctx.fillStyle = '#2e1065';
    } else if (this.splitOnDivide) {
      ctx.fillStyle = '#451a03';
    } else {
      ctx.fillStyle = '#0f172a';
    }
    ctx.fill();

    // 外框線
    ctx.lineWidth = this.isBoss ? 4 : 3;
    if (this.isBoss) {
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // 魔王金色外輪廓環
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 6 + Math.sin(this.pulseAngle) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (this.isNegative) {
      const pulse = Math.sin(this.pulseAngle) * 3;
      ctx.strokeStyle = '#c084fc';
      ctx.stroke();

      // 負數護盾力場環
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 5 + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (this.splitOnDivide) {
      ctx.strokeStyle = '#fbbf24';
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();
    }

    // 魔王皇冠符號
    if (this.isBoss) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👑', this.x, this.y - this.radius - 8);
    }

    // 繪製中心數字
    ctx.shadowBlur = 0;
    ctx.fillStyle = this.isNegative ? '#fbcfe8' : '#ffffff';
    ctx.font = `bold ${this.isBoss ? 20 : 18}px "Outfit", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.value}`, this.x, this.y - (this.isNegative ? 0 : 2));

    // 質因數提示小彩燈
    if (!this.isNegative && this.value > 1) {
      const factors = this.getFactors();
      const dotRadius = 3.5;
      const startX = this.x - ((factors.length - 1) * 9) / 2;
      const dotY = this.y + (this.isBoss ? 17 : 13);

      factors.forEach((f, idx) => {
        ctx.beginPath();
        ctx.arc(startX + idx * 9, dotY, dotRadius, 0, Math.PI * 2);
        if (f === 2) ctx.fillStyle = '#38bdf8';
        else if (f === 3) ctx.fillStyle = '#fbbf24';
        else if (f === 5) ctx.fillStyle = '#34d399';
        ctx.fill();
      });
    }

    ctx.restore();

    // 繪製頭頂浮動算式文字
    this.floatingTexts.forEach(ft => {
      ctx.save();
      const alpha = Math.max(0, ft.life / ft.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });
  }
}
