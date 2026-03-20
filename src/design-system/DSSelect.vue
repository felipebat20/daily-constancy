<template>
  <q-select
    v-model="internalValue"
    :options="options"
    :label="label"
    :placeholder="placeholder"
    :outlined="outlined"
    :dense="dense"
    :disable="disabled"
    :readonly="readonly"
    :multiple="multiple"
    :clearable="clearable"
    :loading="loading"
    :option-label="optionLabel"
    :option-value="optionValue"
    :emit-value="true"
    :map-options="true"
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

    <template #option="scope">
      <q-item
        v-bind="scope.itemProps"
        :dense="dense"
      >
        <q-item-section>
          <q-item-label>{{ scope.opt[props.optionLabel] }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template #hint>
      <slot name="hint">
        <span :class="{ 'text-negative': hasError }">{{ helperText }}</span>
      </slot>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props<T = unknown> {
  modelValue: T;
  options: T[];
  label?: string;
  placeholder?: string;
  icon?: string;
  outlined?: boolean;
  dense?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  icon: '',
  outlined: true,
  dense: true,
  disabled: false,
  readonly: false,
  multiple: false,
  clearable: false,
  loading: false,
  optionLabel: 'label',
  optionValue: 'value',
  error: false,
  errorMessage: '',
  helperText: '',
  size: 'md',
});

const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const hasError = computed(() => props.error || !!props.errorMessage);

const classes = computed(() => ({
  'ds-select--sm': props.size === 'sm',
  'ds-select--lg': props.size === 'lg',
}));
</script>

<style scoped lang="scss">
.ds-select {
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

  :deep(.q-menu) {
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    margin-top: 8px;
  }

  :deep(.q-item) {
    border-radius: var(--radius-md);
    margin: var(--space-1) var(--space-2);
    transition: all var(--transition-fast);

    &:hover {
      background-color: var(--bg-secondary);
    }
  }

  :deep(.q-item--active) {
    background-color: var(--primary-accent-focus);
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
