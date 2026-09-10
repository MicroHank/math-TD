// Endless Mode & Boss Rush Generator for Math Tower Defense
import { LEVELS } from '../levels/LevelData.js';

export class EndlessManager {
  constructor() {
    this.defaultMapKey = 'endless_delta';
  }

  // 取得無盡模式可選戰略地圖列表 (8 大特色幾何戰場)
  getEndlessMaps() {
    return [
      {
        id: 'endless_delta',
        name: '平原雙流交匯谷',
        subtitle: '四道大河匯流平原要塞',
        mapBase: '1-4',
        difficulty: '入門無盡',
        difficultyStars: '⭐',
        desc: '四條大河自西向東緩緩推進，48 處沿線緊密基座，適合建立穩健的三角交叉火力。',
        gold: 1200,
        icon: '🌊',
        tag: '4 航道 · 48 基座'
      },
      {
        id: 'endless_cross',
        name: '負極十字裂隙',
        subtitle: '「X」型立交十字路口',
        mapBase: '2-2',
        difficulty: '進階無盡',
        difficultyStars: '⭐⭐',
        desc: '地圖中央為真正的 X 型立交十字路口，45 處沿線基座，正負數怪於中心交匯衝撞。',
        gold: 1300,
        icon: '⚔️',
        tag: '十字路口 · 45 基座'
      },
      {
        id: 'endless_helix',
        name: '雙螺旋暗河深淵',
        subtitle: '立體交錯雙螺旋暗流',
        mapBase: '2-1',
        difficulty: '險峻無盡',
        difficultyStars: '⭐⭐⭐',
        desc: '兩道負數暗流呈立體雙螺旋多次交織，42 處基座嚴密夾道，考驗絕對值與運算子靈活配置。',
        gold: 1350,
        icon: '🌀',
        tag: '雙螺旋 · 42 基座'
      },
      {
        id: 'endless_switchback',
        name: '斷崖「之」字天梯',
        subtitle: '高山之巔山頂神殿',
        mapBase: '3-4',
        difficulty: '高危無盡',
        difficultyStars: '⭐⭐⭐⭐',
        desc: '四路沿斷崖連續之字形折返攀升至右上山頂核心，54 處依山基座，重力井與幾何共鳴大考驗！',
        gold: 1500,
        icon: '🏔️',
        tag: '盤山天梯 · 54 基座'
      },
      {
        id: 'endless_sanctuary',
        name: '質數之城四方圍城',
        subtitle: '四角大街直衝正中央神殿',
        mapBase: '4-4',
        difficulty: '守護無盡',
        difficultyStars: '⭐⭐⭐⭐',
        desc: '防守核心座落於地圖正中心！四角大道怪物向心突圍，57 處基座緊隨大街夾道，考驗全方位防禦！',
        gold: 1600,
        icon: '🏛️',
        tag: '中心神殿 · 57 基座'
      },
      {
        id: 'endless_galaxy',
        name: '雙重螺旋銀河漩渦',
        subtitle: '阿基米德平滑雙旋臂',
        mapBase: '5-1',
        difficulty: '宇宙無盡',
        difficultyStars: '⭐⭐⭐⭐⭐',
        desc: '兩條壯麗長旋臂呈 180 度對稱向中心黑洞奇異點旋轉盤入，54 處基座沿雙臂夾道包覆，旋臂交疊共振！',
        gold: 1800,
        icon: '🌌',
        tag: '雙螺旋星系 · 54 基座'
      },
      {
        id: 'endless_trefoil',
        name: '塞爾特三葉神環',
        subtitle: '拓撲學三葉紐結無限迴圈',
        mapBase: '5-2',
        difficulty: '奇異無盡',
        difficultyStars: '⭐⭐⭐⭐⭐',
        desc: '頂葉、左下葉、右下葉三大能量環瓣於中心交織，怪物三次穿過中心十字交叉，54 處沿環基座！',
        gold: 1800,
        icon: '☘️',
        tag: '三葉紐結 · 54 基座'
      },
      {
        id: 'endless_hourglass',
        name: '時空沙漏星門對撞機',
        subtitle: '中央極限狹縫對撞與事件視界',
        mapBase: '5-4',
        difficulty: '終極神話',
        difficultyStars: '👑',
        desc: '雙漏斗沙漏結構！怪物自左右漏斗匯入中央極窄狹縫對撞，再旋入事件視界星環，63 處基座重砲絞殺！',
        gold: 2000,
        icon: '⏳',
        tag: '對撞絞肉機 · 63 基座'
      }
    ];
  }

  // 取得無盡模式地圖配置 (支援玩家自選戰略地圖)
  getEndlessLevelConfig(waveNumber = 1, mapId = 'endless_delta') {
    const maps = this.getEndlessMaps();
    const cleanId = (typeof mapId === 'string' && mapId.startsWith('endless_')) ? mapId : `endless_${mapId}`;
    const selected = maps.find(m => m.id === cleanId || m.mapBase === mapId || m.id === mapId) || maps[0];
    const baseLevel = LEVELS[selected.mapBase] || LEVELS['1-4'];

    return {
      id: selected.id,
      endlessMapId: selected.id,
      name: `♾️ 無盡試煉 · ${selected.name}`,
      difficulty: selected.difficulty,
      gold: selected.gold,
      description: selected.desc,
      worldWidth: baseLevel.worldWidth || 1920,
      worldHeight: baseLevel.worldHeight || 1080,
      lanes: baseLevel.lanes,
      buildPads: baseLevel.buildPads,
      unlockedTowers: ['PRIME_2', 'PRIME_3', 'PRIME_5', 'PRIME_7', 'ABSOLUTE', 'OPERATOR', 'SQRT', 'ZERO_FREEZE', 'TRIG', 'FUSION_6', 'FUSION_15', 'FUSION_ABS_SQRT', 'FUSION_DERIVATIVE', 'FUSION_MONTE_CARLO', 'FUSION_FACTORIAL'],
      waves: [this.generateEndlessWave(waveNumber)]
    };
  }

  // 動態生成指定波次的數論怪物陣容 (隨波次全面提升數量、耐受血量、移速與詞綴豐富度)
  generateEndlessWave(waveNumber) {
    const isBossWave = waveNumber % 5 === 0;

    // 1. 怪物數量隨波次持續增長 (打破原先低上限，漸進成長至百隻大潮)
    const enemyCount = Math.min(95, 7 + Math.floor(waveNumber * 1.5) + Math.floor(Math.pow(waveNumber, 1.12) * 0.35));

    // 2. 怪物耐受血量倍率隨波次指數階梯式成長
    const hpMultiplier = +(1.0 + (waveNumber - 1) * 0.07 + Math.pow(Math.max(0, waveNumber - 3), 1.28) * 0.025).toFixed(2);

    // 3. 怪物基礎移動速度隨波次逐步攀升 (上限調至 180 高速衝鋒)
    const baseSpeed = Math.min(180, Math.round(58 + waveNumber * 2.2 + Math.pow(Math.max(0, waveNumber - 4), 1.15) * 0.55));

    // 4. 出怪間隔隨波次適度緊縮
    const delayScale = Math.max(0.38, Math.pow(0.982, Math.min(60, waveNumber - 1)));

    const enemies = [];

    // 精英詞綴池（循序漸進解鎖：Wave 1-5 無詞綴，Wave 6+ 速度，Wave 10+ 狂暴，Wave 15+ 同餘與熵增）
    const getAffixes = (customProb) => {
      if (waveNumber < 6) return []; // 第 1-5 波（第一大關範疇）完全無精英詞綴
      
      const availableAffixes = ['delta_speed'];
      if (waveNumber >= 10) availableAffixes.push('berserk');
      if (waveNumber >= 15) availableAffixes.push('congruence', 'entropy');

      const prob = customProb !== undefined ? customProb : Math.min(0.48, 0.10 + (waveNumber - 6) * 0.025);
      if (Math.random() > prob) return [];

      const count = (waveNumber >= 16 && Math.random() < 0.35) ? 2 : 1;
      const shuffled = [...availableAffixes].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    // 孿生質數池
    const twinPairs = [
      [11, 13], [17, 19], [29, 31], [41, 43], [59, 61], [71, 73],
      [101, 103], [107, 109], [137, 139], [149, 151], [179, 181], [191, 193]
    ];

    // 完全平方數池
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
        bossName = `考拉茲混沌君主 Wave ${waveNumber}`;
        bossSkills.push('collatz_surge');
      }
      if (bossTier >= 4) {
        bossName = `黎曼澤塔風暴神 Wave ${waveNumber}`;
        bossSkills.push('zeta_storm');
      }
      if (bossTier >= 5) {
        bossName = `歐拉萬象終焉神 Wave ${waveNumber}`;
        bossSkills.push('dimension_rift', 'multiply_aura');
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

    // 2. 隨機生成精英與常規怪物陣容 (嚴格按波次階梯循序漸進)
    for (let i = 0; i < enemyCount; i++) {
      const roll = Math.random();

      // ===== Tier 5 特殊怪 (Wave >= 20 終極篇：黎曼、莫比烏斯、虛數循環) =====
      // A. 黎曼零點幽靈 (Riemann Zero Phantom - zeta(s))
      if (waveNumber >= 20 && roll < 0.08) {
        const rVal = 36 + Math.floor(Math.random() * (waveNumber * 8));
        enemies.push({
          val: rVal,
          isRiemann: true,
          affixes: getAffixes(),
          delay: +(0.90 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // B. 莫比烏斯拓撲幽靈 (Möbius Strip Shifter)
      if (waveNumber >= 20 && roll < 0.16) {
        const mobiusPool = [18, 20, 45, 50, 72, 75, 98, 108, 150];
        const mVal = mobiusPool[Math.floor(Math.random() * mobiusPool.length)];
        enemies.push({
          val: mVal,
          isMobius: true,
          affixes: getAffixes(),
          delay: +(0.85 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.90),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // C. 虛數單位 i 四象限循環幽靈 (Gaussian Cycler)
      if (waveNumber >= 20 && roll < 0.24) {
        const gVal = 18 + Math.floor(Math.random() * (waveNumber * 6));
        enemies.push({
          val: gVal,
          isGaussianCycler: true,
          affixes: getAffixes(),
          delay: +(0.85 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // ===== Tier 4 特殊怪 (Wave >= 15 質數要塞篇：考拉茲、套娃、梅森、完全數、孿生質數) =====
      // D. 考拉茲奇異怪 (Collatz 3n+1)
      if (waveNumber >= 15 && roll < 0.32) {
        const collatzPool = [27, 41, 47, 71, 87, 97, 123, 171];
        const cVal = collatzPool[Math.floor(Math.random() * collatzPool.length)];
        enemies.push({
          val: cVal,
          isCollatz: true,
          affixes: getAffixes(),
          delay: +(0.80 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // E. 質數冪·俄羅斯套娃怪 (p^k)
      if (waveNumber >= 15 && roll < 0.40) {
        const matryoshkaPool = [16, 27, 32, 64, 81, 125, 243, 256];
        const matVal = matryoshkaPool[Math.floor(Math.random() * matryoshkaPool.length)];
        enemies.push({
          val: matVal,
          isMatryoshka: true,
          affixes: getAffixes(),
          delay: +(0.80 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.85),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // F. 梅森狂暴巨擘 (Mersenne Titan - 2^p - 1)
      if (waveNumber >= 15 && roll < 0.47) {
        const mersennePool = [31, 127];
        const mVal = mersennePool[Math.floor(Math.random() * mersennePool.length)];
        enemies.push({
          val: mVal,
          isMersenne: true,
          affixes: getAffixes(),
          delay: +(1.10 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.80),
          hpMultiplier: +(hpMultiplier * 1.3).toFixed(2)
        });
        continue;
      }

      // G. 完全數聖盾怪 (6, 28, 496, 8128)
      if (waveNumber >= 15 && roll < 0.54) {
        const perfVal = waveNumber >= 24 && Math.random() < 0.25 ? 8128 : (waveNumber >= 18 && Math.random() < 0.4 ? 496 : 28);
        enemies.push({
          val: perfVal,
          isPerfect: true,
          affixes: getAffixes(),
          delay: +(0.9 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.85),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // H. 孿生質數雙子 (成對生成，Wave 15+ 自動觸發雙子鏈接)
      if (waveNumber >= 15 && roll < 0.62 && i < enemyCount - 1) {
        const pairIdx = Math.min(twinPairs.length - 1, Math.floor(Math.random() * (1 + Math.floor(waveNumber / 3))));
        const pair = twinPairs[pairIdx];
        const twinAffixes = getAffixes();
        enemies.push({
          val: pair[0],
          affixes: twinAffixes,
          delay: +(0.55 * delayScale).toFixed(2),
          speed: baseSpeed,
          hpMultiplier: hpMultiplier
        });
        enemies.push({
          val: pair[1],
          affixes: twinAffixes,
          delay: +(0.20 * delayScale).toFixed(2),
          speed: baseSpeed,
          hpMultiplier: hpMultiplier
        });
        i++;
        continue;
      }

      // ===== Tier 3 特殊怪 (Wave >= 10 平方之峰篇：康托爾、迴文、費波那契、平方數) =====
      // I. 康托爾三分塵埃怪 (Cantor Dust Swarm)
      if (waveNumber >= 10 && roll < 0.68) {
        const cantorPool = [27, 54, 81, 108, 162];
        const cVal = cantorPool[Math.floor(Math.random() * cantorPool.length)];
        enemies.push({
          val: cVal,
          isCantor: true,
          cantorDepth: 0,
          affixes: getAffixes(),
          delay: +(0.75 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.90),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // J. 迴文對稱聖盾怪 (Palindromic Mirror Sentinel)
      if (waveNumber >= 10 && roll < 0.74) {
        const palPool = [121, 131, 242, 353, 373, 484, 585, 1331];
        const pVal = palPool[Math.floor(Math.random() * palPool.length)];
        enemies.push({
          val: pVal,
          isPalindromic: true,
          affixes: getAffixes(),
          delay: +(0.85 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.85),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // K. 費波那契極速衝鋒隊
      if (waveNumber >= 10 && roll < 0.80) {
        const fibVal = fibs[Math.min(fibs.length - 1, Math.floor(Math.random() * (2 + Math.floor(waveNumber / 3))))];
        enemies.push({
          val: fibVal,
          isFibonacci: true,
          affixes: getAffixes(),
          delay: +(0.65 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 1.35),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // L. 完全平方數 (幾何方塊怪)
      if (waveNumber >= 10 && roll < 0.86) {
        const sqVal = squares[Math.min(squares.length - 1, Math.floor(Math.random() * (3 + Math.floor(waveNumber / 3))))];
        enemies.push({
          val: sqVal,
          affixes: getAffixes(),
          delay: +(0.75 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.90),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // ===== Tier 2 特殊怪 (Wave >= 6 負數深淵篇：循環小數、負數怪，公倍數合體啟動) =====
      // M. 循環小數幽靈 (0.3̇, 0.6̇, 0.142857, 0.9̇)
      if (waveNumber >= 6 && roll < 0.91) {
        const phantomPool = ['0.3', '0.6', '0.142857', '0.9'];
        const rType = phantomPool[Math.floor(Math.random() * (waveNumber >= 10 ? phantomPool.length : 2))];
        enemies.push({
          val: rType,
          isRecurring: true,
          recurringType: rType,
          affixes: getAffixes(),
          delay: +(0.85 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // N. 負數護盾怪
      if (waveNumber >= 6 && roll < 0.96) {
        const negVal = -(Math.floor(Math.random() * (waveNumber * 12)) + 12);
        enemies.push({
          val: negVal,
          affixes: getAffixes(),
          delay: +(0.75 * delayScale).toFixed(2),
          speed: Math.round(baseSpeed * 0.95),
          hpMultiplier: hpMultiplier
        });
        continue;
      }

      // ===== Tier 1 基礎高因數合數與質數 (Wave 1+ 全時期基礎怪) =====
      const baseFactors = [2, 3, 5, 7];
      let composite = baseFactors[Math.floor(Math.random() * 3)];
      const depth = Math.min(6, 1 + Math.floor(waveNumber / 4));
      for (let k = 0; k < depth; k++) {
        composite *= baseFactors[Math.floor(Math.random() * baseFactors.length)];
      }

      enemies.push({
        val: composite,
        affixes: getAffixes(),
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
        ? `魔王掌握多維領域技！善用複合神塔破甲與指揮官主動秘術！`
        : `數論怪物群進化！警惕考拉茲激怒、康托爾三分分裂與精英詞綴！`,
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
        gold: 900,
        mapId: '1-2',
        boss: { val: 60, name: '質因數長老 (Lv.1)', skills: ['split_adds'] },
        adds: [12, 18, 24, 30, 36, 48]
      },
      {
        id: 'boss_rush_2',
        stageIndex: 2,
        name: '👑 魔王連戰 II：負極奇點王',
        gold: 1100,
        mapId: '1-3',
        boss: { val: -120, name: '負極奇點王 (Lv.2)', skills: ['polarity_flip', 'split_adds'] },
        adds: [-24, -36, 40, 54, -60]
      },
      {
        id: 'boss_rush_3',
        stageIndex: 3,
        name: '👑 魔王連戰 III：考拉茲混沌雙泰坦',
        gold: 1300,
        mapId: '3-4',
        boss: { val: 496, name: '考拉茲大泰坦 (Lv.3)', skills: ['collatz_surge', 'split_adds'] },
        adds: [27, 41, 47, 71, 97, 121]
      },
      {
        id: 'boss_rush_4',
        stageIndex: 4,
        name: '👑 魔王連戰 IV：黎曼零點風暴狂神',
        gold: 1500,
        mapId: '4-4',
        boss: { val: 225, name: '黎曼風暴暴君 (Lv.4)', skills: ['zeta_storm', 'polarity_flip'] },
        adds: [64, 81, 100, 127, 144, 196]
      },
      {
        id: 'boss_rush_5',
        stageIndex: 5,
        name: '👑 魔王連戰 V：歐拉終焉萬數真神',
        gold: 1800,
        mapId: '5-4',
        boss: { val: 999, name: '歐拉萬象終焉神 (MAX)', skills: ['zeta_storm', 'collatz_surge', 'dimension_rift', 'polarity_flip'] },
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
    stage.adds.forEach((val) => {
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
      worldWidth: baseLevel.worldWidth || 1920,
      worldHeight: baseLevel.worldHeight || 1080,
      lanes: baseLevel.lanes,
      buildPads: baseLevel.buildPads,
      unlockedTowers: ['PRIME_2', 'PRIME_3', 'PRIME_5', 'PRIME_7', 'ABSOLUTE', 'OPERATOR', 'SQRT', 'ZERO_FREEZE', 'TRIG', 'FUSION_6', 'FUSION_15', 'FUSION_ABS_SQRT', 'FUSION_DERIVATIVE', 'FUSION_MONTE_CARLO', 'FUSION_FACTORIAL'],
      waves: [
        {
          waveNumber: 1,
          title: stage.name,
          tip: '魔王掌握領域神技！善用複合神塔破甲與指揮官主動秘術！',
          enemies: waveEnemies
        }
      ]
    };
  }
}

export const endlessManager = new EndlessManager();
