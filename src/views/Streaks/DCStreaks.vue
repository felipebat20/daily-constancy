<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store';
import { FETCH_PROJECTS } from '@/store/types/actions';

const store = useStore();

onMounted(() => {
  store.dispatch(FETCH_PROJECTS);
});
</script>
