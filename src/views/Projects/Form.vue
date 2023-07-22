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

    data: () => ({
      project_name: '' as string,
    }),

    mounted() {
      if (this.id) {
        const project = this.store.state.projects.find(proj => proj.id === this.id)

        this.project_name = project?.name || '';
      }
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

    setup () {
      const store = useStore();
      const { notify } = useNotify();

      return {
        store,
        notify,
      };
    },
  });
</script>
