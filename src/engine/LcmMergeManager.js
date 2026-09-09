// LCM Merge Manager (公倍數合體危機管理器)
// Manages monster Least Common Multiple collisions, colossus fusion, and factor fission shockwaves

import { sound } from './Audio.js';
import { techTree } from './TechTreeManager.js';

export function computeGcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function computeLcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / computeGcd(a, b);
}

export class LcmMergeManager {
  constructor(game) {
    this.game = game;
    this.fusionRings = []; // 融合重力圈動畫
    this.shockwaves = [];  // 因數裂變震波
    this.maxLcmCap = 720;  // 數值防線上限
    this.mergeDist = 28;   // 碰撞觸發距離 (px)
  }

  update(dt) {
    // 1. 更新融合特效與震波
    for (let i = this.fusionRings.length - 1; i >= 0; i--) {
      const ring = this.fusionRings[i];
      ring.life -= dt;
      ring.radius = Math.max(0, ring.radius - dt * 60);
      if (ring.life <= 0) {
        this.fusionRings.splice(i, 1);
      }
    }

    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.life -= dt;
      sw.radius += dt * 260;
      if (sw.life <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }

    const monsters = this.game.monsters || [];
    const n = monsters.length;
    if (n < 2) return;

    // 2. 搜尋同路徑碰撞並觸發公倍數合體
    for (let i = 0; i < n; i++) {
      const m1 = monsters[i];
      if (m1.isDead || m1.isNegative || m1.isBoss || m1.value <= 1 || m1.lcmMergeCooldown > 0) {
        continue;
      }

      for (let j = i + 1; j < n; j++) {
        const m2 = monsters[j];
        if (m2.isDead || m2.isNegative || m2.isBoss || m2.value <= 1 || m2.lcmMergeCooldown > 0) {
          continue;
        }

        const dist = Math.hypot(m1.x - m2.x, m1.y - m2.y);
        if (dist <= this.mergeDist) {
          this.executeMerge(m1, m2);
          break;
        }
      }
    }
  }

  executeMerge(m1, m2) {
    // 決定主體：保留前進進度較遠的怪物
    const winner = m1.progress >= m2.progress ? m1 : m2;
    const absorbed = winner === m1 ? m2 : m1;

    const val1 = winner.value;
    const val2 = absorbed.value;

    let rawLcm = computeLcm(val1, val2);
    let finalVal = Math.min(this.maxLcmCap, Math.round(rawLcm));

    // 如果 LCM 等於原數值 (例如 6 與 12，LCM=12)，為保證合體危機感，乘上最小公倍擴展
    if (finalVal === Math.max(val1, val2) && finalVal * 2 <= this.maxLcmCap) {
      finalVal = finalVal * 2;
    }

    // 標記被吸收的怪物死亡並解除雙子鏈接
    absorbed.isDead = true;
    if (absorbed.twinPartner) {
      if (absorbed.twinPartner.twinPartner === absorbed) {
        absorbed.twinPartner.twinPartner = null;
      }
      absorbed.twinPartner = null;
    }
    if (winner.twinPartner) {
      if (winner.twinPartner.twinPartner === winner) {
        winner.twinPartner.twinPartner = null;
      }
      winner.twinPartner = null;
    }

    // 更新合體主體屬性
    winner.value = finalVal;
    winner.hp = finalVal;
    winner.originalValue = Math.max(winner.originalValue, finalVal);
    winner.isLcmMerged = true;
    winner.lcmMergeCount = (winner.lcmMergeCount || 0) + 1;
    winner.lcmMergeCooldown = 3.5; // 3.5 秒合體冷卻免疫期

    // 強化合體巨獸階層耐受血量
    winner.maxStageHp = Math.round(winner.calcStageMaxHp(finalVal, false) * 1.35);
    winner.stageHp = winner.maxStageHp;
    winner.prevStageHp = winner.stageHp;

    // 音效與視覺
    sound.playLcmMerge();
    winner.addFloatingText(`⚡ lcm(${val1}, ${val2}) = ${finalVal}!`, '#ec4899');
    this.game.createExplosion(winner.x, winner.y, '#ec4899', 32);

    // 產生向內收縮的重力引力圈
    this.fusionRings.push({
      x: winner.x,
      y: winner.y,
      radius: 40,
      maxRadius: 40,
      life: 0.45,
      color: '#ec4899'
    });
  }

  // 因數裂變震波：當合體怪被質數砲塔擊破時引爆
  triggerFissionShockwave(x, y, factor) {
    sound.playFission();

    // 增加指揮官算力 (享受公倍數鍊金術科技增益)
    const manaGain = techTree.getLcmManaBonus();
    if (this.game.spellManager) {
      this.game.spellManager.addMana(manaGain);
    }

    // 產生衝擊波
    this.shockwaves.push({
      x,
      y,
      radius: 10,
      maxRadius: 130,
      life: 0.45,
      color: '#ec4899'
    });

    this.game.createExplosion(x, y, '#f472b6', 40);

    // 震波對周遭怪物造成範圍因數削弱
    for (const m of this.game.monsters) {
      if (m.isDead) continue;
      const d = Math.hypot(m.x - x, m.y - y);
      if (d <= 130) {
        m.stageHp -= 45;
        m.addFloatingText('因數裂變 -45!', '#f472b6');
        this.game.createSparks(m.x, m.y, '#f472b6', 10);
        if (m.stageHp <= 0 && m.value > 1 && factor) {
          m.takePrimeHit(factor, 40, this.game);
        }
      }
    }
  }

  draw(ctx) {
    if (this.fusionRings.length === 0 && this.shockwaves.length === 0) return;

    ctx.save();

    // 繪製重力融合引力圈
    for (const ring of this.fusionRings) {
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = ring.life / 0.45;
      ctx.shadowColor = ring.color;
      ctx.shadowBlur = 15;
      ctx.stroke();
    }

    // 繪製因數裂變擴散震波
    for (const sw of this.shockwaves) {
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = sw.life / 0.45;
      ctx.shadowColor = sw.color;
      ctx.shadowBlur = 12;
      ctx.stroke();
    }

    ctx.restore();
  }
}
