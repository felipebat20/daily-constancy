<template>
  <div class="list">
    <div class="search-container">
      <div class="field">
        <p class="m-0 control has-icons-left has-icons-right">
          <q-input
            v-model="task_filter"
            dense
            type="text"
            outlined
            icon="fas fa-search"
            color="deep-orange-5"
            placeholder="Search a task"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
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

    <div v-if="request_pending">
      <template v-if="getIsGridLayout">
        <TableSkeleton
          v-for="n in 3"
          :key="n"
        />
      </template>

      <template v-else>
        <div class="flex items-center justify-center">
          <QSpinnerFacebook
            color="yellow"
            background-color="purple"
            size="140"
          />
        </div>
      </template>
    </div>

    <Box v-else-if="! tasks.length">
      Are you kidding with your future? :(
    </Box>

    <div
      v-else
      :class="{'task-container': ! getIsGridLayout }"
    >
      <template v-if="! getIsGridLayout">
        <Task
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          :is-grid-layout="getIsGridLayout"
          @selected-task="updateSelectedTask"
        />
      </template>

      <TasksTable
        v-else
        :request_pending="request_pending"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';
  import { debounce } from 'lodash';
  import { QSpinnerFacebook, useQuasar } from 'quasar';

  import Task from '@/components/TaskCard.vue';
  import Box from '@/components/shared/Box.vue';
  import TasksTable from '@/components/tasks/TasksTable.vue';
  import { TableSkeleton } from '@/design-system/Skeleton';

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
    name: 'TasksContainer',
    components: {
      Task,
      Box,
      TasksTable,
      TableSkeleton,
      QSpinnerFacebook,
    },

    data() {
      return {
        selected_task: null as TaskInterface | null,
      };
    },

    setup() {
      const $q = useQuasar();
      const store = useStore();
      const task_filter = ref('');
      const is_grid_layout = ref(isGridLayout());
      const request_pending = computed(() => store.state.requests_pending.tasks?.fetch_user_tasks);

      const projects = computed(() => store.state.project.projects);
      const project_id = ref(0);

      watch(task_filter, debounce(function () {
        store.dispatch(FETCH_TASKS, task_filter.value);
      }, 700));

      store.dispatch(FETCH_TASKS);

      const getIsGridLayout = computed(() => {
        return is_grid_layout.value && $q.screen.gt.xs;
      });

      return {
        store,
        tasks: computed(() => store.state.task.tasks),
        task_filter,
        is_grid_layout,
        projects,
        project_id,
        request_pending,
        getIsGridLayout,
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
  .task-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
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

  .dark-theme .change-view-container {
    background-color: var(--accent-background);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }

  .change-view-container:hover { background-color: #adb5bd; }
  .input {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    border-color: var(--border-color);

    &::placeholder { color: var(--placeholder-color); }
  }
</style>
