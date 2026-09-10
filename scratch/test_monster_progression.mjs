// Test Monster Progression and Merge Gating
import { Monster } from '../src/entities/Monster.js';
import { LcmMergeManager } from '../src/engine/LcmMergeManager.js';
import { WaveManager } from '../src/levels/WaveManager.js';
import { endlessManager } from '../src/engine/EndlessManager.js';
import { LEVELS } from '../src/levels/LevelData.js';

console.log('--- Test 1: LcmMergeManager.isMergeAllowed() ---');
const dummyGame = {
  currentLevelId: '1-1',
  gameMode: 'adventure'
};
const lcmMgr = new LcmMergeManager(dummyGame);

// Chapter 1: Must be false
console.assert(lcmMgr.isMergeAllowed() === false, '1-1 must not allow merge');
dummyGame.currentLevelId = '1-4';
console.assert(lcmMgr.isMergeAllowed() === false, '1-4 must not allow merge');

// Tutorial: Must be false
dummyGame.gameMode = 'tutorial';
dummyGame.currentLevelId = 'tutorial_basic';
console.assert(lcmMgr.isMergeAllowed() === false, 'tutorial must not allow merge');

// Chapter 2: Must be true
dummyGame.gameMode = 'adventure';
dummyGame.currentLevelId = '2-1';
console.assert(lcmMgr.isMergeAllowed() === true, '2-1 must allow merge');
dummyGame.currentLevelId = '2-4';
console.assert(lcmMgr.isMergeAllowed() === true, '2-4 must allow merge');

// Chapter 3, 4, 5: Must be true
dummyGame.currentLevelId = '3-1';
console.assert(lcmMgr.isMergeAllowed() === true, '3-1 must allow merge');
dummyGame.currentLevelId = '4-1';
console.assert(lcmMgr.isMergeAllowed() === true, '4-1 must allow merge');
dummyGame.currentLevelId = '5-4';
console.assert(lcmMgr.isMergeAllowed() === true, '5-4 must allow merge');

// Endless: wave < 6 false, wave >= 6 true
dummyGame.gameMode = 'endless';
dummyGame.currentLevelId = 'endless';
dummyGame.waveManager = { currentWaveIndex: 0 }; // wave 1
console.assert(lcmMgr.isMergeAllowed() === false, 'endless wave 1 must not allow merge');
dummyGame.waveManager.currentWaveIndex = 4; // wave 5
console.assert(lcmMgr.isMergeAllowed() === false, 'endless wave 5 must not allow merge');
dummyGame.waveManager.currentWaveIndex = 5; // wave 6
console.assert(lcmMgr.isMergeAllowed() === true, 'endless wave 6 must allow merge');

// Boss Rush: stage 1 false, stage 2 true
dummyGame.gameMode = 'boss_rush';
dummyGame.currentLevelId = 'boss_rush_1';
dummyGame.bossRushStageIndex = 1;
console.assert(lcmMgr.isMergeAllowed() === false, 'boss rush stage 1 must not allow merge');
dummyGame.bossRushStageIndex = 2;
console.assert(lcmMgr.isMergeAllowed() === true, 'boss rush stage 2 must allow merge');

console.log('✓ Test 1 Passed: LcmMergeManager merge gating is verified!');

console.log('--- Test 2: Monster Traits Independence ---');
const dummyWaypoints = [{ x: 0, y: 0 }, { x: 100, y: 0 }];

// 6 in level 1-1 should NOT have perfect shield or collatz
const m6 = new Monster({ id: 'm1', value: 6, waypoints: dummyWaypoints });
console.assert(m6.hasPerfectShield === false, 'value 6 must not have perfect shield by default');
console.assert(m6.isMatryoshka === false, 'value 6 must not be matryoshka');

// 4 in level 1-1 should NOT be matryoshka
const m4 = new Monster({ id: 'm2', value: 4, waypoints: dummyWaypoints });
console.assert(m4.isMatryoshka === false, 'value 4 must not be matryoshka by default');

// 8 in level 1-1 should NOT be fibonacci sprint
const m8 = new Monster({ id: 'm3', value: 8, waypoints: dummyWaypoints });
console.assert(m8.isFibonacci === false, 'value 8 must not be fibonacci by default');

// 27 should NOT be collatz by default
const m27 = new Monster({ id: 'm4', value: 27, waypoints: dummyWaypoints });
console.assert(m27.isCollatz === false, 'value 27 must not be collatz by default');

// Explicit flags should work
const m6_shielded = new Monster({ id: 'm5', value: 6, isPerfect: true, waypoints: dummyWaypoints });
console.assert(m6_shielded.hasPerfectShield === true, 'explicit isPerfect must enable shield');

const m8_fib = new Monster({ id: 'm6', value: 8, isFibonacci: true, waypoints: dummyWaypoints });
console.assert(m8_fib.isFibonacci === true, 'explicit isFibonacci must enable fibonacci');

const m16_mat = new Monster({ id: 'm7', value: 16, isMatryoshka: true, waypoints: dummyWaypoints });
console.assert(m16_mat.isMatryoshka === true, 'explicit isMatryoshka must enable matryoshka');
console.assert(m16_mat.matryoshkaBase === 2 && m16_mat.matryoshkaPower === 4, '16 matryoshka info correct');

console.log('✓ Test 2 Passed: Monster traits are explicit and not auto-triggered!');

console.log('--- Test 3: WaveManager Twin Prime Gating ---');
const wm1 = new WaveManager(LEVELS['1-1']);
console.assert(wm1.isTwinPrimeAllowed() === false, 'Level 1-1 twin primes must be false');
const wm2 = new WaveManager(LEVELS['2-1']);
console.assert(wm2.isTwinPrimeAllowed() === false, 'Level 2-1 twin primes must be false');
const wm3 = new WaveManager(LEVELS['3-1']);
console.assert(wm3.isTwinPrimeAllowed() === false, 'Level 3-1 twin primes must be false');
const wm4 = new WaveManager(LEVELS['4-3']);
console.assert(wm4.isTwinPrimeAllowed() === true, 'Level 4-3 twin primes must be true');

const wmEndless = new WaveManager({ id: 'endless', lanes: [dummyWaypoints] });
wmEndless.currentWaveIndex = 4; // wave 5
console.assert(wmEndless.isTwinPrimeAllowed() === false, 'Endless wave 5 twin primes must be false');
wmEndless.currentWaveIndex = 14; // wave 15
console.assert(wmEndless.isTwinPrimeAllowed() === true, 'Endless wave 15 twin primes must be true');

console.log('✓ Test 3 Passed: WaveManager twin prime gating is verified!');

console.log('--- Test 4: EndlessManager Progressive Wave Generation ---');
// Test waves 1 to 5: no affixes, no negatives, no specials
for (let w = 1; w <= 5; w++) {
  const wave = endlessManager.generateEndlessWave(w);
  for (const enemy of wave.enemies) {
    if (enemy.isBoss) continue;
    console.assert(!enemy.affixes || enemy.affixes.length === 0, `Wave ${w} must have no affixes`);
    console.assert(typeof enemy.val === 'number' && enemy.val > 0, `Wave ${w} must not have negative enemies`);
    console.assert(!enemy.isCollatz, `Wave ${w} must not have Collatz`);
    console.assert(!enemy.isMatryoshka, `Wave ${w} must not have Matryoshka`);
    console.assert(!enemy.isRiemann, `Wave ${w} must not have Riemann`);
    console.assert(!enemy.isGaussianCycler, `Wave ${w} must not have GaussianCycler`);
    console.assert(!enemy.isMobius, `Wave ${w} must not have Mobius`);
    console.assert(!enemy.isCantor, `Wave ${w} must not have Cantor`);
    console.assert(!enemy.isPalindromic, `Wave ${w} must not have Palindromic`);
    console.assert(!enemy.isMersenne, `Wave ${w} must not have Mersenne`);
  }
}
console.log('✓ Wave 1-5 (World 1 tier) verified: 100% clean basic enemies, no affixes or mutations!');

// Test waves 6-9: negatives and recurring allowed, affixes max delta_speed
for (let w = 6; w <= 9; w++) {
  const wave = endlessManager.generateEndlessWave(w);
  for (const enemy of wave.enemies) {
    if (enemy.affixes) {
      for (const aff of enemy.affixes) {
        console.assert(aff === 'delta_speed', `Wave ${w} affix must be delta_speed, got ${aff}`);
      }
    }
    console.assert(!enemy.isCollatz, `Wave ${w} must not have Collatz`);
    console.assert(!enemy.isMatryoshka, `Wave ${w} must not have Matryoshka`);
    console.assert(!enemy.isRiemann, `Wave ${w} must not have Riemann`);
    console.assert(!enemy.isGaussianCycler, `Wave ${w} must not have GaussianCycler`);
    console.assert(!enemy.isMobius, `Wave ${w} must not have Mobius`);
  }
}
console.log('✓ Wave 6-9 (World 2 tier) verified: Only negatives, recurring, and delta_speed affixes!');

console.log('All automated checks passed successfully!');
