<template>
  <Form @save-task="saveTask" />

  <div class="list">
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
    />

    <Box v-if="! tasks.length">
      Are you kidding with your future? :(
    </Box>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import Form from '@/components/Form.vue';
  import Task from '@/components/Task.vue';
  import Box from '@/components/shared/Box.vue';

  import TaskInterface from '@/interfaces/Task.interface';
  import { useStore } from '@/store';
  import { CREATE_NEW_TASK, FETCH_TASKS } from '@/store/types/actions';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
      Task,
      Box,
    },

    setup() {
      const store = useStore();
      store.dispatch(FETCH_TASKS);

      return {
        store,
        tasks: computed(() => store.state.tasks),
      };
    },

    methods: {
      saveTask(task: TaskInterface) {
        this.store.dispatch(CREATE_NEW_TASK, task);
      },
    },
  });
</script>

<style scoped>
  .list { padding: 1.25rem; }
</style>
