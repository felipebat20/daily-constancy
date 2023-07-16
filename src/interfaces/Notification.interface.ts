export enum NotificationType {
  SUCCESS,
  FAILED,
  WARNING,
}

export interface Notification {
  title: string,
  content: string,
  type: NotificationType,
  id: number,
}
