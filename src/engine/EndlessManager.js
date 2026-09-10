// Endless Mode & Boss Rush Generator for Math Tower Defense
import { LEVELS } from '../levels/LevelData.js';

export class EndlessManager {
  constructor() {
    // 預設無盡地圖使用雙流道或交叉地圖
    this.defaultMapKey = '1-4'; // 雙流道交會地圖
  }

  // 取得無盡模式地圖配置
  getEndlessLevelConfig(waveNumber = 1) {
    const baseLevel = LEVELS['1-4'] || LEVELS['1-1'];
    return {
      id: 'endless',
      name: '♾️ 無盡算力試煉 (Endless Mode)',
      difficulty: '難度隨波次無上限提升',
      gold: 360,
      description: '面對無窮無盡的數論洪流！每通關 5 波獲得 +5 顆科研星級！',
      lanes: baseLevel.lanes,
      buildPads: baseLevel.buildPads,
      unlockedTowers: ['EVEN', 'ODD', 'PRIME_2', 'PRIME_3', 'PRIME_5', 'PRIME_7', 'ABSOLUTE', 'OPERATOR', 'SQRT', 'ZERO_FREEZE', 'LOG', 'TRIG', 'FUSION_6', 'FUSION_15', 'FUSION_ABS_SQRT', 'FUSION_DERIVATIVE', 'FUSION_MONTE_CARLO', 'FUSION_FACTORIAL'],
      waves: [this.generateEndlessWave(waveNumber)]
    };
  }

  // 動態生成指定波次的數論怪物陣容 (隨波次全面提升數量、耐受血量與移速)
  generateEndlessWave(waveNumber) {
    const isBossWave = waveNumber % 5 === 0;

    // 1. 怪物數量隨波次持續增長 (打破原先 28 隻低上限，漸進成長至百隻大潮)
    const enemyCount = Math.min(95, 7 + Math.floor(waveNumber * 1.5) + Math.floor(Math.pow(waveNumber, 1.12) * 0.35));

    // 2. 怪物耐受血量倍率隨波次指數階梯式成長 (Wave 1: 1.0x, Wave 5: 1.33x, Wave 10: 1.83x, Wave 20: 3.37x, Wave 30: 5.75x...)
    const hpMultiplier = +(1.0 + (waveNumber - 1) * 0.07 + Math.pow(Math.max(0, waveNumber - 3), 1.28) * 0.025).toFixed(2);

    // 3. 怪物基礎移動速度隨波次逐步攀升 (突破原 105 封頂，上限調至 180 高速衝鋒)
    const baseSpeed = Math.min(180, Math.round(58 + waveNumber * 2.2 + Math.pow(Math.max(0, waveNumber - 4), 1.15) * 0.55));

    // 4. 出怪間隔隨波次適度緊縮，讓大潮形成密集行軍衝鋒
    const delayScale = Math.max(0.40, Math.pow(0.982, Math.min(60, waveNumber - 1)));

    const enemies = [];

    // 孿生質數池 (隨波次加入更大質數對)
    const twinPairs = [
      [11, 13], [17, 19], [29, 31], [41, 43], [59, 61], [71, 73],
      [101, 103], [107, 109], [137, 139], [149, 151], [179, 181], [191, 193]
    ];

    // 完全平方數池 (隨波次納入高階平方)
    const squares = [
      16, 25, 36, 49, 64, 81, 100, 144, 196, 225, 256, 289, 324, 361, 400,
      441, 484, 529, 576, 625, 676, 729, 784, 841, 900
    ];

    // 費波那契衝鋒怪池
    const fibs = [8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

    // 1. 若為魔王波次：加入強大魔王怪 (血量與移速隨 Wave 額外強化)
    if (isBossWave) {
      const bossTier = Math.floor(waveNumber / 5);
      let bossVal = 60 * bossTier;
      let bossName = `數論霸主 Wave ${waveNumber}`;
      const bossSkills = ['split_adds'];

      if (bossTier >= 2) {
        bossSkills.push('polarity_flip');
        bossName = `負極奇點皇 Wave ${waveNumber}`;
        if (Math.random() < 0.5) bossVal = -bossVal;
      }
      if (bossTier >= 3) {
        bossName = `歐拉萬象神君 Wave ${waveNumber}`;
        bossSkills.push('multiply_aura');
      }

      const bossHpMultiplier = +(hpMultiplier * (1 + bossTier * 0.25)).toFixed(2);
      const bossSpeed = Math.max(42, Math.round(baseSpeed * 0.65));

      enemies.push({
        val: bossVal,
        delay: +(2.0 * delayScale).toFixed(2),
        speed: bossSpeed,
        isBoss: true,
        bossName: bossName,
        bossSkills: bossSkills,
        hpMultiplier: bossHpMultiplier
      });
    }

    // 2. 隨機生成其餘精英與常規怪
    for (let i = 0; i < enemyCount; i++) {
      const roll = Math.random();

      // 完全數 (6, 28, 496, 8128)
      if (waveNumber >= 4 && roll < 0.08) {
        const perfVal = waveNumber >= 20 && Math.random() < 0.25 ? 8128 : (waveNumber >= 12 && Math.random() < 0.4 ? 496 : (waveNumber >= 6 ? 28 : 6));
        enemies.push({
          val: perfVal,
          delay: +(0.9 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.85),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 循環小數幽靈 (0.3̇, 0.6̇, 0.142857, 0.9̇)
      if (waveNumber >= 3 && roll < 0.16) {
        const phantomPool = ['0.3', '0.6', '0.142857', '0.9'];
        const rType = phantomPool[Math.floor(Math.random() * (waveNumber >= 6 ? phantomPool.length : 2))];
        enemies.push({
          val: rType,
          isRecurring: true,
          recurringType: rType,
          delay: +(0.85 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 莫比烏斯拓撲幽靈 (帶平方因數，激發拓撲逆流)
      if (waveNumber >= 3 && roll < 0.25) {
        const mobiusPool = [18, 20, 45, 50, 72, 75, 98, 108, 150];
        const mVal = mobiusPool[Math.floor(Math.random() * mobiusPool.length)];
        enemies.push({
          val: mVal,
          isMobius: true,
          delay: +(0.85 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.90),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 質數冪·俄羅斯套娃怪 (p^k 純質數冪，層層剝殼加速)
      if (waveNumber >= 2 && roll < 0.34) {
        const matryoshkaPool = [16, 27, 32, 64, 81, 125, 243, 256];
        const matVal = matryoshkaPool[Math.floor(Math.random() * matryoshkaPool.length)];
        enemies.push({
          val: matVal,
          isMatryoshka: true,
          delay: +(0.80 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.85),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 虛數單位 i 四象限循環幽靈 (+i -> -1 -> -i -> +1)
      if (waveNumber >= 4 && roll < 0.43) {
        const gVal = 18 + Math.floor(Math.random() * (waveNumber * 6));
        enemies.push({
          val: gVal,
          isGaussianCycler: true,
          delay: +(0.85 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 孿生質數雙子 (成對生成)
      if (waveNumber >= 3 && roll < 0.53 && i < enemyCount - 1) {
        const pairIdx = Math.min(twinPairs.length - 1, Math.floor(Math.random() * (1 + Math.floor(waveNumber / 3))));
        const pair = twinPairs[pairIdx];
        enemies.push({
          val: pair[0],
          delay: +(0.55 * delayScale).toFixed(2),
          speed: baseSpeed,
          hpMultiplier: hpMultiplier
        });
        enemies.push({
          val: pair[1],
          delay: +(0.20 * delayScale).toFixed(2),
          speed: baseSpeed,
          hpMultiplier: hpMultiplier
        });
        i++; // 消耗兩個怪位
        continue;
      }

      // 行列式方陣共鳴組 (2x2 矩陣 4 隻聯動，det=ad-bc=0 奇異坍縮)
      if (waveNumber >= 4 && roll < 0.63 && i <= enemyCount - 4) {
        const quadId = `quad_${waveNumber}_${i}`;
        const matrixSets = [
          [6, 4, 9, 6],
          [8, 6, 12, 9],
          [12, 8, 15, 10],
          [15, 10, 18, 12],
          [20, 15, 24, 18]
        ];
        const mSet = matrixSets[Math.floor(Math.random() * matrixSets.length)];
        for (let idx = 0; idx < 4; idx++) {
          enemies.push({
            val: mSet[idx],
            determinantQuadId: quadId,
            detIndex: idx,
            delay: +(0.35 * delayScale).toFixed(2),
            speed: baseSpeed,
            hpMultiplier: hpMultiplier
          });
        }
        i += 3; // 消耗 4 個怪位
        continue;
      }

      // 費波那契極速衝鋒隊
      if (waveNumber >= 2 && roll < 0.72) {
        const fibVal = fibs[Math.min(fibs.length - 1, Math.floor(Math.random() * (2 + Math.floor(waveNumber / 3))))];
        enemies.push({
          val: fibVal,
          delay: +(0.65 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 1.35),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 負數護盾怪
      if (waveNumber >= 3 && roll < 0.81) {
        const negVal = -(Math.floor(Math.random() * (waveNumber * 12)) + 12);
        enemies.push({
          val: negVal,
          delay: +(0.75 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 完全平方數
      if (waveNumber >= 2 && roll < 0.90) {
        const sqVal = squares[Math.min(squares.length - 1, Math.floor(Math.random() * (3 + Math.floor(waveNumber / 3))))];
        enemies.push({
          val: sqVal,
          delay: +(0.75 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.90),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // 基礎高因數合數 (隨波次加深因數層次)
      const baseFactors = [2, 3, 5, 7];
      let composite = baseFactors[Math.floor(Math.random() * 3)];
      const depth = Math.min(6, 1 + Math.floor(waveNumber / 4));
      for (let k = 0; k < depth; k++) {
        composite *= baseFactors[Math.floor(Math.random() * baseFactors.length)];
      }

      enemies.push({
        val: composite,
        delay: +(0.70 * delayScale).toFixed(2),
        speed: baseSpeed,
        hpMultiplier: hpMultiplier
      });
    }

    return {
      waveNumber: waveNumber,
      title: isBossWave
        ? `👑 第 ${waveNumber} 波：魔王算力霸主降臨！(耐受:×${enemies[0].hpMultiplier} · 移速:${enemies[0].speed})`
        : `第 ${waveNumber} 波：數論複合潮汐 (怪數:${enemyCount} · 耐受:×${hpMultiplier} · 移速:${baseSpeed})`,
      tip: isBossWave
        ? `魔王擁有分裂與反轉技能！耐受血量提升至 ${enemies[0].hpMultiplier} 倍！`
        : `無盡算力試煉！隨波次推進，怪物數量、耐受血量與移速全面飆升！`,
      enemies: enemies
    };
  }

  // 取得魔王連戰 (Boss Rush) 關卡列表 (5 階段連續挑戰)
  getBossRushStages() {
    return [
      {
        id: 'boss_rush_1',
        stageIndex: 1,
        name: '👑 魔王連戰 I：質因數長老之試',
        gold: 300,
        mapId: '1-2',
        boss: { val: 60, name: '質因數長老 (Lv.1)', skills: ['split_adds'] },
        adds: [12, 18, 24, 30, 36, 48]
      },
      {
        id: 'boss_rush_2',
        stageIndex: 2,
        name: '👑 魔王連戰 II：負極奇點王',
        gold: 350,
        mapId: '1-3',
        boss: { val: -120, name: '負極奇點王 (Lv.2)', skills: ['polarity_flip', 'split_adds'] },
        adds: [-24, -36, 40, 54, -60]
      },
      {
        id: 'boss_rush_3',
        stageIndex: 3,
        name: '👑 魔王連戰 III：完全數泰坦雙神',
        gold: 420,
        mapId: '3-4',
        boss: { val: 496, name: '完全數大泰坦 (Lv.3)', skills: ['split_adds'] },
        adds: [28, 28, 56, 84, 112, 140]
      },
      {
        id: 'boss_rush_4',
        stageIndex: 4,
        name: '👑 魔王連戰 IV：高斯方根狂暴巨獸',
        gold: 500,
        mapId: '4-4',
        boss: { val: 225, name: '高斯方根暴君 (Lv.4)', skills: ['split_adds', 'polarity_flip'] },
        adds: [64, 81, 100, 121, 144, 196]
      },
      {
        id: 'boss_rush_5',
        stageIndex: 5,
        name: '👑 魔王連戰 V：歐拉終焉萬數真神',
        gold: 650,
        mapId: '5-4',
        boss: { val: 999, name: '歐拉萬象終焉神 (MAX)', skills: ['split_adds', 'polarity_flip'] },
        adds: [210, 315, 420, -504, 630, 720]
      }
    ];
  }

  // 取得指定魔王連戰關卡資料
  getBossRushLevelConfig(stageIndex = 1) {
    const stages = this.getBossRushStages();
    const stage = stages.find(s => s.stageIndex === stageIndex) || stages[0];
    const baseLevel = LEVELS[stage.mapId] || LEVELS['1-4'];

    const waveEnemies = [];
    // 前鋒隨從怪
    stage.adds.forEach((val, idx) => {
      waveEnemies.push({
        val: val,
        delay: 0.8,
        speed: 68
      });
    });

    // 壓軸魔王
    waveEnemies.push({
      val: stage.boss.val,
      delay: 2.2,
      speed: 45,
      isBoss: true,
      bossName: stage.boss.name,
      bossSkills: stage.boss.skills
    });

    return {
      id: stage.id,
      name: stage.name,
      difficulty: `魔王連戰 Stage ${stageIndex}/5`,
      gold: stage.gold,
      description: `魔王連戰挑戰！擊敗「${stage.boss.name}」與其因數親衛隊！`,
      lanes: baseLevel.lanes,
      buildPads: baseLevel.buildPads,
      unlockedTowers: ['EVEN', 'ODD', 'PRIME_2', 'PRIME_3', 'PRIME_5', 'PRIME_7', 'ABSOLUTE', 'OPERATOR', 'SQRT', 'ZERO_FREEZE', 'LOG', 'TRIG', 'FUSION_6', 'FUSION_15', 'FUSION_ABS_SQRT', 'FUSION_DERIVATIVE', 'FUSION_MONTE_CARLO', 'FUSION_FACTORIAL'],
      waves: [
        {
          waveNumber: 1,
          title: stage.name,
          tip: '魔王防禦堅不可摧，請善用複合神塔破甲與主動法術！',
          enemies: waveEnemies
        }
      ]
    };
  }
}

export const endlessManager = new EndlessManager();
