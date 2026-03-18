<template>
  <main class="app-layout">
    <aside class="app-sidebar">
      <SideBar />
    </aside>

    <div
      class="app-content"
      :class="{
        'app-content--desktop': $q.screen.gt.xs,
        'app-content--mobile': ! $q.screen.gt.xs,
      }"
    >
      <Notification />
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';

  import SideBar from '../components/SideBar.vue';
  import Notification from '../components/Notifications.vue';

  import { useStore } from '../store';
  import { VERIFY_API } from '../store/types/actions';

  document.title = 'Daily Constancy';

  const store = useStore();

  onMounted(() => {
    store.dispatch(VERIFY_API);
  });
</script>

<style scoped>
  .app-layout {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color var(--transition-slow), color var(--transition-slow);
  }

  .app-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 100;
  }

  .app-content {
    flex: 1;
    min-height: 100vh;
    transition: all var(--transition-slow);
  }

  .app-content--desktop {
    margin-left: 4.5rem;
    padding: var(--space-8);
  }

  .app-content--mobile {
    width: 100%;
    padding-top: 56px;
    padding-bottom: 64px;
  }
</style>
