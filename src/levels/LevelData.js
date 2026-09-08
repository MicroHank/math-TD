// Level & Chapter Database for Math Tower Defense (High-Complexity Paths, 16-20 Build Pads, High Speed & Density)

export const CHAPTERS = [
  {
    id: 'world-1',
    name: '第一章：合數平原',
    subtitle: '掌握質數除法，挑戰合數泰坦',
    levels: ['1-1', '1-2', '1-3', '1-4']
  },
  {
    id: 'world-2',
    name: '第二章：負數深淵',
    subtitle: '絕對值淨化、雙路夾擊與運算子調整',
    levels: ['2-1', '2-2', '2-3', '2-4']
  },
  {
    id: 'world-3',
    name: '第三章：平方之峰',
    subtitle: '開方重力、完全平方與七曜天琴',
    levels: ['3-1', '3-2', '3-3', '3-4']
  },
  {
    id: 'world-4',
    name: '第四章：質數之城',
    subtitle: '難纏質數突襲、同餘防禦與運算子微調',
    levels: ['4-1', '4-2', '4-3', '4-4']
  },
  {
    id: 'world-5',
    name: '第五章：極限終焉',
    subtitle: '虛數維度、莫比烏斯環與造物主全除決戰',
    levels: ['5-1', '5-2', '5-3', '5-4']
  }
];

export const LEVELS = {
  '1-1': {
    id: '1-1',
    chapterId: 'world-1',
    name: '1-1 偶數小徑（迴旋深谷）',
    subtitle: '偶數除法多段打擊入門',
    tip: '💡 全新高曲折迴旋走廊！配備 16 處砲台據點。怪物需承受多次 2 號砲打擊才能除法分解！',
    nextLevelId: '1-2',
    initialGold: 280,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 160 },
        { x: 240, y: 160 },
        { x: 240, y: 360 },
        { x: 420, y: 360 },
        { x: 420, y: 160 },
        { x: 600, y: 160 },
        { x: 600, y: 420 },
        { x: 780, y: 420 },
        { x: 780, y: 260 },
        { x: 930, y: 260 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 130, y: 90 },
      { id: 'p2', x: 130, y: 230 },
      { id: 'p3', x: 240, y: 430 },
      { id: 'p4', x: 330, y: 290 },
      { id: 'p5', x: 330, y: 430 },
      { id: 'p6', x: 330, y: 160 },
      { id: 'p7', x: 420, y: 90 },
      { id: 'p8', x: 510, y: 230 },
      { id: 'p9', x: 510, y: 360 },
      { id: 'p10', x: 600, y: 90 },
      { id: 'p11', x: 690, y: 230 },
      { id: 'p12', x: 690, y: 360 },
      { id: 'p13', x: 690, y: 490 },
      { id: 'p14', x: 780, y: 490 },
      { id: 'p15', x: 860, y: 200 },
      { id: 'p16', x: 860, y: 340 }
    ],
    waves: [
      {
        title: '第一波：高速偶數前鋒',
        tip: '高速 2, 4, 6 湧入！利用 16 處基座打造交叉火網。',
        enemies: [
          { val: 2, speed: 62, delay: 0.7 },
          { val: 2, speed: 65, delay: 0.8 },
          { val: 4, speed: 60, delay: 0.8 },
          { val: 4, speed: 60, delay: 0.9 },
          { val: 4, speed: 64, delay: 0.9 },
          { val: 6, speed: 58, delay: 0.9 },
          { val: 6, speed: 58, delay: 1.0 },
          { val: 6, speed: 60, delay: 1.0 },
          { val: 8, speed: 56, delay: 1.0 },
          { val: 8, speed: 56, delay: 1.1 },
          { val: 8, speed: 60, delay: 1.1 },
          { val: 10, speed: 55, delay: 1.2 },
          { val: 10, speed: 55, delay: 1.2 },
          { val: 12, speed: 54, delay: 1.3 }
        ]
      },
      {
        title: '第二波：偶數連鎖衝鋒陣',
        tip: '升級砲塔提升傷害！高階砲塔只需 1~2 發即可除法一次！',
        enemies: [
          { val: 4, speed: 68, delay: 0.6 },
          { val: 6, speed: 66, delay: 0.7 },
          { val: 6, speed: 66, delay: 0.7 },
          { val: 8, speed: 62, delay: 0.8 },
          { val: 8, speed: 62, delay: 0.8 },
          { val: 10, speed: 60, delay: 0.8 },
          { val: 10, speed: 60, delay: 0.9 },
          { val: 12, speed: 58, delay: 0.9 },
          { val: 12, speed: 58, delay: 0.9 },
          { val: 14, speed: 58, delay: 1.0 },
          { val: 14, speed: 60, delay: 1.0 },
          { val: 16, speed: 56, delay: 1.0 },
          { val: 16, speed: 56, delay: 1.1 },
          { val: 18, speed: 55, delay: 1.1 },
          { val: 20, speed: 54, delay: 1.1 },
          { val: 24, speed: 52, delay: 1.2 },
          { val: 24, speed: 52, delay: 1.2 },
          { val: 28, speed: 50, delay: 1.3 }
        ]
      },
      {
        title: '第三波：偶數大軍萬馬奔騰',
        tip: '全速前進！24 隻複合偶數怪高速壓境！',
        enemies: [
          { val: 8, speed: 72, delay: 0.6 },
          { val: 10, speed: 70, delay: 0.6 },
          { val: 12, speed: 68, delay: 0.7 },
          { val: 12, speed: 68, delay: 0.7 },
          { val: 14, speed: 66, delay: 0.7 },
          { val: 16, speed: 64, delay: 0.8 },
          { val: 16, speed: 64, delay: 0.8 },
          { val: 18, speed: 62, delay: 0.8 },
          { val: 20, speed: 62, delay: 0.8 },
          { val: 20, speed: 62, delay: 0.9 },
          { val: 24, speed: 60, delay: 0.9 },
          { val: 24, speed: 60, delay: 0.9 },
          { val: 28, speed: 58, delay: 1.0 },
          { val: 28, speed: 58, delay: 1.0 },
          { val: 32, speed: 58, delay: 1.0 },
          { val: 32, speed: 58, delay: 1.1 },
          { val: 36, speed: 56, delay: 1.1 },
          { val: 36, speed: 56, delay: 1.1 },
          { val: 40, speed: 54, delay: 1.2 },
          { val: 48, speed: 52, delay: 1.2 },
          { val: 50, speed: 52, delay: 1.2 },
          { val: 60, speed: 50, delay: 1.3 },
          { val: 64, speed: 50, delay: 1.3 },
          { val: 72, speed: 48, delay: 1.4 }
        ]
      }
    ]
  },

  '1-2': {
    id: '1-2',
    chapterId: 'world-1',
    name: '1-2 三元迴廊（迷宮走廊）',
    subtitle: '3 的倍數與雙重因數陣地戰',
    tip: '💡 17 處火力據點！複合因數怪（6, 12, 18, 24）需交替打擊耐受度後分解！',
    nextLevelId: '1-3',
    initialGold: 340,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 240 },
        { x: 180, y: 240 },
        { x: 180, y: 100 },
        { x: 440, y: 100 },
        { x: 440, y: 280 },
        { x: 300, y: 280 },
        { x: 300, y: 440 },
        { x: 620, y: 440 },
        { x: 620, y: 200 },
        { x: 760, y: 200 },
        { x: 760, y: 380 },
        { x: 930, y: 380 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 100, y: 170 },
      { id: 'p2', x: 100, y: 310 },
      { id: 'p3', x: 250, y: 170 },
      { id: 'p4', x: 360, y: 170 },
      { id: 'p5', x: 440, y: 190 },
      { id: 'p6', x: 370, y: 350 },
      { id: 'p7', x: 230, y: 360 },
      { id: 'p8', x: 300, y: 500 },
      { id: 'p9', x: 460, y: 360 },
      { id: 'p10', x: 460, y: 500 },
      { id: 'p11', x: 540, y: 360 },
      { id: 'p12', x: 540, y: 200 },
      { id: 'p13', x: 690, y: 130 },
      { id: 'p14', x: 690, y: 290 },
      { id: 'p15', x: 690, y: 440 },
      { id: 'p16', x: 840, y: 300 },
      { id: 'p17', x: 840, y: 450 }
    ],
    waves: [
      {
        title: '第一波：三元疾走陣',
        tip: '3, 6, 9, 12, 15 高速突擊！建造 2 號與 3 號砲組合。',
        enemies: [
          { val: 3, speed: 65, delay: 0.7 },
          { val: 3, speed: 68, delay: 0.7 },
          { val: 6, speed: 62, delay: 0.8 },
          { val: 6, speed: 62, delay: 0.8 },
          { val: 9, speed: 60, delay: 0.8 },
          { val: 9, speed: 60, delay: 0.9 },
          { val: 9, speed: 64, delay: 0.9 },
          { val: 12, speed: 58, delay: 0.9 },
          { val: 12, speed: 58, delay: 1.0 },
          { val: 15, speed: 58, delay: 1.0 },
          { val: 15, speed: 60, delay: 1.0 },
          { val: 18, speed: 56, delay: 1.1 },
          { val: 18, speed: 56, delay: 1.1 },
          { val: 21, speed: 55, delay: 1.1 },
          { val: 24, speed: 54, delay: 1.2 },
          { val: 24, speed: 54, delay: 1.2 }
        ]
      },
      {
        title: '第二波：雙重因數合流衝鋒',
        tip: '6 = 2 × 3，18 = 2 × 3²，需要雙砲持續傾瀉火力！',
        enemies: [
          { val: 6, speed: 70, delay: 0.6 },
          { val: 9, speed: 68, delay: 0.6 },
          { val: 12, speed: 66, delay: 0.7 },
          { val: 12, speed: 66, delay: 0.7 },
          { val: 15, speed: 64, delay: 0.7 },
          { val: 18, speed: 62, delay: 0.8 },
          { val: 18, speed: 62, delay: 0.8 },
          { val: 21, speed: 62, delay: 0.8 },
          { val: 24, speed: 60, delay: 0.9 },
          { val: 24, speed: 60, delay: 0.9 },
          { val: 27, speed: 58, delay: 0.9 },
          { val: 30, speed: 58, delay: 0.9 },
          { val: 30, speed: 60, delay: 1.0 },
          { val: 36, speed: 56, delay: 1.0 },
          { val: 36, speed: 56, delay: 1.0 },
          { val: 42, speed: 54, delay: 1.1 },
          { val: 45, speed: 54, delay: 1.1 },
          { val: 48, speed: 52, delay: 1.2 },
          { val: 54, speed: 50, delay: 1.2 },
          { val: 60, speed: 50, delay: 1.3 }
        ]
      },
      {
        title: '第三波：雙數合流總攻狂潮',
        tip: '26 隻大軍密集湧出！在迷宮中央放置重砲升級！',
        enemies: [
          { val: 12, speed: 72, delay: 0.6 },
          { val: 15, speed: 70, delay: 0.6 },
          { val: 18, speed: 68, delay: 0.6 },
          { val: 18, speed: 68, delay: 0.7 },
          { val: 21, speed: 66, delay: 0.7 },
          { val: 24, speed: 65, delay: 0.7 },
          { val: 24, speed: 65, delay: 0.8 },
          { val: 27, speed: 64, delay: 0.8 },
          { val: 30, speed: 62, delay: 0.8 },
          { val: 33, speed: 62, delay: 0.8 },
          { val: 36, speed: 60, delay: 0.9 },
          { val: 36, speed: 60, delay: 0.9 },
          { val: 42, speed: 58, delay: 0.9 },
          { val: 45, speed: 58, delay: 0.9 },
          { val: 48, speed: 56, delay: 1.0 },
          { val: 48, speed: 56, delay: 1.0 },
          { val: 54, speed: 55, delay: 1.0 },
          { val: 60, speed: 54, delay: 1.1 },
          { val: 64, speed: 54, delay: 1.1 },
          { val: 72, speed: 52, delay: 1.1 },
          { val: 75, speed: 52, delay: 1.2 },
          { val: 84, speed: 50, delay: 1.2 },
          { val: 90, speed: 50, delay: 1.2 },
          { val: 96, speed: 48, delay: 1.3 },
          { val: 108, speed: 48, delay: 1.3 },
          { val: 120, speed: 46, delay: 1.4 }
        ]
      }
    ]
  },

  '1-3': {
    id: '1-3',
    chapterId: 'world-1',
    name: '1-3 五芒星谷（深邃三折谷）',
    subtitle: '五的倍數與三重複合怪縱深戰',
    tip: '💡 18 處基座！【√x 方根重力井】可暴擊秒解平方怪 (25, 36, 49, 64, 100)！搭配【×0 減速塔】與【7號重砲】鎖死全場！',
    nextLevelId: '1-4',
    initialGold: 420,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 100 },
        { x: 220, y: 100 },
        { x: 220, y: 450 },
        { x: 400, y: 450 },
        { x: 400, y: 140 },
        { x: 580, y: 140 },
        { x: 580, y: 450 },
        { x: 760, y: 450 },
        { x: 760, y: 180 },
        { x: 850, y: 180 },
        { x: 850, y: 320 },
        { x: 930, y: 320 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 50 },
      { id: 'p2', x: 120, y: 170 },
      { id: 'p3', x: 220, y: 250 },
      { id: 'p4', x: 310, y: 380 },
      { id: 'p5', x: 310, y: 240 },
      { id: 'p6', x: 310, y: 100 },
      { id: 'p7', x: 400, y: 280 },
      { id: 'p8', x: 490, y: 100 },
      { id: 'p9', x: 490, y: 240 },
      { id: 'p10', x: 490, y: 380 },
      { id: 'p11', x: 580, y: 280 },
      { id: 'p12', x: 670, y: 380 },
      { id: 'p13', x: 670, y: 240 },
      { id: 'p14', x: 670, y: 100 },
      { id: 'p15', x: 760, y: 280 },
      { id: 'p16', x: 850, y: 110 },
      { id: 'p17', x: 850, y: 390 },
      { id: 'p18', x: 920, y: 240 }
    ],
    waves: [
      {
        title: '第一波：五芒疾風陣',
        tip: '5, 10, 15, 20, 25 快速穿谷，在谷口佈置 5 號衝擊砲。',
        enemies: [
          { val: 5, speed: 70, delay: 0.7 },
          { val: 5, speed: 72, delay: 0.7 },
          { val: 10, speed: 65, delay: 0.7 },
          { val: 10, speed: 65, delay: 0.8 },
          { val: 15, speed: 62, delay: 0.8 },
          { val: 15, speed: 62, delay: 0.8 },
          { val: 20, speed: 60, delay: 0.9 },
          { val: 20, speed: 60, delay: 0.9 },
          { val: 25, speed: 58, delay: 0.9 },
          { val: 25, speed: 58, delay: 1.0 },
          { val: 30, speed: 56, delay: 1.0 },
          { val: 30, speed: 56, delay: 1.0 },
          { val: 35, speed: 55, delay: 1.1 },
          { val: 40, speed: 54, delay: 1.1 },
          { val: 45, speed: 52, delay: 1.2 },
          { val: 50, speed: 50, delay: 1.2 }
        ]
      },
      {
        title: '第二波：三十複合大衝鋒',
        tip: '30 = 2 × 3 × 5，三砲齊聚深谷火力交叉點！',
        enemies: [
          { val: 15, speed: 72, delay: 0.6 },
          { val: 20, speed: 70, delay: 0.6 },
          { val: 25, speed: 68, delay: 0.7 },
          { val: 30, speed: 66, delay: 0.7 },
          { val: 30, speed: 66, delay: 0.7 },
          { val: 35, speed: 64, delay: 0.8 },
          { val: 40, speed: 62, delay: 0.8 },
          { val: 40, speed: 62, delay: 0.8 },
          { val: 45, speed: 60, delay: 0.8 },
          { val: 45, speed: 60, delay: 0.9 },
          { val: 50, speed: 58, delay: 0.9 },
          { val: 55, speed: 58, delay: 0.9 },
          { val: 60, speed: 56, delay: 1.0 },
          { val: 60, speed: 56, delay: 1.0 },
          { val: 65, speed: 55, delay: 1.0 },
          { val: 70, speed: 54, delay: 1.1 },
          { val: 75, speed: 52, delay: 1.1 },
          { val: 80, speed: 52, delay: 1.1 },
          { val: 85, speed: 50, delay: 1.2 },
          { val: 90, speed: 50, delay: 1.2 },
          { val: 100, speed: 48, delay: 1.3 },
          { val: 105, speed: 48, delay: 1.3 }
        ]
      },
      {
        title: '第三波：百數星環極速狂潮',
        tip: '28 隻百級合數強行突圍！升級 3 級重砲擊碎耐受度！',
        enemies: [
          { val: 30, speed: 75, delay: 0.5 },
          { val: 35, speed: 72, delay: 0.6 },
          { val: 40, speed: 70, delay: 0.6 },
          { val: 45, speed: 68, delay: 0.6 },
          { val: 50, speed: 66, delay: 0.7 },
          { val: 55, speed: 65, delay: 0.7 },
          { val: 60, speed: 64, delay: 0.7 },
          { val: 60, speed: 64, delay: 0.8 },
          { val: 70, speed: 62, delay: 0.8 },
          { val: 75, speed: 62, delay: 0.8 },
          { val: 80, speed: 60, delay: 0.8 },
          { val: 85, speed: 60, delay: 0.9 },
          { val: 90, speed: 58, delay: 0.9 },
          { val: 95, speed: 58, delay: 0.9 },
          { val: 100, speed: 56, delay: 0.9 },
          { val: 105, speed: 56, delay: 1.0 },
          { val: 110, speed: 55, delay: 1.0 },
          { val: 120, speed: 54, delay: 1.0 },
          { val: 125, speed: 54, delay: 1.1 },
          { val: 135, speed: 52, delay: 1.1 },
          { val: 140, speed: 52, delay: 1.1 },
          { val: 150, speed: 50, delay: 1.2 },
          { val: 160, speed: 50, delay: 1.2 },
          { val: 175, speed: 48, delay: 1.2 },
          { val: 180, speed: 48, delay: 1.3 },
          { val: 200, speed: 46, delay: 1.3 },
          { val: 210, speed: 46, delay: 1.3 },
          { val: 240, speed: 45, delay: 1.4 }
        ]
      }
    ]
  },

  '1-4': {
    id: '1-4',
    chapterId: 'world-1',
    name: '1-4 【大魔王】合數泰坦【360】（要塞環防線）',
    subtitle: '第一章魔王要塞決戰',
    tip: '👑 18 處要塞基座！善用【×0 減速塔】凍結大軍，配合【√x 方根重力井】與【7號天琴砲】粉碎泰坦與護衛侍從！',
    nextLevelId: '2-1',
    initialGold: 520,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 280 },
        { x: 160, y: 280 },
        { x: 160, y: 110 },
        { x: 520, y: 110 },
        { x: 520, y: 230 },
        { x: 320, y: 230 },
        { x: 320, y: 440 },
        { x: 720, y: 440 },
        { x: 720, y: 180 },
        { x: 850, y: 180 },
        { x: 850, y: 340 },
        { x: 600, y: 340 },
        { x: 600, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 90, y: 210 },
      { id: 'p2', x: 90, y: 350 },
      { id: 'p3', x: 240, y: 180 },
      { id: 'p4', x: 380, y: 170 },
      { id: 'p5', x: 450, y: 170 },
      { id: 'p6', x: 240, y: 350 },
      { id: 'p7', x: 390, y: 300 },
      { id: 'p8', x: 450, y: 300 },
      { id: 'p9', x: 520, y: 370 },
      { id: 'p10', x: 450, y: 500 },
      { id: 'p11', x: 600, y: 440 },
      { id: 'p12', x: 650, y: 250 },
      { id: 'p13', x: 720, y: 110 },
      { id: 'p14', x: 720, y: 260 },
      { id: 'p15', x: 780, y: 380 },
      { id: 'p16', x: 780, y: 110 },
      { id: 'p17', x: 850, y: 410 },
      { id: 'p18', x: 850, y: 250 }
    ],
    waves: [
      {
        title: '第一波：泰坦重裝前鋒',
        tip: '迅速佈署並升級要塞內環重砲陣地。',
        enemies: [
          { val: 12, speed: 68, delay: 0.6 },
          { val: 15, speed: 66, delay: 0.7 },
          { val: 18, speed: 64, delay: 0.7 },
          { val: 18, speed: 64, delay: 0.8 },
          { val: 20, speed: 62, delay: 0.8 },
          { val: 24, speed: 60, delay: 0.8 },
          { val: 24, speed: 60, delay: 0.9 },
          { val: 28, speed: 58, delay: 0.9 },
          { val: 30, speed: 58, delay: 0.9 },
          { val: 30, speed: 60, delay: 1.0 },
          { val: 36, speed: 56, delay: 1.0 },
          { val: 36, speed: 56, delay: 1.0 },
          { val: 40, speed: 55, delay: 1.1 },
          { val: 45, speed: 54, delay: 1.1 },
          { val: 48, speed: 52, delay: 1.1 },
          { val: 54, speed: 52, delay: 1.2 },
          { val: 60, speed: 50, delay: 1.2 },
          { val: 72, speed: 48, delay: 1.3 }
        ]
      },
      {
        title: '第二波：泰坦護衛巨獸陣',
        tip: '大群複合怪物高速進犯，考驗火力持續性！',
        enemies: [
          { val: 30, speed: 70, delay: 0.6 },
          { val: 36, speed: 68, delay: 0.6 },
          { val: 40, speed: 66, delay: 0.7 },
          { val: 45, speed: 65, delay: 0.7 },
          { val: 48, speed: 64, delay: 0.7 },
          { val: 50, speed: 62, delay: 0.8 },
          { val: 54, speed: 62, delay: 0.8 },
          { val: 60, speed: 60, delay: 0.8 },
          { val: 60, speed: 60, delay: 0.8 },
          { val: 72, speed: 58, delay: 0.9 },
          { val: 75, speed: 58, delay: 0.9 },
          { val: 80, speed: 56, delay: 0.9 },
          { val: 90, speed: 56, delay: 1.0 },
          { val: 96, speed: 55, delay: 1.0 },
          { val: 100, speed: 54, delay: 1.0 },
          { val: 108, speed: 54, delay: 1.1 },
          { val: 120, speed: 52, delay: 1.1 },
          { val: 120, speed: 52, delay: 1.1 },
          { val: 135, speed: 50, delay: 1.2 },
          { val: 144, speed: 50, delay: 1.2 },
          { val: 150, speed: 48, delay: 1.2 },
          { val: 160, speed: 48, delay: 1.3 },
          { val: 180, speed: 46, delay: 1.3 },
          { val: 200, speed: 45, delay: 1.4 }
        ]
      },
      {
        title: '魔王波：合數泰坦【360】親衛大軍降臨！',
        tip: '集火泰坦！28 隻部隊掩護前進，全場火線全開！',
        enemies: [
          { val: 30, speed: 72, delay: 0.5 },
          { val: 36, speed: 70, delay: 0.6 },
          { val: 40, speed: 68, delay: 0.6 },
          { val: 45, speed: 66, delay: 0.6 },
          { val: 48, speed: 65, delay: 0.7 },
          { val: 50, speed: 64, delay: 0.7 },
          { val: 60, speed: 62, delay: 0.7 },
          { val: 64, speed: 62, delay: 0.8 },
          { val: 72, speed: 60, delay: 0.8 },
          { val: 80, speed: 60, delay: 0.8 },
          { val: 90, speed: 58, delay: 0.8 },
          { val: 96, speed: 58, delay: 0.9 },
          { val: 100, speed: 56, delay: 0.9 },
          { val: 108, speed: 56, delay: 0.9 },
          { val: 120, speed: 55, delay: 0.9 },
          { val: 120, speed: 55, delay: 1.0 },
          { val: 135, speed: 54, delay: 1.0 },
          { val: 144, speed: 54, delay: 1.0 },
          { val: 150, speed: 52, delay: 1.1 },
          { val: 160, speed: 52, delay: 1.1 },
          { val: 180, speed: 50, delay: 1.1 },
          { val: 192, speed: 50, delay: 1.2 },
          { val: 200, speed: 48, delay: 1.2 },
          { val: 216, speed: 48, delay: 1.2 },
          { val: 240, speed: 46, delay: 1.3 },
          { val: 270, speed: 45, delay: 1.3 },
          { val: 300, speed: 44, delay: 1.4 },
          {
            val: 360,
            delay: 2.2,
            isBoss: true,
            bossName: '合數泰坦【360】',
            speed: 28,
            bossSkills: ['multiply_aura', 'split_adds']
          }
        ]
      }
    ]
  },

  // ================= 第二章：負數深淵 =================
  '2-1': {
    id: '2-1',
    chapterId: 'world-2',
    name: '2-1 負向沼澤（折疊泥沼）',
    subtitle: '負數幽靈與前線淨化陣地',
    tip: '💡 17 處沼澤基座！紫色負數怪帶有護盾，需以「絕對值稜鏡」擊碎護盾轉正後方可除法！',
    nextLevelId: '2-2',
    initialGold: 480,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 120 },
        { x: 260, y: 120 },
        { x: 260, y: 320 },
        { x: 120, y: 320 },
        { x: 120, y: 460 },
        { x: 460, y: 460 },
        { x: 460, y: 220 },
        { x: 640, y: 220 },
        { x: 640, y: 440 },
        { x: 800, y: 440 },
        { x: 800, y: 180 },
        { x: 930, y: 180 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 80, y: 60 },
      { id: 'p2', x: 190, y: 60 },
      { id: 'p3', x: 190, y: 220 },
      { id: 'p4', x: 80, y: 250 },
      { id: 'p5', x: 80, y: 390 },
      { id: 'p6', x: 190, y: 390 },
      { id: 'p7', x: 360, y: 400 },
      { id: 'p8', x: 360, y: 260 },
      { id: 'p9', x: 460, y: 140 },
      { id: 'p10', x: 550, y: 150 },
      { id: 'p11', x: 550, y: 300 },
      { id: 'p12', x: 550, y: 440 },
      { id: 'p13', x: 720, y: 360 },
      { id: 'p14', x: 720, y: 220 },
      { id: 'p15', x: 720, y: 500 },
      { id: 'p16', x: 870, y: 250 },
      { id: 'p17', x: 870, y: 110 }
    ],
    waves: [
      {
        title: '第一波：幽靈沼澤疾走',
        tip: '在折疊彎道起點建造絕對值稜鏡！',
        enemies: [
          { val: -4, speed: 70, delay: 0.6 },
          { val: -4, speed: 70, delay: 0.7 },
          { val: 6, speed: 68, delay: 0.7 },
          { val: -6, speed: 66, delay: 0.7 },
          { val: 8, speed: 65, delay: 0.8 },
          { val: -8, speed: 64, delay: 0.8 },
          { val: 10, speed: 62, delay: 0.8 },
          { val: -10, speed: 62, delay: 0.9 },
          { val: 12, speed: 60, delay: 0.9 },
          { val: -12, speed: 60, delay: 0.9 },
          { val: 14, speed: 58, delay: 1.0 },
          { val: -15, speed: 58, delay: 1.0 },
          { val: 16, speed: 56, delay: 1.0 },
          { val: -18, speed: 56, delay: 1.1 },
          { val: 18, speed: 55, delay: 1.1 },
          { val: -20, speed: 54, delay: 1.1 },
          { val: 20, speed: 52, delay: 1.2 },
          { val: -24, speed: 50, delay: 1.2 }
        ]
      },
      {
        title: '第二波：正負交錯大奔流',
        tip: '正負交錯進軍！多重稜鏡與重砲連線！',
        enemies: [
          { val: -10, speed: 72, delay: 0.6 },
          { val: 12, speed: 70, delay: 0.6 },
          { val: -12, speed: 68, delay: 0.6 },
          { val: 14, speed: 66, delay: 0.7 },
          { val: -15, speed: 66, delay: 0.7 },
          { val: 16, speed: 64, delay: 0.7 },
          { val: -18, speed: 64, delay: 0.8 },
          { val: 18, speed: 62, delay: 0.8 },
          { val: -20, speed: 62, delay: 0.8 },
          { val: 20, speed: 60, delay: 0.8 },
          { val: -24, speed: 60, delay: 0.9 },
          { val: 24, speed: 58, delay: 0.9 },
          { val: -27, speed: 58, delay: 0.9 },
          { val: -30, speed: 56, delay: 1.0 },
          { val: 32, speed: 56, delay: 1.0 },
          { val: -36, speed: 55, delay: 1.0 },
          { val: 36, speed: 54, delay: 1.1 },
          { val: -40, speed: 54, delay: 1.1 },
          { val: 42, speed: 52, delay: 1.1 },
          { val: -45, speed: 52, delay: 1.2 },
          { val: 48, speed: 50, delay: 1.2 },
          { val: -50, speed: 50, delay: 1.2 },
          { val: 54, speed: 48, delay: 1.3 },
          { val: -60, speed: 48, delay: 1.3 }
        ]
      },
      {
        title: '第三波：負數深淵總攻浪潮',
        tip: '28 隻高速大軍！密集護盾群需快速擊碎！',
        enemies: [
          { val: -20, speed: 76, delay: 0.5 },
          { val: 24, speed: 74, delay: 0.5 },
          { val: -24, speed: 72, delay: 0.6 },
          { val: 28, speed: 70, delay: 0.6 },
          { val: -30, speed: 68, delay: 0.6 },
          { val: 30, speed: 68, delay: 0.7 },
          { val: -36, speed: 66, delay: 0.7 },
          { val: 36, speed: 66, delay: 0.7 },
          { val: -40, speed: 64, delay: 0.8 },
          { val: 40, speed: 64, delay: 0.8 },
          { val: -45, speed: 62, delay: 0.8 },
          { val: 48, speed: 62, delay: 0.8 },
          { val: -50, speed: 60, delay: 0.9 },
          { val: 54, speed: 60, delay: 0.9 },
          { val: -60, speed: 58, delay: 0.9 },
          { val: 60, speed: 58, delay: 0.9 },
          { val: -64, speed: 56, delay: 1.0 },
          { val: 66, speed: 56, delay: 1.0 },
          { val: -72, speed: 55, delay: 1.0 },
          { val: 75, speed: 54, delay: 1.1 },
          { val: -80, speed: 54, delay: 1.1 },
          { val: 84, speed: 52, delay: 1.1 },
          { val: -90, speed: 52, delay: 1.2 },
          { val: 96, speed: 50, delay: 1.2 },
          { val: -100, speed: 50, delay: 1.2 },
          { val: 108, speed: 48, delay: 1.3 },
          { val: -120, speed: 48, delay: 1.3 },
          { val: 120, speed: 46, delay: 1.4 }
        ]
      }
    ]
  },

  '2-2': {
    id: '2-2',
    chapterId: 'world-2',
    name: '2-2 雙路夾擊（★ 對稱絞殺防線）',
    subtitle: '雙起點分流，立體迂迴交匯中路',
    tip: '⚠️ 20 處全域防守基座！上下兩路對稱蜿蜒，在中路長廊激戰！請均衡配置雙路與中路重砲！',
    nextLevelId: '2-3',
    initialGold: 600,
    initialLives: 10,
    lanes: [
      // 上路 (Lane 0)
      [
        { x: 30, y: 100 },
        { x: 240, y: 100 },
        { x: 240, y: 220 },
        { x: 420, y: 220 },
        { x: 420, y: 120 },
        { x: 620, y: 120 },
        { x: 620, y: 280 },
        { x: 800, y: 280 },
        { x: 930, y: 280 }
      ],
      // 下路 (Lane 1)
      [
        { x: 30, y: 460 },
        { x: 240, y: 460 },
        { x: 240, y: 340 },
        { x: 420, y: 340 },
        { x: 420, y: 440 },
        { x: 620, y: 440 },
        { x: 620, y: 280 },
        { x: 800, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 50 },
      { id: 'p2', x: 120, y: 170 },
      { id: 'p3', x: 240, y: 40 },
      { id: 'p4', x: 330, y: 160 },
      { id: 'p5', x: 330, y: 280 },
      { id: 'p6', x: 520, y: 60 },
      { id: 'p7', x: 520, y: 180 },
      { id: 'p8', x: 120, y: 510 },
      { id: 'p9', x: 120, y: 390 },
      { id: 'p10', x: 240, y: 520 },
      { id: 'p11', x: 330, y: 400 },
      { id: 'p12', x: 520, y: 500 },
      { id: 'p13', x: 520, y: 380 },
      { id: 'p14', x: 420, y: 280 },
      { id: 'p15', x: 520, y: 280 },
      { id: 'p16', x: 620, y: 200 },
      { id: 'p17', x: 620, y: 360 },
      { id: 'p18', x: 720, y: 210 },
      { id: 'p19', x: 720, y: 350 },
      { id: 'p20', x: 860, y: 210 }
    ],
    waves: [
      {
        title: '第一波：雙線疾行試探',
        tip: '上路走正數、下路走負數！於交匯處前建立雙防線。',
        enemies: [
          { val: 6, lane: 0, speed: 70, delay: 0.6 },
          { val: -6, lane: 1, speed: 70, delay: 0.6 },
          { val: 8, lane: 0, speed: 68, delay: 0.7 },
          { val: -8, lane: 1, speed: 68, delay: 0.7 },
          { val: 10, lane: 0, speed: 65, delay: 0.7 },
          { val: -10, lane: 1, speed: 65, delay: 0.7 },
          { val: 12, lane: 0, speed: 62, delay: 0.8 },
          { val: -12, lane: 1, speed: 62, delay: 0.8 },
          { val: 14, lane: 0, speed: 60, delay: 0.8 },
          { val: -14, lane: 1, speed: 60, delay: 0.8 },
          { val: 16, lane: 0, speed: 60, delay: 0.9 },
          { val: -15, lane: 1, speed: 60, delay: 0.9 },
          { val: 18, lane: 0, speed: 58, delay: 0.9 },
          { val: -18, lane: 1, speed: 58, delay: 0.9 },
          { val: 20, lane: 0, speed: 56, delay: 1.0 },
          { val: -20, lane: 1, speed: 56, delay: 1.0 },
          { val: 24, lane: 0, speed: 55, delay: 1.0 },
          { val: -24, lane: 1, speed: 55, delay: 1.0 },
          { val: 28, lane: 0, speed: 54, delay: 1.1 },
          { val: -28, lane: 1, speed: 54, delay: 1.1 },
          { val: 30, lane: 0, speed: 52, delay: 1.1 },
          { val: -30, lane: 1, speed: 52, delay: 1.1 }
        ]
      },
      {
        title: '第二波：雙線齊發疾走狂潮',
        tip: '上下兩路 28 隻高速怪同時湧入！在中路放置 3 級重砲收割！',
        enemies: [
          { val: 12, lane: 0, speed: 74, delay: 0.5 },
          { val: -12, lane: 1, speed: 74, delay: 0.5 },
          { val: 15, lane: 0, speed: 72, delay: 0.6 },
          { val: -15, lane: 1, speed: 72, delay: 0.6 },
          { val: 18, lane: 0, speed: 70, delay: 0.6 },
          { val: -18, lane: 1, speed: 70, delay: 0.6 },
          { val: 20, lane: 0, speed: 68, delay: 0.7 },
          { val: -20, lane: 1, speed: 68, delay: 0.7 },
          { val: 24, lane: 0, speed: 66, delay: 0.7 },
          { val: -24, lane: 1, speed: 66, delay: 0.7 },
          { val: 27, lane: 0, speed: 65, delay: 0.8 },
          { val: -27, lane: 1, speed: 65, delay: 0.8 },
          { val: 30, lane: 0, speed: 64, delay: 0.8 },
          { val: -30, lane: 1, speed: 64, delay: 0.8 },
          { val: 36, lane: 0, speed: 62, delay: 0.8 },
          { val: -36, lane: 1, speed: 62, delay: 0.8 },
          { val: 40, lane: 0, speed: 60, delay: 0.9 },
          { val: -40, lane: 1, speed: 60, delay: 0.9 },
          { val: 45, lane: 0, speed: 58, delay: 0.9 },
          { val: -45, lane: 1, speed: 58, delay: 0.9 },
          { val: 48, lane: 0, speed: 56, delay: 1.0 },
          { val: -48, lane: 1, speed: 56, delay: 1.0 },
          { val: 54, lane: 0, speed: 55, delay: 1.0 },
          { val: -54, lane: 1, speed: 55, delay: 1.0 },
          { val: 60, lane: 0, speed: 54, delay: 1.1 },
          { val: -60, lane: 1, speed: 54, delay: 1.1 },
          { val: 64, lane: 0, speed: 52, delay: 1.1 },
          { val: -64, lane: 1, speed: 52, delay: 1.1 }
        ]
      },
      {
        title: '第三波：雙線總攻巨陣大決戰',
        tip: '34 隻高強度合數與負數幽靈大軍全面衝鋒！',
        enemies: [
          { val: 30, lane: 0, speed: 78, delay: 0.5 },
          { val: -30, lane: 1, speed: 78, delay: 0.5 },
          { val: 36, lane: 0, speed: 75, delay: 0.5 },
          { val: -36, lane: 1, speed: 75, delay: 0.5 },
          { val: 40, lane: 0, speed: 72, delay: 0.6 },
          { val: -40, lane: 1, speed: 72, delay: 0.6 },
          { val: 45, lane: 0, speed: 70, delay: 0.6 },
          { val: -45, lane: 1, speed: 70, delay: 0.6 },
          { val: 50, lane: 0, speed: 68, delay: 0.7 },
          { val: -50, lane: 1, speed: 68, delay: 0.7 },
          { val: 60, lane: 0, speed: 66, delay: 0.7 },
          { val: -60, lane: 1, speed: 66, delay: 0.7 },
          { val: 64, lane: 0, speed: 65, delay: 0.7 },
          { val: -64, lane: 1, speed: 65, delay: 0.7 },
          { val: 72, lane: 0, speed: 64, delay: 0.8 },
          { val: -72, lane: 1, speed: 64, delay: 0.8 },
          { val: 80, lane: 0, speed: 62, delay: 0.8 },
          { val: -80, lane: 1, speed: 62, delay: 0.8 },
          { val: 90, lane: 0, speed: 60, delay: 0.9 },
          { val: -90, lane: 1, speed: 60, delay: 0.9 },
          { val: 96, lane: 0, speed: 58, delay: 0.9 },
          { val: -96, lane: 1, speed: 58, delay: 0.9 },
          { val: 100, lane: 0, speed: 56, delay: 0.9 },
          { val: -100, lane: 1, speed: 56, delay: 0.9 },
          { val: 108, lane: 0, speed: 55, delay: 1.0 },
          { val: -108, lane: 1, speed: 55, delay: 1.0 },
          { val: 120, lane: 0, speed: 54, delay: 1.0 },
          { val: -120, lane: 1, speed: 54, delay: 1.0 },
          { val: 135, lane: 0, speed: 52, delay: 1.1 },
          { val: -135, lane: 1, speed: 52, delay: 1.1 },
          { val: 150, lane: 0, speed: 50, delay: 1.1 },
          { val: -150, lane: 1, speed: 50, delay: 1.1 },
          { val: 180, lane: 0, speed: 48, delay: 1.2 },
          { val: -180, lane: 1, speed: 48, delay: 1.2 }
        ]
      }
    ]
  },

  '2-3': {
    id: '2-3',
    chapterId: 'world-2',
    name: '2-3 質數衝擊（蜿蜒量子迴廊）',
    subtitle: '運算子調整塔 (+1 / -1) 關鍵戰略',
    tip: '⚡ 18 處基座！質數怪（7, 11, 13, 17, 19...）需由運算子調整塔微調化為合數後分解！',
    nextLevelId: '2-4',
    initialGold: 550,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 180 },
        { x: 180, y: 180 },
        { x: 180, y: 380 },
        { x: 360, y: 380 },
        { x: 360, y: 140 },
        { x: 540, y: 140 },
        { x: 540, y: 420 },
        { x: 720, y: 420 },
        { x: 720, y: 160 },
        { x: 860, y: 160 },
        { x: 860, y: 320 },
        { x: 930, y: 320 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 100, y: 110 },
      { id: 'p2', x: 100, y: 260 },
      { id: 'p3', x: 180, y: 450 },
      { id: 'p4', x: 270, y: 310 },
      { id: 'p5', x: 270, y: 170 },
      { id: 'p6', x: 360, y: 70 },
      { id: 'p7', x: 450, y: 210 },
      { id: 'p8', x: 450, y: 350 },
      { id: 'p9', x: 540, y: 70 },
      { id: 'p10', x: 540, y: 490 },
      { id: 'p11', x: 630, y: 210 },
      { id: 'p12', x: 630, y: 350 },
      { id: 'p13', x: 720, y: 90 },
      { id: 'p14', x: 720, y: 490 },
      { id: 'p15', x: 790, y: 230 },
      { id: 'p16', x: 790, y: 390 },
      { id: 'p17', x: 860, y: 90 },
      { id: 'p18', x: 920, y: 240 }
    ],
    waves: [
      {
        title: '第一波：幸運之七狂奔',
        tip: '怪物 7 無法整除！前線配置運算子塔進行 7 - 1 = 6 微調！',
        enemies: [
          { val: 7, speed: 72, delay: 0.6 },
          { val: 6, speed: 70, delay: 0.6 },
          { val: 7, speed: 72, delay: 0.7 },
          { val: 8, speed: 68, delay: 0.7 },
          { val: 7, speed: 72, delay: 0.7 },
          { val: 10, speed: 66, delay: 0.8 },
          { val: 11, speed: 65, delay: 0.8 },
          { val: 12, speed: 64, delay: 0.8 },
          { val: 7, speed: 72, delay: 0.9 },
          { val: 14, speed: 62, delay: 0.9 },
          { val: 11, speed: 65, delay: 0.9 },
          { val: 15, speed: 60, delay: 1.0 },
          { val: 13, speed: 64, delay: 1.0 },
          { val: 16, speed: 58, delay: 1.0 },
          { val: 17, speed: 62, delay: 1.1 },
          { val: 18, speed: 56, delay: 1.1 },
          { val: 19, speed: 60, delay: 1.2 },
          { val: 20, speed: 54, delay: 1.2 }
        ]
      },
      {
        title: '第二波：質數雙雄 (11 與 13) 突進',
        tip: '11 ± 1 與 13 - 1！升級運算子塔擴大微調範圍！',
        enemies: [
          { val: 11, speed: 74, delay: 0.6 },
          { val: 12, speed: 72, delay: 0.6 },
          { val: 13, speed: 74, delay: 0.6 },
          { val: 14, speed: 70, delay: 0.7 },
          { val: 13, speed: 74, delay: 0.7 },
          { val: 15, speed: 68, delay: 0.7 },
          { val: -11, speed: 66, delay: 0.8 },
          { val: 16, speed: 66, delay: 0.8 },
          { val: 17, speed: 65, delay: 0.8 },
          { val: 18, speed: 64, delay: 0.8 },
          { val: 19, speed: 64, delay: 0.9 },
          { val: 20, speed: 62, delay: 0.9 },
          { val: 21, speed: 62, delay: 0.9 },
          { val: 22, speed: 60, delay: 1.0 },
          { val: -13, speed: 60, delay: 1.0 },
          { val: 24, speed: 58, delay: 1.0 },
          { val: 26, speed: 58, delay: 1.1 },
          { val: 28, speed: 56, delay: 1.1 },
          { val: 29, speed: 56, delay: 1.1 },
          { val: 30, speed: 54, delay: 1.2 },
          { val: 31, speed: 54, delay: 1.2 },
          { val: 36, speed: 52, delay: 1.2 },
          { val: 40, speed: 50, delay: 1.3 },
          { val: 42, speed: 50, delay: 1.3 }
        ]
      },
      {
        title: '第三波：全質數混合大突擊狂潮',
        tip: '30 隻質數與負數高速部隊！多座運算子塔與質數砲群聯合封鎖！',
        enemies: [
          { val: 7, speed: 78, delay: 0.5 },
          { val: -13, speed: 75, delay: 0.5 },
          { val: 17, speed: 74, delay: 0.6 },
          { val: 18, speed: 72, delay: 0.6 },
          { val: 19, speed: 72, delay: 0.6 },
          { val: 20, speed: 70, delay: 0.7 },
          { val: 23, speed: 70, delay: 0.7 },
          { val: 24, speed: 68, delay: 0.7 },
          { val: 26, speed: 68, delay: 0.7 },
          { val: 28, speed: 66, delay: 0.8 },
          { val: 29, speed: 66, delay: 0.8 },
          { val: 30, speed: 64, delay: 0.8 },
          { val: 31, speed: 64, delay: 0.8 },
          { val: 32, speed: 62, delay: 0.9 },
          { val: -17, speed: 62, delay: 0.9 },
          { val: 36, speed: 60, delay: 0.9 },
          { val: 37, speed: 60, delay: 0.9 },
          { val: 40, speed: 58, delay: 1.0 },
          { val: 41, speed: 58, delay: 1.0 },
          { val: 42, speed: 56, delay: 1.0 },
          { val: 43, speed: 56, delay: 1.1 },
          { val: 45, speed: 55, delay: 1.1 },
          { val: -23, speed: 54, delay: 1.1 },
          { val: 47, speed: 54, delay: 1.2 },
          { val: 50, speed: 52, delay: 1.2 },
          { val: 53, speed: 52, delay: 1.2 },
          { val: 60, speed: 50, delay: 1.3 },
          { val: 70, speed: 50, delay: 1.3 },
          { val: 80, speed: 48, delay: 1.3 },
          { val: 90, speed: 46, delay: 1.4 }
        ]
      }
    ]
  },

  '2-4': {
    id: '2-4',
    chapterId: 'world-2',
    name: '2-4 【大魔王】極性虛空領主【-720】（雙螺旋終焉要塞）',
    subtitle: '雙路深淵終極大決戰',
    tip: '👑 20 處要塞基座！魔王帶有 -720 負數護盾且極具耐受度！善用多層稜鏡、運算子與 3 級質數重砲集火！',
    nextLevelId: null,
    initialGold: 700,
    initialLives: 10,
    lanes: [
      // 上路 (Lane 0)
      [
        { x: 30, y: 120 },
        { x: 200, y: 120 },
        { x: 200, y: 240 },
        { x: 380, y: 240 },
        { x: 380, y: 100 },
        { x: 580, y: 100 },
        { x: 580, y: 240 },
        { x: 720, y: 240 },
        { x: 720, y: 280 },
        { x: 930, y: 280 }
      ],
      // 下路 (Lane 1)
      [
        { x: 30, y: 440 },
        { x: 200, y: 440 },
        { x: 200, y: 320 },
        { x: 380, y: 320 },
        { x: 380, y: 460 },
        { x: 580, y: 460 },
        { x: 580, y: 320 },
        { x: 720, y: 320 },
        { x: 720, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 100, y: 60 },
      { id: 'p2', x: 100, y: 190 },
      { id: 'p3', x: 200, y: 50 },
      { id: 'p4', x: 290, y: 170 },
      { id: 'p5', x: 290, y: 300 },
      { id: 'p6', x: 480, y: 50 },
      { id: 'p7', x: 480, y: 170 },
      { id: 'p8', x: 100, y: 500 },
      { id: 'p9', x: 100, y: 370 },
      { id: 'p10', x: 200, y: 510 },
      { id: 'p11', x: 290, y: 390 },
      { id: 'p12', x: 480, y: 510 },
      { id: 'p13', x: 480, y: 390 },
      { id: 'p14', x: 380, y: 280 },
      { id: 'p15', x: 580, y: 170 },
      { id: 'p16', x: 580, y: 390 },
      { id: 'p17', x: 650, y: 170 },
      { id: 'p18', x: 650, y: 390 },
      { id: 'p19', x: 780, y: 210 },
      { id: 'p20', x: 780, y: 350 }
    ],
    waves: [
      {
        title: '第一波：虛空精銳雙線突進',
        tip: '迅速佈置上下前線稜鏡與主力質數砲。',
        enemies: [
          { val: 14, lane: 0, speed: 72, delay: 0.6 },
          { val: -15, lane: 1, speed: 72, delay: 0.6 },
          { val: 18, lane: 0, speed: 70, delay: 0.6 },
          { val: -18, lane: 1, speed: 70, delay: 0.6 },
          { val: 20, lane: 0, speed: 68, delay: 0.7 },
          { val: -20, lane: 1, speed: 68, delay: 0.7 },
          { val: 22, lane: 0, speed: 66, delay: 0.7 },
          { val: -24, lane: 1, speed: 66, delay: 0.7 },
          { val: 26, lane: 0, speed: 65, delay: 0.8 },
          { val: -28, lane: 1, speed: 65, delay: 0.8 },
          { val: 30, lane: 0, speed: 64, delay: 0.8 },
          { val: -30, lane: 1, speed: 64, delay: 0.8 },
          { val: 32, lane: 0, speed: 62, delay: 0.9 },
          { val: -36, lane: 1, speed: 62, delay: 0.9 },
          { val: 40, lane: 0, speed: 60, delay: 0.9 },
          { val: -40, lane: 1, speed: 60, delay: 0.9 },
          { val: 45, lane: 0, speed: 58, delay: 1.0 },
          { val: -48, lane: 1, speed: 58, delay: 1.0 },
          { val: 50, lane: 0, speed: 56, delay: 1.0 },
          { val: -54, lane: 1, speed: 56, delay: 1.0 },
          { val: 60, lane: 0, speed: 54, delay: 1.1 },
          { val: -60, lane: 1, speed: 54, delay: 1.1 }
        ]
      },
      {
        title: '第二波：深淵精銳軍團大衝鋒',
        tip: '28 隻高速大軍狂湧！在中路交匯處打造絕殺陷阱！',
        enemies: [
          { val: -24, lane: 0, speed: 75, delay: 0.5 },
          { val: 24, lane: 1, speed: 75, delay: 0.5 },
          { val: -27, lane: 0, speed: 72, delay: 0.6 },
          { val: 28, lane: 1, speed: 72, delay: 0.6 },
          { val: -30, lane: 0, speed: 70, delay: 0.6 },
          { val: 32, lane: 1, speed: 70, delay: 0.6 },
          { val: -35, lane: 0, speed: 68, delay: 0.7 },
          { val: 36, lane: 1, speed: 68, delay: 0.7 },
          { val: -40, lane: 0, speed: 66, delay: 0.7 },
          { val: 42, lane: 1, speed: 66, delay: 0.7 },
          { val: -45, lane: 0, speed: 65, delay: 0.8 },
          { val: 48, lane: 1, speed: 65, delay: 0.8 },
          { val: -50, lane: 0, speed: 64, delay: 0.8 },
          { val: 54, lane: 1, speed: 64, delay: 0.8 },
          { val: -60, lane: 0, speed: 62, delay: 0.8 },
          { val: 60, lane: 1, speed: 62, delay: 0.8 },
          { val: -72, lane: 0, speed: 60, delay: 0.9 },
          { val: 75, lane: 1, speed: 60, delay: 0.9 },
          { val: -80, lane: 0, speed: 58, delay: 0.9 },
          { val: 90, lane: 1, speed: 58, delay: 0.9 },
          { val: -96, lane: 0, speed: 56, delay: 1.0 },
          { val: 100, lane: 1, speed: 56, delay: 1.0 },
          { val: -108, lane: 0, speed: 55, delay: 1.0 },
          { val: 120, lane: 1, speed: 55, delay: 1.0 },
          { val: -120, lane: 0, speed: 54, delay: 1.1 },
          { val: 135, lane: 1, speed: 54, delay: 1.1 },
          { val: -150, lane: 0, speed: 52, delay: 1.1 },
          { val: 180, lane: 1, speed: 50, delay: 1.2 }
        ]
      },
      {
        title: '終焉魔王波：極性虛空領主【-720】親征！',
        tip: '34 隻親衛大軍與魔王親臨！全軍集中火力轟碎虛空護盾與耐受度！',
        enemies: [
          { val: -30, lane: 0, speed: 78, delay: 0.5 },
          { val: 30, lane: 1, speed: 78, delay: 0.5 },
          { val: -36, lane: 0, speed: 75, delay: 0.5 },
          { val: 36, lane: 1, speed: 75, delay: 0.5 },
          { val: -40, lane: 0, speed: 72, delay: 0.6 },
          { val: 40, lane: 1, speed: 72, delay: 0.6 },
          { val: -45, lane: 0, speed: 70, delay: 0.6 },
          { val: 48, lane: 1, speed: 70, delay: 0.6 },
          { val: -50, lane: 0, speed: 68, delay: 0.7 },
          { val: 54, lane: 1, speed: 68, delay: 0.7 },
          { val: -60, lane: 0, speed: 66, delay: 0.7 },
          { val: 60, lane: 1, speed: 66, delay: 0.7 },
          { val: -72, lane: 0, speed: 65, delay: 0.8 },
          { val: 80, lane: 1, speed: 65, delay: 0.8 },
          { val: -90, lane: 0, speed: 64, delay: 0.8 },
          { val: 100, lane: 1, speed: 64, delay: 0.8 },
          { val: -108, lane: 0, speed: 62, delay: 0.8 },
          { val: 120, lane: 1, speed: 62, delay: 0.9 },
          { val: -120, lane: 0, speed: 60, delay: 0.9 },
          { val: 135, lane: 1, speed: 60, delay: 0.9 },
          { val: -144, lane: 0, speed: 58, delay: 0.9 },
          { val: 150, lane: 1, speed: 58, delay: 1.0 },
          { val: -160, lane: 0, speed: 56, delay: 1.0 },
          { val: 180, lane: 1, speed: 56, delay: 1.0 },
          { val: -192, lane: 0, speed: 55, delay: 1.1 },
          { val: 200, lane: 1, speed: 55, delay: 1.1 },
          { val: -216, lane: 0, speed: 54, delay: 1.1 },
          { val: 240, lane: 1, speed: 54, delay: 1.2 },
          { val: -270, lane: 0, speed: 52, delay: 1.2 },
          { val: 300, lane: 1, speed: 50, delay: 1.2 },
          { val: -360, lane: 0, speed: 48, delay: 1.3 },
          { val: 360, lane: 1, speed: 48, delay: 1.3 },
          { val: -480, lane: 0, speed: 46, delay: 1.4 },
          {
            val: -720,
            lane: 0,
            delay: 2.5,
            isBoss: true,
            bossName: '極性虛空領主【-720】'
          },
          { val: 20, speed: 70, delay: 0.7 },
          { val: 23, speed: 70, delay: 0.7 },
          { val: 24, speed: 68, delay: 0.7 },
          { val: 26, speed: 68, delay: 0.7 },
          { val: 28, speed: 66, delay: 0.8 },
          { val: 29, speed: 66, delay: 0.8 },
          { val: 30, speed: 64, delay: 0.8 },
          { val: 31, speed: 64, delay: 0.8 },
          { val: 32, speed: 62, delay: 0.9 },
          { val: -17, speed: 62, delay: 0.9 },
          { val: 36, speed: 60, delay: 0.9 },
          { val: 37, speed: 60, delay: 0.9 },
          { val: 40, speed: 58, delay: 1.0 },
          { val: 41, speed: 58, delay: 1.0 },
          { val: 42, speed: 56, delay: 1.0 },
          { val: 43, speed: 56, delay: 1.1 },
          { val: 45, speed: 55, delay: 1.1 },
          { val: -23, speed: 54, delay: 1.1 },
          { val: 47, speed: 54, delay: 1.2 },
          { val: 50, speed: 52, delay: 1.2 },
          { val: 53, speed: 52, delay: 1.2 },
          { val: 60, speed: 50, delay: 1.3 },
          { val: 70, speed: 50, delay: 1.3 },
          { val: 80, speed: 48, delay: 1.3 },
          { val: 90, speed: 46, delay: 1.4 }
        ]
      }
    ]
  },

  '2-4': {
    id: '2-4',
    chapterId: 'world-2',
    name: '2-4 【大魔王】極性虛空領主【-720】（雙螺旋終焉要塞）',
    subtitle: '雙路深淵終極大決戰',
    tip: '👑 20 處要塞基座！魔王帶有 -720 負數護盾且極具耐受度！善用多層稜鏡、運算子與 3 級質數重砲集火！',
    nextLevelId: '3-1',
    initialGold: 700,
    initialLives: 10,
    lanes: [
      // 上路 (Lane 0)
      [
        { x: 30, y: 120 },
        { x: 200, y: 120 },
        { x: 200, y: 240 },
        { x: 380, y: 240 },
        { x: 380, y: 100 },
        { x: 580, y: 100 },
        { x: 580, y: 240 },
        { x: 720, y: 240 },
        { x: 720, y: 280 },
        { x: 930, y: 280 }
      ],
      // 下路 (Lane 1)
      [
        { x: 30, y: 440 },
        { x: 200, y: 440 },
        { x: 200, y: 320 },
        { x: 380, y: 320 },
        { x: 380, y: 460 },
        { x: 580, y: 460 },
        { x: 580, y: 320 },
        { x: 720, y: 320 },
        { x: 720, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 100, y: 60 },
      { id: 'p2', x: 100, y: 190 },
      { id: 'p3', x: 200, y: 50 },
      { id: 'p4', x: 290, y: 170 },
      { id: 'p5', x: 290, y: 300 },
      { id: 'p6', x: 480, y: 50 },
      { id: 'p7', x: 480, y: 170 },
      { id: 'p8', x: 100, y: 500 },
      { id: 'p9', x: 100, y: 370 },
      { id: 'p10', x: 200, y: 510 },
      { id: 'p11', x: 290, y: 390 },
      { id: 'p12', x: 480, y: 510 },
      { id: 'p13', x: 480, y: 390 },
      { id: 'p14', x: 380, y: 280 },
      { id: 'p15', x: 580, y: 170 },
      { id: 'p16', x: 580, y: 390 },
      { id: 'p17', x: 650, y: 170 },
      { id: 'p18', x: 650, y: 390 },
      { id: 'p19', x: 780, y: 210 },
      { id: 'p20', x: 780, y: 350 }
    ],
    waves: [
      {
        title: '第一波：虛空精銳雙線突進',
        tip: '迅速佈置上下前線稜鏡與主力質數砲。',
        enemies: [
          { val: 14, lane: 0, speed: 72, delay: 0.6 },
          { val: -15, lane: 1, speed: 72, delay: 0.6 },
          { val: 18, lane: 0, speed: 70, delay: 0.6 },
          { val: -18, lane: 1, speed: 70, delay: 0.6 },
          { val: 20, lane: 0, speed: 68, delay: 0.7 },
          { val: -20, lane: 1, speed: 68, delay: 0.7 },
          { val: 22, lane: 0, speed: 66, delay: 0.7 },
          { val: -24, lane: 1, speed: 66, delay: 0.7 },
          { val: 26, lane: 0, speed: 65, delay: 0.8 },
          { val: -28, lane: 1, speed: 65, delay: 0.8 },
          { val: 30, lane: 0, speed: 64, delay: 0.8 },
          { val: -30, lane: 1, speed: 64, delay: 0.8 },
          { val: 32, lane: 0, speed: 62, delay: 0.9 },
          { val: -36, lane: 1, speed: 62, delay: 0.9 },
          { val: 40, lane: 0, speed: 60, delay: 0.9 },
          { val: -40, lane: 1, speed: 60, delay: 0.9 },
          { val: 45, lane: 0, speed: 58, delay: 1.0 },
          { val: -48, lane: 1, speed: 58, delay: 1.0 },
          { val: 50, lane: 0, speed: 56, delay: 1.0 },
          { val: -54, lane: 1, speed: 56, delay: 1.0 },
          { val: 60, lane: 0, speed: 54, delay: 1.1 },
          { val: -60, lane: 1, speed: 54, delay: 1.1 }
        ]
      },
      {
        title: '第二波：深淵精銳軍團大衝鋒',
        tip: '28 隻高速大軍狂湧！在中路交匯處打造絕殺陷阱！',
        enemies: [
          { val: -24, lane: 0, speed: 75, delay: 0.5 },
          { val: 24, lane: 1, speed: 75, delay: 0.5 },
          { val: -27, lane: 0, speed: 72, delay: 0.6 },
          { val: 28, lane: 1, speed: 72, delay: 0.6 },
          { val: -30, lane: 0, speed: 70, delay: 0.6 },
          { val: 32, lane: 1, speed: 70, delay: 0.6 },
          { val: -35, lane: 0, speed: 68, delay: 0.7 },
          { val: 36, lane: 1, speed: 68, delay: 0.7 },
          { val: -40, lane: 0, speed: 66, delay: 0.7 },
          { val: 42, lane: 1, speed: 66, delay: 0.7 },
          { val: -45, lane: 0, speed: 65, delay: 0.8 },
          { val: 48, lane: 1, speed: 65, delay: 0.8 },
          { val: -50, lane: 0, speed: 64, delay: 0.8 },
          { val: 54, lane: 1, speed: 64, delay: 0.8 },
          { val: -60, lane: 0, speed: 62, delay: 0.8 },
          { val: 60, lane: 1, speed: 62, delay: 0.8 },
          { val: -72, lane: 0, speed: 60, delay: 0.9 },
          { val: 75, lane: 1, speed: 60, delay: 0.9 },
          { val: -80, lane: 0, speed: 58, delay: 0.9 },
          { val: 90, lane: 1, speed: 58, delay: 0.9 },
          { val: -96, lane: 0, speed: 56, delay: 1.0 },
          { val: 100, lane: 1, speed: 56, delay: 1.0 },
          { val: -108, lane: 0, speed: 55, delay: 1.0 },
          { val: 120, lane: 1, speed: 55, delay: 1.0 },
          { val: -120, lane: 0, speed: 54, delay: 1.1 },
          { val: 135, lane: 1, speed: 54, delay: 1.1 },
          { val: -150, lane: 0, speed: 52, delay: 1.1 },
          { val: 180, lane: 1, speed: 50, delay: 1.2 }
        ]
      },
      {
        title: '終焉魔王波：極性虛空領主【-720】親征！',
        tip: '34 隻親衛大軍與魔王親臨！全軍集中火力轟碎虛空護盾與耐受度！',
        enemies: [
          { val: -30, lane: 0, speed: 78, delay: 0.5 },
          { val: 30, lane: 1, speed: 78, delay: 0.5 },
          { val: -36, lane: 0, speed: 75, delay: 0.5 },
          { val: 36, lane: 1, speed: 75, delay: 0.5 },
          { val: -40, lane: 0, speed: 72, delay: 0.6 },
          { val: 40, lane: 1, speed: 72, delay: 0.6 },
          { val: -45, lane: 0, speed: 70, delay: 0.6 },
          { val: 48, lane: 1, speed: 70, delay: 0.6 },
          { val: -50, lane: 0, speed: 68, delay: 0.7 },
          { val: 54, lane: 1, speed: 68, delay: 0.7 },
          { val: -60, lane: 0, speed: 66, delay: 0.7 },
          { val: 60, lane: 1, speed: 66, delay: 0.7 },
          { val: -72, lane: 0, speed: 65, delay: 0.8 },
          { val: 80, lane: 1, speed: 65, delay: 0.8 },
          { val: -90, lane: 0, speed: 64, delay: 0.8 },
          { val: 100, lane: 1, speed: 64, delay: 0.8 },
          { val: -108, lane: 0, speed: 62, delay: 0.8 },
          { val: 120, lane: 1, speed: 62, delay: 0.9 },
          { val: -120, lane: 0, speed: 60, delay: 0.9 },
          { val: 135, lane: 1, speed: 60, delay: 0.9 },
          { val: -144, lane: 0, speed: 58, delay: 0.9 },
          { val: 150, lane: 1, speed: 58, delay: 1.0 },
          { val: -160, lane: 0, speed: 56, delay: 1.0 },
          { val: 180, lane: 1, speed: 56, delay: 1.0 },
          { val: -192, lane: 0, speed: 55, delay: 1.1 },
          { val: 200, lane: 1, speed: 55, delay: 1.1 },
          { val: -216, lane: 0, speed: 54, delay: 1.1 },
          { val: 240, lane: 1, speed: 54, delay: 1.2 },
          { val: -270, lane: 0, speed: 52, delay: 1.2 },
          { val: 300, lane: 1, speed: 50, delay: 1.2 },
          { val: -360, lane: 0, speed: 48, delay: 1.3 },
          { val: 360, lane: 1, speed: 48, delay: 1.3 },
          { val: -480, lane: 0, speed: 46, delay: 1.4 },
          {
            val: -720,
            lane: 0,
            delay: 2.5,
            isBoss: true,
            bossName: '極性虛空領主【-720】',
            speed: 28,
            bossSkills: ['polarity_flip', 'multiply_aura', 'split_adds']
          }
        ]
      }
    ]
  },

  // ================= 第三章：平方之峰 =================
  '3-1': {
    id: '3-1',
    chapterId: 'world-3',
    name: '3-1 平方稜線（開方之路）',
    subtitle: '密集完全平方數與七曜天琴初試',
    tip: '💡 18 處稜線基座！密集平方怪來襲，部署「√x 方根重力井」可直接開方並造成 2.5 倍暴擊！',
    nextLevelId: '3-2',
    initialGold: 550,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 140 },
        { x: 260, y: 140 },
        { x: 260, y: 380 },
        { x: 440, y: 380 },
        { x: 440, y: 160 },
        { x: 620, y: 160 },
        { x: 620, y: 420 },
        { x: 800, y: 420 },
        { x: 800, y: 240 },
        { x: 930, y: 240 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 140, y: 70 },
      { id: 'p2', x: 140, y: 210 },
      { id: 'p3', x: 260, y: 450 },
      { id: 'p4', x: 350, y: 310 },
      { id: 'p5', x: 350, y: 450 },
      { id: 'p6', x: 350, y: 160 },
      { id: 'p7', x: 440, y: 90 },
      { id: 'p8', x: 530, y: 230 },
      { id: 'p9', x: 530, y: 360 },
      { id: 'p10', x: 620, y: 90 },
      { id: 'p11', x: 710, y: 230 },
      { id: 'p12', x: 710, y: 360 },
      { id: 'p13', x: 710, y: 490 },
      { id: 'p14', x: 800, y: 490 },
      { id: 'p15', x: 800, y: 170 },
      { id: 'p16', x: 880, y: 170 },
      { id: 'p17', x: 880, y: 310 },
      { id: 'p18', x: 880, y: 440 }
    ],
    waves: [
      {
        title: '第一波：平方先鋒疾走',
        tip: '4, 9, 16, 25 平方怪狂奔！善用重力井開方！',
        enemies: [
          { val: 4, speed: 70, delay: 0.6 },
          { val: 9, speed: 68, delay: 0.6 },
          { val: 16, speed: 66, delay: 0.7 },
          { val: 25, speed: 65, delay: 0.7 },
          { val: 36, speed: 64, delay: 0.8 },
          { val: 36, speed: 64, delay: 0.8 },
          { val: 49, speed: 62, delay: 0.9 },
          { val: 49, speed: 62, delay: 0.9 },
          { val: 64, speed: 60, delay: 1.0 },
          { val: 81, speed: 58, delay: 1.0 },
          { val: 100, speed: 56, delay: 1.1 }
        ]
      },
      {
        title: '第二波：七曜與完全平方交織',
        tip: '49, 98 需 7 號天琴，大平方數需重力井重擊！',
        enemies: [
          { val: 16, speed: 72, delay: 0.5 },
          { val: 25, speed: 70, delay: 0.5 },
          { val: 36, speed: 68, delay: 0.6 },
          { val: 49, speed: 66, delay: 0.6 },
          { val: 64, speed: 65, delay: 0.7 },
          { val: 81, speed: 64, delay: 0.7 },
          { val: 98, speed: 62, delay: 0.8 },
          { val: 100, speed: 60, delay: 0.8 },
          { val: 121, speed: 58, delay: 0.9 },
          { val: 144, speed: 56, delay: 0.9 },
          { val: 144, speed: 56, delay: 1.0 },
          { val: 196, speed: 54, delay: 1.0 },
          { val: 225, speed: 52, delay: 1.1 }
        ]
      },
      {
        title: '第三波：極峰平方狂潮',
        tip: '密集 144, 196, 256 大平方巨群全軍突擊！',
        enemies: [
          { val: 36, speed: 76, delay: 0.5 },
          { val: 49, speed: 74, delay: 0.5 },
          { val: 64, speed: 72, delay: 0.5 },
          { val: 81, speed: 70, delay: 0.6 },
          { val: 100, speed: 68, delay: 0.6 },
          { val: 121, speed: 66, delay: 0.7 },
          { val: 144, speed: 64, delay: 0.7 },
          { val: 169, speed: 62, delay: 0.8 },
          { val: 196, speed: 60, delay: 0.8 },
          { val: 225, speed: 58, delay: 0.9 },
          { val: 256, speed: 56, delay: 0.9 },
          { val: 289, speed: 54, delay: 1.0 },
          { val: 324, speed: 52, delay: 1.0 },
          { val: 400, speed: 50, delay: 1.1 }
        ]
      }
    ]
  },

  '3-2': {
    id: '3-2',
    chapterId: 'world-3',
    name: '3-2 指數斷崖（對稱雙重迴旋）',
    subtitle: '雙路高速夾擊與高次方增殖',
    tip: '💡 18 處對稱基座！雙路高速高次怪（16, 32, 64, 128），在中段狹道佈署 2 號連鎖砲與重力井！',
    nextLevelId: '3-3',
    initialGold: 620,
    initialLives: 10,
    lanes: [
      // 上路
      [
        { x: 30, y: 130 },
        { x: 220, y: 130 },
        { x: 220, y: 250 },
        { x: 420, y: 250 },
        { x: 420, y: 110 },
        { x: 650, y: 110 },
        { x: 650, y: 270 },
        { x: 800, y: 270 },
        { x: 930, y: 270 }
      ],
      // 下路
      [
        { x: 30, y: 430 },
        { x: 220, y: 430 },
        { x: 220, y: 310 },
        { x: 420, y: 310 },
        { x: 420, y: 450 },
        { x: 650, y: 450 },
        { x: 650, y: 290 },
        { x: 800, y: 290 },
        { x: 930, y: 290 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 70 },
      { id: 'p2', x: 120, y: 200 },
      { id: 'p3', x: 120, y: 370 },
      { id: 'p4', x: 120, y: 490 },
      { id: 'p5', x: 320, y: 180 },
      { id: 'p6', x: 320, y: 380 },
      { id: 'p7', x: 420, y: 180 },
      { id: 'p8', x: 420, y: 380 },
      { id: 'p9', x: 530, y: 70 },
      { id: 'p10', x: 530, y: 210 },
      { id: 'p11', x: 530, y: 350 },
      { id: 'p12', x: 530, y: 490 },
      { id: 'p13', x: 650, y: 190 },
      { id: 'p14', x: 650, y: 370 },
      { id: 'p15', x: 740, y: 210 },
      { id: 'p16', x: 740, y: 350 },
      { id: 'p17', x: 860, y: 210 },
      { id: 'p18', x: 860, y: 350 }
    ],
    waves: [
      {
        title: '第一波：高次雙路衝鋒',
        tip: '雙路湧出 8, 16, 27, 32！兩端皆需佈陣！',
        enemies: [
          { val: 8, lane: 0, speed: 70, delay: 0.6 },
          { val: 8, lane: 1, speed: 70, delay: 0.6 },
          { val: 16, lane: 0, speed: 68, delay: 0.7 },
          { val: 16, lane: 1, speed: 68, delay: 0.7 },
          { val: 27, lane: 0, speed: 66, delay: 0.7 },
          { val: 27, lane: 1, speed: 66, delay: 0.7 },
          { val: 32, lane: 0, speed: 64, delay: 0.8 },
          { val: 32, lane: 1, speed: 64, delay: 0.8 },
          { val: 64, lane: 0, speed: 60, delay: 0.9 },
          { val: 64, lane: 1, speed: 60, delay: 0.9 }
        ]
      },
      {
        title: '第二波：次冪倍率風暴',
        tip: '升級攻速與威力！高次數迅速分解！',
        enemies: [
          { val: 16, lane: 0, speed: 74, delay: 0.5 },
          { val: 27, lane: 1, speed: 74, delay: 0.5 },
          { val: 32, lane: 0, speed: 72, delay: 0.6 },
          { val: 36, lane: 1, speed: 72, delay: 0.6 },
          { val: 64, lane: 0, speed: 70, delay: 0.6 },
          { val: 81, lane: 1, speed: 70, delay: 0.6 },
          { val: 128, lane: 0, speed: 66, delay: 0.7 },
          { val: 128, lane: 1, speed: 66, delay: 0.7 },
          { val: 216, lane: 0, speed: 62, delay: 0.8 },
          { val: 243, lane: 1, speed: 62, delay: 0.8 },
          { val: 256, lane: 0, speed: 58, delay: 0.9 },
          { val: 256, lane: 1, speed: 58, delay: 0.9 }
        ]
      },
      {
        title: '第三波：指數巨浪滅頂',
        tip: '256, 343, 512 雙路浩蕩壓境！',
        enemies: [
          { val: 64, lane: 0, speed: 78, delay: 0.5 },
          { val: 64, lane: 1, speed: 78, delay: 0.5 },
          { val: 81, lane: 0, speed: 76, delay: 0.5 },
          { val: 100, lane: 1, speed: 76, delay: 0.5 },
          { val: 128, lane: 0, speed: 74, delay: 0.6 },
          { val: 128, lane: 1, speed: 74, delay: 0.6 },
          { val: 216, lane: 0, speed: 70, delay: 0.6 },
          { val: 243, lane: 1, speed: 70, delay: 0.6 },
          { val: 256, lane: 0, speed: 66, delay: 0.7 },
          { val: 256, lane: 1, speed: 66, delay: 0.7 },
          { val: 343, lane: 0, speed: 64, delay: 0.8 },
          { val: 343, lane: 1, speed: 64, delay: 0.8 },
          { val: 512, lane: 0, speed: 60, delay: 0.9 },
          { val: 512, lane: 1, speed: 60, delay: 0.9 }
        ]
      }
    ]
  },

  '3-3': {
    id: '3-3',
    chapterId: 'world-3',
    name: '3-3 開方迷宮（重力折疊區）',
    subtitle: '負平方怪與正平方怪混編交錯',
    tip: '💡 18 處迷宮基座！正負平方怪交替衝鋒，必須稜鏡淨化轉正後搭配重力井秒殺！',
    nextLevelId: '3-4',
    initialGold: 700,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 100 },
        { x: 280, y: 100 },
        { x: 280, y: 300 },
        { x: 140, y: 300 },
        { x: 140, y: 460 },
        { x: 480, y: 460 },
        { x: 480, y: 220 },
        { x: 680, y: 220 },
        { x: 680, y: 440 },
        { x: 820, y: 440 },
        { x: 820, y: 180 },
        { x: 930, y: 180 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 90, y: 50 },
      { id: 'p2', x: 200, y: 50 },
      { id: 'p3', x: 200, y: 200 },
      { id: 'p4', x: 90, y: 230 },
      { id: 'p5', x: 90, y: 380 },
      { id: 'p6', x: 210, y: 380 },
      { id: 'p7', x: 380, y: 400 },
      { id: 'p8', x: 380, y: 260 },
      { id: 'p9', x: 480, y: 140 },
      { id: 'p10', x: 580, y: 140 },
      { id: 'p11', x: 580, y: 300 },
      { id: 'p12', x: 580, y: 440 },
      { id: 'p13', x: 750, y: 360 },
      { id: 'p14', x: 750, y: 220 },
      { id: 'p15', x: 750, y: 500 },
      { id: 'p16', x: 880, y: 260 },
      { id: 'p17', x: 880, y: 110 },
      { id: 'p18', x: 880, y: 400 }
    ],
    waves: [
      {
        title: '第一波：極性平方試探',
        tip: '負平方怪(-36, -49)需先經稜鏡轉為正數！',
        enemies: [
          { val: 36, speed: 72, delay: 0.6 },
          { val: -36, speed: 72, delay: 0.6 },
          { val: 49, speed: 70, delay: 0.7 },
          { val: -49, speed: 70, delay: 0.7 },
          { val: 64, speed: 68, delay: 0.7 },
          { val: -64, speed: 68, delay: 0.8 },
          { val: 81, speed: 66, delay: 0.8 },
          { val: -81, speed: 66, delay: 0.9 },
          { val: 100, speed: 64, delay: 0.9 }
        ]
      },
      {
        title: '第二波：折疊鏡像大進攻',
        tip: '部署多組稜鏡與方根井，打擊 -144, -196！',
        enemies: [
          { val: -64, speed: 75, delay: 0.5 },
          { val: 64, speed: 75, delay: 0.5 },
          { val: -81, speed: 72, delay: 0.6 },
          { val: 81, speed: 72, delay: 0.6 },
          { val: -100, speed: 70, delay: 0.6 },
          { val: 100, speed: 70, delay: 0.7 },
          { val: -121, speed: 68, delay: 0.7 },
          { val: 121, speed: 68, delay: 0.7 },
          { val: -144, speed: 66, delay: 0.8 },
          { val: 144, speed: 66, delay: 0.8 },
          { val: -169, speed: 64, delay: 0.9 },
          { val: 196, speed: 62, delay: 0.9 },
          { val: -225, speed: 60, delay: 1.0 }
        ]
      },
      {
        title: '第三波：開方終極狂瀾',
        tip: '大平方怪高速衝鋒，全面火力全開！',
        enemies: [
          { val: -144, speed: 78, delay: 0.5 },
          { val: 144, speed: 78, delay: 0.5 },
          { val: -196, speed: 75, delay: 0.5 },
          { val: 196, speed: 75, delay: 0.6 },
          { val: -225, speed: 72, delay: 0.6 },
          { val: 225, speed: 72, delay: 0.6 },
          { val: -256, speed: 70, delay: 0.7 },
          { val: 256, speed: 70, delay: 0.7 },
          { val: -289, speed: 68, delay: 0.7 },
          { val: 324, speed: 66, delay: 0.8 },
          { val: -361, speed: 64, delay: 0.8 },
          { val: 400, speed: 62, delay: 0.9 },
          { val: -441, speed: 60, delay: 0.9 },
          { val: 484, speed: 58, delay: 1.0 }
        ]
      }
    ]
  },

  '3-4': {
    id: '3-4',
    chapterId: 'world-3',
    name: '3-4 【大魔王】開方巨像·泰坦【840】（指數天峰要塞）',
    subtitle: '第三章終極魔王大決戰',
    tip: '👑 20 處要塞基座！魔王【開方巨像·泰坦 840】(2³×3×5×7)親征！必須七曜天琴、方根井與質數重砲通力協同！',
    nextLevelId: '4-1',
    initialGold: 800,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 120 },
        { x: 200, y: 120 },
        { x: 200, y: 250 },
        { x: 390, y: 250 },
        { x: 390, y: 100 },
        { x: 600, y: 100 },
        { x: 600, y: 250 },
        { x: 740, y: 250 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ],
      [
        { x: 30, y: 440 },
        { x: 200, y: 440 },
        { x: 200, y: 310 },
        { x: 390, y: 310 },
        { x: 390, y: 460 },
        { x: 600, y: 460 },
        { x: 600, y: 310 },
        { x: 740, y: 310 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 110, y: 60 },
      { id: 'p2', x: 110, y: 180 },
      { id: 'p3', x: 110, y: 380 },
      { id: 'p4', x: 110, y: 500 },
      { id: 'p5', x: 290, y: 180 },
      { id: 'p6', x: 290, y: 380 },
      { id: 'p7', x: 390, y: 180 },
      { id: 'p8', x: 390, y: 380 },
      { id: 'p9', x: 490, y: 60 },
      { id: 'p10', x: 490, y: 180 },
      { id: 'p11', x: 490, y: 380 },
      { id: 'p12', x: 490, y: 500 },
      { id: 'p13', x: 600, y: 180 },
      { id: 'p14', x: 600, y: 380 },
      { id: 'p15', x: 670, y: 180 },
      { id: 'p16', x: 670, y: 380 },
      { id: 'p17', x: 820, y: 200 },
      { id: 'p18', x: 820, y: 360 },
      { id: 'p19', x: 890, y: 200 },
      { id: 'p20', x: 890, y: 360 }
    ],
    waves: [
      {
        title: '第一波：泰坦護衛隊前哨',
        tip: '30 隻大平方親衛迅速逼近，強化重力井減速！',
        enemies: [
          { val: 49, lane: 0, speed: 72, delay: 0.5 },
          { val: 49, lane: 1, speed: 72, delay: 0.5 },
          { val: 64, lane: 0, speed: 70, delay: 0.6 },
          { val: 64, lane: 1, speed: 70, delay: 0.6 },
          { val: 81, lane: 0, speed: 68, delay: 0.6 },
          { val: 81, lane: 1, speed: 68, delay: 0.6 },
          { val: 100, lane: 0, speed: 66, delay: 0.7 },
          { val: 100, lane: 1, speed: 66, delay: 0.7 },
          { val: 121, lane: 0, speed: 64, delay: 0.7 },
          { val: 144, lane: 1, speed: 64, delay: 0.7 },
          { val: 169, lane: 0, speed: 62, delay: 0.8 },
          { val: 196, lane: 1, speed: 62, delay: 0.8 },
          { val: 225, lane: 0, speed: 60, delay: 0.8 },
          { val: 256, lane: 1, speed: 60, delay: 0.9 }
        ]
      },
      {
        title: '第二波：高階合數軍團突進',
        tip: '140, 168, 210, 280, 420 浩蕩壓境！',
        enemies: [
          { val: 120, lane: 0, speed: 75, delay: 0.5 },
          { val: 120, lane: 1, speed: 75, delay: 0.5 },
          { val: 140, lane: 0, speed: 72, delay: 0.5 },
          { val: 140, lane: 1, speed: 72, delay: 0.5 },
          { val: 168, lane: 0, speed: 70, delay: 0.6 },
          { val: 168, lane: 1, speed: 70, delay: 0.6 },
          { val: 210, lane: 0, speed: 68, delay: 0.6 },
          { val: 210, lane: 1, speed: 68, delay: 0.6 },
          { val: 240, lane: 0, speed: 66, delay: 0.7 },
          { val: 280, lane: 1, speed: 66, delay: 0.7 },
          { val: 336, lane: 0, speed: 64, delay: 0.8 },
          { val: 420, lane: 1, speed: 62, delay: 0.8 },
          { val: 420, lane: 0, speed: 60, delay: 0.9 }
        ]
      },
      {
        title: '終焉魔王波：開方巨像·泰坦【840】親臨！',
        tip: '巨像擁有 840 超高數值與堅硬外殼！全軍集火打擊！',
        enemies: [
          { val: 64, lane: 0, speed: 78, delay: 0.5 },
          { val: 64, lane: 1, speed: 78, delay: 0.5 },
          { val: 81, lane: 0, speed: 76, delay: 0.5 },
          { val: 100, lane: 1, speed: 76, delay: 0.5 },
          { val: 144, lane: 0, speed: 74, delay: 0.6 },
          { val: 144, lane: 1, speed: 74, delay: 0.6 },
          { val: 196, lane: 0, speed: 72, delay: 0.6 },
          { val: 210, lane: 1, speed: 72, delay: 0.6 },
          { val: 280, lane: 0, speed: 70, delay: 0.7 },
          { val: 336, lane: 1, speed: 68, delay: 0.7 },
          { val: 420, lane: 0, speed: 66, delay: 0.8 },
          { val: 420, lane: 1, speed: 64, delay: 0.8 },
          {
            val: 840,
            lane: 0,
            delay: 2.5,
            isBoss: true,
            bossName: '開方巨像·泰坦【840】',
            speed: 26,
            bossSkills: ['shield_regen', 'multiply_aura']
          }
        ]
      }
    ]
  },

  // ================= 第四章：質數之城 =================
  '4-1': {
    id: '4-1',
    chapterId: 'world-4',
    name: '4-1 質數之壁（無解堅石）',
    subtitle: '難纏純質數入侵與運算子微調破防',
    tip: '💡 18 處城池基座！純質數無法被 2/3/5/7 整除，必須以「±1 運算子調整塔」微調為合數再擊破！',
    nextLevelId: '4-2',
    initialGold: 850,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 150 },
        { x: 260, y: 150 },
        { x: 260, y: 360 },
        { x: 440, y: 360 },
        { x: 440, y: 140 },
        { x: 640, y: 140 },
        { x: 640, y: 440 },
        { x: 800, y: 440 },
        { x: 800, y: 220 },
        { x: 930, y: 220 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 140, y: 80 },
      { id: 'p2', x: 140, y: 220 },
      { id: 'p3', x: 260, y: 430 },
      { id: 'p4', x: 350, y: 290 },
      { id: 'p5', x: 350, y: 430 },
      { id: 'p6', x: 350, y: 150 },
      { id: 'p7', x: 440, y: 70 },
      { id: 'p8', x: 540, y: 220 },
      { id: 'p9', x: 540, y: 360 },
      { id: 'p10', x: 640, y: 70 },
      { id: 'p11', x: 720, y: 220 },
      { id: 'p12', x: 720, y: 360 },
      { id: 'p13', x: 720, y: 500 },
      { id: 'p14', x: 800, y: 500 },
      { id: 'p15', x: 800, y: 150 },
      { id: 'p16', x: 880, y: 150 },
      { id: 'p17', x: 880, y: 290 },
      { id: 'p18', x: 880, y: 430 }
    ],
    waves: [
      {
        title: '第一波：純質數突襲先鋒',
        tip: '11, 13, 17 疾馳而來！用運算子塔 13-1=12 快速破防！',
        enemies: [
          { val: 11, speed: 70, delay: 0.6 },
          { val: 13, speed: 70, delay: 0.6 },
          { val: 17, speed: 68, delay: 0.7 },
          { val: 19, speed: 68, delay: 0.7 },
          { val: 23, speed: 66, delay: 0.8 },
          { val: 29, speed: 64, delay: 0.8 },
          { val: 31, speed: 62, delay: 0.9 },
          { val: 37, speed: 60, delay: 1.0 }
        ]
      },
      {
        title: '第二波：堅固質數大軍',
        tip: '搭配 ×0 絕對零度塔大幅減速，留出運算子微調時間！',
        enemies: [
          { val: 17, speed: 74, delay: 0.5 },
          { val: 19, speed: 74, delay: 0.5 },
          { val: 23, speed: 72, delay: 0.6 },
          { val: 29, speed: 70, delay: 0.6 },
          { val: 31, speed: 68, delay: 0.7 },
          { val: 37, speed: 66, delay: 0.7 },
          { val: 41, speed: 64, delay: 0.8 },
          { val: 43, speed: 62, delay: 0.8 },
          { val: 47, speed: 60, delay: 0.9 },
          { val: 53, speed: 58, delay: 0.9 },
          { val: 59, speed: 56, delay: 1.0 }
        ]
      },
      {
        title: '第三波：高階質數鐵衛狂潮',
        tip: '61, 67, 71, 73, 79, 83 質數大軍全軍壓境！',
        enemies: [
          { val: 31, speed: 78, delay: 0.5 },
          { val: 37, speed: 76, delay: 0.5 },
          { val: 41, speed: 74, delay: 0.5 },
          { val: 43, speed: 72, delay: 0.6 },
          { val: 47, speed: 70, delay: 0.6 },
          { val: 53, speed: 68, delay: 0.7 },
          { val: 59, speed: 66, delay: 0.7 },
          { val: 61, speed: 64, delay: 0.8 },
          { val: 67, speed: 62, delay: 0.8 },
          { val: 71, speed: 60, delay: 0.9 },
          { val: 73, speed: 58, delay: 0.9 },
          { val: 79, speed: 56, delay: 1.0 },
          { val: 83, speed: 54, delay: 1.0 },
          { val: 89, speed: 52, delay: 1.1 },
          { val: 97, speed: 50, delay: 1.1 }
        ]
      }
    ]
  },

  '4-2': {
    id: '4-2',
    chapterId: 'world-4',
    name: '4-2 同餘長廊（循環週期陣）',
    subtitle: '雙路同餘波次與相位衝鋒',
    tip: '💡 18 處長廊要點！雙路同餘怪循環湧現，在合流通道建立高火力交會區！',
    nextLevelId: '4-3',
    initialGold: 920,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 130 },
        { x: 230, y: 130 },
        { x: 230, y: 260 },
        { x: 430, y: 260 },
        { x: 430, y: 110 },
        { x: 650, y: 110 },
        { x: 650, y: 270 },
        { x: 810, y: 270 },
        { x: 930, y: 270 }
      ],
      [
        { x: 30, y: 430 },
        { x: 230, y: 430 },
        { x: 230, y: 300 },
        { x: 430, y: 300 },
        { x: 430, y: 450 },
        { x: 650, y: 450 },
        { x: 650, y: 290 },
        { x: 810, y: 290 },
        { x: 930, y: 290 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 70 },
      { id: 'p2', x: 120, y: 200 },
      { id: 'p3', x: 120, y: 360 },
      { id: 'p4', x: 120, y: 490 },
      { id: 'p5', x: 330, y: 190 },
      { id: 'p6', x: 330, y: 370 },
      { id: 'p7', x: 430, y: 180 },
      { id: 'p8', x: 430, y: 380 },
      { id: 'p9', x: 540, y: 70 },
      { id: 'p10', x: 540, y: 210 },
      { id: 'p11', x: 540, y: 350 },
      { id: 'p12', x: 540, y: 490 },
      { id: 'p13', x: 650, y: 190 },
      { id: 'p14', x: 650, y: 370 },
      { id: 'p15', x: 740, y: 210 },
      { id: 'p16', x: 740, y: 350 },
      { id: 'p17', x: 870, y: 210 },
      { id: 'p18', x: 870, y: 350 }
    ],
    waves: [
      {
        title: '第一波：同餘循環前鋒',
        tip: '雙路湧現 mod 7 循環怪，維持雙側均衡佈防！',
        enemies: [
          { val: 15, lane: 0, speed: 72, delay: 0.6 },
          { val: 15, lane: 1, speed: 72, delay: 0.6 },
          { val: 22, lane: 0, speed: 70, delay: 0.6 },
          { val: 22, lane: 1, speed: 70, delay: 0.6 },
          { val: 29, lane: 0, speed: 68, delay: 0.7 },
          { val: 29, lane: 1, speed: 68, delay: 0.7 },
          { val: 36, lane: 0, speed: 66, delay: 0.8 },
          { val: 36, lane: 1, speed: 66, delay: 0.8 }
        ]
      },
      {
        title: '第二波：週期同餘大衝鋒',
        tip: '升級 3 號三元激光與 7 號天琴火網！',
        enemies: [
          { val: 29, lane: 0, speed: 76, delay: 0.5 },
          { val: 31, lane: 1, speed: 76, delay: 0.5 },
          { val: 36, lane: 0, speed: 74, delay: 0.6 },
          { val: 42, lane: 1, speed: 74, delay: 0.6 },
          { val: 43, lane: 0, speed: 70, delay: 0.6 },
          { val: 49, lane: 1, speed: 70, delay: 0.6 },
          { val: 50, lane: 0, speed: 68, delay: 0.7 },
          { val: 56, lane: 1, speed: 68, delay: 0.7 },
          { val: 57, lane: 0, speed: 66, delay: 0.8 },
          { val: 63, lane: 1, speed: 66, delay: 0.8 },
          { val: 70, lane: 0, speed: 62, delay: 0.9 },
          { val: 77, lane: 1, speed: 62, delay: 0.9 }
        ]
      },
      {
        title: '第三波：雙路終極同餘洪流',
        tip: '高速密集同餘部隊全線突圍！',
        enemies: [
          { val: 43, lane: 0, speed: 80, delay: 0.5 },
          { val: 47, lane: 1, speed: 80, delay: 0.5 },
          { val: 53, lane: 0, speed: 78, delay: 0.5 },
          { val: 59, lane: 1, speed: 78, delay: 0.5 },
          { val: 61, lane: 0, speed: 75, delay: 0.6 },
          { val: 67, lane: 1, speed: 75, delay: 0.6 },
          { val: 71, lane: 0, speed: 72, delay: 0.6 },
          { val: 79, lane: 1, speed: 72, delay: 0.6 },
          { val: 83, lane: 0, speed: 70, delay: 0.7 },
          { val: 89, lane: 1, speed: 70, delay: 0.7 },
          { val: 97, lane: 0, speed: 66, delay: 0.8 },
          { val: 105, lane: 1, speed: 66, delay: 0.8 }
        ]
      }
    ]
  },

  '4-3': {
    id: '4-3',
    chapterId: 'world-4',
    name: '4-3 雙子質數隘口（疾風突襲）',
    subtitle: '結伴同行的孿生質數高速突刺',
    tip: '💡 20 處要塞基座！成對的雙子質數 (11,13), (17,19), (29,31) 結伴狂奔，必須以 ×0 力場配合運算子聯動消滅！',
    nextLevelId: '4-4',
    initialGold: 980,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 110 },
        { x: 260, y: 110 },
        { x: 260, y: 290 },
        { x: 130, y: 290 },
        { x: 130, y: 460 },
        { x: 470, y: 460 },
        { x: 470, y: 220 },
        { x: 670, y: 220 },
        { x: 670, y: 440 },
        { x: 820, y: 440 },
        { x: 820, y: 190 },
        { x: 930, y: 190 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 80, y: 50 },
      { id: 'p2', x: 190, y: 50 },
      { id: 'p3', x: 190, y: 200 },
      { id: 'p4', x: 80, y: 220 },
      { id: 'p5', x: 80, y: 370 },
      { id: 'p6', x: 200, y: 370 },
      { id: 'p7', x: 370, y: 400 },
      { id: 'p8', x: 370, y: 260 },
      { id: 'p9', x: 470, y: 140 },
      { id: 'p10', x: 570, y: 140 },
      { id: 'p11', x: 570, y: 300 },
      { id: 'p12', x: 570, y: 440 },
      { id: 'p13', x: 740, y: 360 },
      { id: 'p14', x: 740, y: 220 },
      { id: 'p15', x: 740, y: 500 },
      { id: 'p16', x: 880, y: 260 },
      { id: 'p17', x: 880, y: 110 },
      { id: 'p18', x: 880, y: 400 },
      { id: 'p19', x: 300, y: 490 },
      { id: 'p20', x: 600, y: 500 }
    ],
    waves: [
      {
        title: '第一波：雙子先鋒疾走',
        tip: '(11, 13), (17, 19) 雙雙高速衝擊！',
        enemies: [
          { val: 11, speed: 75, delay: 0.4 },
          { val: 13, speed: 75, delay: 0.4 },
          { val: 17, speed: 74, delay: 0.5 },
          { val: 19, speed: 74, delay: 0.5 },
          { val: 29, speed: 72, delay: 0.6 },
          { val: 31, speed: 72, delay: 0.6 },
          { val: 41, speed: 70, delay: 0.7 },
          { val: 43, speed: 70, delay: 0.7 }
        ]
      },
      {
        title: '第二波：高階雙子疾風陣',
        tip: '孿生質數狂湧！利用運算子化 41+1=42 (2×3×7)！',
        enemies: [
          { val: 29, speed: 78, delay: 0.4 },
          { val: 31, speed: 78, delay: 0.4 },
          { val: 41, speed: 76, delay: 0.5 },
          { val: 43, speed: 76, delay: 0.5 },
          { val: 59, speed: 74, delay: 0.5 },
          { val: 61, speed: 74, delay: 0.5 },
          { val: 71, speed: 72, delay: 0.6 },
          { val: 73, speed: 72, delay: 0.6 },
          { val: 101, speed: 70, delay: 0.7 },
          { val: 103, speed: 70, delay: 0.7 }
        ]
      },
      {
        title: '第三波：雙子大軍終極狂飆',
        tip: '三位數雙子質數大爆發，全屏密集開火！',
        enemies: [
          { val: 59, speed: 82, delay: 0.4 },
          { val: 61, speed: 82, delay: 0.4 },
          { val: 71, speed: 80, delay: 0.4 },
          { val: 73, speed: 80, delay: 0.4 },
          { val: 101, speed: 78, delay: 0.5 },
          { val: 103, speed: 78, delay: 0.5 },
          { val: 107, speed: 76, delay: 0.5 },
          { val: 109, speed: 76, delay: 0.5 },
          { val: 137, speed: 74, delay: 0.6 },
          { val: 139, speed: 74, delay: 0.6 },
          { val: 149, speed: 72, delay: 0.7 },
          { val: 151, speed: 72, delay: 0.7 }
        ]
      }
    ]
  },

  '4-4': {
    id: '4-4',
    chapterId: 'world-4',
    name: '4-4 【大魔王】質數要塞聖所：歐拉神話獸【1260】',
    subtitle: '第四章終極神話魔王',
    tip: '👑 20 處要塞基座！魔王【質數之神·歐拉獸 1260】(2²×3²×5×7)親征！帶有極高耐久與分裂技能！',
    nextLevelId: '5-1',
    initialGold: 1100,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 120 },
        { x: 200, y: 120 },
        { x: 200, y: 250 },
        { x: 390, y: 250 },
        { x: 390, y: 100 },
        { x: 600, y: 100 },
        { x: 600, y: 250 },
        { x: 740, y: 250 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ],
      [
        { x: 30, y: 440 },
        { x: 200, y: 440 },
        { x: 200, y: 310 },
        { x: 390, y: 310 },
        { x: 390, y: 460 },
        { x: 600, y: 460 },
        { x: 600, y: 310 },
        { x: 740, y: 310 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 110, y: 60 },
      { id: 'p2', x: 110, y: 180 },
      { id: 'p3', x: 110, y: 380 },
      { id: 'p4', x: 110, y: 500 },
      { id: 'p5', x: 290, y: 180 },
      { id: 'p6', x: 290, y: 380 },
      { id: 'p7', x: 390, y: 180 },
      { id: 'p8', x: 390, y: 380 },
      { id: 'p9', x: 490, y: 60 },
      { id: 'p10', x: 490, y: 180 },
      { id: 'p11', x: 490, y: 380 },
      { id: 'p12', x: 490, y: 500 },
      { id: 'p13', x: 600, y: 180 },
      { id: 'p14', x: 600, y: 380 },
      { id: 'p15', x: 670, y: 180 },
      { id: 'p16', x: 670, y: 380 },
      { id: 'p17', x: 820, y: 200 },
      { id: 'p18', x: 820, y: 360 },
      { id: 'p19', x: 890, y: 200 },
      { id: 'p20', x: 890, y: 360 }
    ],
    waves: [
      {
        title: '第一波：質數聖殿騎士團',
        tip: '32 隻質數聖殿騎士高速進攻，運算子塔全面微調！',
        enemies: [
          { val: 29, lane: 0, speed: 76, delay: 0.5 },
          { val: 31, lane: 1, speed: 76, delay: 0.5 },
          { val: 37, lane: 0, speed: 74, delay: 0.5 },
          { val: 41, lane: 1, speed: 74, delay: 0.5 },
          { val: 43, lane: 0, speed: 72, delay: 0.6 },
          { val: 47, lane: 1, speed: 72, delay: 0.6 },
          { val: 53, lane: 0, speed: 70, delay: 0.6 },
          { val: 59, lane: 1, speed: 70, delay: 0.7 },
          { val: 61, lane: 0, speed: 68, delay: 0.7 },
          { val: 67, lane: 1, speed: 68, delay: 0.7 },
          { val: 71, lane: 0, speed: 66, delay: 0.8 },
          { val: 73, lane: 1, speed: 66, delay: 0.8 }
        ]
      },
      {
        title: '第二波：高階合數狂湧護衛',
        tip: '180, 210, 252, 315, 420, 630 狂暴雙路齊衝！',
        enemies: [
          { val: 180, lane: 0, speed: 78, delay: 0.5 },
          { val: 180, lane: 1, speed: 78, delay: 0.5 },
          { val: 210, lane: 0, speed: 75, delay: 0.5 },
          { val: 210, lane: 1, speed: 75, delay: 0.5 },
          { val: 252, lane: 0, speed: 72, delay: 0.6 },
          { val: 252, lane: 1, speed: 72, delay: 0.6 },
          { val: 315, lane: 0, speed: 70, delay: 0.6 },
          { val: 315, lane: 1, speed: 70, delay: 0.6 },
          { val: 420, lane: 0, speed: 68, delay: 0.7 },
          { val: 420, lane: 1, speed: 68, delay: 0.7 },
          { val: 630, lane: 0, speed: 64, delay: 0.8 },
          { val: 630, lane: 1, speed: 64, delay: 0.8 }
        ]
      },
      {
        title: '終焉魔王波：歐拉神話獸【1260】親征！',
        tip: '超高數值魔王親臨！全軍火網極限輸出！',
        enemies: [
          { val: 105, lane: 0, speed: 80, delay: 0.4 },
          { val: 105, lane: 1, speed: 80, delay: 0.4 },
          { val: 140, lane: 0, speed: 78, delay: 0.5 },
          { val: 140, lane: 1, speed: 78, delay: 0.5 },
          { val: 210, lane: 0, speed: 75, delay: 0.5 },
          { val: 210, lane: 1, speed: 75, delay: 0.5 },
          { val: 315, lane: 0, speed: 72, delay: 0.6 },
          { val: 315, lane: 1, speed: 72, delay: 0.6 },
          { val: 420, lane: 0, speed: 70, delay: 0.7 },
          { val: 630, lane: 1, speed: 66, delay: 0.7 },
          {
            val: 1260,
            lane: 0,
            delay: 2.5,
            isBoss: true,
            bossName: '質數之神·歐拉獸【1260】',
            speed: 24,
            bossSkills: ['split_adds', 'multiply_aura']
          }
        ]
      }
    ]
  },

  // ================= 第五章：極限終焉 =================
  '5-1': {
    id: '5-1',
    chapterId: 'world-5',
    name: '5-1 虛數鏡面（維度裂痕）',
    subtitle: '負數、平方數與質數的超高難度混合',
    tip: '💡 20 處要塞基座！前線佈置稜鏡、中線方根井與運算子調整，後排質數集火！',
    nextLevelId: '5-2',
    initialGold: 1100,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 130 },
        { x: 260, y: 130 },
        { x: 260, y: 340 },
        { x: 130, y: 340 },
        { x: 130, y: 480 },
        { x: 470, y: 480 },
        { x: 470, y: 220 },
        { x: 670, y: 220 },
        { x: 670, y: 440 },
        { x: 820, y: 440 },
        { x: 820, y: 190 },
        { x: 930, y: 190 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 80, y: 60 },
      { id: 'p2', x: 190, y: 60 },
      { id: 'p3', x: 190, y: 220 },
      { id: 'p4', x: 80, y: 250 },
      { id: 'p5', x: 80, y: 400 },
      { id: 'p6', x: 200, y: 400 },
      { id: 'p7', x: 370, y: 420 },
      { id: 'p8', x: 370, y: 260 },
      { id: 'p9', x: 470, y: 140 },
      { id: 'p10', x: 570, y: 140 },
      { id: 'p11', x: 570, y: 300 },
      { id: 'p12', x: 570, y: 440 },
      { id: 'p13', x: 740, y: 360 },
      { id: 'p14', x: 740, y: 220 },
      { id: 'p15', x: 740, y: 500 },
      { id: 'p16', x: 880, y: 260 },
      { id: 'p17', x: 880, y: 120 },
      { id: 'p18', x: 880, y: 390 },
      { id: 'p19', x: 280, y: 500 },
      { id: 'p20', x: 600, y: 500 }
    ],
    waves: [
      {
        title: '第一波：虛數鏡像突襲',
        tip: '密集負平方怪(-49, -64, -81, -100)衝鋒！',
        enemies: [
          { val: -49, speed: 76, delay: 0.5 },
          { val: 49, speed: 76, delay: 0.5 },
          { val: -64, speed: 74, delay: 0.5 },
          { val: 64, speed: 74, delay: 0.5 },
          { val: -81, speed: 72, delay: 0.6 },
          { val: 81, speed: 72, delay: 0.6 },
          { val: -100, speed: 70, delay: 0.7 },
          { val: 100, speed: 70, delay: 0.7 }
        ]
      },
      {
        title: '第二波：負質數與負平方交錯',
        tip: '稜鏡淨化轉正後，運算子調整與方根井秒殺！',
        enemies: [
          { val: -41, speed: 78, delay: 0.4 },
          { val: -43, speed: 78, delay: 0.4 },
          { val: -121, speed: 76, delay: 0.5 },
          { val: 121, speed: 76, delay: 0.5 },
          { val: -144, speed: 74, delay: 0.5 },
          { val: 144, speed: 74, delay: 0.5 },
          { val: -169, speed: 72, delay: 0.6 },
          { val: 196, speed: 70, delay: 0.6 },
          { val: -225, speed: 68, delay: 0.7 },
          { val: 256, speed: 66, delay: 0.7 }
        ]
      },
      {
        title: '第三波：維度崩塌狂潮',
        tip: '高速密集複合大軍全速突進！',
        enemies: [
          { val: -196, speed: 82, delay: 0.4 },
          { val: 196, speed: 82, delay: 0.4 },
          { val: -256, speed: 80, delay: 0.4 },
          { val: 256, speed: 80, delay: 0.5 },
          { val: -289, speed: 78, delay: 0.5 },
          { val: 324, speed: 76, delay: 0.5 },
          { val: -361, speed: 74, delay: 0.6 },
          { val: 400, speed: 72, delay: 0.6 },
          { val: -441, speed: 70, delay: 0.7 },
          { val: 484, speed: 68, delay: 0.7 }
        ]
      }
    ]
  },

  '5-2': {
    id: '5-2',
    chapterId: 'world-5',
    name: '5-2 莫比烏斯之環（無限迴圈）',
    subtitle: '雙路立體無限交叉迴圈',
    tip: '💡 20 處要塞基座！8 字型交叉雙路徑，四向交錯火力覆蓋核心！',
    nextLevelId: '5-3',
    initialGold: 1250,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 140 },
        { x: 230, y: 140 },
        { x: 230, y: 400 },
        { x: 440, y: 400 },
        { x: 440, y: 120 },
        { x: 670, y: 120 },
        { x: 670, y: 380 },
        { x: 820, y: 380 },
        { x: 930, y: 260 }
      ],
      [
        { x: 30, y: 420 },
        { x: 230, y: 420 },
        { x: 230, y: 160 },
        { x: 440, y: 160 },
        { x: 440, y: 440 },
        { x: 670, y: 440 },
        { x: 670, y: 180 },
        { x: 820, y: 180 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 70 },
      { id: 'p2', x: 120, y: 230 },
      { id: 'p3', x: 120, y: 350 },
      { id: 'p4', x: 120, y: 490 },
      { id: 'p5', x: 330, y: 180 },
      { id: 'p6', x: 330, y: 360 },
      { id: 'p7', x: 440, y: 260 },
      { id: 'p8', x: 440, y: 50 },
      { id: 'p9', x: 550, y: 180 },
      { id: 'p10', x: 550, y: 360 },
      { id: 'p11', x: 670, y: 260 },
      { id: 'p12', x: 670, y: 50 },
      { id: 'p13', x: 750, y: 110 },
      { id: 'p14', x: 750, y: 280 },
      { id: 'p15', x: 750, y: 450 },
      { id: 'p16', x: 860, y: 110 },
      { id: 'p17', x: 860, y: 280 },
      { id: 'p18', x: 860, y: 450 },
      { id: 'p19', x: 230, y: 490 },
      { id: 'p20', x: 440, y: 490 }
    ],
    waves: [
      {
        title: '第一波：莫比烏斯交錯突刺',
        tip: '雙路在中央劇烈交叉，集中中央陣地！',
        enemies: [
          { val: 36, lane: 0, speed: 78, delay: 0.5 },
          { val: 36, lane: 1, speed: 78, delay: 0.5 },
          { val: 48, lane: 0, speed: 76, delay: 0.5 },
          { val: 48, lane: 1, speed: 76, delay: 0.5 },
          { val: 60, lane: 0, speed: 74, delay: 0.6 },
          { val: 60, lane: 1, speed: 74, delay: 0.6 },
          { val: 72, lane: 0, speed: 72, delay: 0.7 },
          { val: 72, lane: 1, speed: 72, delay: 0.7 }
        ]
      },
      {
        title: '第二波：無限極性風暴',
        tip: '正負雙路混合大軍狂飆！',
        enemies: [
          { val: -60, lane: 0, speed: 82, delay: 0.4 },
          { val: 60, lane: 1, speed: 82, delay: 0.4 },
          { val: -72, lane: 0, speed: 80, delay: 0.5 },
          { val: 72, lane: 1, speed: 80, delay: 0.5 },
          { val: -90, lane: 0, speed: 76, delay: 0.5 },
          { val: 90, lane: 1, speed: 76, delay: 0.5 },
          { val: -120, lane: 0, speed: 74, delay: 0.6 },
          { val: 120, lane: 1, speed: 74, delay: 0.6 },
          { val: -144, lane: 0, speed: 70, delay: 0.7 },
          { val: 144, lane: 1, speed: 70, delay: 0.7 }
        ]
      },
      {
        title: '第三波：雙環全屏大狂潮',
        tip: '36 隻高速高階怪全速突擊！',
        enemies: [
          { val: -120, lane: 0, speed: 84, delay: 0.4 },
          { val: 120, lane: 1, speed: 84, delay: 0.4 },
          { val: -144, lane: 0, speed: 82, delay: 0.4 },
          { val: 144, lane: 1, speed: 82, delay: 0.4 },
          { val: -180, lane: 0, speed: 80, delay: 0.5 },
          { val: 180, lane: 1, speed: 80, delay: 0.5 },
          { val: -210, lane: 0, speed: 78, delay: 0.5 },
          { val: 210, lane: 1, speed: 78, delay: 0.5 },
          { val: -240, lane: 0, speed: 76, delay: 0.6 },
          { val: 240, lane: 1, speed: 76, delay: 0.6 },
          { val: -280, lane: 0, speed: 74, delay: 0.7 },
          { val: 280, lane: 1, speed: 74, delay: 0.7 }
        ]
      }
    ]
  },

  '5-3': {
    id: '5-3',
    chapterId: 'world-5',
    name: '5-3 微積分奇異點（連續體衝擊）',
    subtitle: '超高密度連續怪物潮與高次冪巨獸',
    tip: '💡 20 處要塞基座！狂暴超高密度大軍，每波多達 40 隻連續衝鋒！',
    nextLevelId: '5-4',
    initialGold: 1400,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 120 },
        { x: 220, y: 120 },
        { x: 220, y: 260 },
        { x: 420, y: 260 },
        { x: 420, y: 110 },
        { x: 660, y: 110 },
        { x: 660, y: 270 },
        { x: 810, y: 270 },
        { x: 930, y: 270 }
      ],
      [
        { x: 30, y: 440 },
        { x: 220, y: 440 },
        { x: 220, y: 300 },
        { x: 420, y: 300 },
        { x: 420, y: 450 },
        { x: 660, y: 450 },
        { x: 660, y: 290 },
        { x: 810, y: 290 },
        { x: 930, y: 290 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 60 },
      { id: 'p2', x: 120, y: 190 },
      { id: 'p3', x: 120, y: 370 },
      { id: 'p4', x: 120, y: 500 },
      { id: 'p5', x: 320, y: 180 },
      { id: 'p6', x: 320, y: 380 },
      { id: 'p7', x: 420, y: 180 },
      { id: 'p8', x: 420, y: 380 },
      { id: 'p9', x: 540, y: 60 },
      { id: 'p10', x: 540, y: 200 },
      { id: 'p11', x: 540, y: 360 },
      { id: 'p12', x: 540, y: 500 },
      { id: 'p13', x: 660, y: 180 },
      { id: 'p14', x: 660, y: 380 },
      { id: 'p15', x: 740, y: 200 },
      { id: 'p16', x: 740, y: 360 },
      { id: 'p17', x: 870, y: 200 },
      { id: 'p18', x: 870, y: 360 },
      { id: 'p19', x: 270, y: 490 },
      { id: 'p20', x: 590, y: 490 }
    ],
    waves: [
      {
        title: '第一波：微積分密集陣',
        tip: '連續高密度雙路湧出，強化範圍火力！',
        enemies: [
          { val: 64, lane: 0, speed: 82, delay: 0.4 },
          { val: 64, lane: 1, speed: 82, delay: 0.4 },
          { val: 81, lane: 0, speed: 80, delay: 0.4 },
          { val: 81, lane: 1, speed: 80, delay: 0.4 },
          { val: 100, lane: 0, speed: 78, delay: 0.5 },
          { val: 100, lane: 1, speed: 78, delay: 0.5 },
          { val: 128, lane: 0, speed: 76, delay: 0.5 },
          { val: 128, lane: 1, speed: 76, delay: 0.5 },
          { val: 144, lane: 0, speed: 74, delay: 0.6 },
          { val: 144, lane: 1, speed: 74, delay: 0.6 }
        ]
      },
      {
        title: '第二波：高次冪連續風暴',
        tip: '256, 384, 512 巨獸接踵而至！',
        enemies: [
          { val: 128, lane: 0, speed: 84, delay: 0.4 },
          { val: 128, lane: 1, speed: 84, delay: 0.4 },
          { val: 192, lane: 0, speed: 82, delay: 0.4 },
          { val: 192, lane: 1, speed: 82, delay: 0.4 },
          { val: 256, lane: 0, speed: 80, delay: 0.5 },
          { val: 256, lane: 1, speed: 80, delay: 0.5 },
          { val: 384, lane: 0, speed: 76, delay: 0.5 },
          { val: 384, lane: 1, speed: 76, delay: 0.5 },
          { val: 512, lane: 0, speed: 72, delay: 0.6 },
          { val: 512, lane: 1, speed: 72, delay: 0.6 }
        ]
      },
      {
        title: '第三波：連續體極限大崩塌',
        tip: '全速狂湧！512, 768, 1024 終極集團全力衝鋒！',
        enemies: [
          { val: 256, lane: 0, speed: 88, delay: 0.4 },
          { val: 256, lane: 1, speed: 88, delay: 0.4 },
          { val: 384, lane: 0, speed: 86, delay: 0.4 },
          { val: 384, lane: 1, speed: 86, delay: 0.4 },
          { val: 512, lane: 0, speed: 82, delay: 0.5 },
          { val: 512, lane: 1, speed: 82, delay: 0.5 },
          { val: 640, lane: 0, speed: 80, delay: 0.5 },
          { val: 640, lane: 1, speed: 80, delay: 0.5 },
          { val: 768, lane: 0, speed: 76, delay: 0.6 },
          { val: 768, lane: 1, speed: 76, delay: 0.6 },
          { val: 1024, lane: 0, speed: 70, delay: 0.7 },
          { val: 1024, lane: 1, speed: 70, delay: 0.7 }
        ]
      }
    ]
  },

  '5-4': {
    id: '5-4',
    chapterId: 'world-5',
    name: '5-4 【全宇宙最終決戰】極限造物魔神【2520】（終焉奇異點要塞）',
    subtitle: '全宇宙數論神級終極大決戰',
    tip: '👑 20 處終極要塞基座！最小能被 1~10 全除之神【極限造物魔神 2520】親征！全數論防禦塔齊心合力贏取最終榮耀！',
    nextLevelId: null,
    initialGold: 1600,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 110 },
        { x: 200, y: 110 },
        { x: 200, y: 250 },
        { x: 390, y: 250 },
        { x: 390, y: 90 },
        { x: 600, y: 90 },
        { x: 600, y: 250 },
        { x: 740, y: 250 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ],
      [
        { x: 30, y: 450 },
        { x: 200, y: 450 },
        { x: 200, y: 310 },
        { x: 390, y: 310 },
        { x: 390, y: 470 },
        { x: 600, y: 470 },
        { x: 600, y: 310 },
        { x: 740, y: 310 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 110, y: 50 },
      { id: 'p2', x: 110, y: 170 },
      { id: 'p3', x: 110, y: 390 },
      { id: 'p4', x: 110, y: 510 },
      { id: 'p5', x: 290, y: 180 },
      { id: 'p6', x: 290, y: 380 },
      { id: 'p7', x: 390, y: 180 },
      { id: 'p8', x: 390, y: 380 },
      { id: 'p9', x: 490, y: 50 },
      { id: 'p10', x: 490, y: 170 },
      { id: 'p11', x: 490, y: 390 },
      { id: 'p12', x: 490, y: 510 },
      { id: 'p13', x: 600, y: 170 },
      { id: 'p14', x: 600, y: 390 },
      { id: 'p15', x: 670, y: 170 },
      { id: 'p16', x: 670, y: 390 },
      { id: 'p17', x: 820, y: 200 },
      { id: 'p18', x: 820, y: 360 },
      { id: 'p19', x: 890, y: 200 },
      { id: 'p20', x: 890, y: 360 }
    ],
    waves: [
      {
        title: '第一波：終焉親衛軍團集結',
        tip: '四大軍團精銳傾巢而出！',
        enemies: [
          { val: 120, lane: 0, speed: 82, delay: 0.4 },
          { val: 120, lane: 1, speed: 82, delay: 0.4 },
          { val: 180, lane: 0, speed: 80, delay: 0.5 },
          { val: 180, lane: 1, speed: 80, delay: 0.5 },
          { val: 240, lane: 0, speed: 78, delay: 0.5 },
          { val: 240, lane: 1, speed: 78, delay: 0.5 },
          { val: 360, lane: 0, speed: 75, delay: 0.6 },
          { val: 360, lane: 1, speed: 75, delay: 0.6 },
          { val: 420, lane: 0, speed: 72, delay: 0.7 },
          { val: 420, lane: 1, speed: 72, delay: 0.7 }
        ]
      },
      {
        title: '第二波：神聖四倍率浩劫',
        tip: '630, 840, 1260 狂暴雙路並進！',
        enemies: [
          { val: 360, lane: 0, speed: 85, delay: 0.4 },
          { val: 360, lane: 1, speed: 85, delay: 0.4 },
          { val: 420, lane: 0, speed: 82, delay: 0.4 },
          { val: 420, lane: 1, speed: 82, delay: 0.4 },
          { val: 504, lane: 0, speed: 80, delay: 0.5 },
          { val: 504, lane: 1, speed: 80, delay: 0.5 },
          { val: 630, lane: 0, speed: 78, delay: 0.5 },
          { val: 630, lane: 1, speed: 78, delay: 0.5 },
          { val: 840, lane: 0, speed: 74, delay: 0.6 },
          { val: 840, lane: 1, speed: 74, delay: 0.6 },
          { val: 1260, lane: 0, speed: 70, delay: 0.7 },
          { val: 1260, lane: 1, speed: 70, delay: 0.7 }
        ]
      },
      {
        title: '宇宙終焉大決戰：極限造物魔神【2520】親征！',
        tip: '造物主親臨！2520 超神級生命值！全塔防線開火！',
        enemies: [
          { val: 210, lane: 0, speed: 86, delay: 0.4 },
          { val: 210, lane: 1, speed: 86, delay: 0.4 },
          { val: 420, lane: 0, speed: 84, delay: 0.4 },
          { val: 420, lane: 1, speed: 84, delay: 0.4 },
          { val: 630, lane: 0, speed: 80, delay: 0.5 },
          { val: 630, lane: 1, speed: 80, delay: 0.5 },
          { val: 840, lane: 0, speed: 76, delay: 0.6 },
          { val: 840, lane: 1, speed: 76, delay: 0.6 },
          { val: 1260, lane: 0, speed: 72, delay: 0.7 },
          {
            val: 2520,
            lane: 0,
            delay: 3.0,
            isBoss: true,
            bossName: '極限造物魔神【2520】',
            speed: 20,
            bossSkills: ['shield_regen', 'split_adds', 'multiply_aura']
          }
        ]
      }
    ]
  }

};
