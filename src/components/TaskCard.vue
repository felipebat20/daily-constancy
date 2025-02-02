<template>
  <DSCard class="task-card">
    <template #title>
      <span class="text-base">
        {{ task.description }}
      </span>
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
      <q-btn
        class="button"
        color="white"
        text-color="primary"
        :loading="isRequestPending(task)"
        outline
        :icon="getTaskIcon(task)"
        @click="handleInitTask(task)"
      >
        <q-tooltip>
          Play
        </q-tooltip>
      </q-btn>

      <q-btn
        class="button"
        @click="handleEditButtonClick"
        color="white"
        text-color="green-5"
        icon="edit"
        outline
      >
        <q-tooltip>
          Edit
        </q-tooltip>
      </q-btn>

      <q-btn
        color="white"
        text-color="negative"
        outline
        icon="delete"
        @click="handleDeleteButtonClick"
      >
        <q-tooltip>
          Delete
        </q-tooltip>
      </q-btn>
    </template>
  </DSCard>

  <DeleteTaskModal ref="deleteTaskModal" />
  <EditTaskModal ref="editTaskModal" />
</template>

<script setup lang="ts">
  import { PropType, ref } from 'vue';

  import TimerDisplay from '@/components/TimerDisplay.vue';
  import DeleteTaskModal from '@/components/tasks/partials/DeleteTaskModal.vue';
  import EditTaskModal from '@/components/tasks/partials/EditTaskModal.vue';
  import DSCard from './shared/DSCard.vue';

  import TaskInterface from '../interfaces/Task.interface';

  import { useStore } from '@/store';
  import { CREATE_TASK_SESSION, FINISH_TASK_SESSION, SET_ACTIVE_TASK } from '@/store/types/actions';

  import { NEW_ACTIVE_TASK } from '@/store/types/mutations';

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
    if (task.lastSessionStartedAt) {
      return 'fas fa-pause';
    }

    return 'fas fa-play';
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
