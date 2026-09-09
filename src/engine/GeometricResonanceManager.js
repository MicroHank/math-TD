// Geometric Resonance Matrix (幾何共鳴矩陣)
// Manages tower geometric connectivity, laser chords, resonance triangles, and sanctuary fields

import { sound } from './Audio.js';
import { techTree } from './TechTreeManager.js';

function distToSegment(p, v, w) {
  const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
}

function pointInTriangle(p, p1, p2, p3) {
  const d1 = (p.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (p.y - p2.y);
  const d2 = (p.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p.y - p3.y);
  const d3 = (p.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p.y - p1.y);
  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
  return !(hasNeg && hasPos);
}

export class GeometricResonanceManager {
  constructor(game) {
    this.game = game;
    this.maxLinkDistance = techTree.getMaxLinkDistance(); // 最大共鳴連線距離 (px)
    this.links = [];            // 啟動中的共鳴光弦
    this.triangles = [];        // 啟動中的共振三角結界
    this.pulseTime = 0;
    this.pulseIntervalTimer = 0;
    this.lastLinksCount = 0;
    this.lastTrianglesCount = 0;
    this.particles = [];
  }

  // 嚴格檢測三塔是否符合限定的質數聖環組合：僅限 [2, 3, 5] 或 [3, 5, 7]，其餘皆無法形成三角形
  evaluateTriad(t1, t2, t3) {
    const getFactors = (t) => {
      if (!t) return [];
      if (typeof t.factor === 'number' && t.factor > 0) return [t.factor];
      if (Array.isArray(t.factor)) return t.factor.filter(f => typeof f === 'number' && f > 0);
      return [];
    };

    const f1s = getFactors(t1);
    const f2s = getFactors(t2);
    const f3s = getFactors(t3);

    if (f1s.length === 0 || f2s.length === 0 || f3s.length === 0) {
      return null;
    }

    for (const f1 of f1s) {
      for (const f2 of f2s) {
        for (const f3 of f3s) {
          if (f1 === f2 || f2 === f3 || f1 === f3) continue;
          const sorted = [f1, f2, f3].sort((a, b) => a - b);
          const key = sorted.join(',');
          if (key === '2,3,5') {
            return {
              type: 'TRINITY_235',
              name: '🔮 質數三相聖環 (2-3-5)',
              label: 'Π30',
              color: '#c084fc'
            };
          } else if (key === '3,5,7') {
            return {
              type: 'TRIPLET_357',
              name: '✨ 七曜三聯聖環 (3-5-7)',
              label: 'Π105',
              color: '#fbbf24'
            };
          }
        }
      }
    }
    return null;
  }

  // 重新計算場上所有塔的幾何拓撲與共鳴關係
  recalculate() {
    this.maxLinkDistance = techTree.getMaxTriangleDistance ? techTree.getMaxTriangleDistance() : 220;
    const towers = this.game.towers || [];
    const prevTriLen = this.triangles.length;

    // 清空塔身上的矩陣標記
    for (const t of towers) {
      t.inGeometricMatrix = false;
      t.geometricSpeedBonus = 0;
      t.geometricRangeBonus = 0;
      t.geometricColor = null;
    }

    const n = towers.length;
    const newTriangles = [];

    // 1. 搜尋三塔共振三角結界：必須在指定距離範圍內 (<= maxLinkDistance) 且符合 [2, 3, 5] 或 [3, 5, 7] 質數聖環規則
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          const t1 = towers[i];
          const t2 = towers[j];
          const t3 = towers[k];

          // 形成三角形要件：三塔間距皆必須在指定範圍內，不能太遠！
          const d12 = Math.hypot(t1.x - t2.x, t1.y - t2.y);
          const d23 = Math.hypot(t2.x - t3.x, t2.y - t3.y);
          const d31 = Math.hypot(t3.x - t1.x, t3.y - t1.y);

          if (d12 > this.maxLinkDistance || d23 > this.maxLinkDistance || d31 > this.maxLinkDistance) {
            continue; // 距離太遠，無法形成三角形
          }

          // 質數聖環組合檢定：僅限 2, 3, 5 或 3, 5, 7，其餘皆不能形成三角形！
          const triad = this.evaluateTriad(t1, t2, t3);
          if (!triad) continue;

          const cx = (t1.x + t2.x + t3.x) / 3;
          const cy = (t1.y + t2.y + t3.y) / 3;

          newTriangles.push({
            id: `${t1.id}_${t2.id}_${t3.id}`,
            t1,
            t2,
            t3,
            centroid: { x: cx, y: cy },
            triadType: triad.type,
            isTrinity235: triad.type === 'TRINITY_235',
            isTriplet357: triad.type === 'TRIPLET_357',
            color: triad.color,
            specialName: triad.name,
            label: triad.label,
            pulseAngle: Math.random() * Math.PI * 2
          });

          // 結界內/頂點塔享有溫和攻速與射程加成 (+12% ~ +16%)
          const baseTriSpeed = techTree.getTriangleSpeedBonus();
          const triSpeed = triad.type === 'TRIPLET_357' ? Math.min(0.25, baseTriSpeed + 0.04) : baseTriSpeed;
          for (const vt of [t1, t2, t3]) {
            vt.inGeometricMatrix = true;
            vt.geometricSpeedBonus = Math.max(vt.geometricSpeedBonus, triSpeed);
            vt.geometricRangeBonus = Math.max(vt.geometricRangeBonus, 0.10);
            vt.geometricColor = triad.color;
          }
        }
      }
    }

    // 2. 沒有形成三角形的砲塔之間不需要連線！
    // 只有構成有效三角區域的邊 (Edges of active triangles)，才會有光弦連線！
    const newLinks = [];
    const linkMap = new Map();

    for (const tri of newTriangles) {
      const edges = [
        [tri.t1, tri.t2],
        [tri.t2, tri.t3],
        [tri.t3, tri.t1]
      ];

      for (const [ta, tb] of edges) {
        const edgeId = ta.id < tb.id ? `${ta.id}_${tb.id}` : `${tb.id}_${ta.id}`;
        if (!linkMap.has(edgeId)) {
          const dist = Math.hypot(ta.x - tb.x, ta.y - tb.y);
          const linkObj = {
            id: edgeId,
            t1: ta,
            t2: tb,
            dist,
            isHarmonic: false,
            color: tri.color,
            power: 1.5
          };
          linkMap.set(edgeId, linkObj);
          newLinks.push(linkObj);
        }
      }
    }

    this.links = newLinks;
    this.triangles = newTriangles;

    // 音效反饋：若形成了新的結界，播放共鳴生成音
    if (this.triangles.length > prevTriLen) {
      sound.playResonanceForm();
    }
  }

  update(dt) {
    this.pulseTime += dt;
    this.pulseIntervalTimer += dt;

    if (this.links.length === 0 && this.triangles.length === 0) return;

    // 結界為指揮官持續提供溫和算力回充 (每座結界 +0.25 Mana/s)
    if (this.game.spellManager && this.triangles.length > 0) {
      this.game.spellManager.addMana(this.triangles.length * 0.25 * dt);
    }

    // 1. 光弦雷射對穿過怪物的切割判定 (溫和輔助微量傷害)
    for (const link of this.links) {
      for (const m of this.game.monsters) {
        if (m.isDead) continue;
        const d = distToSegment(m, link.t1, link.t2);

        if (d <= m.radius + 6) {
          // 怪物觸碰雷射弦線 (減速 10%)
          m.applySlow(0.90, 0.3);
          m.hitFlashTimer = 0.12;

          if (link.isHarmonic && link.factor) {
            // 同質數諧波切割 (每秒 15 傷害)
            m.stageHp = Math.max(1, m.stageHp - 15 * dt * link.power);
          } else {
            // 基礎光弦切割 (每秒 8 傷害)
            m.stageHp = Math.max(1, m.stageHp - 8 * dt);
          }

          // 產生微粒子火花
          if (Math.random() < 0.2) {
            this.game.createSparks(m.x, m.y, link.color, 2);
          }
        }
      }
    }

    // 2. 三角結界領域效果 (微量重力壓制與輔助傷害)
    for (const tri of this.triangles) {
      tri.pulseAngle = (tri.pulseAngle || 0) + dt * 2.5;

      for (const m of this.game.monsters) {
        if (m.isDead) continue;
        const inside = pointInTriangle(m, tri.t1, tri.t2, tri.t3);

        if (inside) {
          // 結界重力壓制：減速 15% (享受科技樹三角聖域強化)
          const slowRatio = techTree.getTriangleSlowRatio();
          m.applySlow(slowRatio, 0.4);
          m.stageHp = Math.max(1, m.stageHp - (tri.isTriplet357 ? 10 : 6) * dt);

          // 質數三相聖環額外掉落標記
          if (tri.isTrinity235) {
            m.primeTrinityBuff = true;
          }
        }
      }
    }

    // 3. 七曜三聯聖環 (3-5-7) 定期聖光脈衝
    const pulseInterval = techTree.getPythagoreanInterval();
    if (this.pulseIntervalTimer >= pulseInterval) {
      this.pulseIntervalTimer = 0;
      for (const tri of this.triangles) {
        if (tri.isTriplet357) {
          sound.playResonancePulse();
          this.game.createExplosion(tri.centroid.x, tri.centroid.y, '#fbbf24', 18);

          const pulseDmg = techTree.getPythagoreanPulseDamage();
          for (const m of this.game.monsters) {
            if (m.isDead) continue;
            if (pointInTriangle(m, tri.t1, tri.t2, tri.t3)) {
              m.stageHp = Math.max(1, m.stageHp - pulseDmg);
              m.addFloatingText(`⚡ 三聯聖光 -${pulseDmg}!`, '#fbbf24');
              this.game.createSparks(m.x, m.y, '#f59e0b', 8);
            }
          }
        }
      }
    }
  }

  draw(ctx) {
    if (this.links.length === 0 && this.triangles.length === 0) return;

    ctx.save();

    // 1. 繪製三角結界領域半透明光面 (底層)
    for (const tri of this.triangles) {
      const alphaPulse = 0.12 + Math.sin(this.pulseTime * 2.5 + tri.centroid.x * 0.01) * 0.05;
      ctx.beginPath();
      ctx.moveTo(tri.t1.x, tri.t1.y);
      ctx.lineTo(tri.t2.x, tri.t2.y);
      ctx.lineTo(tri.t3.x, tri.t3.y);
      ctx.closePath();

      // 漸層光暈
      const grad = ctx.createRadialGradient(
        tri.centroid.x, tri.centroid.y, 10,
        tri.centroid.x, tri.centroid.y, 120
      );
      grad.addColorStop(0, tri.color + '44');
      grad.addColorStop(1, tri.color + '11');

      ctx.fillStyle = grad;
      ctx.fill();

      // 繪製結界幾何邊框
      ctx.strokeStyle = tri.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5 + Math.sin(this.pulseTime * 3) * 0.2;
      ctx.stroke();

      // 結界重心符文與外接/內切幾何環
      ctx.save();
      ctx.translate(tri.centroid.x, tri.centroid.y);
      ctx.rotate(this.pulseTime * 0.6);

      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.strokeStyle = tri.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 繪製微型旋轉三角符文
      ctx.beginPath();
      for (let a = 0; a < 3; a++) {
        const ang = (a * Math.PI * 2) / 3;
        const px = Math.cos(ang) * 12;
        const py = Math.sin(ang) * 12;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = tri.color;
      ctx.stroke();

      // 符文核心數學標誌
      ctx.rotate(-this.pulseTime * 0.6); // 保持文字正向
      ctx.font = 'bold 11px Outfit, sans-serif';
      ctx.fillStyle = tri.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = tri.label || (tri.isTriplet357 ? 'Π105' : (tri.isTrinity235 ? 'Π30' : 'Δ'));
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }

    // 2. 繪製共鳴光弦 (雷射光束)
    for (const link of this.links) {
      const { t1, t2, color, isHarmonic } = link;

      // 外層柔光
      ctx.beginPath();
      ctx.moveTo(t1.x, t1.y);
      ctx.lineTo(t2.x, t2.y);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.25 + Math.sin(this.pulseTime * 4 + link.dist * 0.05) * 0.12;
      ctx.lineWidth = isHarmonic ? 6 : 4;
      ctx.stroke();

      // 核心高亮光線
      ctx.beginPath();
      ctx.moveTo(t1.x, t1.y);
      ctx.lineTo(t2.x, t2.y);
      ctx.strokeStyle = isHarmonic ? '#ffffff' : color;
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = isHarmonic ? 2.2 : 1.5;
      ctx.stroke();

      // 沿光弦流動的能量節點粒子
      const progress = ((this.pulseTime * 120) % link.dist) / link.dist;
      const nx = t1.x + (t2.x - t1.x) * progress;
      const ny = t1.y + (t2.y - t1.y) * progress;

      ctx.beginPath();
      ctx.arc(nx, ny, isHarmonic ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. 繪製頂點塔底部的共鳴幾何光環
    for (const t of this.game.towers || []) {
      if (t.inGeometricMatrix) {
        const ringColor = t.geometricColor || '#38bdf8';
        ctx.beginPath();
        ctx.arc(t.x, t.y, 24 + Math.sin(this.pulseTime * 3) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    ctx.restore();
  }

  // 取得 HUD 狀態數據
  getStats() {
    const specialNames = this.triangles.map(t => t.specialName);
    return {
      linksCount: this.links.length,
      trianglesCount: this.triangles.length,
      specialNames,
      hasMatrix: (this.links.length > 0 || this.triangles.length > 0),
      speedBonus: this.triangles.length > 0 ? (this.triangles.some(t => t.isTriplet357) ? '+16%' : '+12%') : (this.links.length > 0 ? '+6%' : '+0%'),
      manaGenBonus: +(this.triangles.length * 0.25).toFixed(1)
    };
  }
}
