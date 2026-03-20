<template>
  <div class="auth-layout">
    <main class="auth-layout__main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';

const $q = useQuasar();
$q.dark.set(false);
</script>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
  background-color: var(--bg-tertiary);
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
  }
}
</style>
