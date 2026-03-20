<template>
  <DSModal
    v-model="show_modal"
    :title="`Day: ${getFormattedDate}`"
    :has-footer="false"
  >
    <template #body>
      <div class="day-streak-modal__summary">
        <p class="day-streak-modal__summary-item">
          <strong>Total time focused:</strong>
          <span>{{ getFormattedDuration }}</span>
        </p>

        <p class="day-streak-modal__summary-item">
          <strong>Total tasks:</strong>
          <span>{{ focusedSummary.totalTasks }}</span>
        </p>

        <p class="day-streak-modal__summary-item">
          <strong>Total projects:</strong>
          <span>{{ focusedSummary.totalProjects }}</span>
        </p>
      </div>

      <div class="day-streak-modal__section">
        <h4 class="day-streak-modal__section-title">
          Tasks of the day:
        </h4>

        <ul class="day-streak-modal__list">
          <template v-if="focusedSummary.tasks.length">
            <li
              v-for="task in focusedSummary.tasks"
              :key="task.id"
            >
              <span>{{ task.description }}</span>
            </li>
          </template>

          <template v-else>
            <li class="day-streak-modal__empty">
              Not found tasks for this day
            </li>
          </template>
        </ul>
      </div>

      <div class="day-streak-modal__section">
        <h4 class="day-streak-modal__section-title">
          Projects worked in this day:
        </h4>

        <div class="day-streak-modal__badges">
          <template v-if="focusedSummary.projects.length">
            <DSBadge
              v-for="project in focusedSummary.projects"
              :key="project.name"
              :label="project.name"
              variant="secondary"
            />
          </template>

          <template v-else>
            <span class="day-streak-modal__empty">
              Not found projects for this day
            </span>
          </template>
        </div>
      </div>
    </template>
  </DSModal>
</template>

<script setup lang="ts">
import { ref, defineExpose, computed } from 'vue';
import { useFormatSecondsToNow } from '@/composables/formatTime';
import FocusSummary from '@/interfaces/FocusSummary.interface';

import DSModal from '@/design-system/DSModal.vue';
import DSBadge from '@/design-system/DSBadge.vue';

const show_modal = ref(false);
const selectedDate = ref('');
const focusedSummary = ref({} as FocusSummary);

const openModal = ({ selected_date, focused_summary }: { selected_date: string, focused_summary: FocusSummary }) => {
  selectedDate.value = selected_date;
  focusedSummary.value = focused_summary;
  show_modal.value = true;
};

const getFormattedDuration = computed(() => {
  return useFormatSecondsToNow({ seconds: focusedSummary.value.totalFocusTime });
});

const getFormattedDate = computed(() => {
  if (selectedDate.value) {
    let [year, month, date] = selectedDate.value.split('-');
    month = (+month + 1).toString().padStart(2, '0');
    date = date.padStart(2, '0');
    return `${date}/${month}/${year}`;
  }

  const current_date = new Date();
  return `${current_date.getDate()}/${current_date.getMonth() + 1}/${current_date.getFullYear()}`;
});

defineExpose({
  openModal,
});
</script>

<style scoped lang="scss">
.day-streak-modal {
  &__summary {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
    background-color: var(--bg-secondary);
    border-radius: var(--radius-md);
  }

  &__summary-item {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--text-secondary);
    display: flex;
    justify-content: space-between;

    strong {
      color: var(--text-primary);
    }

    span {
      font-weight: var(--font-medium);
    }
  }

  &__section {
    margin-top: var(--space-6);
  }

  &__section-title {
    margin: 0 0 var(--space-3) 0;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  &__list {
    margin: 0;
    padding-left: var(--space-4);
    list-style-type: none;

    li {
      padding: var(--space-2) 0;
      font-size: var(--text-sm);
      color: var(--text-secondary);

      span {
        display: block;
      }
    }
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
}
</style>
