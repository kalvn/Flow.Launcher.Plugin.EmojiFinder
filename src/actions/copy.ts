import clipboard from 'clipboardy';
import { FlowLauncher } from '../utils/flowLauncher.js';

export function copy (text: string | undefined, displayNotificaton: boolean): void {
  if (text !== undefined) {
    clipboard.writeSync(text);

    if (displayNotificaton) {
      FlowLauncher.showMessage(text, 'Copied to clipboard!');
    }
  }
}
