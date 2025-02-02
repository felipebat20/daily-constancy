<template>
  <q-dialog
    v-model="show_modal"
    persistent
  >
    <q-card :style="{ minWidth: $q.screen.width > 450 ? '450px' : '100%' }">
      <q-card-section>
        <div class="text-h6">
          {{ project.id ? 'Edit project' : 'New project' }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="project_name"
          autofocus
          label="Project name"
          color="deep-orange-5"
          :disable="request_pending"
          @keyup.enter="handleSubmit"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary"
      >
        <q-btn
          flat
          label="Cancel"
          no-caps
          v-close-popup
        />

        <q-btn
          :label="project.id ? 'Save' : 'Create project'"
          no-caps
          color="green-5"
          :loading="request_pending"
          @click="handleSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue';
import type { Ref } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from '@/store';
import {
  CREATE_NEW_PROJECT,
  EDIT_PROJECT,
} from '@/store/types/actions';

import ProjectInterface from '@/interfaces/Project.interface';

const store = useStore();
const $q = useQuasar();

const show_modal = ref(false);
const project : Ref<ProjectInterface> = ref({} as ProjectInterface);
const project_name = ref('');
const request_pending = ref(false);

if (project.value) {
  project_name.value = project.value.name;
}

const handleSubmit = async () => {
  if (!project_name.value) return;

  request_pending.value = true;

  try {
    if (project.value.id) {
      await store.dispatch(EDIT_PROJECT, {
        id: project.value.id,
        name: project_name.value
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
