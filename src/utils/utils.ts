// @ts-expect-error The lib does not support ESM.
import emojiUnicode from 'emoji-unicode';

export function matchesKeyword(inputs: string[], keywords: string[]): boolean {
  return inputs.every(input =>
    keywords.some(keyword =>
      keyword.includes(input)
    )
  );
}

export function getIconFileName (emoji: string): string | undefined {
  const codes = emojiUnicode(emoji);
  if (typeof codes === 'string') {
    return 'icons\\' + codes.toLowerCase().split(' ').join('-') + '.png';
  }
}

