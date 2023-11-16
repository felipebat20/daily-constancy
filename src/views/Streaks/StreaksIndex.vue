<template>
  <div class="streaks">
    <div class="heading-container">
      <Heading
        level="h1"
        class="title"
      >
        Your streaks
      </Heading>

      <q-btn
        to="/streaks/create"
        label="Create new streak"
        icon="add"
        no-caps
      />
    </div>

    <div>
      <q-table>
        teste
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import { Heading } from '@/design-system/Texts';

  import { useStore } from '@/store';
  import { FETCH_STREAKS } from '@/store/types/actions';

  const store = useStore();

  store.dispatch(FETCH_STREAKS);

  const streaks = computed(() => store.state.streak.streaks);
</script>

<style scoped lang="scss">
.streaks {
  padding: 1.125rem;

  .heading-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a { height: fit-content }
  }
}
</style>
