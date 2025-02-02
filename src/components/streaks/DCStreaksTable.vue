<template>
  <div
    class="q-pa-md"
    v-if="$q.screen.gt.xs"
  >
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
      hide-pagination
    >
      <template #body-cell-offensive="{ value }">
        <q-td style="width: 60px">
          <StreakOffensive :offensive="value" />
        </q-td>
      </template>

      <template #body-cell-projects="props">
        <q-td
          :style="{ 'width': '35%' }"
          class="text-left"
        >
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
        </q-td>
      </template>

      <template #body-cell-actions="action_props">
        <q-td style="min-width: 240px">
          <div class="flex items-center gap-2 justify-end">
            <q-btn
              :to="`/streaks/${action_props.value}`"
              icon="visibility"
              no-caps
              color="primary"
            >
              <q-tooltip>
                See
              </q-tooltip>
            </q-btn>

            <q-btn
              icon="edit"
              no-caps
              color="secondary"
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

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>

  <div v-else>
    <div class="row q-col-gutter-md q-mt-xs">
      <div
        v-for="streak in rows"
        :key="streak.id"
        class="col-12"
      >
        <q-card
          flat
          bordered
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
          class="q-pa-xs"
        >
          <q-card-section>
            <div class="row items-center q-gutter-x-sm">
              <StreakOffensive :offensive="getStreakOffensive(streak)" />
              <div class="text-h6">
                {{ streak.name }}
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-badge
                v-if="!streak.projects.length"
                label="N/D"
                class="text-caption"
                rounded
              />
              <q-badge
                v-for="project in streak.projects"
                :key="project.name"
                :label="project.name"
                class="text-caption"
                color="positive"
                rounded
              />
            </div>
            <div class="text-caption text-grey">
              Criado em: {{ formatDate(new Date(streak.createdAt)) }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions
            vertical
            class="justify-center q-px-md"
          >
            <q-btn
              :to="`/streaks/${streak.id}`"
              color="primary"
              icon="visibility"
              label="See streak"
              flat
            >
              <q-tooltip>Ver streak</q-tooltip>
            </q-btn>

            <q-btn
              @click="handleEditStreakButtonClick(streak)"
              color="secondary"
              icon="edit"
              label="Edit streak"
              flat
            >
              <q-tooltip>Editar</q-tooltip>
            </q-btn>

            <q-btn
              @click="handleDeleteButtonClick(streak)"
              color="deep-orange"
              icon="delete"
              label="Delete streak"
              flat
            >
              <q-tooltip>Excluir</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="row justify-center q-pa-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>

  <DCDeleteStreak ref="deleteStreakModal" />
  <DCEditStreak ref="editStreakModal" />
</template>

<script lang="ts" setup>
  import type { QTableProps } from 'quasar';
  import { computed, ref } from 'vue';
  import type { PropType } from 'vue';

  import { useStore } from '@/store';

  import DCDeleteStreak from '@/components/streaks/partials/DCDeleteStreak.vue';
  import DCEditStreak from '@/components/streaks/partials/DCEditStreak.vue';
  import StreakInterface from '@/interfaces/Streak.interface';
  import StreakOffensive from '@/design-system/StreakOffensive.vue';

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
      type: Array as PropType<StreakInterface[]>,
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
      label: 'Name',
      align: 'left',
      style: 'width: 35%',
    },

    {
      name: 'projects',
      field: (row) => row.projects?.map(({ name }: { name: string }) => name),
      label: 'Projects',
      align: 'left',
    },

    {
      name: 'createdAt',
      field: (row) => formatDate(new Date(row.createdAt)),
      label: 'Created at',
      align: 'left',
    },

    {
      name: 'actions',
      field: 'id',
      label: '',
      style: 'min-width: 250px;'
    },
  ];

  const rows = computed(() => props.streaks);
  const getStreakOffensive = (streak: StreakInterface) => {
    return streak.offensive as { days: number; today_is_in_streak: boolean };
  };

  const handleDeleteButtonClick = (streak: StreakInterface) =>  deleteStreakModal.value.handleOpenModal(streak);
  const handleEditStreakButtonClick = (streak: StreakInterface) => editStreakModal.value.handleOpenModal(streak);
  const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 2,
    rowsPerPage: 3
  });

  const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage));
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

  .q-table__container { background-color: var(--accent-background) !important; }
  .q-table--dark, td, th { border-color: var(--border-color) !important; }
  table th { color: var(--text-primary) !important; }
  table {
    background-color: var(--accent-background) !important;
    border-color: var(--border-color) !important;
    color: var(--text-primary) !important;
  }

  .offensive {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    font-size: 15px;
    font-weight: 700;

    &.on-fire { color: rgb(255, 171, 51); }
    .days { margin-top: 2px; }
  }
</style>
