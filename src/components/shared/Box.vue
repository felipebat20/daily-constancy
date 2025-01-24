<template>
  <div class="p-2 rounded bg-yellow-100 text-bold">
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ATBox'
  });
</script>

<style scoped>
  .box { background: #FAF0CA; }
</style>
