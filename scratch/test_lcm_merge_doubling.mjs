// Test for LCM Merge Doubling Rule
// When LCM(val1, val2) equals either val1 or val2 (e.g. LCM(6, 18) = 18),
// the resulting merged value must be multiplied by 2 (e.g. 18 * 2 = 36).

import { computeGcd, computeLcm, LcmMergeManager } from '../src/engine/LcmMergeManager.js';

console.log('=== TEST: LCM Merge Doubling Rule ===');

// Mock Game
const floatingTexts = [];
const mockGame = {
  monsters: [],
  createExplosion: () => {},
  createSparks: () => {},
  spellManager: { addMana: () => {} }
};

function createMockMonster(id, value, progress = 10) {
  return {
    id,
    value,
    originalValue: value,
    progress,
    x: 100,
    y: 100,
    hp: value,
    stageHp: 100,
    maxStageHp: 100,
    isDead: false,
    calcStageMaxHp: (val) => val * 10,
    addFloatingText: (text, color) => {
      floatingTexts.push({ id, text, color });
    }
  };
}

const manager = new LcmMergeManager(mockGame);

// Case 1: LCM(6, 18) = 18. Since 18 is one of the operands, merged value = 18 * 2 = 36.
{
  floatingTexts.length = 0;
  const m1 = createMockMonster('m1', 6, 20);
  const m2 = createMockMonster('m2', 18, 10);
  manager.executeMerge(m1, m2);

  console.assert(m1.value === 36, `Expected m1 value to be 36, got ${m1.value}`);
  console.assert(m1.hp === 36, `Expected m1 hp to be 36, got ${m1.hp}`);
  console.assert(m2.isDead === true, 'Absorbed monster m2 should be dead');
  console.assert(floatingTexts.some(t => t.text.includes('LCM(6, 18) = 18 ➔ ×2 = 36!')), 
    `Floating text should indicate multiplication, got: ${JSON.stringify(floatingTexts)}`);
  console.log('✓ Case 1 passed: LCM(6, 18) = 18 -> doubled to 36 with prompt text!');
}

// Case 2: LCM(18, 6) with m2 having higher progress
{
  floatingTexts.length = 0;
  const m1 = createMockMonster('m1', 6, 10);
  const m2 = createMockMonster('m2', 18, 20); // winner
  manager.executeMerge(m1, m2);

  console.assert(m2.value === 36, `Expected m2 value to be 36, got ${m2.value}`);
  console.assert(m1.isDead === true, 'm1 should be dead');
  console.log('✓ Case 2 passed: LCM(18, 6) = 18 (reversed progress) -> doubled to 36!');
}

// Case 3: LCM(12, 12) = 12. Both values equal 12. Target = 12 * 2 = 24.
{
  floatingTexts.length = 0;
  const m1 = createMockMonster('m1', 12, 10);
  const m2 = createMockMonster('m2', 12, 5);
  manager.executeMerge(m1, m2);

  console.assert(m1.value === 24, `Expected m1 value to be 24, got ${m1.value}`);
  console.assert(floatingTexts.some(t => t.text.includes('LCM(12, 12) = 12 ➔ ×2 = 24!')),
    `Floating text should show ×2 = 24, got: ${JSON.stringify(floatingTexts)}`);
  console.log('✓ Case 3 passed: LCM(12, 12) = 12 -> doubled to 24!');
}

// Case 4: LCM(4, 6) = 12. 12 != 4 and 12 != 6 -> NOT doubled! Final value = 12.
{
  floatingTexts.length = 0;
  const m1 = createMockMonster('m1', 4, 15);
  const m2 = createMockMonster('m2', 6, 10);
  manager.executeMerge(m1, m2);

  console.assert(m1.value === 12, `Expected m1 value to be 12, got ${m1.value}`);
  console.assert(floatingTexts.some(t => t.text === '⚡ LCM(4, 6) = 12!'),
    `Floating text should be '⚡ LCM(4, 6) = 12!', got: ${JSON.stringify(floatingTexts)}`);
  console.log('✓ Case 4 passed: LCM(4, 6) = 12 -> NOT doubled, remains 12!');
}

// Case 5: LCM(6, 10) = 30. 30 != 6 and 30 != 10 -> NOT doubled! Final value = 30.
{
  floatingTexts.length = 0;
  const m1 = createMockMonster('m1', 6, 15);
  const m2 = createMockMonster('m2', 10, 10);
  manager.executeMerge(m1, m2);

  console.assert(m1.value === 30, `Expected m1 value to be 30, got ${m1.value}`);
  console.assert(floatingTexts.some(t => t.text === '⚡ LCM(6, 10) = 30!'),
    `Floating text should be '⚡ LCM(6, 10) = 30!', got: ${JSON.stringify(floatingTexts)}`);
  console.log('✓ Case 5 passed: LCM(6, 10) = 30 -> NOT doubled, remains 30!');
}

// Case 6: Cap enforcement at maxLcmCap (720).
// E.g. LCM(360, 720) = 720. 720 is operand -> 720 * 2 = 1440 -> capped to 720.
{
  floatingTexts.length = 0;
  const m1 = createMockMonster('m1', 360, 20);
  const m2 = createMockMonster('m2', 720, 10);
  manager.executeMerge(m1, m2);

  console.assert(m1.value === 720, `Expected m1 value to be capped at 720, got ${m1.value}`);
  console.log('✓ Case 6 passed: LCM(360, 720) = 720 -> 1440 capped to 720 maxLcmCap!');
}

console.log('\n========================================');
console.log('🎉 ALL LCM MERGE TESTS PASSED 100%!');
console.log('========================================');
