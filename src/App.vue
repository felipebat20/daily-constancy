<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>

    <div class="column is-three-quarter">
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
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import SideBar from './components/SideBar.vue';
  import Form from './components/Form.vue';
  import Task from './components/Task.vue';
  import Box from './components/shared/Box.vue';

  import TaskInterface from './interfaces/Task.interface';

  export default defineComponent({
    name: 'App',
    components: {
      SideBar,
      Form,
      Task,
      Box,
    },

    data() {
      return {
        tasks: [] as TaskInterface[],
      };
    },

    methods: {
      saveTask(task: TaskInterface) {
        this.tasks.push(task);
      },
    }
  });
</script>

<style scoped>
  .list { padding: 1.25rem; }
</style>
