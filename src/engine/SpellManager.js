// Commander Active Math Spells & Energy (Mana) Engine for Math Tower Defense
import { sound } from './Audio.js';
import { techTree } from './TechTreeManager.js';

function computeGcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export const SPELLS = {
  gcd: {
    id: 'gcd',
    name: '最大公因數引爆',
    hotkey: 'Q',
    icon: '👑',
    cost: 50,
    cooldown: 6.0,
    radius: 68,
    type: 'target_ground',
    desc: '【快捷鍵 Q】框選小範圍群怪計算 GCD 最大公因數，直接連鎖除法引爆！'
  },
  vortex: {
    id: 'vortex',
    name: '同餘黑洞 mod 5',
    hotkey: 'W',
    icon: '🌀',
    cost: 85,
    cooldown: 10.0,
    radius: 90,
    type: 'target_ground',
    desc: '【快捷鍵 W】放置 5.5 秒旋轉黑洞（消耗 85 能量），經過數值變 x%5；5 的倍數怪直接湮滅秒殺！'
  },
  overdrive: {
    id: 'overdrive',
    name: '黃金分割超頻',
    hotkey: 'E',
    icon: '⚡',
    cost: 50,
    cooldown: 12.0,
    radius: 0,
    type: 'instant',
    desc: '【快捷鍵 E】全場防禦塔攻速提升 1.618 倍（黃金比例），持續 6 秒！'
  }
};

export class SpellManager {
  constructor(game) {
    this.game = game;
    this.maxMana = 100 + techTree.getMaxManaBonus();
    this.mana = this.maxMana;
    this.regenRate = 1.8 + techTree.getManaRegenBonus(); // Mana per second (大幅調降恢復速度)

    this.cooldowns = {
      gcd: 0,
      vortex: 0,
      overdrive: 0
    };

    this.aimingSpell = null; // 'gcd' | 'vortex' | null
    this.activeVortices = []; // [{ x, y, radius, duration, maxDuration, affectedIds: Set }]
    this.lightningArcs = []; // [{ x1, y1, x2, y2, life, maxLife, color }]
    this.goldenOverdriveTimer = 0;
    this.vortexPulseAngle = 0;
  }

  reset() {
    this.maxMana = 100 + techTree.getMaxManaBonus();
    this.mana = this.maxMana;
    this.regenRate = 1.8 + techTree.getManaRegenBonus();
    this.cooldowns = { gcd: 0, vortex: 0, overdrive: 0 };
    this.aimingSpell = null;
    this.activeVortices = [];
    this.lightningArcs = [];
    this.goldenOverdriveTimer = 0;
  }

  get isAiming() {
    return this.aimingSpell !== null;
  }

  get isOverdriveActive() {
    return this.goldenOverdriveTimer > 0;
  }

  addMana(amount) {
    this.mana = Math.min(this.maxMana, this.mana + amount);
  }

  startAiming(spellId) {
    const spell = SPELLS[spellId];
    if (!spell) return false;

    if (this.cooldowns[spellId] > 0 || this.mana < spell.cost) {
      sound.playResist();
      return false;
    }

    if (spell.type === 'instant') {
      return this.castInstant(spellId);
    }

    if (this.aimingSpell === spellId) {
      this.aimingSpell = null; // Toggle off
    } else {
      this.aimingSpell = spellId;
    }
    return true;
  }

  cancelAiming() {
    this.aimingSpell = null;
  }

  castInstant(spellId) {
    const spell = SPELLS[spellId];
    if (!spell) return false;
    if (this.cooldowns[spellId] > 0 || this.mana < spell.cost) {
      sound.playResist();
      return false;
    }

    this.mana -= spell.cost;
    this.cooldowns[spellId] = spell.cooldown;

    if (spellId === 'overdrive') {
      this.goldenOverdriveTimer = 6.0;
      sound.playOverdrive();
      if (this.game && this.game.towers) {
        this.game.towers.forEach(t => {
          this.game.createSparks(t.x, t.y, '#fbbf24', 16);
        });
      }
    }
    return true;
  }

  castAt(x, y) {
    if (!this.aimingSpell) return false;
    const spellId = this.aimingSpell;
    const spell = SPELLS[spellId];
    if (!spell) return false;

    if (this.cooldowns[spellId] > 0 || this.mana < spell.cost) {
      sound.playResist();
      this.aimingSpell = null;
      return false;
    }

    this.mana -= spell.cost;
    this.cooldowns[spellId] = spell.cooldown;
    this.aimingSpell = null;

    if (spellId === 'gcd') {
      this.executeGcdBlast(x, y, spell.radius);
    } else if (spellId === 'vortex') {
      this.executeVortex(x, y, spell.radius);
    }

    return true;
  }

  // 執行 GCD 最大公因數引爆
  executeGcdBlast(x, y, radius) {
    const finalRadius = radius * techTree.getGcdRadiusMultiplier();
    const monsters = this.game.monsters.filter(m => {
      if (m.isDead || m.isNegative) return false;
      const d = Math.hypot(m.x - x, m.y - y);
      return d <= finalRadius + m.radius;
    });

    this.game.createExplosion(x, y, '#fbbf24', 36);

    if (monsters.length === 0) {
      sound.playResist();
      return;
    }

    if (monsters.length === 1) {
      // 只有 1 隻：對合數嘗試除以其最小質因數
      const m = monsters[0];
      const val = m.value;
      let primeDivisor = null;
      for (const p of [2, 3, 5, 7, 11, 13]) {
        if (val % p === 0) {
          primeDivisor = p;
          break;
        }
      }
      if (primeDivisor && val > primeDivisor) {
        sound.playDivide();
        const newVal = Math.floor(val / primeDivisor);
        m.value = newVal;
        m.hp = Math.max(0, newVal);
        m.maxStageHp = m.calcStageMaxHp(newVal, m.isBoss);
        m.stageHp = m.maxStageHp;
        m.addFloatingText(`÷ ${primeDivisor} = ${newVal}!`, '#fde047');
        this.game.createSparks(m.x, m.y, '#f59e0b', 20);
        if (m.value <= 1) {
          m.onEliminated(null, this.game);
        }
      } else {
        m.stageHp = Math.max(1, m.stageHp - 45);
        m.addFloatingText('因數震波 -45!', '#fde047');
        sound.playShoot(2);
      }
      return;
    }

    // 多隻怪物：計算全體 GCD
    let overallGcd = Math.abs(monsters[0].value);
    for (let i = 1; i < monsters.length; i++) {
      overallGcd = computeGcd(overallGcd, monsters[i].value);
    }

    if (overallGcd > 1) {
      // 發現大於 1 的最大公因數！引爆全體怪物除法！
      sound.playGcdBlast();
      for (const m of monsters) {
        const oldVal = m.value;
        const newVal = Math.floor(oldVal / overallGcd);
        m.value = newVal;
        m.hp = Math.max(0, newVal);
        m.maxStageHp = m.calcStageMaxHp(newVal, m.isBoss);
        m.stageHp = m.maxStageHp;
        m.addFloatingText(`💥 GCD(${overallGcd}) ➔ ${newVal}!`, '#fbbf24');
        this.game.createSparks(m.x, m.y, '#f59e0b', 22);

        if (m.value <= 1) {
          m.onEliminated(null, this.game);
        }
      }

      // 生成群怪之間的金色連鎖電弧
      for (let i = 0; i < monsters.length; i++) {
        for (let j = i + 1; j < monsters.length; j++) {
          this.lightningArcs.push({
            x1: monsters[i].x,
            y1: monsters[i].y,
            x2: monsters[j].x,
            y2: monsters[j].y,
            life: 0.35,
            maxLife: 0.35,
            color: '#fbbf24'
          });
        }
      }
    } else {
      // 互質 (GCD = 1)：造成中度震波打擊 (享受歐幾里得爆發科技增益)
      sound.playResist();
      const coprimeDmg = techTree.getGcdCoprimeDamage();
      for (const m of monsters) {
        m.stageHp = Math.max(1, m.stageHp - coprimeDmg);
        m.addFloatingText(`互質震波 -${coprimeDmg}!`, '#94a3b8');
        this.game.createSparks(m.x, m.y, '#94a3b8', 8);
      }
    }
  }

  // 執行同餘黑洞召喚
  executeVortex(x, y, radius) {
    sound.playVortex();
    const duration = techTree.getVortexDuration();
    this.activeVortices.push({
      x,
      y,
      radius,
      duration: duration,
      maxDuration: duration,
      affectedIds: new Set()
    });
    this.game.createExplosion(x, y, '#a855f7', 30);
  }

  update(dt) {
    // 能量自然恢復
    this.addMana(this.regenRate * dt);

    // 技能冷卻遞減
    for (const k in this.cooldowns) {
      if (this.cooldowns[k] > 0) {
        this.cooldowns[k] = Math.max(0, this.cooldowns[k] - dt);
      }
    }

    // 黃金超頻計時
    if (this.goldenOverdriveTimer > 0) {
      this.goldenOverdriveTimer = Math.max(0, this.goldenOverdriveTimer - dt);
    }

    // 更新電弧
    for (let i = this.lightningArcs.length - 1; i >= 0; i--) {
      const arc = this.lightningArcs[i];
      arc.life -= dt;
      if (arc.life <= 0) {
        this.lightningArcs.splice(i, 1);
      }
    }

    // 更新黑洞與同餘結算
    this.vortexPulseAngle += dt * 3;
    for (let i = this.activeVortices.length - 1; i >= 0; i--) {
      const v = this.activeVortices[i];
      v.duration -= dt;

      // 檢查進入黑洞的怪物
      for (const m of this.game.monsters) {
        if (m.isDead) continue;
        const d = Math.hypot(m.x - v.x, m.y - v.y);
        if (d <= v.radius + m.radius) {
          // 減速 40%
          m.applySlow(0.60, 0.4);

          // 每個黑洞每隻怪只結算一次 mod 5
          if (!v.affectedIds.has(m.id)) {
            v.affectedIds.add(m.id);

            // 循環小數幽靈：黑洞強大引力撕裂小數點，強制化為整數！
            if (m.isRecurring) {
              m.isRecurring = false;
              const convertedVal = m.recurringNumerator || 1;
              m.value = convertedVal;
              m.hp = convertedVal;
              m.addFloatingText(`實數截斷 ➔ ${convertedVal}!`, '#c084fc');
              this.game.createSparks(m.x, m.y, '#a855f7', 16);
              if (convertedVal <= 1) {
                m.onEliminated(null, this.game);
              } else {
                m.maxStageHp = m.calcStageMaxHp(convertedVal, m.isBoss);
                m.stageHp = m.maxStageHp;
                m.prevStageHp = m.stageHp;
              }
              continue;
            }

            const oldVal = m.value;
            const absVal = Math.abs(oldVal);
            const remainder = absVal % 5;

            if (remainder <= 1) {
              // 餘數為 0 或 1：直接因數歸一/整除湮滅！
              const tag = remainder === 0 ? `${oldVal} mod 5 = 0 (整除湮滅!)` : `${oldVal} mod 5 = 1 (歸一消滅!)`;
              m.addFloatingText(tag, '#c084fc');
              m.onEliminated(null, this.game);
            } else {
              // 餘數為 2, 3, 4：血量直接縮減至餘數，保證能被 2號砲、3號砲、方根井完美消滅！
              const newVal = m.isNegative ? -remainder : remainder;
              m.value = newVal;
              m.hp = Math.max(0, Math.abs(newVal));
              m.maxStageHp = m.calcStageMaxHp(newVal, m.isBoss);
              m.stageHp = m.maxStageHp;
              m.addFloatingText(`${oldVal} mod 5 ➔ ${newVal}!`, '#d8b4fe');
              this.game.createSparks(m.x, m.y, '#a855f7', 16);
            }
          }
        }
      }

      if (v.duration <= 0) {
        this.activeVortices.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    // 1. 繪製同餘黑洞實體
    for (const v of this.activeVortices) {
      ctx.save();
      const progress = v.duration / v.maxDuration;
      const alpha = Math.min(1, progress * 2);

      // 外層星雲光暈
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.radius + Math.sin(this.vortexPulseAngle) * 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(147, 51, 234, ${0.15 * alpha})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(192, 132, 252, ${0.6 * alpha})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.stroke();

      // 中心旋轉渦流
      ctx.translate(v.x, v.y);
      ctx.rotate(this.vortexPulseAngle * 1.5);
      ctx.beginPath();
      ctx.arc(0, 0, v.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(126, 34, 206, ${0.35 * alpha})`;
      ctx.fill();

      // 旋轉數學符號裝飾
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(243, 232, 255, ${0.9 * alpha})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('mod 5', 0, 0);

      ctx.restore();
    }

    // 2. 繪製 GCD 金色連鎖電弧
    for (const arc of this.lightningArcs) {
      ctx.save();
      const alpha = arc.life / arc.maxLife;
      ctx.beginPath();
      ctx.moveTo(arc.x1, arc.y1);
      // 中間折線增加閃電真實感
      const midX = (arc.x1 + arc.x2) / 2 + (Math.random() * 20 - 10);
      const midY = (arc.y1 + arc.y2) / 2 + (Math.random() * 20 - 10);
      ctx.lineTo(midX, midY);
      ctx.lineTo(arc.x2, arc.y2);
      ctx.strokeStyle = arc.color;
      ctx.lineWidth = 3 * alpha;
      ctx.shadowColor = arc.color;
      ctx.shadowBlur = 12;
      ctx.globalAlpha = alpha;
      ctx.stroke();
      ctx.restore();
    }

    // 3. 繪製施法瞄準光圈 (Aiming Reticle)
    if (this.aimingSpell && this.game) {
      const spell = SPELLS[this.aimingSpell];
      const mouse = this.game.mousePos;
      if (spell && mouse && mouse.x > 0 && mouse.y > 0) {
        const effectiveRadius = this.aimingSpell === 'gcd'
          ? spell.radius * techTree.getGcdRadiusMultiplier()
          : spell.radius;

        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, effectiveRadius, 0, Math.PI * 2);

        const color = this.aimingSpell === 'gcd' ? '#fbbf24' : '#c084fc';
        ctx.fillStyle = this.aimingSpell === 'gcd' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(192, 132, 252, 0.15)';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 4]);
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.stroke();

        // 準心中心小十字
        ctx.beginPath();
        ctx.moveTo(mouse.x - 8, mouse.y);
        ctx.lineTo(mouse.x + 8, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 8);
        ctx.lineTo(mouse.x, mouse.y + 8);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.stroke();

        // 瞄準提示文字
        ctx.font = 'bold 12px "Outfit", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`【點擊施放】${spell.name}`, mouse.x, mouse.y - effectiveRadius - 8);
        ctx.restore();
      }
    }
  }
}
