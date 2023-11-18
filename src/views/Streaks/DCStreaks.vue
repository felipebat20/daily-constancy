<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { useStore } from '@/store';
  import { FETCH_PROJECTS } from '@/store/types/actions';

  const store = useStore();

  store.dispatch(FETCH_PROJECTS);
</script>
