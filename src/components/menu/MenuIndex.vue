<script setup lang="ts">
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';

  import MenuItem from './MenuItem.vue';

  import { handleUserLogout } from './MenuMixin';

  import { jwtToken } from '@/hooks/verify_api';

  const $q = useQuasar();

  const user_is_authenticated = ref(!! jwtToken());

  const { logout } = handleUserLogout();

  const handleLogout = () => {
    logout($q);
  };

  const menuItems = [
    { name: 'tasks', icon: 'tasks', label: 'Tasks', to: '/' },
    { name: 'projects', icon: 'account_tree', label: 'Projects', to: '/projects' },
    { name: 'reports', icon: 'analytics', label: 'Reports', to: '/reports' },
    { name: 'streaks', icon: 'whatshot', label: 'Streaks', to: '/streaks', hide: ! user_is_authenticated.value },
    { name: 'profile', icon: 'account_circle', label: 'Profile', to: '/login', hide: user_is_authenticated.value },
  ];
</script>

<template>
  <aside class="menu">
    <ul class="list-none text-left flex justify-center gap-2">
      <MenuItem
        v-for="menuItem in menuItems"
        :key="menuItem.name"
        :menu-item="menuItem"
      />

      <li
        v-if="user_is_authenticated && ! $q.screen.gt.xs"
        class="px-0"
      >
        <q-btn
          v-if="user_is_authenticated"
          class="link flex justify-center q-pa-sm"
          flat
          @click="handleLogout"
        >
          <q-icon
            size="24px"
            name="logout"
            color="white"
          />

          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[8, 8]"
            class="bg-dark"
          >
            Logout
          </q-tooltip>
        </q-btn>
      </li>
    </ul>
  </aside>
</template>
