<template>
  <router-link to="/projects/create" class="button">
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>

    <span>New project</span>
  </router-link>

  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>
          ID
        </th>

        <th>
          Name
        </th>

        <th>
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="project in projects" :key="project.id">
        <td>
          {{ project.id }}
        </td>

        <td>
          {{ project.name }}
        </td>

        <td>
          <router-link :to="`/projects/${project.id}`" class="button">
            <span class="icon is-small">
              <i class="fas fa-pencil-alt"></i>
            </span>
          </router-link>

          <button class="button ml-2 is-danger" @click="deleteTask(project)">
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
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

  export default defineComponent({
    name: 'ATProjectsList',
    setup () {
      const store = useStore();

      store.dispatch(FETCH_PROJECTS);

      return {
        store,
        projects: computed(() => store.state.projects),
      };
    },

    methods: {
      deleteTask(project: ProjectInterface) {
        const { id } = project;

        return this.store.dispatch(DELETE_PROJECT, { id });
      },
    }
  });
</script>

<style scoped>
  .projects {
    padding: 1.25rem;
  }
</style>
