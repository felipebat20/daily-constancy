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

  import ProjectInterface from '../interfaces/Project.interface';

  export default defineComponent({
    name: 'ATProjects',
    data: () => ({
      project_name: '' as string,
      projects: [] as ProjectInterface[],
    }),

    methods: {
      submitForm() {
        const project: ProjectInterface = {
          id: new Date().toISOString(),
          name: this.project_name,
        };

        this.projects.push(project);
        this.project_name = '';
      },
    }
  });
</script>

<style scoped>
  .projects {
    padding: 1.25rem;
  }
</style>
