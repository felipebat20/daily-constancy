<template>
  <div class="streaks-table">
    <div
      v-if="$q.screen.gt.xs"
      class="streaks-table__desktop"
    >
      <DSTable
        :columns="columns"
        :rows="rows"
        :loading="request_pending"
        :rows-per-page-options="[25, 50, 100]"
        dense
        sticky-header
        class="streaks-table__table"
      >
        <template #body-cell-offensive="{ value }">
          <q-td style="width: 60px">
            <StreakOffensive :offensive="value" />
          </q-td>
        </template>

        <template #body-cell-projects="props_row">
          <q-td>
            <div class="streaks-table__badges">
              <DSBadge
                v-if="! props_row.value.length"
                label="No projects"
                variant="info"
                size="sm"
                outline
              />

              <DSBadge
                v-for="(project, index) in props_row.value"
                :key="project"
                :label="project"
                :variant="getProjectVariant(index)"
                size="sm"
                class="streaks-table__project-badge"
              />
            </div>
          </q-td>
        </template>

        <template #body-cell-actions="action_props">
          <q-td>
            <div class="streaks-table__actions">
              <DSButton
                icon="visibility"
                variant="ghost"
                size="sm"
                class="streaks-table__action-btn"
                @click="$router.push(`/streaks/${action_props.value}`)"
                aria-label="View streak"
              />

              <DSButton
                icon="edit"
                variant="secondary"
                size="sm"
                class="streaks-table__action-btn"
                @click="handleEditStreakButtonClick(action_props.row)"
                aria-label="Edit streak"
              />

              <DSButton
                icon="delete"
                variant="danger"
                size="sm"
                class="streaks-table__action-btn"
                @click="handleDeleteButtonClick(action_props.row)"
                aria-label="Delete streak"
              />
            </div>
          </q-td>
        </template>
      </DSTable>

      <div class="streaks-table__pagination">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </div>

    <div
      v-else
      class="streaks-table__mobile"
    >
      <div class="streaks-table__cards">
        <DSCard
          v-for="streak in rows"
          :key="streak.id"
          class="streaks-table__card"
        >
          <template #header>
            <div class="streaks-table__card-header">
              <StreakOffensive :offensive="getStreakOffensive(streak)" />
              <span class="text-base">
                {{ streak.name }}
              </span>
            </div>
          </template>

          <template #content>
            <div class="streaks-table__card-content">
              <p class="streaks-table__card-label">
                Projects:
              </p>

              <div class="streaks-table__badges">
                <DSBadge
                  v-if="! streak.projects.length"
                  label="No projects"
                  variant="info"
                  size="sm"
                  outline
                />

                <DSBadge
                  v-for="(project, index) in streak.projects"
                  :key="project.name"
                  :label="project.name"
                  :variant="getProjectVariant(index)"
                  size="sm"
                  class="streaks-table__project-badge"
                />
              </div>

              <div class="streaks-table__card-date">
                {{ formatDate(new Date(streak.createdAt)) }}
              </div>
            </div>
          </template>

          <template #footer>
            <div class="streaks-table__card-actions">
              <DSButton
                icon="visibility"
                variant="ghost"
                size="sm"
                class="streaks-table__action-btn"
                @click="$router.push(`/streaks/${streak.id}`)"
                aria-label="View streak"
              />

              <DSButton
                icon="edit"
                variant="secondary"
                size="sm"
                class="streaks-table__action-btn"
                @click="handleEditStreakButtonClick(streak)"
                aria-label="Edit streak"
              />

              <DSButton
                icon="delete"
                variant="danger"
                size="sm"
                class="streaks-table__action-btn"
                @click="handleDeleteButtonClick(streak)"
                aria-label="Delete streak"
              />
            </div>
          </template>
        </DSCard>
      </div>

      <div class="streaks-table__pagination">
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
  </div>
</template>

<script lang="ts" setup>
import type { QTableProps } from 'quasar';
import type { PropType } from 'vue';
import { computed, ref } from 'vue';

import DSTable from '@/design-system/DSTable.vue';
import DSCard from '@/design-system/DSCard.vue';
import DSButton from '@/design-system/DSButton.vue';
import DSBadge from '@/design-system/DSBadge.vue';

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
    label: '',
    style: 'width: 80px',
  },
  {
    name: 'Name',
    field: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    name: 'projects',
    field: (row) => row.projects?.map(({ name }: { name: string }) => name),
    label: 'Projects',
    align: 'left',
    style: 'min-width: 200px',
  },
  {
    name: 'createdAt',
    field: (row) => formatDate(new Date(row.createdAt)),
    label: 'Created at',
    align: 'left',
    style: 'min-width: 150px',
  },
  {
    name: 'actions',
    field: 'id',
    label: '',
    align: 'right',
    style: 'width: 160px',
  },
];

const rows = computed(() => props.streaks);
const getStreakOffensive = (streak: StreakInterface) => {
  return streak.offensive as { days: number; today_is_in_streak: boolean };
};

const handleDeleteButtonClick = (streak: StreakInterface) => deleteStreakModal.value.handleOpenModal(streak);
const handleEditStreakButtonClick = (streak: StreakInterface) => editStreakModal.value.handleOpenModal(streak);

const getProjectVariant = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
  const variants: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
  return variants[index % variants.length];
};

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 2,
  rowsPerPage: 100
});

const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage));
</script>

<style scoped lang="scss">
.streaks-table {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  &__desktop {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__mobile {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-4);
  }

  &__card {
    display: flex;
    flex-direction: column;
  }

  &__card-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  &__card-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__card-label {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
  }

  &__card-date {
    font-size: var(--text-sm);
    color: var(--text-tertiary);
  }

  &__card-actions {
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
  }

  &__badges {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    align-items: center;
  }

  &__project-badge {
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }
  }

  &__actions {
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
    align-items: center;
  }

  &__action-btn {
    transition: all 0.2s ease;
    border-radius: var(--radius-md);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    padding: var(--space-4);
  }
}
</style>
