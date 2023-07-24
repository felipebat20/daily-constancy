<template>
  <Box>
    <div
      class="columns is-clickable"
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

      <div class="column">
        <button
          class="button"
          @click="selectTask"
        >
          <span class="icon is-small">
            <i class="fas fa-pencil-alt" />
          </span>
        </button>

        <button
          class="button ml-2 is-danger"
          @click="deleteTask"
        >
          <span class="icon is-small">
            <i class="fas fa-trash" />
          </span>
        </button>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import TimerDisplay from '@/components/TimerDisplay.vue'
  import Box from './shared/Box.vue';

  import TaskInterface from '../interfaces/Task.interface';
  import { useStore } from '@/store';
  import { DELETE_TASK } from '@/store/types/actions';

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
      const store = useStore();

      const selectTask = () => {
        emit('selected-task', props.task);
      };

      const deleteTask = () => {
        store.dispatch(DELETE_TASK, props.task);
      }

      return {
        deleteTask,
        selectTask,
      }
    },
  });
</script>

<style scoped>
  .box { background-color: #FAF0CA; }
</style>
