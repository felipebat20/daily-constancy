<template>
  <Form @save-task="saveTask" />

  <div class="list">
    <div class="field">
      <p class="control has-icons-left has-icons-right is-loading">
        <input
          v-model="task_filter"
          class="input"
          type="text"
          placeholder="Search a task"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-search" />
        </span>
        <!-- <span class="icon is-small is-right">
          <i class="fas fa-check" />
        </span> -->
      </p>
    </div>

    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @selected-task="updateSelectedTask"
    />

    <div
      v-if="selected_task"
      class="modal"
      :class="{'is-active': !! selected_task}"
    >
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Edit your task
          </p>

          <button
            class="delete"
            aria-label="close"
            @click="clearSelectedTask"
          />
        </header>

        <section class="modal-card-body">
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
        </section>
        <footer class="modal-card-foot">
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
        </footer>
      </div>
    </div>

    <Box v-if="! tasks.length">
      Are you kidding with your future? :(
    </Box>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';

  import Form from '@/components/Form.vue';
  import Task from '@/components/Task.vue';
  import Box from '@/components/shared/Box.vue';

  import TaskInterface from '@/interfaces/Task.interface';
  import { useStore } from '@/store';
  import { CREATE_NEW_TASK, FETCH_TASKS, UPDATE_TASK } from '@/store/types/actions';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
      Task,
      Box,
    },

    data() {
      return {
        selected_task: null as TaskInterface | null,
      };
    },

    setup() {
      const store = useStore();
      const task_filter = ref('');
      const tasks = computed(
        () => store.state.task.tasks
          .filter(task => ! task_filter.value || task.description.includes(task_filter.value))
        );

      store.dispatch(FETCH_TASKS);

      return {
        store,
        tasks,
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
