<template>
  <main
    class="is-flex is-flex-direction-row"
    :class="{'dark-theme': dark_theme }"
  >
    <div
      ref="side_bar"
      class="content-side-bar"
    >
      <SideBar @on-switch-theme="switchDarkTheme" />
    </div>

    <div class="margin-menu content-side-bar">
      <Notification />
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import SideBar from '../components/SideBar.vue';
  import Notification from '../components/Notifications.vue';

  import { useStore } from '../store';
  import { VERIFY_API } from '../store/types/actions';

  const dark_theme = ref(false);

  document.title = 'Daily Constancy';
  const store = useStore();

  store.dispatch(VERIFY_API);

  const switchDarkTheme = (theme: boolean) => dark_theme.value = theme;
</script>

<style scoped>
  .content-side-bar {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .margin-menu {
    margin-left: 4rem;
    width: 100%;
  }
</style>
