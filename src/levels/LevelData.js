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
    name: '1-1 偶數小徑（雙流迴旋谷）',
    subtitle: '偶數除法多段打擊入門',
    tip: '💡 10 組沿線三角共鳴群（30處平原陣地）！基座緊貼雙河道兩側，建置質數砲跨河構成三角結界！',
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
      // 三角共鳴組 1
      { id: 'p1', x: 230, y: 288 },
      { id: 'p2', x: 356, y: 288 },
      { id: 'p3', x: 293, y: 152 },
      // 三角共鳴組 2
      { id: 'p4', x: 481, y: 217 },
      { id: 'p5', x: 578, y: 298 },
      { id: 'p6', x: 442, y: 361 },
      // 三角共鳴組 3
      { id: 'p7', x: 566, y: 466 },
      { id: 'p8', x: 750, y: 440 },
      { id: 'p9', x: 616, y: 372 },
      // 三角共鳴組 4
      { id: 'p10', x: 744, y: 272 },
      { id: 'p11', x: 843, y: 194 },
      { id: 'p12', x: 878, y: 340 },
      // 三角共鳴組 5
      { id: 'p13', x: 941, y: 305 },
      { id: 'p14', x: 1056, y: 358 },
      { id: 'p15', x: 1056, y: 208 },
      // 三角共鳴組 6
      { id: 'p16', x: 230, y: 568 },
      { id: 'p17', x: 356, y: 568 },
      { id: 'p18', x: 293, y: 432 },
      // 三角共鳴組 7
      { id: 'p19', x: 393, y: 400 },
      { id: 'p20', x: 490, y: 318 },
      { id: 'p21', x: 530, y: 463 },
      // 三角共鳴組 8
      { id: 'p22', x: 653, y: 358 },
      { id: 'p23', x: 666, y: 387 },
      { id: 'p24', x: 700, y: 241 },
      // 三角共鳴組 9
      { id: 'p25', x: 828, y: 341 },
      { id: 'p26', x: 927, y: 419 },
      { id: 'p27', x: 794, y: 487 },
      // 三角共鳴組 10
      { id: 'p28', x: 999, y: 538 },
      { id: 'p29', x: 1113, y: 485 },
      { id: 'p30', x: 998, y: 388 }
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
    tip: '💡 12 組沿線三角共鳴群（36處陣地）！三條支流切過綠洲沙洲，砲塔基座全數緊隨河岸兩側！',
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
      // 三角共鳴組 1
      { id: 'p1', x: 307, y: 288 },
      { id: 'p2', x: 437, y: 288 },
      { id: 'p3', x: 372, y: 152 },
      // 三角共鳴組 2
      { id: 'p4', x: 651, y: 283 },
      { id: 'p5', x: 756, y: 360 },
      { id: 'p6', x: 623, y: 431 },
      // 三角共鳴組 3
      { id: 'p7', x: 932, y: 414 },
      { id: 'p8', x: 1045, y: 350 },
      { id: 'p9', x: 921, y: 264 },
      // 三角共鳴組 4
      { id: 'p10', x: 1229, y: 229 },
      { id: 'p11', x: 1346, y: 287 },
      { id: 'p12', x: 1227, y: 379 },
      // 三角共鳴組 5
      { id: 'p13', x: 307, y: 728 },
      { id: 'p14', x: 437, y: 728 },
      { id: 'p15', x: 372, y: 592 },
      // 三角共鳴組 6
      { id: 'p16', x: 571, y: 487 },
      { id: 'p17', x: 676, y: 410 },
      { id: 'p18', x: 704, y: 558 },
      // 三角共鳴組 7
      { id: 'p19', x: 864, y: 584 },
      { id: 'p20', x: 977, y: 648 },
      { id: 'p21', x: 988, y: 498 },
      // 三角共鳴組 8
      { id: 'p22', x: 1169, y: 530 },
      { id: 'p23', x: 1285, y: 472 },
      { id: 'p24', x: 1288, y: 622 },
      // 三角共鳴組 9
      { id: 'p25', x: 304, y: 508 },
      { id: 'p26', x: 460, y: 497 },
      { id: 'p27', x: 369, y: 372 },
      // 三角共鳴組 10
      { id: 'p28', x: 598, y: 290 },
      { id: 'p29', x: 718, y: 240 },
      { id: 'p30', x: 711, y: 390 },
      // 三角共鳴組 11
      { id: 'p31', x: 861, y: 483 },
      { id: 'p32', x: 960, y: 567 },
      { id: 'p33', x: 998, y: 421 },
      // 三角共鳴組 12
      { id: 'p34', x: 1161, y: 481 },
      { id: 'p35', x: 1285, y: 440 },
      { id: 'p36', x: 1266, y: 590 }
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
    name: '1-3 質數森林（分岔三角洲）',
    subtitle: '質數砲陣列佈防與攻速升級',
    tip: '💡 14 組沿線三角共鳴群（42處陣地）！沼澤三岔道交匯於森林防禦基地，沿河夾道迎敵！',
    nextLevelId: '1-4',
    initialGold: 850,
    initialLives: 10,
    worldWidth: 1700,
    worldHeight: 950,
    lanes: [
      [
        { x: 80, y: 180 },
        { x: 480, y: 180 },
        { x: 750, y: 400 },
        { x: 1200, y: 300 },
        { x: 1620, y: 480 }
      ],
      [
        { x: 80, y: 780 },
        { x: 480, y: 780 },
        { x: 750, y: 560 },
        { x: 1200, y: 660 },
        { x: 1620, y: 480 }
      ],
      [
        { x: 80, y: 480 },
        { x: 420, y: 480 },
        { x: 850, y: 480 },
        { x: 1300, y: 480 },
        { x: 1620, y: 480 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 280, y: 248 },
      { id: 'p2', x: 410, y: 248 },
      { id: 'p3', x: 345, y: 112 },
      // 三角共鳴組 2
      { id: 'p4', x: 592, y: 183 },
      { id: 'p5', x: 693, y: 266 },
      { id: 'p6', x: 556, y: 330 },
      // 三角共鳴組 3
      { id: 'p7', x: 794, y: 460 },
      { id: 'p8', x: 921, y: 432 },
      { id: 'p9', x: 828, y: 313 },
      // 三角共鳴組 4
      { id: 'p10', x: 1047, y: 264 },
      { id: 'p11', x: 1174, y: 236 },
      { id: 'p12', x: 1140, y: 383 },
      // 三角共鳴組 5
      { id: 'p13', x: 1309, y: 421 },
      { id: 'p14', x: 1428, y: 472 },
      { id: 'p15', x: 1422, y: 321 },
      // 三角共鳴組 6
      { id: 'p16', x: 280, y: 848 },
      { id: 'p17', x: 410, y: 848 },
      { id: 'p18', x: 345, y: 712 },
      // 三角共鳴組 7
      { id: 'p19', x: 506, y: 671 },
      { id: 'p20', x: 607, y: 589 },
      { id: 'p21', x: 642, y: 736 },
      // 三角共鳴組 8
      { id: 'p22', x: 764, y: 633 },
      { id: 'p23', x: 891, y: 661 },
      { id: 'p24', x: 857, y: 514 },
      // 三角共鳴組 9
      { id: 'p25', x: 1076, y: 563 },
      { id: 'p26', x: 1203, y: 591 },
      { id: 'p27', x: 1110, y: 710 },
      // 三角共鳴組 10
      { id: 'p28', x: 1362, y: 664 },
      { id: 'p29', x: 1482, y: 613 },
      { id: 'p30', x: 1368, y: 514 },
      // 三角共鳴組 11
      { id: 'p31', x: 300, y: 548 },
      { id: 'p32', x: 430, y: 548 },
      { id: 'p33', x: 365, y: 412 },
      // 三角共鳴組 12
      { id: 'p34', x: 630, y: 412 },
      { id: 'p35', x: 760, y: 412 },
      { id: 'p36', x: 695, y: 548 },
      // 三角共鳴組 13
      { id: 'p37', x: 960, y: 548 },
      { id: 'p38', x: 1090, y: 548 },
      { id: 'p39', x: 1025, y: 412 },
      // 三角共鳴組 14
      { id: 'p40', x: 1290, y: 412 },
      { id: 'p41', x: 1420, y: 412 },
      { id: 'p42', x: 1355, y: 548 }
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
    name: '1-4 【大魔王】合數泰坦【360】（平原大要塞）',
    subtitle: '第一章終局：合數泰坦大決戰',
    tip: '👑 16 組沿線三角共鳴群（48處陣地）！泰坦自四路大河推進，砲塔沿江夾擊形成鎖死火網！',
    nextLevelId: '2-1',
    initialGold: 1000,
    initialLives: 10,
    worldWidth: 1850,
    worldHeight: 1020,
    lanes: [
      [
        { x: 80, y: 160 },
        { x: 550, y: 160 },
        { x: 850, y: 420 },
        { x: 1350, y: 300 },
        { x: 1780, y: 510 }
      ],
      [
        { x: 80, y: 860 },
        { x: 550, y: 860 },
        { x: 850, y: 600 },
        { x: 1350, y: 720 },
        { x: 1780, y: 510 }
      ],
      [
        { x: 80, y: 380 },
        { x: 500, y: 380 },
        { x: 900, y: 320 },
        { x: 1400, y: 420 },
        { x: 1780, y: 510 }
      ],
      [
        { x: 80, y: 640 },
        { x: 500, y: 640 },
        { x: 900, y: 700 },
        { x: 1400, y: 600 },
        { x: 1780, y: 510 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 340, y: 228 },
      { id: 'p2', x: 470, y: 228 },
      { id: 'p3', x: 405, y: 92 },
      // 三角共鳴組 2
      { id: 'p4', x: 746, y: 240 },
      { id: 'p5', x: 844, y: 325 },
      { id: 'p6', x: 706, y: 385 },
      // 三角共鳴組 3
      { id: 'p7', x: 1073, y: 436 },
      { id: 'p8', x: 1199, y: 406 },
      { id: 'p9', x: 1104, y: 289 },
      // 三角共鳴組 4
      { id: 'p10', x: 1477, y: 287 },
      { id: 'p11', x: 1594, y: 344 },
      { id: 'p12', x: 1476, y: 437 },
      // 三角共鳴組 5
      { id: 'p13', x: 340, y: 928 },
      { id: 'p14', x: 470, y: 928 },
      { id: 'p15', x: 405, y: 792 },
      // 三角共鳴組 6
      { id: 'p16', x: 657, y: 678 },
      { id: 'p17', x: 755, y: 593 },
      { id: 'p18', x: 795, y: 738 },
      // 三角共鳴組 7
      { id: 'p19', x: 1041, y: 716 },
      { id: 'p20', x: 1168, y: 746 },
      { id: 'p21', x: 1136, y: 599 },
      // 三角共鳴組 8
      { id: 'p22', x: 1418, y: 611 },
      { id: 'p23', x: 1535, y: 554 },
      { id: 'p24', x: 1536, y: 705 },
      // 三角共鳴組 9
      { id: 'p25', x: 323, y: 448 },
      { id: 'p26', x: 453, y: 448 },
      { id: 'p27', x: 388, y: 312 },
      // 三角共鳴組 10
      { id: 'p28', x: 687, y: 283 },
      { id: 'p29', x: 816, y: 264 },
      { id: 'p30', x: 771, y: 408 },
      // 三角共鳴組 11
      { id: 'p31', x: 1054, y: 420 },
      { id: 'p32', x: 1182, y: 446 },
      { id: 'p33', x: 1145, y: 300 },
      // 三角共鳴組 12
      { id: 'p34', x: 1452, y: 362 },
      { id: 'p35', x: 1579, y: 392 },
      { id: 'p36', x: 1484, y: 510 },
      // 三角共鳴組 13
      { id: 'p37', x: 323, y: 708 },
      { id: 'p38', x: 453, y: 708 },
      { id: 'p39', x: 388, y: 572 },
      // 三角共鳴組 14
      { id: 'p40', x: 707, y: 602 },
      { id: 'p41', x: 836, y: 622 },
      { id: 'p42', x: 751, y: 746 },
      // 三角共鳴組 15
      { id: 'p43', x: 1081, y: 733 },
      { id: 'p44', x: 1209, y: 708 },
      { id: 'p45', x: 1118, y: 587 },
      // 三角共鳴組 16
      { id: 'p46', x: 1421, y: 525 },
      { id: 'p47', x: 1547, y: 495 },
      { id: 'p48', x: 1515, y: 643 }
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
    name: '2-1 絕對值深淵（雙螺旋暗河）',
    subtitle: '絕對值塔登場與負數淨化機制',
    tip: '🌀 14 組沿線三角共鳴群（42處陣地）！兩條負數暗流呈雙螺旋交織，砲塔沿螺旋暗流夾道鎖定！',
    nextLevelId: '2-2',
    initialGold: 1100,
    initialLives: 10,
    worldWidth: 1600,
    worldHeight: 900,
    lanes: [
      [
        { x: 80, y: 220 },
        { x: 420, y: 650 },
        { x: 800, y: 220 },
        { x: 1180, y: 650 },
        { x: 1520, y: 450 }
      ],
      [
        { x: 80, y: 680 },
        { x: 420, y: 250 },
        { x: 800, y: 680 },
        { x: 1180, y: 250 },
        { x: 1520, y: 450 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 144, y: 410 },
      { id: 'p2', x: 224, y: 512 },
      { id: 'p3', x: 291, y: 377 },
      // 三角共鳴組 2
      { id: 'p4', x: 416, y: 535 },
      { id: 'p5', x: 394, y: 577 },
      { id: 'p6', x: 350, y: 671 },
      // 三角共鳴組 3
      { id: 'p7', x: 587, y: 564 },
      { id: 'p8', x: 673, y: 467 },
      { id: 'p9', x: 528, y: 425 },
      // 三角共鳴組 4
      { id: 'p10', x: 662, y: 274 },
      { id: 'p11', x: 748, y: 176 },
      { id: 'p12', x: 807, y: 315 },
      // 三角共鳴組 5
      { id: 'p13', x: 839, y: 366 },
      { id: 'p14', x: 925, y: 464 },
      { id: 'p15', x: 984, y: 325 },
      // 三角共鳴組 6
      { id: 'p16', x: 1118, y: 477 },
      { id: 'p17', x: 1204, y: 574 },
      { id: 'p18', x: 1059, y: 615 },
      // 三角共鳴組 7
      { id: 'p19', x: 1297, y: 660 },
      { id: 'p20', x: 1409, y: 594 },
      { id: 'p21', x: 1284, y: 510 },
      // 三角共鳴組 8
      { id: 'p22', x: 250, y: 574 },
      { id: 'p23', x: 331, y: 472 },
      { id: 'p24', x: 184, y: 439 },
      // 三角共鳴組 9
      { id: 'p25', x: 309, y: 280 },
      { id: 'p26', x: 496, y: 233 },
      { id: 'p27', x: 456, y: 314 },
      // 三角共鳴組 10
      { id: 'p28', x: 485, y: 426 },
      { id: 'p29', x: 571, y: 523 },
      { id: 'p30', x: 630, y: 385 },
      // 三角共鳴組 11
      { id: 'p31', x: 764, y: 536 },
      { id: 'p32', x: 850, y: 634 },
      { id: 'p33', x: 705, y: 675 },
      // 三角共鳴組 12
      { id: 'p34', x: 941, y: 624 },
      { id: 'p35', x: 1027, y: 526 },
      { id: 'p36', x: 882, y: 485 },
      // 三角共鳴組 13
      { id: 'p37', x: 1016, y: 333 },
      { id: 'p38', x: 1102, y: 236 },
      { id: 'p39', x: 1161, y: 375 },
      // 三角共鳴組 14
      { id: 'p40', x: 1228, y: 357 },
      { id: 'p41', x: 1340, y: 423 },
      { id: 'p42', x: 1353, y: 273 }
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
    name: '2-2 符號之井（十字裂隙樞紐）',
    subtitle: '正負交替與運算子變換',
    tip: '🌀 15 組沿線三角共鳴群（45處陣地）！地圖中心形成真正的「X」型十字交叉，路口兩側佈署重兵！',
    nextLevelId: '2-3',
    initialGold: 1200,
    initialLives: 10,
    worldWidth: 1750,
    worldHeight: 980,
    lanes: [
      [
        { x: 80, y: 180 },
        { x: 875, y: 490 },
        { x: 1250, y: 250 },
        { x: 1670, y: 490 }
      ],
      [
        { x: 80, y: 800 },
        { x: 875, y: 490 },
        { x: 1250, y: 730 },
        { x: 1670, y: 490 }
      ],
      [
        { x: 80, y: 490 },
        { x: 500, y: 490 },
        { x: 875, y: 490 },
        { x: 1350, y: 490 },
        { x: 1670, y: 490 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 252, y: 320 },
      { id: 'p2', x: 373, y: 367 },
      { id: 'p3', x: 362, y: 217 },
      // 三角共鳴組 2
      { id: 'p4', x: 593, y: 307 },
      { id: 'p5', x: 714, y: 354 },
      { id: 'p6', x: 604, y: 457 },
      // 三角共鳴組 3
      { id: 'p7', x: 834, y: 547 },
      { id: 'p8', x: 1007, y: 486 },
      { id: 'p9', x: 879, y: 407 },
      // 三角共鳴組 4
      { id: 'p10', x: 1087, y: 274 },
      { id: 'p11', x: 1197, y: 203 },
      { id: 'p12', x: 1215, y: 353 },
      // 三角共鳴組 5
      { id: 'p13', x: 1357, y: 390 },
      { id: 'p14', x: 1470, y: 454 },
      { id: 'p15', x: 1481, y: 304 },
      // 三角共鳴組 6
      { id: 'p16', x: 301, y: 787 },
      { id: 'p17', x: 423, y: 739 },
      { id: 'p18', x: 313, y: 636 },
      // 三角共鳴組 7
      { id: 'p19', x: 543, y: 546 },
      { id: 'p20', x: 664, y: 499 },
      { id: 'p21', x: 653, y: 649 },
      // 三角共鳴組 8
      { id: 'p22', x: 884, y: 560 },
      { id: 'p23', x: 933, y: 608 },
      { id: 'p24', x: 952, y: 459 },
      // 三角共鳴組 9
      { id: 'p25', x: 1160, y: 592 },
      { id: 'p26', x: 1270, y: 662 },
      { id: 'p27', x: 1142, y: 741 },
      // 三角共鳴組 10
      { id: 'p28', x: 1425, y: 708 },
      { id: 'p29', x: 1538, y: 644 },
      { id: 'p30', x: 1414, y: 558 },
      // 三角共鳴組 11
      { id: 'p31', x: 272, y: 558 },
      { id: 'p32', x: 402, y: 558 },
      { id: 'p33', x: 337, y: 422 },
      // 三角共鳴組 12
      { id: 'p34', x: 546, y: 422 },
      { id: 'p35', x: 676, y: 422 },
      { id: 'p36', x: 611, y: 558 },
      // 三角共鳴組 13
      { id: 'p37', x: 820, y: 558 },
      { id: 'p38', x: 950, y: 558 },
      { id: 'p39', x: 885, y: 422 },
      // 三角共鳴組 14
      { id: 'p40', x: 1094, y: 422 },
      { id: 'p41', x: 1224, y: 422 },
      { id: 'p42', x: 1159, y: 558 },
      // 三角共鳴組 15
      { id: 'p43', x: 1368, y: 558 },
      { id: 'p44', x: 1498, y: 558 },
      { id: 'p45', x: 1433, y: 422 }
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
    name: '2-3 公倍數陷阱（多維交錯迴廊）',
    subtitle: 'LCM 融合危機與合體防禦',
    tip: '🌀 16 組沿線三角共鳴群（48處陣地）！三條深淵軌道多重立交，砲塔沿三軌兩側築起絕對值防線！',
    nextLevelId: '2-4',
    initialGold: 1300,
    initialLives: 10,
    worldWidth: 1900,
    worldHeight: 1050,
    lanes: [
      [
        { x: 80, y: 180 },
        { x: 550, y: 750 },
        { x: 1000, y: 250 },
        { x: 1450, y: 750 },
        { x: 1820, y: 525 }
      ],
      [
        { x: 80, y: 870 },
        { x: 550, y: 300 },
        { x: 1000, y: 800 },
        { x: 1450, y: 300 },
        { x: 1820, y: 525 }
      ],
      [
        { x: 80, y: 525 },
        { x: 450, y: 525 },
        { x: 950, y: 525 },
        { x: 1450, y: 525 },
        { x: 1820, y: 525 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 184, y: 413 },
      { id: 'p2', x: 267, y: 514 },
      { id: 'p3', x: 331, y: 377 },
      // 三角共鳴組 2
      { id: 'p4', x: 533, y: 622 },
      { id: 'p5', x: 513, y: 689 },
      { id: 'p6', x: 469, y: 759 },
      // 三角共鳴組 3
      { id: 'p7', x: 783, y: 592 },
      { id: 'p8', x: 870, y: 496 },
      { id: 'p9', x: 726, y: 453 },
      // 三角共鳴組 4
      { id: 'p10', x: 938, y: 217 },
      { id: 'p11', x: 1127, y: 289 },
      { id: 'p12', x: 982, y: 332 },
      // 三角共鳴組 5
      { id: 'p13', x: 1195, y: 568 },
      { id: 'p14', x: 1282, y: 664 },
      { id: 'p15', x: 1339, y: 525 },
      // 三角共鳴組 6
      { id: 'p16', x: 1480, y: 652 },
      { id: 'p17', x: 1591, y: 585 },
      { id: 'p18', x: 1606, y: 735 },
      // 三角共鳴組 7
      { id: 'p19', x: 314, y: 694 },
      { id: 'p20', x: 396, y: 593 },
      { id: 'p21', x: 250, y: 557 },
      // 三角共鳴組 8
      { id: 'p22', x: 604, y: 259 },
      { id: 'p23', x: 691, y: 355 },
      { id: 'p24', x: 547, y: 398 },
      // 三角共鳴組 9
      { id: 'p25', x: 810, y: 691 },
      { id: 'p26', x: 897, y: 788 },
      { id: 'p27', x: 955, y: 648 },
      // 三角共鳴組 10
      { id: 'p28', x: 1118, y: 568 },
      { id: 'p29', x: 1205, y: 471 },
      { id: 'p30', x: 1262, y: 610 },
      // 三角共鳴組 11
      { id: 'p31', x: 1447, y: 378 },
      { id: 'p32', x: 1558, y: 446 },
      { id: 'p33', x: 1574, y: 296 },
      // 三角共鳴組 12
      { id: 'p34', x: 287, y: 593 },
      { id: 'p35', x: 417, y: 593 },
      { id: 'p36', x: 352, y: 457 },
      // 三角共鳴組 13
      { id: 'p37', x: 591, y: 457 },
      { id: 'p38', x: 721, y: 457 },
      { id: 'p39', x: 656, y: 593 },
      // 三角共鳴組 14
      { id: 'p40', x: 895, y: 593 },
      { id: 'p41', x: 1025, y: 593 },
      { id: 'p42', x: 960, y: 457 },
      // 三角共鳴組 15
      { id: 'p43', x: 1199, y: 457 },
      { id: 'p44', x: 1329, y: 457 },
      { id: 'p45', x: 1264, y: 593 },
      // 三角共鳴組 16
      { id: 'p46', x: 1503, y: 593 },
      { id: 'p47', x: 1633, y: 593 },
      { id: 'p48', x: 1568, y: 457 }
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
    name: '2-4 【大魔王】負極奇點皇【-480】（深淵裂谷王座）',
    subtitle: '第二章終局：奇點皇負數大逆轉',
    tip: '👑 18 組沿線三角共鳴群（54處陣地）！奇點皇親衛隊自四條深淵裂谷湧入，沿谷築起金色三角防線！',
    nextLevelId: '3-1',
    initialGold: 1450,
    initialLives: 10,
    worldWidth: 2050,
    worldHeight: 1120,
    lanes: [
      [
        { x: 80, y: 150 },
        { x: 650, y: 750 },
        { x: 1100, y: 250 },
        { x: 1550, y: 750 },
        { x: 1970, y: 560 }
      ],
      [
        { x: 80, y: 970 },
        { x: 650, y: 370 },
        { x: 1100, y: 870 },
        { x: 1550, y: 370 },
        { x: 1970, y: 560 }
      ],
      [
        { x: 80, y: 400 },
        { x: 550, y: 400 },
        { x: 1050, y: 650 },
        { x: 1600, y: 450 },
        { x: 1970, y: 560 }
      ],
      [
        { x: 80, y: 720 },
        { x: 550, y: 720 },
        { x: 1050, y: 470 },
        { x: 1600, y: 670 },
        { x: 1970, y: 560 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 235, y: 412 },
      { id: 'p2', x: 324, y: 506 },
      { id: 'p3', x: 378, y: 365 },
      // 三角共鳴組 2
      { id: 'p4', x: 666, y: 668 },
      { id: 'p5', x: 654, y: 644 },
      { id: 'p6', x: 712, y: 783 },
      // 三角共鳴組 3
      { id: 'p7', x: 991, y: 473 },
      { id: 'p8', x: 1078, y: 376 },
      { id: 'p9', x: 934, y: 333 },
      // 三角共鳴組 4
      { id: 'p10', x: 1314, y: 386 },
      { id: 'p11', x: 1401, y: 483 },
      { id: 'p12', x: 1256, y: 526 },
      // 三角共鳴組 5
      { id: 'p13', x: 1628, y: 789 },
      { id: 'p14', x: 1746, y: 736 },
      { id: 'p15', x: 1631, y: 639 },
      // 三角共鳴組 6
      { id: 'p16', x: 333, y: 802 },
      { id: 'p17', x: 423, y: 708 },
      { id: 'p18', x: 280, y: 661 },
      // 三角共鳴組 7
      { id: 'p19', x: 567, y: 358 },
      { id: 'p20', x: 755, y: 385 },
      { id: 'p21', x: 611, y: 428 },
      // 三角共鳴組 8
      { id: 'p22', x: 890, y: 738 },
      { id: 'p23', x: 977, y: 835 },
      { id: 'p24', x: 1035, y: 696 },
      // 三角共鳴組 9
      { id: 'p25', x: 1213, y: 643 },
      { id: 'p26', x: 1300, y: 546 },
      { id: 'p27', x: 1358, y: 685 },
      // 三角共鳴組 10
      { id: 'p28', x: 1572, y: 454 },
      { id: 'p29', x: 1690, y: 508 },
      { id: 'p30', x: 1687, y: 357 },
      // 三角共鳴組 11
      { id: 'p31', x: 358, y: 468 },
      { id: 'p32', x: 488, y: 468 },
      { id: 'p33', x: 423, y: 332 },
      // 三角共鳴組 12
      { id: 'p34', x: 806, y: 452 },
      { id: 'p35', x: 923, y: 510 },
      { id: 'p36', x: 804, y: 603 },
      // 三角共鳴組 13
      { id: 'p37', x: 1204, y: 667 },
      { id: 'p38', x: 1326, y: 622 },
      { id: 'p39', x: 1218, y: 517 },
      // 三角共鳴組 14
      { id: 'p40', x: 1575, y: 387 },
      { id: 'p41', x: 1743, y: 421 },
      { id: 'p42', x: 1641, y: 533 },
      // 三角共鳴組 15
      { id: 'p43', x: 358, y: 788 },
      { id: 'p44', x: 488, y: 788 },
      { id: 'p45', x: 423, y: 652 },
      // 三角共鳴組 16
      { id: 'p46', x: 746, y: 546 },
      { id: 'p47', x: 862, y: 488 },
      { id: 'p48', x: 864, y: 639 },
      // 三角共鳴組 17
      { id: 'p49', x: 1157, y: 581 },
      { id: 'p50', x: 1279, y: 626 },
      { id: 'p51', x: 1265, y: 476 },
      // 三角共鳴組 18
      { id: 'p52', x: 1622, y: 606 },
      { id: 'p53', x: 1704, y: 568 },
      { id: 'p54', x: 1680, y: 717 }
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
    name: '3-1 開方石階（天梯盤旋坡）',
    subtitle: '根號塔登場與平方數判定',
    tip: '🏔️ 15 組天梯沿線三角群（45處陣地）！【山頂核心 (1840, 220)】！怪物沿著雙盤山道「之」字攀登，砲塔緊隨梯道兩側！',
    nextLevelId: '3-2',
    initialGold: 1400,
    initialLives: 10,
    worldWidth: 2000,
    worldHeight: 1100,
    lanes: [
      [
        { x: 80, y: 980 },
        { x: 1720, y: 980 },
        { x: 1720, y: 580 },
        { x: 260, y: 580 },
        { x: 260, y: 220 },
        { x: 1840, y: 220 }
      ],
      [
        { x: 80, y: 880 },
        { x: 1600, y: 880 },
        { x: 1600, y: 480 },
        { x: 380, y: 480 },
        { x: 380, y: 220 },
        { x: 1840, y: 220 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 461, y: 1048 },
      { id: 'p2', x: 591, y: 1048 },
      { id: 'p3', x: 526, y: 912 },
      // 三角共鳴組 2
      { id: 'p4', x: 1114, y: 912 },
      { id: 'p5', x: 1244, y: 912 },
      { id: 'p6', x: 1179, y: 1048 },
      // 三角共鳴組 3
      { id: 'p7', x: 1788, y: 934 },
      { id: 'p8', x: 1788, y: 804 },
      { id: 'p9', x: 1652, y: 869 },
      // 三角共鳴組 4
      { id: 'p10', x: 1421, y: 648 },
      { id: 'p11', x: 1291, y: 648 },
      { id: 'p12', x: 1356, y: 512 },
      // 三角共鳴組 5
      { id: 'p13', x: 769, y: 512 },
      { id: 'p14', x: 639, y: 512 },
      { id: 'p15', x: 704, y: 648 },
      // 三角共鳴組 6
      { id: 'p16', x: 192, y: 436 },
      { id: 'p17', x: 192, y: 306 },
      { id: 'p18', x: 328, y: 371 },
      // 三角共鳴組 7
      { id: 'p19', x: 696, y: 288 },
      { id: 'p20', x: 826, y: 288 },
      { id: 'p21', x: 761, y: 152 },
      // 三角共鳴組 8
      { id: 'p22', x: 1349, y: 152 },
      { id: 'p23', x: 1479, y: 152 },
      { id: 'p24', x: 1414, y: 288 },
      // 三角共鳴組 9
      { id: 'p25', x: 466, y: 948 },
      { id: 'p26', x: 596, y: 948 },
      { id: 'p27', x: 531, y: 812 },
      // 三角共鳴組 10
      { id: 'p28', x: 1129, y: 812 },
      { id: 'p29', x: 1259, y: 812 },
      { id: 'p30', x: 1194, y: 948 },
      // 三角共鳴組 11
      { id: 'p31', x: 1668, y: 688 },
      { id: 'p32', x: 1668, y: 558 },
      { id: 'p33', x: 1532, y: 623 },
      // 三角共鳴組 12
      { id: 'p34', x: 1145, y: 548 },
      { id: 'p35', x: 1015, y: 548 },
      { id: 'p36', x: 1080, y: 412 },
      // 三角共鳴組 13
      { id: 'p37', x: 482, y: 412 },
      { id: 'p38', x: 448, y: 452 },
      { id: 'p39', x: 417, y: 548 },
      // 三角共鳴組 14
      { id: 'p40', x: 681, y: 152 },
      { id: 'p41', x: 811, y: 152 },
      { id: 'p42', x: 746, y: 288 },
      // 三角共鳴組 15
      { id: 'p43', x: 1344, y: 288 },
      { id: 'p44', x: 1474, y: 288 },
      { id: 'p45', x: 1409, y: 152 }
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
    name: '3-2 七曜峰頂（開方共鳴陣）',
    subtitle: '平方數連續開方與質數分解',
    tip: '🏔️ 16 組天梯沿線三角群（48處陣地）！【山巔核心 (2040, 240)】！三條山道連續折返，砲塔沿盤山陡坡兩側緊密布設！',
    nextLevelId: '3-3',
    initialGold: 1500,
    initialLives: 10,
    worldWidth: 2160,
    worldHeight: 1200,
    lanes: [
      [
        { x: 80, y: 1040 },
        { x: 1880, y: 1040 },
        { x: 1880, y: 640 },
        { x: 280, y: 640 },
        { x: 280, y: 240 },
        { x: 2040, y: 240 }
      ],
      [
        { x: 80, y: 940 },
        { x: 1760, y: 940 },
        { x: 1760, y: 540 },
        { x: 400, y: 540 },
        { x: 400, y: 240 },
        { x: 2040, y: 240 }
      ],
      [
        { x: 80, y: 760 },
        { x: 1500, y: 760 },
        { x: 1500, y: 440 },
        { x: 600, y: 440 },
        { x: 600, y: 240 },
        { x: 2040, y: 240 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 613, y: 1108 },
      { id: 'p2', x: 743, y: 1108 },
      { id: 'p3', x: 678, y: 972 },
      // 三角共鳴組 2
      { id: 'p4', x: 1570, y: 972 },
      { id: 'p5', x: 1700, y: 972 },
      { id: 'p6', x: 1635, y: 1108 },
      // 三角共鳴組 3
      { id: 'p7', x: 1633, y: 572 },
      { id: 'p8', x: 1503, y: 572 },
      { id: 'p9', x: 1568, y: 708 },
      // 三角共鳴組 4
      { id: 'p10', x: 677, y: 708 },
      { id: 'p11', x: 547, y: 708 },
      { id: 'p12', x: 612, y: 572 },
      // 三角共鳴組 5
      { id: 'p13', x: 440, y: 308 },
      { id: 'p14', x: 570, y: 308 },
      { id: 'p15', x: 505, y: 172 },
      // 三角共鳴組 6
      { id: 'p16', x: 1397, y: 172 },
      { id: 'p17', x: 1527, y: 172 },
      { id: 'p18', x: 1462, y: 308 },
      // 三角共鳴組 7
      { id: 'p19', x: 651, y: 1008 },
      { id: 'p20', x: 781, y: 1008 },
      { id: 'p21', x: 716, y: 872 },
      // 三角共鳴組 8
      { id: 'p22', x: 1683, y: 872 },
      { id: 'p23', x: 1692, y: 887 },
      { id: 'p24', x: 1748, y: 1008 },
      // 三角共鳴組 9
      { id: 'p25', x: 1205, y: 472 },
      { id: 'p26', x: 1075, y: 472 },
      { id: 'p27', x: 1140, y: 608 },
      // 三角共鳴組 10
      { id: 'p28', x: 332, y: 313 },
      { id: 'p29', x: 457, y: 172 },
      { id: 'p30', x: 468, y: 248 },
      // 三角共鳴組 11
      { id: 'p31', x: 1359, y: 308 },
      { id: 'p32', x: 1489, y: 308 },
      { id: 'p33', x: 1424, y: 172 },
      // 三角共鳴組 12
      { id: 'p34', x: 541, y: 828 },
      { id: 'p35', x: 671, y: 828 },
      { id: 'p36', x: 606, y: 692 },
      // 三角共鳴組 13
      { id: 'p37', x: 1353, y: 692 },
      { id: 'p38', x: 1483, y: 692 },
      { id: 'p39', x: 1418, y: 828 },
      // 三角共鳴組 14
      { id: 'p40', x: 1155, y: 372 },
      { id: 'p41', x: 1025, y: 372 },
      { id: 'p42', x: 1090, y: 508 },
      // 三角共鳴組 15
      { id: 'p43', x: 657, y: 172 },
      { id: 'p44', x: 787, y: 172 },
      { id: 'p45', x: 722, y: 308 },
      // 三角共鳴組 16
      { id: 'p46', x: 1469, y: 308 },
      { id: 'p47', x: 1599, y: 308 },
      { id: 'p48', x: 1534, y: 172 }
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
    tip: '🏔️ 17 組天梯沿線三角群（51處陣地）！【天梯神廟核心 (2200, 260)】！三重雲端折疊攀爬，砲塔基座全數嵌在梯道彎角兩側！',
    nextLevelId: '3-4',
    initialGold: 1600,
    initialLives: 10,
    worldWidth: 2320,
    worldHeight: 1280,
    lanes: [
      [
        { x: 80, y: 1120 },
        { x: 2040, y: 1120 },
        { x: 2040, y: 700 },
        { x: 280, y: 700 },
        { x: 280, y: 260 },
        { x: 2200, y: 260 }
      ],
      [
        { x: 80, y: 1020 },
        { x: 1920, y: 1020 },
        { x: 1920, y: 600 },
        { x: 400, y: 600 },
        { x: 400, y: 260 },
        { x: 2200, y: 260 }
      ],
      [
        { x: 80, y: 860 },
        { x: 1760, y: 860 },
        { x: 1760, y: 480 },
        { x: 600, y: 480 },
        { x: 600, y: 260 },
        { x: 2200, y: 260 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 658, y: 1188 },
      { id: 'p2', x: 788, y: 1188 },
      { id: 'p3', x: 723, y: 1052 },
      // 三角共鳴組 2
      { id: 'p4', x: 1705, y: 1052 },
      { id: 'p5', x: 1835, y: 1052 },
      { id: 'p6', x: 1770, y: 1188 },
      // 三角共鳴組 3
      { id: 'p7', x: 1748, y: 632 },
      { id: 'p8', x: 1618, y: 632 },
      { id: 'p9', x: 1683, y: 768 },
      // 三角共鳴組 4
      { id: 'p10', x: 702, y: 768 },
      { id: 'p11', x: 572, y: 768 },
      { id: 'p12', x: 637, y: 632 },
      // 三角共鳴組 5
      { id: 'p13', x: 465, y: 328 },
      { id: 'p14', x: 595, y: 328 },
      { id: 'p15', x: 530, y: 192 },
      // 三角共鳴組 6
      { id: 'p16', x: 1512, y: 192 },
      { id: 'p17', x: 1642, y: 192 },
      { id: 'p18', x: 1577, y: 328 },
      // 三角共鳴組 7
      { id: 'p19', x: 610, y: 1088 },
      { id: 'p20', x: 740, y: 1088 },
      { id: 'p21', x: 675, y: 952 },
      // 三角共鳴組 8
      { id: 'p22', x: 1560, y: 952 },
      { id: 'p23', x: 1690, y: 952 },
      { id: 'p24', x: 1625, y: 1088 },
      // 三角共鳴組 9
      { id: 'p25', x: 1750, y: 532 },
      { id: 'p26', x: 1620, y: 532 },
      { id: 'p27', x: 1685, y: 668 },
      // 三角共鳴組 10
      { id: 'p28', x: 800, y: 668 },
      { id: 'p29', x: 670, y: 668 },
      { id: 'p30', x: 735, y: 532 },
      // 三角共鳴組 11
      { id: 'p31', x: 610, y: 328 },
      { id: 'p32', x: 740, y: 328 },
      { id: 'p33', x: 675, y: 192 },
      // 三角共鳴組 12
      { id: 'p34', x: 1560, y: 192 },
      { id: 'p35', x: 1690, y: 192 },
      { id: 'p36', x: 1625, y: 328 },
      // 三角共鳴組 13
      { id: 'p37', x: 617, y: 928 },
      { id: 'p38', x: 747, y: 928 },
      { id: 'p39', x: 682, y: 792 },
      // 三角共鳴組 14
      { id: 'p40', x: 1581, y: 792 },
      { id: 'p41', x: 1711, y: 792 },
      { id: 'p42', x: 1646, y: 928 },
      // 三角共鳴組 15
      { id: 'p43', x: 1355, y: 412 },
      { id: 'p44', x: 1225, y: 412 },
      { id: 'p45', x: 1290, y: 548 },
      // 三角共鳴組 16
      { id: 'p46', x: 532, y: 271 },
      { id: 'p47', x: 719, y: 192 },
      { id: 'p48', x: 654, y: 328 },
      // 三角共鳴組 17
      { id: 'p49', x: 1553, y: 328 },
      { id: 'p50', x: 1683, y: 328 },
      { id: 'p51', x: 1618, y: 192 }
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
    tip: '👑 18 組天梯沿線三角群（54處陣地）！【山巔神殿核心 (2360, 260)】！泰坦四路沿斷崖之字盤旋登頂，砲塔依山夾道截殺！',
    nextLevelId: '4-1',
    initialGold: 1800,
    initialLives: 10,
    worldWidth: 2480,
    worldHeight: 1360,
    lanes: [
      [
        { x: 80, y: 1200 },
        { x: 2200, y: 1200 },
        { x: 2200, y: 740 },
        { x: 280, y: 740 },
        { x: 280, y: 260 },
        { x: 2360, y: 260 }
      ],
      [
        { x: 80, y: 1100 },
        { x: 2080, y: 1100 },
        { x: 2080, y: 640 },
        { x: 400, y: 640 },
        { x: 400, y: 260 },
        { x: 2360, y: 260 }
      ],
      [
        { x: 80, y: 950 },
        { x: 1920, y: 950 },
        { x: 1920, y: 520 },
        { x: 600, y: 520 },
        { x: 600, y: 260 },
        { x: 2360, y: 260 }
      ],
      [
        { x: 80, y: 800 },
        { x: 1760, y: 800 },
        { x: 1760, y: 400 },
        { x: 800, y: 400 },
        { x: 800, y: 260 },
        { x: 2360, y: 260 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 819, y: 1268 },
      { id: 'p2', x: 949, y: 1268 },
      { id: 'p3', x: 884, y: 1132 },
      // 三角共鳴組 2
      { id: 'p4', x: 2187, y: 1132 },
      { id: 'p5', x: 2132, y: 1083 },
      { id: 'p6', x: 2268, y: 1148 },
      // 三角共鳴組 3
      { id: 'p7', x: 1305, y: 672 },
      { id: 'p8', x: 1175, y: 672 },
      { id: 'p9', x: 1240, y: 808 },
      // 三角共鳴組 4
      { id: 'p10', x: 212, y: 397 },
      { id: 'p11', x: 212, y: 267 },
      { id: 'p12', x: 348, y: 332 },
      // 三角共鳴組 5
      { id: 'p13', x: 1511, y: 328 },
      { id: 'p14', x: 1641, y: 328 },
      { id: 'p15', x: 1576, y: 192 },
      // 三角共鳴組 6
      { id: 'p16', x: 761, y: 1168 },
      { id: 'p17', x: 891, y: 1168 },
      { id: 'p18', x: 826, y: 1032 },
      // 三角共鳴組 7
      { id: 'p19', x: 2013, y: 1032 },
      { id: 'p20', x: 2012, y: 1037 },
      { id: 'p21', x: 2078, y: 1168 },
      // 三角共鳴組 8
      { id: 'p22', x: 1355, y: 572 },
      { id: 'p23', x: 1225, y: 572 },
      { id: 'p24', x: 1290, y: 708 },
      // 三角共鳴組 9
      { id: 'p25', x: 332, y: 343 },
      { id: 'p26', x: 447, y: 192 },
      { id: 'p27', x: 468, y: 278 },
      // 三角共鳴組 10
      { id: 'p28', x: 1569, y: 328 },
      { id: 'p29', x: 1699, y: 328 },
      { id: 'p30', x: 1634, y: 192 },
      // 三角共鳴組 11
      { id: 'p31', x: 809, y: 1018 },
      { id: 'p32', x: 939, y: 1018 },
      { id: 'p33', x: 874, y: 882 },
      // 三角共鳴組 12
      { id: 'p34', x: 1852, y: 714 },
      { id: 'p35', x: 1852, y: 584 },
      { id: 'p36', x: 1988, y: 649 },
      // 三角共鳴組 13
      { id: 'p37', x: 766, y: 452 },
      { id: 'p38', x: 636, y: 452 },
      { id: 'p39', x: 701, y: 588 },
      // 三角共鳴組 14
      { id: 'p40', x: 1521, y: 192 },
      { id: 'p41', x: 1651, y: 192 },
      { id: 'p42', x: 1586, y: 328 },
      // 三角共鳴組 15
      { id: 'p43', x: 700, y: 868 },
      { id: 'p44', x: 830, y: 868 },
      { id: 'p45', x: 765, y: 732 },
      // 三角共鳴組 16
      { id: 'p46', x: 1692, y: 730 },
      { id: 'p47', x: 1692, y: 600 },
      { id: 'p48', x: 1828, y: 665 },
      // 三角共鳴組 17
      { id: 'p49', x: 960, y: 332 },
      { id: 'p50', x: 830, y: 332 },
      { id: 'p51', x: 895, y: 468 },
      // 三角共鳴組 18
      { id: 'p52', x: 1630, y: 192 },
      { id: 'p53', x: 1760, y: 192 },
      { id: 'p54', x: 1695, y: 328 }
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
    name: '4-1 質數之壁（棋盤街區向心戰）',
    subtitle: '質數巨獸群正面突襲戰',
    tip: '🏛️ 16 組大街沿線三角群（48處陣地）！【正中央神廟核心 (1200, 690)】！基座緊隨西北、東北、西南、東南四條城門大街兩側佈防！',
    nextLevelId: '4-2',
    initialGold: 1800,
    initialLives: 10,
    worldWidth: 2400,
    worldHeight: 1380,
    lanes: [
      [
        { x: 120, y: 120 },
        { x: 680, y: 120 },
        { x: 680, y: 540 },
        { x: 1200, y: 690 }
      ],
      [
        { x: 2280, y: 120 },
        { x: 1720, y: 120 },
        { x: 1720, y: 540 },
        { x: 1200, y: 690 }
      ],
      [
        { x: 120, y: 1260 },
        { x: 680, y: 1260 },
        { x: 680, y: 840 },
        { x: 1200, y: 690 }
      ],
      [
        { x: 2280, y: 1260 },
        { x: 1720, y: 1260 },
        { x: 1720, y: 840 },
        { x: 1200, y: 690 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 338, y: 188 },
      { id: 'p2', x: 468, y: 188 },
      { id: 'p3', x: 403, y: 52 },
      // 三角共鳴組 2
      { id: 'p4', x: 663, y: 52 },
      { id: 'p5', x: 748, y: 233 },
      { id: 'p6', x: 612, y: 168 },
      // 三角共鳴組 3
      { id: 'p7', x: 612, y: 428 },
      { id: 'p8', x: 679, y: 610 },
      { id: 'p9', x: 748, y: 493 },
      // 三角共鳴組 4
      { id: 'p10', x: 904, y: 534 },
      { id: 'p11', x: 1029, y: 570 },
      { id: 'p12', x: 929, y: 683 },
      // 三角共鳴組 5
      { id: 'p13', x: 2062, y: 52 },
      { id: 'p14', x: 1932, y: 52 },
      { id: 'p15', x: 1997, y: 188 },
      // 三角共鳴組 6
      { id: 'p16', x: 1737, y: 188 },
      { id: 'p17', x: 1788, y: 233 },
      { id: 'p18', x: 1652, y: 168 },
      // 三角共鳴組 7
      { id: 'p19', x: 1652, y: 428 },
      { id: 'p20', x: 1684, y: 480 },
      { id: 'p21', x: 1788, y: 493 },
      // 三角共鳴組 8
      { id: 'p22', x: 1534, y: 665 },
      { id: 'p23', x: 1409, y: 701 },
      { id: 'p24', x: 1434, y: 552 },
      // 三角共鳴組 9
      { id: 'p25', x: 338, y: 1328 },
      { id: 'p26', x: 468, y: 1328 },
      { id: 'p27', x: 403, y: 1192 },
      // 三角共鳴組 10
      { id: 'p28', x: 663, y: 1192 },
      { id: 'p29', x: 612, y: 1147 },
      { id: 'p30', x: 748, y: 1212 },
      // 三角共鳴組 11
      { id: 'p31', x: 748, y: 952 },
      { id: 'p32', x: 716, y: 900 },
      { id: 'p33', x: 612, y: 887 },
      // 三角共鳴組 12
      { id: 'p34', x: 866, y: 715 },
      { id: 'p35', x: 991, y: 679 },
      { id: 'p36', x: 966, y: 828 },
      // 三角共鳴組 13
      { id: 'p37', x: 2062, y: 1192 },
      { id: 'p38', x: 1932, y: 1192 },
      { id: 'p39', x: 1997, y: 1328 },
      // 三角共鳴組 14
      { id: 'p40', x: 1737, y: 1328 },
      { id: 'p41', x: 1652, y: 1147 },
      { id: 'p42', x: 1788, y: 1212 },
      // 三角共鳴組 15
      { id: 'p43', x: 1788, y: 952 },
      { id: 'p44', x: 1721, y: 770 },
      { id: 'p45', x: 1652, y: 887 },
      // 三角共鳴組 16
      { id: 'p46', x: 1496, y: 846 },
      { id: 'p47', x: 1371, y: 810 },
      { id: 'p48', x: 1471, y: 697 }
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
    tip: '🏛️ 17 組大街沿線三角群（51處基座）！【正中央核心 (1280, 720)】！四向城廊兩側緊密布設基座，另有神殿內衛三角陣列！',
    nextLevelId: '4-3',
    initialGold: 1950,
    initialLives: 10,
    worldWidth: 2560,
    worldHeight: 1440,
    lanes: [
      [
        { x: 140, y: 140 },
        { x: 780, y: 140 },
        { x: 780, y: 560 },
        { x: 1280, y: 720 }
      ],
      [
        { x: 2420, y: 140 },
        { x: 1780, y: 140 },
        { x: 1780, y: 560 },
        { x: 1280, y: 720 }
      ],
      [
        { x: 140, y: 1300 },
        { x: 780, y: 1300 },
        { x: 780, y: 880 },
        { x: 1280, y: 720 }
      ],
      [
        { x: 2420, y: 1300 },
        { x: 1780, y: 1300 },
        { x: 1780, y: 880 },
        { x: 1280, y: 720 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 366, y: 208 },
      { id: 'p2', x: 496, y: 208 },
      { id: 'p3', x: 431, y: 72 },
      // 三角共鳴組 2
      { id: 'p4', x: 707, y: 72 },
      { id: 'p5', x: 848, y: 197 },
      { id: 'p6', x: 772, y: 208 },
      // 三角共鳴組 3
      { id: 'p7', x: 712, y: 408 },
      { id: 'p8', x: 712, y: 538 },
      { id: 'p9', x: 848, y: 473 },
      // 三角共鳴組 4
      { id: 'p10', x: 981, y: 553 },
      { id: 'p11', x: 1105, y: 593 },
      { id: 'p12', x: 1002, y: 702 },
      // 三角共鳴組 5
      { id: 'p13', x: 2194, y: 72 },
      { id: 'p14', x: 2064, y: 72 },
      { id: 'p15', x: 2129, y: 208 },
      // 三角共鳴組 6
      { id: 'p16', x: 1853, y: 208 },
      { id: 'p17', x: 1848, y: 197 },
      { id: 'p18', x: 1788, y: 72 },
      // 三角共鳴組 7
      { id: 'p19', x: 1712, y: 408 },
      { id: 'p20', x: 1712, y: 538 },
      { id: 'p21', x: 1848, y: 473 },
      // 三角共鳴組 8
      { id: 'p22', x: 1620, y: 682 },
      { id: 'p23', x: 1497, y: 722 },
      { id: 'p24', x: 1517, y: 573 },
      // 三角共鳴組 9
      { id: 'p25', x: 366, y: 1368 },
      { id: 'p26', x: 496, y: 1368 },
      { id: 'p27', x: 431, y: 1232 },
      // 三角共鳴組 10
      { id: 'p28', x: 707, y: 1232 },
      { id: 'p29', x: 712, y: 1243 },
      { id: 'p30', x: 772, y: 1368 },
      // 三角共鳴組 11
      { id: 'p31', x: 848, y: 1032 },
      { id: 'p32', x: 848, y: 902 },
      { id: 'p33', x: 712, y: 967 },
      // 三角共鳴組 12
      { id: 'p34', x: 940, y: 758 },
      { id: 'p35', x: 1063, y: 718 },
      { id: 'p36', x: 1043, y: 867 },
      // 三角共鳴組 13
      { id: 'p37', x: 2194, y: 1232 },
      { id: 'p38', x: 2064, y: 1232 },
      { id: 'p39', x: 2129, y: 1368 },
      // 三角共鳴組 14
      { id: 'p40', x: 1853, y: 1368 },
      { id: 'p41', x: 1712, y: 1243 },
      { id: 'p42', x: 1788, y: 1232 },
      // 三角共鳴組 15
      { id: 'p43', x: 1848, y: 1032 },
      { id: 'p44', x: 1848, y: 902 },
      { id: 'p45', x: 1712, y: 967 },
      // 三角共鳴組 16
      { id: 'p46', x: 1579, y: 887 },
      { id: 'p47', x: 1455, y: 847 },
      { id: 'p48', x: 1558, y: 738 },
      // 三角共鳴組 17
      { id: 'p49', x: 1365, y: 727 },
      { id: 'p50', x: 1287, y: 805 },
      { id: 'p51', x: 1226, y: 666 }
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
    tip: '🏛️ 18 組大街沿線三角群（54處火線）！【正中央核心 (1350, 740)】！四面城門大道緊密夾道，前線密集建置減速與三角結界！',
    nextLevelId: '4-4',
    initialGold: 2100,
    initialLives: 10,
    worldWidth: 2700,
    worldHeight: 1480,
    lanes: [
      [
        { x: 140, y: 140 },
        { x: 850, y: 140 },
        { x: 850, y: 580 },
        { x: 1350, y: 740 }
      ],
      [
        { x: 2560, y: 140 },
        { x: 1850, y: 140 },
        { x: 1850, y: 580 },
        { x: 1350, y: 740 }
      ],
      [
        { x: 140, y: 1340 },
        { x: 850, y: 1340 },
        { x: 850, y: 900 },
        { x: 1350, y: 740 }
      ],
      [
        { x: 2560, y: 1340 },
        { x: 1850, y: 1340 },
        { x: 1850, y: 900 },
        { x: 1350, y: 740 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 377, y: 208 },
      { id: 'p2', x: 507, y: 208 },
      { id: 'p3', x: 442, y: 72 },
      // 三角共鳴組 2
      { id: 'p4', x: 741, y: 72 },
      { id: 'p5', x: 918, y: 161 },
      { id: 'p6', x: 806, y: 208 },
      // 三角共鳴組 3
      { id: 'p7', x: 782, y: 394 },
      { id: 'p8', x: 782, y: 524 },
      { id: 'p9', x: 918, y: 459 },
      // 三角共鳴組 4
      { id: 'p10', x: 1040, y: 570 },
      { id: 'p11', x: 1164, y: 609 },
      { id: 'p12', x: 1061, y: 719 },
      // 三角共鳴組 5
      { id: 'p13', x: 2323, y: 72 },
      { id: 'p14', x: 2193, y: 72 },
      { id: 'p15', x: 2258, y: 208 },
      // 三角共鳴組 6
      { id: 'p16', x: 1959, y: 208 },
      { id: 'p17', x: 1918, y: 161 },
      { id: 'p18', x: 1894, y: 72 },
      // 三角共鳴組 7
      { id: 'p19', x: 1782, y: 394 },
      { id: 'p20', x: 1782, y: 524 },
      { id: 'p21', x: 1918, y: 459 },
      // 三角共鳴組 8
      { id: 'p22', x: 1701, y: 699 },
      { id: 'p23', x: 1577, y: 739 },
      { id: 'p24', x: 1598, y: 589 },
      // 三角共鳴組 9
      { id: 'p25', x: 377, y: 1408 },
      { id: 'p26', x: 507, y: 1408 },
      { id: 'p27', x: 442, y: 1272 },
      // 三角共鳴組 10
      { id: 'p28', x: 741, y: 1272 },
      { id: 'p29', x: 782, y: 1319 },
      { id: 'p30', x: 806, y: 1408 },
      // 三角共鳴組 11
      { id: 'p31', x: 918, y: 1086 },
      { id: 'p32', x: 918, y: 956 },
      { id: 'p33', x: 782, y: 1021 },
      // 三角共鳴組 12
      { id: 'p34', x: 999, y: 781 },
      { id: 'p35', x: 1123, y: 741 },
      { id: 'p36', x: 1102, y: 891 },
      // 三角共鳴組 13
      { id: 'p37', x: 2323, y: 1272 },
      { id: 'p38', x: 2193, y: 1272 },
      { id: 'p39', x: 2258, y: 1408 },
      // 三角共鳴組 14
      { id: 'p40', x: 1959, y: 1408 },
      { id: 'p41', x: 1782, y: 1319 },
      { id: 'p42', x: 1894, y: 1272 },
      // 三角共鳴組 15
      { id: 'p43', x: 1918, y: 1086 },
      { id: 'p44', x: 1918, y: 956 },
      { id: 'p45', x: 1782, y: 1021 },
      // 三角共鳴組 16
      { id: 'p46', x: 1660, y: 910 },
      { id: 'p47', x: 1536, y: 871 },
      { id: 'p48', x: 1639, y: 761 },
      // 三角共鳴組 17
      { id: 'p49', x: 1415, y: 685 },
      { id: 'p50', x: 1415, y: 795 },
      { id: 'p51', x: 1274, y: 740 },
      // 三角共鳴組 18
      { id: 'p52', x: 1285, y: 795 },
      { id: 'p53', x: 1285, y: 685 },
      { id: 'p54', x: 1427, y: 740 }
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
    tip: '👑 19 組大街沿線三角群（57處陣地）！【正中央歐拉聖所核心 (1440, 780)】！基座沿四方長廊延伸至中心，以密集夾道砲火迎擊神話獸！',
    nextLevelId: '5-1',
    initialGold: 2300,
    initialLives: 10,
    worldWidth: 2880,
    worldHeight: 1560,
    lanes: [
      [
        { x: 150, y: 150 },
        { x: 920, y: 150 },
        { x: 920, y: 620 },
        { x: 1440, y: 780 }
      ],
      [
        { x: 2730, y: 150 },
        { x: 1960, y: 150 },
        { x: 1960, y: 620 },
        { x: 1440, y: 780 }
      ],
      [
        { x: 150, y: 1410 },
        { x: 920, y: 1410 },
        { x: 920, y: 940 },
        { x: 1440, y: 780 }
      ],
      [
        { x: 2730, y: 1410 },
        { x: 1960, y: 1410 },
        { x: 1960, y: 940 },
        { x: 1440, y: 780 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 401, y: 218 },
      { id: 'p2', x: 531, y: 218 },
      { id: 'p3', x: 466, y: 82 },
      // 三角共鳴組 2
      { id: 'p4', x: 792, y: 82 },
      { id: 'p5', x: 988, y: 152 },
      { id: 'p6', x: 857, y: 218 },
      // 三角共鳴組 3
      { id: 'p7', x: 852, y: 413 },
      { id: 'p8', x: 852, y: 543 },
      { id: 'p9', x: 988, y: 478 },
      // 三角共鳴組 4
      { id: 'p10', x: 1115, y: 609 },
      { id: 'p11', x: 1240, y: 647 },
      { id: 'p12', x: 1138, y: 758 },
      // 三角共鳴組 5
      { id: 'p13', x: 2479, y: 82 },
      { id: 'p14', x: 2349, y: 82 },
      { id: 'p15', x: 2414, y: 218 },
      // 三角共鳴組 6
      { id: 'p16', x: 2088, y: 218 },
      { id: 'p17', x: 2028, y: 152 },
      { id: 'p18', x: 2023, y: 82 },
      // 三角共鳴組 7
      { id: 'p19', x: 1892, y: 413 },
      { id: 'p20', x: 1892, y: 543 },
      { id: 'p21', x: 2028, y: 478 },
      // 三角共鳴組 8
      { id: 'p22', x: 1805, y: 739 },
      { id: 'p23', x: 1680, y: 777 },
      { id: 'p24', x: 1702, y: 628 },
      // 三角共鳴組 9
      { id: 'p25', x: 401, y: 1478 },
      { id: 'p26', x: 531, y: 1478 },
      { id: 'p27', x: 466, y: 1342 },
      // 三角共鳴組 10
      { id: 'p28', x: 792, y: 1342 },
      { id: 'p29', x: 852, y: 1408 },
      { id: 'p30', x: 857, y: 1478 },
      // 三角共鳴組 11
      { id: 'p31', x: 988, y: 1147 },
      { id: 'p32', x: 988, y: 1017 },
      { id: 'p33', x: 852, y: 1082 },
      // 三角共鳴組 12
      { id: 'p34', x: 1075, y: 821 },
      { id: 'p35', x: 1200, y: 783 },
      { id: 'p36', x: 1178, y: 932 },
      // 三角共鳴組 13
      { id: 'p37', x: 2479, y: 1342 },
      { id: 'p38', x: 2349, y: 1342 },
      { id: 'p39', x: 2414, y: 1478 },
      // 三角共鳴組 14
      { id: 'p40', x: 2088, y: 1478 },
      { id: 'p41', x: 1892, y: 1408 },
      { id: 'p42', x: 2023, y: 1342 },
      // 三角共鳴組 15
      { id: 'p43', x: 2028, y: 1147 },
      { id: 'p44', x: 2028, y: 1017 },
      { id: 'p45', x: 1892, y: 1082 },
      // 三角共鳴組 16
      { id: 'p46', x: 1765, y: 951 },
      { id: 'p47', x: 1640, y: 913 },
      { id: 'p48', x: 1742, y: 802 },
      // 三角共鳴組 17
      { id: 'p49', x: 1525, y: 787 },
      { id: 'p50', x: 1447, y: 865 },
      { id: 'p51', x: 1386, y: 726 },
      // 三角共鳴組 18
      { id: 'p52', x: 1447, y: 695 },
      { id: 'p53', x: 1525, y: 773 },
      { id: 'p54', x: 1386, y: 834 },
      // 三角共鳴組 19
      { id: 'p55', x: 1495, y: 845 },
      { id: 'p56', x: 1385, y: 845 },
      { id: 'p57', x: 1440, y: 704 }
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
    name: '5-1 雙重螺旋銀河（阿基米德旋臂漩渦）',
    subtitle: '阿基米德雙螺旋星雲侵蝕戰',
    tip: '🌌 18 組雙螺旋旋臂沿線三角群（54處陣地）！【中央黑洞奇異點核心 (1440, 800)】！兩路大軍沿銀河雙螺旋旋臂向內盤旋深入，砲塔緊貼雙旋臂夾道射擊！',
    nextLevelId: '5-2',
    initialGold: 2400,
    initialLives: 10,
    worldWidth: 2880,
    worldHeight: 1600,
    lanes: [
      [
        { x: 200, y: 200 },
        { x: 900, y: 160 },
        { x: 1900, y: 220 },
        { x: 2500, y: 600 },
        { x: 2550, y: 1150 },
        { x: 2100, y: 1450 },
        { x: 1200, y: 1450 },
        { x: 650, y: 1200 },
        { x: 600, y: 650 },
        { x: 1000, y: 480 },
        { x: 1750, y: 520 },
        { x: 1850, y: 950 },
        { x: 1350, y: 1050 },
        { x: 1250, y: 800 },
        { x: 1440, y: 800 }
      ],
      [
        { x: 2680, y: 1400 },
        { x: 1980, y: 1440 },
        { x: 980, y: 1380 },
        { x: 380, y: 1000 },
        { x: 330, y: 450 },
        { x: 780, y: 150 },
        { x: 1680, y: 150 },
        { x: 2230, y: 400 },
        { x: 2280, y: 950 },
        { x: 1880, y: 1120 },
        { x: 1130, y: 1080 },
        { x: 1030, y: 650 },
        { x: 1530, y: 550 },
        { x: 1630, y: 800 },
        { x: 1440, y: 800 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 699, y: 240 },
      { id: 'p2', x: 829, y: 232 },
      { id: 'p3', x: 756, y: 100 },
      // 三角共鳴組 2
      { id: 'p4', x: 1580, y: 133 },
      { id: 'p5', x: 1710, y: 140 },
      { id: 'p6', x: 1637, y: 272 },
      // 三角共鳴組 3
      { id: 'p7', x: 2334, y: 576 },
      { id: 'p8', x: 2444, y: 645 },
      { id: 'p9', x: 2462, y: 496 },
      // 三角共鳴組 4
      { id: 'p10', x: 2440, y: 1305 },
      { id: 'p11', x: 2332, y: 1377 },
      { id: 'p12', x: 2311, y: 1228 },
      // 三角共鳴組 5
      { id: 'p13', x: 1582, y: 1382 },
      { id: 'p14', x: 1452, y: 1382 },
      { id: 'p15', x: 1517, y: 1518 },
      // 三角共鳴組 6
      { id: 'p16', x: 716, y: 1305 },
      { id: 'p17', x: 580, y: 1180 },
      { id: 'p18', x: 713, y: 1154 },
      // 三角共鳴組 7
      { id: 'p19', x: 835, y: 624 },
      { id: 'p20', x: 954, y: 573 },
      { id: 'p21', x: 841, y: 474 },
      // 三角共鳴組 8
      { id: 'p22', x: 1676, y: 448 },
      { id: 'p23', x: 1828, y: 556 },
      { id: 'p24', x: 1734, y: 587 },
      // 三角共鳴組 9
      { id: 'p25', x: 1481, y: 955 },
      { id: 'p26', x: 1353, y: 980 },
      { id: 'p27', x: 1444, y: 1101 },
      // 三角共鳴組 10
      { id: 'p28', x: 2181, y: 1360 },
      { id: 'p29', x: 2051, y: 1368 },
      { id: 'p30', x: 2124, y: 1500 },
      // 三角共鳴組 11
      { id: 'p31', x: 1300, y: 1467 },
      { id: 'p32', x: 1170, y: 1460 },
      { id: 'p33', x: 1243, y: 1328 },
      // 三角共鳴組 12
      { id: 'p34', x: 546, y: 1024 },
      { id: 'p35', x: 436, y: 955 },
      { id: 'p36', x: 418, y: 1104 },
      // 三角共鳴組 13
      { id: 'p37', x: 440, y: 295 },
      { id: 'p38', x: 548, y: 223 },
      { id: 'p39', x: 569, y: 372 },
      // 三角共鳴組 14
      { id: 'p40', x: 1298, y: 218 },
      { id: 'p41', x: 1428, y: 218 },
      { id: 'p42', x: 1363, y: 82 },
      // 三角共鳴組 15
      { id: 'p43', x: 2164, y: 295 },
      { id: 'p44', x: 2300, y: 420 },
      { id: 'p45', x: 2167, y: 446 },
      // 三角共鳴組 16
      { id: 'p46', x: 2045, y: 976 },
      { id: 'p47', x: 1926, y: 1027 },
      { id: 'p48', x: 2039, y: 1126 },
      // 三角共鳴組 17
      { id: 'p49', x: 1204, y: 1152 },
      { id: 'p50', x: 1052, y: 1044 },
      { id: 'p51', x: 1146, y: 1013 },
      // 三角共鳴組 18
      { id: 'p52', x: 1399, y: 645 },
      { id: 'p53', x: 1527, y: 620 },
      { id: 'p54', x: 1436, y: 499 }
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
    name: '5-2 拓撲三葉紐結（塞爾特神聖三葉環）',
    subtitle: '三維拓撲環面無限交織迴圈',
    tip: '🌌 18 組三葉神環沿線三角群（54處基座）！【中央奇異點核心 (1500, 840)】！【拓撲三葉紐結軌道】怪物穿梭於頂葉、左下葉與右下葉，三次穿越中心十字交錯！',
    nextLevelId: '5-3',
    initialGold: 2600,
    initialLives: 10,
    worldWidth: 3000,
    worldHeight: 1680,
    lanes: [
      [
        { x: 300, y: 180 },
        { x: 1050, y: 320 },
        { x: 1500, y: 200 },
        { x: 1950, y: 320 },
        { x: 1500, y: 840 },
        { x: 1850, y: 1100 },
        { x: 2350, y: 1400 },
        { x: 2050, y: 1550 },
        { x: 1650, y: 1300 },
        { x: 1500, y: 840 },
        { x: 1350, y: 1300 },
        { x: 950, y: 1550 },
        { x: 650, y: 1400 },
        { x: 1150, y: 1100 },
        { x: 1500, y: 840 }
      ],
      [
        { x: 200, y: 1550 },
        { x: 650, y: 1400 },
        { x: 950, y: 1550 },
        { x: 1350, y: 1300 },
        { x: 1500, y: 840 },
        { x: 1050, y: 320 },
        { x: 1500, y: 200 },
        { x: 1950, y: 320 },
        { x: 1500, y: 840 },
        { x: 1850, y: 1100 },
        { x: 2350, y: 1400 },
        { x: 2050, y: 1550 },
        { x: 1650, y: 1300 },
        { x: 1500, y: 840 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 712, y: 326 },
      { id: 'p2', x: 840, y: 350 },
      { id: 'p3', x: 801, y: 204 },
      // 三角共鳴組 2
      { id: 'p4', x: 1441, y: 145 },
      { id: 'p5', x: 1601, y: 157 },
      { id: 'p6', x: 1503, y: 271 },
      // 三角共鳴組 3
      { id: 'p7', x: 1739, y: 460 },
      { id: 'p8', x: 1653, y: 559 },
      { id: 'p9', x: 1799, y: 599 },
      // 三角共鳴組 4
      { id: 'p10', x: 1790, y: 971 },
      { id: 'p11', x: 1889, y: 1044 },
      { id: 'p12', x: 1761, y: 1118 },
      // 三角共鳴組 5
      { id: 'p13', x: 2279, y: 1359 },
      { id: 'p14', x: 2163, y: 1417 },
      { id: 'p15', x: 2282, y: 1510 },
      // 三角共鳴組 6
      { id: 'p16', x: 1621, y: 1362 },
      { id: 'p17', x: 1548, y: 1206 },
      { id: 'p18', x: 1697, y: 1225 },
      // 三角共鳴組 7
      { id: 'p19', x: 1354, y: 1067 },
      { id: 'p20', x: 1314, y: 1191 },
      { id: 'p21', x: 1464, y: 1171 },
      // 三角共鳴組 8
      { id: 'p22', x: 867, y: 1584 },
      { id: 'p23', x: 750, y: 1526 },
      { id: 'p24', x: 869, y: 1434 },
      // 三角共鳴組 9
      { id: 'p25', x: 1094, y: 1213 },
      { id: 'p26', x: 1210, y: 1140 },
      { id: 'p27', x: 1080, y: 1063 },
      // 三角共鳴組 10
      { id: 'p28', x: 598, y: 1489 },
      { id: 'p29', x: 667, y: 1485 },
      { id: 'p30', x: 617, y: 1339 },
      // 三角共鳴組 11
      { id: 'p31', x: 1145, y: 1348 },
      { id: 'p32', x: 1255, y: 1279 },
      { id: 'p33', x: 1272, y: 1429 },
      // 三角共鳴組 12
      { id: 'p34', x: 1550, y: 794 },
      { id: 'p35', x: 1465, y: 696 },
      { id: 'p36', x: 1405, y: 834 },
      // 三角共鳴組 13
      { id: 'p37', x: 1000, y: 366 },
      { id: 'p38', x: 1157, y: 221 },
      { id: 'p39', x: 1129, y: 369 },
      // 三角共鳴組 14
      { id: 'p40', x: 1693, y: 322 },
      { id: 'p41', x: 1818, y: 355 },
      { id: 'p42', x: 1790, y: 207 },
      // 三角共鳴組 15
      { id: 'p43', x: 1716, y: 694 },
      { id: 'p44', x: 1631, y: 793 },
      { id: 'p45', x: 1571, y: 655 },
      // 三角共鳴組 16
      { id: 'p46', x: 1807, y: 1153 },
      { id: 'p47', x: 1924, y: 1224 },
      { id: 'p48', x: 1938, y: 1074 },
      // 三角共鳴組 17
      { id: 'p49', x: 2292, y: 1505 },
      { id: 'p50', x: 2176, y: 1563 },
      { id: 'p51', x: 2173, y: 1412 },
      // 三角共鳴組 18
      { id: 'p52', x: 1706, y: 1255 },
      { id: 'p53', x: 1682, y: 1178 },
      { id: 'p54', x: 1572, y: 1282 }
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
    name: '5-3 希爾伯特分形折疊維度（碎形空間填充迷宮）',
    subtitle: '高維希爾伯特電路折疊與瞬時變化率',
    tip: '⚡ 19 組碎形電路沿線三角群（57處陣地）！【右側超時空維度之門 (3000, 840)】！三條碎形電路自左向右進行幾何深折，砲塔嚴密嵌在折角兩側！',
    nextLevelId: '5-4',
    initialGold: 2800,
    initialLives: 10,
    worldWidth: 3200,
    worldHeight: 1680,
    lanes: [
      [
        { x: 120, y: 380 },
        { x: 550, y: 380 },
        { x: 550, y: 160 },
        { x: 1100, y: 160 },
        { x: 1100, y: 560 },
        { x: 1650, y: 560 },
        { x: 1650, y: 160 },
        { x: 2200, y: 160 },
        { x: 2200, y: 560 },
        { x: 2650, y: 560 },
        { x: 3000, y: 840 }
      ],
      [
        { x: 120, y: 1300 },
        { x: 550, y: 1300 },
        { x: 550, y: 1520 },
        { x: 1100, y: 1520 },
        { x: 1100, y: 1120 },
        { x: 1650, y: 1120 },
        { x: 1650, y: 1520 },
        { x: 2200, y: 1520 },
        { x: 2200, y: 1120 },
        { x: 2650, y: 1120 },
        { x: 3000, y: 840 }
      ],
      [
        { x: 120, y: 840 },
        { x: 820, y: 840 },
        { x: 820, y: 680 },
        { x: 1380, y: 680 },
        { x: 1380, y: 1000 },
        { x: 1920, y: 1000 },
        { x: 1920, y: 840 },
        { x: 2500, y: 840 },
        { x: 3000, y: 840 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 473, y: 448 },
      { id: 'p2', x: 618, y: 327 },
      { id: 'p3', x: 538, y: 312 },
      // 三角共鳴組 2
      { id: 'p4', x: 850, y: 92 },
      { id: 'p5', x: 980, y: 92 },
      { id: 'p6', x: 915, y: 228 },
      // 三角共鳴組 3
      { id: 'p7', x: 1032, y: 507 },
      { id: 'p8', x: 1177, y: 628 },
      { id: 'p9', x: 1112, y: 492 },
      // 三角共鳴組 4
      { id: 'p10', x: 1644, y: 492 },
      { id: 'p11', x: 1582, y: 436 },
      { id: 'p12', x: 1718, y: 501 },
      // 三角共鳴組 5
      { id: 'p13', x: 1841, y: 228 },
      { id: 'p14', x: 1971, y: 228 },
      { id: 'p15', x: 1906, y: 92 },
      // 三角共鳴組 6
      { id: 'p16', x: 2268, y: 398 },
      { id: 'p17', x: 2268, y: 528 },
      { id: 'p18', x: 2132, y: 463 },
      // 三角共鳴組 7
      { id: 'p19', x: 2635, y: 628 },
      { id: 'p20', x: 2697, y: 685 },
      { id: 'p21', x: 2731, y: 538 },
      // 三角共鳴組 8
      { id: 'p22', x: 473, y: 1368 },
      { id: 'p23', x: 482, y: 1353 },
      { id: 'p24', x: 538, y: 1232 },
      // 三角共鳴組 9
      { id: 'p25', x: 850, y: 1452 },
      { id: 'p26', x: 980, y: 1452 },
      { id: 'p27', x: 915, y: 1588 },
      // 三角共鳴組 10
      { id: 'p28', x: 1168, y: 1173 },
      { id: 'p29', x: 1177, y: 1188 },
      { id: 'p30', x: 1112, y: 1052 },
      // 三角共鳴組 11
      { id: 'p31', x: 1644, y: 1052 },
      { id: 'p32', x: 1718, y: 1244 },
      { id: 'p33', x: 1582, y: 1179 },
      // 三角共鳴組 12
      { id: 'p34', x: 1841, y: 1588 },
      { id: 'p35', x: 1971, y: 1588 },
      { id: 'p36', x: 1906, y: 1452 },
      // 三角共鳴組 13
      { id: 'p37', x: 2132, y: 1282 },
      { id: 'p38', x: 2132, y: 1152 },
      { id: 'p39', x: 2268, y: 1217 },
      // 三角共鳴組 14
      { id: 'p40', x: 2635, y: 1188 },
      { id: 'p41', x: 2782, y: 1101 },
      { id: 'p42', x: 2646, y: 1036 },
      // 三角共鳴組 15
      { id: 'p43', x: 505, y: 908 },
      { id: 'p44', x: 635, y: 908 },
      { id: 'p45', x: 570, y: 772 },
      // 三角共鳴組 16
      { id: 'p46', x: 1005, y: 612 },
      { id: 'p47', x: 1135, y: 612 },
      { id: 'p48', x: 1070, y: 748 },
      // 三角共鳴組 17
      { id: 'p49', x: 1312, y: 965 },
      { id: 'p50', x: 1475, y: 1068 },
      { id: 'p51', x: 1410, y: 932 },
      // 三角共鳴組 18
      { id: 'p52', x: 1852, y: 915 },
      { id: 'p53', x: 1975, y: 772 },
      { id: 'p54', x: 1988, y: 850 },
      // 三角共鳴組 19
      { id: 'p55', x: 2505, y: 908 },
      { id: 'p56', x: 2635, y: 908 },
      { id: 'p57', x: 2570, y: 772 }
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
    name: '5-4 【全宇宙最終決戰】極限造物魔神【2520】（時空沙漏與星門對撞機）',
    subtitle: '宇宙終焉大沙漏·事件視界星環對撞決戰',
    tip: '👑 21 組沙漏要塞沿線三角群（63處陣地）！【右側造物主全知神座 (3200, 900)】！左側引力大漏斗匯流至中央狹縫對撞，再旋入事件視界星環！',
    nextLevelId: '1-1',
    initialGold: 3200,
    initialLives: 10,
    worldWidth: 3400,
    worldHeight: 1800,
    lanes: [
      [
        { x: 150, y: 220 },
        { x: 800, y: 350 },
        { x: 1200, y: 680 },
        { x: 1450, y: 900 },
        { x: 1750, y: 900 },
        { x: 2050, y: 550 },
        { x: 2500, y: 380 },
        { x: 2900, y: 600 },
        { x: 3200, y: 900 }
      ],
      [
        { x: 150, y: 1580 },
        { x: 800, y: 1450 },
        { x: 1200, y: 1120 },
        { x: 1450, y: 900 },
        { x: 1750, y: 900 },
        { x: 2050, y: 1250 },
        { x: 2500, y: 1420 },
        { x: 2900, y: 1200 },
        { x: 3200, y: 900 }
      ],
      [
        { x: 150, y: 900 },
        { x: 1000, y: 900 },
        { x: 1450, y: 900 },
        { x: 1750, y: 900 },
        { x: 2200, y: 900 },
        { x: 2700, y: 900 },
        { x: 3200, y: 900 }
      ]
    ],
    buildPads: [
      // 三角共鳴組 1
      { id: 'p1', x: 400, y: 339 },
      { id: 'p2', x: 528, y: 365 },
      { id: 'p3', x: 490, y: 219 },
      // 三角共鳴組 2
      { id: 'p4', x: 869, y: 318 },
      { id: 'p5', x: 969, y: 401 },
      { id: 'p6', x: 832, y: 465 },
      // 三角共鳴組 3
      { id: 'p7', x: 1112, y: 695 },
      { id: 'p8', x: 1209, y: 778 },
      { id: 'p9', x: 1250, y: 633 },
      // 三角共鳴組 4
      { id: 'p10', x: 1486, y: 832 },
      { id: 'p11', x: 1616, y: 832 },
      { id: 'p12', x: 1551, y: 968 },
      // 三角共鳴組 5
      { id: 'p13', x: 1908, y: 821 },
      { id: 'p14', x: 1992, y: 722 },
      { id: 'p15', x: 1847, y: 683 },
      // 三角共鳴組 6
      { id: 'p16', x: 2147, y: 441 },
      { id: 'p17', x: 2268, y: 395 },
      { id: 'p18', x: 2255, y: 545 },
      // 三角共鳴組 7
      { id: 'p19', x: 2533, y: 476 },
      { id: 'p20', x: 2647, y: 538 },
      { id: 'p21', x: 2655, y: 388 },
      // 三角共鳴組 8
      { id: 'p22', x: 2980, y: 584 },
      { id: 'p23', x: 3072, y: 676 },
      { id: 'p24', x: 2930, y: 726 },
      // 三角共鳴組 9
      { id: 'p25', x: 427, y: 1594 },
      { id: 'p26', x: 554, y: 1569 },
      { id: 'p27', x: 464, y: 1448 },
      // 三角共鳴組 10
      { id: 'p28', x: 782, y: 1377 },
      { id: 'p29', x: 882, y: 1294 },
      { id: 'p30', x: 919, y: 1440 },
      // 三角共鳴組 11
      { id: 'p31', x: 1198, y: 1210 },
      { id: 'p32', x: 1299, y: 1124 },
      { id: 'p33', x: 1160, y: 1065 },
      // 三角共鳴組 12
      { id: 'p34', x: 1486, y: 832 },
      { id: 'p35', x: 1616, y: 832 },
      { id: 'p36', x: 1551, y: 968 },
      // 三角共鳴組 13
      { id: 'p37', x: 1804, y: 1068 },
      { id: 'p38', x: 1889, y: 1167 },
      { id: 'p39', x: 1950, y: 1029 },
      // 三角共鳴組 14
      { id: 'p40', x: 2195, y: 1232 },
      { id: 'p41', x: 2316, y: 1278 },
      { id: 'p42', x: 2207, y: 1382 },
      // 三角共鳴組 15
      { id: 'p43', x: 2599, y: 1443 },
      { id: 'p44', x: 2712, y: 1381 },
      { id: 'p45', x: 2590, y: 1293 },
      // 三角共鳴組 16
      { id: 'p46', x: 2884, y: 1120 },
      { id: 'p47', x: 2976, y: 1028 },
      { id: 'p48', x: 3026, y: 1170 },
      // 三角共鳴組 17
      { id: 'p49', x: 488, y: 968 },
      { id: 'p50', x: 618, y: 968 },
      { id: 'p51', x: 553, y: 832 },
      // 三角共鳴組 18
      { id: 'p52', x: 1054, y: 832 },
      { id: 'p53', x: 1184, y: 832 },
      { id: 'p54', x: 1119, y: 968 },
      // 三角共鳴組 19
      { id: 'p55', x: 1620, y: 968 },
      { id: 'p56', x: 1750, y: 968 },
      { id: 'p57', x: 1685, y: 832 },
      // 三角共鳴組 20
      { id: 'p58', x: 2186, y: 832 },
      { id: 'p59', x: 2316, y: 832 },
      { id: 'p60', x: 2251, y: 968 },
      // 三角共鳴組 21
      { id: 'p61', x: 2752, y: 968 },
      { id: 'p62', x: 2882, y: 968 },
      { id: 'p63', x: 2817, y: 832 }
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
  }
};

