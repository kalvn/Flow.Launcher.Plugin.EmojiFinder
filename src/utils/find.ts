import fs from 'node:fs';
import type { Result } from '../types.js';
import { getIconFileName, matchesKeyword } from './utils.js';

export function find (input: string): Result[] {
  const result: Result[] = [];
  const emojis: Record<string, string[]> = JSON.parse(fs.readFileSync('./node_modules/emojilib/dist/emoji-en-US.json', 'utf8'));

  const normalizedInput = input.toLowerCase();
  const inputs = new Set(normalizedInput.split(' '));

  for (const [emoji, keywords] of Object.entries(emojis)) {
    if (matchesKeyword(Array.from(inputs), keywords)) {
      const enhancedKeywords = keywords.map(keyword => keyword.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
      const title = enhancedKeywords[0];

      result.push({
        Title: title ?? '',
        Subtitle: enhancedKeywords.slice(1).join(', '),
        JsonRPCAction: {
          method: 'copy',
          parameters: [emoji]
        },
        IcoPath: getIconFileName(emoji) ?? 'img\\app.png',
        score: 0
      });
    }
  }

  return result;
}
