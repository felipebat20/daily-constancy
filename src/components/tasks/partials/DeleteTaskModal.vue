<template>
  <q-dialog
    v-model="show_modal"
    persistent
  >
    <q-card :style="{ minWidth: $q.screen.width > 450 ? '450px' : '100%' }">
      <q-card-section class="row items-center q-pb-md q-pt-sm">
        <p class="text-base m-0">
          Delete task
        </p>

        <q-space />

        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>
          Are you sure you want to delete this task?
        </p>

        <p>
          You already spent
          <q-badge color="red">
            {{ formatTimer(getTaskTime()) }}
          </q-badge>

          of total time, this progress cannot be recovered.
        </p>
      </q-card-section>

      <q-card-actions
        align="right"
      >
        <q-btn
          label="Cancel"
          no-caps
          class="button"
          @click="closeModal"
        />

        <q-btn
          label="Delete task"
          :loading="request_pending"
          color="negative"
          no-caps
          @click="deleteTask"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import type { Ref } from 'vue';

  import TaskInterface from '@/interfaces/Task.interface';

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
