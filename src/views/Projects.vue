<template>
  <section class="projects">
    <h1 class="title">Projects</h1>

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
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { useStore } from '../store';

  export default defineComponent({
    name: 'ATProjects',
    setup () {
      const store = useStore();

      return {
        projects: computed(() => store.state.projects),
      };
    },
  });
</script>

<style scoped>
  .projects {
    padding: 1.25rem;
  }
</style>
