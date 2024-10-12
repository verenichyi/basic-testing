// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 1, action: Action.Add })).toBe(11);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Subtract })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: 'Invalid action' })).toBe(
      null,
    );
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: '1', action: Action.Add })).toBe(null);
  });
});
