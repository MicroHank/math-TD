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
    tip: '💡 路線兩側設有多組三角共鳴基座群！在三角形三個頂點建置質數砲，可啟動幾何共鳴結界！',
    nextLevelId: '1-2',
    initialGold: 600,
    initialLives: 10,
    worldWidth: 1280,
    worldHeight: 720,
    lanes: [
      [
        { x: 60, y: 220 },
        { x: 380, y: 220 },
        { x: 640, y: 440 },
        { x: 920, y: 220 },
        { x: 1220, y: 360 }
      ],
      [
        { x: 60, y: 500 },
        { x: 380, y: 500 },
        { x: 640, y: 280 },
        { x: 920, y: 500 },
        { x: 1220, y: 360 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1 (北路起點前鋒結界，跨越北路)
      { id: 'p1', x: 180, y: 140 },
      { id: 'p2', x: 300, y: 140 },
      { id: 'p3', x: 240, y: 290 },

      // 三角共鳴組 2 (南路起點前鋒結界，跨越南路)
      { id: 'p4', x: 180, y: 580 },
      { id: 'p5', x: 300, y: 580 },
      { id: 'p6', x: 240, y: 430 },

      // 三角共鳴組 3 (北路斜切下行峽谷結界)
      { id: 'p7', x: 410, y: 160 },
      { id: 'p8', x: 510, y: 350 },
      { id: 'p9', x: 400, y: 350 },

      // 三角共鳴組 4 (南路斜切上行峽谷結界)
      { id: 'p10', x: 410, y: 560 },
      { id: 'p11', x: 510, y: 370 },
      { id: 'p12', x: 400, y: 370 },

      // 三角共鳴組 5 (中央交會十字核心光環結界)
      { id: 'p13', x: 640, y: 180 },
      { id: 'p14', x: 570, y: 360 },
      { id: 'p15', x: 710, y: 360 },

      // 三角共鳴組 6 (中央下半十字光環結界)
      { id: 'p16', x: 640, y: 540 },
      { id: 'p17', x: 570, y: 360 },
      { id: 'p18', x: 710, y: 360 },

      // 三角共鳴組 7 (北路終點前哨結界)
      { id: 'p19', x: 780, y: 220 },
      { id: 'p20', x: 920, y: 140 },
      { id: 'p21', x: 960, y: 290 },

      // 三角共鳴組 8 (南路終點前哨結界)
      { id: 'p22', x: 780, y: 500 },
      { id: 'p23', x: 920, y: 580 },
      { id: 'p24', x: 960, y: 430 },

      // 三角共鳴組 9 (核心前終極封鎖門扉)
      { id: 'p25', x: 1060, y: 260 },
      { id: 'p26', x: 1060, y: 460 },
      { id: 'p27', x: 1150, y: 360 }
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
    initialGold: 700,
    initialLives: 10,
    worldWidth: 1560,
    worldHeight: 880,
    lanes: [
      [
        { x: 80, y: 220 },
        { x: 450, y: 220 },
        { x: 750, y: 440 },
        { x: 1100, y: 240 },
        { x: 1500, y: 440 }
      ],
      [
        { x: 80, y: 660 },
        { x: 450, y: 660 },
        { x: 750, y: 440 },
        { x: 1100, y: 640 },
        { x: 1500, y: 440 }
      ],
      [
        { x: 80, y: 440 },
        { x: 420, y: 440 },
        { x: 750, y: 300 },
        { x: 1080, y: 580 },
        { x: 1500, y: 440 }
      ]
    ],
    buildPads: [
      // 北路前線三角組 1
      { id: 'p1', x: 200, y: 140 },
      { id: 'p2', x: 340, y: 140 },
      { id: 'p3', x: 270, y: 290 },

      // 中路前線三角組 2
      { id: 'p4', x: 200, y: 370 },
      { id: 'p5', x: 340, y: 370 },
      { id: 'p6', x: 270, y: 510 },

      // 南路前線三角組 3
      { id: 'p7', x: 200, y: 730 },
      { id: 'p8', x: 340, y: 730 },
      { id: 'p9', x: 270, y: 590 },

      // 匯流中段斜線三角組 4 (北坡)
      { id: 'p10', x: 520, y: 200 },
      { id: 'p11', x: 620, y: 350 },
      { id: 'p12', x: 500, y: 350 },

      // 匯流中段斜線三角組 5 (南坡)
      { id: 'p13', x: 520, y: 680 },
      { id: 'p14', x: 620, y: 530 },
      { id: 'p15', x: 500, y: 530 },

      // 中央主交會三角陣 6
      { id: 'p16', x: 750, y: 180 },
      { id: 'p17', x: 680, y: 440 },
      { id: 'p18', x: 820, y: 440 },

      // 後段北路深谷三角組 7
      { id: 'p19', x: 920, y: 220 },
      { id: 'p20', x: 1060, y: 150 },
      { id: 'p21', x: 1100, y: 310 },

      // 後段南路深谷三角組 8
      { id: 'p22', x: 920, y: 660 },
      { id: 'p23', x: 1060, y: 730 },
      { id: 'p24', x: 1100, y: 570 },

      // 核心大門防衛三角組 9
      { id: 'p25', x: 1260, y: 320 },
      { id: 'p26', x: 1260, y: 560 },
      { id: 'p27', x: 1350, y: 440 },

      // 終端核心貼身守衛 10
      { id: 'p28', x: 1420, y: 340 },
      { id: 'p29', x: 1420, y: 540 },
      { id: 'p30', x: 1480, y: 340 }
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
    tip: '💡 11 組三角共鳴基座群（33處火線據點）！在三條峽谷交匯處建置質數砲啟動幾何共鳴結界！',
    nextLevelId: '1-4',
    initialGold: 850,
    initialLives: 10,
    worldWidth: 1720,
    worldHeight: 960,
    lanes: [
      [
        { x: 80, y: 240 },
        { x: 480, y: 240 },
        { x: 820, y: 480 },
        { x: 1220, y: 260 },
        { x: 1640, y: 480 }
      ],
      [
        { x: 80, y: 480 },
        { x: 460, y: 480 },
        { x: 860, y: 260 },
        { x: 1260, y: 720 },
        { x: 1640, y: 480 }
      ],
      [
        { x: 80, y: 720 },
        { x: 500, y: 720 },
        { x: 880, y: 520 },
        { x: 1240, y: 380 },
        { x: 1640, y: 480 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1 (北路入口前鋒)
      { id: 'p1', x: 220, y: 160 },
      { id: 'p2', x: 340, y: 160 },
      { id: 'p3', x: 280, y: 310 },

      // 三角共鳴組 2 (中路入口防禦)
      { id: 'p4', x: 200, y: 410 },
      { id: 'p5', x: 320, y: 410 },
      { id: 'p6', x: 260, y: 550 },

      // 三角共鳴組 3 (南路入口防禦)
      { id: 'p7', x: 220, y: 650 },
      { id: 'p8', x: 340, y: 650 },
      { id: 'p9', x: 280, y: 800 },

      // 三角共鳴組 4 (北-中分流交叉區)
      { id: 'p10', x: 580, y: 200 },
      { id: 'p11', x: 680, y: 280 },
      { id: 'p12', x: 560, y: 340 },

      // 三角共鳴組 5 (中-南交匯中心高地)
      { id: 'p13', x: 620, y: 540 },
      { id: 'p14', x: 720, y: 620 },
      { id: 'p15', x: 600, y: 700 },

      // 三角共鳴組 6 (中央五芒星核心結界)
      { id: 'p16', x: 800, y: 380 },
      { id: 'p17', x: 920, y: 380 },
      { id: 'p18', x: 860, y: 560 },

      // 三角共鳴組 7 (東北折返坡)
      { id: 'p19', x: 1040, y: 180 },
      { id: 'p20', x: 1160, y: 180 },
      { id: 'p21', x: 1100, y: 330 },

      // 三角共鳴組 8 (東南深谷腹地)
      { id: 'p22', x: 1040, y: 680 },
      { id: 'p23', x: 1160, y: 680 },
      { id: 'p24', x: 1100, y: 820 },

      // 三角共鳴組 9 (東翼中樞絞殺陣)
      { id: 'p25', x: 1360, y: 320 },
      { id: 'p26', x: 1480, y: 320 },
      { id: 'p27', x: 1420, y: 460 },

      // 三角共鳴組 10 (東翼南部封鎖線)
      { id: 'p28', x: 1360, y: 640 },
      { id: 'p29', x: 1480, y: 640 },
      { id: 'p30', x: 1420, y: 780 },

      // 三角共鳴組 11 (終點三位一體核心門戶)
      { id: 'p31', x: 1540, y: 400 },
      { id: 'p32', x: 1540, y: 560 },
      { id: 'p33', x: 1660, y: 400 }
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
    tip: '👑 12 組三角要塞基座群（36處陣地）！泰坦自多條航道夾攻，善用質數三角結界與【√x 方根重力井】阻截合數泰坦！',
    nextLevelId: '2-1',
    initialGold: 1000,
    initialLives: 10,
    worldWidth: 1920,
    worldHeight: 1080,
    lanes: [
      [
        { x: 80, y: 260 },
        { x: 540, y: 260 },
        { x: 960, y: 440 },
        { x: 1420, y: 280 },
        { x: 1840, y: 540 }
      ],
      [
        { x: 80, y: 820 },
        { x: 540, y: 820 },
        { x: 960, y: 640 },
        { x: 1420, y: 800 },
        { x: 1840, y: 540 }
      ],
      [
        { x: 160, y: 140 },
        { x: 740, y: 380 },
        { x: 1180, y: 380 },
        { x: 1580, y: 480 },
        { x: 1840, y: 540 }
      ],
      [
        { x: 160, y: 940 },
        { x: 740, y: 700 },
        { x: 1180, y: 700 },
        { x: 1580, y: 600 },
        { x: 1840, y: 540 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1 (西北要塞外環)
      { id: 'p1', x: 260, y: 180 },
      { id: 'p2', x: 380, y: 180 },
      { id: 'p3', x: 320, y: 320 },

      // 三角共鳴組 2 (西南要塞外環)
      { id: 'p4', x: 260, y: 760 },
      { id: 'p5', x: 380, y: 760 },
      { id: 'p6', x: 320, y: 900 },

      // 三角共鳴組 3 (北翼前哨交火區)
      { id: 'p7', x: 520, y: 140 },
      { id: 'p8', x: 640, y: 140 },
      { id: 'p9', x: 580, y: 340 },

      // 三角共鳴組 4 (南翼前哨交火區)
      { id: 'p10', x: 520, y: 740 },
      { id: 'p11', x: 640, y: 740 },
      { id: 'p12', x: 580, y: 940 },

      // 三角共鳴組 5 (中央西北內環結界)
      { id: 'p13', x: 780, y: 300 },
      { id: 'p14', x: 900, y: 300 },
      { id: 'p15', x: 840, y: 480 },

      // 三角共鳴組 6 (中央西南內環結界)
      { id: 'p16', x: 780, y: 600 },
      { id: 'p17', x: 900, y: 600 },
      { id: 'p18', x: 840, y: 780 },

      // 三角共鳴組 7 (泰坦樞紐十字核心)
      { id: 'p19', x: 960, y: 360 },
      { id: 'p20', x: 1080, y: 480 },
      { id: 'p21', x: 960, y: 600 },

      // 三角共鳴組 8 (東北縱深重砲陣)
      { id: 'p22', x: 1220, y: 200 },
      { id: 'p23', x: 1340, y: 200 },
      { id: 'p24', x: 1280, y: 350 },

      // 三角共鳴組 9 (東南縱深重砲陣)
      { id: 'p25', x: 1220, y: 730 },
      { id: 'p26', x: 1340, y: 730 },
      { id: 'p27', x: 1280, y: 880 },

      // 三角共鳴組 10 (要塞東門北夾擊群)
      { id: 'p28', x: 1460, y: 380 },
      { id: 'p29', x: 1580, y: 380 },
      { id: 'p30', x: 1520, y: 520 },

      // 三角共鳴組 11 (要塞東門南夾擊群)
      { id: 'p31', x: 1460, y: 680 },
      { id: 'p32', x: 1580, y: 680 },
      { id: 'p33', x: 1520, y: 820 },

      // 三角共鳴組 12 (終焉要塞核心三曜守護塔)
      { id: 'p34', x: 1720, y: 460 },
      { id: 'p35', x: 1720, y: 620 },
      { id: 'p36', x: 1840, y: 460 }
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
    tip: '💡 進入第二大關大地圖（1920x1080）！12 組三角基座群（36處陣地）橫跨沼澤！在交叉通道配置「絕對值稜鏡」淨化負數怪！',
    nextLevelId: '2-2',
    initialGold: 1100,
    initialLives: 10,
    worldWidth: 1920,
    worldHeight: 1080,
    lanes: [
      [
        { x: 80, y: 260 },
        { x: 540, y: 260 },
        { x: 840, y: 540 },
        { x: 1180, y: 260 },
        { x: 1520, y: 460 },
        { x: 1840, y: 540 }
      ],
      [
        { x: 80, y: 820 },
        { x: 540, y: 820 },
        { x: 840, y: 540 },
        { x: 1180, y: 820 },
        { x: 1520, y: 620 },
        { x: 1840, y: 540 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1 (北路沼澤起點)
      { id: 'p1', x: 220, y: 180 },
      { id: 'p2', x: 340, y: 180 },
      { id: 'p3', x: 280, y: 330 },

      // 三角共鳴組 2 (南路沼澤起點)
      { id: 'p4', x: 220, y: 750 },
      { id: 'p5', x: 340, y: 750 },
      { id: 'p6', x: 280, y: 900 },

      // 三角共鳴組 3 (北路中段緩衝池)
      { id: 'p7', x: 480, y: 180 },
      { id: 'p8', x: 600, y: 180 },
      { id: 'p9', x: 540, y: 340 },

      // 三角共鳴組 4 (南路中段緩衝池)
      { id: 'p10', x: 480, y: 740 },
      { id: 'p11', x: 600, y: 740 },
      { id: 'p12', x: 540, y: 900 },

      // 三角共鳴組 5 (中央交匯口北側要衝)
      { id: 'p13', x: 720, y: 380 },
      { id: 'p14', x: 840, y: 380 },
      { id: 'p15', x: 780, y: 520 },

      // 三角共鳴組 6 (中央交匯口南側要衝)
      { id: 'p16', x: 720, y: 560 },
      { id: 'p17', x: 840, y: 560 },
      { id: 'p18', x: 780, y: 700 },

      // 三角共鳴組 7 (東北分離區)
      { id: 'p19', x: 1020, y: 180 },
      { id: 'p20', x: 1140, y: 180 },
      { id: 'p21', x: 1080, y: 330 },

      // 三角共鳴組 8 (東南分離區)
      { id: 'p22', x: 1020, y: 750 },
      { id: 'p23', x: 1140, y: 750 },
      { id: 'p24', x: 1080, y: 900 },

      // 三角共鳴組 9 (東部峽谷北側結界)
      { id: 'p25', x: 1320, y: 280 },
      { id: 'p26', x: 1440, y: 280 },
      { id: 'p27', x: 1380, y: 430 },

      // 三角共鳴組 10 (東部峽谷南側結界)
      { id: 'p28', x: 1320, y: 650 },
      { id: 'p29', x: 1440, y: 650 },
      { id: 'p30', x: 1380, y: 800 },

      // 三角共鳴組 11 (終點前線雙側合圍)
      { id: 'p31', x: 1580, y: 380 },
      { id: 'p32', x: 1700, y: 380 },
      { id: 'p33', x: 1640, y: 520 },

      // 三角共鳴組 12 (終點核心結界)
      { id: 'p34', x: 1580, y: 660 },
      { id: 'p35', x: 1700, y: 660 },
      { id: 'p36', x: 1760, y: 520 }
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
    tip: '⚠️ 13 組三角共鳴據點群（39處陣地）！上下兩路對稱蜿蜒並與中路交錯，在中央大廳展開合圍殲滅！',
    nextLevelId: '2-3',
    initialGold: 1200,
    initialLives: 10,
    worldWidth: 2080,
    worldHeight: 1160,
    lanes: [
      [
        { x: 80, y: 220 },
        { x: 580, y: 220 },
        { x: 920, y: 460 },
        { x: 1320, y: 240 },
        { x: 1680, y: 580 },
        { x: 2000, y: 580 }
      ],
      [
        { x: 80, y: 940 },
        { x: 580, y: 940 },
        { x: 920, y: 700 },
        { x: 1320, y: 920 },
        { x: 1680, y: 580 },
        { x: 2000, y: 580 }
      ],
      [
        { x: 80, y: 580 },
        { x: 480, y: 580 },
        { x: 820, y: 340 },
        { x: 1220, y: 820 },
        { x: 1680, y: 580 },
        { x: 2000, y: 580 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1 (上路起點外翼)
      { id: 'p1', x: 220, y: 140 },
      { id: 'p2', x: 340, y: 140 },
      { id: 'p3', x: 280, y: 280 },

      // 三角共鳴組 2 (中路西側樞紐)
      { id: 'p4', x: 200, y: 500 },
      { id: 'p5', x: 320, y: 500 },
      { id: 'p6', x: 260, y: 650 },

      // 三角共鳴組 3 (下路起點外翼)
      { id: 'p7', x: 220, y: 860 },
      { id: 'p8', x: 340, y: 860 },
      { id: 'p9', x: 280, y: 1000 },

      // 三角共鳴組 4 (北路斜坡入口)
      { id: 'p10', x: 540, y: 140 },
      { id: 'p11', x: 660, y: 140 },
      { id: 'p12', x: 600, y: 300 },

      // 三角共鳴組 5 (南路斜坡入口)
      { id: 'p13', x: 540, y: 860 },
      { id: 'p14', x: 660, y: 860 },
      { id: 'p15', x: 600, y: 1020 },

      // 三角共鳴組 6 (中央高地北三角)
      { id: 'p16', x: 780, y: 400 },
      { id: 'p17', x: 900, y: 400 },
      { id: 'p18', x: 840, y: 560 },

      // 三角共鳴組 7 (中央高地南三角)
      { id: 'p19', x: 780, y: 640 },
      { id: 'p20', x: 900, y: 640 },
      { id: 'p21', x: 840, y: 800 },

      // 三角共鳴組 8 (東行北坡高地)
      { id: 'p22', x: 1140, y: 160 },
      { id: 'p23', x: 1260, y: 160 },
      { id: 'p24', x: 1200, y: 320 },

      // 三角共鳴組 9 (東行南坡低谷)
      { id: 'p25', x: 1140, y: 840 },
      { id: 'p26', x: 1260, y: 840 },
      { id: 'p27', x: 1200, y: 1000 },

      // 三角共鳴組 10 (東部絞殺北翼)
      { id: 'p28', x: 1440, y: 360 },
      { id: 'p29', x: 1560, y: 360 },
      { id: 'p30', x: 1500, y: 520 },

      // 三角共鳴組 11 (東部絞殺南翼)
      { id: 'p31', x: 1440, y: 640 },
      { id: 'p32', x: 1560, y: 640 },
      { id: 'p33', x: 1500, y: 800 },

      // 三角共鳴組 12 (中路長廊北側終哨)
      { id: 'p34', x: 1740, y: 460 },
      { id: 'p35', x: 1860, y: 460 },
      { id: 'p36', x: 1800, y: 620 },

      // 三角共鳴組 13 (中路長廊南側終哨)
      { id: 'p37', x: 1740, y: 700 },
      { id: 'p38', x: 1860, y: 700 },
      { id: 'p39', x: 1940, y: 540 }
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
    tip: '⚡ 14 組三角矩陣群（42處量子基座）！高地圖（2240x1240）下，在多段折線交會點佈設運算子塔與質數重砲發動連鎖反應！',
    nextLevelId: '2-4',
    initialGold: 1300,
    initialLives: 10,
    worldWidth: 2240,
    worldHeight: 1240,
    lanes: [
      [
        { x: 80, y: 280 },
        { x: 580, y: 280 },
        { x: 980, y: 620 },
        { x: 1420, y: 300 },
        { x: 1820, y: 620 },
        { x: 2160, y: 620 }
      ],
      [
        { x: 80, y: 620 },
        { x: 540, y: 960 },
        { x: 1040, y: 320 },
        { x: 1500, y: 940 },
        { x: 1860, y: 620 },
        { x: 2160, y: 620 }
      ],
      [
        { x: 80, y: 980 },
        { x: 600, y: 620 },
        { x: 1000, y: 980 },
        { x: 1460, y: 620 },
        { x: 1840, y: 620 },
        { x: 2160, y: 620 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1 (量子西門北路口)
      { id: 'p1', x: 220, y: 180 },
      { id: 'p2', x: 340, y: 180 },
      { id: 'p3', x: 280, y: 340 },

      // 三角共鳴組 2 (量子西門中路口)
      { id: 'p4', x: 200, y: 520 },
      { id: 'p5', x: 320, y: 520 },
      { id: 'p6', x: 260, y: 680 },

      // 三角共鳴組 3 (量子西門南路口)
      { id: 'p7', x: 220, y: 880 },
      { id: 'p8', x: 340, y: 880 },
      { id: 'p9', x: 280, y: 1040 },

      // 三角共鳴組 4 (第一折線北緩衝池)
      { id: 'p10', x: 520, y: 180 },
      { id: 'p11', x: 640, y: 180 },
      { id: 'p12', x: 580, y: 350 },

      // 三角共鳴組 5 (第一折線南緩衝池)
      { id: 'p13', x: 520, y: 800 },
      { id: 'p14', x: 640, y: 800 },
      { id: 'p15', x: 580, y: 980 },

      // 三角共鳴組 6 (中央量子交錯區北翼)
      { id: 'p16', x: 820, y: 440 },
      { id: 'p17', x: 940, y: 440 },
      { id: 'p18', x: 880, y: 600 },

      // 三角共鳴組 7 (中央量子交錯區南翼)
      { id: 'p19', x: 820, y: 660 },
      { id: 'p20', x: 940, y: 660 },
      { id: 'p21', x: 880, y: 820 },

      // 三角共鳴組 8 (次級量子北穹頂)
      { id: 'p22', x: 1200, y: 220 },
      { id: 'p23', x: 1320, y: 220 },
      { id: 'p24', x: 1260, y: 380 },

      // 三角共鳴組 9 (次級量子南地穴)
      { id: 'p25', x: 1200, y: 860 },
      { id: 'p26', x: 1320, y: 860 },
      { id: 'p27', x: 1260, y: 1020 },

      // 三角共鳴組 10 (東部量子絞殺北側)
      { id: 'p28', x: 1560, y: 380 },
      { id: 'p29', x: 1680, y: 380 },
      { id: 'p30', x: 1620, y: 540 },

      // 三角共鳴組 11 (東部量子絞殺南側)
      { id: 'p31', x: 1560, y: 700 },
      { id: 'p32', x: 1680, y: 700 },
      { id: 'p33', x: 1620, y: 860 },

      // 三角共鳴組 12 (匯流走廊前哨)
      { id: 'p34', x: 1740, y: 480 },
      { id: 'p35', x: 1860, y: 480 },
      { id: 'p36', x: 1800, y: 640 },

      // 三角共鳴組 13 (終點前線合圍結界)
      { id: 'p37', x: 1940, y: 500 },
      { id: 'p38', x: 2060, y: 500 },
      { id: 'p39', x: 2000, y: 660 },

      // 三角共鳴組 14 (核心三相穩壓塔座)
      { id: 'p40', x: 1940, y: 720 },
      { id: 'p41', x: 2060, y: 720 },
      { id: 'p42', x: 2140, y: 540 }
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
    tip: '👑 15 組終焉三角基座群（45處陣地）！魔王持有 -720 負數巨盾，在 2400x1320 巨幅要塞中佈滿質數多重共鳴三角結界予以破除！',
    nextLevelId: '3-1',
    initialGold: 1450,
    initialLives: 10,
    worldWidth: 2400,
    worldHeight: 1320,
    lanes: [
      [
        { x: 80, y: 280 },
        { x: 680, y: 280 },
        { x: 1200, y: 660 },
        { x: 1740, y: 320 },
        { x: 2320, y: 660 }
      ],
      [
        { x: 80, y: 1040 },
        { x: 680, y: 1040 },
        { x: 1200, y: 660 },
        { x: 1740, y: 1000 },
        { x: 2320, y: 660 }
      ],
      [
        { x: 80, y: 660 },
        { x: 600, y: 660 },
        { x: 950, y: 380 },
        { x: 1450, y: 940 },
        { x: 1950, y: 660 },
        { x: 2320, y: 660 }
      ],
      [
        { x: 160, y: 140 },
        { x: 850, y: 520 },
        { x: 1200, y: 880 },
        { x: 1650, y: 480 },
        { x: 2320, y: 660 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1 (虛空西北外環)
      { id: 'p1', x: 240, y: 180 },
      { id: 'p2', x: 360, y: 180 },
      { id: 'p3', x: 300, y: 340 },

      // 三角共鳴組 2 (虛空西側中門)
      { id: 'p4', x: 220, y: 560 },
      { id: 'p5', x: 340, y: 560 },
      { id: 'p6', x: 280, y: 720 },

      // 三角共鳴組 3 (虛空西南外環)
      { id: 'p7', x: 240, y: 940 },
      { id: 'p8', x: 360, y: 940 },
      { id: 'p9', x: 300, y: 1100 },

      // 三角共鳴組 4 (雙螺旋北入口要塞)
      { id: 'p10', x: 560, y: 180 },
      { id: 'p11', x: 680, y: 180 },
      { id: 'p12', x: 620, y: 350 },

      // 三角共鳴組 5 (雙螺旋南入口要塞)
      { id: 'p13', x: 560, y: 950 },
      { id: 'p14', x: 680, y: 950 },
      { id: 'p15', x: 620, y: 1120 },

      // 三角共鳴組 6 (螺旋北側交匯前線)
      { id: 'p16', x: 860, y: 260 },
      { id: 'p17', x: 980, y: 260 },
      { id: 'p18', x: 920, y: 420 },

      // 三角共鳴組 7 (螺旋南側交匯前線)
      { id: 'p19', x: 860, y: 780 },
      { id: 'p20', x: 980, y: 780 },
      { id: 'p21', x: 920, y: 940 },

      // 三角共鳴組 8 (核心要塞中樞大十字)
      { id: 'p22', x: 1080, y: 540 },
      { id: 'p23', x: 1200, y: 540 },
      { id: 'p24', x: 1140, y: 700 },

      // 三角共鳴組 9 (中樞南翼導流矩陣)
      { id: 'p25', x: 1080, y: 780 },
      { id: 'p26', x: 1200, y: 780 },
      { id: 'p27', x: 1140, y: 940 },

      // 三角共鳴組 10 (東行北側高地重砲群)
      { id: 'p28', x: 1440, y: 220 },
      { id: 'p29', x: 1560, y: 220 },
      { id: 'p30', x: 1500, y: 380 },

      // 三角共鳴組 11 (東行南側低谷絞殺陣)
      { id: 'p31', x: 1440, y: 940 },
      { id: 'p32', x: 1560, y: 940 },
      { id: 'p33', x: 1500, y: 1100 },

      // 三角共鳴組 12 (東部大門北翼堡壘)
      { id: 'p34', x: 1740, y: 440 },
      { id: 'p35', x: 1860, y: 440 },
      { id: 'p36', x: 1800, y: 600 },

      // 三角共鳴組 13 (東部大門南翼堡壘)
      { id: 'p37', x: 1740, y: 720 },
      { id: 'p38', x: 1860, y: 720 },
      { id: 'p39', x: 1800, y: 880 },

      // 三角共鳴組 14 (終焉核心守護結界一)
      { id: 'p40', x: 2020, y: 540 },
      { id: 'p41', x: 2140, y: 540 },
      { id: 'p42', x: 2080, y: 700 },

      // 三角共鳴組 15 (終焉要塞三位一體聖壇)
      { id: 'p43', x: 2200, y: 560 },
      { id: 'p44', x: 2200, y: 760 },
      { id: 'p45', x: 2320, y: 560 }
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
    tip: '💡 13 組三角共鳴群（39處稜線陣地）！密集平方怪來襲，部署「√x 方根重力井」可直接開方並造成 2.5 倍暴擊！',
    nextLevelId: '3-2',
    initialGold: 1400,
    initialLives: 10,
    worldWidth: 2000,
    worldHeight: 1120,
    lanes: [
      [
        { x: 80, y: 280 },
        { x: 560, y: 280 },
        { x: 1100, y: 101 },
        { x: 1560, y: 426 },
        { x: 1880, y: 560 }
      ],
      [
        { x: 80, y: 560 },
        { x: 560, y: 560 },
        { x: 1100, y: 739 },
        { x: 1560, y: 560 },
        { x: 1880, y: 560 }
      ],
      [
        { x: 80, y: 840 },
        { x: 560, y: 840 },
        { x: 1100, y: 661 },
        { x: 1560, y: 694 },
        { x: 1880, y: 560 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 173, y: 279 },
      { id: 'p2', x: 293, y: 279 },
      { id: 'p3', x: 233, y: 379 },

      // 三角共鳴組 2
      { id: 'p4', x: 294, y: 777 },
      { id: 'p5', x: 414, y: 777 },
      { id: 'p6', x: 354, y: 877 },

      // 三角共鳴組 3
      { id: 'p7', x: 416, y: 468 },
      { id: 'p8', x: 536, y: 468 },
      { id: 'p9', x: 476, y: 568 },

      // 三角共鳴組 4
      { id: 'p10', x: 537, y: 200 },
      { id: 'p11', x: 657, y: 200 },
      { id: 'p12', x: 597, y: 300 },

      // 三角共鳴組 5
      { id: 'p13', x: 659, y: 848 },
      { id: 'p14', x: 779, y: 848 },
      { id: 'p15', x: 719, y: 948 },

      // 三角共鳴組 6
      { id: 'p16', x: 780, y: 465 },
      { id: 'p17', x: 900, y: 465 },
      { id: 'p18', x: 840, y: 565 },

      // 三角共鳴組 7
      { id: 'p19', x: 902, y: 312 },
      { id: 'p20', x: 1022, y: 312 },
      { id: 'p21', x: 962, y: 412 },

      // 三角共鳴組 8
      { id: 'p22', x: 1023, y: 733 },
      { id: 'p23', x: 1143, y: 733 },
      { id: 'p24', x: 1083, y: 833 },

      // 三角共鳴組 9
      { id: 'p25', x: 1145, y: 468 },
      { id: 'p26', x: 1265, y: 468 },
      { id: 'p27', x: 1205, y: 568 },

      // 三角共鳴組 10
      { id: 'p28', x: 1266, y: 343 },
      { id: 'p29', x: 1386, y: 343 },
      { id: 'p30', x: 1326, y: 443 },

      // 三角共鳴組 11
      { id: 'p31', x: 1388, y: 711 },
      { id: 'p32', x: 1508, y: 711 },
      { id: 'p33', x: 1448, y: 811 },

      // 三角共鳴組 12
      { id: 'p34', x: 1509, y: 477 },
      { id: 'p35', x: 1629, y: 477 },
      { id: 'p36', x: 1569, y: 577 },

      // 三角共鳴組 13
      { id: 'p37', x: 1631, y: 219 },
      { id: 'p38', x: 1751, y: 219 },
      { id: 'p39', x: 1691, y: 319 }

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
    subtitle: '巨型雙旋深淵與開方連鎖打擊',
    tip: '💡 14 組三角共鳴群（42處斷崖陣地）！雙路旋風俯衝，善用質數三角結界與開方塔鎖死斷崖要道！',
    nextLevelId: '3-3',
    initialGold: 1500,
    initialLives: 10,
    worldWidth: 2160,
    worldHeight: 1200,
    lanes: [
      [
        { x: 80, y: 300 },
        { x: 605, y: 300 },
        { x: 1188, y: 108 },
        { x: 1685, y: 456 },
        { x: 2040, y: 600 }
      ],
      [
        { x: 80, y: 600 },
        { x: 605, y: 600 },
        { x: 1188, y: 792 },
        { x: 1685, y: 600 },
        { x: 2040, y: 600 }
      ],
      [
        { x: 80, y: 900 },
        { x: 605, y: 900 },
        { x: 1188, y: 708 },
        { x: 1685, y: 744 },
        { x: 2040, y: 600 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 174, y: 301 },
      { id: 'p2', x: 294, y: 301 },
      { id: 'p3', x: 234, y: 401 },

      // 三角共鳴組 2
      { id: 'p4', x: 299, y: 835 },
      { id: 'p5', x: 419, y: 835 },
      { id: 'p6', x: 359, y: 935 },

      // 三角共鳴組 3
      { id: 'p7', x: 423, y: 508 },
      { id: 'p8', x: 543, y: 508 },
      { id: 'p9', x: 483, y: 608 },

      // 三角共鳴組 4
      { id: 'p10', x: 547, y: 223 },
      { id: 'p11', x: 667, y: 223 },
      { id: 'p12', x: 607, y: 323 },

      // 三角共鳴組 5
      { id: 'p13', x: 671, y: 906 },
      { id: 'p14', x: 791, y: 906 },
      { id: 'p15', x: 731, y: 1006 },

      // 三角共鳴組 6
      { id: 'p16', x: 795, y: 505 },
      { id: 'p17', x: 915, y: 505 },
      { id: 'p18', x: 855, y: 605 },

      // 三角共鳴組 7
      { id: 'p19', x: 919, y: 334 },
      { id: 'p20', x: 1039, y: 334 },
      { id: 'p21', x: 979, y: 434 },

      // 三角共鳴組 8
      { id: 'p22', x: 1043, y: 791 },
      { id: 'p23', x: 1163, y: 791 },
      { id: 'p24', x: 1103, y: 891 },

      // 三角共鳴組 9
      { id: 'p25', x: 1168, y: 508 },
      { id: 'p26', x: 1288, y: 508 },
      { id: 'p27', x: 1228, y: 608 },

      // 三角共鳴組 10
      { id: 'p28', x: 1292, y: 365 },
      { id: 'p29', x: 1412, y: 365 },
      { id: 'p30', x: 1352, y: 465 },

      // 三角共鳴組 11
      { id: 'p31', x: 1416, y: 768 },
      { id: 'p32', x: 1536, y: 768 },
      { id: 'p33', x: 1476, y: 868 },

      // 三角共鳴組 12
      { id: 'p34', x: 1540, y: 517 },
      { id: 'p35', x: 1660, y: 517 },
      { id: 'p36', x: 1600, y: 617 },

      // 三角共鳴組 13
      { id: 'p37', x: 1664, y: 241 },
      { id: 'p38', x: 1784, y: 241 },
      { id: 'p39', x: 1724, y: 341 },

      // 三角共鳴組 14
      { id: 'p40', x: 1788, y: 893 },
      { id: 'p41', x: 1908, y: 893 },
      { id: 'p42', x: 1848, y: 993 }

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
    name: '3-3 循環與開方迷宮（重力折疊區）',
    subtitle: '循環小數同餘與重力折疊防衛',
    tip: '⚡ 15 組三角矩陣群（45處迷宮基座）！多路立體交會，配置運算子塔與高頻質數砲壓制群魔！',
    nextLevelId: '3-4',
    initialGold: 1600,
    initialLives: 10,
    worldWidth: 2320,
    worldHeight: 1280,
    lanes: [
      [
        { x: 80, y: 256 },
        { x: 650, y: 256 },
        { x: 1276, y: 51 },
        { x: 1810, y: 410 },
        { x: 2200, y: 640 }
      ],
      [
        { x: 80, y: 512 },
        { x: 650, y: 512 },
        { x: 1276, y: 717 },
        { x: 1810, y: 563 },
        { x: 2200, y: 640 }
      ],
      [
        { x: 80, y: 768 },
        { x: 650, y: 768 },
        { x: 1276, y: 563 },
        { x: 1810, y: 717 },
        { x: 2200, y: 640 }
      ],
      [
        { x: 80, y: 1024 },
        { x: 650, y: 1024 },
        { x: 1276, y: 1229 },
        { x: 1810, y: 870 },
        { x: 2200, y: 640 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 176, y: 323 },
      { id: 'p2', x: 296, y: 323 },
      { id: 'p3', x: 236, y: 423 },

      // 三角共鳴組 2
      { id: 'p4', x: 302, y: 892 },
      { id: 'p5', x: 422, y: 892 },
      { id: 'p6', x: 362, y: 992 },

      // 三角共鳴組 3
      { id: 'p7', x: 429, y: 548 },
      { id: 'p8', x: 549, y: 548 },
      { id: 'p9', x: 489, y: 648 },

      // 三角共鳴組 4
      { id: 'p10', x: 555, y: 245 },
      { id: 'p11', x: 675, y: 245 },
      { id: 'p12', x: 615, y: 345 },

      // 三角共鳴組 5
      { id: 'p13', x: 682, y: 963 },
      { id: 'p14', x: 802, y: 963 },
      { id: 'p15', x: 742, y: 1063 },

      // 三角共鳴組 6
      { id: 'p16', x: 808, y: 545 },
      { id: 'p17', x: 928, y: 545 },
      { id: 'p18', x: 868, y: 645 },

      // 三角共鳴組 7
      { id: 'p19', x: 935, y: 356 },
      { id: 'p20', x: 1055, y: 356 },
      { id: 'p21', x: 995, y: 456 },

      // 三角共鳴組 8
      { id: 'p22', x: 1061, y: 849 },
      { id: 'p23', x: 1181, y: 849 },
      { id: 'p24', x: 1121, y: 949 },

      // 三角共鳴組 9
      { id: 'p25', x: 1187, y: 548 },
      { id: 'p26', x: 1307, y: 548 },
      { id: 'p27', x: 1247, y: 648 },

      // 三角共鳴組 10
      { id: 'p28', x: 1314, y: 388 },
      { id: 'p29', x: 1434, y: 388 },
      { id: 'p30', x: 1374, y: 488 },

      // 三角共鳴組 11
      { id: 'p31', x: 1440, y: 826 },
      { id: 'p32', x: 1560, y: 826 },
      { id: 'p33', x: 1500, y: 926 },

      // 三角共鳴組 12
      { id: 'p34', x: 1567, y: 557 },
      { id: 'p35', x: 1687, y: 557 },
      { id: 'p36', x: 1627, y: 657 },

      // 三角共鳴組 13
      { id: 'p37', x: 1693, y: 263 },
      { id: 'p38', x: 1813, y: 263 },
      { id: 'p39', x: 1753, y: 363 },

      // 三角共鳴組 14
      { id: 'p40', x: 1820, y: 950 },
      { id: 'p41', x: 1940, y: 950 },
      { id: 'p42', x: 1880, y: 1050 },

      // 三角共鳴組 15
      { id: 'p43', x: 1946, y: 570 },
      { id: 'p44', x: 2066, y: 570 },
      { id: 'p45', x: 2006, y: 670 }

    ],
    waves: [
      {
        title: '第一波：循環幽靈初現與極性平方',
        tip: '幽靈小數 0.3̇ 與 0.6̇ 登場！使用 3 號砲 ×3 破除分數循環！負平方怪(-36, -49)需經稜鏡轉正！',
        enemies: [
          { val: '0.3', isRecurring: true, recurringType: '0.3', speed: 65, delay: 0.7 },
          { val: 36, speed: 72, delay: 0.6 },
          { val: -36, speed: 72, delay: 0.6 },
          { val: '0.6', isRecurring: true, recurringType: '0.6', speed: 62, delay: 0.8 },
          { val: 49, speed: 70, delay: 0.7 },
          { val: -49, speed: 70, delay: 0.7 },
          { val: '0.3', isRecurring: true, recurringType: '0.3', speed: 66, delay: 0.7 },
          { val: 64, speed: 68, delay: 0.7 },
          { val: -64, speed: 68, delay: 0.8 },
          { val: 81, speed: 66, delay: 0.8 },
          { val: -81, speed: 66, delay: 0.9 },
          { val: 100, speed: 64, delay: 0.9 }
        ]
      },
      {
        title: '第二波：七曜破除與無限循環潮',
        tip: '0.142857(=1/7) 登場！部署 7 號天琴砲 ×7 破除循環！0.9̇ 需運算子微調砲破除！',
        enemies: [
          { val: '0.142857', isRecurring: true, recurringType: '0.142857', speed: 60, delay: 0.8 },
          { val: -64, speed: 75, delay: 0.5 },
          { val: 64, speed: 75, delay: 0.5 },
          { val: '0.3', isRecurring: true, recurringType: '0.3', speed: 66, delay: 0.6 },
          { val: '0.6', isRecurring: true, recurringType: '0.6', speed: 64, delay: 0.7 },
          { val: '0.142857', isRecurring: true, recurringType: '0.142857', speed: 62, delay: 0.7 },
          { val: -81, speed: 72, delay: 0.6 },
          { val: 81, speed: 72, delay: 0.6 },
          { val: -100, speed: 70, delay: 0.6 },
          { val: 100, speed: 70, delay: 0.7 },
          { val: '0.9', isRecurring: true, recurringType: '0.9', speed: 58, delay: 0.8 },
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
        title: '第三波：開方與無盡循環大決戰',
        tip: '循環幽靈混編大平方怪衝鋒，多種砲塔交叉防禦！',
        enemies: [
          { val: '0.3', isRecurring: true, recurringType: '0.3', speed: 68, delay: 0.5 },
          { val: '0.6', isRecurring: true, recurringType: '0.6', speed: 65, delay: 0.5 },
          { val: -144, speed: 78, delay: 0.5 },
          { val: 144, speed: 78, delay: 0.5 },
          { val: '0.142857', isRecurring: true, recurringType: '0.142857', speed: 64, delay: 0.6 },
          { val: -196, speed: 75, delay: 0.5 },
          { val: 196, speed: 75, delay: 0.6 },
          { val: '0.9', isRecurring: true, recurringType: '0.9', speed: 60, delay: 0.6 },
          { val: -225, speed: 72, delay: 0.6 },
          { val: 225, speed: 72, delay: 0.6 },
          { val: '0.6', isRecurring: true, recurringType: '0.6', speed: 66, delay: 0.7 },
          { val: '0.142857', isRecurring: true, recurringType: '0.142857', speed: 64, delay: 0.7 },
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
    subtitle: '第三章開方神殿天峰大決戰',
    tip: '👑 16 組終焉要塞三角群（48處陣地）！泰坦【840】具極高抗性，以多重幾何三角結界與方根重力暴擊擊穿護甲！',
    nextLevelId: '4-1',
    initialGold: 1800,
    initialLives: 10,
    worldWidth: 2480,
    worldHeight: 1360,
    lanes: [
      [
        { x: 80, y: 272 },
        { x: 694, y: 272 },
        { x: 1364, y: 54 },
        { x: 1934, y: 435 },
        { x: 2360, y: 680 }
      ],
      [
        { x: 80, y: 544 },
        { x: 694, y: 544 },
        { x: 1364, y: 762 },
        { x: 1934, y: 598 },
        { x: 2360, y: 680 }
      ],
      [
        { x: 80, y: 816 },
        { x: 694, y: 816 },
        { x: 1364, y: 598 },
        { x: 1934, y: 762 },
        { x: 2360, y: 680 }
      ],
      [
        { x: 80, y: 1088 },
        { x: 694, y: 1088 },
        { x: 1364, y: 1306 },
        { x: 1934, y: 925 },
        { x: 2360, y: 680 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 177, y: 346 },
      { id: 'p2', x: 297, y: 346 },
      { id: 'p3', x: 237, y: 446 },

      // 三角共鳴組 2
      { id: 'p4', x: 306, y: 950 },
      { id: 'p5', x: 426, y: 950 },
      { id: 'p6', x: 366, y: 1050 },

      // 三角共鳴組 3
      { id: 'p7', x: 434, y: 588 },
      { id: 'p8', x: 554, y: 588 },
      { id: 'p9', x: 494, y: 688 },

      // 三角共鳴組 4
      { id: 'p10', x: 563, y: 268 },
      { id: 'p11', x: 683, y: 268 },
      { id: 'p12', x: 623, y: 368 },

      // 三角共鳴組 5
      { id: 'p13', x: 691, y: 1021 },
      { id: 'p14', x: 811, y: 1021 },
      { id: 'p15', x: 751, y: 1121 },

      // 三角共鳴組 6
      { id: 'p16', x: 820, y: 585 },
      { id: 'p17', x: 940, y: 585 },
      { id: 'p18', x: 880, y: 685 },

      // 三角共鳴組 7
      { id: 'p19', x: 948, y: 379 },
      { id: 'p20', x: 1068, y: 379 },
      { id: 'p21', x: 1008, y: 479 },

      // 三角共鳴組 8
      { id: 'p22', x: 1076, y: 906 },
      { id: 'p23', x: 1196, y: 906 },
      { id: 'p24', x: 1136, y: 1006 },

      // 三角共鳴組 9
      { id: 'p25', x: 1205, y: 588 },
      { id: 'p26', x: 1325, y: 588 },
      { id: 'p27', x: 1265, y: 688 },

      // 三角共鳴組 10
      { id: 'p28', x: 1333, y: 410 },
      { id: 'p29', x: 1453, y: 410 },
      { id: 'p30', x: 1393, y: 510 },

      // 三角共鳴組 11
      { id: 'p31', x: 1462, y: 883 },
      { id: 'p32', x: 1582, y: 883 },
      { id: 'p33', x: 1522, y: 983 },

      // 三角共鳴組 12
      { id: 'p34', x: 1590, y: 597 },
      { id: 'p35', x: 1710, y: 597 },
      { id: 'p36', x: 1650, y: 697 },

      // 三角共鳴組 13
      { id: 'p37', x: 1719, y: 286 },
      { id: 'p38', x: 1839, y: 286 },
      { id: 'p39', x: 1779, y: 386 },

      // 三角共鳴組 14
      { id: 'p40', x: 1847, y: 1008 },
      { id: 'p41', x: 1967, y: 1008 },
      { id: 'p42', x: 1907, y: 1108 },

      // 三角共鳴組 15
      { id: 'p43', x: 1976, y: 610 },
      { id: 'p44', x: 2096, y: 610 },
      { id: 'p45', x: 2036, y: 710 },

      // 三角共鳴組 16
      { id: 'p46', x: 2104, y: 307 },
      { id: 'p47', x: 2224, y: 307 },
      { id: 'p48', x: 2164, y: 407 }

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
    subtitle: '質數巨獸群正面突襲戰',
    tip: '💡 16 組三角共鳴群（48處陣地）！大圖寬闊戰場，配置運算子調整塔 (+1 / -1) 快速破拆質數護甲！',
    nextLevelId: '4-2',
    initialGold: 1800,
    initialLives: 10,
    worldWidth: 2500,
    worldHeight: 1380,
    lanes: [
      [
        { x: 80, y: 276 },
        { x: 700, y: 276 },
        { x: 1375, y: 55 },
        { x: 1950, y: 442 },
        { x: 2380, y: 690 }
      ],
      [
        { x: 80, y: 552 },
        { x: 700, y: 552 },
        { x: 1375, y: 773 },
        { x: 1950, y: 607 },
        { x: 2380, y: 690 }
      ],
      [
        { x: 80, y: 828 },
        { x: 700, y: 828 },
        { x: 1375, y: 607 },
        { x: 1950, y: 773 },
        { x: 2380, y: 690 }
      ],
      [
        { x: 80, y: 1104 },
        { x: 700, y: 1104 },
        { x: 1375, y: 1325 },
        { x: 1950, y: 938 },
        { x: 2380, y: 690 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 178, y: 351 },
      { id: 'p2', x: 298, y: 351 },
      { id: 'p3', x: 238, y: 451 },

      // 三角共鳴組 2
      { id: 'p4', x: 308, y: 964 },
      { id: 'p5', x: 428, y: 964 },
      { id: 'p6', x: 368, y: 1064 },

      // 三角共鳴組 3
      { id: 'p7', x: 437, y: 598 },
      { id: 'p8', x: 557, y: 598 },
      { id: 'p9', x: 497, y: 698 },

      // 三角共鳴組 4
      { id: 'p10', x: 567, y: 273 },
      { id: 'p11', x: 687, y: 273 },
      { id: 'p12', x: 627, y: 373 },

      // 三角共鳴組 5
      { id: 'p13', x: 697, y: 1035 },
      { id: 'p14', x: 817, y: 1035 },
      { id: 'p15', x: 757, y: 1135 },

      // 三角共鳴組 6
      { id: 'p16', x: 826, y: 595 },
      { id: 'p17', x: 946, y: 595 },
      { id: 'p18', x: 886, y: 695 },

      // 三角共鳴組 7
      { id: 'p19', x: 956, y: 384 },
      { id: 'p20', x: 1076, y: 384 },
      { id: 'p21', x: 1016, y: 484 },

      // 三角共鳴組 8
      { id: 'p22', x: 1086, y: 921 },
      { id: 'p23', x: 1206, y: 921 },
      { id: 'p24', x: 1146, y: 1021 },

      // 三角共鳴組 9
      { id: 'p25', x: 1215, y: 598 },
      { id: 'p26', x: 1335, y: 598 },
      { id: 'p27', x: 1275, y: 698 },

      // 三角共鳴組 10
      { id: 'p28', x: 1345, y: 416 },
      { id: 'p29', x: 1465, y: 416 },
      { id: 'p30', x: 1405, y: 516 },

      // 三角共鳴組 11
      { id: 'p31', x: 1475, y: 898 },
      { id: 'p32', x: 1595, y: 898 },
      { id: 'p33', x: 1535, y: 998 },

      // 三角共鳴組 12
      { id: 'p34', x: 1604, y: 607 },
      { id: 'p35', x: 1724, y: 607 },
      { id: 'p36', x: 1664, y: 707 },

      // 三角共鳴組 13
      { id: 'p37', x: 1734, y: 291 },
      { id: 'p38', x: 1854, y: 291 },
      { id: 'p39', x: 1794, y: 391 },

      // 三角共鳴組 14
      { id: 'p40', x: 1864, y: 1022 },
      { id: 'p41', x: 1984, y: 1022 },
      { id: 'p42', x: 1924, y: 1122 },

      // 三角共鳴組 15
      { id: 'p43', x: 1994, y: 620 },
      { id: 'p44', x: 2114, y: 620 },
      { id: 'p45', x: 2054, y: 720 },

      // 三角共鳴組 16
      { id: 'p46', x: 2123, y: 312 },
      { id: 'p47', x: 2243, y: 312 },
      { id: 'p48', x: 2183, y: 412 }

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
    subtitle: '同餘旋風與模數限制防守',
    tip: '💡 17 組三角共鳴群（51處基座）！以同餘黑洞秘術與 7 號、11 號砲群鎖死長廊咽喉！',
    nextLevelId: '4-3',
    initialGold: 1950,
    initialLives: 10,
    worldWidth: 2640,
    worldHeight: 1440,
    lanes: [
      [
        { x: 80, y: 288 },
        { x: 739, y: 288 },
        { x: 1452, y: 58 },
        { x: 2059, y: 461 },
        { x: 2520, y: 720 }
      ],
      [
        { x: 80, y: 576 },
        { x: 739, y: 576 },
        { x: 1452, y: 806 },
        { x: 2059, y: 634 },
        { x: 2520, y: 720 }
      ],
      [
        { x: 80, y: 864 },
        { x: 739, y: 864 },
        { x: 1452, y: 634 },
        { x: 2059, y: 806 },
        { x: 2520, y: 720 }
      ],
      [
        { x: 80, y: 1152 },
        { x: 739, y: 1152 },
        { x: 1452, y: 1382 },
        { x: 2059, y: 979 },
        { x: 2520, y: 720 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 178, y: 368 },
      { id: 'p2', x: 298, y: 368 },
      { id: 'p3', x: 238, y: 468 },

      // 三角共鳴組 2
      { id: 'p4', x: 308, y: 1007 },
      { id: 'p5', x: 428, y: 1007 },
      { id: 'p6', x: 368, y: 1107 },

      // 三角共鳴組 3
      { id: 'p7', x: 439, y: 628 },
      { id: 'p8', x: 559, y: 628 },
      { id: 'p9', x: 499, y: 728 },

      // 三角共鳴組 4
      { id: 'p10', x: 569, y: 290 },
      { id: 'p11', x: 689, y: 290 },
      { id: 'p12', x: 629, y: 390 },

      // 三角共鳴組 5
      { id: 'p13', x: 699, y: 1079 },
      { id: 'p14', x: 819, y: 1079 },
      { id: 'p15', x: 759, y: 1179 },

      // 三角共鳴組 6
      { id: 'p16', x: 830, y: 625 },
      { id: 'p17', x: 950, y: 625 },
      { id: 'p18', x: 890, y: 725 },

      // 三角共鳴組 7
      { id: 'p19', x: 960, y: 401 },
      { id: 'p20', x: 1080, y: 401 },
      { id: 'p21', x: 1020, y: 501 },

      // 三角共鳴組 8
      { id: 'p22', x: 1090, y: 964 },
      { id: 'p23', x: 1210, y: 964 },
      { id: 'p24', x: 1150, y: 1064 },

      // 三角共鳴組 9
      { id: 'p25', x: 1220, y: 628 },
      { id: 'p26', x: 1340, y: 628 },
      { id: 'p27', x: 1280, y: 728 },

      // 三角共鳴組 10
      { id: 'p28', x: 1351, y: 433 },
      { id: 'p29', x: 1471, y: 433 },
      { id: 'p30', x: 1411, y: 533 },

      // 三角共鳴組 11
      { id: 'p31', x: 1481, y: 941 },
      { id: 'p32', x: 1601, y: 941 },
      { id: 'p33', x: 1541, y: 1041 },

      // 三角共鳴組 12
      { id: 'p34', x: 1611, y: 637 },
      { id: 'p35', x: 1731, y: 637 },
      { id: 'p36', x: 1671, y: 737 },

      // 三角共鳴組 13
      { id: 'p37', x: 1742, y: 308 },
      { id: 'p38', x: 1862, y: 308 },
      { id: 'p39', x: 1802, y: 408 },

      // 三角共鳴組 14
      { id: 'p40', x: 1872, y: 1065 },
      { id: 'p41', x: 1992, y: 1065 },
      { id: 'p42', x: 1932, y: 1165 },

      // 三角共鳴組 15
      { id: 'p43', x: 2002, y: 650 },
      { id: 'p44', x: 2122, y: 650 },
      { id: 'p45', x: 2062, y: 750 },

      // 三角共鳴組 16
      { id: 'p46', x: 2132, y: 329 },
      { id: 'p47', x: 2252, y: 329 },
      { id: 'p48', x: 2192, y: 429 },

      // 三角共鳴組 17
      { id: 'p49', x: 2263, y: 1036 },
      { id: 'p50', x: 2383, y: 1036 },
      { id: 'p51', x: 2323, y: 1136 }

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
    subtitle: '雙子質數怪夾縫突破',
    tip: '⚡ 18 組三角共鳴群（54處火線）！雙子怪高速突穿，前線密集建置減速與三角結界延遲步伐！',
    nextLevelId: '4-4',
    initialGold: 2100,
    initialLives: 10,
    worldWidth: 2780,
    worldHeight: 1500,
    lanes: [
      [
        { x: 80, y: 300 },
        { x: 778, y: 300 },
        { x: 1529, y: 60 },
        { x: 2168, y: 480 },
        { x: 2660, y: 750 }
      ],
      [
        { x: 80, y: 600 },
        { x: 778, y: 600 },
        { x: 1529, y: 840 },
        { x: 2168, y: 660 },
        { x: 2660, y: 750 }
      ],
      [
        { x: 80, y: 900 },
        { x: 778, y: 900 },
        { x: 1529, y: 660 },
        { x: 2168, y: 840 },
        { x: 2660, y: 750 }
      ],
      [
        { x: 80, y: 1200 },
        { x: 778, y: 1200 },
        { x: 1529, y: 1440 },
        { x: 2168, y: 1020 },
        { x: 2660, y: 750 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 178, y: 385 },
      { id: 'p2', x: 298, y: 385 },
      { id: 'p3', x: 238, y: 485 },

      // 三角共鳴組 2
      { id: 'p4', x: 309, y: 1051 },
      { id: 'p5', x: 429, y: 1051 },
      { id: 'p6', x: 369, y: 1151 },

      // 三角共鳴組 3
      { id: 'p7', x: 440, y: 658 },
      { id: 'p8', x: 560, y: 658 },
      { id: 'p9', x: 500, y: 758 },

      // 三角共鳴組 4
      { id: 'p10', x: 571, y: 307 },
      { id: 'p11', x: 691, y: 307 },
      { id: 'p12', x: 631, y: 407 },

      // 三角共鳴組 5
      { id: 'p13', x: 702, y: 1122 },
      { id: 'p14', x: 822, y: 1122 },
      { id: 'p15', x: 762, y: 1222 },

      // 三角共鳴組 6
      { id: 'p16', x: 833, y: 655 },
      { id: 'p17', x: 953, y: 655 },
      { id: 'p18', x: 893, y: 755 },

      // 三角共鳴組 7
      { id: 'p19', x: 963, y: 418 },
      { id: 'p20', x: 1083, y: 418 },
      { id: 'p21', x: 1023, y: 518 },

      // 三角共鳴組 8
      { id: 'p22', x: 1094, y: 1007 },
      { id: 'p23', x: 1214, y: 1007 },
      { id: 'p24', x: 1154, y: 1107 },

      // 三角共鳴組 9
      { id: 'p25', x: 1225, y: 658 },
      { id: 'p26', x: 1345, y: 658 },
      { id: 'p27', x: 1285, y: 758 },

      // 三角共鳴組 10
      { id: 'p28', x: 1356, y: 449 },
      { id: 'p29', x: 1476, y: 449 },
      { id: 'p30', x: 1416, y: 549 },

      // 三角共鳴組 11
      { id: 'p31', x: 1487, y: 984 },
      { id: 'p32', x: 1607, y: 984 },
      { id: 'p33', x: 1547, y: 1084 },

      // 三角共鳴組 12
      { id: 'p34', x: 1617, y: 667 },
      { id: 'p35', x: 1737, y: 667 },
      { id: 'p36', x: 1677, y: 767 },

      // 三角共鳴組 13
      { id: 'p37', x: 1748, y: 325 },
      { id: 'p38', x: 1868, y: 325 },
      { id: 'p39', x: 1808, y: 425 },

      // 三角共鳴組 14
      { id: 'p40', x: 1879, y: 1109 },
      { id: 'p41', x: 1999, y: 1109 },
      { id: 'p42', x: 1939, y: 1209 },

      // 三角共鳴組 15
      { id: 'p43', x: 2010, y: 680 },
      { id: 'p44', x: 2130, y: 680 },
      { id: 'p45', x: 2070, y: 780 },

      // 三角共鳴組 16
      { id: 'p46', x: 2141, y: 346 },
      { id: 'p47', x: 2261, y: 346 },
      { id: 'p48', x: 2201, y: 446 },

      // 三角共鳴組 17
      { id: 'p49', x: 2271, y: 1079 },
      { id: 'p50', x: 2391, y: 1079 },
      { id: 'p51', x: 2331, y: 1179 },

      // 三角共鳴組 18
      { id: 'p52', x: 2402, y: 697 },
      { id: 'p53', x: 2522, y: 697 },
      { id: 'p54', x: 2462, y: 797 }

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
    subtitle: '第四章質數之都神話大決戰',
    tip: '👑 19 組終極要塞三角群（57處陣地）！歐拉神話獸【1260】擁有龐大因數抗性，以複合神塔與三角共鳴全力集火！',
    nextLevelId: '5-1',
    initialGold: 2300,
    initialLives: 10,
    worldWidth: 2920,
    worldHeight: 1580,
    lanes: [
      [
        { x: 80, y: 316 },
        { x: 818, y: 316 },
        { x: 1606, y: 63 },
        { x: 2278, y: 506 },
        { x: 2800, y: 790 }
      ],
      [
        { x: 80, y: 632 },
        { x: 818, y: 632 },
        { x: 1606, y: 885 },
        { x: 2278, y: 695 },
        { x: 2800, y: 790 }
      ],
      [
        { x: 80, y: 948 },
        { x: 818, y: 948 },
        { x: 1606, y: 695 },
        { x: 2278, y: 885 },
        { x: 2800, y: 790 }
      ],
      [
        { x: 80, y: 1264 },
        { x: 818, y: 1264 },
        { x: 1606, y: 1517 },
        { x: 2278, y: 1074 },
        { x: 2800, y: 790 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 179, y: 407 },
      { id: 'p2', x: 299, y: 407 },
      { id: 'p3', x: 239, y: 507 },

      // 三角共鳴組 2
      { id: 'p4', x: 310, y: 1108 },
      { id: 'p5', x: 430, y: 1108 },
      { id: 'p6', x: 370, y: 1208 },

      // 三角共鳴組 3
      { id: 'p7', x: 441, y: 698 },
      { id: 'p8', x: 561, y: 698 },
      { id: 'p9', x: 501, y: 798 },

      // 三角共鳴組 4
      { id: 'p10', x: 573, y: 329 },
      { id: 'p11', x: 693, y: 329 },
      { id: 'p12', x: 633, y: 429 },

      // 三角共鳴組 5
      { id: 'p13', x: 704, y: 1179 },
      { id: 'p14', x: 824, y: 1179 },
      { id: 'p15', x: 764, y: 1279 },

      // 三角共鳴組 6
      { id: 'p16', x: 835, y: 695 },
      { id: 'p17', x: 955, y: 695 },
      { id: 'p18', x: 895, y: 795 },

      // 三角共鳴組 7
      { id: 'p19', x: 966, y: 440 },
      { id: 'p20', x: 1086, y: 440 },
      { id: 'p21', x: 1026, y: 540 },

      // 三角共鳴組 8
      { id: 'p22', x: 1098, y: 1065 },
      { id: 'p23', x: 1218, y: 1065 },
      { id: 'p24', x: 1158, y: 1165 },

      // 三角共鳴組 9
      { id: 'p25', x: 1229, y: 698 },
      { id: 'p26', x: 1349, y: 698 },
      { id: 'p27', x: 1289, y: 798 },

      // 三角共鳴組 10
      { id: 'p28', x: 1360, y: 472 },
      { id: 'p29', x: 1480, y: 472 },
      { id: 'p30', x: 1420, y: 572 },

      // 三角共鳴組 11
      { id: 'p31', x: 1492, y: 1042 },
      { id: 'p32', x: 1612, y: 1042 },
      { id: 'p33', x: 1552, y: 1142 },

      // 三角共鳴組 12
      { id: 'p34', x: 1623, y: 707 },
      { id: 'p35', x: 1743, y: 707 },
      { id: 'p36', x: 1683, y: 807 },

      // 三角共鳴組 13
      { id: 'p37', x: 1754, y: 347 },
      { id: 'p38', x: 1874, y: 347 },
      { id: 'p39', x: 1814, y: 447 },

      // 三角共鳴組 14
      { id: 'p40', x: 1885, y: 1166 },
      { id: 'p41', x: 2005, y: 1166 },
      { id: 'p42', x: 1945, y: 1266 },

      // 三角共鳴組 15
      { id: 'p43', x: 2017, y: 720 },
      { id: 'p44', x: 2137, y: 720 },
      { id: 'p45', x: 2077, y: 820 },

      // 三角共鳴組 16
      { id: 'p46', x: 2148, y: 368 },
      { id: 'p47', x: 2268, y: 368 },
      { id: 'p48', x: 2208, y: 468 },

      // 三角共鳴組 17
      { id: 'p49', x: 2279, y: 1137 },
      { id: 'p50', x: 2399, y: 1137 },
      { id: 'p51', x: 2339, y: 1237 },

      // 三角共鳴組 18
      { id: 'p52', x: 2411, y: 737 },
      { id: 'p53', x: 2531, y: 737 },
      { id: 'p54', x: 2471, y: 837 },

      // 三角共鳴組 19
      { id: 'p55', x: 2542, y: 484 },
      { id: 'p56', x: 2662, y: 484 },
      { id: 'p57', x: 2602, y: 584 }

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
    subtitle: '虛數維度侵蝕防線',
    tip: '🌌 進入第五大章極限終焉！19 組三角共鳴群（57處維度陣地）！善用絕對值與複數解構神塔抵禦虛數潮湧！',
    nextLevelId: '5-2',
    initialGold: 2400,
    initialLives: 10,
    worldWidth: 2920,
    worldHeight: 1580,
    lanes: [
      [
        { x: 80, y: 316 },
        { x: 818, y: 316 },
        { x: 1606, y: 63 },
        { x: 2278, y: 506 },
        { x: 2800, y: 790 }
      ],
      [
        { x: 80, y: 632 },
        { x: 818, y: 632 },
        { x: 1606, y: 885 },
        { x: 2278, y: 695 },
        { x: 2800, y: 790 }
      ],
      [
        { x: 80, y: 948 },
        { x: 818, y: 948 },
        { x: 1606, y: 695 },
        { x: 2278, y: 885 },
        { x: 2800, y: 790 }
      ],
      [
        { x: 80, y: 1264 },
        { x: 818, y: 1264 },
        { x: 1606, y: 1517 },
        { x: 2278, y: 1074 },
        { x: 2800, y: 790 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 179, y: 407 },
      { id: 'p2', x: 299, y: 407 },
      { id: 'p3', x: 239, y: 507 },

      // 三角共鳴組 2
      { id: 'p4', x: 310, y: 1108 },
      { id: 'p5', x: 430, y: 1108 },
      { id: 'p6', x: 370, y: 1208 },

      // 三角共鳴組 3
      { id: 'p7', x: 441, y: 698 },
      { id: 'p8', x: 561, y: 698 },
      { id: 'p9', x: 501, y: 798 },

      // 三角共鳴組 4
      { id: 'p10', x: 573, y: 329 },
      { id: 'p11', x: 693, y: 329 },
      { id: 'p12', x: 633, y: 429 },

      // 三角共鳴組 5
      { id: 'p13', x: 704, y: 1179 },
      { id: 'p14', x: 824, y: 1179 },
      { id: 'p15', x: 764, y: 1279 },

      // 三角共鳴組 6
      { id: 'p16', x: 835, y: 695 },
      { id: 'p17', x: 955, y: 695 },
      { id: 'p18', x: 895, y: 795 },

      // 三角共鳴組 7
      { id: 'p19', x: 966, y: 440 },
      { id: 'p20', x: 1086, y: 440 },
      { id: 'p21', x: 1026, y: 540 },

      // 三角共鳴組 8
      { id: 'p22', x: 1098, y: 1065 },
      { id: 'p23', x: 1218, y: 1065 },
      { id: 'p24', x: 1158, y: 1165 },

      // 三角共鳴組 9
      { id: 'p25', x: 1229, y: 698 },
      { id: 'p26', x: 1349, y: 698 },
      { id: 'p27', x: 1289, y: 798 },

      // 三角共鳴組 10
      { id: 'p28', x: 1360, y: 472 },
      { id: 'p29', x: 1480, y: 472 },
      { id: 'p30', x: 1420, y: 572 },

      // 三角共鳴組 11
      { id: 'p31', x: 1492, y: 1042 },
      { id: 'p32', x: 1612, y: 1042 },
      { id: 'p33', x: 1552, y: 1142 },

      // 三角共鳴組 12
      { id: 'p34', x: 1623, y: 707 },
      { id: 'p35', x: 1743, y: 707 },
      { id: 'p36', x: 1683, y: 807 },

      // 三角共鳴組 13
      { id: 'p37', x: 1754, y: 347 },
      { id: 'p38', x: 1874, y: 347 },
      { id: 'p39', x: 1814, y: 447 },

      // 三角共鳴組 14
      { id: 'p40', x: 1885, y: 1166 },
      { id: 'p41', x: 2005, y: 1166 },
      { id: 'p42', x: 1945, y: 1266 },

      // 三角共鳴組 15
      { id: 'p43', x: 2017, y: 720 },
      { id: 'p44', x: 2137, y: 720 },
      { id: 'p45', x: 2077, y: 820 },

      // 三角共鳴組 16
      { id: 'p46', x: 2148, y: 368 },
      { id: 'p47', x: 2268, y: 368 },
      { id: 'p48', x: 2208, y: 468 },

      // 三角共鳴組 17
      { id: 'p49', x: 2279, y: 1137 },
      { id: 'p50', x: 2399, y: 1137 },
      { id: 'p51', x: 2339, y: 1237 },

      // 三角共鳴組 18
      { id: 'p52', x: 2411, y: 737 },
      { id: 'p53', x: 2531, y: 737 },
      { id: 'p54', x: 2471, y: 837 },

      // 三角共鳴組 19
      { id: 'p55', x: 2542, y: 484 },
      { id: 'p56', x: 2662, y: 484 },
      { id: 'p57', x: 2602, y: 584 }

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
    subtitle: '單側曲面無限延展戰場',
    tip: '🌌 20 組三角共鳴群（60處基座）！怪物沿無限曲面雙向突擊，在中樞建立交叉幾何共鳴結界！',
    nextLevelId: '5-3',
    initialGold: 2600,
    initialLives: 10,
    worldWidth: 3080,
    worldHeight: 1660,
    lanes: [
      [
        { x: 80, y: 332 },
        { x: 862, y: 332 },
        { x: 1694, y: 66 },
        { x: 2402, y: 531 },
        { x: 2960, y: 830 }
      ],
      [
        { x: 80, y: 664 },
        { x: 862, y: 664 },
        { x: 1694, y: 930 },
        { x: 2402, y: 730 },
        { x: 2960, y: 830 }
      ],
      [
        { x: 80, y: 996 },
        { x: 862, y: 996 },
        { x: 1694, y: 730 },
        { x: 2402, y: 930 },
        { x: 2960, y: 830 }
      ],
      [
        { x: 80, y: 1328 },
        { x: 862, y: 1328 },
        { x: 1694, y: 1594 },
        { x: 2402, y: 1129 },
        { x: 2960, y: 830 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 180, y: 430 },
      { id: 'p2', x: 300, y: 430 },
      { id: 'p3', x: 240, y: 530 },

      // 三角共鳴組 2
      { id: 'p4', x: 312, y: 1166 },
      { id: 'p5', x: 432, y: 1166 },
      { id: 'p6', x: 372, y: 1266 },

      // 三角共鳴組 3
      { id: 'p7', x: 445, y: 738 },
      { id: 'p8', x: 565, y: 738 },
      { id: 'p9', x: 505, y: 838 },

      // 三角共鳴組 4
      { id: 'p10', x: 578, y: 352 },
      { id: 'p11', x: 698, y: 352 },
      { id: 'p12', x: 638, y: 452 },

      // 三角共鳴組 5
      { id: 'p13', x: 710, y: 1237 },
      { id: 'p14', x: 830, y: 1237 },
      { id: 'p15', x: 770, y: 1337 },

      // 三角共鳴組 6
      { id: 'p16', x: 843, y: 735 },
      { id: 'p17', x: 963, y: 735 },
      { id: 'p18', x: 903, y: 835 },

      // 三角共鳴組 7
      { id: 'p19', x: 976, y: 463 },
      { id: 'p20', x: 1096, y: 463 },
      { id: 'p21', x: 1036, y: 563 },

      // 三角共鳴組 8
      { id: 'p22', x: 1108, y: 1122 },
      { id: 'p23', x: 1228, y: 1122 },
      { id: 'p24', x: 1168, y: 1222 },

      // 三角共鳴組 9
      { id: 'p25', x: 1241, y: 738 },
      { id: 'p26', x: 1361, y: 738 },
      { id: 'p27', x: 1301, y: 838 },

      // 三角共鳴組 10
      { id: 'p28', x: 1374, y: 494 },
      { id: 'p29', x: 1494, y: 494 },
      { id: 'p30', x: 1434, y: 594 },

      // 三角共鳴組 11
      { id: 'p31', x: 1506, y: 1099 },
      { id: 'p32', x: 1626, y: 1099 },
      { id: 'p33', x: 1566, y: 1199 },

      // 三角共鳴組 12
      { id: 'p34', x: 1639, y: 747 },
      { id: 'p35', x: 1759, y: 747 },
      { id: 'p36', x: 1699, y: 847 },

      // 三角共鳴組 13
      { id: 'p37', x: 1772, y: 370 },
      { id: 'p38', x: 1892, y: 370 },
      { id: 'p39', x: 1832, y: 470 },

      // 三角共鳴組 14
      { id: 'p40', x: 1904, y: 1224 },
      { id: 'p41', x: 2024, y: 1224 },
      { id: 'p42', x: 1964, y: 1324 },

      // 三角共鳴組 15
      { id: 'p43', x: 2037, y: 760 },
      { id: 'p44', x: 2157, y: 760 },
      { id: 'p45', x: 2097, y: 860 },

      // 三角共鳴組 16
      { id: 'p46', x: 2170, y: 391 },
      { id: 'p47', x: 2290, y: 391 },
      { id: 'p48', x: 2230, y: 491 },

      // 三角共鳴組 17
      { id: 'p49', x: 2303, y: 1194 },
      { id: 'p50', x: 2423, y: 1194 },
      { id: 'p51', x: 2363, y: 1294 },

      // 三角共鳴組 18
      { id: 'p52', x: 2435, y: 777 },
      { id: 'p53', x: 2555, y: 777 },
      { id: 'p54', x: 2495, y: 877 },

      // 三角共鳴組 19
      { id: 'p55', x: 2568, y: 506 },
      { id: 'p56', x: 2688, y: 506 },
      { id: 'p57', x: 2628, y: 606 },

      // 三角共鳴組 20
      { id: 'p58', x: 2701, y: 1082 },
      { id: 'p59', x: 2821, y: 1082 },
      { id: 'p60', x: 2761, y: 1182 }

    ],
    waves: [
      {
        title: '第一波：莫比烏斯拓撲突刺',
        tip: '雙路在中央劇烈交叉，莫比烏斯幽靈受擊將觸發拓撲逆流，質數套娃怪剝落外殼！',
        enemies: [
          { val: 36, lane: 0, speed: 78, delay: 0.5, isMobius: true },
          { val: 32, lane: 1, speed: 78, delay: 0.5, isMatryoshka: true },
          { val: 48, lane: 0, speed: 76, delay: 0.5 },
          { val: 48, lane: 1, speed: 76, delay: 0.5 },
          { val: 64, lane: 0, speed: 74, delay: 0.6, isMatryoshka: true },
          { val: 50, lane: 1, speed: 74, delay: 0.6, isMobius: true },
          { val: 72, lane: 0, speed: 72, delay: 0.7, isMobius: true },
          { val: 81, lane: 1, speed: 72, delay: 0.7, isMatryoshka: true }
        ]
      },
      {
        title: '第二波：無限四象限極性風暴',
        tip: '虛數單位 i 幽靈切換四象限迴避與實數易傷弱點！',
        enemies: [
          { val: -60, lane: 0, speed: 82, delay: 0.4 },
          { val: 60, lane: 1, speed: 82, delay: 0.4, isGaussianCycler: true },
          { val: -72, lane: 0, speed: 80, delay: 0.5 },
          { val: 72, lane: 1, speed: 80, delay: 0.5, isMobius: true },
          { val: 81, lane: 0, speed: 76, delay: 0.5, isMatryoshka: true },
          { val: 90, lane: 1, speed: 76, delay: 0.5, isGaussianCycler: true },
          { val: -120, lane: 0, speed: 74, delay: 0.6 },
          { val: 120, lane: 1, speed: 74, delay: 0.6, isMobius: true },
          { val: -144, lane: 0, speed: 70, delay: 0.7 },
          { val: 144, lane: 1, speed: 70, delay: 0.7, isGaussianCycler: true }
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
    subtitle: '瞬時變化率與導函數巨砲實戰',
    tip: '⚡ 21 組三角共鳴群（63處陣地）！超巨幅戰場，啟用【f\'(x) 導函數暴擊塔】與【n! 階層坍縮衝擊波】撕裂連續體！',
    nextLevelId: '5-4',
    initialGold: 2800,
    initialLives: 10,
    worldWidth: 3240,
    worldHeight: 1740,
    lanes: [
      [
        { x: 80, y: 290 },
        { x: 907, y: 290 },
        { x: 1782, y: 12 },
        { x: 2527, y: 452 },
        { x: 3120, y: 870 }
      ],
      [
        { x: 80, y: 580 },
        { x: 907, y: 580 },
        { x: 1782, y: 858 },
        { x: 2527, y: 661 },
        { x: 3120, y: 870 }
      ],
      [
        { x: 80, y: 870 },
        { x: 907, y: 870 },
        { x: 1782, y: 592 },
        { x: 2527, y: 870 },
        { x: 3120, y: 870 }
      ],
      [
        { x: 80, y: 1160 },
        { x: 907, y: 1160 },
        { x: 1782, y: 1438 },
        { x: 2527, y: 1079 },
        { x: 3120, y: 870 }
      ],
      [
        { x: 80, y: 1450 },
        { x: 907, y: 1450 },
        { x: 1782, y: 1172 },
        { x: 2527, y: 1288 },
        { x: 3120, y: 870 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 180, y: 452 },
      { id: 'p2', x: 300, y: 452 },
      { id: 'p3', x: 240, y: 552 },

      // 三角共鳴組 2
      { id: 'p4', x: 314, y: 1223 },
      { id: 'p5', x: 434, y: 1223 },
      { id: 'p6', x: 374, y: 1323 },

      // 三角共鳴組 3
      { id: 'p7', x: 448, y: 778 },
      { id: 'p8', x: 568, y: 778 },
      { id: 'p9', x: 508, y: 878 },

      // 三角共鳴組 4
      { id: 'p10', x: 582, y: 374 },
      { id: 'p11', x: 702, y: 374 },
      { id: 'p12', x: 642, y: 474 },

      // 三角共鳴組 5
      { id: 'p13', x: 716, y: 1295 },
      { id: 'p14', x: 836, y: 1295 },
      { id: 'p15', x: 776, y: 1395 },

      // 三角共鳴組 6
      { id: 'p16', x: 850, y: 775 },
      { id: 'p17', x: 970, y: 775 },
      { id: 'p18', x: 910, y: 875 },

      // 三角共鳴組 7
      { id: 'p19', x: 984, y: 485 },
      { id: 'p20', x: 1104, y: 485 },
      { id: 'p21', x: 1044, y: 585 },

      // 三角共鳴組 8
      { id: 'p22', x: 1118, y: 1180 },
      { id: 'p23', x: 1238, y: 1180 },
      { id: 'p24', x: 1178, y: 1280 },

      // 三角共鳴組 9
      { id: 'p25', x: 1252, y: 778 },
      { id: 'p26', x: 1372, y: 778 },
      { id: 'p27', x: 1312, y: 878 },

      // 三角共鳴組 10
      { id: 'p28', x: 1386, y: 517 },
      { id: 'p29', x: 1506, y: 517 },
      { id: 'p30', x: 1446, y: 617 },

      // 三角共鳴組 11
      { id: 'p31', x: 1520, y: 1157 },
      { id: 'p32', x: 1640, y: 1157 },
      { id: 'p33', x: 1580, y: 1257 },

      // 三角共鳴組 12
      { id: 'p34', x: 1654, y: 787 },
      { id: 'p35', x: 1774, y: 787 },
      { id: 'p36', x: 1714, y: 887 },

      // 三角共鳴組 13
      { id: 'p37', x: 1788, y: 392 },
      { id: 'p38', x: 1908, y: 392 },
      { id: 'p39', x: 1848, y: 492 },

      // 三角共鳴組 14
      { id: 'p40', x: 1922, y: 1281 },
      { id: 'p41', x: 2042, y: 1281 },
      { id: 'p42', x: 1982, y: 1381 },

      // 三角共鳴組 15
      { id: 'p43', x: 2056, y: 800 },
      { id: 'p44', x: 2176, y: 800 },
      { id: 'p45', x: 2116, y: 900 },

      // 三角共鳴組 16
      { id: 'p46', x: 2190, y: 413 },
      { id: 'p47', x: 2310, y: 413 },
      { id: 'p48', x: 2250, y: 513 },

      // 三角共鳴組 17
      { id: 'p49', x: 2324, y: 1252 },
      { id: 'p50', x: 2444, y: 1252 },
      { id: 'p51', x: 2384, y: 1352 },

      // 三角共鳴組 18
      { id: 'p52', x: 2458, y: 817 },
      { id: 'p53', x: 2578, y: 817 },
      { id: 'p54', x: 2518, y: 917 },

      // 三角共鳴組 19
      { id: 'p55', x: 2592, y: 529 },
      { id: 'p56', x: 2712, y: 529 },
      { id: 'p57', x: 2652, y: 629 },

      // 三角共鳴組 20
      { id: 'p58', x: 2725, y: 1140 },
      { id: 'p59', x: 2845, y: 1140 },
      { id: 'p60', x: 2785, y: 1240 },

      // 三角共鳴組 21
      { id: 'p61', x: 2859, y: 836 },
      { id: 'p62', x: 2979, y: 836 },
      { id: 'p63', x: 2919, y: 936 }

    ],
    waves: [
      {
        title: '第一波：行列式方陣與連續體密集陣',
        tip: '連續高密度雙路湧出，行列式方陣怪物連線共鳴，若 det=ad-bc=0 觸發連鎖坍縮！',
        enemies: [
          { val: 12, lane: 0, speed: 76, delay: 0.4, determinantQuadId: 'quad_5_3', detIndex: 0 },
          { val: 8, lane: 1, speed: 76, delay: 0.4, determinantQuadId: 'quad_5_3', detIndex: 1 },
          { val: 15, lane: 0, speed: 76, delay: 0.4, determinantQuadId: 'quad_5_3', detIndex: 2 },
          { val: 10, lane: 1, speed: 76, delay: 0.4, determinantQuadId: 'quad_5_3', detIndex: 3 },
          { val: 64, lane: 0, speed: 82, delay: 0.4, isMatryoshka: true },
          { val: 81, lane: 1, speed: 80, delay: 0.4, isMatryoshka: true },
          { val: 100, lane: 0, speed: 78, delay: 0.5 },
          { val: 100, lane: 1, speed: 78, delay: 0.5 },
          { val: 128, lane: 0, speed: 76, delay: 0.5 },
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
    subtitle: '全宇宙全因數終極決戰',
    tip: '👑 22 組全宇宙終焉幾何三角群（66處陣地）！造物魔神【2520】統治 1~10 所有因數，發動全場神塔與極限秘術迎接數學終焉！',
    nextLevelId: null,
    initialGold: 3200,
    initialLives: 10,
    worldWidth: 3480,
    worldHeight: 1860,
    lanes: [
      [
        { x: 80, y: 310 },
        { x: 974, y: 310 },
        { x: 1914, y: 12 },
        { x: 2714, y: 484 },
        { x: 3360, y: 930 }
      ],
      [
        { x: 80, y: 620 },
        { x: 974, y: 620 },
        { x: 1914, y: 918 },
        { x: 2714, y: 707 },
        { x: 3360, y: 930 }
      ],
      [
        { x: 80, y: 930 },
        { x: 974, y: 930 },
        { x: 1914, y: 632 },
        { x: 2714, y: 930 },
        { x: 3360, y: 930 }
      ],
      [
        { x: 80, y: 1240 },
        { x: 974, y: 1240 },
        { x: 1914, y: 1538 },
        { x: 2714, y: 1153 },
        { x: 3360, y: 930 }
      ],
      [
        { x: 80, y: 1550 },
        { x: 974, y: 1550 },
        { x: 1914, y: 1252 },
        { x: 2714, y: 1376 },
        { x: 3360, y: 930 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 183, y: 486 },
      { id: 'p2', x: 303, y: 486 },
      { id: 'p3', x: 243, y: 586 },

      // 三角共鳴組 2
      { id: 'p4', x: 322, y: 1310 },
      { id: 'p5', x: 442, y: 1310 },
      { id: 'p6', x: 382, y: 1410 },

      // 三角共鳴組 3
      { id: 'p7', x: 461, y: 838 },
      { id: 'p8', x: 581, y: 838 },
      { id: 'p9', x: 521, y: 938 },

      // 三角共鳴組 4
      { id: 'p10', x: 599, y: 408 },
      { id: 'p11', x: 719, y: 408 },
      { id: 'p12', x: 659, y: 508 },

      // 三角共鳴組 5
      { id: 'p13', x: 738, y: 1381 },
      { id: 'p14', x: 858, y: 1381 },
      { id: 'p15', x: 798, y: 1481 },

      // 三角共鳴組 6
      { id: 'p16', x: 877, y: 835 },
      { id: 'p17', x: 997, y: 835 },
      { id: 'p18', x: 937, y: 935 },

      // 三角共鳴組 7
      { id: 'p19', x: 1015, y: 519 },
      { id: 'p20', x: 1135, y: 519 },
      { id: 'p21', x: 1075, y: 619 },

      // 三角共鳴組 8
      { id: 'p22', x: 1154, y: 1266 },
      { id: 'p23', x: 1274, y: 1266 },
      { id: 'p24', x: 1214, y: 1366 },

      // 三角共鳴組 9
      { id: 'p25', x: 1293, y: 838 },
      { id: 'p26', x: 1413, y: 838 },
      { id: 'p27', x: 1353, y: 938 },

      // 三角共鳴組 10
      { id: 'p28', x: 1431, y: 550 },
      { id: 'p29', x: 1551, y: 550 },
      { id: 'p30', x: 1491, y: 650 },

      // 三角共鳴組 11
      { id: 'p31', x: 1570, y: 1243 },
      { id: 'p32', x: 1690, y: 1243 },
      { id: 'p33', x: 1630, y: 1343 },

      // 三角共鳴組 12
      { id: 'p34', x: 1709, y: 847 },
      { id: 'p35', x: 1829, y: 847 },
      { id: 'p36', x: 1769, y: 947 },

      // 三角共鳴組 13
      { id: 'p37', x: 1847, y: 426 },
      { id: 'p38', x: 1967, y: 426 },
      { id: 'p39', x: 1907, y: 526 },

      // 三角共鳴組 14
      { id: 'p40', x: 1986, y: 1368 },
      { id: 'p41', x: 2106, y: 1368 },
      { id: 'p42', x: 2046, y: 1468 },

      // 三角共鳴組 15
      { id: 'p43', x: 2125, y: 860 },
      { id: 'p44', x: 2245, y: 860 },
      { id: 'p45', x: 2185, y: 960 },

      // 三角共鳴組 16
      { id: 'p46', x: 2263, y: 447 },
      { id: 'p47', x: 2383, y: 447 },
      { id: 'p48', x: 2323, y: 547 },

      // 三角共鳴組 17
      { id: 'p49', x: 2402, y: 1338 },
      { id: 'p50', x: 2522, y: 1338 },
      { id: 'p51', x: 2462, y: 1438 },

      // 三角共鳴組 18
      { id: 'p52', x: 2541, y: 877 },
      { id: 'p53', x: 2661, y: 877 },
      { id: 'p54', x: 2601, y: 977 },

      // 三角共鳴組 19
      { id: 'p55', x: 2679, y: 562 },
      { id: 'p56', x: 2799, y: 562 },
      { id: 'p57', x: 2739, y: 662 },

      // 三角共鳴組 20
      { id: 'p58', x: 2818, y: 1226 },
      { id: 'p59', x: 2938, y: 1226 },
      { id: 'p60', x: 2878, y: 1326 },

      // 三角共鳴組 21
      { id: 'p61', x: 2957, y: 896 },
      { id: 'p62', x: 3077, y: 896 },
      { id: 'p63', x: 3017, y: 996 },

      // 三角共鳴組 22
      { id: 'p64', x: 3095, y: 493 },
      { id: 'p65', x: 3215, y: 493 },
      { id: 'p66', x: 3155, y: 593 }

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
            bossSkills: ['zeta_storm', 'collatz_surge', 'dimension_rift', 'multiply_aura', 'split_adds']
          }
        ]
      }
    ]
  },

  // ================= 數論作戰學院：全塔功能教學關卡 (Tutorial Academy) =================
  'tutorial_master': {
    id: 'tutorial_master',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'ALL',
    requiredTowerName: '自由選建全防禦塔',
    name: '🎓 數論學院：全塔通關實戰特訓',
    subtitle: '單波實戰，自由體驗 8 大基礎塔與複合神塔',
    tip: '💡 本關為一直線地圖、中央單一基座！點擊基座可自由建造任意防禦塔進行實戰體驗！',
    nextLevelId: '1-1',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '全塔實戰通關特訓（自由選建全防禦塔）',
        tip: '💡 建造防禦塔擊退偶數與倍數怪物，體驗數論除法樂趣！',
        noShuffle: true,
        enemies: [
          { val: 2, speed: 36, delay: 1.2, noShuffle: true },
          { val: 3, speed: 36, delay: 1.3, noShuffle: true },
          { val: 4, speed: 34, delay: 1.4, noShuffle: true },
          { val: 5, speed: 34, delay: 1.4, noShuffle: true },
          { val: 6, speed: 34, delay: 1.5, noShuffle: true },
          { val: 8, speed: 32, delay: 1.6, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_p2': {
    id: 'tutorial_p2',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'PRIME_2',
    requiredTowerName: '2號 雙子砲',
    name: '🎓 2號 雙子砲',
    subtitle: '掌握偶數除法 N ÷ 2',
    tip: '💡 本課指定【2號 雙子砲】！只會出現可被 2 分解的偶數怪：2, 4, 6, 8, 12！',
    nextLevelId: 'tutorial_p3',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第一課：2號 雙子砲（偶數除法分解）',
        tip: '💡 點擊中央基座建造【2號 雙子砲】，每次擊中進行 N ÷ 2 直到為 1 擊破！',
        noShuffle: true,
        enemies: [
          { val: 2, speed: 36, delay: 1.2, noShuffle: true },
          { val: 4, speed: 34, delay: 1.3, noShuffle: true },
          { val: 6, speed: 34, delay: 1.4, noShuffle: true },
          { val: 8, speed: 32, delay: 1.5, noShuffle: true },
          { val: 12, speed: 30, delay: 1.6, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_p3': {
    id: 'tutorial_p3',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'PRIME_3',
    requiredTowerName: '3號 三元激光',
    name: '🎓 3號 三元激光',
    subtitle: '掌握數字和為 3 的倍數判別法',
    tip: '💡 本課指定【3號 三元激光】！只會出現 3 的倍數：3, 6, 9, 15, 27！',
    nextLevelId: 'tutorial_p5',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第二課：3號 三元激光（3的倍數特訓）',
        tip: '💡 點擊中央基座建造【3號 三元激光】執行 N ÷ 3 分解怪物！',
        noShuffle: true,
        enemies: [
          { val: 3, speed: 36, delay: 1.2, noShuffle: true },
          { val: 6, speed: 34, delay: 1.3, noShuffle: true },
          { val: 9, speed: 34, delay: 1.4, noShuffle: true },
          { val: 15, speed: 32, delay: 1.5, noShuffle: true },
          { val: 27, speed: 30, delay: 1.6, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_p5': {
    id: 'tutorial_p5',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'PRIME_5',
    requiredTowerName: '5號 五芒衝擊',
    name: '🎓 5號 五芒衝擊',
    subtitle: '掌握尾數 0 或 5 的 5 的倍數特性',
    tip: '💡 本課指定【5號 五芒衝擊】！個位數為 0 或 5 的怪（5, 10, 15, 20, 25）是 5 的倍數！',
    nextLevelId: 'tutorial_p7',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第三課：5號 五芒衝擊（尾數 0 或 5 特訓）',
        tip: '💡 點擊中央基座建造【5號 五芒衝擊】進行強效除法！',
        noShuffle: true,
        enemies: [
          { val: 5, speed: 36, delay: 1.2, noShuffle: true },
          { val: 10, speed: 34, delay: 1.3, noShuffle: true },
          { val: 15, speed: 34, delay: 1.4, noShuffle: true },
          { val: 20, speed: 32, delay: 1.5, noShuffle: true },
          { val: 25, speed: 30, delay: 1.6, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_p7': {
    id: 'tutorial_p7',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'PRIME_7',
    requiredTowerName: '7號 七曜天琴',
    name: '🎓 7號 七曜天琴',
    subtitle: '掌握 7 的倍數重砲壓制',
    tip: '💡 本課指定【7號 七曜天琴】！7 的倍數（7, 14, 21, 28, 49）難以被 2, 3, 5 除盡！',
    nextLevelId: 'tutorial_abs',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第四課：7號 七曜天琴（7的倍數特訓）',
        tip: '💡 點擊中央基座建造超遠射程【7號 七曜天琴】精準擊破！',
        noShuffle: true,
        enemies: [
          { val: 7, speed: 36, delay: 1.2, noShuffle: true },
          { val: 14, speed: 34, delay: 1.3, noShuffle: true },
          { val: 21, speed: 34, delay: 1.4, noShuffle: true },
          { val: 28, speed: 32, delay: 1.5, noShuffle: true },
          { val: 49, speed: 30, delay: 1.6, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_abs': {
    id: 'tutorial_abs',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'ABSOLUTE',
    requiredTowerName: '|x| 絕對值稜鏡',
    name: '🎓 |x| 絕對值稜鏡',
    subtitle: '破除負數幽靈護盾 |-n| ➔ +n',
    tip: '💡 本課指定【|x| 絕對值稜鏡】！負數怪對質數砲免疫，觀察稜鏡將負數淨化為正數！',
    nextLevelId: 'tutorial_op',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第五課：|x| 絕對值稜鏡（負數淨化特訓）',
        tip: '💡 點擊中央基座建造【|x| 絕對值稜鏡】破除護盾！',
        noShuffle: true,
        enemies: [
          { val: -2, speed: 36, delay: 1.2, noShuffle: true },
          { val: -4, speed: 34, delay: 1.3, noShuffle: true },
          { val: -6, speed: 34, delay: 1.4, noShuffle: true },
          { val: -8, speed: 32, delay: 1.5, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_op': {
    id: 'tutorial_op',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'OPERATOR',
    requiredTowerName: '[+/-] 運算子調整塔',
    name: '🎓 [+/-] 運算子調整塔',
    subtitle: '量子微調 ±1，解決無法整除的質數刺客',
    tip: '💡 本課指定【[+/-] 運算子調整塔】！質數怪（11, 13, 17, 19）無法被整除，運算子微調化為合數！',
    nextLevelId: 'tutorial_sqrt',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第六課：[+/-] 運算子調整塔（化質為合特訓）',
        tip: '💡 點擊中央基座建造【運算子調整塔】微調 11-1=10, 13-1=12！',
        noShuffle: true,
        enemies: [
          { val: 11, speed: 36, delay: 1.2, noShuffle: true },
          { val: 13, speed: 34, delay: 1.3, noShuffle: true },
          { val: 17, speed: 34, delay: 1.4, noShuffle: true },
          { val: 19, speed: 32, delay: 1.5, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_sqrt': {
    id: 'tutorial_sqrt',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'SQRT',
    requiredTowerName: '√x 根號方根重力井',
    name: '🎓 √x 根號方根重力井（完全平方）',
    subtitle: '完全平方幾何怪剋星，直接開方 √x',
    tip: '💡 本課指定【√x 根號方根重力井】！完全平方數（4, 9, 16, 25, 36）受重力井打擊將直接開方重創！',
    nextLevelId: 'tutorial_zero',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第七課：√x 根號方根重力井',
        tip: '💡 點擊中央基座建造【√x 根號重力井】直接開方 √16 ➔ 4, √25 ➔ 5！',
        noShuffle: true,
        enemies: [
          { val: 4, speed: 36, delay: 1.2, noShuffle: true },
          { val: 9, speed: 34, delay: 1.3, noShuffle: true },
          { val: 16, speed: 34, delay: 1.4, noShuffle: true },
          { val: 25, speed: 32, delay: 1.4, noShuffle: true },
          { val: 36, speed: 30, delay: 1.5, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_zero': {
    id: 'tutorial_zero',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'ZERO_FREEZE',
    requiredTowerName: '×0 絕對零度力場塔',
    name: '🎓 ×0 絕對零度力場塔',
    subtitle: '乘零歸零光環，大範圍牽制高速衝鋒怪',
    tip: '💡 本課指定【×0 絕對零度力場塔】！觀察乘零光環使高速怪減速 50% 以上！',
    nextLevelId: 'tutorial_upgrade_sell',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第八課：×0 絕對零度力場塔',
        tip: '💡 點擊中央基座建造【×0 絕對零度塔】實施極限減速！',
        noShuffle: true,
        enemies: [
          { val: 10, speed: 85, delay: 1.0, noShuffle: true },
          { val: 15, speed: 85, delay: 1.2, noShuffle: true },
          { val: 20, speed: 85, delay: 1.4, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_upgrade_sell': {
    id: 'tutorial_upgrade_sell',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'PRIME_2',
    requiredTowerName: '2號 雙子砲 (升級/變賣)',
    name: '🎓 🔧 砲塔三向升級與變賣操作',
    subtitle: '獨立強化 射程/威力/攻速，或隨時變賣回收 70% 軍費',
    tip: '💡 本課指定【2號 雙子砲】！建造後點擊砲塔，升級威力或變賣調整防線！',
    nextLevelId: 'tutorial_spells',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第九課：🔧 砲塔三向升級與變賣操作',
        tip: '💡 點擊中央基座建造【2號 雙子砲】，再點擊砲塔進行升級或變賣！',
        noShuffle: true,
        enemies: [
          { val: 8, speed: 32, delay: 1.2, noShuffle: true },
          { val: 16, speed: 30, delay: 1.5, noShuffle: true },
          { val: 32, speed: 28, delay: 1.8, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_spells': {
    id: 'tutorial_spells',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'SPELLS',
    requiredTowerName: '指揮官秘術 (Q / W / E)',
    name: '🎓 ⚡ 指揮官主動秘術 (Q / W / E)',
    subtitle: '掌握 GCD 引爆、同餘黑洞 mod 5 與黃金超頻',
    tip: '💡 點選底部技能列或使用鍵盤快速鍵 [Q / W / E] 施放強力奧義！',
    nextLevelId: 'tutorial_fusion',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第十課：⚡ 指揮官主動秘術 (Q / W / E) 特訓',
        tip: '💡 怪物聚集時按 Q 發動 GCD 範圍引爆，或按 W 召喚同餘黑洞湮滅！',
        noShuffle: true,
        enemies: [
          { val: 12, speed: 34, delay: 0.9, noShuffle: true },
          { val: 18, speed: 34, delay: 0.9, noShuffle: true },
          { val: 24, speed: 34, delay: 0.9, noShuffle: true },
          { val: 30, speed: 34, delay: 0.9, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_fusion': {
    id: 'tutorial_fusion',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'FUSION_6',
    requiredTowerName: '2×3 六芒雙曜塔',
    name: '🎓 ⚛️ 2×3 六芒雙曜（雙質數連除）',
    subtitle: '同時發射 2 與 3 質數光線，高速連環分解',
    tip: '💡 本課指定【2×3 六芒雙曜】！點選中央基座在「⚛️ 複合神塔」建造，體驗雙質數連除威力！',
    nextLevelId: 'tutorial_derivative',
    initialGold: 800,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第十一課：⚛️ 2×3 六芒雙曜（雙質數連除特訓）',
        tip: '💡 建造【2×3 六芒雙曜】體驗同時進行 ÷2 與 ÷3 連除分解！',
        noShuffle: true,
        enemies: [
          { val: 6, speed: 35, delay: 1.2, noShuffle: true },
          { val: 12, speed: 35, delay: 1.4, noShuffle: true },
          { val: 24, speed: 35, delay: 1.6, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_derivative': {
    id: 'tutorial_derivative',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'FUSION_DERIVATIVE',
    requiredTowerName: 'd/dx 費馬導數天琴',
    name: '🎓 🎻 d/dx 費馬導數天琴',
    subtitle: '掌握切線斜率連環刀與 7 之倍數求導音爆',
    tip: '💡 本課指定【d/dx 費馬導數天琴】！切線求導對大數值怪造成 1.4 倍傷害，並對 7 的倍數引爆破甲！',
    nextLevelId: 'tutorial_monte_carlo',
    initialGold: 900,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第十二課：🎻 d/dx 費馬導數天琴（微分求導特訓）',
        tip: '💡 點擊中央基座建造【d/dx 費馬導數天琴】，消滅 7 的倍數與大數值敵軍！',
        noShuffle: true,
        enemies: [
          { val: 14, speed: 34, delay: 1.2, noShuffle: true },
          { val: 21, speed: 34, delay: 1.4, noShuffle: true },
          { val: 28, speed: 32, delay: 1.5, noShuffle: true },
          { val: 49, speed: 30, delay: 1.6, noShuffle: true },
          { val: 70, speed: 28, delay: 1.8, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_monte_carlo': {
    id: 'tutorial_monte_carlo',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'FUSION_MONTE_CARLO',
    requiredTowerName: '🎲 蒙地卡羅投擲機',
    name: '🎓 🎲 蒙地卡羅投擲機',
    subtitle: '量子機率骰：質數暴擊、開方重創與大數金幣',
    tip: '💡 本課指定【🎲 蒙地卡羅投擲機】！投擲 1~12 骰子，觸發質數 250% 暴擊與完全平方開方！',
    nextLevelId: 'tutorial_factorial',
    initialGold: 900,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第十三課：🎲 蒙地卡羅投擲機（機率特訓）',
        tip: '💡 建造【🎲 蒙地卡羅投擲機】，觀察擲骰對不同怪獸的奇效！',
        noShuffle: true,
        enemies: [
          { val: 16, speed: 34, delay: 1.2, noShuffle: true },
          { val: 25, speed: 34, delay: 1.4, noShuffle: true },
          { val: 36, speed: 32, delay: 1.5, noShuffle: true },
          { val: 45, speed: 30, delay: 1.6, noShuffle: true },
          { val: 60, speed: 28, delay: 1.8, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_factorial': {
    id: 'tutorial_factorial',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'FUSION_FACTORIAL',
    requiredTowerName: 'n! 階乘坍縮衝擊波',
    name: '🎓 💥 n! 階乘坍縮衝擊波',
    subtitle: '貫穿整條路徑，使全場因數階層連環坍縮',
    tip: '💡 本課指定【n! 階乘坍縮衝擊波】！極限神域禁忌之塔，發射貫穿全路徑的因數坍縮衝擊波！',
    nextLevelId: 'tutorial_triangle',
    initialGold: 1600,
    initialLives: 15,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [{ id: 'p_center', x: 480, y: 200 }],
    waves: [
      {
        title: '第十四課：💥 n! 階乘坍縮衝擊波（全域坍縮特訓）',
        tip: '💡 建造【n! 階乘坍縮衝擊波】，一擊重創路徑上所有敵軍！',
        noShuffle: true,
        enemies: [
          { val: -30, speed: 34, delay: 1.2, noShuffle: true },
          { val: 60, speed: 32, delay: 1.4, noShuffle: true },
          { val: 120, speed: 30, delay: 1.6, noShuffle: true },
          { val: 210, speed: 28, delay: 1.8, noShuffle: true },
          { val: 420, speed: 26, delay: 2.0, noShuffle: true }
        ]
      }
    ]
  },

  'tutorial_triangle': {
    id: 'tutorial_triangle',
    chapterId: 'tutorial',
    isTutorial: true,
    requiredTower: 'TRIANGLE_PRIMES',
    requiredTowerName: '2, 3, 5 及 3, 5, 7 質數砲',
    name: '第十五課：幾何共鳴三角結界',
    subtitle: '建造 2,3,5 或 3,5,7 啟動共振三角結界',
    tip: '💡 本課指引【三角結界】！在三基座建造 2, 3, 5 (Π30) 或 3, 5, 7 (Π105) 啟動幾何共鳴結界！',
    nextLevelId: 'tutorial_master',
    initialGold: 1200,
    initialLives: 20,
    lanes: [[{ x: 30, y: 280 }, { x: 930, y: 280 }]],
    buildPads: [
      { id: 'p_tri1_top', x: 320, y: 190 },
      { id: 'p_tri1_bl', x: 230, y: 365 },
      { id: 'p_tri1_br', x: 410, y: 365 },
      { id: 'p_tri2_top', x: 640, y: 190 },
      { id: 'p_tri2_bl', x: 550, y: 365 },
      { id: 'p_tri2_br', x: 730, y: 365 }
    ],
    waves: [
      {
        title: '第十五課：📐 幾何共鳴三角結界',
        tip: '💡 在相鄰 3 基座建造 2、3、5 啟動【質數三相聖環(Π30)】，或 3、5、7 啟動【七曜三聯聖環(Π105)】！',
        noShuffle: true,
        enemies: [
          { val: 30, speed: 30, delay: 1.2, noShuffle: true },
          { val: 60, speed: 30, delay: 1.5, noShuffle: true },
          { val: 105, speed: 28, delay: 1.8, noShuffle: true },
          { val: 42, speed: 30, delay: 2.0, noShuffle: true },
          { val: 210, speed: 26, delay: 2.2, noShuffle: true }
        ]
      }
    ]
  }};

