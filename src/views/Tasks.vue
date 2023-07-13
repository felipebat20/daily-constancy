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
  import { defineComponent } from 'vue';

  import Form from '../components/Form.vue';
  import Task from '../components/Task.vue';
  import Box from '../components/shared/Box.vue';

  import TaskInterface from '../interfaces/Task.interface';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
      Task,
      Box,
    },

    data() {
      return {
        tasks: [] as TaskInterface[],
        dark_theme: false,
      };
    },

    methods: {
      saveTask(task: TaskInterface) {
        this.tasks.push(task);
      },

      switchDarkTheme(theme: boolean) {
        this.dark_theme = theme;
      }
    },
  });
</script>

<style scoped>
  .list { padding: 1.25rem; }

  .content {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
</style>
