import { appApi } from './AppApi';

export interface NotificationSendRequestType {
  title: string;
  content: string;
}

export class NotificationService {
  public static async getNotificationPreview() {
    const response = await appApi.get('/notification', {
      params: {
        size: 5,
      },
    });
    return response.data.data.content;
  }

  public static async getNotification(projectNo?: number) {
    const response = await appApi.get('/notification', {
      params: {
        projectNo,
        size: 12,
      },
    });
    return response.data.data;
  }

  public static async getNotificationDetail(projectNo?: number) {
    const response = await appApi.get(`/notification/${projectNo}`);
    return response.data.data;
  }

  public static async postNotification(
    notificationSendRequestDto: NotificationSendRequestType
  ) {
    await appApi.post(`/notification`, notificationSendRequestDto);
  }
}
