export const FlowLauncher = {
  /**
   * Shows a desktop notification.
   * @param title The notification title.
   * @param subtitle The notification text content.
   */
  showMessage: function (title: string, subtitle: string) {
    console.log(JSON.stringify({
      method: 'Flow.Launcher.ShowMsg',
      parameters: [
        title,
        subtitle,
        ''
      ]
    }));
  }
};

export function sendJsonRpcRequest (req: any): void {
  console.log(JSON.stringify(req));
}
