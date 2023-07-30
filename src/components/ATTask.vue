<template>
  <Box v-if="isGridLayout">
    <div class="columns is-clickable">
      <div class="column is-1">
        <button
          class="button"
          @click="setActiveTask"
        >
          <span class="icon is-small">
            <i class="fas fa-play" />
          </span>
        </button>
      </div>

      <div class="column is-4">
        {{ task.description || 'Unnamed Task' }}
      </div>

      <div class="column is-3">
        {{ task.project?.name ?? 'N/D' }}
      </div>

      <div class="column">
        <TimerDisplay
          :time-in-seconds="task.time_spent"
          :has-dark-theme="false"
        />
      </div>

      <div class="column">
        <button
          class="button"
          @click="selectTask"
        >
          <span class="icon is-small">
            <i class="fas fa-pencil-alt" />
          </span>
        </button>

        <button
          class="button ml-2 is-danger"
          @click="handleDeleteButtonClick"
        >
          <span class="icon is-small">
            <i class="fas fa-trash" />
          </span>
        </button>
      </div>
    </div>
  </Box>

  <DSCard
    v-else
    class="task-card"
  >
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
            :time-in-seconds="task.time_spent"
            :has-dark-theme="false"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="footer-container">
        <div>
          <button
            class="button"
            @click="setActiveTask"
          >
            <span class="icon is-small">
              <i class="fas fa-play" />
            </span>
          </button>
        </div>

        <div>
          <button
            class="button"
            @click="selectTask"
          >
            <span class="icon is-small">
              <i class="fas fa-pencil-alt" />
            </span>
          </button>
        </div>

        <div>
          <button
            class="button is-danger"
            @click="handleDeleteButtonClick"
          >
            <span class="icon is-small">
              <i class="fas fa-trash" />
            </span>
          </button>
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
        You already spent {{ formatTimer(task.time_spent) }} of total time, this progress cannot be recovered.
      </p>
    </template>

    <template #footer>
      <button
        @click="deleteTask"
        class="button is-danger"
      >
        Delete task
      </button>

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

  import TimerDisplay from '@/components/TimerDisplay.vue'
  import Box from './shared/Box.vue';
  import DSCard from './shared/DSCard.vue';

  import TaskInterface from '../interfaces/Task.interface';
  import Modal from '@/components/shared/Modal.vue';
  import { useStore } from '@/store';
  import { DELETE_TASK, SET_ACTIVE_TASK } from '@/store/types/actions';

  import formatTimer from '@/hooks/formatTimer';

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
  }

  const deleteTask = () => {
    store.dispatch(DELETE_TASK, props.task).then(() => closeModal());
  }

  const setActiveTask = () => {
    store.dispatch(SET_ACTIVE_TASK, props.task);
  }

  const closeModal = () => {
    show_modal.value = false;
  }
</script>

<style scoped>
  .box { background-color: #FAF0CA; }
  .task-card {
    min-width: 287px;
    max-width: 387px;
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
