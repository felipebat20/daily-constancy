<template>
  <DSModal
    v-model="show_modal"
    title="New Streak"
    :loading="request_pending"
    confirm-label="Create Streak"
    @confirm="handleCreateStreak"
    @cancel="handleCancel"
  >
    <template #body>
      <div class="create-streak-modal__fields">
        <DSTextField
          v-model="streak_name"
          label="Streak Name"
          placeholder="Enter streak name"
          icon="whatshot"
          autofocus
          @keyup.enter="handleCreateStreak"
          aria-label="Streak name"
        />

        <DSSelect
          v-model="projects_model"
          :options="getParsedProjects"
          label="Projects"
          icon="folder"
          multiple
          clearable
          aria-label="Select projects"
        />
      </div>
    </template>
  </DSModal>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose } from 'vue';

import DSModal from '@/design-system/DSModal.vue';
import DSTextField from '@/design-system/DSTextField.vue';
import DSSelect from '@/design-system/DSSelect.vue';

import { useStore } from '@/store';
import { CREATE_STREAK } from '@/store/types/actions';

interface ProjectOption {
  label: string;
  value: number;
}

const store = useStore();
const show_modal = ref(false);
const streak_name = ref('');
const projects_model = ref<number[]>([]);
const request_pending = ref(false);
const projects = computed(() => store.state.project.projects);

const getParsedProjects = computed<ProjectOption[]>(() => {
  return projects.value.map((project) => ({
    label: project.name,
    value: project.id,
  }));
});

const handleCreateStreak = async () => {
  request_pending.value = true;

  if (streak_name.value) {
    await store.dispatch(CREATE_STREAK, {
      name: streak_name.value,
      projects: projects_model.value,
    });

    show_modal.value = false;
    streak_name.value = '';
    projects_model.value = [];
  }

  request_pending.value = false;
};

const handleCancel = () => {
  show_modal.value = false;
  streak_name.value = '';
  projects_model.value = [];
};

defineExpose({ show_modal });
</script>

<style scoped lang="scss">
.create-streak-modal {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
}
</style>
