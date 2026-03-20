<template>
  <DSModal
    v-model="show_modal"
    title="Update Streak"
    :loading="request_pending"
    confirm-label="Update Streak"
    @confirm="handleCreateStreak"
    @cancel="handleCancel"
  >
    <template #body>
      <div class="edit-streak-modal__fields">
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

import StreakInterface from '@/interfaces/Streak.interface';

import { useStore } from '@/store';
import { EDIT_STREAK } from '@/store/types/actions';

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
const streak = ref({} as StreakInterface);

const getParsedProjects = computed<ProjectOption[]>(() => {
  return projects.value.map((project) => ({
    label: project.name,
    value: project.id,
  }));
});

const handleCreateStreak = async () => {
  request_pending.value = true;

  if (streak_name.value) {
    await store.dispatch(EDIT_STREAK, {
      id: streak.value.id,
      name: streak_name.value,
      projects: projects_model.value,
    });

    show_modal.value = false;
  }

  request_pending.value = false;
};

const handleCancel = () => {
  show_modal.value = false;
};

const handleOpenModal = (updatable_streak: StreakInterface) => {
  streak.value = updatable_streak;
  streak_name.value = updatable_streak.name;
  projects_model.value = updatable_streak.projects.map(project => project.id);
  show_modal.value = true;
};

defineExpose({ show_modal, handleOpenModal });
</script>

<style scoped lang="scss">
.edit-streak-modal {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
}
</style>
