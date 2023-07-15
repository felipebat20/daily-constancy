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
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { useStore } from '@/store';

  export default defineComponent({
    name: 'ATProjectsForm',
    data: () => ({
      project_name: '' as string,
    }),

    methods: {
      submitForm() {
        this.store.commit('ADD_PROJECT', this.project_name);
        this.project_name = '';
        this.$router.push('/projects')
      },
    },

    setup () {
      const store = useStore();

      return {
        store,
      };
    },
  });
</script>

<style scoped>
  .projects {
    padding: 1.25rem;
  }
</style>
