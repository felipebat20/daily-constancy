<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <TimerDisplay :timeInSeconds="timeInSeconds" />

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
  import { defineComponent } from 'vue';

  import TimerDisplay from './TimerDisplay.vue'
  import Button from './shared/Button.vue'

  import ButtonInterface from '@/interfaces/Button.interface';

  export default defineComponent({
    name: 'ATTimer',
    components: {
      TimerDisplay,
      Button,
    },

    emits: ['timeIsFinished'],
    data: () => ({
      timeInSeconds: 0,
      timer: 0,
    }),

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

    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          this.timeInSeconds += 1;
        }, 1000);
      },

      stopTimer(): void {
        clearInterval(this.timer);
        this.timer = 0;
        this.$emit('timeIsFinished', this.timeInSeconds)
        this.timeInSeconds = 0;
      },
    },
  })

</script>