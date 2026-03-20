<template>
  <component
    :is="getHeadingLevel"
    class="ds-heading"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  level: {
    type: String,
    default: 'h1',
    validator: (value: string) => [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ].includes(value)
  }
});

const getHeadingLevel = computed(() => props.level);
</script>

<style scoped lang="scss">
.ds-heading {
  margin: 0;
  font-weight: var(--font-bold);
  color: var(--text-primary);
  line-height: 1.3;

  :deep(h1) {
    font-size: var(--text-3xl);
  }

  :deep(h2) {
    font-size: var(--text-2xl);
  }

  :deep(h3) {
    font-size: var(--text-xl);
  }

  :deep(h4) {
    font-size: var(--text-lg);
  }

  :deep(h5) {
    font-size: var(--text-base);
  }

  :deep(h6) {
    font-size: var(--text-sm);
  }
}
</style>
