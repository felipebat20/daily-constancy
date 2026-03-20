<template>
  <div class="ds-skeleton-date">
    <q-calendar
      :model="calendarModel"
      readonly
      mini
      bordered
      class="ds-skeleton-date__calendar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const calendarModel = ref(new Date().toISOString().substring(0, 10));
</script>

<style scoped lang="scss">
.ds-skeleton-date {
  width: 290px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
  background-color: var(--bg-primary);

  &__calendar {
    opacity: 0.5;
  }

  :deep(.q-calendar__calendar) {
    background-color: var(--bg-secondary);
  }

  :deep(.q-calendar__days) {
    color: var(--text-primary);
  }
}
</style>
