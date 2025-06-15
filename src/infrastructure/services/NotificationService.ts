export class NotificationService {
    async sendNotification(message: string): Promise<void> {
      // ここで実際の通知送信ロジックを実装
      // 例: iOSショートカット連携、プッシュ通知など
      console.log(`Notification sent: ${message}`);
    }
  }