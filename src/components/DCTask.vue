<template>
  <DSCard class="task-card">
    <template #title>
      {{ task.description }}
    </template>

    <template #content>
      <div class="is-flex is-flex-direction-column">
        <div class="task-info-container">
          <div>
            Project:
          </div>

          <div>
            {{ task.project?.name ?? 'N/D' }}
          </div>
        </div>

        <div class="task-info-container">
          Time in focus:

          <TimerDisplay
            :time-in-seconds="getTaskTime(task)"
            :has-dark-theme="false"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="footer-container">
        <div>
          <q-btn
            class="button"
            color="white"
            text-color="black"
            @click="setActiveTask"
          >
            <span class="icon is-small">
              <i class="fas fa-play" />
            </span>

            <q-tooltip>
              Play
            </q-tooltip>
          </q-btn>
        </div>

        <div>
          <q-btn
            class="button"
            @click="selectTask"
            color="white"
            text-color="black"
          >
            <span class="icon is-small">
              <i class="fas fa-pencil-alt" />
            </span>

            <q-tooltip>
              Edit
            </q-tooltip>
          </q-btn>
        </div>

        <div>
          <q-btn
            color="white"
            text-color="negative"
            @click="handleDeleteButtonClick"
          >
            <span class="icon is-small">
              <i class="fas fa-trash" />
            </span>

            <q-tooltip>
              Delete
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </template>
  </DSCard>

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
        :loading="true"
        @click="deleteTask"
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

<script setup lang="ts">
  import { PropType, ref } from 'vue';

  import TimerDisplay from '@/components/TimerDisplay.vue';
  import Box from './shared/Box.vue';
  import DSCard from './shared/DSCard.vue';

  import TaskInterface from '../interfaces/Task.interface';
  import Modal from '@/components/shared/Modal.vue';
  import { useStore } from '@/store';
  import { DELETE_TASK, SET_ACTIVE_TASK } from '@/store/types/actions';

  import formatTimer from '@/hooks/formatTimer';

  const delete_request_pending = ref(false);

  const props = defineProps({
    task: {
      type: Object as PropType<TaskInterface>,
      required: true,
    },

    isGridLayout: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(['selected-task']);

  const store = useStore();
  const show_modal = ref(false);

  const selectTask = () => {
    emit('selected-task', props.task);
  };

  const handleDeleteButtonClick = () => {
    show_modal.value = true;
  };

  const deleteTask = async () => {
    delete_request_pending.value = true;
    await store.dispatch(DELETE_TASK, props.task);
    closeModal();
    delete_request_pending.value = false;
  };

  const setActiveTask = () => {
    store.dispatch(SET_ACTIVE_TASK, props.task);
  };

  const closeModal = () => {
    show_modal.value = false;
  };

  const getTaskTime = (task: TaskInterface) => {
    return task.total_time_spent || task.time_spent;
  };
</script>

<style scoped>
  .box { background-color: #FAF0CA; }
  .task-card {
    width: 327px;
    display: flex;
    flex-direction: column;
  }
  .footer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 10px;
    height: 60px;
  }

  .task-info-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
