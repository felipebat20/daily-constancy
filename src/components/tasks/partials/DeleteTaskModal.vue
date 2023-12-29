<template>
  <Modal :show="show_modal">
    <template #header>
      <p class="modal-card-title mb-0">
        Warning
      </p>

      <button
        class="delete"
        aria-label="close"
        @click="closeModal"
      />
    </template>

    <template #body>
      <p>
        Are you sure you want to delete this task?
      </p>

      <p>
        You already spent {{ formatTimer(getTaskTime(task)) }} of total time, this progress cannot be recovered.
      </p>
    </template>

    <template #footer>
      <q-btn
        :loading="request_pending"
        @click="deleteTask"
        class="button is-danger"
        no-caps
      >
        Delete task
      </q-btn>

      <button
        class="button"
        @click="closeModal"
      >
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { defineProps, PropType, ref, defineExpose } from 'vue';

  import TaskInterface from '@/interfaces/Task.interface';

  import Modal from '@/components/shared/Modal.vue';

  import { useStore } from '@/store';

  import formatTimer from '@/hooks/formatTimer';
  import { DELETE_TASK } from '@/store/types/actions';

  const store = useStore();
  const props = defineProps({
    task: {
      type: Object as PropType<TaskInterface>,
      required: true,
    }
  });

  const show_modal = ref(false);
  const request_pending = ref(false);

  const getTaskTime = (task: TaskInterface) => {
    return task.total_time_spent || task.time_spent || 0;
  };

  const deleteTask = async () => {
    request_pending.value = true;
    await store.dispatch(DELETE_TASK, props.task);
    closeModal();

    return request_pending.value = false;
  };

  const closeModal = () => {
    show_modal.value = false;
  };

  const openModal = () => {
    show_modal.value = true;
  };

  defineExpose({
    closeModal,
    openModal,
  });
</script>
