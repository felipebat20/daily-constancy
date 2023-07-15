<template>
  <form @submit.prevent="submitForm">
    <div class="field">
      <label for="projectName" class="label">
        Project name
      </label>

      <input v-model="project_name" type="text" class="input" id="projectName" autofocus />
    </div>

    <div class="field">
      <button class="button" type="submit">
        Save
      </button>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { useStore } from '@/store';

  import { EDIT_PROJECT, ADD_PROJECT } from '@/store/types/mutations';

  export default defineComponent({
    name: 'ATProjectsForm',
    props: {
      id: {
        type: String,
        default: '',
      },
    },

    data: () => ({
      project_name: '' as string,
    }),

    mounted() {
      console.log(this.id);

      if (this.id) {
        const project = this.store.state.projects.find(proj => proj.id === this.id)

        console.log(project);


        this.project_name = project?.name || '';
      }
    },

    methods: {
      submitForm() {
        this.saveOrUpdateProject();
        this.project_name = '';
        this.$router.push('/projects')
      },

      saveOrUpdateProject() {
        if (this.id) {
          return this.store.commit(EDIT_PROJECT, { id: this.id, name: this.project_name });
        }

        return this.store.commit(ADD_PROJECT, this.project_name);
      }
    },

    setup () {
      const store = useStore();

      return {
        store,
      };
    },
  });
</script>