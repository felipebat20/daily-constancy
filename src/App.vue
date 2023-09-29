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
    --bg-primary: #f2f6f8;
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

  .margin-menu {
    margin-left: 4rem;
    width: 100%;
  }
</style>
