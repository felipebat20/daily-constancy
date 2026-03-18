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
  title: '',
  subtitle: '',
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
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
  border-bottom: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-8);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  &--sm {
    padding: var(--space-4) var(--space-6);
    margin-bottom: var(--space-6);
  }

  &--lg {
    padding: var(--space-8) var(--space-10);
    margin-bottom: var(--space-10);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  &__right {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  &__title {
    margin: 0;
    font-size: var(--text-3xl);
    font-weight: var(--font-extrabold);
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  &__subtitle {
    margin: var(--space-2) 0 0 0;
    font-size: var(--text-base);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
  }
}
</style>
