<template>
  <h1 class="title">
    Streak qualquer
  </h1>

  <div>
    <div class="q-pa-md">
      <div class="q-pb-sm">
        Model: {{ getDays }}
      </div>

      <q-date
        v-model="getDays"
        multiple
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { computed, ref } from 'vue';

  import { useStore } from '@/store';

  import { FETCH_STREAK, FETCH_STREAK_FOCUS_SUMMARIES } from '@/store/types/actions';

  const store = useStore();
  const route = useRoute();

  const { streak_id } = route.params;

  store.dispatch(FETCH_STREAK, streak_id);
  store.dispatch(FETCH_STREAK_FOCUS_SUMMARIES, streak_id);

  const focus_summaries = computed(() => store.state.streak.focus_summaries);

  const getDays = computed(() => {
    const days = focus_summaries.value.map((summary) => {
      const date = new Date(parseInt(summary.date));
      const year = date.getFullYear();
      const month = date.getMonth().toString().padStart(2, '0');
      const day = date.getDay().toString().padStart(2, '0');

      return `${year}/${month}/${day}`;
    });

    console.log(days);

    return days;
  });
</script>

<style scoped lang="scss">

</style>
