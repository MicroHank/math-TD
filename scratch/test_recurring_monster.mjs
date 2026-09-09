globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

import { Monster } from '../src/entities/Monster.js';
import { SpellManager } from '../src/engine/SpellManager.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- Testing Recurring Decimal Monsters ---');

// Mock Waypoints
const dummyWaypoints = [{ x: 0, y: 0 }, { x: 100, y: 0 }];

// 1. Monster Initialization
const m3 = new Monster({
  id: 'm_test_3',
  value: '0.3',
  waypoints: dummyWaypoints,
  isRecurring: true,
  recurringType: '0.3'
});
assert(m3.isRecurring === true, 'm3 is recognized as recurring');
assert(m3.recurringDenominator === 3, 'm3 denominator is 3');
assert(m3.recurringNumerator === 1, 'm3 numerator is 1');
assert(m3.recurringDisplay === '0.3̇', 'm3 display string is 0.3̇');
assert(m3.getFactors().includes(3), 'm3 factor includes 3');

// 2. Resistance to mismatched prime
const initialHp = m3.stageHp;
m3.takePrimeHit(2, 25);
assert(m3.floatingTexts.some(t => t.text.includes('循環除不盡')), '2-prime hit triggers resistance floating text on 0.3̇');
assert(m3.stageHp >= initialHp - 6, '2-prime hit dealt minimal damage due to resistance');
assert(m3.value === '0.3', '0.3̇ value remained unchanged after mismatched prime hit');

// 3. Matched prime hit (3-prime on 0.3̇)
const matchedResult = m3.takePrimeHit(3, 100);
assert(m3.isDead === true, '3-prime hit killed 0.3̇ when stageHp depleted');
assert(m3.value === 1, '0.3̇ reduced to 1 upon elimination (x3 = 1)');
assert(m3.floatingTexts.some(t => t.text.includes('× 3 = 1')), '3-prime hit displayed × 3 = 1 fraction resolution');

// 4. Test 0.6̇ transformation into integer 2
const m6 = new Monster({
  id: 'm_test_6',
  value: '0.6',
  waypoints: dummyWaypoints,
  isRecurring: true,
  recurringType: '0.6'
});
assert(m6.recurringNumerator === 2, 'm6 numerator is 2');
m6.takePrimeHit(3, 150); // Deplete stageHp
assert(m6.isDead === false, '0.6̇ does not instantly die on 3-hit, transforms into integer 2');
assert(m6.isRecurring === false, '0.6̇ is no longer recurring after fraction break');
assert(m6.value === 2, '0.6̇ transformed into value 2');
assert(m6.floatingTexts.some(t => t.text.includes('× 3 = 2')), '0.6̇ displayed × 3 = 2 transformation');

// Now hit integer 2 with 2-prime tower
m6.takePrimeHit(2, 100);
assert(m6.value === 1 && m6.isDead === true, 'Transformed integer 2 killed by 2-prime tower');

// 5. Test 0.142857 (1/7) with 7-prime tower
const m7 = new Monster({
  id: 'm_test_7',
  value: '0.142857',
  waypoints: dummyWaypoints,
  isRecurring: true,
  recurringType: '0.142857'
});
assert(m7.recurringDenominator === 7, 'm7 denominator is 7');
m7.takePrimeHit(5, 30);
assert(m7.floatingTexts.some(t => t.text.includes('循環除不盡')), '5-prime resists 0.142857');
m7.takePrimeHit(7, 150);
assert(m7.isDead === true && m7.value === 1, '7-prime hit eliminates 0.142857 (x7 = 1)');
assert(m7.floatingTexts.some(t => t.text.includes('× 7 = 1')), 'Displayed × 7 = 1 resolution');

// Mock Game
const mockGame = {
  activeSpells: [],
  monsters: [],
  addFloatingText: () => {},
  soundManager: { play: () => {} },
  createSparks: () => {},
  createExplosion: () => {},
  addGold: () => {}
};

// 6. Test 0.9̇ with Operator tower (Limit collapse 0.9̇ = 1)
const m9 = new Monster({
  id: 'm_test_9',
  value: '0.9',
  waypoints: dummyWaypoints,
  isRecurring: true,
  recurringType: '0.9'
});
m9.takeOperatorHit('adj', mockGame);
assert(m9.isDead === true && m9.value === 1, 'Operator hit triggered limit collapse 0.9̇ = 1');
assert(m9.floatingTexts.some(t => t.text.includes('極限坍縮')), 'Operator hit displayed limit collapse text');

// 7. Test SpellManager vortex real truncation
const spellMgr = new SpellManager(mockGame);
const mTrunk = new Monster({
  id: 'm_trunk',
  value: '0.6',
  waypoints: dummyWaypoints,
  isRecurring: true,
  recurringType: '0.6'
});
mTrunk.x = 100;
mTrunk.y = 100;
mockGame.monsters.push(mTrunk);

// Cast vortex at (100, 100)
spellMgr.mana = 100;
spellMgr.startAiming('vortex');
spellMgr.castAt(100, 100);
// Update spell
spellMgr.update(0.1);
assert(mTrunk.isRecurring === false, 'Vortex stripped recurring status');
assert(typeof mTrunk.value === 'number', 'Vortex converted value to integer');
assert(mTrunk.floatingTexts.some(t => t.text.includes('實數截斷')), 'Vortex displayed real truncation text');

console.log('🎉 All Recurring Decimal Monster tests passed!');
