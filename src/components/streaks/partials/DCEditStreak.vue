<template>
  <q-dialog
    v-model="show_modal"
    persistent
  >
    <q-card style="min-width: 450px">
      <q-card-section>
        <div class="text-h6">
          Update streak
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="streak_name"
          autofocus
          label="Name"
          @keyup.enter="show_modal = false"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          dense
          v-model="projects_model"
          multiple
          :options="getParsedProjects"
          label="Projects"
          options-dense
          clearable
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary"
      >
        <q-btn
          flat
          label="Cancel"
          v-close-popup
        />

        <q-btn
          flat
          label="Update streak"
          :loading="request_pending"
          @click="handleCreateStreak"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import { ref, computed, defineExpose } from 'vue';

  import StreakInterface from '@/interfaces/Streak.interface';

  import { useStore } from '@/store';
  import { EDIT_STREAK } from '@/store/types/actions';

  const store = useStore();
  const show_modal = ref(false);
  const streak_name = ref('');
  const projects_model = ref([]);
  const request_pending = ref(false);
  const projects = computed(() => store.state.project.projects);
  const streak = ref({});

  const getParsedProjects = computed(() => {
    const parsed_projects = [];

    parsed_projects.push(
      ...projects.value.map((project) => ({
        label: project.name,
        value: project.id,
      }))
    );

    return parsed_projects;
  });

  const handleCreateStreak = async () => {
    request_pending.value = true;

    if (streak_name.value) {
      await store.dispatch(EDIT_STREAK, {
        id: streak.value.id,
        name: streak_name.value,
        projects: projects_model.value?.map(project => project.value) || [],
      });

      show_modal.value = false;
    }

    request_pending.value = false;
  };

  const handleOpenModal = (updatable_streak: StreakInterface) => {
    streak.value = updatable_streak;
    streak_name.value = updatable_streak.name;
    projects_model.value = updatable_streak.projects.map(project => ({ label: project.name, value: project.id }));

    show_modal.value = true;
  };

  defineExpose({ show_modal, handleOpenModal });
</script>

<style scoped lang="scss">

</style>
