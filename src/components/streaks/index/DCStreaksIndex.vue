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
        label="Create new streak"
        icon="add"
        unelevated
        no-caps
        class="custom-border"
        @click="handleCreateButtonClick"
      />
    </div>

    <div>
      <StreaksTable :streaks="streaks" />
    </div>

    <DCStreaksCreate ref="createStreakModal" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import StreaksTable from '@/components/streaks/DCStreaksTable.vue';
  import DCStreaksCreate from '@/components/streaks/partials/DCStreaksCreate.vue';

  import { Heading } from '@/design-system/Texts';

  import { useStore } from '@/store';
  import { FETCH_STREAKS } from '@/store/types/actions';

  const store = useStore();

  store.dispatch(FETCH_STREAKS);

  const streaks = computed(() => store.state.streak.streaks);

  const createStreakModal = ref(DCStreaksCreate);

  const handleCreateButtonClick = () => createStreakModal.value.show_modal = true;
</script>

<style scoped lang="scss">
.streaks {
  padding: 1.125rem;

  .heading-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button { height: fit-content }
  }

  .title { color: var(--text-primary); }
  .custom-border { border: 1px solid var(--border-color); }
}
</style>
