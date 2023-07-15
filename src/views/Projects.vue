<template>
  <section class="projects">
    <h1 class="title">Projects</h1>

    <form @submit.prevent="submitForm">
      <div class="field">
        <label for="projectName" class="label">
          Project name
        </label>

        <input v-model="project_name" type="text" class="input" id="projectName" />
      </div>

      <div class="field">
        <button class="button" type="submit">
          Save
        </button>
      </div>
    </form>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>
            ID
          </th>

          <th>
            Name
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
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { useStore } from '../store';

  export default defineComponent({
    name: 'ATProjects',
    data: () => ({
      project_name: '' as string,
    }),

    methods: {
      submitForm() {
        this.store.commit('ADD_PROJECT', this.project_name);
        this.project_name = '';
      },
    },

    setup () {
      const store = useStore();

      return {
        store,
        projects: store.state.projects,
      };
    },
  });
</script>

<style scoped>
  .projects {
    padding: 1.25rem;
  }
</style>
