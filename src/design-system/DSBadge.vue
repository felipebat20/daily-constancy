<template>
  <q-badge
    :color="variantColor"
    :text-color="textColor"
    :outline="outline"
    rounded
    :class="classes"
    :style="badgeStyle"
  >
    <q-icon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      :class="{ 'q-mr-xs': label }"
    />

    <span
      v-if="label"
      class="ds-badge__label"
    >{{ label }}</span>

    <slot />
  </q-badge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  outline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  icon: '',
  variant: 'primary',
  size: 'md',
  outline: false,
});

const variantColor = computed(() => {
  const colors: Record<string, string> = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'positive',
    danger: 'negative',
    warning: 'warning',
    info: 'info',
  };
  return colors[props.variant];
});

const textColor = computed(() => {
  if (props.outline) return 'primary';
  return undefined;
});

const iconSize = computed(() => {
  const sizes: Record<string, string> = {
    sm: '12px',
    md: '14px',
    lg: '16px',
  };
  return sizes[props.size];
});

const badgeStyle = computed(() => ({
  fontSize: props.size === 'sm' ? '0.75rem' : props.size === 'lg' ? '1rem' : '0.875rem',
}));

const classes = computed(() => ({
  'ds-badge--sm': props.size === 'sm',
  'ds-badge--lg': props.size === 'lg',
}));
</script>

<style scoped lang="scss">
.ds-badge {
  transition: all var(--transition-base);
  box-shadow: var(--shadow-xs);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  &__label {
    font-weight: var(--font-semibold);
    letter-spacing: 0.01em;
  }
}
</style>
