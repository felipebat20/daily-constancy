<template>
  <q-table
    style="height: 400px; width: 100%"
    flat
    bordered
    title="Treats"
    :rows="tasks"
    :columns="columns"
    row-key="id"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
  >
    <template #body="props">
      <q-tr
        :props="props"
        @click="onRowClick(props.row)"
      >
        <q-td
          key="continue"
          :props="props"
        >
          <button
            class="button is-inline-block"
            @click="setActiveTask(props.row)"
          >
            <span class="icon is-small">
              <i class="fas fa-play" />
            </span>
          </button>
        </q-td>

        <q-td
          key="name"
          :props="props"
        >
          {{ props.row.description || 'N/D' }}
        </q-td>

        <q-td
          key="project"
          :props="props"
        >
          <q-badge color="green">
            {{ props.row.project?.name || 'N/D' }}
          </q-badge>
        </q-td>

        <q-td
          key="total_time_spent"
          :props="props"
        >
          <q-badge color="purple">
            <TimerDisplay
              :time-in-seconds="getTaskTime(props.row)"
              :has-dark-theme="false"
            />
          </q-badge>
        </q-td>

        <q-td
          key="actions"
          :props="props"
        >
          <button
            class="button"
            @click="selectTask(props.row)"
          >
            <span class="icon is-small">
              <i class="fas fa-pencil-alt" />
            </span>
          </button>

          <button
            class="button ml-2 is-danger"
            @click="handleDeleteButtonClick"
          >
            <span class="icon is-small">
              <i class="fas fa-trash" />
            </span>
          </button>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
  import type { QTableProps } from 'quasar';
  import { ref, computed } from 'vue';
  import { useStore } from '@/store';
  import TaskInterface from '@/interfaces/Task.interface';
  import { SET_ACTIVE_TASK } from '@/store/types/actions';
  import TimerDisplay from '@/components/TimerDisplay.vue';

  const store = useStore();
  const emit = defineEmits(['selected-task']);

  const tasks = computed(() => store.state.task.tasks);

  const columns: QTableProps['columns'] = [
    {
      name: 'continue',
      align: 'left',
      label: '',
      field: '',
    },
    {
      name: 'name',
      required: true,
      label: 'Task',
      align: 'left',
      field: 'description',
    },
    {
      name: 'project',
      align: 'left',
      label: 'Project',
      field: '',
    },
    {
      name: 'total_time_spent',
      label: 'Time spent',
      sortable: true,
      field: '',
    },
    {
      name: 'actions',
      align: 'center',
      label: '',
      field: '',
      sortable: true,
    },
  ];

  // we generate lots of rows here

  const pagination = ref({
    rowsPerPage: 0
  });

  const onRowClick = (row: TaskInterface) => console.log(row, `clicked`);
  const setActiveTask = (task: TaskInterface) => {
    store.dispatch(SET_ACTIVE_TASK, task);
  };

  const getTaskTime = (task: TaskInterface) => {
    return task.total_time_spent || task.time_spent;
  };

  const selectTask = (task: TaskInterface) => {
    emit('selected-task', task);
  };

  const handleDeleteButtonClick = () => {
    // show_modal.value = true;
  };
</script>
