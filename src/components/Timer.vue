<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="timer">
    <TimerDisplay
      :time-in-seconds="timeInSeconds"
    />

    <div class="timer__actions">
      <DSButton
        :loading="playRequestPending"
        :disabled="timeIsRunning"
        icon="play_arrow"
        :label="$q.screen.gt.sm ? 'Start' : undefined"
        variant="success"
        @click="createTask"
        aria-label="Start timer"
      />

      <DSButton
        :loading="stopRequestPending"
        :disabled="! timeIsRunning"
        icon="stop"
        :label="$q.screen.gt.sm ? 'Stop' : undefined"
        variant="danger"
        @click="stopTimer"
        aria-label="Stop timer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onBeforeUnmount } from 'vue';

import TimerDisplay from './TimerDisplay.vue';
import DSButton from '@/design-system/DSButton.vue';

import { useStore } from '@/store';

interface Props {
  taskName: string;
  playRequestPending: boolean;
  stopRequestPending: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  taskName: '',
  playRequestPending: false,
  stopRequestPending: false,
});

const emit = defineEmits(['timeIsFinished', 'startTimer']);

const store = useStore();
const timer = ref(0);
const timeInSeconds = ref(0);

const active_task = computed(() => store.state.task.active_task);

const timeIsRunning = computed(() => !! timer.value);

const stopTimer = (): void => {
  emit('timeIsFinished', timeInSeconds.value);
  handleTimeIsFinished();
};

const createTask = () => {
  emit('startTimer');
};

const handleTimeIsFinished = () => {
  clearInterval(timer.value);
  timer.value = 0;
  timeInSeconds.value = 0;
  document.title = 'Daily Constancy';
};

const startTimer = () => {
  timer.value = setInterval(() => {
    timeInSeconds.value = timeInSeconds.value + 1;
    const display_timer = new Date(timeInSeconds.value * 1000).toISOString().substring(11, 19);

    document.title = `${display_timer} - ${props.taskName}`;
  }, 1000);
};

onBeforeUnmount(() => {
  if (timer.value) {
    handleTimeIsFinished();
  }
});

watch(active_task, (state, prev_state) => {
  if (state.id && state.id !== prev_state.id) {
    clearInterval(timer.value);
    timeInSeconds.value = (active_task.value.total_time_spent || active_task.value.time_spent || 0);
    startTimer();
  }

  if (! state.id) {
    handleTimeIsFinished();
  }
});
</script>

<style scoped lang="scss">
.timer {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-4) var(--space-5);
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-accent-focus);
  }

  @media (min-width: 768px) {
    justify-content: space-between;
  }

  &__actions {
    display: flex;
    gap: var(--space-3);

    :deep(.ds-button) {
      min-width: 100px;
      height: 44px;
      font-weight: var(--font-semibold);
      letter-spacing: 0.01em;
    }
  }
}
</style>
