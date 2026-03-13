<template>
  <div class="task-form">
    <div class="task-form__fields">
      <DSTextField
        v-model="description"
        placeholder="Which task would you like to start?"
        icon="task_alt"
        :autofocus="$q.screen.gt.xs"
        aria-label="Task description"
      />

      <DSSelect
        v-model="project_id"
        :options="parsedProjects"
        label="Select a project"
        icon="folder"
        clearable
        aria-label="Select project"
      />
    </div>

    <Timer
      :task-name="description"
      :play-request-pending="playRequestPending"
      :stop-request-pending="stopRequestPending"
      @time-is-finished="finishTask"
      @start-timer="startTimer"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import DSTextField from '@/design-system/DSTextField.vue';
import DSSelect from '@/design-system/DSSelect.vue';
import Timer from './Timer.vue';

import { useStore } from '@/store';
import {
  CREATE_NEW_TASK,
  FETCH_PROJECTS,
  FINISH_TASK_SESSION,
} from '@/store/types/actions';
import { NEW_ACTIVE_TASK } from '@/store/types/mutations';

interface ProjectOption {
  label: string;
  value: number | null;
}

const store = useStore();
const description = ref('');
const project_id = ref<number | null>(null);
const projects = computed(() => store.state.project.projects);
const active_task = computed(() => store.state.task.active_task);
const playRequestPending = ref(false);
const stopRequestPending = ref(false);

store.dispatch(FETCH_PROJECTS);

const parsedProjects = computed<ProjectOption[]>(() => [
  { label: 'No project', value: null },
  ...projects.value.map((project) => ({
    label: project.name,
    value: project.id,
  })),
]);

const finishTask = async (): Promise<void | boolean> => {
  stopRequestPending.value = true;
  await handleFinishTask();

  return stopRequestPending.value = false;
};

const handleFinishTask = async () => {
  const project = projects.value.find(project => project.id === project_id.value);
  const task_name = description.value;

  description.value = '';
  project_id.value = null;

  if (active_task.value.id) {
    await store.dispatch(FINISH_TASK_SESSION, active_task.value);

    return store.commit(NEW_ACTIVE_TASK, {});
  }

  await store.dispatch(CREATE_NEW_TASK, {
    description: task_name,
    id: new Date().getTime(),
    project,
  });
};

const startTimer = async (time: number): Promise<void> => {
  const project = projects.value.find(project => project.id === project_id.value);
  const task_name = description.value;

  description.value = '';
  project_id.value = null;

  playRequestPending.value = true;
  await store.dispatch(CREATE_NEW_TASK, {
    description: task_name,
    time_spent: time,
    id: new Date().getTime(),
    project,
  });

  playRequestPending.value = false;
};

watch(active_task, (state, prev_state) => {
  if (state.id && state.id !== prev_state.id) {
    description.value = active_task.value.description;
    if (state.project?.id) {
      project_id.value = state.project.id;
    }

    if (prev_state?.endAt) {
      store.dispatch(FINISH_TASK_SESSION, prev_state);
    }
  }

  if (! state.id) {
    description.value = '';
    project_id.value = null;
  }
});
</script>

<style scoped lang="scss">
.task-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  &__fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;

    &__fields {
      flex: 1;
      min-width: 0;
    }
  }
}
</style>
