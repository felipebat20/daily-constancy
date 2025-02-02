<template>
  <div class="streaks">
    <div class="heading-container py-2">
      <Heading
        level="h1"
        class="text-2xl font-bold"
      >
        Your streaks
      </Heading>

      <q-btn
        no-caps
        label="Create new streak"
        class="custom-border"
        @click="handleCreateButtonClick"
      >
        <q-tooltip>
          Create new streak
        </q-tooltip>
      </q-btn>
    </div>

    <div
      v-if="request_pending"
      class="flex items-center justify-center"
    >
      <QSpinnerFacebook
        color="yellow"
        background-color="purple"
        size="140"
      />
    </div>

    <div v-else>
      <StreaksTable :streaks="streaks" />
    </div>

    <DCStreaksCreate ref="createStreakModal" />
  </div>
</template>

<script setup lang="ts">
  import { QSpinnerFacebook } from 'quasar';
  import { computed, ref } from 'vue';

  import StreaksTable from '@/components/streaks/DCStreaksTable.vue';
  import DCStreaksCreate from '@/components/streaks/partials/DCStreaksCreate.vue';

  import { Heading } from '@/design-system/Texts';

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
