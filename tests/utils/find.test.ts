import { describe, expect, test } from 'vitest';
import { computeMatchingScore } from '../../src/utils/find.js';

describe('computeMatchingScore', () => {
  test('input similar to keywords returns a higher score than input with less similarities', () => {
    const inputs = ['car'];
    const highScore = computeMatchingScore(inputs, ['police_car', 'vehicle', 'cars', 'transportation', 'law']);
    const lowScore = computeMatchingScore(inputs, ['fearful_face', 'face', 'scared', 'terrified']);

    expect(highScore).toBeGreaterThan(lowScore);
  });
});
