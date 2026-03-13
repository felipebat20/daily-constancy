<template>
  <div class="tasks-table">
    <div
      v-for="(tasks_aggregate, index) in getTasksAggregate"
      :key="index"
      class="tasks-table__group"
    >
      <h3 class="tasks-table__group-title">
        {{ tasks_aggregate[0] }}
      </h3>

      <DSTable
        :rows="tasks_aggregate[1]"
        :columns="columns"
        :loading="false"
        :rows-per-page-options="[0]"
        dense
        sticky-header
        :max-height="'400px'"
        class="tasks-table__table"
      >
        <template #body-cell-continue="props">
          <q-td :props="props">
            <DSButton
              :loading="isRequestPending(props.row)"
              :icon="getTaskIcon(props.row)"
              variant="outline"
              size="sm"
              @click="handleInitTask(props.row)"
            />
          </q-td>
        </template>

        <template #body-cell-project="props">
          <q-td :props="props">
            <DSBadge
              v-if="props.row.project?.name"
              :label="props.row.project.name"
              variant="secondary"
              size="sm"
            />
            <DSBadge
              v-else
              label="No project"
              variant="info"
              size="sm"
            />
          </q-td>
        </template>

        <template #body-cell-total_time_spent="props">
          <q-td :props="props">
            <DSBadge
              :label="formatTimer(getTaskTime(props.row))"
              variant="primary"
              size="sm"
            />
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="tasks-table__actions">
              <DSButton
                icon="edit"
                variant="outline"
                size="sm"
                @click="selectTask(props.row)"
                aria-label="Edit task"
              />

              <DSButton
                icon="delete"
                variant="danger"
                size="sm"
                @click="handleDeleteButtonClick(props.row)"
                aria-label="Delete task"
              />
            </div>
          </q-td>
        </template>
      </DSTable>
    </div>
  </div>

  <DeleteTaskModal
    ref="deleteTaskModal"
    :task="selected_task"
  />

  <EditTaskModal
    ref="editTaskModal"
    :task="selected_task"
  />
</template>

<script setup lang="ts">
import type { QTableProps } from 'quasar';
import { ref, computed } from 'vue';
import { groupBy, orderBy } from 'lodash';

import DeleteTaskModal from '@/components/tasks/partials/DeleteTaskModal.vue';
import EditTaskModal from '@/components/tasks/partials/EditTaskModal.vue';

import DSTable from '@/design-system/DSTable.vue';
import DSButton from '@/design-system/DSButton.vue';
import DSBadge from '@/design-system/DSBadge.vue';

import { useStore } from '@/store';

import TaskInterface from '@/interfaces/Task.interface';
import formatTimer from '@/hooks/formatTimer';

import { CREATE_TASK_SESSION, FINISH_TASK_SESSION, SET_ACTIVE_TASK } from '@/store/types/actions';
import { NEW_ACTIVE_TASK } from '@/store/types/mutations';

const store = useStore();
const selected_task = ref({} as TaskInterface);
const deleteTaskModal = ref(DeleteTaskModal);
const editTaskModal = ref(EditTaskModal);

const tasks = computed(() => store.state.task.tasks);

const columns: QTableProps['columns'] = [
  {
    name: 'continue',
    align: 'left',
    label: '',
    field: '',
  },
  {
    name: 'description',
    required: true,
    label: 'Task',
    align: 'left',
    field: 'description',
    sortable: true,
  },
  {
    name: 'project',
    align: 'left',
    label: 'Project',
    field: '',
  },
  {
    name: 'total_time_spent',
    label: 'Time spent',
    align: 'left',
    field: '',
  },
  {
    name: 'actions',
    align: 'center',
    label: '',
    field: '',
  },
];

const request_pending = ref([] as number[]);

const isRequestPending = (task: TaskInterface) => {
  return request_pending.value.includes(task.id);
};

const handleTask = async (task: TaskInterface) => {
  if (task.lastSessionStartedAt) {
    await store.dispatch(FINISH_TASK_SESSION, task);
    return store.commit(NEW_ACTIVE_TASK, {});
  }

  const new_task = await store.dispatch(CREATE_TASK_SESSION, task);
  await store.dispatch(SET_ACTIVE_TASK, new_task);
};

const handleInitTask = async (task: TaskInterface) => {
  request_pending.value.push(task.id);
  await handleTask(task);
  request_pending.value = request_pending.value.filter((task_id: string | number) => task_id !== task.id);
};

const getTaskIcon = (task: TaskInterface) => {
  return task.lastSessionStartedAt ? 'pause' : 'play_arrow';
};

const getTaskTime = (task: TaskInterface) => {
  return task.total_time_spent || task.time_spent || 0;
};

const selectTask = (task: TaskInterface) => {
  editTaskModal.value.openModal(task);
};

const getTasksAggregate = computed(() => {
  const day = (task: TaskInterface) => new Date(task.createdAt || (+task.id)).toDateString();
  return Object.entries(groupBy(orderBy(tasks.value, ['createdAt', 'id'], ['desc', 'desc']), day));
});

const handleDeleteButtonClick = (task: TaskInterface) => {
  deleteTaskModal.value.openModal(task);
};
</script>

<style scoped lang="scss">
.tasks-table {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__group-title {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    padding: 0 var(--space-4);
  }

  &__actions {
    display: flex;
    gap: var(--space-2);
  }
}
</style>
