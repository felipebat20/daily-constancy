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
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  label: '',
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
  if (props.variant === 'success') return 'positive';
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
  'ds-button': true,
  [`ds-button--${props.variant}`]: true,
  [`ds-button--${props.size}`]: true,
}));
</script>

<style scoped>
.ds-button {
  transition: all var(--transition-base);
  font-weight: var(--font-semibold);
  letter-spacing: 0.01em;
}

.ds-button:not(.q-btn--disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ds-button:not(.q-btn--disabled):active {
  transform: translateY(0);
}

.ds-button--primary {
  background: linear-gradient(135deg, var(--primary-accent) 0%, var(--primary-accent-dark) 100%);
}

.ds-button--success {
  background: linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%);
}

.ds-button--danger {
  background: linear-gradient(135deg, var(--danger) 0%, var(--danger-dark) 100%);
}

.ds-button--secondary {
  background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%);
}

.ds-button--lg {
  height: 48px;
  font-size: var(--text-base);
}

.ds-button--md {
  height: 40px;
}

.ds-button--sm {
  height: 32px;
  font-size: var(--text-sm);
}
</style>
