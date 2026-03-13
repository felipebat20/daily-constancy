<template>
  <DSSelect
    v-model="internalValue"
    :options="parsedProjects"
    label="Select a project"
    icon="folder"
    clearable
    aria-label="Select project"
  />
</template>

<script lang="ts" setup>
import { computed, defineModel } from 'vue';

import DSSelect from '@/design-system/DSSelect.vue';

import { useStore } from '@/store';

interface ProjectOption {
  label: string;
  value: null | number;
}

const store = useStore();
const projects = computed(() => store.state.project.projects);

const project_id = defineModel<number | null>('project_id', {
  type: Number,
  required: true,
});

const parsedProjects = computed<ProjectOption[]>(() => [
  {
    label: 'No project',
    value: null,
  },
  ...projects.value.map((project) => ({
    label: project.name,
    value: project.id,
  })),
]);
</script>
