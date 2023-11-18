<template>
  <q-table
    title="Active streaks"
    :columns="columns"
    :rows="rows"
    row-key="id"
    color="amber"
    flat
    bordered
    :rows-per-page-options="[25, 50, 100]"
    :loading="false"
    loading-label="Fetching streaks"
  >
    <template #body-cell-projects="props">
      <q-td :style="{ 'width': '35%' }">
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

    <template #body-cell-actions="action_props">
      <q-td>
        <div class="buttons">
          <q-btn
            :to="`/streaks/${action_props.value}`"
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
            @click="handleEditStreakButtonClick(action_props.row)"
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
            @click="handleDeleteButtonClick(action_props.row)"
          >
            <q-tooltip>
              Delete streak
            </q-tooltip>
          </q-btn>
        </div>
      </q-td>
    </template>
  </q-table>

  <DCDeleteStreak ref="deleteStreakModal" />
  <DCEditStreak ref="editStreakModal" />
</template>

<script lang="ts" setup>
  import type { QTableProps } from 'quasar';
  import { computed, ref } from 'vue';

  import DCDeleteStreak from '@/components/streaks/partials/DCDeleteStreak.vue';
  import DCEditStreak from '@/components/streaks/partials/DCEditStreak.vue';

  const deleteStreakModal = ref(DCDeleteStreak);
  const editStreakModal = ref(DCEditStreak);

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

  const handleDeleteButtonClick = (streak) =>  deleteStreakModal.value.handleOpenModal(streak);
  const handleEditStreakButtonClick = (streak) => editStreakModal.value.handleOpenModal(streak);
</script>

<style scoped lang="scss">
  .projects {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }
</style>
