<template>
  <div
    class="ds-page-header"
    :class="classes"
  >
    <div class="ds-page-header__left">
      <slot name="left">
        <DSButton
          v-if="backButton"
          icon="arrow_back"
          variant="ghost"
          @click="$router.back()"
        />

        <div>
          <h1
            v-if="title"
            class="ds-page-header__title"
          >
            {{ title }}
          </h1>

          <p
            v-if="subtitle"
            class="ds-page-header__subtitle"
          >
            {{ subtitle }}
          </p>
        </div>
      </slot>
    </div>

    <div class="ds-page-header__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DSButton from './DSButton.vue';

interface Props {
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  backButton: false,
  size: 'md',
});

const classes = computed(() => ({
  'ds-page-header--sm': props.size === 'sm',
  'ds-page-header--lg': props.size === 'lg',
}));
</script>

<style scoped lang="scss">
.ds-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-8);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--space-6);

  &--sm {
    padding: var(--space-4) var(--space-6);
    margin-bottom: var(--space-4);
  }

  &--lg {
    padding: var(--space-8) var(--space-10);
    margin-bottom: var(--space-8);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  &__right {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  &__title {
    margin: 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  &__subtitle {
    margin: var(--space-1) 0 0 0;
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }
}
</style>
