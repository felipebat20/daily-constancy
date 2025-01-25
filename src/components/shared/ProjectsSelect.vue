<script lang="ts" setup>
  import { computed, defineModel } from 'vue';
  import { ref } from 'vue';

  import { useStore } from '@/store';

  interface projectOptions {
    label: string;
    value: null | number;
  }

  const store = useStore();

  const projects = computed(() => store.state.project.projects);

  const project_id = ref<number | null>(null);

  defineModel('project_id', {
    type: Number,
    required: true,
  });

  const getParsedProjects = computed(() => {
    const parsed_projects : projectOptions[] = [
      {
        value: null,
        label: 'Select a project',
      },
    ];

    parsed_projects.push(
      ...projects.value.map((project) => ({
        label: project.name,
        value: project.id,
      }))
    );

    return parsed_projects;
  });
</script>

<template>
  <q-select
    :options="getParsedProjects"
    v-model="project_id"
    label="Select a project"
    outlined
    emit-value
    color="deep-orange-5"
    map-options
    dense
    options-dense
  >
    <template #option="scope">
      <q-item
        v-bind="scope.itemProps"
        dense
      >
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
