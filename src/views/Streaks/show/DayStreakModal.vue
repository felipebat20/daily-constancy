<template>
  <q-dialog v-model="show_modal">
    <q-card :style="{ minWidth: $q.screen.width > 450 ? '450px' : '100%' }">
      <q-card-section class="q-pb-none">
        <div class="flex justify-between items-center">
          <span class="text-h6">
            Day: {{ getFormattedDate }}
          </span>

          <q-space />

          <q-btn
            icon="close"
            flat
            class="q-pa-none"
            v-close-popup
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pb-none">
        <p class="m-0 text-md">
          Total time focused: {{ getFormattedDuration }}
        </p>

        <p class="m-0 text-sm">
          Total tasks: {{ focusedSummary.totalTasks }}
        </p>

        <p class="m-0 text-sm">
          Total projects: {{ focusedSummary.totalProjects }}
        </p>
      </q-card-section>

      <q-card-section class="q-pb-none">
        <p class="m-0 text-14px">
          Tasks of the day:
        </p>

        <ul class="tasks">
          <template v-if="focusedSummary.tasks.length">
            <li
              v-for="task in focusedSummary.tasks"
              :key="task.id"
              class="task"
            >
              <span>
                - {{ task.description }}
              </span>
            </li>
          </template>

          <template v-else>
            <div>
              <span>
                Not found tasks for this day
              </span>
            </div>
          </template>
        </ul>
      </q-card-section>

      <q-card-section>
        <p class="m-0 pb-1 text-14px">
          Projects worked in this day:
        </p>

        <div class="projects">
          <template v-if="focusedSummary.projects.length">
            <q-badge
              v-for="project in focusedSummary.projects"
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import { Ref } from 'vue';
  import { ref, defineExpose, computed } from 'vue';
  import { useFormatSecondsToNow } from '@/composables/formatTime';

  import FocusSummary from '@/interfaces/FocusSummary.interface';

  const show_modal = ref(false);
  const selectedDate = ref('');

  const focusedSummary: Ref<FocusSummary> = ref({} as FocusSummary);

  const openModal = ({ selected_date, focused_summary }: { selected_date: string, focused_summary: FocusSummary }) => {
    console.log(selected_date);
    console.log(focused_summary);
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
