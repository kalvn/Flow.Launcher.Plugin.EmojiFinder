import { find } from '../utils/find.js';
import { sendJsonRpcRequest } from '../utils/flowLauncher.js';

export function query (input: string | undefined): void {
  const result = find(input ?? '');
  sendJsonRpcRequest({ result });
}
