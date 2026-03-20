<template>
  <q-dialog
    v-model="isOpen"
    :persistent="persistent"
    :maximized="maximized"
    @hide="onHide"
  >
    <q-card
      :style="cardStyle"
      class="ds-modal"
    >
      <q-card-section class="ds-modal__header q-pb-sm">
        <div class="ds-modal__header-content">
          <h3 class="ds-modal__title">
            {{ title }}
          </h3>
          <q-btn
            icon="close"
            flat
            round
            dense
            @click="close"
            aria-label="Close modal"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="ds-modal__body">
        <slot name="body">
          {{ message }}
        </slot>
      </q-card-section>

      <q-card-actions
        v-if="hasFooter"
        class="ds-modal__footer q-pt-none"
        align="right"
      >
        <slot name="footer">
          <DSButton
            label="Cancel"
            variant="outline"
            @click="close"
          />
          <DSButton
            :label="confirmLabel"
            :loading="loading"
            @click="confirm"
          />
        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import DSButton from './DSButton.vue';

interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  persistent?: boolean;
  maximized?: boolean;
  loading?: boolean;
  confirmLabel?: string;
  hasFooter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  message: '',
  persistent: false,
  maximized: false,
  loading: false,
  confirmLabel: 'Confirm',
  hasFooter: true,
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'hide']);

const $q = useQuasar();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const cardStyle = computed(() => ({
  minWidth: $q.screen.width > 450 ? '450px' : '100%',
}));

const close = () => {
  isOpen.value = false;
  emit('cancel');
};

const confirm = () => {
  emit('confirm');
};

const onHide = () => {
  emit('hide');
};
</script>

<style scoped lang="scss">
.ds-modal {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);

  &__header {
    padding: var(--space-6);

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
    }
  }

  &__title {
    margin: 0;
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  &__body {
    padding: var(--space-6);
    color: var(--text-secondary);
  }

  &__footer {
    padding: var(--space-4) var(--space-6) var(--space-6);
    gap: var(--space-3);
  }
}
</style>
