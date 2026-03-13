<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="tasks-page">
    <main class="tasks-page__main">
      <div class="tasks-page__form">
        <Form />
      </div>

      <TasksContainer />
    </main>

    <aside
      v-if="$q.screen.gt.xs"
      class="tasks-page__sidebar"
    >
      <StreaksHomeCard />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

import Form from '@/components/Form.vue';
import TasksContainer from '@/components/tasks/TasksContainer.vue';
import StreaksHomeCard from '@/components/tasks/partials/StreaksHomeCard.vue';

const $q = useQuasar();
</script>

<style scoped lang="scss">
.tasks-page {
  display: flex;
  gap: var(--space-6);
  max-width: 100%;

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-width: 0;
  }

  &__form {
    width: 100%;
  }

  &__sidebar {
    width: 368px;
    flex-shrink: 0;

    :deep(.q-card) {
      border-radius: var(--radius-lg);
    }
  }
}
</style>
