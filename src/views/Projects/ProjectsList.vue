<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        Projects
      </h1>

      <q-btn
        no-caps
        class="mr-0 ml-auto button"
        @click="handleCreateProject"
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
              color="primary"
              icon="edit"
              dense
              @click="handleEditProject(props.row)"
            />

            <q-btn
              icon="delete"
              color="red"
              dense
              @click="handleDeleteProject(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>

    <ProjectsForm ref="projectsForm" />
    <DeleteProjectModal ref="deleteProjectModal" />
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, computed, ref } from 'vue';
  import type { QTableProps } from 'quasar';

  import formatDate from '@/hooks/formatDate';
  import ProjectInterface from '@/interfaces/Project.interface';
  import ProjectsForm from './CreateEditProjectModal.vue';
  import DeleteProjectModal from './DeleteProjectModal.vue';

  const projectsForm = ref(ProjectsForm);
  const deleteProjectModal = ref(DeleteProjectModal);

  import { useStore } from '@/store';
  import { FETCH_PROJECTS, DELETE_PROJECT } from '@/store/types/actions';

  const store = useStore();

  store.dispatch(FETCH_PROJECTS);

  const projects = computed(() => store.state.project.projects);

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

  const handleEditProject = (project: ProjectInterface) => {
    projectsForm.value.showModal(project);
    projectsForm.value.project = project;
  };

  const handleDeleteProject = (project: ProjectInterface) => {
    deleteProjectModal.value.showModal(project);
  };

  const handleCreateProject = () => {
    projectsForm.value.showModal();
  };
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
