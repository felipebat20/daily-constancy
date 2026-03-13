<template>
  <DSModal
    v-model="show_modal"
    title="Delete Task"
    :loading="request_pending"
    confirm-label="Delete"
    variant="danger"
    @confirm="deleteTask"
    @cancel="closeModal"
  >
    <template #body>
      <p class="delete-task-modal__message">
        Are you sure you want to delete this task?
      </p>

      <p class="delete-task-modal__warning">
        You have already spent
        <DSBadge
          :label="formatTimer(getTaskTime())"
          variant="danger"
        />
        of total time. This progress cannot be recovered.
      </p>
    </template>
  </DSModal>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue';
import type { Ref } from 'vue';

import TaskInterface from '@/interfaces/Task.interface';

import DSModal from '@/design-system/DSModal.vue';
import DSBadge from '@/design-system/DSBadge.vue';

import { useStore } from '@/store';
import formatTimer from '@/hooks/formatTimer';
import { DELETE_TASK } from '@/store/types/actions';

const store = useStore();
const task: Ref<TaskInterface> = ref({} as TaskInterface);
const show_modal = ref(false);
const request_pending = ref(false);

const getTaskTime = () => {
  return task.value.total_time_spent || task.value.time_spent || 0;
};

const deleteTask = async () => {
  request_pending.value = true;
  await store.dispatch(DELETE_TASK, task.value);
  closeModal();
  return request_pending.value = false;
};

const closeModal = () => {
  show_modal.value = false;
};

const openModal = (state_task: TaskInterface) => {
  show_modal.value = true;
  task.value = state_task;
};

defineExpose({
  closeModal,
  openModal,
});
</script>

<style scoped lang="scss">
.delete-task-modal {
  &__message {
    margin: 0 0 var(--space-4) 0;
    font-size: var(--text-base);
    color: var(--text-primary);
  }

  &__warning {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
}
</style>
