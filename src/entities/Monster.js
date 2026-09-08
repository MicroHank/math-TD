// Monster Entity for Math Tower Defense
import { sound } from '../engine/Audio.js';

export class Monster {
  constructor({
    id,
    value,
    waypoints,
    speed = 10,
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

    // 總體數值生命與多段階層耐受度系統 (Multi-Hit Division Durability)
    this.maxHp = Math.max(1, Math.abs(value));
    this.hp = Math.max(0, Math.abs(value));
    this.maxStageHp = this.calcStageMaxHp(value, isBoss);
    this.stageHp = this.maxStageHp;
    this.prevStageHp = this.stageHp; // 用於受擊緩衝條 (White/Red buffer decay)
    this.hitFlashTimer = 0;

    this.floatingTexts = []; // { text, color, x, y, life, maxLife }
    this.pulseAngle = Math.random() * Math.PI * 2;

    this.operatorCooldown = 0; // 避免運算子塔在短時間內連續刷同隻怪
    this.bossSkillTimer = 6.0; // 魔王技能計時器

    // 減速、冰凍與定身狀態
    this.slowTimer = 0;
    this.slowRatio = 1.0;
    this.stunTimer = 0;
  }

  applyStun(duration) {
    this.stunTimer = Math.max(this.stunTimer || 0, duration);
    this.addFloatingText('定身!', '#c084fc');
  }

  // 計算每個數字階段分解前所需的耐受度血量 (例如 6 面對 2 號砲 25 傷害，需承受 70 點約 3 發打擊)
  calcStageMaxHp(val, isBoss = false) {
    const absVal = Math.abs(val);
    let base = 65;
    if (absVal <= 2) base = 40;        // ~2 發 Lv1 砲 (25 傷害)
    else if (absVal <= 4) base = 50;   // ~2 發 Lv1 砲
    else if (absVal <= 6) base = 70;   // ~3 發 Lv1 砲 (25 傷害) -> 6 被 2 打需 3 下！
    else if (absVal <= 12) base = 85;  // ~3-4 發 Lv1 砲
    else if (absVal <= 24) base = 100; // ~4 發 Lv1 砲 (2 發 Lv2 砲)
    else if (absVal <= 60) base = 120; // ~5 發 Lv1 砲
    else base = 140;

    if (isBoss) {
      base = Math.round(base * 3.2); // 魔王耐受度更厚實
    }
    return base;
  }

  get isNegative() {
    return this.value < 0;
  }

  // 判定是否為完全平方數（幾何方塊怪，例如 4, 9, 16, 25, 36, 49, 64, 81, 100）
  get isSquare() {
    if (this.isNegative || this.value <= 1) return false;
    const s = Math.round(Math.sqrt(this.value));
    return s * s === this.value;
  }

  // 判定是否為質數（孤傲質數刺客，例如 7, 11, 13, 17, 19, 23...）
  get isPrime() {
    if (this.isNegative || this.value <= 1) return false;
    for (let i = 2; i * i <= this.value; i++) {
      if (this.value % i === 0) return false;
    }
    return true;
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
      if (absVal % 7 === 0) factors.push(7);
    }
    return factors;
  }

  // 套用減速力場
  applySlow(ratio = 0.5, duration = 1.2) {
    this.slowRatio = Math.min(this.slowRatio, ratio);
    this.slowTimer = Math.max(this.slowTimer, duration);
  }

  addFloatingText(text, color = '#ffffff') {
    this.floatingTexts.push({
      text,
      color,
      x: this.x + (Math.random() * 20 - 10),
      y: this.y - this.radius - 22,
      life: 1.0,
      maxLife: 1.0
    });
  }

  // 受到質數砲多段打擊 (damage 預設 25)
  takePrimeHit(primeFactor, damage = 25, game) {
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
      if (game && game.perkManager && game.perkManager.getCoprimePierceBonus() > 0) {
        const pierceDmg = Math.round(damage * game.perkManager.getCoprimePierceBonus());
        this.hitFlashTimer = 0.22;
        this.prevStageHp = Math.max(this.prevStageHp, this.stageHp);
        this.stageHp -= pierceDmg;
        this.addFloatingText(`互質削甲 -${pierceDmg}!`, '#a5b4fc');
        game.createSparks(this.x, this.y, '#818cf8', 8);
      } else {
        this.addFloatingText(`無法被 ${primeFactor} 整除!`, '#94a3b8');
        game.createSparks(this.x, this.y, '#94a3b8', 5);
      }
      return false;
    }

    // 可以整除！扣減當前階層耐受度
    this.hitFlashTimer = 0.22;
    this.prevStageHp = Math.max(this.prevStageHp, this.stageHp);
    this.stageHp -= damage;

    if (this.stageHp > 0) {
      // 尚未破除該階段：彈出傷害與剩餘打擊次數提示
      sound.playShoot(primeFactor);
      const remainingHits = Math.ceil(this.stageHp / damage);
      this.addFloatingText(`-${damage} (剩${remainingHits}下)`, '#38bdf8');
      game.createSparks(this.x, this.y, '#38bdf8', 6);
      return true;
    }

    // 耐受值耗盡：正式發動質數除法分解！
    sound.playDivide();
    const oldVal = this.value;
    const newVal = Math.floor(oldVal / primeFactor);

    // 彈出金色醒目運算式動態回饋
    this.addFloatingText(`${oldVal} ÷ ${primeFactor} = ${newVal}`, '#fde047');
    game.createSparks(this.x, this.y, '#38bdf8', 18);

    // 更新數值
    this.value = newVal;
    this.hp = Math.max(0, Math.abs(newVal));

    // 魔王分裂護衛侍從機制
    if (this.isBoss && this.bossSkills.includes('split_adds') && newVal > 10) {
      const minionVal = Math.min(30, Math.max(6, Math.floor(newVal / 4)));
      game.spawnSplitClone(this, minionVal);
      this.addFloatingText('召喚因數侍從!', '#f59e0b');
    }

    // 一般特殊分裂怪機制
    if (this.splitOnDivide && newVal > 1) {
      game.spawnSplitClone(this, newVal);
      this.splitOnDivide = false;
      return true;
    }

    // 當數字除至 1，宣告完全分解消除！
    if (this.value <= 1) {
      this.isDead = true;
      sound.playEliminate();
      const goldMult = game && game.perkManager ? (1 + game.perkManager.getGoldMultiplier()) : 1.0;
      const baseBounty = Math.max(25, Math.floor(Math.abs(this.originalValue) * 1.6 * goldMult));
      const reward = this.isBoss ? Math.max(300, baseBounty * 2) : baseBounty;
      game.addGold(reward, this.x, this.y);
      game.createExplosion(this.x, this.y, this.isBoss ? '#f59e0b' : '#22c55e', this.isBoss ? 50 : 24);

      // 歐拉篩法因數連鎖引爆
      if (game && game.perkManager && game.perkManager.hasEulerSieve()) {
        game.triggerEulerSieveExplosion(this.x, this.y, primeFactor);
      }
    } else {
      // 重設新階層耐受血量
      this.maxStageHp = this.calcStageMaxHp(newVal, this.isBoss);
      this.stageHp = this.maxStageHp;
      this.prevStageHp = this.stageHp;
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
      this.hp = Math.abs(this.value);
      this.prevHp = this.hp;
      this.hitFlashTimer = 0.22;
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
    const newVal = oldVal + opValue;

    this.prevHp = Math.max(this.prevHp, this.hp);
    this.value = newVal;
    this.hp = Math.max(0, Math.abs(newVal));
    this.maxHp = Math.max(this.maxHp, this.hp);
    this.hitFlashTimer = 0.22;

    const opStr = opValue > 0 ? `+ ${opValue}` : `- ${Math.abs(opValue)}`;
    this.addFloatingText(`${oldVal} ${opStr} = ${this.value}!`, '#2dd4bf');
    game.createSparks(this.x, this.y, '#14b8a6', 15);

    // 若運算後數值歸一 (<= 1) 且非負數，直接達成因數歸一消滅
    if (this.value <= 1 && !this.isNegative) {
      this.isDead = true;
      sound.playEliminate();
      const goldMult = game && game.perkManager ? (1 + game.perkManager.getGoldMultiplier()) : 1.0;
      const baseBounty = Math.max(25, Math.floor(Math.abs(this.originalValue) * 1.5 * goldMult));
      const reward = this.isBoss ? Math.max(300, baseBounty * 2) : baseBounty;
      game.addGold(reward, this.x, this.y);
      game.createExplosion(this.x, this.y, '#2dd4bf', 24);
    }

    return true;
  }

  // 受到 √x 根號方根重力井打擊
  takeSqrtHit(damage = 50, game) {
    if (this.isDead) return false;

    // 負數不可開實數根號
    if (this.isNegative) {
      sound.playResist();
      this.addFloatingText('負數無實數根!', '#f43f5e');
      game.createSparks(this.x, this.y, '#f43f5e', 8);
      return false;
    }

    this.hitFlashTimer = 0.22;
    this.prevStageHp = Math.max(this.prevStageHp, this.stageHp);

    if (this.isSquare) {
      // 完全平方數：造成方根暴擊破甲！
      sound.playShoot(5);
      const critMult = game && game.perkManager ? game.perkManager.getSquareCritMultiplier() : 2.5;
      const critDmg = Math.round(damage * critMult);
      this.stageHp -= critDmg;
      game.createSparks(this.x, this.y, '#f59e0b', 12);

      if (this.stageHp <= 0) {
        sound.playDivide();
        const oldVal = this.value;
        const newVal = Math.round(Math.sqrt(oldVal));
        this.addFloatingText(`√${oldVal} = ${newVal}!`, '#f59e0b');
        game.createSparks(this.x, this.y, '#fbbf24', 24);

        this.value = newVal;
        this.hp = Math.max(0, newVal);

        if (this.value <= 1) {
          this.isDead = true;
          sound.playEliminate();
          const baseBounty = Math.max(30, Math.floor(Math.abs(this.originalValue) * 1.8));
          const reward = this.isBoss ? Math.max(300, baseBounty * 2) : baseBounty;
          game.addGold(reward, this.x, this.y);
          game.createExplosion(this.x, this.y, '#f59e0b', this.isBoss ? 50 : 28);
        } else {
          this.maxStageHp = this.calcStageMaxHp(newVal, this.isBoss);
          this.stageHp = this.maxStageHp;
          this.prevStageHp = this.stageHp;
        }
        return true;
      } else {
        const remainingHits = Math.ceil(this.stageHp / critDmg);
        this.addFloatingText(`暴擊! -${critDmg} (剩${remainingHits}下)`, '#f59e0b');
        return true;
      }
    } else {
      // 非平方數：造成中度重力壓制與減速
      sound.playResist();
      const normalDmg = Math.round(damage * 0.45);
      this.stageHp -= normalDmg;
      this.applySlow(0.65, 1.4);
      this.addFloatingText(`重力壓制 -${normalDmg}`, '#94a3b8');
      game.createSparks(this.x, this.y, '#f59e0b', 6);
      return true;
    }
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

    // 技能 B：乘倍激怒光狂 (Multiply Aura)
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
            m.hp = Math.abs(m.value);
            m.maxHp = Math.max(m.maxHp, m.hp);
            m.prevHp = m.hp;
            m.addFloatingText('× 2 激怒!', '#fbbf24');
          }
        }
      }
    }
  }

  update(dt, game) {
    this.pulseAngle += dt * 3;

    // 受擊閃爍與階層耐受度平滑衰減
    if (this.hitFlashTimer > 0) {
      this.hitFlashTimer -= dt;
    }
    if (this.prevStageHp > this.stageHp) {
      const drainSpeed = Math.max(30, this.maxStageHp * 2.8);
      this.prevStageHp = Math.max(this.stageHp, this.prevStageHp - dt * drainSpeed);
    } else if (this.prevStageHp < this.stageHp) {
      this.prevStageHp = this.stageHp;
    }

    if (this.operatorCooldown > 0) {
      this.operatorCooldown -= dt;
    }

    // 減速力場計時
    if (this.slowTimer > 0) {
      this.slowTimer -= dt;
      this.speed = this.baseSpeed * this.slowRatio;
      if (this.slowTimer <= 0) {
        this.slowRatio = 1.0;
        this.speed = this.baseSpeed;
      }
    } else {
      this.speed = this.baseSpeed;
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

    // 數論安全防線：正數怪數值若因任何原因縮減至 <= 1，直接因數歸一消滅
    if (!this.isNegative && this.value <= 1) {
      this.isDead = true;
      sound.playEliminate();
      const goldMult = game && game.perkManager ? (1 + game.perkManager.getGoldMultiplier()) : 1.0;
      const baseBounty = Math.max(25, Math.floor(Math.abs(this.originalValue) * 1.5 * goldMult));
      const reward = this.isBoss ? Math.max(300, baseBounty * 2) : baseBounty;
      game.addGold(reward, this.x, this.y);
      game.createExplosion(this.x, this.y, '#22c55e', 24);
      return;
    }

    // 定身狀態檢查
    if (this.stunTimer > 0) {
      this.stunTimer -= dt;
      return;
    }

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

    // 幾何方塊怪 (完全平方數)：金色旋轉幾何外框
    if (this.isSquare && !this.isBoss) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.pulseAngle * 0.4);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      const boxSize = this.radius * 1.35;
      ctx.strokeRect(-boxSize, -boxSize, boxSize * 2, boxSize * 2);
      ctx.restore();
    }

    // 孤傲質數刺客 (大於5的質數怪)：霓虹粉尖刺光環
    if (this.isPrime && this.value > 5 && !this.isBoss) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 4.5, 0, Math.PI * 2);
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.restore();
    }

    // 冰凍減速光環
    if (this.slowTimer > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 6, 0, Math.PI * 2);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.fillStyle = '#06b6d4';
      ctx.font = '11px sans-serif';
      ctx.fillText('❄️', this.x + this.radius + 2, this.y - this.radius - 2);
      ctx.restore();
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
        else if (f === 7) ctx.fillStyle = '#8b5cf6';
        ctx.fill();
      });
    }

    ctx.restore();

    // 繪製頭頂血量與護盾條
    this.drawHealthBar(ctx);

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

  // 繪製頭頂現代動態血量條與護盾條 (以階層耐受血量為基準)
  drawHealthBar(ctx) {
    const isBoss = this.isBoss;
    const barWidth = isBoss ? 64 : 40;
    const barHeight = isBoss ? 7 : 5;
    const barX = this.x - barWidth / 2;
    // 頭頂位置：魔王若有皇冠則稍微向上留出空間
    const barY = isBoss ? (this.y - this.radius - 22) : (this.y - this.radius - 13);
    const radius = 2;

    const stageRatio = Math.max(0, Math.min(1, this.stageHp / this.maxStageHp));
    const bufferRatio = Math.max(0, Math.min(1, this.prevStageHp / this.maxStageHp));

    ctx.save();

    // 輔助繪製圓角矩形
    const fillRounded = (x, y, w, h, r) => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.fill();
    };

    const strokeRounded = (x, y, w, h, r) => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.stroke();
    };

    // 1. 底框背景槽
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(6, 9, 17, 0.88)';
    fillRounded(barX - 1, barY - 1, barWidth + 2, barHeight + 2, radius);

    ctx.strokeStyle = this.isNegative ? 'rgba(192, 132, 252, 0.5)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    strokeRounded(barX - 1, barY - 1, barWidth + 2, barHeight + 2, radius);

    // 2. 受擊緩衝條 (Buffer Bar: 柔和赤白殘影衰減)
    if (bufferRatio > stageRatio) {
      ctx.fillStyle = '#fca5a5';
      fillRounded(barX, barY, Math.max(2, barWidth * bufferRatio), barHeight, radius);
    }

    // 3. 主耐受血條 (Stage HP Bar)
    if (stageRatio > 0) {
      if (this.isNegative) {
        // 紫色水晶護盾條
        ctx.fillStyle = '#c084fc';
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 4;
      } else {
        // 三段式健康色譜
        if (stageRatio > 0.5) {
          ctx.fillStyle = '#22c55e'; // 充沛綠
        } else if (stageRatio > 0.25) {
          ctx.fillStyle = '#f59e0b'; // 警戒黃
        } else {
          ctx.fillStyle = '#ef4444'; // 瀕危紅
        }
      }

      fillRounded(barX, barY, Math.max(2, barWidth * stageRatio), barHeight, radius);
    }

    // 4. 受擊白光閃爍效果
    if (this.hitFlashTimer > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.75, this.hitFlashTimer * 3.5)})`;
      fillRounded(barX, barY, Math.max(2, barWidth * stageRatio), barHeight, radius);
    }

    // 5. 血量數值標籤 (Micro HP Text: 顯示當前耐受 HP)
    ctx.shadowBlur = 0;
    ctx.font = 'bold 8px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    if (this.isNegative) {
      ctx.fillStyle = '#d8b4fe';
      ctx.fillText(`🛡️|${this.value}| [${this.stageHp}/${this.maxStageHp}]`, this.x, barY - 1);
    } else {
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`${this.stageHp}/${this.maxStageHp}`, this.x, barY - 1);
    }

    ctx.restore();
  }
}
