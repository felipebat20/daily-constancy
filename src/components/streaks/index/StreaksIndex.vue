<template>
  <div class="streaks-index">
    <DSPageHeader
      title="Your Streaks"
    >
      <template #right>
        <DSButton
          icon="add"
          label="Create New Streak"
          @click="handleCreateButtonClick"
        />
      </template>
    </DSPageHeader>

    <div
      v-if="request_pending"
      class="streaks-index__loading"
    >
      <q-spinner-gears
        color="primary"
        size="3rem"
      />
    </div>

    <div v-else>
      <StreaksTable :streaks="streaks" />
    </div>

    <DCStreaksCreate ref="createStreakModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import StreaksTable from '@/components/streaks/DCStreaksTable.vue';
import DCStreaksCreate from '@/components/streaks/partials/DCStreaksCreate.vue';

import DSPageHeader from '@/design-system/DSPageHeader.vue';
import DSButton from '@/design-system/DSButton.vue';

import { useStore } from '@/store';
import { FETCH_STREAKS } from '@/store/types/actions';

const store = useStore();
const request_pending = computed(() => {
  const { streak: streak_request_pending = {} } = store.state.requests_pending;
  return streak_request_pending.fetch_all;
});

store.dispatch(FETCH_STREAKS);

const streaks = computed(() => store.state.streak.streaks);
const createStreakModal = ref(DCStreaksCreate);

const handleCreateButtonClick = () => {
  createStreakModal.value.show_modal = true;
};
</script>

<style scoped lang="scss">
.streaks-index {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-12);
  }
}
</style>
