// Geometric Resonance Matrix (幾何共鳴矩陣)
// Manages tower geometric connectivity, laser chords, resonance triangles, and sanctuary fields

import { sound } from './Audio.js';

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
    this.maxLinkDistance = 300; // 最大共鳴連線距離 (px)
    this.links = [];            // 啟動中的共鳴光弦
    this.triangles = [];        // 啟動中的共振三角結界
    this.pulseTime = 0;
    this.pulseIntervalTimer = 0;
    this.lastLinksCount = 0;
    this.lastTrianglesCount = 0;
    this.particles = [];
  }

  // 重新計算場上所有塔的幾何拓撲與共鳴關係
  recalculate() {
    const towers = this.game.towers || [];
    const prevLinkLen = this.links.length;
    const prevTriLen = this.triangles.length;

    // 清空塔身上的矩陣標記
    for (const t of towers) {
      t.inGeometricMatrix = false;
      t.geometricSpeedBonus = 0;
      t.geometricRangeBonus = 0;
      t.geometricColor = null;
    }

    const newLinks = [];
    const n = towers.length;

    // 1. 搜尋二塔共鳴光弦
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const t1 = towers[i];
        const t2 = towers[j];
        const dist = Math.hypot(t1.x - t2.x, t1.y - t2.y);

        if (dist <= this.maxLinkDistance) {
          // 判定是否為同質數/同類型諧波
          const isHarmonic = (t1.type === t2.type && t1.factor === t2.factor);
          let linkColor = '#38bdf8'; // 預設電光藍
          if (isHarmonic) {
            linkColor = t1.color || '#38bdf8';
          } else if (t1.factor && t2.factor) {
            linkColor = '#818cf8'; // 雙質數和弦紫藍
          }

          newLinks.push({
            id: `${t1.id}_${t2.id}`,
            t1,
            t2,
            dist,
            isHarmonic,
            factor: isHarmonic ? t1.factor : null,
            color: linkColor,
            power: isHarmonic ? 1.6 : 1.0
          });

          // 賦予塔身基礎共鳴加成
          t1.inGeometricMatrix = true;
          t2.inGeometricMatrix = true;
          t1.geometricSpeedBonus = Math.max(t1.geometricSpeedBonus, 0.10);
          t2.geometricSpeedBonus = Math.max(t2.geometricSpeedBonus, 0.10);
        }
      }
    }

    // 2. 搜尋三塔共振三角結界 (Delta Sanctuary)
    const newTriangles = [];
    const linkSet = new Set(newLinks.map(l => l.id));
    const hasLink = (a, b) => linkSet.has(`${a.id}_${b.id}`) || linkSet.has(`${b.id}_${a.id}`);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          const t1 = towers[i];
          const t2 = towers[j];
          const t3 = towers[k];

          if (hasLink(t1, t2) && hasLink(t2, t3) && hasLink(t3, t1)) {
            // 三塔兩兩相連，構成共鳴三角形！
            const cx = (t1.x + t2.x + t3.x) / 3;
            const cy = (t1.y + t2.y + t3.y) / 3;

            // 檢查是否符合特殊幾何/數論神級組合
            const factors = [t1.factor, t2.factor, t3.factor].filter(Boolean);
            const types = [t1.type, t2.type, t3.type];

            // A. 質數三相聖環 (Prime Trinity: 2, 3, 5)
            const isPrimeTrinity = factors.includes(2) && factors.includes(3) && factors.includes(5);

            // B. 畢氏三元光陣 (Pythagorean Holy Trinity: 3, 4, 5 或 方根/運算子組合)
            const has3 = factors.includes(3);
            const has5 = factors.includes(5);
            const has4 = types.includes('sqrt') || types.includes('operator') || factors.includes(4);
            const isPythagorean = (has3 && has4 && has5);

            let triColor = '#06b6d4'; // 預設幾何青藍
            let specialName = '幾何共鳴三角陣';

            if (isPythagorean) {
              triColor = '#fbbf24'; // 耀金畢氏聖光
              specialName = '✨ 畢氏三相聖光陣 (3-4-5)';
            } else if (isPrimeTrinity) {
              triColor = '#c084fc'; // 紫金質數階乘光環
              specialName = '🔮 質數三相聖環 (2-3-5)';
            }

            newTriangles.push({
              id: `${t1.id}_${t2.id}_${t3.id}`,
              t1,
              t2,
              t3,
              centroid: { x: cx, y: cy },
              isPythagorean,
              isPrimeTrinity,
              color: triColor,
              specialName,
              pulseAngle: Math.random() * Math.PI * 2
            });

            // 結界內/頂點塔享有高階攻速與射程加成
            for (const vt of [t1, t2, t3]) {
              vt.inGeometricMatrix = true;
              vt.geometricSpeedBonus = Math.max(vt.geometricSpeedBonus, isPythagorean ? 0.35 : 0.25);
              vt.geometricRangeBonus = Math.max(vt.geometricRangeBonus, 0.20);
              vt.geometricColor = triColor;
            }
          }
        }
      }
    }

    this.links = newLinks;
    this.triangles = newTriangles;

    // 音效反饋：若形成了新的連線或結界，播放共鳴生成音
    if (this.links.length > prevLinkLen || this.triangles.length > prevTriLen) {
      sound.playResonanceForm();
    }
  }

  update(dt) {
    this.pulseTime += dt;
    this.pulseIntervalTimer += dt;

    if (this.links.length === 0 && this.triangles.length === 0) return;

    // 結界為指揮官持續提供算力回充 (每座結界 +0.6 Mana/s)
    if (this.game.spellManager && this.triangles.length > 0) {
      this.game.spellManager.addMana(this.triangles.length * 0.6 * dt);
    }

    // 1. 光弦雷射對穿過怪物的切割判定
    for (const link of this.links) {
      for (const m of this.game.monsters) {
        if (m.isDead) continue;
        const d = distToSegment(m, link.t1, link.t2);

        if (d <= m.radius + 6) {
          // 怪物觸碰雷射弦線！
          m.applySlow(0.80, 0.3); // 減速 20%
          m.hitFlashTimer = 0.15;

          if (link.isHarmonic && link.factor) {
            // 同質數諧波切割：扣減階層耐受度 (每秒 40 傷害)
            m.stageHp = Math.max(0, m.stageHp - 40 * dt * link.power);
            if (m.stageHp <= 0 && m.value % link.factor === 0) {
              // 觸發因數整除！
              m.takePrimeHit(link.factor, 50, this.game);
            } else if (m.stageHp <= 0) {
              m.stageHp = 1;
            }
          } else {
            // 基礎光弦切割
            m.stageHp = Math.max(1, m.stageHp - 20 * dt);
          }

          // 產生微粒子火花
          if (Math.random() < 0.25) {
            this.game.createSparks(m.x, m.y, link.color, 2);
          }
        }
      }
    }

    // 2. 三角結界領域效果
    for (const tri of this.triangles) {
      tri.pulseAngle = (tri.pulseAngle || 0) + dt * 2.5;

      for (const m of this.game.monsters) {
        if (m.isDead) continue;
        const inside = pointInTriangle(m, tri.t1, tri.t2, tri.t3);

        if (inside) {
          // 結界重力壓制：減速 25%
          m.applySlow(0.75, 0.4);
          m.stageHp = Math.max(1, m.stageHp - (tri.isPythagorean ? 28 : 16) * dt);

          // 質數三相聖環額外掉落標記
          if (tri.isPrimeTrinity) {
            m.primeTrinityBuff = true;
          }
        }
      }
    }

    // 3. 畢氏聖光定期脈衝 (每 1.6 秒發動一次)
    if (this.pulseIntervalTimer >= 1.6) {
      this.pulseIntervalTimer = 0;
      for (const tri of this.triangles) {
        if (tri.isPythagorean) {
          sound.playResonancePulse();
          this.game.createExplosion(tri.centroid.x, tri.centroid.y, '#fbbf24', 25);

          for (const m of this.game.monsters) {
            if (m.isDead) continue;
            if (pointInTriangle(m, tri.t1, tri.t2, tri.t3)) {
              m.stageHp = Math.max(0, m.stageHp - 65);
              m.addFloatingText('⚡ 畢氏聖光 -65!', '#fbbf24');
              this.game.createSparks(m.x, m.y, '#f59e0b', 12);
              if (m.stageHp <= 0 && m.value > 1) {
                const handled = m.takePrimeHit(3, 40, this.game) || m.takeSqrtHit(60, this.game);
                if (!handled) m.stageHp = 1;
              }
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
      const label = tri.isPythagorean ? 'Δ345' : (tri.isPrimeTrinity ? 'Π30' : 'Δ');
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
      speedBonus: this.triangles.length > 0 ? '+25%' : (this.links.length > 0 ? '+10%' : '+0%'),
      manaGenBonus: +(this.triangles.length * 0.6).toFixed(1)
    };
  }
}
