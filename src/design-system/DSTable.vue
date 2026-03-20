<template>
  <q-table
    v-bind="$attrs"
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :rows-per-page-options="rowsPerPageOptions"
    :flat="flat"
    :bordered="bordered"
    :virtual-scroll="virtualScroll"
    :style="tableStyle"
    class="ds-table"
    :class="{
      'ds-table--sticky': stickyHeader,
      'ds-table--dense': dense,
    }"
  >
    <template
      v-for="(_, slot) of $slots"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope || {}"
      />
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QTableProps } from 'quasar';

interface Props<T = unknown> {
  rows: T[];
  columns: QTableProps['columns'];
  loading?: boolean;
  rowsPerPageOptions?: number[];
  flat?: boolean;
  bordered?: boolean;
  virtualScroll?: boolean;
  stickyHeader?: boolean;
  dense?: boolean;
  maxHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  rowsPerPageOptions: () => [25, 50, 100],
  flat: true,
  bordered: true,
  virtualScroll: true,
  stickyHeader: true,
  dense: true,
  maxHeight: '400px',
});

const tableStyle = computed(() => ({
  maxHeight: props.maxHeight,
}));
</script>

<style scoped lang="scss">
.ds-table {
  border-radius: var(--radius-xl);
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  &--sticky {
    :deep(thead tr:first-child th) {
      position: sticky;
      top: 0;
      z-index: 1;
      background: linear-gradient(180deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
      border-bottom: 2px solid var(--primary-accent);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
  }

  :deep(.q-table__top),
  :deep(.q-table__bottom) {
    background-color: var(--bg-card);
    border-color: var(--divider-color);
    padding: var(--space-4) var(--space-6);
  }

  :deep(.q-table__top) {
    border-bottom: 1px solid var(--divider-color);
  }

  :deep(.q-table__bottom) {
    border-top: 1px solid var(--divider-color);
  }

  :deep(thead th) {
    color: var(--text-primary);
    font-weight: var(--font-bold);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: var(--space-4) var(--space-5);
    transition: all var(--transition-base);
  }

  :deep(tbody td) {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    padding: var(--space-4) var(--space-5);
    border-color: var(--divider-color);
    transition: all var(--transition-base);
  }

  :deep(tbody tr) {
    transition: all var(--transition-base);
  }

  :deep(tbody tr:hover td) {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }

  :deep(tbody tr:hover td:first-child) {
    border-left: 3px solid var(--primary-accent);
    padding-left: calc(var(--space-4) - 3px);
  }

  :deep(tbody tr.selected td) {
    background: linear-gradient(90deg, var(--primary-accent-focus) 0%, rgba(59, 130, 246, 0.05) 100%);
    color: var(--primary-accent);
  }

  :deep(.q-table__bottom .q-btn) {
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
  }

  :deep(.q-table__bottom .q-btn:hover) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &--dense {
    :deep(thead th) {
      padding: var(--space-3) var(--space-4);
    }

    :deep(tbody td) {
      padding: var(--space-3) var(--space-4);
    }

    :deep(tbody tr:hover td:first-child) {
      padding-left: calc(var(--space-3) - 3px);
    }
  }
}
</style>
