<template>
  <DSModal
    v-model="show_modal"
    title="Delete Project"
    :loading="request_pending"
    confirm-label="Delete"
    variant="danger"
    @confirm="handleDeleteProject"
    @cancel="handleCancel"
  >
    <template #body>
      <p class="delete-project-modal__message">
        Are you sure you want to delete project "{{ project.name }}"?
      </p>

      <p class="delete-project-modal__warning">
        This action cannot be undone.
      </p>
    </template>
  </DSModal>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import type { Ref } from 'vue';
import { useQuasar } from 'quasar';

import DSModal from '@/design-system/DSModal.vue';

import { useStore } from '@/store';
import { DELETE_PROJECT } from '@/store/types/actions';
import ProjectInterface from '@/interfaces/Project.interface';

const store = useStore();
const $q = useQuasar();

const show_modal = ref(false);
const request_pending = ref(false);
const project: Ref<ProjectInterface> = ref({} as ProjectInterface);

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

const handleCancel = () => {
  show_modal.value = false;
};

const showModal = (delete_project: ProjectInterface) => {
  project.value = delete_project;
  show_modal.value = true;
};

defineExpose({ showModal });
</script>

<style scoped lang="scss">
.delete-project-modal {
  &__message {
    margin: 0 0 var(--space-4) 0;
    font-size: var(--text-base);
    color: var(--text-primary);
  }

  &__warning {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--danger);
    font-weight: var(--font-medium);
  }
}
</style>
