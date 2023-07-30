<template>
  <section>
    <span
      class="icon-text"
      :class="{ 'with-dark-theme': hasDarkTheme }"
    >
      <span class="icon">
        <i class="far fa-clock" />
      </span>

      <strong :class="{ 'with-dark-theme': hasDarkTheme }">
        {{ getTimer }}
      </strong>
    </span>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ALTimerDisplay',
    props: {
      timeInSeconds: {
        type: Number,
        default: 0,
      },

      hasDarkTheme: {
        type: Boolean,
        required: true,
      },
    },

    computed: {
      getTimer(): string {
        return new Date(this.timeInSeconds * 1000).toISOString().substring(11, 19);
      },
    },
  });
</script>

<style scoped>
  .icon-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    color: #000;
    padding: 2px 5px;
    border-radius: 5px;
  }

  .with-dark-theme {
    color: var(--text-primary);
    background-color: var(--bg-primary);
  }
</style>
