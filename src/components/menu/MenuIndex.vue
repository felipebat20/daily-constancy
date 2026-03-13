<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useQuasar } from 'quasar';

  import MenuItem from './MenuItem.vue';
  import { jwtToken } from '@/hooks/verify_api';

  const $q = useQuasar();
  const user_is_authenticated = computed(() => !! jwtToken());

  const menuItems = computed(() => [
    { name: 'tasks', icon: 'task_alt', label: 'Tasks', to: '/' },
    { name: 'projects', icon: 'folder', label: 'Projects', to: '/projects' },
    { name: 'reports', icon: 'bar_chart', label: 'Reports', to: '/reports' },
    { name: 'streaks', icon: 'whatshot', label: 'Streaks', to: '/streaks', hide: ! user_is_authenticated.value },
    { name: 'profile', icon: 'person', label: 'Profile', to: '/login', hide: user_is_authenticated.value },
  ]);
</script>

<template>
  <nav class="menu">
    <ul class="menu__list">
      <MenuItem
        v-for="menuItem in menuItems"
        :key="menuItem.name"
        :menu-item="menuItem"
      />
    </ul>
  </nav>
</template>

<style scoped lang="scss">
  .menu {
    width: 100%;
  }

  .menu__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }
</style>
