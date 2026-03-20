<template>
  <q-input
    v-model="internalValue"
    :label="label"
    :placeholder="placeholder"
    :outlined="outlined"
    :dense="dense"
    :disable="disabled"
    :readonly="readonly"
    :type="type"
    :error="hasError"
    :error-message="errorMessage"
    :hint="helperText"
    :color="error ? 'negative' : 'primary'"
    :bottom-slots="!!helperText || !!errorMessage"
    :class="classes"
    v-bind="$attrs"
  >
    <template
      v-if="icon"
      #prepend
    >
      <q-icon :name="icon" />
    </template>

    <template
      v-if="clearable && internalValue"
      #append
    >
      <q-btn
        icon="close"
        flat
        round
        dense
        @click="clear"
        aria-label="Clear input"
      />
    </template>

    <template #hint>
      <slot name="hint">
        <span :class="{ 'text-negative': hasError }">{{ helperText }}</span>
      </slot>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  icon?: string;
  type?: string;
  outlined?: boolean;
  dense?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  icon: '',
  type: 'text',
  outlined: true,
  dense: true,
  disabled: false,
  readonly: false,
  clearable: false,
  error: false,
  errorMessage: '',
  helperText: '',
  size: 'md',
});

const emit = defineEmits(['update:modelValue', 'clear']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const hasError = computed(() => props.error || !!props.errorMessage);

const clear = () => {
  emit('update:modelValue', '');
  emit('clear');
};

const classes = computed(() => ({
  'ds-textfield--sm': props.size === 'sm',
  'ds-textfield--lg': props.size === 'lg',
}));
</script>

<style scoped lang="scss">
.ds-textfield {
  :deep(.q-field__control) {
    border-radius: var(--radius-md);
    transition: all var(--transition-base);
  }

  :deep(.q-field--outlined .q-field__control::before) {
    border-color: var(--border-color);
    transition: all var(--transition-base);
  }

  :deep(.q-field--focused .q-field__control::before) {
    border-color: var(--primary-accent);
    border-width: 2px;
  }

  :deep(.q-field__label) {
    color: var(--text-secondary);
    font-weight: var(--font-medium);
    transition: all var(--transition-base);
  }

  :deep(.q-field__marginal) {
    color: var(--text-secondary);
  }

  :deep(.q-field--focused .q-field__label) {
    color: var(--primary-accent);
  }

  :deep(.q-field--dark) {
    .q-field__control::before {
      border-color: var(--border-color);
    }
  }

  :deep(.q-field--dark.q-field--focused .q-field__control::before) {
    border-color: var(--primary-accent);
  }

  &--sm {
    :deep(.q-field__label) {
      font-size: var(--text-sm);
    }
  }

  &--lg {
    :deep(.q-field__label) {
      font-size: var(--text-lg);
    }
  }
}
</style>
