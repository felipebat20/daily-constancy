import { RouteLocationNormalized, Router } from 'vue-router';

import { useQuasar } from 'quasar';
import { jwt } from '@/static/storage-keys';

export function handleUserLogout() {
  const logout = ($q: ReturnType<typeof useQuasar>, route: RouteLocationNormalized, router: Router) => {
    $q.cookies.remove(jwt);

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
