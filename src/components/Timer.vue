<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <TimerDisplay :time-in-seconds="timeInSeconds" />

    <Button
      :button="getPlayButton"
      @click="startTimer"
    />

    <Button
      :button="getStopButton"
      @click="stopTimer"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, ref, onBeforeUnmount } from 'vue';

  import TimerDisplay from './TimerDisplay.vue'
  import Button from './shared/Button.vue'

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
      }
    },

    emits: ['timeIsFinished'],
    computed: {
      getTimeIsRunning(): boolean {
        return !! this.timer;
      },

      getPlayButton(): ButtonInterface {
        return {
          disabled: this.getTimeIsRunning,
          icon: 'fas fa-play',
          label: 'play'
        };
      },

      getStopButton(): ButtonInterface {
        return {
          disabled: ! this.getTimeIsRunning,
          icon: 'fas fa-stop',
          label: 'stop'
        };
      },
    },

    setup(props, { emit }) {
      const store = useStore();
      const timer = ref(0);
      const timeInSeconds = ref(0);

      const active_task = computed(() => store.state.task.active_task);

      const stopTimer = (): void => {
        clearInterval(timer.value);
        timer.value = 0;
        emit('timeIsFinished', timeInSeconds.value)
        timeInSeconds.value = 0;
        document.title = 'Alura tracker';
      };


      const startTimer = () => {
        timer.value = setInterval(() => {
          timeInSeconds.value = timeInSeconds.value + 1;
          const display_timer = new Date(timeInSeconds.value * 1000).toISOString().substring(11, 19);

          document.title = `${display_timer} - ${props.taskName}`;
        }, 1000);
      };

      onBeforeUnmount(() => stopTimer());
      watch(active_task, (state, prev_state) => {
        if (state.id && state.id !== prev_state.id) {
          clearInterval(timer.value);
          timeInSeconds.value = active_task.value.time_spent;
          startTimer();
        }
      });

      return {
        stopTimer,
        startTimer,
        timeInSeconds,
        timer,
      };
    },
  });
</script>
