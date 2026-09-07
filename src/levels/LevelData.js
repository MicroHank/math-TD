// Level & Chapter Database for Math Tower Defense

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
  }
];

export const LEVELS = {
  '1-1': {
    id: '1-1',
    chapterId: 'world-1',
    name: '1-1 偶數小徑',
    subtitle: '偶數除法入門',
    tip: '💡 敵方皆為 2 的倍數（2, 4, 6, 8）。建造「2號雙子砲」快速進行除法！',
    nextLevelId: '1-2',
    initialGold: 160,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 280 },
        { x: 260, y: 280 },
        { x: 260, y: 150 },
        { x: 680, y: 150 },
        { x: 680, y: 400 },
        { x: 930, y: 400 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 140, y: 210 },
      { id: 'p2', x: 140, y: 350 },
      { id: 'p3', x: 340, y: 220 },
      { id: 'p4', x: 480, y: 220 },
      { id: 'p5', x: 600, y: 220 },
      { id: 'p6', x: 600, y: 90 },
      { id: 'p7', x: 760, y: 260 },
      { id: 'p8', x: 760, y: 470 }
    ],
    waves: [
      {
        title: '第一波：基礎偶數',
        tip: '建造 2 號砲塔對付 2 與 4。',
        enemies: [
          { val: 2, delay: 1.0 },
          { val: 4, delay: 2.0 },
          { val: 4, delay: 2.0 },
          { val: 6, delay: 2.2 }
        ]
      },
      {
        title: '第二波：偶數遞增',
        tip: '6 與 8 需要連續除以 2！',
        enemies: [
          { val: 6, delay: 1.0 },
          { val: 8, delay: 2.0 },
          { val: 8, delay: 2.0 },
          { val: 12, delay: 2.5 }
        ]
      },
      {
        title: '第三波：偶數壓制',
        tip: '升級砲塔提高攻速與射程！',
        enemies: [
          { val: 8, delay: 1.0 },
          { val: 12, delay: 2.0 },
          { val: 16, delay: 2.2 },
          { val: 24, delay: 2.5 }
        ]
      }
    ]
  },

  '1-2': {
    id: '1-2',
    chapterId: 'world-1',
    name: '1-2 三元迴廊',
    subtitle: '3 的倍數與雙重因數',
    tip: '💡 出現 3 的倍數（3, 9, 15）與雙重因數怪（6, 12, 18）。請搭配 2 號與 3 號砲塔！',
    nextLevelId: '1-3',
    initialGold: 175,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 160 },
        { x: 300, y: 160 },
        { x: 300, y: 420 },
        { x: 620, y: 420 },
        { x: 620, y: 180 },
        { x: 930, y: 180 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 160, y: 90 },
      { id: 'p2', x: 160, y: 230 },
      { id: 'p3', x: 230, y: 320 },
      { id: 'p4', x: 370, y: 320 },
      { id: 'p5', x: 460, y: 480 },
      { id: 'p6', x: 550, y: 320 },
      { id: 'p7', x: 690, y: 300 },
      { id: 'p8', x: 780, y: 110 }
    ],
    waves: [
      {
        title: '第一波：純三之陣',
        tip: '敵方為 3 與 9，請建造 3 號三元激光塔！',
        enemies: [
          { val: 3, delay: 1.0 },
          { val: 3, delay: 2.0 },
          { val: 9, delay: 2.2 },
          { val: 9, delay: 2.2 }
        ]
      },
      {
        title: '第二波：六與十二',
        tip: '6 = 2 × 3，12 = 2² × 3，需要 2 號與 3 號交替打擊！',
        enemies: [
          { val: 6, delay: 1.0 },
          { val: 9, delay: 2.0 },
          { val: 12, delay: 2.2 },
          { val: 18, delay: 2.5 }
        ]
      },
      {
        title: '第三波：雙數混合衝擊',
        tip: '注意觀察怪物身上的質因數提示彩點！',
        enemies: [
          { val: 12, delay: 1.0 },
          { val: 18, delay: 2.0 },
          { val: 24, delay: 2.2 },
          { val: 27, delay: 2.5 }
        ]
      }
    ]
  },

  '1-3': {
    id: '1-3',
    chapterId: 'world-1',
    name: '1-3 五芒星谷',
    subtitle: '五的倍數與三重複合怪',
    tip: '💡 尾數是 0 或 5 的合數登場！建造「5號五芒衝擊塔」，搭配 2 號與 3 號迎戰！',
    nextLevelId: '1-4',
    initialGold: 190,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 140 },
        { x: 260, y: 140 },
        { x: 260, y: 440 },
        { x: 480, y: 440 },
        { x: 480, y: 140 },
        { x: 720, y: 140 },
        { x: 720, y: 400 },
        { x: 930, y: 400 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 140, y: 80 },
      { id: 'p2', x: 140, y: 210 },
      { id: 'p3', x: 340, y: 260 },
      { id: 'p4', x: 400, y: 360 },
      { id: 'p5', x: 550, y: 260 },
      { id: 'p6', x: 600, y: 80 },
      { id: 'p7', x: 650, y: 260 },
      { id: 'p8', x: 790, y: 220 },
      { id: 'p9', x: 790, y: 340 }
    ],
    waves: [
      {
        title: '第一波：五芒啟動',
        tip: '5 與 15 來襲，建造 5 號砲迎擊！',
        enemies: [
          { val: 5, delay: 1.0 },
          { val: 10, delay: 2.0 },
          { val: 15, delay: 2.2 },
          { val: 25, delay: 2.5 }
        ]
      },
      {
        title: '第二波：三十大關',
        tip: '30 = 2 × 3 × 5，三種砲塔皆能造成傷害！',
        enemies: [
          { val: 20, delay: 1.0 },
          { val: 30, delay: 2.2 },
          { val: 30, delay: 2.2 },
          { val: 45, delay: 2.5 }
        ]
      },
      {
        title: '第三波：六十巨流',
        tip: '60 = 2² × 3 × 5，火力必須保持密集！',
        enemies: [
          { val: 40, delay: 1.0 },
          { val: 50, delay: 2.0 },
          { val: 60, delay: 2.5 },
          { val: 75, delay: 2.8 }
        ]
      }
    ]
  },

  '1-4': {
    id: '1-4',
    chapterId: 'world-1',
    name: '1-4 【大魔王】合數泰坦【360】',
    subtitle: '第一章魔王戰：高階合數泰坦',
    tip: '👑 魔王警告！泰坦具備 360 超高數值，每隔一段時間會施放「×2 乘倍光環」並釋放分裂侍從！',
    nextLevelId: '2-1',
    initialGold: 240,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 280 },
        { x: 220, y: 280 },
        { x: 220, y: 120 },
        { x: 500, y: 120 },
        { x: 500, y: 440 },
        { x: 740, y: 440 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 200 },
      { id: 'p2', x: 120, y: 360 },
      { id: 'p3', x: 310, y: 200 },
      { id: 'p4', x: 410, y: 200 },
      { id: 'p5', x: 410, y: 360 },
      { id: 'p6', x: 620, y: 360 },
      { id: 'p7', x: 620, y: 200 },
      { id: 'p8', x: 820, y: 200 },
      { id: 'p9', x: 820, y: 360 }
    ],
    waves: [
      {
        title: '第一波：泰坦前鋒',
        tip: '先建立基礎 2、3、5 防線並累積金幣。',
        enemies: [
          { val: 12, delay: 1.0 },
          { val: 18, delay: 2.0 },
          { val: 24, delay: 2.0 },
          { val: 30, delay: 2.2 }
        ]
      },
      {
        title: '第二波：雙重護衛陣',
        tip: '複合數字加速進犯！',
        enemies: [
          { val: 36, delay: 1.0 },
          { val: 45, delay: 2.0 },
          { val: 60, delay: 2.2 },
          { val: 90, delay: 2.5 }
        ]
      },
      {
        title: '魔王波：合數泰坦【360】降臨！',
        tip: '集火泰坦！注意打斷其乘倍光環與分裂侍從！',
        enemies: [
          { val: 30, delay: 1.0 },
          { val: 40, delay: 2.0 },
          {
            val: 360,
            delay: 3.0,
            isBoss: true,
            bossName: '合數泰坦【360】',
            speed: 20,
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
    name: '2-1 負向沼澤',
    subtitle: '負數幽靈與前線淨化',
    tip: '💡 紫色負數怪自帶護盾！必須建造「|x| 絕對值稜鏡」將其淨化為正數後方能被質數砲消滅！',
    nextLevelId: '2-2',
    initialGold: 200,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 200 },
        { x: 300, y: 200 },
        { x: 300, y: 400 },
        { x: 650, y: 400 },
        { x: 650, y: 220 },
        { x: 930, y: 220 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 120, y: 130 }, // 前線稜鏡位
      { id: 'p2', x: 210, y: 130 },
      { id: 'p3', x: 210, y: 270 },
      { id: 'p4', x: 380, y: 320 },
      { id: 'p5', x: 500, y: 320 },
      { id: 'p6', x: 580, y: 470 },
      { id: 'p7', x: 740, y: 300 },
      { id: 'p8', x: 820, y: 150 }
    ],
    waves: [
      {
        title: '第一波：幽靈初現',
        tip: '在起點附近建造絕對值稜鏡塔。',
        enemies: [
          { val: -4, delay: 1.0 },
          { val: 6, delay: 2.0 },
          { val: -6, delay: 2.2 },
          { val: 8, delay: 2.2 }
        ]
      },
      {
        title: '第二波：正負交錯',
        tip: '負數與正數混合進軍，考驗前線稜鏡與後方重砲搭配！',
        enemies: [
          { val: -10, delay: 1.0 },
          { val: 12, delay: 2.0 },
          { val: -15, delay: 2.2 },
          { val: 18, delay: 2.2 },
          { val: -20, delay: 2.5 }
        ]
      },
      {
        title: '第三波：負數狂潮',
        tip: '升級絕對值稜鏡提升淨化射程！',
        enemies: [
          { val: -24, delay: 1.0 },
          { val: -30, delay: 2.0 },
          { val: 36, delay: 2.2 },
          { val: -40, delay: 2.5 },
          { val: -50, delay: 2.8 }
        ]
      }
    ]
  },

  '2-2': {
    id: '2-2',
    chapterId: 'world-2',
    name: '2-2 雙路夾擊（★ 雙起點分流）',
    subtitle: '上下雙線防禦，交匯中路',
    tip: '⚠️ 雙起點分流！怪物同時從上路與下路進軍，在右方交匯！請均衡配置雙路防線！',
    nextLevelId: '2-3',
    initialGold: 260,
    initialLives: 10,
    lanes: [
      // 上路 (Lane 0)
      [
        { x: 30, y: 140 },
        { x: 340, y: 140 },
        { x: 520, y: 280 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ],
      // 下路 (Lane 1)
      [
        { x: 30, y: 440 },
        { x: 340, y: 440 },
        { x: 520, y: 280 },
        { x: 740, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      // 上路防區
      { id: 'p1', x: 140, y: 70 },
      { id: 'p2', x: 240, y: 70 },
      { id: 'p3', x: 360, y: 210 },
      // 下路防區
      { id: 'p4', x: 140, y: 510 },
      { id: 'p5', x: 240, y: 510 },
      { id: 'p6', x: 360, y: 360 },
      // 中路交匯重砲區
      { id: 'p7', x: 580, y: 210 },
      { id: 'p8', x: 580, y: 350 },
      { id: 'p9', x: 700, y: 210 },
      { id: 'p10', x: 700, y: 350 }
    ],
    waves: [
      {
        title: '第一波：雙線試探',
        tip: '上路走正數怪，下路走負數怪！',
        enemies: [
          { val: 6, lane: 0, delay: 1.0 },
          { val: -6, lane: 1, delay: 1.2 },
          { val: 8, lane: 0, delay: 2.0 },
          { val: -10, lane: 1, delay: 2.0 }
        ]
      },
      {
        title: '第二波：雙線齊發',
        tip: '在中路交匯區放置高攻速砲塔收尾！',
        enemies: [
          { val: 12, lane: 0, delay: 1.0 },
          { val: -15, lane: 1, delay: 1.0 },
          { val: 18, lane: 0, delay: 2.0 },
          { val: -20, lane: 1, delay: 2.0 },
          { val: 24, lane: 0, delay: 2.5 },
          { val: -30, lane: 1, delay: 2.5 }
        ]
      },
      {
        title: '第三波：雙線總攻',
        tip: '上下兩路高數值怪物密集進攻！',
        enemies: [
          { val: 30, lane: 0, delay: 1.0 },
          { val: -40, lane: 1, delay: 1.0 },
          { val: 36, lane: 0, delay: 2.0 },
          { val: -45, lane: 1, delay: 2.0 },
          { val: 60, lane: 0, delay: 2.5 },
          { val: -60, lane: 1, delay: 2.5 }
        ]
      }
    ]
  },

  '2-3': {
    id: '2-3',
    chapterId: 'world-2',
    name: '2-3 質數衝擊',
    subtitle: '解鎖運算子調整塔 (+1 / -1)',
    tip: '⚡ 出現無法被 2、3、5 整除的質數怪（7, 11, 13）！建造全新「[+/-] 運算子調整塔」，將其加減微調為可分解合數！',
    nextLevelId: '2-4',
    initialGold: 220,
    initialLives: 10,
    lanes: [
      [
        { x: 30, y: 160 },
        { x: 280, y: 160 },
        { x: 280, y: 420 },
        { x: 560, y: 420 },
        { x: 560, y: 160 },
        { x: 930, y: 160 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 140, y: 90 }, // 運算子前置位
      { id: 'p2', x: 140, y: 230 },
      { id: 'p3', x: 350, y: 300 },
      { id: 'p4', x: 440, y: 480 },
      { id: 'p5', x: 490, y: 300 },
      { id: 'p6', x: 640, y: 240 },
      { id: 'p7', x: 740, y: 90 },
      { id: 'p8', x: 840, y: 240 }
    ],
    waves: [
      {
        title: '第一波：幸運之七',
        tip: '怪物 7 無法被 2/3/5 整除！運算子塔會將 7 - 1 = 6，隨後 2/3 號砲即可消除！',
        enemies: [
          { val: 7, delay: 1.0 },
          { val: 6, delay: 2.0 },
          { val: 7, delay: 2.2 },
          { val: 10, delay: 2.5 }
        ]
      },
      {
        title: '第二波：十一與十三',
        tip: '11 + 1 = 12 或 11 - 1 = 10；13 - 1 = 12！運算子能隨機應變！',
        enemies: [
          { val: 11, delay: 1.0 },
          { val: 12, delay: 2.0 },
          { val: 13, delay: 2.2 },
          { val: 14, delay: 2.2 },
          { val: -11, delay: 2.8 }
        ]
      },
      {
        title: '第三波：質數混合突擊',
        tip: '前線配置運算子塔 + 絕對值稜鏡，後方佈置質數砲群！',
        enemies: [
          { val: 7, delay: 1.0 },
          { val: -13, delay: 2.0 },
          { val: 17, delay: 2.2 },
          { val: 19, delay: 2.2 },
          { val: 23, delay: 2.5 },
          { val: 30, delay: 2.8 }
        ]
      }
    ]
  },

  '2-4': {
    id: '2-4',
    chapterId: 'world-2',
    name: '2-4 【大魔王】極性虛空領主【-720】',
    subtitle: '雙路深淵終極魔王戰',
    tip: '👑 終極深淵試煉！魔王帶有 -720 負數護盾，且會施放「極性反轉波」將全場怪物轉化為負數！善用多層稜鏡與運算子陣列！',
    nextLevelId: null,
    initialGold: 300,
    initialLives: 10,
    lanes: [
      // 上路 (Lane 0)
      [
        { x: 30, y: 160 },
        { x: 260, y: 160 },
        { x: 420, y: 280 },
        { x: 700, y: 280 },
        { x: 930, y: 280 }
      ],
      // 下路 (Lane 1)
      [
        { x: 30, y: 420 },
        { x: 260, y: 420 },
        { x: 420, y: 280 },
        { x: 700, y: 280 },
        { x: 930, y: 280 }
      ]
    ],
    buildPads: [
      { id: 'p1', x: 140, y: 90 },
      { id: 'p2', x: 140, y: 490 },
      { id: 'p3', x: 260, y: 280 }, // 中央隘口
      { id: 'p4', x: 360, y: 170 },
      { id: 'p5', x: 360, y: 390 },
      { id: 'p6', x: 540, y: 200 },
      { id: 'p7', x: 540, y: 360 },
      { id: 'p8', x: 680, y: 190 },
      { id: 'p9', x: 680, y: 370 },
      { id: 'p10', x: 800, y: 280 }
    ],
    waves: [
      {
        title: '第一波：虛空侍從集結',
        tip: '雙線進犯，迅速佈署稜鏡、運算子與質數砲！',
        enemies: [
          { val: 14, lane: 0, delay: 1.0 },
          { val: -15, lane: 1, delay: 1.0 },
          { val: 18, lane: 0, delay: 2.0 },
          { val: -20, lane: 1, delay: 2.0 }
        ]
      },
      {
        title: '第二波：深淵精銳',
        tip: '負數與質數混戰！',
        enemies: [
          { val: -24, lane: 0, delay: 1.0 },
          { val: 26, lane: 1, delay: 1.0 },
          { val: -30, lane: 0, delay: 2.0 },
          { val: 35, lane: 1, delay: 2.0 },
          { val: -40, lane: 0, delay: 2.5 }
        ]
      },
      {
        title: '終焉魔王波：極性虛空領主【-720】',
        tip: '魔王入境！先用絕對值稜鏡瓦解 -720 護盾，全力集火質數除法！',
        enemies: [
          { val: -30, lane: 0, delay: 1.0 },
          { val: 30, lane: 1, delay: 1.0 },
          {
            val: -720,
            lane: 0,
            delay: 3.0,
            isBoss: true,
            bossName: '極性虛空領主【-720】',
            speed: 18,
            bossSkills: ['polarity_flip', 'multiply_aura', 'split_adds']
          }
        ]
      }
    ]
  }
};
