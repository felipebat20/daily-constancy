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
        :disabled="request_pending"
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
  import { useRouter, useRoute } from 'vue-router';
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

    setup () {
      const store = useStore();
      const project_name = ref('');
      const router = useRouter();
      const route = useRoute();
      const $q = useQuasar();
      const request_pending = ref(false);

      const { project_id } = route.params;

      if (project_id) {
        request_pending.value = true;
        store.dispatch(FETCH_PROJECTS).then(() => {
          request_pending.value = false;
          const project = store.state.project.projects
            .find(proj => proj.id.toString() === project_id);

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
        if (project_id) {
          return store.dispatch(EDIT_PROJECT, { id: project_id, name: project_name.value });
        }

        return store.dispatch(CREATE_NEW_PROJECT, project_name.value);
      };

      return {
        project_name,
        submitForm,
        request_pending,
      };
    },
  });
</script>
