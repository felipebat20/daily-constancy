<template>
  <div class="reports-page">
    <DSPageHeader
      title="Reports"
      subtitle="Time distribution by project"
    />

    <div
      v-if="projects.length"
      class="reports-page__chart"
    >
      <v-chart
        class="reports-page__chart-content"
        :option="option"
        autoresize
      />
    </div>

    <DSEmptyState
      v-else
      title="No Projects Found"
      message="Create a project to see reports about your time distribution."
      icon="bar_chart"
    >
      <DSButton
        icon="folder"
        label="Go to Projects"
        variant="primary"
        @click="$router.push('/projects')"
      />
    </DSEmptyState>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';

import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, computed, onMounted } from 'vue';

import DSPageHeader from '@/design-system/DSPageHeader.vue';
import DSEmptyState from '@/design-system/DSEmptyState.vue';
import DSButton from '@/design-system/DSButton.vue';

import { useStore } from '@/store';
import { FETCH_PROJECTS, FETCH_TASKS } from '@/store/types/actions';
import TaskInterface from '@/interfaces/Task.interface';
import formatTimer from '@/hooks/formatTimer';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const store = useStore();

interface chart_data_interface {
  value: number
  name: string
}

const option = ref({});
const tasks = computed(() => store.state.task.tasks);
const projects = computed(() => store.state.project.projects);

onMounted(async () => {
  await Promise.all([
    store.dispatch(FETCH_PROJECTS),
    store.dispatch(FETCH_TASKS),
  ]);

  const chart_data = computed(() => {
    const chart_data_value: chart_data_interface[] = [];

    projects.value.forEach(proj => {
      const total_project_time_spent = tasks.value.reduce((accumulator: number, current_value: TaskInterface) => {
        if (proj.id === current_value.project?.id) {
          return accumulator + (current_value.total_time_spent || current_value.time_spent || 0);
        }

        return accumulator + 0;
      }, 0);

      chart_data_value.push({ value: total_project_time_spent, name: proj.name });
    });

    return chart_data_value;
  });

  option.value = {
    title: {
      text: 'Time by project',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (
        { seriesName, data: { name, value }, percent }:
        { seriesName: string, data: chart_data_interface, percent: number }
      ) => {
        return `${seriesName} <br/>${name} : ${formatTimer(value)} (${percent}%)`;
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: projects.value.map(proj => proj.name),
    },
    series: [
      {
        name: 'Time focused',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: chart_data.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
});
</script>

<style scoped lang="scss">
.reports-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  &__chart {
    width: 100%;
    height: 70vh;
    background: var(--bg-card);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);

    &:hover {
      box-shadow: var(--shadow-lg);
    }
  }

  &__chart-content {
    width: 100%;
    height: 100%;
  }
}
</style>
