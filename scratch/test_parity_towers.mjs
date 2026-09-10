import assert from 'node:assert';
import { Tower, TOWER_TYPES } from '../src/entities/Tower.js';
import { Monster } from '../src/entities/Monster.js';
import { EvenProjectile, OddProjectile } from '../src/entities/Projectile.js';

console.log('--- Testing Parity Towers (EVEN & ODD) ---');

// 1. Check TOWER_TYPES configuration
assert.ok(TOWER_TYPES.EVEN, 'TOWER_TYPES.EVEN should exist');
assert.ok(TOWER_TYPES.ODD, 'TOWER_TYPES.ODD should exist');
assert.strictEqual(TOWER_TYPES.EVEN.type, 'even');
assert.strictEqual(TOWER_TYPES.ODD.type, 'odd');
assert.strictEqual(TOWER_TYPES.EVEN.category, 'prime');
assert.strictEqual(TOWER_TYPES.ODD.category, 'prime');
assert.strictEqual(TOWER_TYPES.EVEN.cost, 60);
assert.strictEqual(TOWER_TYPES.ODD.cost, 70);
console.log('✓ TOWER_TYPES configuration verified');

// 2. Instantiate Towers
const evenTower = new Tower({
  id: 't_even_1',
  x: 100,
  y: 100,
  ...TOWER_TYPES.EVEN
});

const oddTower = new Tower({
  id: 't_odd_1',
  x: 150,
  y: 100,
  ...TOWER_TYPES.ODD
});

assert.strictEqual(evenTower.type, 'even');
assert.strictEqual(evenTower.label, '2k');
assert.strictEqual(oddTower.type, 'odd');
assert.strictEqual(oddTower.label, '2k+1');
assert.ok(evenTower.isPrimeTower(), 'Even tower is categorized in basic/prime category');
assert.ok(oddTower.isPrimeTower(), 'Odd tower is categorized in basic/prime category');
console.log('✓ Tower instantiation verified');

// 3. Target Selection
const dummyWaypoints = [{ x: 100, y: 100 }, { x: 500, y: 100 }];
const mEven = new Monster({ id: 'm_even', value: 12, waypoints: dummyWaypoints });
mEven.progress = 50;
const mOdd = new Monster({ id: 'm_odd', value: 13, waypoints: dummyWaypoints });
mOdd.progress = 60;

const targetForEven = evenTower.findTarget([mOdd, mEven]);
assert.strictEqual(targetForEven, mEven, 'Even tower should lock onto even monster (12)');

const targetForOdd = oddTower.findTarget([mOdd, mEven]);
assert.strictEqual(targetForOdd, mOdd, 'Odd tower should lock onto odd monster (13)');
console.log('✓ Parity target selection verified');

// 4. Combat & Hit Mechanics: Odd Tower Parity Shift
const dummyGame = {
  createSparks: () => {},
  createExplosion: () => {},
  addGold: () => {},
  addProjectile: () => {}
};

console.log('Testing Odd Parity Hit on 13...');
// Hit with odd damage until durability breaks
while (mOdd.value === 13 && !mOdd.isDead) {
  mOdd.takeOddHit(35, dummyGame);
}
assert.strictEqual(mOdd.value, 12, '13 after breaking odd durability should shift to 12 (n -> n - 1)');
console.log(`✓ 13 successfully shifted to ${mOdd.value} (Parity Shift)!`);

// 5. Combat & Hit Mechanics: Even Tower Half-decay
console.log('Testing Even Parity Hit on 12...');
while (mOdd.value === 12 && !mOdd.isDead) {
  mOdd.takeEvenHit(28, dummyGame);
}
assert.strictEqual(mOdd.value, 6, '12 after breaking even durability should divide by 2 to become 6');
console.log(`✓ 12 successfully divided by 2 to become ${mOdd.value} (Even Half-decay)!`);

// 6. Complete Combo Elimination Chain (6 -> 3 -> 2 -> 1 -> Dead)
console.log('Testing Combo Elimination Chain: 6 -> 3 -> 2 -> 1...');
while (mOdd.value === 6 && !mOdd.isDead) {
  mOdd.takeEvenHit(28, dummyGame);
}
assert.strictEqual(mOdd.value, 3, '6 divides by 2 to become 3');

while (mOdd.value === 3 && !mOdd.isDead) {
  mOdd.takeOddHit(35, dummyGame);
}
assert.strictEqual(mOdd.value, 2, '3 shifts to 2 (Odd hit)');

while (mOdd.value === 2 && !mOdd.isDead) {
  mOdd.takeEvenHit(28, dummyGame);
}
assert.strictEqual(mOdd.isDead, true, '2 divides by 2 to 1 and becomes eliminated');
console.log('✓ Complete combo elimination chain (13 -> 12 -> 6 -> 3 -> 2 -> eliminated) verified!');

// 7. Projectile classes
const pEven = new EvenProjectile({ x: 0, y: 0, target: mEven, damage: 28 });
const pOdd = new OddProjectile({ x: 0, y: 0, target: mEven, damage: 35 });
assert.strictEqual(pEven.color, '#38bdf8');
assert.strictEqual(pOdd.color, '#f97316');
console.log('✓ Projectile classes verified');

// 8. Tower Upgrade & Sell
assert.strictEqual(evenTower.level, 1);
const canUpDmg = evenTower.upgradeDamage();
assert.ok(canUpDmg, 'Even tower damage should upgrade');
assert.ok(evenTower.damage > evenTower.baseDamage, 'Even tower damage increased');
assert.ok(evenTower.sellValue > 0, 'Even tower has sell value');
console.log(`✓ Even tower upgraded: Lv${evenTower.damageLevel} dmg = ${evenTower.damage}, sell value = ${evenTower.sellValue}🪙`);

console.log('🎉 ALL PARITY TOWER TESTS PASSED SUCCESSFULLY!');
