// Automated test for 4 New Math Monsters and 4 New Towers/Fusions
import { Monster } from '../src/entities/Monster.js';
import { Tower, TOWER_TYPES } from '../src/entities/Tower.js';
import { Game } from '../src/engine/Game.js';
import { EndlessManager } from '../src/engine/EndlessManager.js';
import { LEVELS } from '../src/levels/LevelData.js';
import assert from 'assert';

console.log('--- 1. Testing Monster Archetypes ---');

const waypoints = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 200, y: 0 }
];

// Test 1.1: Mobius Strip Shifter
const mobiusMonster = new Monster({
  id: 'm_mobius',
  value: 18, // 18 has square factor 9 (3^2)
  waypoints: waypoints,
  speed: 20,
  isMobius: true
});
assert.strictEqual(mobiusMonster.isMobius, true);
assert.strictEqual(mobiusMonster.hasSquareFactor(18), true);
assert.strictEqual(mobiusMonster.hasSquareFactor(7), false);

// Prime hit with 2 should trigger Mobius backward reverse timer
mobiusMonster.takePrimeHit(2, 10, null);
assert.strictEqual(mobiusMonster.mobiusReverseTimer > 0, true, 'Mobius square factor should trigger reverse timer');
console.log('✓ Mobius Strip Shifter square factor reverse trigger passed.');

// Test 1.2: Prime Power Matryoshka
const matryoshka = new Monster({
  id: 'm_matryoshka',
  value: 32, // 2^5
  waypoints: waypoints,
  speed: 20,
  isMatryoshka: true
});
assert.strictEqual(matryoshka.isMatryoshka, true);
const initialRadius = matryoshka.radius;
const initialSpeed = matryoshka.speed;
matryoshka.stageHp = 10; // set low stageHp to force division
matryoshka.takePrimeHit(2, 25, null);
assert.strictEqual(matryoshka.value, 16);
assert.strictEqual(matryoshka.radius < initialRadius, true, 'Matryoshka should shrink');
assert.strictEqual(matryoshka.speed > initialSpeed, true, 'Matryoshka should speed up +20%');
console.log('✓ Matryoshka shell layer stripping & speed buff passed.');

// Test 1.3: Gaussian Cycler
const gaussian = new Monster({
  id: 'm_gaussian',
  value: 24,
  waypoints: waypoints,
  speed: 20,
  isGaussianCycler: true
});
assert.strictEqual(gaussian.isGaussianCycler, true);
assert.strictEqual(gaussian.gaussianPhase, 0); // +i

// Update 3.6s to transition to phase 1 (-1 phase)
gaussian.update(3.6, null);
assert.strictEqual(gaussian.gaussianPhase, 1);
assert.strictEqual(gaussian.isNegative, true, 'Phase 1 (-1) should have negative shield');

// In phase 1, takePrimeHit should be blocked by negative shield
const hitBlocked = gaussian.takePrimeHit(2, 25, null);
assert.strictEqual(hitBlocked, false, 'Phase 1 should resist regular prime hit');

// Test absolute purify on phase 1
const purified = gaussian.takeAbsolutePurify(null);
assert.strictEqual(purified, true, 'Absolute purify should shift phase');
assert.strictEqual(gaussian.gaussianPhase, 2, 'Phase should advance to 2 (-i)');
assert.strictEqual(gaussian.isNegative, false);

// In phase 2 (-i), slow should be immune
gaussian.applySlow(0.5, 2.0);
assert.strictEqual(gaussian.slowTimer, 0, 'Phase 2 (-i) should be immune to slow');

// Advance to phase 3 (+1)
gaussian.update(3.6, null);
assert.strictEqual(gaussian.gaussianPhase, 3);
// Phase 3 (+1) takes 2.5x vulnerability damage
const prevHp = gaussian.stageHp;
gaussian.takePrimeHit(2, 10, null); // 10 * 2.5 = 25 damage
assert.strictEqual(prevHp - gaussian.stageHp, 25, 'Phase 3 should take 2.5x damage');
console.log('✓ Gaussian Cycler 4-quadrant cyclic phases passed.');

// Test 1.4: Determinant Matrix Quads
console.log('\n--- 2. Testing Determinant Matrix Quad Collapse ---');
// Mock game with checkDeterminantQuads
const mockGame = {
  monsters: [],
  gold: 0,
  addGold(amount) { this.gold += amount; },
  createExplosion() {}
};
// Bind Game checkDeterminantQuads logic
mockGame.checkDeterminantQuads = Game.prototype.checkDeterminantQuads.bind(mockGame);

const quadId = 'quad_test_1';
// a=6, b=4, c=9, d=6 -> ad - bc = 36 - 36 = 0
const mA = new Monster({ id: 'mA', value: 6, waypoints, determinantQuadId: quadId, detIndex: 0 });
const mB = new Monster({ id: 'mB', value: 4, waypoints, determinantQuadId: quadId, detIndex: 1 });
const mC = new Monster({ id: 'mC', value: 9, waypoints, determinantQuadId: quadId, detIndex: 2 });
const mD = new Monster({ id: 'mD', value: 6, waypoints, determinantQuadId: quadId, detIndex: 3 });
mockGame.monsters.push(mA, mB, mC, mD);

mockGame.checkDeterminantQuads();
assert.strictEqual(mA.isDead, true);
assert.strictEqual(mB.isDead, true);
assert.strictEqual(mC.isDead, true);
assert.strictEqual(mD.isDead, true);
assert.strictEqual(mockGame.gold > 0, true, 'Triple gold reward paid out on singular matrix collapse');
console.log('✓ 2x2 Determinant Matrix zero-collapse chain explosion passed.');

console.log('\n--- 3. Testing New Towers & Fusion Recipes ---');
assert.strictEqual(TOWER_TYPES.LOG, undefined, 'LOG tower has been removed');
assert.ok(TOWER_TYPES.TRIG, 'TRIG tower type exists');
assert.ok(TOWER_TYPES.FUSION_DERIVATIVE, 'FUSION_DERIVATIVE tower type exists');
assert.ok(TOWER_TYPES.FUSION_MONTE_CARLO, 'FUSION_MONTE_CARLO tower type exists');

assert.strictEqual(TOWER_TYPES.TRIG.category, 'special');
assert.strictEqual(TOWER_TYPES.FUSION_DERIVATIVE.category, 'fusion');
assert.strictEqual(TOWER_TYPES.FUSION_MONTE_CARLO.category, 'fusion');

// Test Fusion Availability
const prime7Tower = new Tower({
  id: 't_prime7',
  x: 50,
  y: 50,
  type: 'prime',
  range: 150,
  fireRate: 1.0,
  damage: 50,
  cost: 130,
  color: '#8b5cf6',
  label: '7',
  factor: 7
});
const prime7Fusions = prime7Tower.getAvailableFusions();
assert.ok(prime7Fusions.some(f => f.key === 'FUSION_DERIVATIVE'), 'Prime 7 can fuse into Derivative Harp');

const prime3Tower = new Tower({
  id: 't_prime3',
  x: 50,
  y: 50,
  type: 'prime',
  range: 150,
  fireRate: 1.0,
  damage: 30,
  cost: 75,
  color: '#fbbf24',
  label: '3',
  factor: 3
});
const prime3Fusions = prime3Tower.getAvailableFusions();
assert.ok(prime3Fusions.some(f => f.key === 'FUSION_MONTE_CARLO'), 'Prime 3 can fuse into Monte Carlo Dice');

const sqrtTower = new Tower({
  id: 't_sqrt',
  x: 50,
  y: 50,
  type: 'sqrt',
  range: 150,
  fireRate: 1.0,
  damage: 40,
  cost: 150,
  color: '#f59e0b',
  label: '√x'
});
const sqrtFusions = sqrtTower.getAvailableFusions();
assert.ok(sqrtFusions.some(f => f.key === 'FUSION_MONTE_CARLO'), 'Sqrt tower can fuse into Monte Carlo Dice');
console.log('✓ Tower types and fusion recipes verified.');

console.log('\n--- 4. Testing Build Limits (Max 1 for each new model) ---');
const dummyGame = {
  towers: [],
  selectedPad: null,
  getTowerTypeCount: Game.prototype.getTowerTypeCount,
  canBuildTowerType: Game.prototype.canBuildTowerType
};

// Initial state: can build TRIG
assert.strictEqual(dummyGame.canBuildTowerType('TRIG'), true);
// Build 1 TRIG
dummyGame.towers.push(new Tower({ id: 't1', x: 0, y: 0, ...TOWER_TYPES.TRIG }));
// Second TRIG must be rejected
assert.strictEqual(dummyGame.canBuildTowerType('TRIG'), false, 'Second TRIG must be blocked');

// Initial state: can build FUSION_DERIVATIVE
assert.strictEqual(dummyGame.canBuildTowerType('FUSION_DERIVATIVE'), true);
// Build 1 FUSION_DERIVATIVE
dummyGame.towers.push(new Tower({ id: 't2', x: 10, y: 10, ...TOWER_TYPES.FUSION_DERIVATIVE }));
// Second FUSION_DERIVATIVE must be rejected
assert.strictEqual(dummyGame.canBuildTowerType('FUSION_DERIVATIVE'), false, 'Second FUSION_DERIVATIVE must be blocked');

console.log('✓ Strict limit of 1 per model for new towers passed.');

console.log('\n--- 5. Testing Endless Wave Generation with New Monsters ---');
const endlessMgr = new EndlessManager();
let foundMobius = false;
let foundMatryoshka = false;
let foundGaussian = false;
let foundQuad = false;

for (let w = 1; w <= 50; w++) {
  const wave = endlessMgr.generateEndlessWave(w);
  for (const e of wave.enemies) {
    if (e.isMobius) foundMobius = true;
    if (e.isMatryoshka) foundMatryoshka = true;
    if (e.isGaussianCycler) foundGaussian = true;
    if (e.determinantQuadId) foundQuad = true;
  }
}

assert.strictEqual(foundMobius, true, 'Endless waves spawn Mobius');
assert.strictEqual(foundMatryoshka, true, 'Endless waves spawn Matryoshka');
assert.strictEqual(foundGaussian, true, 'Endless waves spawn Gaussian Cycler');
assert.ok(LEVELS['5-3'].waves.some(w => w.enemies.some(e => e.determinantQuadId)), 'Level 5-3 spawns Determinant Quads');
console.log('✓ Monster spawn integration passed.');

console.log('\n========================================');
console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉');
console.log('========================================');
