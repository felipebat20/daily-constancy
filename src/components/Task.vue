<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ task.description }}
      </div>

      <div class="column">
        <TimerDisplay :timeInSeconds="task.time_spent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import TimerDisplay from './TimerDisplay.vue'

  import TaskInterface from '../interfaces/Task.interface';

  export default defineComponent({
    name: 'ATTask',
    components: { TimerDisplay },
    props: {
      task: {
        type: Object as PropType<TaskInterface>,
        required: true,
      },
    },
  });
</script>

<style scoped>
  .box { background-color: #FAF0CA; }
</style>