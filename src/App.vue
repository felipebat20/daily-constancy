<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{'dark-theme': dark_theme }"
  >
    <div
      ref="side_bar"
      class="column is-2 content-side-bar"
    >
      <SideBar @on-switch-theme="switchDarkTheme" />
    </div>

    <div class="column is-10 content-side-bar">
      <Notification />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import SideBar from './components/SideBar.vue';
  import Notification from './components/Notifications.vue';

  import { useStore } from './store';
  import { VERIFY_API } from '@/store/types/actions';

  export default defineComponent({
    name: 'App',
    components: {
      SideBar,
      Notification,
    },
    data() {
      return {
        dark_theme: false,
      };
    },

    setup() {
      document.title = 'Alura tracker';
      const store = useStore();

      store.dispatch(VERIFY_API);
    },

    methods: {
      switchDarkTheme(theme: boolean) {
        this.dark_theme = theme;
      }
    },
  });
</script>

<style scoped>
  main {
    min-height: 100vh;
    --bg-primary: #FFF;
    --text-primary: #000;
  }

  main.dark-theme {
    --bg-primary: #2b2d42;
    --text-primary: #ddd;
  }

  .content-side-bar {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
</style>
