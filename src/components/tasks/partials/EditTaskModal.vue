<template>
  <DSModal
    v-model="show_modal"
    title="Edit Task"
    :loading="request_pending"
    confirm-label="Save"
    @confirm="updateTask"
    @cancel="closeModal"
  >
    <template #body>
      <div class="edit-task-modal__fields">
        <DSTextField
          v-model="task.description"
          label="Description"
          placeholder="Enter task description"
          icon="task_alt"
          autofocus
          aria-label="Task description"
        />

        <DSSelect
          v-model="project_id"
          :options="parsedProjects"
          label="Project"
          icon="folder"
          clearable
          aria-label="Select project"
        />
      </div>
    </template>
  </DSModal>
</template>

<script lang="ts" setup>
import { defineExpose, ref, computed } from 'vue';
import type { Ref } from 'vue';

import TaskInterface from '@/interfaces/Task.interface';

import DSModal from '@/design-system/DSModal.vue';
import DSTextField from '@/design-system/DSTextField.vue';
import DSSelect from '@/design-system/DSSelect.vue';

import { useStore } from '@/store';
import { UPDATE_TASK } from '@/store/types/actions';

interface ProjectOption {
  label: string;
  value: number | null;
}

const store = useStore();
const show_modal = ref(false);
const project_id = ref<number | null>(null);

const task: Ref<TaskInterface> = ref({} as TaskInterface);
const request_pending = ref(false);

const projects = computed(() => store.state.project.projects);

const parsedProjects = computed<ProjectOption[]>(() => [
  { label: 'No project', value: null },
  ...projects.value.map((project) => ({
    label: project.name,
    value: project.id,
  })),
]);

const openModal = (update_task: TaskInterface) => {
  task.value = { ...update_task };
  project_id.value = update_task.project?.id || null;
  return show_modal.value = true;
};

const closeModal = () => {
  show_modal.value = false;
};

const updateTask = async () => {
  request_pending.value = true;
  const project = projects.value.find(proj => proj.id === project_id.value);

  await store.dispatch(UPDATE_TASK, {
    ...task.value,
    project,
  });

  request_pending.value = false;
  return closeModal();
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<style scoped lang="scss">
.edit-task-modal {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
}
</style>
