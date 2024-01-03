<template>
  <AppLayout />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import AppLayout from './layouts/AppLayout.vue';

  export default defineComponent({
    name: 'App',
    components: {
      AppLayout,
    },
  });
</script>

<style scoped>
  main {
    min-height: 100vh;
    --bg-primary: #FFF;
    --text-primary: #000;
    --accent-background: #FFF;
    --placeholder-color: rgba(54,54,54,.3);
    --border-color: rgba(0,0,0,.12);
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
</style>
