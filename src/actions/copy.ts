import clipboard from 'clipboardy';
import { FlowLauncher } from '../utils/FlowLauncher.js';

export function copy (text: string | undefined): void {
  if (text !== undefined) {
    clipboard.writeSync(text);
    FlowLauncher.showMessage(text, 'Copied to clipboard!');
  }
}
