<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{'dark-theme': dark_theme }"
  >
    <div class="column is-one-quarter">
      <SideBar @on-switch-theme="switchDarkTheme" />
    </div>

    <div class="column is-three-quarter content">
      <Notification />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import SideBar from './components/SideBar.vue';
  import Notification from './components/Notifications.vue';

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

    methods: {
      switchDarkTheme(theme: boolean) {
        this.dark_theme = theme;
      }
    },
  });
</script>

<style scoped>
  main {
    --bg-primary: #FFF;
    --text-primary: #000;
  }

  main.dark-theme {
    --bg-primary: #2b2d42;
    --text-primary: #ddd;
  }

  .content {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
</style>
