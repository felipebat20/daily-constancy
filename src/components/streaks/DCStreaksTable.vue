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
        <q-td>
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
        <q-td>
          <div class="flex items-center gap-2 justify-center">
            <q-btn
              :to="`/streaks/${action_props.value}`"
              label="See"
              no-caps
              color="primary"
              rounded
            >
              <q-tooltip>
                See
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
    <div>
      <q-card
        v-for="streak in rows"
        :key="streak.id"
        flat
        bordered
        class="my-card"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                {{ streak.name }}
              </div>

              <q-separator />

              <div class="text-subtitle2">
                <q-badge
                  v-for="project in streak.projects"
                  :key="project"
                  :label="project.name"
                  class="text-caption"
                  color="positive"
                  rounded
                />
              </div>
            </div>

            <div class="col-auto">
              <q-btn
                color="grey-7"
                round
                flat
                icon="more_vert"
              >
                <q-menu
                  cover
                  auto-close
                >
                  <q-list
                    dense
                    style="min-width: 100px;"
                  >
                    <q-item
                      dense
                      clickable
                      v-close-popup
                      @click="handleEditStreakButtonClick(streak)"
                    >
                      <q-item-section
                        dense
                      >
                        Edit
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                      @click="handleDeleteButtonClick(streak)"
                    >
                      <q-item-section>
                        Delete
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          {{ lorem }}
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn
            :to="`/streaks/${streak.id}`"
            label="See streak"
            no-caps
            color="primary"
            rounded
            block
          >
            <q-tooltip>
              See streak
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>

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
      label: 'Name',
      align: 'left',
    },

    {
      name: 'createdAt',
      field: (row) => formatDate(new Date(row.createdAt)),
      label: 'Created at',
      align: 'left',
    },

    {
      name: 'projects',
      field: (row) => row.projects?.map(({ name }: { name: string }) => name),
      label: 'Projects',
      align: 'left',
    },

    {
      name: 'actions',
      field: 'id',
      label: '',
      style: 'max-width: 250px;'
    },
  ];

  const rows = computed(() => props.streaks);

  const handleDeleteButtonClick = (streak: StreakInterface) =>  deleteStreakModal.value.handleOpenModal(streak);
  const handleEditStreakButtonClick = (streak: StreakInterface) => editStreakModal.value.handleOpenModal(streak);
  const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 2,
    rowsPerPage: 3
    // rowsNumber: xx if getting data from a server
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
