<template>
  <div class="streak-show">
    <main class="streak-show__main">
      <div class="streak-show__header">
        <DSButton
          icon="arrow_back"
          variant="ghost"
          label="Back to Streaks"
          @click="$router.push('/streaks')"
        />

        <div
          v-if="! request_pending"
          class="streak-show__title"
        >
          <h2 class="streak-show__title-text">
            Streak: {{ streak.name }}
          </h2>
        </div>

        <div
          v-else
          class="streak-show__title streak-show__title--loading"
        >
          <h2 class="streak-show__title-text">
            Streak:
          </h2>
          <q-skeleton
            type="text"
            width="200px"
            height="30px"
          />
        </div>
      </div>

      <div class="streak-show__stats">
        <DSCard class="streak-show__stat-card">
          <div class="streak-show__stat-content">
            <div class="streak-show__stat-icon">
              <q-icon
                name="local_fire_department"
                size="32px"
                color="warning"
              />
            </div>
            <div class="streak-show__stat-info">
              <span class="streak-show__stat-label">Current Streak</span>
              <span class="streak-show__stat-value">{{ getCurrentStreak }} days</span>
            </div>
          </div>
        </DSCard>

        <DSCard class="streak-show__stat-card">
          <div class="streak-show__stat-content">
            <div class="streak-show__stat-icon">
              <q-icon
                name="emoji_events"
                size="32px"
                color="warning"
              />
            </div>
            <div class="streak-show__stat-info">
              <span class="streak-show__stat-label">Longest Streak</span>
              <span class="streak-show__stat-value">{{ getLongestStreak }} days</span>
            </div>
          </div>
        </DSCard>

        <DSCard class="streak-show__stat-card">
          <div class="streak-show__stat-content">
            <div class="streak-show__stat-icon">
              <q-icon
                name="calendar_today"
                size="32px"
                color="primary"
              />
            </div>
            <div class="streak-show__stat-info">
              <span class="streak-show__stat-label">Active Days</span>
              <span class="streak-show__stat-value">{{ getTotalActiveDays }} / {{ focus_summaries.length }}</span>
            </div>
          </div>
        </DSCard>

        <DSCard class="streak-show__stat-card">
          <div class="streak-show__stat-content">
            <div class="streak-show__stat-icon">
              <q-icon
                name="schedule"
                size="32px"
                color="info"
              />
            </div>
            <div class="streak-show__stat-info">
              <span class="streak-show__stat-label">Avg Focus Time</span>
              <span class="streak-show__stat-value">{{ getAverageFocusTime }}</span>
            </div>
          </div>
        </DSCard>
      </div>

      <div class="streak-show__calendar">
        <template v-if="request_pending">
          <DateSkeleton
            v-for="n in 3"
            :key="n"
            class="streak-show__skeleton"
          />
        </template>

        <template v-else>
          <div
            v-for="month_label in getDateLabels"
            :key="month_label"
            class="streak-show__calendar-month"
          >
            <q-date
              v-model="getDays[month_label]"
              class="no-shadow"
              multiple
              today-btn
              minimal
              dense
              bordered
              :years-in-month-view="false"
              :default-year-month="month_label"
              :navigation-min-year-month="month_label"
              :navigation-max-year-month="month_label"
              color="primary"
              @update:model-value="handleUpdate"
              @click="handleUpdate"
            >
              <template #day="{ date }">
                <q-icon
                  v-if="getFocusTimeForDate(date)"
                  name="fiber_manual_record"
                  :style="getDayStyle(date)"
                  size="10px"
                />
              </template>
            </q-date>
          </div>
        </template>
      </div>
    </main>

    <aside
      v-if="$q.screen.gt.xs"
      class="streak-show__sidebar"
    >
      <DSCard class="streak-show__sidebar-card">
        <template #header>
          <div class="streak-show__date-badge">
            <span>Day: {{ getFormattedDate }}</span>
          </div>
        </template>

        <template #content>
          <div class="streak-show__sidebar-section">
            <h3 class="streak-show__sidebar-title">
              Tasks of day
            </h3>

            <div class="streak-show__tasks">
              <template v-if="request_pending">
                <q-skeleton
                  v-for="n in 3"
                  :key="n"
                  type="text"
                  width="100%"
                  height="30px"
                />
              </template>

              <template v-else-if="getSelectedFocusSummary.tasks.length">
                <div
                  v-for="task in getSelectedFocusSummary.tasks"
                  :key="task.id"
                  class="streak-show__task"
                >
                  <span>{{ task.description }}</span>
                </div>
              </template>

              <template v-else>
                <span class="streak-show__empty">Not found tasks for this day</span>
              </template>
            </div>
          </div>

          <div class="streak-show__sidebar-section">
            <h3 class="streak-show__sidebar-title">
              Projects worked in day
            </h3>

            <div class="streak-show__badges">
              <template v-if="request_pending">
                <q-skeleton
                  v-for="n in 3"
                  :key="n"
                  type="text"
                  width="90px"
                  height="30px"
                />
              </template>

              <template v-else-if="getSelectedFocusSummary.projects.length">
                <DSBadge
                  v-for="project in getSelectedFocusSummary.projects"
                  :key="project.name"
                  :label="project.name"
                  variant="secondary"
                />
              </template>

              <template v-else>
                <span class="streak-show__empty">Not found projects for this day</span>
              </template>
            </div>
          </div>
        </template>
      </DSCard>
    </aside>

    <DayStreakModal ref="dayStreakModal" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { groupBy } from 'lodash';

import DayStreakModal from './DayStreakModal.vue';
import { DateSkeleton } from '@/design-system/Skeleton';
import DSCard from '@/design-system/DSCard.vue';
import DSButton from '@/design-system/DSButton.vue';
import DSBadge from '@/design-system/DSBadge.vue';

import { useStore } from '@/store';
import { FETCH_STREAK, FETCH_STREAK_FOCUS_SUMMARIES } from '@/store/types/actions';
import FocusSummary from '@/interfaces/FocusSummary.interface';

const store = useStore();
const route = useRoute();

const dayStreakModal = ref(DayStreakModal);
const { streak_id } = route.params;

const request_pending = computed(() => {
  const { streak: streak_request_pending = {} } = store.state.requests_pending;
  return streak_request_pending.show || streak_request_pending.focus_summaries;
});

const openDayStreakModal = (params: { selected_date: string, focused_summary: FocusSummary }) => {
  dayStreakModal.value.openModal(params);
};

const getFocusTimeForDate = (date: string): number | null => {
  const summary = focus_summaries.value.find(s => {
    const [year, month, day] = s.date.split('-').map(d => parseInt(d, 10));
    const summary_date = new Date(year, month, day).getTime();
    const [y, m, d] = date.split('/').map(d => parseInt(d, 10));
    const target_date = new Date(y, m - 1, d).getTime();

    return Math.abs(summary_date - target_date) < 86400001;
  });

  return summary ? summary.totalFocusTime : null;
};

const getDayStyle = (date: string) => {
  const focus_time = getFocusTimeForDate(date);
  if (!focus_time) return {};

  const level = getActivityLevel(focus_time);
  const colors = [
    'var(--text-tertiary)',
    'var(--success-light)',
    'var(--success)',
    'var(--info)',
    'var(--primary)',
  ];

  return {
    color: colors[level],
  };
};

store.dispatch(FETCH_STREAK, streak_id);
store.dispatch(FETCH_STREAK_FOCUS_SUMMARIES, streak_id);

const focus_summaries = computed(() => store.state.streak.focus_summaries);
const streak = computed(() => store.state.streak.streak);

const days_for_get_days = ref({} as { [key: string]: string });
const getDays = computed(() => {
  getDateLabels.value.forEach(value => Object.assign(days_for_get_days.value, { [value]: getDaysLabels(value) }));
  return days_for_get_days.value;
});

const getDaysLabels = (month_label: string) => {
  if (getDaysByMonths.value[month_label]) {
    return getDaysByMonths.value[month_label].map((summary) => {
      const date = getDateFromSummary(summary.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}/${month}/${day}`;
    });
  }

  return [];
};

const getDaysByMonths = computed(() => {
  const aggregate_by_months = groupBy(focus_summaries.value, (summary) => {
    const date = getDateFromSummary(summary.date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${year}/${month}`;
  });

  return aggregate_by_months;
});

const getDateFromSummary = (date: string) => {
  const [year, month, day] = date.split('-').map(date_string => +date_string);
  return new Date(year, month, day);
};

const getDateLabels = computed(() => {
  if (focus_summaries.value.length) {
    const first_focus_summary = focus_summaries.value[focus_summaries.value.length - 1];
    const last_focus_summary = focus_summaries.value[0];

    const first_month_date = getDateFromSummary(first_focus_summary.date);
    const last_month_date = getDateFromSummary(last_focus_summary.date);

    let months = (last_month_date.getFullYear() - first_month_date.getFullYear()) * 12;
    months -= first_month_date.getMonth();
    months += last_month_date.getMonth();

    const total_months = months + 1;
    const month_labels = getMonthsByYearLabels(total_months, first_month_date);

    return month_labels.slice(0, 6);
  }

  return [];
});

const getMonthsByYearLabels = (months: number, first_month_date: Date) => {
  const newArray = new Array(months).fill(null);

  const months_years_labels = newArray.map((_, index) => {
    const label_date = new Date(first_month_date.getFullYear(), first_month_date.getMonth() + index);
    return `${label_date.getFullYear()}/${(label_date.getMonth() + 1).toString().padStart(2, '0')}`;
  });

  return months_years_labels;
};

const current_date = new Date();
const selected_date = ref(`${current_date.getFullYear()}-${current_date.getMonth()}-${current_date.getDate()}`);

const getFormattedDate = computed(() => {
  if (selected_date.value) {
    let [year, month, date] = selected_date.value.split('-');
    month = (+month + 1).toString().padStart(2, '0');
    date = date.padStart(2, '0');
    return `${date}/${month}/${year}`;
  }

  return `${current_date.getDate()}/${current_date.getMonth() + 1}/${current_date.getFullYear()}`;
});

const handleUpdate = (value: string[], reason: string, details: { year: number, month: number, day: number }) => {
  getDateLabels.value.forEach(value => Object.assign(days_for_get_days.value, { [value]: getDaysLabels(value) }));

  if (reason === 'remove-day') {
    let { year, month, day } = details;
    selected_date.value = `${year}-${month - 1}-${day}`;
    openDayStreakModal({ selected_date: selected_date.value, focused_summary: getSelectedFocusSummary.value });
    return false;
  }
};

const getSelectedFocusSummary = computed(() => {
  const focused_selected_date = focus_summaries.value.find(summary => summary.date === selected_date.value);

  if (focused_selected_date) {
    return focused_selected_date;
  }

  return {
    date: '',
    totalFocusTime: 0,
    totalFucusedSessions: 0,
    totalTasks: 0,
    totalProjects: 0,
    tasks: [],
    projects: [],
  } as FocusSummary;
});

const getCurrentStreak = computed(() => {
  if (!focus_summaries.value.length) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let check_date = today.getTime() - 86400000;

  for (let i = 0; i < focus_summaries.value.length; i++) {
    const summary_date = getDateFromSummary(focus_summaries.value[i].date).getTime();

    if (Math.abs(summary_date - check_date) < 86400001) {
      streak++;
      check_date -= 86400000;
    } else {
      break;
    }
  }

  return streak;
});

const getLongestStreak = computed(() => {
  if (!focus_summaries.value.length) return 0;

  let max_streak = 0;
  let current_streak = 0;
  let check_date = null;

  for (let i = focus_summaries.value.length - 1; i >= 0; i--) {
    const summary = focus_summaries.value[i];
    const summary_date = getDateFromSummary(summary.date).getTime();

    if (summary.totalFocusTime > 0) {
      if (check_date === null) {
        check_date = summary_date;
        current_streak = 1;
      } else if (Math.abs(summary_date - check_date) < 86401000) {
        current_streak++;
        check_date = summary_date;
      } else {
        max_streak = Math.max(max_streak, current_streak);
        current_streak = 1;
        check_date = summary_date;
      }
    } else {
      max_streak = Math.max(max_streak, current_streak);
      current_streak = 0;
      check_date = null;
    }
  }

  max_streak = Math.max(max_streak, current_streak);

  return max_streak;
});

const getTotalActiveDays = computed(() => {
  return focus_summaries.value.filter(summary => summary.totalFocusTime > 0).length;
});

const getAverageFocusTime = computed(() => {
  const active_summaries = focus_summaries.value.filter(summary => summary.totalFocusTime > 0);
  if (!active_summaries.length) return '0h 0m';

  const total_seconds = active_summaries.reduce((sum, summary) => sum + summary.totalFocusTime, 0);
  const average_seconds = total_seconds / active_summaries.length;

  const hours = Math.floor(average_seconds / 3600);
  const minutes = Math.floor((average_seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
});

const getActivityLevel = (focusTime: number): number => {
  const active_summaries = focus_summaries.value.filter(summary => summary.totalFocusTime > 0);
  if (!active_summaries.length) return 0;

  const focus_times = active_summaries.map(s => s.totalFocusTime).sort((a, b) => a - b);
  const p25 = focus_times[Math.floor(focus_times.length * 0.25)] || 0;
  const p50 = focus_times[Math.floor(focus_times.length * 0.5)] || 0;
  const p75 = focus_times[Math.floor(focus_times.length * 0.75)] || 0;

  if (focusTime >= p75) return 4;
  if (focusTime >= p50) return 3;
  if (focusTime >= p25) return 2;
  if (focusTime > 0) return 1;
  return 0;
};
</script>

<style scoped lang="scss">
.streak-show {
  display: flex;
  gap: var(--space-6);
  padding: var(--space-8) var(--space-6);
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;

  &__main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  &__title {
    flex: 1;
  }

  &__title-text {
    margin: 0;
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  &__title--loading {
    display: flex;
    gap: var(--space-3);
  }

  &__calendar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-6);
  }

  &__calendar-month {
    width: 100%;
  }

  &__skeleton {
    width: 100%;
  }

  &__sidebar {
    width: 368px;
    max-width: 400px;
    min-width: 300px;
    flex-shrink: 0;
  }

  &__sidebar-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  &__date-badge {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
  }

  &__sidebar-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__sidebar-title {
    margin: 0;
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__task {
    padding: var(--space-2);
    font-size: var(--text-base);
    color: var(--text-primary);
  }

  &__badges {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  &__empty {
    font-size: var(--text-sm);
    color: var(--text-tertiary);
    font-style: italic;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
  }

  &__stat-card {
    border-radius: var(--radius-lg);
    transition: transform var(--transition-base);
    cursor: default;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__stat-content {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  &__stat-icon {
    flex-shrink: 0;
  }

  &__stat-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  &__stat-label {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
  }

  &__stat-value {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: var(--space-6) var(--space-4);

    &__sidebar {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-4);

    &__calendar {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }
  }
}
</style>
