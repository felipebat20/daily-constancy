<template>
  <DSCard
    class="task-card"
    shadow="md"
  >
    <template #header>
      <span class="task-card__description">
        {{ task.description }}
      </span>
    </template>

    <template #content>
      <div class="task-card__info">
        <div class="task-card__info-item">
          <span class="task-card__info-label">Project:</span>
          <DSBadge
            v-if="task.project?.name"
            :label="task.project.name"
            variant="secondary"
            size="sm"
          />
          <DSBadge
            v-else
            label="No project"
            variant="info"
            size="sm"
          />
        </div>

        <div class="task-card__info-item">
          <span class="task-card__info-label">Time:</span>
          <div class="task-card__timer">
            <q-icon
              name="schedule"
              size="18px"
            />
            <strong>{{ formatTimer(getTaskTime(task)) }}</strong>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="task-card__actions">
        <DSButton
          :loading="isRequestPending(task)"
          :icon="getTaskIcon(task)"
          variant="primary"
          @click="handleInitTask(task)"
          aria-label="Play task"
        >
          {{ task.lastSessionStartedAt ? 'Pause' : 'Play' }}
        </DSButton>

        <DSButton
          icon="edit"
          variant="outline"
          @click="handleEditButtonClick"
          aria-label="Edit task"
        />

        <DSButton
          icon="delete"
          variant="danger"
          @click="handleDeleteButtonClick"
          aria-label="Delete task"
        />
      </div>
    </template>
  </DSCard>

  <DeleteTaskModal ref="deleteTaskModal" />
  <EditTaskModal ref="editTaskModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import DeleteTaskModal from '@/components/tasks/partials/DeleteTaskModal.vue';
import EditTaskModal from '@/components/tasks/partials/EditTaskModal.vue';
import DSCard from './shared/DSCard.vue';
import DSButton from '@/design-system/DSButton.vue';
import DSBadge from '@/design-system/DSBadge.vue';

import TaskInterface from '../interfaces/Task.interface';
import formatTimer from '@/hooks/formatTimer';

import { useStore } from '@/store';
import { CREATE_TASK_SESSION, FINISH_TASK_SESSION, SET_ACTIVE_TASK } from '@/store/types/actions';
import { NEW_ACTIVE_TASK } from '@/store/types/mutations';

interface Props {
  task: TaskInterface;
  isGridLayout: boolean;
}

const props = defineProps<Props>();

const request_pending = ref([] as number[]);
const store = useStore();
const deleteTaskModal = ref(DeleteTaskModal);
const editTaskModal = ref(EditTaskModal);

const handleDeleteButtonClick = () => {
  deleteTaskModal.value.openModal(props.task);
};

const handleEditButtonClick = () => {
  editTaskModal.value.openModal(props.task);
};

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
  return task.total_time_spent || task.time_spent;
};
</script>

<style scoped lang="scss">
.task-card {
  display: flex;
  flex-direction: column;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
  }

  &__description {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  &__info-label {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
  }

  &__timer {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    color: var(--primary);
    font-variant-numeric: tabular-nums;
    background-color: var(--primary-focus);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-md);
  }

  &__actions {
    display: flex;
    gap: var(--space-3);
    justify-content: center;
  }
}
</style>
