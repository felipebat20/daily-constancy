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
  import { computed, defineComponent, ref, watch } from 'vue';

  import Timer from './Timer.vue';

  import { useStore } from '@/store';
  import { CREATE_NEW_TASK, FETCH_PROJECTS, SET_ACTIVE_TASK, UPDATE_TASK } from '@/store/types/actions';
  import { AxiosResponse } from 'axios';

  export default defineComponent({
    name: 'VForm',
    components: { Timer },
    emits: ['save-task'],
    setup() {
      const store = useStore();
      const description = ref('');
      const project_id = ref(0);
      const projects = computed(() => store.state.project.projects);
      const active_task = computed(() => store.state.task.active_task);

      store.dispatch(FETCH_PROJECTS);

      const finishTask = (time: number): Promise<AxiosResponse> => {
        const project = projects.value.find(project => project.id === project_id.value);
        const task_name = description.value;

        description.value = '';

        if (active_task.value.id) {
          return store.dispatch(UPDATE_TASK, {
            ...active_task.value,
            description: task_name,
            project,
            time_spent: time,
          }).then(() => store.dispatch(SET_ACTIVE_TASK, {}));
        }

        return store.dispatch(CREATE_NEW_TASK, {
          description: task_name,
          time_spent: time,
          id: new Date().getTime(),
          project,
        });
      }

      watch(active_task, (state, prev_state) => {
        if (state.id && state.id !== prev_state.id) {
          description.value = active_task.value.description;
          if (state.project?.id) {
            project_id.value = state.project.id;
          }
        }
      });

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
