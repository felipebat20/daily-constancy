<template>
  <div
    class="ds-toolbar"
    :class="classes"
  >
    <div class="ds-toolbar__left">
      <slot name="left">
        <h2
          v-if="title"
          class="ds-toolbar__title"
        >
          {{ title }}
        </h2>
      </slot>
    </div>

    <div
      v-if="$slots.center"
      class="ds-toolbar__center"
    >
      <slot name="center" />
    </div>

    <div
      v-if="$slots.right || $slots.default"
      class="ds-toolbar__right"
    >
      <slot name="right">
        <slot />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  bordered: false,
});

const classes = computed(() => ({
  'ds-toolbar--sm': props.size === 'sm',
  'ds-toolbar--lg': props.size === 'lg',
  'ds-toolbar--bordered': props.bordered,
}));
</script>

<style scoped lang="scss">
.ds-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background-color: var(--bg-primary);
  transition: all 0.2s ease;

  &--sm {
    padding: var(--space-3);
  }

  &--lg {
    padding: var(--space-5);
  }

  &--bordered {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
  }

  &__left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  &__center {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  &__right {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  &__title {
    margin: 0;
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }
}
</style>
