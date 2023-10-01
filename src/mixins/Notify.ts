import { NotificationType } from '@/interfaces/Notification.interface';

import { store } from '@/store';

import { NEW_NOTIFICATION } from '@/store/types/mutations';

export const notifyMixin =  {
  methods: {
    notify(type: NotificationType, title: string, content: string): void {
      store.commit(NEW_NOTIFICATION, {
        title,
        content,
        type,
      });
    },
  },
};
