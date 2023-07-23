<template>
  <Form @save-task="saveTask" />

  <div class="list">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          v-model="task_filter"
          class="input"
          type="text"
          placeholder="Search a task"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-search" />
        </span>
      </p>
    </div>

    <Modal
      v-if="selected_task"
      :show="!! selected_task"
    >
      <template #header>
        <p class="modal-card-title mb-0">
          Edit your task
        </p>

        <button
          class="delete"
          aria-label="close"
          @click="clearSelectedTask"
        />
      </template>

      <template #body>
        <form @submit.prevent.stop="updateTask">
          <div class="field">
            <label
              for="projectName"
              class="label"
            >
              Description
            </label>

            <input
              v-model="selected_task.description"
              type="text"
              class="input"
              id="projectName"
              autofocus
            >
          </div>
        </form>
      </template>

      <template #footer>
        <button
          @click="updateTask"
          class="button is-success"
        >
          Save task
        </button>

        <button
          class="button"
          @click="clearSelectedTask"
        >
          Cancel
        </button>
      </template>
    </Modal>

    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @selected-task="updateSelectedTask"
    />

    <Box v-if="! tasks.length">
      Are you kidding with your future? :(
    </Box>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';

  import Form from '@/components/Form.vue';
  import Task from '@/components/Task.vue';
  import Box from '@/components/shared/Box.vue';
  import Modal from '@/components/shared/Modal.vue';

  import TaskInterface from '@/interfaces/Task.interface';
  import { useStore } from '@/store';
  import { CREATE_NEW_TASK, FETCH_TASKS, UPDATE_TASK } from '@/store/types/actions';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
      Task,
      Box,
      Modal,
    },

    data() {
      return {
        selected_task: null as TaskInterface | null,
      };
    },

    setup() {
      const store = useStore();
      const task_filter = ref('');

      store.dispatch(FETCH_TASKS);
      watch(task_filter, () =>{
        store.dispatch(FETCH_TASKS, task_filter.value);
      });

      return {
        store,
        tasks: computed(() => store.state.task.tasks),
        task_filter,
      };
    },

    methods: {
      saveTask(task: TaskInterface): void {
        this.store.dispatch(CREATE_NEW_TASK, task);
      },

      updateSelectedTask(task: TaskInterface): void {
        this.selected_task = task;
      },

      clearSelectedTask(): void {
        this.selected_task = null;
      },

      updateTask() {
        return this.store.dispatch(UPDATE_TASK, this.selected_task)
          .then(() => this.clearSelectedTask());
      },
    },
  });
</script>

<style scoped>
  .list { padding: 1.25rem; }
</style>
