<template>
  <DSCard
    class="streaks-home-card"
    title="Habits in Progress"
    shadow="md"
  >
    <template #content>
      <div
        v-if="request_pending"
        class="streaks-home-card__loading"
      >
        <q-spinner-gears
          color="primary"
          size="2rem"
        />

        <span>Loading streaks...</span>
      </div>

      <DSEmptyState
        v-else-if="! streaks.length"
        title="No Streaks Found"
        message="Start tracking your habits to build consistency!"
        icon="whatshot"
      />

      <div
        v-else
        class="streaks-home-card__list"
      >
        <div
          v-for="streak in streaks"
          :key="streak.id"
          class="streaks-home-card__item"
        >
          <div class="streaks-home-card__item-left">
            <div class="streaks-home-card__offensive">
              <StreakOffensive :offensive="streak.offensive" />
            </div>

            <span class="streaks-home-card__name">{{ streak.name }}</span>
          </div>

          <DSButton
            icon="visibility"
            variant="outline"
            size="sm"
            @click="$router.push(`/streaks/${streak.id}`)"
            aria-label="View streak"
          />
        </div>
      </div>
    </template>
  </DSCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import StreakOffensive from '@/design-system/StreakOffensive.vue';
import DSCard from '@/design-system/DSCard.vue';
import DSEmptyState from '@/design-system/DSEmptyState.vue';
import DSButton from '@/design-system/DSButton.vue';

import { useStore } from '@/store';
import { FETCH_STREAKS } from '@/store/types/actions';

const store = useStore();
store.dispatch(FETCH_STREAKS);

const streaks = computed(() => store.state.streak.streaks);

const request_pending = computed(() => {
  const { streak: streak_request_pending = {} } = store.state.requests_pending;
  return streak_request_pending.fetch_all;
});
</script>

<style scoped lang="scss">
.streaks-home-card {
  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }
  }

  &__item-left {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex: 1;
  }

  &__offensive {
    flex-shrink: 0;
  }

  &__name {
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    color: var(--text-primary);
  }

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-6);

    span {
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }
  }
}
</style>
