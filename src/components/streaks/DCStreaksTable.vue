<template>
  <q-table
    title="Active streaks"
    :columns="columns"
    :rows="rows"
    row-key="id"
    color="amber"
    flat
    bordered
    :loading="request_pending"
    :rows-per-page-options="[25, 50, 100]"
    loading-label="Fetching streaks"
  >
    <template #body-cell-offensive="{ value }">
      <q-td>
        <div
          class="offensive"
          :class="{'on-fire': value.today_is_in_streak }"
        >
          <div class="icon">
            <q-icon
              name="whatshot"
              size="23px"
            />
          </div>

          <span class="days">
            {{ value.days }}
          </span>
        </div>
      </q-td>
    </template>

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

  import { useStore } from '@/store';

  import DCDeleteStreak from '@/components/streaks/partials/DCDeleteStreak.vue';
  import DCEditStreak from '@/components/streaks/partials/DCEditStreak.vue';
  import StreakInterface from '@/interfaces/Streak.interface';

  import formatDate from '@/hooks/formatDate';

  const deleteStreakModal = ref(DCDeleteStreak);
  const editStreakModal = ref(DCEditStreak);
  const store = useStore();
  const request_pending = computed(() => {
    const { streak: streak_request_pending = {} } = store.state.requests_pending;

    return streak_request_pending.fetch_all;
  });

  const props = defineProps({
    streaks: {
      type: Array,
      default: () => [],
    }
  });

  const columns: QTableProps['columns'] = [
    {
      name: 'offensive',
      field: 'offensive',
      label: ''
    },

    {
      name: 'Name',
      field: 'name',
      label: 'Name'
    },

    {
      name: 'createdAt',
      field: (row) => formatDate(new Date(row.createdAt)),
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

  const handleDeleteButtonClick = (streak: StreakInterface) =>  deleteStreakModal.value.handleOpenModal(streak);
  const handleEditStreakButtonClick = (streak: StreakInterface) => editStreakModal.value.handleOpenModal(streak);
</script>

<style lang="scss">
  .projects {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .q-dark { --q-dark: var(--accent-background); }
  .q-table--dark, td, th { border-color: var(--border-color) !important; }
  table th { color: var(--text-primary) !important; }
  table {
    background-color: var(--accent-background) !important;
    border-color: var(--border-color) !important;
    color: var(--text-primary) !important;
  }

  .offensive {
    display: flex;
    justify-content: flex;
    align-items: center;
    gap: 4px;
    font-size: 15px;
    font-weight: 700;
    vertical-align: baseline;

    &.on-fire { color: rgb(255, 171, 51); }
  }
</style>
