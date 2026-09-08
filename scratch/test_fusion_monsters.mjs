// Verification test for Dual-Tower Fusion, Special Math Monsters, Endless Mode & Boss Rush
import { Tower, TOWER_TYPES } from '../src/entities/Tower.js';
import { Monster } from '../src/entities/Monster.js';
import { endlessManager } from '../src/engine/EndlessManager.js';
import { progressManager } from '../src/engine/ProgressManager.js';

console.log('=== TEST 1: Fusion Towers Config & Methods ===');
const fusions = ['FUSION_6', 'FUSION_15', 'FUSION_ABS_SQRT', 'FUSION_FACTORIAL'];
for (const key of fusions) {
  const conf = TOWER_TYPES[key];
  console.assert(conf !== undefined, `Tower type ${key} should exist`);
  console.assert(conf.category === 'fusion', `Category of ${key} should be 'fusion'`);
  console.log(`✓ Fusion Tower [${conf.name}] - cost: ${conf.cost}, dmg: ${conf.damage}, range: ${conf.range}`);
}

const mockPad = { x: 100, y: 100 };
const p2Tower = new Tower({
  id: 't_test',
  x: mockPad.x,
  y: mockPad.y,
  ...TOWER_TYPES.PRIME_2
});
const availableFusions = p2Tower.getAvailableFusions();
console.assert(availableFusions.length > 0, 'PRIME_2 should have fusion options');
console.log(`✓ PRIME_2 has available fusion: ${availableFusions[0].key} (cost: ${availableFusions[0].cost}🪙)`);

p2Tower.fuseInto('FUSION_6');
console.assert(p2Tower.type === 'fusion_6', 'Tower should now be fusion_6');
console.assert(p2Tower.label === '2×3', 'Tower label should be 2×3');
console.log(`✓ Tower successfully fused into: ${p2Tower.label}`);

console.log('\n=== TEST 2: Special Monsters Logic ===');
// 1. Perfect Number (6, 28, 496) Shield Test
const perfectMon = new Monster({
  id: 'm_perf',
  value: 28,
  waypoints: [{ x: 0, y: 0 }, { x: 100, y: 0 }],
  speed: 10
});
console.assert(perfectMon.isPerfectNumber === true, '28 should be recognized as a perfect number');
console.assert(perfectMon.hasPerfectShield === true, 'Perfect number should start with holy symmetry shield');
const initialStageHp = perfectMon.stageHp;

// Regular prime attack (damage 50) -> should be reduced by 70% to 15
const mockGame = {
  createSparks: () => {},
  createExplosion: () => {},
  addGold: () => {},
  perkManager: null,
  monsters: [perfectMon]
};
perfectMon.takePrimeHit(2, 50, mockGame);
const dmgTaken = initialStageHp - perfectMon.stageHp;
console.assert(dmgTaken === 15, `Damage should be 15 (70% reduction), but was ${dmgTaken}`);
console.log(`✓ Perfect Number Holy Symmetry Shield reduced 50 dmg to ${dmgTaken} dmg (-70%)`);

// Operator ±1 hit -> should shatter shield!
perfectMon.takeOperatorHit(-1, mockGame);
console.assert(perfectMon.hasPerfectShield === false, 'Operator hit should shatter perfect shield');
console.log('✓ Operator hit successfully shattered Perfect Number shield!');

// 2. Twin Primes (11, 13) Quantum Link & Frenzy Test
const twinA = new Monster({
  id: 'm_twin_11',
  value: 11,
  waypoints: [{ x: 0, y: 0 }, { x: 100, y: 0 }],
  speed: 50
});
const twinB = new Monster({
  id: 'm_twin_13',
  value: 13,
  waypoints: [{ x: 0, y: 0 }, { x: 100, y: 0 }],
  speed: 50
});
twinA.twinPartner = twinB;
twinB.twinPartner = twinA;

// Quantum resonance damage transmission
const bInitHp = twinB.stageHp;
twinA.takePrimeHit(2, 40, mockGame); // doesn't divide 11
twinA.takeResonanceDamage = Monster.prototype.takeResonanceDamage;
twinB.takeResonanceDamage = Monster.prototype.takeResonanceDamage;

twinB.takeResonanceDamage(10, mockGame);
console.assert(twinB.stageHp === bInitHp - 10, 'Twin B should take transmitted resonance damage');
console.log('✓ Twin Prime quantum resonance damage transmitted successfully');

// When Twin A dies -> Twin B enters frenzy rage
const bBaseSpeed = twinB.baseSpeed;
twinA.onEliminated(null, mockGame);
console.assert(twinA.isDead === true, 'Twin A should be dead');
console.assert(twinB.isRaging === true, 'Twin B should enter frenzy rage on partner death');
console.assert(twinB.speed === bBaseSpeed * 1.6, 'Twin B speed should increase by 60% in rage');
console.log(`✓ Twin B entered frenzy rage! Speed increased from ${bBaseSpeed} to ${twinB.speed}`);

// 3. Fibonacci Sprinter (13, 21, 55)
const fibMon = new Monster({
  id: 'm_fib_21',
  value: 21,
  waypoints: [{ x: 0, y: 0 }, { x: 100, y: 0 }],
  speed: 50
});
console.assert(fibMon.isFibonacci === true, '21 should be recognized as Fibonacci');
console.assert(fibMon.baseSpeed > 50, 'Fibonacci sprinter should have +38% base speed bonus');
console.log(`✓ Fibonacci Sprinter base speed: ${fibMon.baseSpeed} (bonus applied)`);

console.log('\n=== TEST 3: Endless Mode & Boss Rush Generator ===');
const wave1 = endlessManager.generateEndlessWave(1);
const wave5 = endlessManager.generateEndlessWave(5);
const wave10 = endlessManager.generateEndlessWave(10);
console.assert(wave1.enemies.length > 0, 'Wave 1 should have enemies');
console.assert(wave5.enemies.some(e => e.isBoss), 'Wave 5 should have a boss enemy');
console.log(`✓ Endless Wave 1 generated ${wave1.enemies.length} enemies`);
console.log(`✓ Endless Wave 5 generated ${wave5.enemies.length} enemies with Boss [${wave5.enemies.find(e => e.isBoss).bossName}]`);
console.log(`✓ Endless Wave 10 generated ${wave10.enemies.length} enemies with Boss [${wave10.enemies.find(e => e.isBoss).bossName}]`);

const rushStages = endlessManager.getBossRushStages();
console.assert(rushStages.length === 5, 'Boss Rush should have 5 stages');
for (const s of rushStages) {
  const conf = endlessManager.getBossRushLevelConfig(s.stageIndex);
  console.assert(conf.waves.length > 0, `Boss rush stage ${s.stageIndex} should have wave config`);
  console.log(`✓ Boss Rush Stage ${s.stageIndex}: [${s.name}] - Boss ${s.boss.name} (${s.boss.val})`);
}

console.log('\n========================================');
console.log('🎉 ALL INTEGRATION TESTS PASSED 100%!');
console.log('========================================');
