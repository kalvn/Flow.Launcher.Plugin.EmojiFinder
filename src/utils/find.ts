import fs from 'node:fs';
import { matchesKeyword } from './utils.js';

export type FindResult = {
  title: string
  keywords: string[]
  emoji: string
};

export function find (input: string): FindResult[] {
  const result: FindResult[] = [];
  const emojis: Record<string, string[]> = JSON.parse(fs.readFileSync('./node_modules/emojilib/dist/emoji-en-US.json', 'utf8'));

  const normalizedInput = input.toLowerCase();
  const inputs = new Set(normalizedInput.split(' '));

  for (const [emoji, keywords] of Object.entries(emojis)) {
    if (matchesKeyword(Array.from(inputs), keywords)) {
      const enhancedKeywords = keywords.map(keyword => keyword.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
      const title = enhancedKeywords[0];

      result.push({
        title: title ?? '',
        keywords: enhancedKeywords.slice(1),
        emoji
      });
    }
  }

  return result;
}
