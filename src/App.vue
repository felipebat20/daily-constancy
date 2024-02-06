<template>
  <AppLayout />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import AppLayout from './layouts/AppLayout.vue';
  import TestInstall from './TestInstall.vue';

  export default defineComponent({
    name: 'App',
    components: {
      AppLayout,
    },
  });
</script>
