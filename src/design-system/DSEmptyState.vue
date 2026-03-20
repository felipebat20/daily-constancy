<template>
  <div class="ds-empty-state">
    <div
      v-if="icon"
      class="ds-empty-state__icon"
    >
      <q-icon
        :name="icon"
        :size="iconSize"
      />
    </div>

    <h3
      v-if="title"
      class="ds-empty-state__title"
    >
      {{ title }}
    </h3>

    <p
      v-if="message"
      class="ds-empty-state__message"
    >
      {{ message }}
    </p>

    <div
      v-if="$slots.default"
      class="ds-empty-state__actions"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  message?: string;
  icon?: string;
  iconSize?: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  message: '',
  icon: 'inbox',
  iconSize: '80px',
  size: 'md',
});

void props;
</script>

<style scoped lang="scss">
.ds-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  text-align: center;
  gap: var(--space-5);
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 2px dashed var(--border-color);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--primary-accent-focus);
  }

  &__icon {
    color: var(--text-tertiary);
    opacity: 0.4;
    transition: all var(--transition-base);

    :deep(.q-icon) {
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    }
  }

  &:hover &__icon {
    opacity: 0.6;
    color: var(--primary-accent);
  }

  &__title {
    margin: 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  &__message {
    margin: 0;
    font-size: var(--text-base);
    color: var(--text-secondary);
    max-width: 400px;
    line-height: 1.6;
  }

  &__actions {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }
}
</style>
