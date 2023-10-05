<template>
  <div
    v-if="projects.length"
    class="project-report-container"
  >
    <v-chart
      class="chart"
      :option="option"
      autoresize
    />
  </div>

  <div
    v-else
    class="no-projects-container"
  >
    <div class="box">
      <p class="is-size-4">
        Create a project to see reports
      </p>

      <router-link
        :to="{ name: 'Projects'}"
        class="button is-link"
      >
        Go to projects
      </router-link>
    </div>
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
import type { Ref } from 'vue';

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
    const chart_data_value: Ref<chart_data_interface[]> = ref([]);

    projects.value.forEach(proj => {
      const total_project_time_spent = tasks.value.reduce((accumulator: number, current_value: TaskInterface) => {
        if (proj.id === current_value.project?.id) {
          return accumulator + (current_value.total_time_spent || current_value.time_spent || 0);
        }

        return accumulator + 0;
      }, 0);

      chart_data_value.value.push({ value: total_project_time_spent, name: proj.name });
    });

    return chart_data_value;
  });

  option.value = {
    title: {
      text: 'Time by project',
      left: 'center',
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

<style scoped>
.chart { height: 70vh; }

.project-report-container {
  background-color: #100C2A;
  height: 100vh;
}

.no-projects-container {
  display: flex ;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: #FFF;
}

.box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
</style>
