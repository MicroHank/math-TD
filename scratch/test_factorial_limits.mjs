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

function createMockCanvas() {
  return {
    getContext: () => ({
      clearRect: () => {},
      fillRect: () => {},
      beginPath: () => {},
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

const { Game } = await import('../src/engine/Game.js');
const { Tower, TOWER_TYPES } = await import('../src/entities/Tower.js');

console.log('--- Testing n! Factorial Tower Limits & Upgrades ---');

const canvas = createMockCanvas();
const game = new Game(canvas, {});
game.loadLevel('1-1');
game.gold = 10000; // Plenty of gold

// 1. Initial count
console.assert(game.getFactorialTowerCount() === 0, 'Initial factorial count should be 0');
console.assert(game.canBuildFactorialTower() === true, 'Initially canBuildFactorialTower should be true');

// 2. Build first factorial tower
const pad0 = game.buildPads[0];
const pad1 = game.buildPads[1];
const pad2 = game.buildPads[2];

const build1 = game.buildTowerOnSelectedPad('FUSION_FACTORIAL', pad0);
console.assert(build1 === true, 'Building 1st factorial tower should succeed');
console.assert(game.getFactorialTowerCount() === 1, 'Factorial count should be 1');
console.assert(game.canBuildFactorialTower() === false, 'canBuildFactorialTower should be false after 1st (Limit: 1 per model)');

// 3. Attempt to build 2nd factorial tower -> MUST FAIL (Limit: 1 per model)
const build2 = game.buildTowerOnSelectedPad('FUSION_FACTORIAL', pad1);
console.assert(build2 === false, 'Building 2nd factorial tower should FAIL');
console.assert(game.getFactorialTowerCount() === 1, 'Factorial count must remain 1');

// 4. Test fusion path when limit is reached
const buildOp = game.buildTowerOnSelectedPad('OPERATOR', pad2);
console.assert(buildOp === true, 'Building operator tower should succeed');
const opTower = pad2.tower;
console.assert(opTower.type === 'operator', 'Tower on pad2 is operator');

// Try to fuse into factorial when 1 already exists -> MUST FAIL
const fuseAttempt = opTower.fuseInto('FUSION_FACTORIAL', game);
console.assert(fuseAttempt === false, 'Fusing into factorial when 1 exists should FAIL');
console.assert(opTower.type === 'operator', 'Tower must remain operator');

// 5. Sell first factorial tower -> count drops to 0, now fuse into factorial succeeds
game.selectTower(pad0.tower);
game.sellSelectedTower();
console.assert(game.getFactorialTowerCount() === 0, 'After selling, factorial count should be 0');
console.assert(game.canBuildFactorialTower() === true, 'canBuildFactorialTower should be true after selling');

const fuseSuccess = opTower.fuseInto('FUSION_FACTORIAL', game);
console.assert(fuseSuccess === true, 'Fusing into factorial after selling should SUCCEED');
console.assert(opTower.type === 'fusion_factorial', 'Tower is now fusion_factorial');
console.assert(game.getFactorialTowerCount() === 1, 'Factorial count should be 1');

// 7. Test NO-UPGRADE rules on Factorial Tower
const factTower = pad2.tower;
console.assert(factTower.type === 'fusion_factorial', 'Target tower is fusion_factorial');
console.assert(factTower.isUpgradeable === false, 'isUpgradeable must be false');
console.assert(factTower.getUpgradeRangeCost() === 0, 'getUpgradeRangeCost must be 0');
console.assert(factTower.getUpgradeDamageCost() === 0, 'getUpgradeDamageCost must be 0');
console.assert(factTower.getUpgradeSpeedCost() === 0, 'getUpgradeSpeedCost must be 0');
console.assert(factTower.upgradeCost === 0, 'composite upgradeCost must be 0');

const initialRange = factTower.range;
const initialDamage = factTower.damage;
const initialFireRate = factTower.fireRate;

console.assert(factTower.upgradeRange() === false, 'upgradeRange() must return false');
console.assert(factTower.upgradeDamage() === false, 'upgradeDamage() must return false');
console.assert(factTower.upgradeSpeed() === false, 'upgradeSpeed() must return false');
console.assert(factTower.upgrade() === false, 'upgrade() must return false');

console.assert(factTower.range === initialRange, 'range must not change');
console.assert(factTower.damage === initialDamage, 'damage must not change');
console.assert(factTower.fireRate === initialFireRate, 'fireRate must not change');

// Test Game-level upgrade methods
game.selectTower(factTower);
const upRangeGame = game.upgradeSelectedTowerStat('range');
console.assert(upRangeGame === false, 'game.upgradeSelectedTowerStat("range") must return false');

const upDmgGame = game.upgradeSelectedTowerStat('damage');
console.assert(upDmgGame === false, 'game.upgradeSelectedTowerStat("damage") must return false');

const upSpdGame = game.upgradeSelectedTowerStat('speed');
console.assert(upSpdGame === false, 'game.upgradeSelectedTowerStat("speed") must return false');

game.upgradeSelectedTower();
console.assert(factTower.range === initialRange, 'range unchanged after game.upgradeSelectedTower()');
console.assert(factTower.damage === initialDamage, 'damage unchanged after game.upgradeSelectedTower()');
console.assert(factTower.fireRate === initialFireRate, 'fireRate unchanged after game.upgradeSelectedTower()');

console.log('✅ ALL FACTORIAL TOWER LIMIT & UPGRADE TESTS PASSED!');
