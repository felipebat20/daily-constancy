import { NotificationType } from '@/interfaces/Notification.interface';

import { NEW_NOTIFICATION } from '@/store/types/mutations';

import { store } from '@/store';

type Notify = {
  notify: (type: NotificationType, title: string, content: string) => void
}

export default () : Notify => {
  const notify = (type: NotificationType, title: string, content: string) : void => {
    store.commit(NEW_NOTIFICATION, {
      type,
      title,
      content,
    });
  }

  return { notify };
}