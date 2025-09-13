import type { Settings } from '../types.js';
import { find } from '../utils/find.js';
import { sendJsonRpcRequest } from '../utils/flowLauncher.js';
import { getIconFileName } from '../utils/utils.js';

export function query (input: string | undefined, settings: Settings): void {
  const findings = find(input ?? '');

  const request = findings.map(f => {
    return {
      Title: f.title,
      Subtitle: f.keywords.join(', '),
      JsonRPCAction: {
        method: 'copy',
        parameters: [f.emoji, settings.enableNotification]
      },
      IcoPath: getIconFileName(f.emoji) ?? 'img\\app.png',
      score: 0
    };
  });

  sendJsonRpcRequest({ result: request });
}
