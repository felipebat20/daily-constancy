<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Form to create new task"
      >
        <input
          type="text"
          class="input"
          placeholder="Which task would you like start?"
          v-model="description"
          autofocus
        >
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="project_id">
            <option :value="0">
              Select a project
            </option>
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <Timer
          :task-name="description"
          @time-is-finished="finishTask"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';

  import Timer from './Timer.vue';

  import { useStore } from '@/store';
  import { FETCH_PROJECTS } from '@/store/types/actions';

  export default defineComponent({
    name: 'VForm',
    components: { Timer },
    emits: ['save-task'],
    setup(props, { emit }) {
      const store = useStore();
      const description = ref('');
      const project_id = ref(0);
      const projects = computed(() => store.state.project.projects);

      store.dispatch(FETCH_PROJECTS);

      const finishTask = (time: number): void => {
        const project = projects.value.find(project => project.id === project_id.value);

        emit('save-task', {
          description: description.value,
          time_spent: time,
          project,
        });

        description.value = '';
      }

      return {
        description,
        project_id,
        projects,
        finishTask,
      };
    },
  });
</script>

<style>
  .form {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }
</style>
