import fs from 'node:fs';
import { matchesKeyword } from './utils.js';

export type FindResult = {
  title: string
  keywords: string[]
  emoji: string
  score: number
};

/**
 * Computes a matching score between user input and a list of keywords.
 * @param inputs List of words typed by the user.
 * @param keywords List of keywords to compare to user input.
 * @returns A score based on how likely the user expect to see the entry described by passed keywords.
 */
export function computeMatchingScore (inputs: string[], keywords: string[]): number {
  let score = 0;
  let keywordIndex = 0;

  for (const keyword of keywords) {
    for (const keywordPart of keyword.split('_')) {
      for (const input of inputs) {
        if (keywordPart.includes(input)) {
          score++;

          if (keywordPart === input) {
            score += 5;
          }
        }

        if (keywordPart.startsWith(input)) {
          score++;
        }
      }
    }

    if (keywordIndex === 0) {
      score *= 2;
    }

    keywordIndex++;
  }

  return score;
}

export function find (input: string): FindResult[] {
  const result: FindResult[] = [];
  const emojis: Record<string, string[]> = JSON.parse(fs.readFileSync('./node_modules/emojilib/dist/emoji-en-US.json', 'utf8'));

  const normalizedInput = input.toLowerCase();
  const inputs = new Set(normalizedInput.split(' '));

  for (const [emoji, keywords] of Object.entries(emojis)) {
    if (matchesKeyword(Array.from(inputs), keywords)) {
      // Make keywords readable by removing underscores and making first letter uppercase.
      const enhancedKeywords = keywords.map(keyword => keyword.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
      const title = enhancedKeywords[0];

      result.push({
        title: title ?? '',
        keywords: enhancedKeywords.slice(1),
        emoji,
        score: computeMatchingScore(Array.from(inputs), keywords)
      });
    }
  }

  return result.sort((a, b) => a.score > b.score ? -1 : 1);
}
