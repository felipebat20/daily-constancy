<template>
  <div class="streak-container">
    <div class="streaks">
      <div class="streak-title">
        <q-btn
          to="/streaks"
          icon="arrow_back"
          outline
          flat
        />

        <Heading
          v-if="! request_pending"
          level="h2"
        >
          Streak: {{ streak.name }}
        </Heading>

        <div
          v-else
          class="title-request-pending"
        >
          <Heading level="h2">
            Streak:
          </Heading>

          <q-skeleton
            type="text"
            width="200px"
            height="30px"
          />
        </div>
      </div>

      <div>
        <div class="q-pa-md">
          <div class="calendar-container">
            <template v-if="request_pending">
              <DateSkeleton
                v-for="n in 3"
                :key="n"
              />
            </template>

            <template v-else>
              <div
                v-for="month_label in getDateLabels"
                :key="month_label"
              >
                <q-date
                  v-model="getDays[month_label]"
                  multiple
                  today-btn
                  minimal
                  dense
                  :years-in-month-view="false"
                  :default-year-month="month_label"
                  :navigation-min-year-month="month_label"
                  :navigation-max-year-month="month_label"
                  color="orange"
                  @update:model-value="handleUpdate"
                  @click="handleUpdate"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="side-bar">
      <div class="top-bar">
        <div>
          <q-badge
            class="p-2"
            color="accent"
            rounded
          >
            <span class="top-bar-title">
              Day: {{ getFormattedDate }}
            </span>
          </q-badge>
        </div>
      </div>

      <q-card class="tasks-container">
        <div class="card-title">
          <Heading level="h2">
            Tasks of the day
          </Heading>
        </div>

        <div class="tasks">
          <template v-if="request_pending">
            <div
              v-for="n in 3"
              :key="n"
            >
              <span>
                <q-skeleton
                  type="text"
                  width="100%"
                  height="30px"
                />
              </span>
            </div>
          </template>

          <template v-else-if="getSelectedFocusSummary.tasks.length">
            <div
              v-for="task in getSelectedFocusSummary.tasks"
              :key="task.id"
              class="task"
            >
              <span>
                {{ task.description }}
              </span>
            </div>
          </template>

          <template v-else>
            <div>
              <span>
                Not found tasks for this day
              </span>
            </div>
          </template>
        </div>
      </q-card>

      <q-card class="projects-container">
        <div class="card-title">
          <Heading level="h2">
            Projects worked in day
          </Heading>
        </div>

        <div class="projects">
          <template v-if="request_pending">
            <div
              v-for="n in 3"
              :key="n"
            >
              <span>
                <q-skeleton
                  type="text"
                  width="90px"
                  height="30px"
                />
              </span>
            </div>
          </template>

          <template v-else-if="getSelectedFocusSummary.projects.length">
            <q-badge
              v-for="project in getSelectedFocusSummary.projects"
              :key="project.name"
              :label="project.name"
              class="text-caption"
              color="positive"
              rounded
            />
          </template>

          <div v-else>
            <span>
              Not found projects for this day
            </span>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { computed, ref } from 'vue';
  import { groupBy } from 'lodash';

  import { Heading } from '@/design-system/Texts';
  import { DateSkeleton } from '@/design-system/Skeleton';

  import { useStore } from '@/store';

  import { FETCH_STREAK, FETCH_STREAK_FOCUS_SUMMARIES } from '@/store/types/actions';
  import FocusSummary from '@/interfaces/FocusSummary.interface';

  const store = useStore();
  const route = useRoute();

  const { streak_id } = route.params;
  const request_pending = computed(() => {
    const { streak: streak_request_pending = {} } = store.state.requests_pending;

    return streak_request_pending.show || streak_request_pending.focus_summaries;
  });

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
      const last_focus_summary  = focus_summaries.value[0];

      const first_month_date = getDateFromSummary(first_focus_summary.date);
      const last_month_date = getDateFromSummary(last_focus_summary.date);

      let months = (last_month_date.getFullYear() - first_month_date.getFullYear()) * 12;

      months -= first_month_date.getMonth();
      months +=last_month_date.getMonth();

      return getMonthsByYearLabels(months + 1, first_month_date);
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

  // side bar
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
</script>

<style scoped lang="scss">
  .streak-container {
    padding: 1.125rem;
    display: flex;
    justify-content: center;

    .streaks { width: 922px; }
  }

  .streak-title {
    display: flex;
    gap: 10px;
    align-items: center;

    h2 {
      font-size: 19px;
      line-height: 26.6px;
      margin: 0;
      font-weight: 700;
    }
  }

  .calendar-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;

    > div {
      width: fit-content;
      display: flex;
      flex-direction: column;
    }
  }

  .side-bar {
    width: 368px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .top-bar {
      display: flex;

      .top-bar-title {
        font-size: 15px;
        font-weight: 700;
      }
    }

    .card-title {
      h2 {
        font-size: 19px;
        font-weight: 700;
        line-height: 28px;
        margin-bottom: 0;
      }
    }

    .tasks-container {
      padding: 18px;
      border-radius: 10px;
      gap: 10px;
      display: flex;
      flex-direction: column;

      .tasks {
        display: flex;
        flex-direction: column;

        .task {
          padding-top: 4px;
          padding-bottom: 4px;
        }

        span {
          font-size: 17px;
          line-height: 24px;
          font-weight: 700;
        }
      }
    }

    .projects-container {
      display: flex;
      flex-direction: column;
      padding: 18px;
      border-radius: 10px;
      gap: 20px;

      .projects {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      span {
        font-size: 17px;
        line-height: 24px;
        font-weight: 700;
      }
    }
  }

  .title-request-pending {
    display: flex;
    gap: 10px;
  }
</style>
