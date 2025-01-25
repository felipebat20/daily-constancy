<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        Projects
      </h1>

      <q-btn
        no-caps
        to="/projects/create"
        class="mr-0 ml-auto button"
      >
        <span>New project</span>
      </q-btn>
    </div>

    <q-table
      :rows="projects"
      :columns="columns"
    >
      <template #body-cell-actions="props">
        <q-td>
          <div class="flex items-center gap-2 justify-center">
            <q-btn
              :to="`/projects/${props.row.id}`"
              icon="edit"
              color="primary"
              dense
            />

            <q-btn
              icon="delete"
              color="red"
              dense
              @click="deleteTask(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, computed } from 'vue';
  import type { QTableProps } from 'quasar';

  import formatDate from '@/hooks/formatDate';
  import ProjectInterface from '@/interfaces/Project.interface';

  import { useStore } from '@/store';
  import { FETCH_PROJECTS, DELETE_PROJECT } from '@/store/types/actions';

  const store = useStore();

  store.dispatch(FETCH_PROJECTS);

  const projects = computed(() => store.state.project.projects);

  const deleteTask = (project: ProjectInterface) => {
    const { id } = project;

    return store.dispatch(DELETE_PROJECT, { id });
  };

  const columns: QTableProps['columns'] = [
    {
      name: 'Name',
      field: 'name',
      label: 'Name',
      align: 'left',
    },

    {
      name: 'createdAt',
      field: (row) => formatDate(new Date(row.createdAt)),
      label: 'Created at',
      align: 'left',
    },

    {
      name: 'actions',
      field: 'id',
      label: '',
    },
  ];
</script>

<style lang="scss" scoped>
  .projects {
    padding: 1.25rem;

    .table {
      background-color: var(--accent-background);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 1rem;

      td, th { border-color: var(--border-color); }
    }
  }
</style>
