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

interface Props {
  rows: any[];
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
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);

  &--sticky {
    :deep(thead tr:first-child th) {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: var(--bg-secondary);
      border-bottom: 2px solid var(--divider-color);
    }
  }

  :deep(.q-table__top),
  :deep(.q-table__bottom) {
    background-color: var(--bg-primary);
    border-color: var(--divider-color);
  }

  :deep(thead th) {
    color: var(--text-primary);
    font-weight: var(--font-semibold);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: var(--space-4);
  }

  :deep(tbody td) {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    padding: var(--space-3) var(--space-4);
    border-color: var(--divider-color);
  }

  :deep(tbody tr:hover td) {
    background-color: var(--bg-secondary);
  }

  :deep(tbody tr.selected td) {
    background-color: rgba(2, 123, 227, 0.1);
    color: var(--primary);
  }

  &--dense {
    :deep(thead th) {
      padding: var(--space-3);
    }

    :deep(tbody td) {
      padding: var(--space-2) var(--space-3);
    }
  }
}
</style>
