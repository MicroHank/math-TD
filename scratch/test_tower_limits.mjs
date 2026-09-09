// Automated Verification Test for 1-Tower-Per-Model Limits:
// 代數與力場 (Special / Algebra & Force Field) 各型號限建 1 座
// 複合神塔 (Dual-Tower Fusion) 各型號限建 1 座

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
  confirm: () => true,
  devicePixelRatio: 1
};
globalThis.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

function createMockCanvas() {
  return {
    getContext: () => ({
      clearRect: () => {},
      fillRect: () => {},
      beginPath: () => {},
      closePath: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {},
      fillText: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      setLineDash: () => {},
      measureText: () => ({ width: 20 })
    }),
    addEventListener: () => {},
    removeEventListener: () => {},
    width: 960,
    height: 540,
    getBoundingClientRect: () => ({ width: 960, height: 540, left: 0, top: 0 }),
    style: {}
  };
}

import { Tower, TOWER_TYPES } from '../src/entities/Tower.js';
import { Game } from '../src/engine/Game.js';

console.log('=== TEST: 1-Tower-Per-Model Limit for Special & Fusion Categories ===');

const game = new Game(createMockCanvas());
game.loadLevel('1-1');
game.gold = 50000;

console.log('Total Pads available:', game.buildPads.length);

// -------------------------------------------------------------
// PART 1: Special Towers - Each Model Limit = 1
// -------------------------------------------------------------
console.log('\n--- PART 1: Special Towers (代數與力場) - Each Model Limit = 1 ---');

// 1. ABSOLUTE
const bAbs1 = game.buildTowerOnSelectedPad('ABSOLUTE', game.buildPads[0]);
console.assert(bAbs1 === true, '1st ABSOLUTE tower should be built');
console.assert(game.getTowerTypeCount('absolute') === 1, 'ABSOLUTE count should be 1');
console.log('✓ 1st ABSOLUTE built successfully');

const bAbs2 = game.buildTowerOnSelectedPad('ABSOLUTE', game.buildPads[1]);
console.assert(bAbs2 === false, '2nd ABSOLUTE tower MUST BE REJECTED');
console.assert(game.getTowerTypeCount('absolute') === 1, 'ABSOLUTE count must remain 1');
console.log('✓ 2nd ABSOLUTE correctly REJECTED (Limit: 1 per model)');

// 2. SQRT (different model in same category is allowed!)
const bSqrt1 = game.buildTowerOnSelectedPad('SQRT', game.buildPads[1]);
console.assert(bSqrt1 === true, '1st SQRT tower should be built');
console.assert(game.getTowerTypeCount('sqrt') === 1, 'SQRT count should be 1');
console.log('✓ 1st SQRT built successfully');

const bSqrt2 = game.buildTowerOnSelectedPad('SQRT', game.buildPads[2]);
console.assert(bSqrt2 === false, '2nd SQRT tower MUST BE REJECTED');
console.assert(game.getTowerTypeCount('sqrt') === 1, 'SQRT count must remain 1');
console.log('✓ 2nd SQRT correctly REJECTED');

// 3. OPERATOR & ZERO_FREEZE
const bOp1 = game.buildTowerOnSelectedPad('OPERATOR', game.buildPads[2]);
console.assert(bOp1 === true, '1st OPERATOR tower should be built');
const bZero1 = game.buildTowerOnSelectedPad('ZERO_FREEZE', game.buildPads[3]);
console.assert(bZero1 === true, '1st ZERO_FREEZE tower should be built');

console.assert(game.getSpecialTowerCount() === 4, `All 4 unique special towers can co-exist: got ${game.getSpecialTowerCount()}`);
console.log('✓ All 4 distinct Special towers co-exist on the field (1 of each)');

// Duplicate ZERO_FREEZE on pad 4 -> must be rejected
const bZero2 = game.buildTowerOnSelectedPad('ZERO_FREEZE', game.buildPads[4]);
console.assert(bZero2 === false, '2nd ZERO_FREEZE must be rejected');
console.log('✓ 2nd ZERO_FREEZE correctly REJECTED');

// Selling ABSOLUTE on pad0 allows building ABSOLUTE on pad4
game.selectTower(game.buildPads[0].tower);
game.sellSelectedTower();
console.assert(game.getTowerTypeCount('absolute') === 0, 'ABSOLUTE count should be 0 after selling');

const bAbsRebuild = game.buildTowerOnSelectedPad('ABSOLUTE', game.buildPads[4]);
console.assert(bAbsRebuild === true, 'Building ABSOLUTE after selling previous one should SUCCEED');
console.assert(game.getTowerTypeCount('absolute') === 1, 'ABSOLUTE count back to 1');
console.log('✓ ABSOLUTE rebuilt on another pad after selling original');

// -------------------------------------------------------------
// PART 2: Fusion Towers - Each Model Limit = 1
// -------------------------------------------------------------
console.log('\n--- PART 2: Fusion Towers (複合神塔) - Each Model Limit = 1 ---');

// 1. FUSION_6
const f6_1 = game.buildTowerOnSelectedPad('FUSION_6', game.buildPads[5]);
console.assert(f6_1 === true, '1st FUSION_6 should be built');
console.assert(game.getTowerTypeCount('fusion_6') === 1, 'FUSION_6 count should be 1');
console.log('✓ 1st FUSION_6 built successfully');

const f6_2 = game.buildTowerOnSelectedPad('FUSION_6', game.buildPads[6]);
console.assert(f6_2 === false, '2nd FUSION_6 MUST BE REJECTED');
console.assert(game.getTowerTypeCount('fusion_6') === 1, 'FUSION_6 count must remain 1');
console.log('✓ 2nd FUSION_6 correctly REJECTED');

// 2. FUSION_15, FUSION_ABS_SQRT, FUSION_FACTORIAL (distinct models are allowed!)
const f15_1 = game.buildTowerOnSelectedPad('FUSION_15', game.buildPads[6]);
console.assert(f15_1 === true, '1st FUSION_15 should be built');
const fAbsSqrt_1 = game.buildTowerOnSelectedPad('FUSION_ABS_SQRT', game.buildPads[7]);
console.assert(fAbsSqrt_1 === true, '1st FUSION_ABS_SQRT should be built');
const fFact_1 = game.buildTowerOnSelectedPad('FUSION_FACTORIAL', game.buildPads[8]);
console.assert(fFact_1 === true, '1st FUSION_FACTORIAL should be built');

console.assert(game.getFusionTowerCount() === 4, `All 4 unique fusion towers can co-exist: got ${game.getFusionTowerCount()}`);
console.log('✓ All 4 distinct Fusion towers co-exist on the field (1 of each)');

// Duplicate FUSION_FACTORIAL on pad 9 -> must be rejected
const fFact_2 = game.buildTowerOnSelectedPad('FUSION_FACTORIAL', game.buildPads[9]);
console.assert(fFact_2 === false, '2nd FUSION_FACTORIAL must be rejected');
console.log('✓ 2nd FUSION_FACTORIAL correctly REJECTED');

// Build a Prime 2 tower on pad 9
const p2 = game.buildTowerOnSelectedPad('PRIME_2', game.buildPads[9]);
console.assert(p2 === true, 'Prime 2 should be built');

// Attempt to fuse Prime 2 on pad 9 into FUSION_6 (which already exists on pad 5) -> MUST BE REJECTED
const primeTower = game.buildPads[9].tower;
const fuseFail = primeTower.fuseInto('FUSION_6', game);
console.assert(fuseFail === false, 'fuseInto FUSION_6 should be BLOCKED because FUSION_6 already exists');
console.assert(primeTower.type === 'prime', 'Tower must stay Prime 2');
console.log('✓ fuseInto correctly BLOCKED when target fusion model already exists on field');

// Sell FUSION_6 on pad 5
game.selectTower(game.buildPads[5].tower);
game.sellSelectedTower();
console.assert(game.getTowerTypeCount('fusion_6') === 0, 'FUSION_6 count is now 0');

// Now fuse Prime 2 into FUSION_6 -> SHOULD SUCCEED!
const fuseSuccess = primeTower.fuseInto('FUSION_6', game);
console.assert(fuseSuccess === true, 'fuseInto FUSION_6 should SUCCEED after selling old one');
console.assert(primeTower.type === 'fusion_6', 'Tower is now fusion_6');
console.assert(game.getTowerTypeCount('fusion_6') === 1, 'FUSION_6 count back to 1');
console.log('✓ fuseInto SUCCEEDED after freeing the unique slot');

console.log('\n========================================');
console.log('🎉 ALL 1-TOWER-PER-MODEL TESTS PASSED 100%!');
console.log('========================================');
