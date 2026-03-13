<template>
  <DSModal
    v-model="show_modal"
    :title="project.id ? 'Edit Project' : 'New Project'"
    :loading="request_pending"
    :confirm-label="project.id ? 'Save' : 'Create'"
    @confirm="handleSubmit"
    @cancel="handleCancel"
  >
    <template #body>
      <DSTextField
        v-model="project_name"
        label="Project Name"
        placeholder="Enter project name"
        icon="folder"
        autofocus
        :disabled="request_pending"
        @keyup.enter="handleSubmit"
        aria-label="Project name"
      />
    </template>
  </DSModal>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import type { Ref } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from '@/store';
import {
  CREATE_NEW_PROJECT,
  EDIT_PROJECT,
} from '@/store/types/actions';

import ProjectInterface from '@/interfaces/Project.interface';
import DSModal from '@/design-system/DSModal.vue';
import DSTextField from '@/design-system/DSTextField.vue';

const store = useStore();
const $q = useQuasar();

const show_modal = ref(false);
const project: Ref<ProjectInterface> = ref({} as ProjectInterface);
const project_name = ref('');
const request_pending = ref(false);

const handleSubmit = async () => {
  if (!project_name.value) return;

  request_pending.value = true;

  try {
    if (project.value.id) {
      await store.dispatch(EDIT_PROJECT, {
        id: project.value.id,
        name: project_name.value,
      });
    } else {
      await store.dispatch(CREATE_NEW_PROJECT, project_name.value);
    }

    $q.notify({
      progress: true,
      type: 'positive',
      message: 'Your project is available!',
      position: 'top-right',
      icon: 'check_circle',
    });

    project_name.value = '';
    show_modal.value = false;
  } finally {
    request_pending.value = false;
  }
};

const handleCancel = () => {
  project_name.value = '';
  show_modal.value = false;
};

const showModal = (edit_project?: ProjectInterface) => {
  project.value = {} as ProjectInterface;
  project_name.value = '';

  if (edit_project) {
    project.value = edit_project;
    project_name.value = edit_project.name;
  }

  show_modal.value = true;
};

defineExpose({
  show_modal,
  project,
  showModal,
});
</script>
