<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Form to create new task">
        <input
          type="text"
          class="input"
          placeholder="Which task would you like start?"
          v-model="description"
          autofocus
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="project_id">
            <option value="">Select a project</option>
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
          :task_name="description"
          @timeIsFinished="finishTask"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import Timer from './Timer.vue';
  import { useStore } from '@/store';

  export default defineComponent({
    name: 'VForm',
    components: { Timer },
    data: () => ({
      description: '' as string,
      project_id: '' as string,
    }),

    emits: ['save-task'],
    methods: {
      finishTask(time: number): void {
        this.$emit('save-task', {
          description: this.description,
          time_spent: time,
          project: this.projects.find(project => project.id === this.project_id),
        });

        this.description = '';
      },
    },

    setup() {
      const store = useStore();

      return {
        projects: computed(() => store.state.projects),
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