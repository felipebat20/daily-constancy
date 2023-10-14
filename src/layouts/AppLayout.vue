<template>
  <component :is="getComponent" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const getComponent = computed(() => {
    return route.meta.layoutComponent;
  });
</script>
