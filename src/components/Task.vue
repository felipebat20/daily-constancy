<template>
  <Box>
    <div
      class="columns is-clickable"
      @click="selectTask"
    >
      <div class="column is-4">
        {{ task.description || 'Unnamed Task' }}
      </div>

      <div class="column is-3">
        {{ task.project?.name ?? 'N/D' }}
      </div>

      <div class="column">
        <TimerDisplay :time-in-seconds="task.time_spent" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import TimerDisplay from '@/components/TimerDisplay.vue'
  import Box from './shared/Box.vue';

  import TaskInterface from '../interfaces/Task.interface';

  export default defineComponent({
    name: 'ATTask',
    components: {
      TimerDisplay,
      Box,
    },

    props: {
      task: {
        type: Object as PropType<TaskInterface>,
        required: true,
      },
    },

    emits: ['selected-task'],
    setup(props, { emit }) {
      const selectTask = () => {
        emit('selected-task', props.task);
      };

      return { selectTask }
    },
  });
</script>

<style scoped>
  .box { background-color: #FAF0CA; }
</style>
