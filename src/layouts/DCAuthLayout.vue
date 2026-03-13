<template>
  <div class="auth-layout">
    <header class="auth-layout__header">
      <router-link
        to="/"
        class="auth-layout__logo"
      >
        <q-icon
          name="whatshot"
          size="2rem"
          color="white"
        />

        <h1 class="auth-layout__title">
          Daily Constancy
        </h1>
      </router-link>
    </header>

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
  background-color: #027BE3;
  display: flex;
  flex-direction: column;

  &__header {
    padding: var(--space-6) var(--space-8);
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    color: white;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__title {
    margin: 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    letter-spacing: 0.05em;
  }

  &__main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
  }
}
</style>
