// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 10, b: 0, action: Action.Divide, expected: Infinity },
  { a: '3423', b: [1], action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected for certain action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
