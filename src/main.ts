import process from 'node:process';
import fs from 'node:fs';
import clipboard from 'clipboardy';
// @ts-expect-error The lib does not support ESM.
import emojiUnicode from 'emoji-unicode';
import type { Arguments, Result } from './types.js';

const args: Arguments = JSON.parse(process.argv[2] ?? '{}');
const { method, parameters } = args;

if (method === 'query') {
  const result = query(parameters[0]);
  console.log(JSON.stringify(
    {
      result
    }
  ));
}

if (method === 'copy') {
  copy(parameters[0]);
}

function query (input: string | undefined): Result[] {
  return find(input ?? '');
}

function copy (text: string | undefined) {
  if (text !== undefined) {
    clipboard.writeSync(text);
    showMessage(text, 'Copied to clipboard!');
  }
}

// --- Helpers ---

function find (input: string): Result[] {
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
        score : 0
      });
    }
  }

  return result;
}

function matchesKeyword(inputs: string[], keywords: string[]): boolean {
  return inputs.every(input =>
    keywords.some(keyword =>
      keyword.includes(input)
    )
  );
}

function getIconFileName (emoji: string): string | undefined {
  const codes = emojiUnicode(emoji);
  if (typeof codes === 'string') {
    return 'icons\\' + codes.toLowerCase().split(' ').join('-') + '.png';
  }
}

/**
 * Shows a desktop notification.
 * @param title The notification title.
 * @param subtitle The notification text content.
 */
function showMessage (title: string, subtitle: string) {
  console.log(JSON.stringify({
    method: 'Flow.Launcher.ShowMsg',
    parameters: [
      title,
      subtitle,
      ''
    ]
  }));
}
