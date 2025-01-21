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

    <div
      class="content-side-bar"
      :class="{
        'margin-menu': $q.screen.gt.xs,
        'mobile': ! $q.screen.gt.xs,
      }"
    >
      <Notification />
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';

  import SideBar from '../components/SideBar.vue';
  import Notification from '../components/Notifications.vue';

  import { useStore } from '../store';
  import { VERIFY_API } from '../store/types/actions';

  const dark_theme = ref(false);

  document.title = 'Daily Constancy';
  const store = useStore();
  const $q = useQuasar();

  store.dispatch(VERIFY_API);

  const switchDarkTheme = (theme: boolean) => dark_theme.value = theme;
</script>

<style scoped>
  main {
    min-height: 100vh;
    --bg-primary: #FFF;
    --text-primary: #000;
    --accent-background: #FFF;
    --placeholder-color: rgba(54, 54, 54, .3);
    --border-color: rgba(0, 0, 0, .12);
  }

  main.dark-theme {
    --bg-primary: #181a1b;
    --text-primary: #e8e6e3;
    --border-color: rgba(140, 130, 115, 0.12);
    --placeholder-color: rgb(232, 230, 227);
    --accent-background: rgb(24, 26, 27)
  }

  .content-side-bar {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .margin-menu {
    margin-left: 4rem;
    width: 100%;
  }

  .mobile {
    width: 100%;
    padding-top: 56px;
    padding-bottom: 60px;
  }
</style>
