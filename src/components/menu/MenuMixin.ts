import { useRoute, useRouter } from 'vue-router';

import { useStore } from '@/store';
import { FETCH_PROJECTS, FETCH_TASKS } from '@/store/types/actions';
import { jwt } from '@/static/storage-keys';

export function handleUserLogout() {
  const logout = ($q: any) => {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    $q.cookies.remove(jwt);

    store.dispatch(FETCH_TASKS);
    store.dispatch(FETCH_PROJECTS);

    if (route.name !== 'login') {
      router.push({ name: 'login' });
    }

    $q.notify({
      type: 'positive',
      progress: true,
      icon: 'done',
      message: 'You have been logout.',
      position: 'top',
    });
  };

  return { logout };
}
