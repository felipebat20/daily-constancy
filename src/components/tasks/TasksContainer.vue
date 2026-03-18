<template>
  <div class="tasks-container">
    <div class="tasks-container__toolbar">
      <DSTextField
        v-model="task_filter"
        placeholder="Search tasks..."
        icon="search"
        dense
        class="tasks-container__search"
        aria-label="Search tasks"
      />

      <q-btn
        flat
        round
        dense
        :icon="is_grid_layout ? 'view_list' : 'view_module'"
        @click="updateLayout"
        :aria-label="is_grid_layout ? 'Switch to list view' : 'Switch to grid view'"
        class="tasks-container__view-toggle"
      >
        <q-tooltip>{{ is_grid_layout ? 'List view' : 'Grid view' }}</q-tooltip>
      </q-btn>
    </div>

    <div
      v-if="request_pending"
      class="tasks-container__loading"
    >
      <template v-if="getIsGridLayout">
        <TableSkeleton
          v-for="n in 3"
          :key="n"
        />
      </template>

      <template v-else>
        <div class="flex items-center justify-center">
          <q-spinner-gears
            color="primary"
            size="3rem"
          />
        </div>
      </template>
    </div>

    <DSEmptyState
      v-else-if="! tasks.length"
      title="No tasks found"
      message="Start by creating your first task and track your progress!"
      icon="task_alt"
    >
      <DSButton
        label="Create Task"
        icon="add"
        variant="primary"
        @click="scrollToForm"
      />
    </DSEmptyState>

    <div
      v-else
      class="tasks-container__content"
      :class="{
        'tasks-container__content--cards': ! getIsGridLayout,
        'tasks-container__content--table': getIsGridLayout,
      }"
    >
      <template v-if="! getIsGridLayout">
        <Task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :is-grid-layout="getIsGridLayout"
        />
      </template>

      <TasksTable v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { debounce } from 'lodash';
import { useQuasar } from 'quasar';

import Task from '@/components/TaskCard.vue';
import TasksTable from '@/components/tasks/TasksTable.vue';
import { TableSkeleton } from '@/design-system/Skeleton';

import DSTextField from '@/design-system/DSTextField.vue';
import DSEmptyState from '@/design-system/DSEmptyState.vue';
import DSButton from '@/design-system/DSButton.vue';

import { useStore } from '@/store';
import { FETCH_TASKS } from '@/store/types/actions';

import {
  isGridLayout,
  updateTaskLayout,
  GRID_LAYOUT,
  CARD_LAYOUT,
} from '@/hooks/layout';

const $q = useQuasar();
const store = useStore();
const task_filter = ref('');
const is_grid_layout = ref(isGridLayout());
const request_pending = computed(() => store.state.requests_pending.tasks?.fetch_user_tasks);

watch(task_filter, debounce(function () {
  store.dispatch(FETCH_TASKS, task_filter.value);
}, 700));

store.dispatch(FETCH_TASKS);

const tasks = computed(() => store.state.task.tasks);

const getIsGridLayout = computed(() => {
  return is_grid_layout.value && $q.screen.gt.xs;
});

const updateLayout = () => {
  if (isGridLayout()) {
    updateTaskLayout(CARD_LAYOUT);
    is_grid_layout.value = false;
  } else {
    updateTaskLayout(GRID_LAYOUT);
    is_grid_layout.value = true;
  }
};

const scrollToForm = () => {
  const formElement = document.querySelector('.task-form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped lang="scss">
.tasks-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);

  &__toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4);
    background: var(--bg-card);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
  }

  &__search {
    flex: 1;
    min-width: 0;
  }

  &__view-toggle {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);

    &:hover {
      background-color: var(--bg-secondary);
      transform: translateY(-2px);
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-12);
  }

  &__content {
    &--cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(327px, 1fr));
      gap: var(--space-5);
    }

    &--table {
      width: 100%;
    }
  }
}
</style>
