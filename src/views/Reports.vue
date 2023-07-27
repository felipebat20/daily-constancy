<template>
  <div>
    <PieChart />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { PieChart } from 'echarts/charts';

  export default defineComponent({
    name: 'ATReports',
    components: {
      PieChart,
    }
  });
</script>
