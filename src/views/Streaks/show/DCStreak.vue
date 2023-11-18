<template>
  <h1 class="title">
    Streak qualquer
  </h1>

  <div>
    <div class="q-pa-md">
      <div class="q-pb-sm">
        Streak
      </div>

      <div class="calendar-container">
        <div
          v-for="month_label in getDateLabels"
          :key="month_label"
        >
          <q-date
            v-model="(getDays[month_label])"
            multiple
            today-btn
            minimal
            :years-in-month-view="false"
            :default-year-month="month_label"
            :navigation-min-year-month="month_label"
            :navigation-max-year-month="month_label"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { groupBy } from 'lodash';

  import { useStore } from '@/store';

  import { FETCH_STREAK, FETCH_STREAK_FOCUS_SUMMARIES } from '@/store/types/actions';

  const store = useStore();
  const route = useRoute();

  const { streak_id } = route.params;

  store.dispatch(FETCH_STREAK, streak_id);
  store.dispatch(FETCH_STREAK_FOCUS_SUMMARIES, streak_id);

  const focus_summaries = computed(() => store.state.streak.focus_summaries);

  const getDays = computed(() => {
    const days = {} as { [key: string]: string };

    getDateLabels.value.forEach(value => Object.assign(days, { [value]: getDaysLabels(value) }));

    return days;
  });

  const getDaysLabels = (month_label: string) => {
    if (getDaysByMonths.value[month_label]) {
      return getDaysByMonths.value[month_label].map((summary) => {
        const date = new Date(parseInt(summary.date));
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
      const date = new Date(+summary.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');

      return `${year}/${month}`;
    });

    return aggregate_by_months;
  });

  const getDateLabels = computed(() => {
    if (focus_summaries.value.length) {
      const first_focus_summary = focus_summaries.value[focus_summaries.value.length - 1];
      const last_focus_summary  = focus_summaries.value[0];

      const first_month_date = new Date(+first_focus_summary.date);
      const last_month_date = new Date(+last_focus_summary.date);

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
</script>

<style scoped lang="scss">
  .calendar-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;

    > div {
      width: fit-content;
      display: flex;
      flex-direction: column;
    }
  }
</style>
