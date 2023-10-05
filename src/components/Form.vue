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
        <q-select
          :options="getParsedProjects"
          v-model="project_id"
          label="Select a project"
          outlined
          emit-value
          map-options
          dense
          options-dense
        >
          <template #option="scope">
            <q-item
              v-bind="scope.itemProps"
              dense
            >
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
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

  interface projectOptions {
    label: string;
    value: null | number;
  }

  export default defineComponent({
    name: 'VForm',
    components: { Timer },
    emits: ['save-task'],
    setup() {
      const store = useStore();
      const description = ref('');
      const project_id = ref<number | null>(null);
      const projects = computed(() => store.state.project.projects);
      const active_task = computed(() => store.state.task.active_task);

      store.dispatch(FETCH_PROJECTS);

      const finishTask = (time: number): Promise<AxiosResponse> => {
        const project = projects.value.find(project => project.id === project_id.value);
        const task_name = description.value;

        description.value = '';
        project_id.value = null;

        if (active_task.value.id) {
          return store.dispatch(UPDATE_TASK, {
            ...active_task.value,
            description: task_name,
            project,
            time_spent: time - active_task.value.total_time_spent,
          }).then(() => store.dispatch(SET_ACTIVE_TASK, {}));
        }

        return store.dispatch(CREATE_NEW_TASK, {
          description: task_name,
          time_spent: time,
          id: new Date().getTime(),
          project,
        });
      };

      watch(active_task, (state, prev_state) => {
        if (state.id && state.id !== prev_state.id) {
          description.value = active_task.value.description;
          if (state.project?.id) {
            project_id.value = state.project.id;
          }
        }
      });

      const getParsedProjects = computed(() => {
        const parsed_projects : projectOptions[] = [
          {
            value: null,
            label: 'Select a project',
          },
        ];

        parsed_projects.push(
          ...projects.value.map((project) => ({
            label: project.name,
            value: project.id,
          }))
        );

        return parsed_projects;
      });

      return {
        description,
        project_id,
        projects,
        finishTask,
        getParsedProjects,
      };
    },
  });
</script>

<style>
  .form {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .height-1 {
    height: 20px;
  }
</style>
