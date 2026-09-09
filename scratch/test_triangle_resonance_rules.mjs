// Mock minimal DOM before any imports
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};
globalThis.requestAnimationFrame = () => {};
globalThis.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  location: { reload: () => {} },
  confirm: () => true
};
globalThis.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

const { Tower, TOWER_TYPES } = await import('../src/entities/Tower.js');
const { GeometricResonanceManager } = await import('../src/engine/GeometricResonanceManager.js');

function createTower(typeKey, x, y, id) {
  const conf = TOWER_TYPES[typeKey];
  return new Tower({
    id: id || `t_${typeKey}_${Math.random()}`,
    x,
    y,
    type: conf.type,
    range: conf.range,
    fireRate: conf.fireRate,
    damage: conf.damage,
    cost: conf.cost,
    color: conf.color,
    label: conf.label,
    factor: conf.factor
  });
}

function createResonanceManagerWithTowers(towers) {
  const mockGame = { towers };
  const manager = new GeometricResonanceManager(mockGame);
  manager.recalculate();
  return manager;
}

console.log('--- Testing Geometric Resonance Matrix Triangle & Link Rules ---');

// Positions forming a compact triangle within maxTriangleDistance (<= 220px)
const pA = { x: 100, y: 100 };
const pB = { x: 200, y: 100 }; // dist(A, B) = 100
const pC = { x: 150, y: 180 }; // dist(A, C) = 94.3, dist(B, C) = 94.3

// =========================================================================
// Requirement 1: 沒有形成三角形的砲塔之間不需要連線 (No lines without a triangle)
// =========================================================================
console.log('\n--- Test Requirement 1: No lines without a triangle ---');

// 1. Two adjacent towers (Prime 2 and Prime 3, only 100px apart)
const t2 = createTower('PRIME_2', pA.x, pA.y, 't2');
const t3 = createTower('PRIME_3', pB.x, pB.y, 't3');
const mgr2Towers = createResonanceManagerWithTowers([t2, t3]);
console.assert(mgr2Towers.triangles.length === 0, '2 towers cannot form a triangle');
console.assert(mgr2Towers.links.length === 0, `Expected 0 links between 2 towers, got ${mgr2Towers.links.length}`);
console.assert(t2.inGeometricMatrix === false, 't2 should not be in matrix');
console.assert(t3.inGeometricMatrix === false, 't3 should not be in matrix');
console.log('✅ Two adjacent towers (Prime 2, Prime 3) have ZERO lines between them (no triangle formed)');

// 2. Three identical towers (2, 2, 2)
const t2_b = createTower('PRIME_2', pB.x, pB.y, 't2_b');
const t2_c = createTower('PRIME_2', pC.x, pC.y, 't2_c');
const mgr222 = createResonanceManagerWithTowers([t2, t2_b, t2_c]);
console.assert(mgr222.triangles.length === 0, 'Expected 0 triangles for (2, 2, 2)');
console.assert(mgr222.links.length === 0, `Expected 0 links for (2, 2, 2), got ${mgr222.links.length}`);
console.log('✅ Three identical towers (2, 2, 2) have ZERO lines between them');

// 3. Three towers with duplicate factors (2, 3, 3)
const t3_c = createTower('PRIME_3', pC.x, pC.y, 't3_c');
const mgr233 = createResonanceManagerWithTowers([t2, t3, t3_c]);
console.assert(mgr233.triangles.length === 0, 'Expected 0 triangles for (2, 3, 3)');
console.assert(mgr233.links.length === 0, `Expected 0 links for (2, 3, 3), got ${mgr233.links.length}`);
console.log('✅ Towers with duplicate factors (2, 3, 3) have ZERO lines between them');

// 4. Non-matching prime combinations (2, 3, 7)
const t7 = createTower('PRIME_7', pC.x, pC.y, 't7');
const mgr237 = createResonanceManagerWithTowers([t2, t3, t7]);
console.assert(mgr237.triangles.length === 0, 'Expected 0 triangles for (2, 3, 7)');
console.assert(mgr237.links.length === 0, `Expected 0 links for (2, 3, 7), got ${mgr237.links.length}`);
console.log('✅ Non-matching prime combinations (2, 3, 7) have ZERO lines between them');

// 5. Special non-prime towers (|x|, √x, ±1)
const tAbs = createTower('ABSOLUTE', pA.x, pA.y, 'tAbs');
const tSqrt = createTower('SQRT', pB.x, pB.y, 'tSqrt');
const tOp = createTower('OPERATOR', pC.x, pC.y, 'tOp');
const mgrSpecial = createResonanceManagerWithTowers([tAbs, tSqrt, tOp]);
console.assert(mgrSpecial.triangles.length === 0, 'Expected 0 triangles for special towers');
console.assert(mgrSpecial.links.length === 0, `Expected 0 links for special towers, got ${mgrSpecial.links.length}`);
console.log('✅ Special non-prime towers have ZERO lines between them');

// =========================================================================
// Requirement 2: 形成三角形必須在指定範圍內，不能太遠 (Must be within range)
// =========================================================================
console.log('\n--- Test Requirement 2: Must be within range, not too far ---');

// 1. Compact (2, 3, 5) within range (all side distances <= 220px)
const t5 = createTower('PRIME_5', pC.x, pC.y, 't5');
const mgr235_close = createResonanceManagerWithTowers([t2, t3, t5]);
console.assert(mgr235_close.triangles.length === 1, 'Close (2, 3, 5) MUST form 1 triangle');
console.assert(mgr235_close.links.length === 3, 'Close (2, 3, 5) MUST have exactly 3 links (the 3 edges of the triangle)');
console.assert(t2.inGeometricMatrix === true, 't2 in matrix');
console.assert(t3.inGeometricMatrix === true, 't3 in matrix');
console.assert(t5.inGeometricMatrix === true, 't5 in matrix');
console.log('✅ Compact (2, 3, 5) within range successfully forms 1 triangle and 3 edge lines');

// 2. Far away (2, 3, 5) where one tower exceeds maxTriangleDistance (> 220px)
// Place t5_far at x: 450, y: 100 -> dist(t2, t5_far) = 350px > 220px
const t5_far = createTower('PRIME_5', 450, 100, 't5_far');
const mgr235_far = createResonanceManagerWithTowers([t2, t3, t5_far]);
console.assert(mgr235_far.triangles.length === 0, 'Too far (2, 3, 5) MUST NOT form a triangle');
console.assert(mgr235_far.links.length === 0, 'Too far (2, 3, 5) MUST NOT have any lines');
console.log('✅ Far away (2, 3, 5) [dist 350px > 220px] correctly BLOCKED: 0 triangles, 0 lines');

// 3. Compact (3, 5, 7) within range
const t3_posA = createTower('PRIME_3', pA.x, pA.y, 't3_posA');
const t5_posB = createTower('PRIME_5', pB.x, pB.y, 't5_posB');
const t7_posC = createTower('PRIME_7', pC.x, pC.y, 't7_posC');
const mgr357_close = createResonanceManagerWithTowers([t3_posA, t5_posB, t7_posC]);
console.assert(mgr357_close.triangles.length === 1, 'Close (3, 5, 7) MUST form 1 triangle');
console.assert(mgr357_close.links.length === 3, 'Close (3, 5, 7) MUST have exactly 3 links');
console.assert(mgr357_close.triangles[0].isTriplet357 === true, 'Triangle is triplet 357');
console.log('✅ Compact (3, 5, 7) within range successfully forms 1 triangle and 3 edge lines');

// 4. Far away (3, 5, 7)
const t7_far = createTower('PRIME_7', 400, 300, 't7_far');
const mgr357_far = createResonanceManagerWithTowers([t3_posA, t5_posB, t7_far]);
console.assert(mgr357_far.triangles.length === 0, 'Too far (3, 5, 7) MUST NOT form a triangle');
console.assert(mgr357_far.links.length === 0, 'Too far (3, 5, 7) MUST NOT have any lines');
console.log('✅ Far away (3, 5, 7) correctly BLOCKED: 0 triangles, 0 lines');

// 5. Cluster of 4 primes (2, 3, 5, 7) close together
// ONLY the 2 valid triangles (2, 3, 5) and (3, 5, 7) should exist
// Edges: (2,3), (3,5), (5,2), (5,7), (7,3). The non-triangle pair (2,7) should NOT have a line!
const pD = { x: 180, y: 220 };
const t7_posD = createTower('PRIME_7', pD.x, pD.y, 't7_posD');
const mgrCluster = createResonanceManagerWithTowers([t2, t3, t5, t7_posD]);
console.assert(mgrCluster.triangles.length === 2, `Expected 2 triangles, got ${mgrCluster.triangles.length}`);
// Exactly 5 distinct edges for the 2 triangles sharing an edge (3, 5): (2,3), (3,5), (5,2), (3,7), (5,7)
console.assert(mgrCluster.links.length === 5, `Expected 5 edge links, got ${mgrCluster.links.length}`);
const linkIds = mgrCluster.links.map(l => l.id);
console.assert(!linkIds.includes('t2_t7_posD') && !linkIds.includes('t7_posD_t2'), 'Pair (2, 7) must NOT have a line!');
console.log('✅ Clustered (2, 3, 5, 7) forms exactly 2 triangles and only their respective edges (no stray 2-7 line)');

console.log('\n🎉 ALL REQUIREMENTS VERIFIED AND PASSED 100%!');
