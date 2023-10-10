<template>
  <Form />

  <div class="list">
    <div class="search-container">
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

      <div
        class="change-view-container"
        @click="updateLayout"
      >
        <i
          v-if="is_grid_layout"
          class="fa-solid fa-grip"
        />

        <i
          v-else
          class="fa-solid fa-bars"
        />
      </div>
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

          <div class="field">
            <label
              for="projectName"
              class="label"
            >
              Project
            </label>

            <div class="select">
              <select v-model="project_id">
                <option :value="0">
                  Select a project
                </option>

                <option
                  v-for="project in projects"
                  :key="project.id"
                  :value="project.id"
                >
                  {{ project.name }}
                </option>
              </select>
            </div>
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

    <div :class="{'task-container': ! is_grid_layout}">
      <!-- <Task
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        :is-grid-layout="is_grid_layout"
        @selected-task="updateSelectedTask"
      /> -->

      <DCTasksTable />
    </div>

    <Box v-if="! tasks.length">
      Are you kidding with your future? :(
    </Box>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';

  import Form from '@/components/Form.vue';
  // import Task from '@/components/ATTask.vue';
  import Box from '@/components/shared/Box.vue';
  import Modal from '@/components/shared/Modal.vue';
  import DCTasksTable from '@/components/tasks/DCTasksTable.vue';

  import TaskInterface from '@/interfaces/Task.interface';
  import { useStore } from '@/store';
  import {  FETCH_TASKS, UPDATE_TASK } from '@/store/types/actions';

  import {
    isGridLayout,
    updateTaskLayout,
    GRID_LAYOUT,
    CARD_LAYOUT,
  } from '@/hooks/layout';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
      // Task,
      Box,
      DCTasksTable,
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
      const is_grid_layout = ref(isGridLayout());

      const projects = computed(() => store.state.project.projects);
      const project_id = ref(0);

      store.dispatch(FETCH_TASKS);
      watch(task_filter, () =>{
        store.dispatch(FETCH_TASKS, task_filter.value);
      });

      return {
        store,
        tasks: computed(() => store.state.task.tasks),
        task_filter,
        is_grid_layout,
        projects,
        project_id,
      };
    },

    methods: {
      updateSelectedTask(task: TaskInterface): void {
        this.project_id = task.project?.id || 0;
        this.selected_task = task;
      },

      clearSelectedTask(): void {
        this.selected_task = null;
      },

      updateTask() {
        const project = this.projects.find(proj => proj.id === this.project_id);

        return this.store.dispatch(UPDATE_TASK, {
          ...this.selected_task,
          project,
        }).then(() => this.clearSelectedTask());
      },

      updateLayout() {
        if (isGridLayout()) {
          updateTaskLayout(CARD_LAYOUT);

          return this.is_grid_layout = false;
        }

        updateTaskLayout(GRID_LAYOUT);

        return this.is_grid_layout = true;
      },
    },
  });
</script>

<style scoped>
  .list { padding: 1.25rem; }
  .task-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  .search-container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
  }

  .search-container .field { width: 100%; }
  .change-view-container {
    width: 40px;
    height: 40px;
    margin-bottom: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    background-color: #ced4da;
    border-radius: 10px;
    cursor: pointer;
  }

  .change-view-container:hover { background-color: #adb5bd; }
</style>
