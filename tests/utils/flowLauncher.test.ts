import { afterEach, describe, expect, test, vi } from 'vitest';
import { FlowLauncher, sendJsonRpcRequest } from '../../src/utils/flowLauncher.js';

describe('FlowLauncher', () => {
  const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined);

  afterEach(() => {
    consoleMock.mockReset();
  });

  test('sendJsonRpcRequest', () => {
    sendJsonRpcRequest({
      method: 'hello',
      parameters: ['world']
    });

    expect(consoleMock).toHaveBeenCalledOnce();
    expect(consoleMock).toHaveBeenCalledWith('{"method":"hello","parameters":["world"]}');
  });

  test('showMessage', () => {
    FlowLauncher.showMessage('Fancy fair', 'Surprises to expect');

    expect(consoleMock).toHaveBeenCalledOnce();
    expect(consoleMock).toHaveBeenCalledWith('{"method":"Flow.Launcher.ShowMsg","parameters":["Fancy fair","Surprises to expect",""]}');
  });
});
