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
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
  border-radius: var(--radius-xl);
  border: 2px solid var(--primary-accent-focus);
  box-shadow: var(--shadow-primary-accent);
  transition: all var(--transition-base);

  &__icon {
    color: var(--primary-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    background-color: var(--primary-accent-focus);
  }

  &__time {
    font-size: var(--text-3xl);
    font-weight: var(--font-extrabold);
    color: var(--primary);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
