<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Form to create new task">
        <input
          type="text"
          class="input"
          placeholder="Which task would you like start?"
          v-model="description"
        />
      </div>

      <div class="column">
        <Timer @timeIsFinished="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Timer from './Timer.vue';

  export default defineComponent({
    name: 'VForm',
    components: { Timer },
    data: () => ({ description: '' }),
    methods: {
      finishTask(time: number): void {
        this.description = '';
      },
    }
  });
</script>