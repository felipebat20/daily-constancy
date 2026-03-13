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
  type: 'text',
  outlined: true,
  dense: true,
  disabled: false,
  readonly: false,
  clearable: false,
  error: false,
  size: 'md',
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  'clear': [];
}>();

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
    border-radius: var(--radius-sm);
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
