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

  import { useStore } from '@/store';
  import { CREATE_NEW_PROJECT, EDIT_PROJECT } from '@/store/types/actions';

  import { NotificationType } from '@/interfaces/Notification.interface';

  import useNotify from '@/hooks/notify';

  export default defineComponent({
    name: 'ATProjectsForm',
    props: {
      id: {
        type: String,
        default: '',
      },
    },

    methods: {
      submitForm() {
        this.saveOrUpdateProject().then(() => {
          this.project_name = '';
          this.notify(NotificationType.SUCCESS, 'Great', 'You are fabulous');
          this.$router.push('/projects')
        });
      },

      saveOrUpdateProject() {
        if (this.id) {
          return this.store.dispatch(EDIT_PROJECT, { id: this.id, name: this.project_name });
        }

        return this.store.dispatch(CREATE_NEW_PROJECT, this.project_name);
      },
    },

    setup (props) {
      const store = useStore();
      const { notify } = useNotify();
      const project_name = ref('');

      if (props.id) {
        const project = store.state.project.projects
          .find(proj => proj.id == parseInt(props.id));

        project_name.value = project?.name || '';
      }

      return {
        store,
        notify,
        project_name,
      };
    },
  });
</script>
