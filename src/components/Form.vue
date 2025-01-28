<template>
  <div class="flex md:flex-col mb-0">
    <div class="flex w-full max-sm:flex-col justify-between gap-2">
      <div class="flex max-sm:flex-col gap-2">
        <div
          role="form"
          aria-label="Form to create new task"
          class="md:w-[520px]"
        >
          <q-input
            type="text"
            outlined
            dense
            placeholder="Which task would you like start?"
            color="deep-orange-5"
            v-model="description"
            :autofocus="$q.screen.gt.xs"
          />
        </div>

        <div class="md:w-[520px]">
          <ProjectsSelect
            v-model="project_id"
            :project_id="project_id"
          />
        </div>
      </div>

      <div>
        <Timer
          :task-name="description"
          :play-request-pending="playRequestPending"
          :stop-request-pending="stopRequestPending"
          @time-is-finished="finishTask"
          @start-timer="startTimer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { AxiosResponse } from 'axios';
  import { computed, defineComponent, ref, watch } from 'vue';

  import Timer from './Timer.vue';
  import ProjectsSelect from './shared/ProjectsSelect.vue';

  import { useStore } from '@/store';
  import {
    CREATE_NEW_TASK,
    FETCH_PROJECTS,
    FINISH_TASK_SESSION,
    CREATE_TASK_SESSION
  } from '@/store/types/actions';
  import { NEW_ACTIVE_TASK } from '@/store/types/mutations';

  export default defineComponent({
    name: 'VForm',
    components: {
      Timer,
      ProjectsSelect
    },

    emits: ['save-task'],
    setup() {
      const store = useStore();
      const description = ref('');
      const project_id = ref<number | null>(null);
      const projects = computed(() => store.state.project.projects);
      const active_task = computed(() => store.state.task.active_task);
      const playRequestPending = ref(false);
      const stopRequestPending = ref(false);

      store.dispatch(FETCH_PROJECTS);

      const finishTask = async (): Promise<void | boolean> => {
        stopRequestPending.value = true;
        await handleFinishTask();

        return stopRequestPending.value = false;
      };

      const handleFinishTask = async () => {
        const project = projects.value.find(project => project.id === project_id.value);
        const task_name = description.value;

        description.value = '';
        project_id.value = null;

        if (active_task.value.id) {
          await store.dispatch(FINISH_TASK_SESSION, active_task.value);

          return store.commit(NEW_ACTIVE_TASK, {});
        }

        await store.dispatch(CREATE_NEW_TASK, {
          description: task_name,
          id: new Date().getTime(),
          project,
        });
      };

      const startTimer = async (time: number): Promise<void> => {
        const project = projects.value.find(project => project.id === project_id.value);
        const task_name = description.value;

        description.value = '';
        project_id.value = null;

        playRequestPending.value = true;
        await store.dispatch(CREATE_NEW_TASK, {
          description: task_name,
          time_spent: time,
          id: new Date().getTime(),
          project,
        });

        playRequestPending.value = false;
      };

      watch(active_task, (state, prev_state) => {
        if (state.id && state.id !== prev_state.id) {
          description.value = active_task.value.description;
          if (state.project?.id) {
            project_id.value = state.project.id;
          }

          if (prev_state?.endAt) {
            store.dispatch(FINISH_TASK_SESSION, prev_state);
          }
        }

        if (! state.id) {
          description.value = '';
          project_id.value = null;
        }
      });

      return {
        description,
        project_id,
        projects,
        finishTask,
        startTimer,
        playRequestPending,
        stopRequestPending,
      };
    },
  });
</script>

<style>
  .form {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .height-1 { height: 20px; }
</style>
