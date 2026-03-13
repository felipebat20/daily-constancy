<template>
  <div class="ds-skeleton-table">
    <div class="ds-skeleton-table__header">
      <q-skeleton
        v-for="n in 5"
        :key="n"
        type="rect"
        class="ds-skeleton-table__header-cell"
      />
    </div>

    <div
      v-for="m in 5"
      :key="m"
      class="ds-skeleton-table__row"
    >
      <q-skeleton
        v-for="n in 5"
        :key="n"
        type="rect"
        class="ds-skeleton-table__cell"
      />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.ds-skeleton-table {
  width: 100%;
  padding: var(--space-6);
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);

  &__header {
    display: flex;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  &__header-cell {
    flex: 1;
    height: 48px;
    border-radius: var(--radius-sm);
    background-color: var(--bg-secondary);
  }

  &__row {
    display: flex;
    gap: var(--space-4);
    margin-bottom: var(--space-3);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__cell {
    flex: 1;
    height: 48px;
    border-radius: var(--radius-sm);
  }
}
</style>
