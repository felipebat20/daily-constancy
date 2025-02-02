<template>
  <q-dialog
    v-model="show_modal"
    persistent
  >
    <q-card :style="{ minWidth: $q.screen.width > 450 ? '450px' : '100%' }">
      <q-card-section class="row items-center q-pb-md q-pt-sm">
        <div class="text-h6">
          Delete project
        </div>

        <q-space />

        <q-btn
          icon="close"
          flat
          class="q-pa-none"
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>Are you sure you want to delete the project "{{ project.name }}"?</p>
        <p class="text-negative">
          This action cannot be undone.
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          no-caps
          v-close-popup
        />

        <q-btn
          label="Delete"
          color="negative"
          no-caps
          :loading="request_pending"
          @click="handleDeleteProject"
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
import { DELETE_PROJECT } from '@/store/types/actions';
import ProjectInterface from '@/interfaces/Project.interface';

const store = useStore();
const $q = useQuasar();

const show_modal = ref(false);
const request_pending = ref(false);
const project : Ref<ProjectInterface> = ref({} as ProjectInterface);

const handleDeleteProject = async () => {
  request_pending.value = true;

  try {
    await store.dispatch(DELETE_PROJECT, { id: project.value.id });

    $q.notify({
      progress: true,
      type: 'positive',
      message: 'Project successfully deleted',
      position: 'top-right',
      icon: 'check_circle',
    });

    show_modal.value = false;
  } catch (error) {
    $q.notify({
      progress: true,
      type: 'negative',
      message: 'Error deleting project',
      position: 'top-right',
      icon: 'error',
    });
  } finally {
    request_pending.value = false;
  }
};

const showModal = (delete_project: ProjectInterface) => {
  project.value = delete_project;
  show_modal.value = true;
};

defineExpose({ showModal });
</script>
