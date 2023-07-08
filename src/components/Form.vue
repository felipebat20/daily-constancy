<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Form to create new task">
        <input
          type="text"
          class="input"
          placeholder="Which task would you like start?"
        />
      </div>

      <div class="column">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <section>
            <strong>{{ getTimer }}</strong>
          </section>

          <button
            class="button"
            @click="startTimer"
          >
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>

            <span>play</span>
          </button>

          <button
            class="button"
            @click="stopTimer"
          >
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>

            <span>stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'VForm',
    data: () => ({
      timeInSeconds: 0,
      timer: 0,
    }),

    computed: {
      getTimer(): string {
        return new Date(this.timeInSeconds * 1000).toISOString().substring(11, 19);
      },
    },

    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          this.timeInSeconds += 1;
        }, 1000);
      },

      stopTimer() {
        clearInterval(this.timer);
      },
    },
  });
</script>