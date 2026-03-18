<template>
  <div class="projects-list">
    <DSPageHeader
      title="Projects"
    >
      <template #right>
        <DSButton
          icon="add"
          label="New Project"
          @click="handleCreateProject"
        />
      </template>
    </DSPageHeader>

    <DSTable
      :rows="projects"
      :columns="columns"
      :loading="false"
      dense
      sticky-header
      class="projects-list__table"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <div class="projects-list__actions">
            <DSButton
              icon="edit"
              variant="secondary"
              size="sm"
              class="projects-list__action-btn"
              @click="handleEditProject(props.row)"
              aria-label="Edit project"
            />

            <DSButton
              icon="delete"
              variant="danger"
              size="sm"
              class="projects-list__action-btn"
              @click="handleDeleteProject(props.row)"
              aria-label="Delete project"
            />
          </div>
        </q-td>
      </template>
    </DSTable>

    <ProjectsForm ref="projectsForm" />
    <DeleteProjectModal ref="deleteProjectModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { QTableProps } from 'quasar';

import formatDate from '@/hooks/formatDate';
import ProjectInterface from '@/interfaces/Project.interface';
import ProjectsForm from './CreateEditProjectModal.vue';
import DeleteProjectModal from './DeleteProjectModal.vue';

import DSPageHeader from '@/design-system/DSPageHeader.vue';
import DSTable from '@/design-system/DSTable.vue';
import DSButton from '@/design-system/DSButton.vue';

const projectsForm = ref(ProjectsForm);
const deleteProjectModal = ref(DeleteProjectModal);

import { useStore } from '@/store';
import { FETCH_PROJECTS } from '@/store/types/actions';

const store = useStore();
store.dispatch(FETCH_PROJECTS);

const projects = computed(() => store.state.project.projects);

const columns: QTableProps['columns'] = [
  {
    name: 'Name',
    field: 'name',
    label: 'Name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'createdAt',
    field: (row) => formatDate(new Date(row.createdAt)),
    label: 'Created at',
    align: 'left',
    sortable: true,
    style: 'width: 180px',
  },
  {
    name: 'actions',
    field: 'id',
    label: '',
    align: 'right',
    style: 'width: 160px',
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

<style scoped lang="scss">
.projects-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);

  &__table {
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  &__actions {
    display: flex;
    gap: var(--space-3);
    justify-content: flex-end;
    align-items: center;
  }

  &__action-btn {
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
