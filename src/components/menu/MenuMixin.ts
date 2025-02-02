import { useRoute, useRouter } from 'vue-router';

import { jwt } from '@/static/storage-keys';

export function handleUserLogout() {
  const logout = ($q: { cookies: { remove: (arg0: string) => void }, notify: (arg0: { type: string, progress: boolean, icon: string, message: string, position: string }) => void }) => {
    const route = useRoute();
    const router = useRouter();

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
