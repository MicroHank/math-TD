// Tutorial & Academy Manager for Math Tower Defense
import { progress } from './ProgressManager.js';
import { sound } from './Audio.js';

export const TUTORIAL_LESSONS = [
  {
    id: 'tutorial_master',
    lessonNum: 0,
    title: '🎓 數論作戰學院：全塔與秘術通關特訓課',
    subtitle: '12 波次完整掌握 8 大基礎塔、升級變賣、QWE 秘術與 4 大複合神塔',
    badge: '👑 完整大主線',
    reward: '🎓 大師結業認證',
    wavesCount: 12,
    icon: '🏛️',
    description: '從 2、3、5、7 質數砲，到絕對值、運算子、開方、零度減速、砲塔升級變賣、QWE 主動秘術及複合神塔全面特訓！'
  },
  {
    id: 'tutorial_p2',
    lessonNum: 1,
    towerType: 'PRIME_2',
    title: '第一課：2號 雙子砲（偶數除法）',
    subtitle: '掌握偶數除法 $N \\div 2$，怪物數值變 1 即消滅',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '2',
    color: '#38bdf8',
    description: '偶數怪物（尾數 0, 2, 4, 6, 8）是戰場最常見敵軍。'
  },
  {
    id: 'tutorial_p3',
    lessonNum: 2,
    towerType: 'PRIME_3',
    title: '第二課：3號 三元激光（數字和判別）',
    subtitle: '數字各位數相加為 3 的倍數，發動 $N \\div 3$',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '3',
    color: '#fbbf24',
    description: '判別 3 的倍數密技：若一個數的所有數位之和能被 3 整除，則該數必可被 3 號砲除法分解！'
  },
  {
    id: 'tutorial_p5',
    lessonNum: 3,
    towerType: 'PRIME_5',
    title: '第三課：5號 五芒衝擊（尾數 0 或 5）',
    subtitle: '個位數為 0 或 5 的剋星',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '5',
    color: '#34d399',
    description: '5 號砲射程寬廣且單發威力高。凡個位數是 0 或 5 的敵軍（如 10, 15, 25, 35, 50），均能被其一發化解！'
  },
  {
    id: 'tutorial_p7',
    lessonNum: 4,
    towerType: 'PRIME_7',
    title: '第四課：7號 七曜天琴（難纏倍數）',
    subtitle: '高階質數重砲，粉碎 7 的倍數強敵',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '7',
    color: '#8b5cf6',
    description: '7 號砲具備極遠射程與超高破壞力，專門對付 14, 21, 28, 35, 49 等 7 之倍數！'
  },
  {
    id: 'tutorial_abs',
    lessonNum: 5,
    towerType: 'ABSOLUTE',
    title: '第五課：|x| 絕對值稜鏡（負數淨化）',
    subtitle: '破除負數幽靈免疫護盾 |-n| -> +n',
    badge: '代數功能',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '|x|',
    color: '#c084fc',
    description: '負數怪獸（如 -6, -10, -20）對所有質數砲免疫！必須在前線佈署絕對值稜鏡，將其淨化為正數後方可除法！'
  },
  {
    id: 'tutorial_op',
    lessonNum: 6,
    towerType: 'OPERATOR',
    title: '第六課：[+/-] 運算子調整塔（化質為合）',
    subtitle: '量子微調 ±1，化解孤傲質數刺客',
    badge: '代數功能',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '±1',
    color: '#14b8a6',
    description: '遇到 11, 13, 17, 19, 23 等質數怪時，質數砲無法整除！運算子塔發射 1 脈衝（如 11-1=10, 13-1=12），使其成為可除合數！'
  },
  {
    id: 'tutorial_sqrt',
    lessonNum: 7,
    towerType: 'SQRT',
    title: '第七課：√x 根號方根重力井（完全平方）',
    subtitle: '完全平方怪重壓剋星，直接開方 √x',
    badge: '代數功能',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '√x',
    color: '#f59e0b',
    description: '針對 4, 9, 16, 25, 36, 49, 64, 81, 100 等完全平方幾何方塊怪，根號塔可暴擊並直接執行開方！'
  },
  {
    id: 'tutorial_zero',
    lessonNum: 8,
    towerType: 'ZERO_FREEZE',
    title: '第八課：×0 絕對零度力場塔（極限減速）',
    subtitle: '乘零歸零光環，大範圍牽制高速怪物',
    badge: '控制力場',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '×0',
    color: '#06b6d4',
    description: '零度力場塔不需發射實體砲彈，其常駐「乘零力場」能使範圍內所有快速衝鋒怪（如斐波那契怪）減速 50% 以上！'
  },
  {
    id: 'tutorial_upgrade_sell',
    lessonNum: 9,
    towerType: 'UPGRADE_SELL',
    title: '第九課：🔧 砲塔三向升級與變賣操作',
    subtitle: '獨立提升 射程/威力/攻速，或變賣回收 70% 軍費',
    badge: '戰術操作',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '🔼',
    color: '#f59e0b',
    description: '點選已建造砲塔可獨立升級「🎯 射程、💥 威力、⚡ 攻速」三種屬性！亦可隨時點擊「💰 變賣」回收 70% 金幣調整布陣！'
  },
  {
    id: 'tutorial_spells',
    lessonNum: 10,
    towerType: 'SPELLS',
    title: '第十課：⚡ 指揮官主動秘術 (Q / W / E)',
    subtitle: '施放 GCD 引爆、同餘黑洞 mod 5 與黃金超頻',
    badge: '指揮官秘術',
    reward: '✔ 掌握技巧',
    wavesCount: 3,
    icon: '⚡',
    color: '#fbbf24',
    description: '善用算力能量發動三大戰略秘術：[Q] 圈內最大公因數引爆、[W] 同餘黑洞湮滅與減速、[E] 全場攻速 +60% 超頻！'
  },
  {
    id: 'tutorial_fusion',
    lessonNum: 11,
    towerType: 'FUSION_6',
    title: '第十一課：⚛️ 複合神塔融合與幾何共鳴',
    subtitle: '進化 2×3, 3×5, |√x|, n! 與 3 塔三角結界',
    badge: '終極神塔',
    reward: '✔ 掌握技巧',
    wavesCount: 2,
    icon: '⚛️',
    color: '#ec4899',
    description: '當防禦塔等級提升，可花費金幣融合蛻變為「複合神塔」；且相距小於 300 px 的 3 座塔將自動構成「幾何三角結界」提升 25% 攻速！'
  }
];

// 針對 12 波主線教學的動態指引與 Spotlight 特寫設定
export const TUTORIAL_MASTER_STEPS = {
  1: {
    title: '第一課：2號 雙子砲 (PRIME_2)',
    instructor: '🤖 數論教官：歡迎來到數論學院！首先認識偶數的剋星【2號 雙子砲】。',
    formula: 'N ÷ 2 ➔ 1 (擊破消除)',
    keyPoint: '💡 偶數怪（2, 4, 6, 8, 12）是 2 的倍數。點擊路徑旁的基座（+），建造【2號 雙子砲】！',
    recommendedTower: 'PRIME_2',
    targetEnemies: '偶數怪 [2, 4, 6, 8, 12]',
    actionPrompt: '請在基座建造 1~2 座【2號 雙子砲】，然後點擊 [開始下一波]！',
    spotlight: {
      towerType: 'PRIME_2',
      name: '2號 雙子砲',
      category: '基礎質數重砲',
      icon: '2',
      color: '#38bdf8',
      formula: 'N ÷ 2 ➔ 1 (整除擊破)',
      desc: '偶數剋星！只要怪物數值包含因數 2（尾數為 0, 2, 4, 6, 8），每次擊中就會進行除以 2 分解，直到數值縮減為 1 瞬間消滅！',
      targets: '偶數合數怪獸 (2, 4, 6, 8, 12, 16...)'
    }
  },
  2: {
    title: '第二課：3號 三元激光 (PRIME_3)',
    instructor: '🤖 數論教官：現在出現了 3 的倍數！請認識【3號 三元激光】。',
    formula: '27 ➔ 2+7=9 ➔ 27 ÷ 3 = 9',
    keyPoint: '💡 數字和為 3 的倍數（如 9, 15, 27）會被 3 號砲除法分解。2 號砲對奇數合數無法整除！',
    recommendedTower: 'PRIME_3',
    targetEnemies: '3的倍數怪 [3, 6, 9, 15, 27]',
    actionPrompt: '請建造【3號 三元激光】配合 2 號砲形成交叉火力！',
    spotlight: {
      towerType: 'PRIME_3',
      name: '3號 三元激光',
      category: '基礎質數重砲',
      icon: '3',
      color: '#fbbf24',
      formula: '∑ 數位 mod 3 = 0 ➔ N ÷ 3',
      desc: '3的倍數剋星！密技：只要一個數的各個數位之和是 3 的倍數（如 27 ➔ 2+7=9），該數必定可被 3 號砲除法分解！',
      targets: '3的倍數怪獸 (3, 6, 9, 15, 27, 33...)'
    }
  },
  3: {
    title: '第三課：5號 五芒衝擊 (PRIME_5)',
    instructor: '🤖 數論教官：尾數是 0 或 5 的怪物來襲！部署【5號 五芒衝擊】。',
    formula: '25 ÷ 5 = 5 ➔ 5 ÷ 5 = 1 (消滅)',
    keyPoint: '💡 個位數為 0 或 5 的數（5, 10, 15, 25, 50）是 5 的倍數。5 號砲能造成強烈衝擊！',
    recommendedTower: 'PRIME_5',
    targetEnemies: '尾數0或5怪 [5, 10, 15, 25, 50]',
    actionPrompt: '建造【5號 五芒衝擊】消滅這批 5 的倍數軍團！',
    spotlight: {
      towerType: 'PRIME_5',
      name: '5號 五芒衝擊',
      category: '基礎質數重砲',
      icon: '5',
      color: '#34d399',
      formula: '尾數為 0 或 5 ➔ N ÷ 5',
      desc: '5的倍數剋星！單發威力巨大且射程廣闊。凡個位數為 0 或 5 的怪獸均能被其一發直接除以 5 破防！',
      targets: '5的倍數怪獸 (5, 10, 15, 25, 35, 50...)'
    }
  },
  4: {
    title: '第四課：7號 七曜天琴 (PRIME_7)',
    instructor: '🤖 數論教官：高階質數倍數怪登場！請建造【7號 七曜天琴】。',
    formula: '49 ÷ 7 = 7 ➔ 7 ÷ 7 = 1',
    keyPoint: '💡 7 號砲擁有超遠射程與重傷害，是 7, 14, 21, 28, 35, 49 等怪物的終極剋星！',
    recommendedTower: 'PRIME_7',
    targetEnemies: '7的倍數怪 [7, 14, 21, 28, 35, 49]',
    actionPrompt: '在遠距離基座建置【7號 七曜天琴】精準打擊！',
    spotlight: {
      towerType: 'PRIME_7',
      name: '7號 七曜天琴',
      category: '高階質數重砲',
      icon: '7',
      color: '#8b5cf6',
      formula: 'N mod 7 = 0 ➔ N ÷ 7',
      desc: '7之倍數剋星！超遠射程的強大重砲，專門對付 14, 21, 28, 35, 49 等無法被 2, 3, 5 輕易除盡的難纏強敵！',
      targets: '7的倍數怪獸 (7, 14, 21, 28, 35, 49...)'
    }
  },
  5: {
    title: '第五課：|x| 絕對值稜鏡 (ABSOLUTE)',
    instructor: '🤖 數論教官：注意！前方出現帶負號的反向護盾【負數幽靈】！',
    formula: '|-12| ➔ +12 (淨化為正數後方可被質數砲除法)',
    keyPoint: '⚠️ 負數怪（-6, -10, -20, -35）質數砲無法直接傷害！務必在路徑最前線放置【|x| 絕對值稜鏡】！',
    recommendedTower: 'ABSOLUTE',
    targetEnemies: '負數幽靈 [-6, -10, -16, -35]',
    actionPrompt: '在靠近怪物起點的前線建造【|x| 絕對值稜鏡】淨化幽靈！',
    spotlight: {
      towerType: 'ABSOLUTE',
      name: '|x| 絕對值稜鏡',
      category: '代數功能稜鏡',
      icon: '|x|',
      color: '#c084fc',
      formula: '|-n| ➔ +n (淨化反向護盾)',
      desc: '負數幽靈剋星！負數怪物自帶反向護盾對所有質數砲免疫！在起點前線建造稜鏡將其淨化為正數後，後方質數砲方能發動除法！',
      targets: '負數幽靈怪獸 (-4, -6, -10, -16, -35...)'
    }
  },
  6: {
    title: '第六課：[+/-] 運算子調整塔 (OPERATOR)',
    instructor: '🤖 數論教官：無法被 2, 3, 5, 7 整除的【孤傲質數刺客】來了！',
    formula: '11 - 1 = 10 (可被 2、5 號砲消滅), 13 - 1 = 12',
    keyPoint: '💡 質數怪（11, 13, 17, 19）無法整除。運算子塔發動 ±1 量子微調，化質數為合數！',
    recommendedTower: 'OPERATOR',
    targetEnemies: '質數刺客 [11, 13, 17, 19, 23]',
    actionPrompt: '建造【[+/-] 運算子調整塔】，並讓後方質數砲完成收尾！',
    spotlight: {
      towerType: 'OPERATOR',
      name: '[+/-] 運算子調整塔',
      category: '代數微調塔',
      icon: '±1',
      color: '#14b8a6',
      formula: 'P ± 1 ➔ 合數 (如 11 - 1 = 10)',
      desc: '孤傲質數剋星！針對 11, 13, 17, 19, 23 等質數怪物發動 ±1 量子微調脈衝，將難纏的質數轉化為可整除的合數！',
      targets: '孤傲質數怪獸 (11, 13, 17, 19, 23...)'
    }
  },
  7: {
    title: '第七課：√x 根號方根重力井 (SQRT)',
    instructor: '🤖 數論教官：巨型幾何方塊怪逼近！啟用【√x 根號重力井】。',
    formula: '√36 ➔ 6, √100 ➔ 10 (直接開方重創)',
    keyPoint: '💡 完全平方數（16, 25, 36, 49, 64, 81, 100）受根號重力打擊將直接開方數值驟降！',
    recommendedTower: 'SQRT',
    targetEnemies: '完全平方怪 [16, 25, 36, 49, 64, 81, 100]',
    actionPrompt: '建造【√x 方根重力井】以開方重壓粉碎平方怪！',
    spotlight: {
      towerType: 'SQRT',
      name: '√x 根號方根重力井',
      category: '高階代數重力塔',
      icon: '√x',
      color: '#f59e0b',
      formula: '√(n²) ➔ n (直接開方重創)',
      desc: '完全平方數剋星！凡 16, 25, 36, 49, 64, 81, 100 等幾何方塊怪，根號塔將以超高暴擊率直接進行開方，數值瞬間斷崖式縮小！',
      targets: '幾何完全平方怪 (16, 25, 36, 49, 64, 100...)'
    }
  },
  8: {
    title: '第八課：×0 絕對零度力場塔 (ZERO_FREEZE)',
    instructor: '🤖 數論教官：高速衝鋒怪高速逼近！部署【×0 絕對零度力場】。',
    formula: 'N × 0 ➔ 大範圍極限減速 50%+',
    keyPoint: '💡 絕對零度塔發散持續乘零減速光環，能牽制斐波那契高速衝鋒怪，為防禦塔爭取輸出時間！',
    recommendedTower: 'ZERO_FREEZE',
    targetEnemies: '高速衝鋒怪 [21, 34, 55]',
    actionPrompt: '在彎道中心建造【×0 絕對零度塔】實施範圍控場！',
    spotlight: {
      towerType: 'ZERO_FREEZE',
      name: '×0 絕對零度力場塔',
      category: '範圍控場力場塔',
      icon: '×0',
      color: '#06b6d4',
      formula: '乘零歸零力場 ➔ 減速 50%+',
      desc: '高速衝鋒怪剋星！不需單體射擊，常駐發散「乘零減速光環」，使進入範圍的所有高速斐波那契衝鋒怪急遽減速 50% 以上！',
      targets: '高速斐波那契衝鋒怪 (13, 21, 34, 55...)'
    }
  },
  9: {
    title: '第九課：🔧 砲塔三向升級與變賣操作',
    instructor: '🤖 數論教官：學習關鍵戰術！點選戰場上的砲塔，可進行三向升級或變賣回收金幣。',
    formula: '射程 Lv+1 ｜ 威力 Lv+1 ｜ 攻速 Lv+1 ｜ 變賣返還 70%',
    keyPoint: '💡 點擊已建砲塔開啟升級面板：可分別提升【射程 🎯】、【威力 💥】、【攻速 ⚡】；若不需要可點擊【💰 變賣 (+70% 金幣)】！',
    recommendedTower: null,
    targetEnemies: '高血量耐久合數怪 [36, 48, 72]',
    actionPrompt: '點擊已建造的砲塔，嘗試升級威力或攻速，或變賣不合適的砲塔！',
    spotlight: {
      towerType: 'UPGRADE_SELL',
      name: '🔧 砲塔升級與變賣操作',
      category: '戰略戰術面板',
      icon: '🔼',
      color: '#f59e0b',
      formula: '🎯 射程 ｜ 💥 威力 ｜ ⚡ 攻速 ｜ 💰 變賣 (70%)',
      desc: '點選已建造防禦塔可開啟懸浮面板！三向獨立升級能讓砲塔威力與射速翻倍；若怪獸特性改變，亦可隨時變賣回收 70% 總成本重建防線！',
      targets: '戰略調整與屬性強化'
    }
  },
  10: {
    title: '第十課：⚡ 指揮官主動秘術 (Q / W / E 鍵)',
    instructor: '🤖 數論教官：指揮官必殺奧義！點擊下方秘術列或按鍵盤 Q / W / E 發動戰略秘術！',
    formula: '[Q] GCD引爆 (50⚡) ｜ [W] 同餘黑洞 (85⚡) ｜ [E] 黃金超頻 (50⚡)',
    keyPoint: '✨ [Q鍵] 圈內怪全部除以公因數！[W鍵] 召喚黑洞餘數0/1瞬間湮滅！[E鍵] 全場攻速 +60%！',
    recommendedTower: null,
    targetEnemies: '密集公因數群 [12, 18, 24, 30] ＆ 同餘怪 [15, 26, 31]',
    actionPrompt: '按 Q 鍵在怪物群施放 GCD 引爆，或按 W 鍵召喚同餘黑洞！',
    spotlight: {
      towerType: 'SPELLS',
      name: '⚡ 指揮官戰略秘術 (Q / W / E)',
      category: '主動算力技能',
      icon: '⚡',
      color: '#fbbf24',
      formula: '[Q] gcd(a,b,c) ｜ [W] mod 5 湮滅 ｜ [E] 攻速 +60%',
      desc: '消耗算力能量施放強效秘術：\n• [Q 鍵] GCD引爆：範圍內所有怪物瞬間除以最大公因數！\n• [W 鍵] 同餘黑洞：進入怪物執行 mod 5，餘數0/1瞬間湮滅！\n• [E 鍵] 黃金超頻：全場所有防禦塔攻速暴增 +60%！',
      targets: '全戰場密集敵軍與高難度怪群'
    }
  },
  11: {
    title: '第十一課：⚛️ 複合神塔融合 & 幾何共鳴結界',
    instructor: '🤖 數論教官：現在學習終極奧義！點擊已建造的砲塔進行【數論融合】或連線共鳴。',
    formula: '2×3 雙質數連除 | 3 塔連線構成幾何三角結界 (+25% 攻速)',
    keyPoint: '✨ 點選砲塔點擊「⚛️ 數論融合」進化為複合神塔；3 座相距 <= 300px 的塔將自動構成三角結界！',
    recommendedTower: 'FUSION_6',
    targetEnemies: '高血量複合怪 [42, 60, -64, 70]',
    actionPrompt: '嘗試建造【2×3 六芒雙曜】或【3×5 加農】，並讓 3 座塔相鄰共鳴！',
    spotlight: {
      towerType: 'FUSION_6',
      name: '⚛️ 複合神塔融合與幾何結界',
      category: '終極數論矩陣',
      icon: '⚛️',
      color: '#ec4899',
      formula: '2×3, 3×5, |√x|, n! ｜ 幾何三角共振',
      desc: '砲塔可花費金幣融合蛻變為極限神塔（2×3雙質數連除、3×5產金幣、|√x|虛數引力、n!階乘波）；且 3 座相鄰塔相連可構成幾何三角結界 (+25% 攻速)！',
      targets: '全維度極限複合怪獸'
    }
  },
  12: {
    title: '🎓 第十二課：學院畢業總驗收（大聯防實戰）',
    instructor: '🤖 數論教官：最後考驗！所有數論怪獸混合進攻，展現你的全方位防禦體系！',
    formula: '絕對值淨化 + 運算子微調 + 根號重壓 + 質數重砲 + 指揮官秘術',
    keyPoint: '🏆 綜合運用前線絕對值、運算子微調、開方重力、後方質數重砲與 QWE 秘術，守住最後波次完成大師結業！',
    recommendedTower: null,
    targetEnemies: '全種類混合大軍 [-36, 17, 49, 60, 23, 81, 120]',
    actionPrompt: '調動全部防線資源，守住防守核心，順利自數論學院畢業！',
    spotlight: {
      towerType: 'MASTER_GRADUATION',
      name: '🎓 學院畢業總驗收大考驗',
      category: '實戰結業考核',
      icon: '🏆',
      color: '#38bdf8',
      formula: '全塔佈陣 × 幾何共鳴 × QWE 秘術',
      desc: '檢驗你在數論學院所學到的一切！綜合運用除法、淨化、開方、微調、減速、升級變賣與指揮官秘術，守住防守核心完成大師結業！',
      targets: '全類型數論軍團混合壓境'
    }
  }
};

export class TutorialManager {
  constructor(game) {
    this.game = game;
    this.currentLessonId = null;
    this.isTutorialActive = false;
    this.lastSpotlightWave = -1;
  }

  startLesson(lessonId) {
    this.currentLessonId = lessonId;
    this.isTutorialActive = true;
    this.lastSpotlightWave = -1;
  }

  stopLesson() {
    this.isTutorialActive = false;
    this.currentLessonId = null;
    this.lastSpotlightWave = -1;
  }

  getCurrentStepInfo(waveIndex = 0) {
    if (!this.isTutorialActive) return null;

    if (this.currentLessonId === 'tutorial_master') {
      const stepNum = waveIndex + 1;
      return TUTORIAL_MASTER_STEPS[stepNum] || TUTORIAL_MASTER_STEPS[12];
    }

    // 單塔特訓關卡
    const lesson = TUTORIAL_LESSONS.find(l => l.id === this.currentLessonId);
    if (!lesson) return null;

    return {
      title: lesson.title,
      instructor: `🤖 數論教官：正在進行【${lesson.title}】專項特訓。`,
      formula: lesson.subtitle,
      keyPoint: lesson.description,
      recommendedTower: lesson.towerType || null,
      targetEnemies: `目標特訓怪獸 (波次 ${waveIndex + 1}/${lesson.wavesCount})`,
      actionPrompt: `請建造推薦的【${lesson.title}】防禦塔，擊退訓練怪獸！`,
      spotlight: {
        towerType: lesson.towerType,
        name: lesson.title,
        category: lesson.badge,
        icon: lesson.icon,
        color: lesson.color || '#38bdf8',
        formula: lesson.subtitle,
        desc: lesson.description,
        targets: '特訓目標怪物'
      }
    };
  }

  onTutorialCompleted(lessonId) {
    if (sound && sound.playWaveComplete) sound.playWaveComplete();
    if (lessonId === 'tutorial_master') {
      progress.completeLevel('tutorial_master', 3);
    } else {
      progress.completeLevel(lessonId, 3);
    }
  }
}

export const tutorialManager = new TutorialManager(null);
