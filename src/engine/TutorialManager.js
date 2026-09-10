// Tutorial & Academy Manager for Math Tower Defense

export const TUTORIAL_LESSONS = [
  {
    id: 'tutorial_master',
    lessonNum: 0,
    requiredTower: 'ALL',
    requiredTowerName: '自由選建全防禦塔',
    title: '🎓 數論作戰學院：全塔通關實戰特訓',
    subtitle: '一直線單波實戰，自由體驗 8 大基礎塔與複合神塔',
    badge: '👑 綜合實戰',
    reward: '🎓 掌握全塔技巧',
    wavesCount: 1,
    icon: '🏛️',
    description: '直線地圖、中央單一基座！自由體驗 2、3、5、7 質數砲與代數功能塔除法！'
  },
  {
    id: 'tutorial_p2',
    lessonNum: 1,
    towerType: 'PRIME_2',
    requiredTower: 'PRIME_2',
    requiredTowerName: '2號 雙子砲',
    title: '第一課：2號 雙子砲（偶數除法）',
    subtitle: '掌握偶數除法 N ÷ 2，消滅 2, 4, 6, 8, 12',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '2',
    color: '#38bdf8',
    description: '偶數怪物（尾數 0, 2, 4, 6, 8）是戰場最常見敵軍。建造 2 號砲進行除法！'
  },
  {
    id: 'tutorial_p3',
    lessonNum: 2,
    towerType: 'PRIME_3',
    requiredTower: 'PRIME_3',
    requiredTowerName: '3號 三元激光',
    title: '第二課：3號 三元激光（3的倍數）',
    subtitle: '數字各位數相加為 3 的倍數，發動 N ÷ 3',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '3',
    color: '#fbbf24',
    description: '判別 3 的倍數密技：若數位之和能被 3 整除，建造 3 號砲除法分解！'
  },
  {
    id: 'tutorial_p5',
    lessonNum: 3,
    towerType: 'PRIME_5',
    requiredTower: 'PRIME_5',
    requiredTowerName: '5號 五芒衝擊',
    title: '第三課：5號 五芒衝擊（尾數 0 或 5）',
    subtitle: '個位數為 0 或 5 的剋星，發動 N ÷ 5',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '5',
    color: '#34d399',
    description: '5 號砲射程寬廣且威力高。凡個位數是 0 或 5 的敵軍，均能一發化解！'
  },
  {
    id: 'tutorial_p7',
    lessonNum: 4,
    towerType: 'PRIME_7',
    requiredTower: 'PRIME_7',
    requiredTowerName: '7號 七曜天琴',
    title: '第四課：7號 七曜天琴（7的倍數）',
    subtitle: '高階質數重砲，粉碎 7 的倍數強敵 (7, 14, 21, 28, 49)',
    badge: '基礎質數',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '7',
    color: '#8b5cf6',
    description: '7 號砲具備極遠射程與超高破壞力，專門對付 7 之倍數！'
  },
  {
    id: 'tutorial_abs',
    lessonNum: 5,
    towerType: 'ABSOLUTE',
    requiredTower: 'ABSOLUTE',
    requiredTowerName: '|x| 絕對值稜鏡',
    title: '第五課：|x| 絕對值稜鏡（負數淨化）',
    subtitle: '破除負數幽靈護盾 |-n| ➔ +n',
    badge: '代數功能',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '|x|',
    color: '#c084fc',
    description: '負數怪獸對質數砲免疫！在中央基座佈署絕對值稜鏡，將其淨化為正數！'
  },
  {
    id: 'tutorial_op',
    lessonNum: 6,
    towerType: 'OPERATOR',
    requiredTower: 'OPERATOR',
    requiredTowerName: '[+/-] 運算子調整塔',
    title: '第六課：[+/-] 運算子調整塔（化質為合）',
    subtitle: '量子微調 ±1，化解孤傲質數刺客 (11, 13, 17, 19)',
    badge: '代數功能',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '±1',
    color: '#14b8a6',
    description: '遇到質數怪無法整除時，運算子塔發射 1 脈衝使其成為可除合數！'
  },
  {
    id: 'tutorial_sqrt',
    lessonNum: 7,
    towerType: 'SQRT',
    requiredTower: 'SQRT',
    requiredTowerName: '√x 根號方根重力井',
    title: '第七課：√x 根號方根重力井（完全平方）',
    subtitle: '完全平方怪重壓剋星，直接開方 √x (4, 9, 16, 25, 36)',
    badge: '代數功能',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '√x',
    color: '#f59e0b',
    description: '針對完全平方幾何方塊怪，根號塔可暴擊並直接執行開方！'
  },
  {
    id: 'tutorial_zero',
    lessonNum: 8,
    towerType: 'ZERO_FREEZE',
    requiredTower: 'ZERO_FREEZE',
    requiredTowerName: '×0 絕對零度力場塔',
    title: '第八課：×0 絕對零度力場塔（極限減速）',
    subtitle: '乘零歸零光環，大範圍牽制高速怪物',
    badge: '控制力場',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '×0',
    color: '#06b6d4',
    description: '零度力場塔常駐「乘零力場」使範圍內所有快速衝鋒怪減速 50% 以上！'
  },
  {
    id: 'tutorial_upgrade_sell',
    lessonNum: 9,
    towerType: 'UPGRADE_SELL',
    requiredTower: 'PRIME_2',
    requiredTowerName: '2號 雙子砲 (升級/變賣)',
    title: '第九課：🔧 砲塔三向升級與變賣操作',
    subtitle: '獨立提升 射程/威力/攻速，或變賣回收 70% 軍費',
    badge: '戰術操作',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '🔼',
    color: '#f59e0b',
    description: '點選已建造砲塔可獨立升級屬性，亦可點擊變賣回收金幣！'
  },
  {
    id: 'tutorial_spells',
    lessonNum: 10,
    towerType: 'SPELLS',
    requiredTower: 'SPELLS',
    requiredTowerName: '指揮官秘術 (Q / W / E)',
    title: '第十課：⚡ 指揮官主動秘術 (Q / W / E)',
    subtitle: '施放 GCD 引爆、同餘黑洞 mod 5 與黃金超頻',
    badge: '指揮官秘術',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '⚡',
    color: '#fbbf24',
    description: '善用算力能量發動三大戰略秘術：[Q] GCD引爆、[W] 同餘黑洞、[E] 全場超頻！'
  },
  {
    id: 'tutorial_fusion',
    lessonNum: 11,
    towerType: 'FUSION_6',
    requiredTower: 'FUSION_6',
    requiredTowerName: '2×3 六芒雙曜塔',
    title: '第十一課：⚛️ 2×3 六芒雙曜（雙質數連除）',
    subtitle: '同時發射 2 與 3 質數光線，高速連環因數分解',
    badge: '複合神塔',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '2×3',
    color: '#06b6d4',
    description: '融合 2 號雙子砲與 3 號三元激光！能同時對目標進行 ÷2 與 ÷3 連環除法破甲！'
  },
  {
    id: 'tutorial_derivative',
    lessonNum: 12,
    towerType: 'FUSION_DERIVATIVE',
    requiredTower: 'FUSION_DERIVATIVE',
    requiredTowerName: 'd/dx 費馬導數天琴',
    title: '第十二課：🎻 d/dx 費馬導數天琴（微分求導破甲）',
    subtitle: '切線斜率連環刀，高值怪物 1.4 倍傷害與 7 之倍數音爆',
    badge: '複合神塔',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: 'd/dx',
    color: '#f43f5e',
    description: '7號天琴＋運算子微調神化！發射高頻求導音刃，對值大於 10 的怪物造成 1.4 倍切線傷害；若命中 7 之倍數直接引爆！'
  },
  {
    id: 'tutorial_monte_carlo',
    lessonNum: 13,
    towerType: 'FUSION_MONTE_CARLO',
    requiredTower: 'FUSION_MONTE_CARLO',
    requiredTowerName: '🎲 蒙地卡羅投擲機',
    title: '第十三課：🎲 蒙地卡羅投擲機（量子機率骰）',
    subtitle: '3號＋根號融合，質數 250% 暴擊、完全平方開方與大數天火',
    badge: '複合神塔',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '🎲',
    color: '#a855f7',
    description: '投擲 1~12 點量子骰！骰出質數點(2,3,5,7,11)引發 250% 暴擊破甲；骰出平方數(4,9)直接將幾何怪開方；骰出大數點(>=10)噴發額外金幣！'
  },
  {
    id: 'tutorial_factorial',
    lessonNum: 14,
    towerType: 'FUSION_FACTORIAL',
    requiredTower: 'FUSION_FACTORIAL',
    requiredTowerName: 'n! 階乘坍縮衝擊波',
    title: '第十四課：💥 n! 階乘坍縮衝擊波（全域因數衰減）',
    subtitle: '每關限建 1 座·不可升級，貫穿全路徑因數階層連環坍縮',
    badge: '終極神塔',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: 'n!',
    color: '#ec4899',
    description: '終極神域禁忌之塔！每關限建 1 座且不可升級。發射貫穿整條路徑的階乘波，負數怪瞬間轉正，並連續執行 7, 5, 3, 2 因數極限削弱！'
  },
  {
    id: 'tutorial_triangle',
    lessonNum: 15,
    towerType: 'RESONANCE_TRIANGLE',
    requiredTower: 'TRIANGLE_PRIMES',
    requiredTowerName: '2, 3, 5 及 3, 5, 7 質數砲',
    title: '第十五課：📐 幾何共鳴三角結界',
    subtitle: '建造 [2, 3, 5] 或 [3, 5, 7] 質數聖環，啟動共振三角結界！',
    badge: '幾何結界',
    reward: '✔ 掌握技巧',
    wavesCount: 1,
    icon: '📐',
    color: '#a855f7',
    description: '在相鄰三個基座建造 2, 3, 5 號砲可啟動【🔮 質數三相聖環 (Π30)】；建造 3, 5, 7 號砲可啟動【✨ 七曜三聯聖環 (Π105)】！光弦能減速切割怪物，頂點塔攻速射程大增！'
  }
];

// 針對 12 波主線教學的動態指引與 Spotlight 特寫設定
export const TUTORIAL_MASTER_STEPS = {
  1: {
    title: '第一課：2號 雙子砲 (PRIME_2)',
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
    title: '第十一課：⚛️ 2×3 六芒雙曜 (FUSION_6)',
    formula: '2×3 雙質數連除 | 同時發射 2 與 3 質數光線',
    keyPoint: '✨ 融合 2 號雙子砲與 3 號三元激光，同時對目標進行 ÷2 與 ÷3 連環除法破甲！',
    recommendedTower: 'FUSION_6',
    targetEnemies: '高血量複合怪 [42, 60, -64, 70]',
    actionPrompt: '嘗試建造【2×3 六芒雙曜】，感受雙質數連除神威！',
    spotlight: {
      towerType: 'FUSION_6',
      name: '⚛️ 2×3 六芒雙曜神塔',
      category: '複合神塔',
      icon: '2×3',
      color: '#06b6d4',
      formula: '同時執行 ÷2 與 ÷3 連除',
      desc: '融合 2 號雙子砲與 3 號三元激光！發射高頻雙星軌道，每次射擊同時進行 2 與 3 質數連除！',
      targets: '雙質因數複合怪獸 (6, 12, 24, 48...)'
    }
  },
  12: {
    title: '第十二課：🎻 d/dx 費馬導數天琴 (FUSION_DERIVATIVE)',
    formula: 'd/dx f(x) ｜ 切線斜率連環刀 ｜ 7之倍數求導音爆',
    keyPoint: '✨ 7號天琴＋運算子微調神化！對值大於 10 的怪物造成 1.4 倍切線傷害；若命中 7 之倍數直接引爆！',
    recommendedTower: 'FUSION_DERIVATIVE',
    targetEnemies: '7之倍數與高階怪 [14, 21, 28, 49, 70]',
    actionPrompt: '建造【d/dx 費馬導數天琴】，體驗微分切線求導音爆！',
    spotlight: {
      towerType: 'FUSION_DERIVATIVE',
      name: '🎻 d/dx 費馬導數天琴',
      category: '複合神塔',
      icon: 'd/dx',
      color: '#f43f5e',
      formula: 'd/dx (切線求導) ＆ 7之倍數音爆',
      desc: '全場限建 1 座！發射超音速求導飛刃，切線斜率對數值大於 10 的強敵造成 1.4 倍傷害；若怪物包含因數 7 則直接引發音爆分解！',
      targets: '大數值強敵與 7 之倍數合數群'
    }
  },
  13: {
    title: '第十三課：🎲 蒙地卡羅機率投擲機 (FUSION_MONTE_CARLO)',
    formula: '🎲 1~12 機率骰 ｜ 質數 250% 暴擊 ｜ 完全平方開方',
    keyPoint: '✨ 每次投擲量子骰：質數點(2,3,5,7,11)觸發 250% 暴擊；平方點(4,9)直接開方；大數點(>=10)掉落大量金幣！',
    recommendedTower: 'FUSION_MONTE_CARLO',
    targetEnemies: '幾何平方怪與複合群 [16, 25, 36, 45, 60]',
    actionPrompt: '建造【🎲 蒙地卡羅投擲機】，觀察機率投擲的奇效！',
    spotlight: {
      towerType: 'FUSION_MONTE_CARLO',
      name: '🎲 蒙地卡羅機率投擲機',
      category: '複合神塔',
      icon: '🎲',
      color: '#a855f7',
      formula: '質數點(2,3,5,7,11) 2.5× 暴擊 ｜ 平方點(4,9) 開方',
      desc: '全場限建 1 座！結合 3 號與根號的機率奇蹟：骰出質數造成 250% 破甲暴擊，骰出平方數直接執行開方，骰出大數奉送金幣天火！',
      targets: '全類型敵軍與完全平方幾何怪'
    }
  },
  14: {
    title: '第十四課：💥 n! 階乘坍縮衝擊波 (FUSION_FACTORIAL)',
    formula: 'n! = n×(n-1)×...×1 ｜ 負數轉正 ｜ 7, 5, 3, 2 因數連續削弱',
    keyPoint: '✨ 終極神域禁忌之塔！發射貫穿全路徑的極限階乘衝擊波，淨化負數怪並對穿過的所有敵人連續執行因數坍縮！',
    recommendedTower: 'FUSION_FACTORIAL',
    targetEnemies: '負數與巨型複合怪 [-30, 60, 120, 210, 420]',
    actionPrompt: '建造【n! 階乘坍縮衝擊波】，施放全路徑極限因數坍縮！',
    spotlight: {
      towerType: 'FUSION_FACTORIAL',
      name: '💥 n! 階乘坍縮衝擊波',
      category: '終極神塔',
      icon: 'n!',
      color: '#ec4899',
      formula: '全路徑貫穿 ｜ 負數淨化 ｜ 階乘因數連環衰減',
      desc: '每關限建 1 座且不可升級！發射震撼全場的階乘極光，負數怪遇光即淨化為正，並連續受到 7、5、3、2 質因數階乘連鎖削減！',
      targets: '全路徑一切敵軍與深淵負數大軍'
    }
  },
  15: {
    title: '第十五課：📐 幾何共鳴三角結界 (2-3-5 / 3-5-7)',
    formula: '[2,3,5] 質數三相聖環 (Π30) ｜ [3,5,7] 七曜三聯聖環 (Π105)',
    keyPoint: '✨ 在相距 <= 220px 的三座基座分別建造 2, 3, 5 或 3, 5, 7 質數砲，自動連接共鳴激光弦並張開神聖三角結界！',
    recommendedTower: 'TRIANGLE_PRIMES',
    targetEnemies: '多因數強敵 [30, 60, 105, 210]',
    actionPrompt: '在三基座分別建造 2、3、5 號砲或 3、5、7 號砲，啟動三角共振結界！',
    spotlight: {
      towerType: 'RESONANCE_TRIANGLE',
      name: '📐 幾何共鳴三角結界',
      category: '數論幾何矩陣',
      icon: '📐',
      color: '#a855f7',
      formula: '2-3-5 (Π30) ＆ 3-5-7 (Π105)',
      desc: '數論結界奧義！在相鄰 3 基座建造 2, 3, 5 號砲（或 3, 5, 7 號砲），系統自動串聯激光弦並張開神聖三角結界！邊界激光減速切割敵軍，頂點防禦塔攻速射程大幅提升，並持續回充算力能量！',
      targets: '多因數複合怪獸與大軍'
    }
  },
  16: {
    title: '🎓 第十六課：學院畢業總驗收（大聯防實戰）',
    formula: '絕對值淨化 + 運算子微調 + 根號重壓 + 質數重砲 + 幾何共鳴 + 複合神塔 + 指揮官秘術',
    keyPoint: '🏆 綜合運用前線絕對值、運算子微調、開方重力、後方質數重砲、幾何三角結界與複合神塔，守住最後波次完成大師結業！',
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
      desc: '檢驗你在數論學院所學到的一切！綜合運用除法、淨化、開方、微調、減速、升級變賣、幾何三角結界、複合神塔與指揮官秘術，完成大師結業！',
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
      return {
        title: '全塔實戰通關特訓',
        formula: '直線地圖 ｜ 中央單一基座 ｜ 自由建造任意防禦塔',
        keyPoint: '💡 只要一直線、一波怪、一個中央基座！點擊基座自由建造防禦塔體驗！',
        requiredTower: 'ALL',
        requiredTowerName: '自由選建全防禦塔',
        recommendedTower: null,
        targetEnemies: '🎯 指定砲塔：自由選建全防禦塔',
        actionPrompt: '💡 請在中央基座建造任意防禦塔，擊退訓練怪獸！',
        spotlight: null
      };
    }

    // 單塔特訓關卡
    const lesson = TUTORIAL_LESSONS.find(l => l.id === this.currentLessonId);
    if (!lesson) return null;

    return {
      title: lesson.title,
      formula: lesson.subtitle,
      keyPoint: lesson.description,
      requiredTower: lesson.requiredTower,
      requiredTowerName: lesson.requiredTowerName,
      recommendedTower: lesson.towerType || null,
      targetEnemies: `🎯 指定砲塔：${lesson.requiredTowerName}`,
      actionPrompt: `💡 本課指定【${lesson.requiredTowerName}】！請點擊中央基座進行建造！`,
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
}

export const tutorialManager = new TutorialManager(null);
