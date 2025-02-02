<template>
  <section>
    <span
      class="flex gap-1"
      :class="{ 'with-dark-theme': hasDarkTheme }"
    >
      <span class="icon">
        <i class="far fa-clock" />
      </span>

      <strong :class="{ 'with-dark-theme': hasDarkTheme }">
        {{ timer }}
      </strong>
    </span>
  </section>
</template>

<script lang="ts" setup>
  import { useFormatSecondsToNow } from '@/composables/formatTime';

  const props = defineProps({
    timeInSeconds: {
      type: Number,
      default: 0,
    },

    hasDarkTheme: {
      type: Boolean,
      required: true,
    },
  });

  const timer = useFormatSecondsToNow({ seconds: props.timeInSeconds });
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
