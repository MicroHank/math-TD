globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

import { endlessManager } from '../src/engine/EndlessManager.js';
import { Monster } from '../src/entities/Monster.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- Testing Endless Mode Wave Scaling (Count, HP, Speed) ---');

const testWaves = [1, 5, 10, 20, 30, 50];
const waveData = testWaves.map(w => ({
  waveNumber: w,
  ...endlessManager.generateEndlessWave(w)
}));

// 1. Verify Monster Count Scaling
console.log('\n--- 1. Enemy Count Scaling ---');
for (let i = 0; i < waveData.length - 1; i++) {
  const current = waveData[i];
  const next = waveData[i + 1];
  console.log(`Wave ${current.waveNumber}: ${current.enemies.length} enemies -> Wave ${next.waveNumber}: ${next.enemies.length} enemies`);
  assert(next.enemies.length > current.enemies.length, `Wave ${next.waveNumber} enemy count must be greater than Wave ${current.waveNumber}`);
}

// 2. Verify Speed Scaling
console.log('\n--- 2. Base Speed Scaling ---');
for (let i = 0; i < waveData.length - 1; i++) {
  const current = waveData[i];
  const next = waveData[i + 1];
  // Calculate average enemy speed for each wave
  const avgSpeedCurrent = current.enemies.reduce((sum, e) => sum + e.speed, 0) / current.enemies.length;
  const avgSpeedNext = next.enemies.reduce((sum, e) => sum + e.speed, 0) / next.enemies.length;
  console.log(`Wave ${current.waveNumber} avg speed: ${avgSpeedCurrent.toFixed(1)} -> Wave ${next.waveNumber} avg speed: ${avgSpeedNext.toFixed(1)}`);
  assert(avgSpeedNext > avgSpeedCurrent, `Wave ${next.waveNumber} avg speed must be faster than Wave ${current.waveNumber}`);
}

// 3. Verify HP Multiplier Scaling
console.log('\n--- 3. HP Multiplier Scaling ---');
for (let i = 0; i < waveData.length - 1; i++) {
  const current = waveData[i];
  const next = waveData[i + 1];
  const hpCurrent = current.enemies[current.enemies.length - 1].hpMultiplier;
  const hpNext = next.enemies[next.enemies.length - 1].hpMultiplier;
  console.log(`Wave ${current.waveNumber} HP mult: ×${hpCurrent} -> Wave ${next.waveNumber} HP mult: ×${hpNext}`);
  assert(hpNext > hpCurrent, `Wave ${next.waveNumber} HP mult must be greater than Wave ${current.waveNumber}`);
}

// 4. Verify Actual Monster Instance Durability Scaling
console.log('\n--- 4. Monster Instance Durability & Decomposition Scaling ---');
const dummyWaypoints = [{ x: 0, y: 0 }, { x: 100, y: 0 }];

const m_w1 = new Monster({
  id: 'm1',
  value: 6,
  waypoints: dummyWaypoints,
  hpMultiplier: waveData[0].enemies[0].hpMultiplier
});

const m_w10 = new Monster({
  id: 'm10',
  value: 6,
  waypoints: dummyWaypoints,
  hpMultiplier: waveData[2].enemies[waveData[2].enemies.length - 1].hpMultiplier
});

const m_w30 = new Monster({
  id: 'm30',
  value: 6,
  waypoints: dummyWaypoints,
  hpMultiplier: waveData[4].enemies[waveData[4].enemies.length - 1].hpMultiplier
});

console.log(`Monster(6) StageHP - Wave 1: ${m_w1.stageHp} | Wave 10: ${m_w10.stageHp} | Wave 30: ${m_w30.stageHp}`);
assert(m_w10.stageHp > m_w1.stageHp, 'Monster StageHP in Wave 10 is higher than Wave 1');
assert(m_w30.stageHp > m_w10.stageHp, 'Monster StageHP in Wave 30 is higher than Wave 10');

// Test division persistence of hpMultiplier (6 / 2 = 3)
m_w30.takePrimeHit(2, 9999, { createSparks: () => {}, addFloatingText: () => {} });
assert(m_w30.value === 3, 'Monster successfully divided to 3');
console.log(`Monster(3) after division StageHP in Wave 30: ${m_w30.stageHp} (vs base 50)`);
assert(m_w30.stageHp > 50 * 3.5, 'Subsequent decomposed stage hp retains high wave hpMultiplier');

console.log('\n🎉 ALL ENDLESS MODE SCALING TESTS PASSED PERFECTLY!');
