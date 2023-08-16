<template>
  <div>
    Apresentando streaks

    <div>
      <q-date
        v-model="model"
        range
        multiple
        title="Programming"
        subtitle="Cave Mode"
        color="orange"
        text-color="black"
        bordered
        no-unset
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const model = ref([
    {
      from: '2023/08/04',
      to: '2023/08/09',
    },
    {
      from: '2023/08/10',
      to: '2023/08/15',
    },
  ]);
</script>
