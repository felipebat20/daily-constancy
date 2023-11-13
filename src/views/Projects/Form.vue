<template>
  <form @submit.prevent="submitForm">
    <div class="field">
      <label
        for="projectName"
        class="label"
      >
        Project name
      </label>

      <input
        v-model="project_name"
        type="text"
        class="input"
        id="projectName"
        autofocus
      >
    </div>

    <div class="field">
      <button
        class="button"
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';

  import { useStore } from '@/store';
  import {
    CREATE_NEW_PROJECT,
    EDIT_PROJECT,
    FETCH_PROJECTS,
  } from '@/store/types/actions';

  export default defineComponent({
    name: 'ATProjectsForm',
    props: {
      id: {
        type: String,
        default: '',
      },
    },

    setup (props) {
      const store = useStore();
      const project_name = ref('');
      const router = useRouter();
      const $q = useQuasar();

      if (props.id) {
        store.dispatch(FETCH_PROJECTS).then(() => {
          const project = store.state.project.projects
            .find(proj => proj.id == parseInt(props.id));

          project_name.value = project?.name || '';
        });
      }

      const submitForm = () => {
        saveOrUpdateProject().then(() => {
          project_name.value = '';
          $q.notify({
            progress: true,
            type: 'positive',
            message: 'Your project is available!',
            position:  'top-right',
            icon: 'check_circle',
          });

          router.push('/projects');
        });
      };

      const saveOrUpdateProject = () => {
        if (props.id) {
          return store.dispatch(EDIT_PROJECT, { id: parseInt(props.id), name: project_name.value });
        }

        return store.dispatch(CREATE_NEW_PROJECT, project_name.value);
      };

      return {
        project_name,
        submitForm,
      };
    },
  });
</script>
