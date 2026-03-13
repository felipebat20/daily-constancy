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
  icon: 'inbox',
  iconSize: '80px',
  size: 'md',
});
</script>

<style scoped lang="scss">
.ds-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  text-align: center;
  gap: var(--space-4);

  &__icon {
    color: var(--text-tertiary);
    opacity: 0.5;
  }

  &__title {
    margin: 0;
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  &__message {
    margin: 0;
    font-size: var(--text-base);
    color: var(--text-secondary);
    max-width: 400px;
  }

  &__actions {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-6);
  }
}
</style>
