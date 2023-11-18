<template>
  <q-table
    title="Active streaks"
    :columns="columns"
    :rows="rows"
    :rows-per-page-options="[25, 50, 100]"
  >
    <template #body-cell-projects="props">
      <q-td>
        <div class="projects">
          <q-badge
            v-if="! props.value.length"
            label="N/D"
            class="text-caption"
            rounded
          />

          <q-badge
            v-for="project in props.value"
            :key="project"
            :label="project"
            class="text-caption"
            color="positive"
            rounded
          />
        </div>
      </q-td>
    </template>

    <template #body-cell-actions="props">
      <q-td>
        <div class="projects">
          <q-btn
            :to="`/streaks/${props.value}`"
            label="See streak"
            no-caps
            color="primary"
            rounded
            disable
          >
            <q-tooltip>
              See streak
            </q-tooltip>
          </q-btn>

          <q-btn
            icon="edit"
            no-caps
            color="secondary"
            rounded
            disable
          >
            <q-tooltip>
              Edit streak
            </q-tooltip>
          </q-btn>

          <q-btn
            icon="delete"
            no-caps
            color="deep-orange"
            rounded
            disable
          >
            <q-tooltip>
              Delete streak
            </q-tooltip>
          </q-btn>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
  import type { QTableProps } from 'quasar';
  import { computed } from 'vue';

  const props = defineProps({
    streaks: {
      type: Array,
      default: () => [],
    }
  });

  const columns: QTableProps['columns'] = [
    {
      name: 'Name',
      field: 'name',
      label: 'Name'
    },

    {
      name: 'createdAt',
      field: 'createdAt',
      label: 'Created at',
    },

    {
      name: 'projects',
      field: (row) => row.projects?.map(({ name }: { name: string }) => name),
      label: 'Projects',
    },

    {
      name: 'actions',
      field: 'id',
      label: '',
    },
  ];

  const rows = computed(() => props.streaks);
</script>

<style scoped lang="scss">
  .projects {
    display: flex;
    gap: 10px;
  }
</style>
