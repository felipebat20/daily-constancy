<template>
  <div class="bg-grey-2">
    <q-layout class="auth-container">
      <q-header class="bg-grey-2 q-my-md">
        <q-toolbar>
          <q-toolbar-title class="text-black text-h5">
            Daily Constancy
          </q-toolbar-title>

          <span class="text-black">
            Não tem um conta ainda?

            <router-link :to="{ name: 'Tasks' }">
              Inscrever-se
            </router-link>
          </span>
        </q-toolbar>
      </q-header>

      <q-page-container
        :style="{ 'padding-top': '66px', 'min-height': '100vh' }"
        class="page-container"
      >
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
  .container {
    // background-color: ;
  }
  .auth-container {
    max-width: 1140px;
    margin: 0 auto;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
</style>
