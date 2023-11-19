<template>
  <component :is="getHeadingLevel">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { useSlots, computed } from 'vue';

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
