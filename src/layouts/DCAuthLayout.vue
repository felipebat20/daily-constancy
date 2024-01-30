<template>
  <div class="auth-page">
    <q-layout class="auth-container">
      <q-page-container
        :style="{ 'padding-top': '66px', 'min-height': '100vh' }"
        class="page-container"
      >
        <div class="title-container">
          <router-link to="/">
            <q-icon
              name="whatshot"
              size="2rem"
              color="white"
            />

            <h1>
              Daily Constancy
            </h1>
          </router-link>
        </div>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
  import { useQuasar } from 'quasar';

  const $q = useQuasar();

  $q.dark.set(false);
</script>

<style scoped lang="scss">
.auth-page { background-color: #0d3b66; }
  .auth-container {
    max-width: 1140px;
    margin: 0 auto;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    .title-container a {
      display: flex;
      gap: 6px;

      h1 {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 500;
        color: white;
      }
    }
  }
</style>
