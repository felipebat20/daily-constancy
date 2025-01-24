<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <TimerDisplay
      :time-in-seconds="timeInSeconds"
      :has-dark-theme="true"
    />

    <Button
      :button="getPlayButton"
      @click="createTask"
    />

    <Button
      :button="getStopButton"
      @click="stopTimer"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, ref, onBeforeUnmount } from 'vue';

  import TimerDisplay from './TimerDisplay.vue';
  import Button from './shared/Button.vue';

  import { useStore } from '@/store';

  import ButtonInterface from '../interfaces/Button.interface';

  export default defineComponent({
    name: 'ATTimer',
    components: {
      TimerDisplay,
      Button,
    },

    props: {
      taskName: {
        type: String,
        default: '',
      },

      playRequestPending: {
        type: Boolean,
        default: false,
      },

      stopRequestPending: {
        type: Boolean,
        default: false,
      }
    },

    emits: ['timeIsFinished', 'startTimer'],
    computed: {
      getTimeIsRunning(): boolean {
        return !! this.timer;
      },

      getPlayButton(): ButtonInterface {
        return {
          loading: this.playRequestPending,
          disabled: this.getTimeIsRunning,
          icon: 'fas fa-play',
          label: 'Play'
        };
      },

      getStopButton(): ButtonInterface {
        return {
          loading: this.stopRequestPending,
          disabled: ! this.getTimeIsRunning,
          icon: 'fas fa-stop',
          label: 'Stop'
        };
      },
    },

    setup(props, { emit }) {
      const store = useStore();
      const timer = ref(0);
      const timeInSeconds = ref(0);

      const active_task = computed(() => store.state.task.active_task);

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

      return {
        stopTimer,
        startTimer,
        createTask,
        timeInSeconds,
        timer,
      };
    },
  });
</script>
