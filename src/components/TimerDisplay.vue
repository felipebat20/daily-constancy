<template>
  <section class="timer-display">
    <div class="timer-display__icon">
      <q-icon
        name="schedule"
        size="20px"
      />
    </div>

    <strong class="timer-display__time">
      {{ timer }}
    </strong>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFormatSecondsToNow } from '@/composables/formatTime';

interface Props {
  timeInSeconds: number;
}

const props = withDefaults(defineProps<Props>(), {
  timeInSeconds: 0,
});

const timer = computed(() => useFormatSecondsToNow({ seconds: props.timeInSeconds }));
</script>

<style scoped lang="scss">
.timer-display {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background-color: var(--bg-primary);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);

  &__icon {
    color: var(--primary);
  }

  &__time {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
}
</style>
