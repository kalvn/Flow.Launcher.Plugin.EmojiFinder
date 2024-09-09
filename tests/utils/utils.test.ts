import { describe, expect, test } from 'vitest';
import { getIconFileName, matchesKeyword } from '../../src/utils/utils.js';

describe('matchesKeyword', () => {
  const keywords = [
    'face',
    'smile',
    'happy',
    ':D',
    'yellow_circle'
  ];

  test('single input', () => {
    expect(matchesKeyword(['smile'], keywords)).toBe(true);
    expect(matchesKeyword(['notavalidkeyword'], keywords)).toBe(false);
  });

  test('multiple inputs', () => {
    expect(matchesKeyword(['face', 'happy'], keywords)).toBe(true);
    expect(matchesKeyword(['face', 'notavalidkeyword'], keywords)).toBe(false);
  });

  test('case sensitiveness', () => {
    expect(matchesKeyword(['Face', 'haPPy'], keywords)).toBe(false);
  });

  test('non-letter input', () => {
    expect(matchesKeyword([':D'], keywords)).toBe(true);
    expect(matchesKeyword(['$XD'], keywords)).toBe(false);
  });

  test('partial input match', () => {
    expect(matchesKeyword(['yellow'], keywords)).toBe(true);
    expect(matchesKeyword(['cir'], keywords)).toBe(true);
    expect(matchesKeyword(['fac'], keywords)).toBe(true);
    expect(matchesKeyword(['yellowish'], keywords)).toBe(false);
  });
});

describe('getIconFileName', () => {
  test('returns the appropriate icon file name for simple emoji', () => {
    expect(getIconFileName('🙈')).toBe('icons\\1f648.png');
  });

  test('returns the appropriate icon file name for composed emojis', () => {
    expect(getIconFileName('👨‍👩‍👧‍👦')).toBe('icons\\1f468-200d-1f469-200d-1f467-200d-1f466.png');
    expect(getIconFileName('👩‍💻')).toBe('icons\\1f469-200d-1f4bb.png');
  });
});
