<template>
  <q-card
    :flat="flat"
    :bordered="bordered"
    :class="cardClasses"
    :style="cardStyle"
  >
    <template v-if="$slots.header || title">
      <q-card-section
        v-if="showDivider"
        class="ds-card__header q-pb-sm"
      >
        <slot name="header">
          <div class="ds-card__header-content">
            <h3
              v-if="title"
              class="ds-card__title"
            >
              {{ title }}
            </h3>
            <div
              v-if="$slots.headerActions"
              class="ds-card__header-actions"
            >
              <slot name="headerActions" />
            </div>
          </div>
        </slot>
      </q-card-section>

      <q-separator v-if="showDivider" />
    </template>

    <q-card-section class="ds-card__body">
      <slot name="content">
        <slot />
      </slot>
    </q-card-section>

    <q-separator v-if="$slots.footer && showDivider" />

    <q-card-actions
      v-if="$slots.footer"
      class="ds-card__footer"
      :align="footerAlign"
    >
      <slot name="footer" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  flat?: boolean;
  bordered?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  showDivider?: boolean;
  footerAlign?: 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly';
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  flat: false,
  bordered: true,
  shadow: 'md',
  showDivider: false,
  footerAlign: 'right',
});

const cardClasses = computed(() => ({
  [`shadow-${props.shadow}`]: !props.flat,
  'ds-card--no-divider': !props.showDivider,
}));

const cardStyle = computed(() => ({
  borderRadius: 'var(--radius-lg)',
  backgroundColor: 'var(--bg-primary)',
}));
</script>

<style scoped lang="scss">
.ds-card {
  border-radius: var(--radius-xl);
  background-color: var(--bg-card);
  transition: all var(--transition-base);
  border: 1px solid var(--border-color);

  &.shadow-sm {
    box-shadow: var(--shadow-sm);
  }

  &.shadow-md {
    box-shadow: var(--shadow-md);
  }

  &.shadow-lg {
    box-shadow: var(--shadow-lg);
  }

  &.shadow-xl {
    box-shadow: var(--shadow-xl);
  }

  &:hover {
    box-shadow: var(--shadow-lg);
  }

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
    font-weight: var(--font-bold);
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  &__header-actions {
    display: flex;
    gap: var(--space-2);
  }

  &__body {
    padding: var(--space-6);
    color: var(--text-secondary);
  }

  &__footer {
    padding: var(--space-5) var(--space-6);
    gap: var(--space-3);
    border-top: 1px solid var(--divider-color);
  }

  &--no-divider {
    :deep(.q-separator) {
      display: none;
    }
  }
}
</style>
