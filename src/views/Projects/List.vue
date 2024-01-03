<template>
  <router-link
    to="/projects/create"
    class="mr-0 ml-auto button"
  >
    <span class="icon is-small">
      <i class="fas fa-plus" />
    </span>

    <span>New project</span>
  </router-link>

  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>
          Name
        </th>

        <th>
          Created at
        </th>

        <th>
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="project in projects"
        :key="project.id"
      >
        <td>
          {{ project.name }}
        </td>

        <td>
          {{ formatDate(new Date(project.createdAt || (+project.id))) }}
        </td>

        <td>
          <router-link
            :to="`/projects/${project.id}`"
            class="button"
          >
            <span class="icon is-small">
              <i class="fas fa-pencil-alt" />
            </span>
          </router-link>

          <button
            class="button ml-2 is-danger"
            @click="deleteTask(project)"
          >
            <span class="icon is-small">
              <i class="fas fa-trash" />
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import ProjectInterface from '@/interfaces/Project.interface';

  import { useStore } from '@/store';
  import { FETCH_PROJECTS, DELETE_PROJECT } from '@/store/types/actions';
  import formatDate from '@/hooks/formatDate';

  export default defineComponent({
    name: 'ATProjectsList',
    setup () {
      const store = useStore();

      store.dispatch(FETCH_PROJECTS);

      return {
        store,
        projects: computed(() => store.state.project.projects),
      };
    },

    methods: {
      formatDate,
      deleteTask(project: ProjectInterface) {
        const { id } = project;

        return this.store.dispatch(DELETE_PROJECT, { id });
      },
    },
  });
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
