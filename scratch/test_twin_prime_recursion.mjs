globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

import { Monster } from '../src/entities/Monster.js';

function assert(cond, msg) {
  if (!cond) {
    console.error(`❌ FAIL: ${msg}`);
    process.exit(1);
  }
}

console.log('--- Testing Twin Prime Quantum Resonance & Infinite Call Stack Fix ---');

const dummyWaypoints = [{ x: 0, y: 0 }, { x: 100, y: 0 }];
const mockGame = {
  createSparks: () => {},
  createExplosion: () => {},
  addGold: () => {}
};

// 1. Basic Twin Resonance Test
const twinA = new Monster({ id: 'twin_11', value: 11, waypoints: dummyWaypoints });
const twinB = new Monster({ id: 'twin_13', value: 13, waypoints: dummyWaypoints });
twinA.twinPartner = twinB;
twinB.twinPartner = twinA;

// Check initial state
assert(twinA.twinPartner === twinB && twinB.twinPartner === twinA, 'Twins are linked');

// Hit twinA with heavy damage
twinA.takePrimeHit(11, 200, mockGame);
// Verify no crash, and resonance was processed safely
console.log('✓ Twin A hit with 200 damage processed without recursion crash');

// 2. High-Stress Continuous Ping-Pong Loop Simulation (1,000 iterations)
console.log('Starting 1,000 high-frequency twin prime combat cycles...');
for (let i = 0; i < 1000; i++) {
  const mA = new Monster({ id: `a_${i}`, value: 17, waypoints: dummyWaypoints });
  const mB = new Monster({ id: `b_${i}`, value: 19, waypoints: dummyWaypoints });
  mA.twinPartner = mB;
  mB.twinPartner = mA;

  // Simulate alternating hits with varying damage
  while (!mA.isDead && !mB.isDead) {
    if (Math.random() < 0.5) {
      mA.takePrimeHit(17, 30, mockGame);
    } else {
      mB.takePrimeHit(19, 30, mockGame);
    }
  }

  // Once one dies, verify the surviving twin partner is rage-buffed and unlinked
  if (mA.isDead && !mB.isDead) {
    assert(mA.twinPartner === null, `mA twinPartner must be null after death in iter ${i}`);
    assert(mB.isRaging === true, `mB must be raging after partner death in iter ${i}`);
    assert(mB.twinPartner === null, `mB twinPartner must be decoupled in iter ${i}`);
  } else if (mB.isDead && !mA.isDead) {
    assert(mB.twinPartner === null, `mB twinPartner must be null after death in iter ${i}`);
    assert(mA.isRaging === true, `mA must be raging after partner death in iter ${i}`);
    assert(mA.twinPartner === null, `mA twinPartner must be decoupled in iter ${i}`);
  }
}

console.log('🎉 ALL 1,000 TWIN PRIME STRESS TESTS PASSED WITH ZERO STACK OVERFLOW ERRORS!');
