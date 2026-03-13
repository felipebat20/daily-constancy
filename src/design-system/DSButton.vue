<template>
  <q-btn
    :color="getVariantColor"
    :outline="isOutline"
    :flat="isGhost"
    :dense="size === 'sm'"
    :loading="loading"
    :disable="disabled"
    :size="getSize"
    no-caps
    unelevated
    rounded
    :class="classes"
    v-bind="$attrs"
  >
    <q-icon
      v-if="icon && !loading"
      :name="icon"
      :class="{ 'q-mr-xs': label }"
    />

    <span v-if="label">{{ label }}</span>

    <slot />
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
});

const isOutline = computed(() => props.variant === 'outline');
const isGhost = computed(() => props.variant === 'ghost');

const getVariantColor = computed(() => {
  if (props.variant === 'outline') return 'primary';
  if (props.variant === 'ghost') return undefined;
  if (props.variant === 'danger') return 'negative';
  if (props.variant === 'warning') return 'warning';
  if (props.variant === 'secondary') return 'secondary';
  return 'primary';
});

const getSize = computed(() => {
  if (props.size === 'lg') return 'lg';
  if (props.size === 'sm') return undefined;
  return 'md';
});

const classes = computed(() => ({
  'q-px-md': props.size !== 'sm',
  'q-px-sm': props.size === 'sm',
}));
</script>
