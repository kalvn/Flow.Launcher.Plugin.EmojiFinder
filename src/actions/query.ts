import { find } from '../utils/find.js';
import { sendJsonRpcRequest } from '../utils/FlowLauncher.js';

export function query (input: string | undefined): void {
  const result = find(input ?? '');
  sendJsonRpcRequest({ result });
}
