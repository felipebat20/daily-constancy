<template>
  <div class="row full-width">
    <div class="col-12 full-width tables">
      <q-table
        v-for="(tasks_aggregate, index) in getTasksAggregate"
        :key="index"
        style="height: 400px; width: 100%"
        flat
        bordered
        :title="tasks_aggregate[0]"
        :rows="tasks_aggregate[1]"
        class="my-sticky-header-table"
        :columns="columns"
        row-key="id"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td
              key="continue"
              :props="props"
              style="width: 40px"
            >
              <q-btn
                class="custom-border is-inline-block"
                unelevated
                :loading="isRequestPending(props.row)"
                @click="handleInitTask(props.row)"
              >
                <span class="icon is-small">
                  <i :class="getTaskIcon(props.row)" />
                </span>
              </q-btn>
            </q-td>

            <q-td
              key="name"
              :props="props"
              auto-width
            >
              <div class="row-item">
                {{ props.row.description || 'N/D' }}
              </div>
            </q-td>

            <q-td
              key="project"
              :props="props"
              style="width: 150px"
            >
              <q-badge
                color="green"
                rounded
                class="py-1 px-2"
              >
                {{ props.row.project?.name || 'N/D' }}
              </q-badge>
            </q-td>

            <q-td
              key="total_time_spent"
              :props="props"
            >
              <q-badge
                color="primary"
                rounded
                class="py-1 px-2"
              >
                {{ formatTimer(getTaskTime(props.row)) }}
              </q-badge>
            </q-td>

            <q-td
              key="actions"
              :props="props"
            >
              <q-btn
                class="custom-border is-inline-block"
                unelevated
                @click="selectTask(props.row)"
              >
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt" />
                </span>
              </q-btn>

              <q-btn
                class="button ml-2 is-danger"
                @click="handleDeleteButtonClick(props.row)"
              >
                <span class="icon is-small">
                  <i class="fas fa-trash" />
                </span>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>

  <DeleteTaskModal
    ref="deleteTaskModal"
    :task="selected_task"
  />

  <EditTaskModal
    ref="editTaskModal"
    :task="selected_task"
  />
</template>

<script setup lang="ts">
  import type { QTableProps } from 'quasar';
  import { ref, computed } from 'vue';
  import { groupBy, orderBy } from 'lodash';

  import DeleteTaskModal from '@/components/tasks/partials/DeleteTaskModal.vue';
  import EditTaskModal from '@/components/tasks/partials/EditTaskModal.vue';

  import { useStore } from '@/store';

  import TaskInterface from '@/interfaces/Task.interface';
  import formatTimer from '@/hooks/formatTimer';

  import { CREATE_TASK_SESSION, FINISH_TASK_SESSION, SET_ACTIVE_TASK } from '@/store/types/actions';

  const store = useStore();
  const emit = defineEmits(['selected-task']);
  const selected_task = ref({} as TaskInterface);
  const deleteTaskModal = ref(DeleteTaskModal);
  const editTaskModal = ref(EditTaskModal);

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
      sortable: true,
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
      align: 'left',
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

  const request_pending = ref([] as number[]);

  const pagination = ref({
    rowsPerPage: 0
  });

  const isRequestPending = (task: TaskInterface) => {
    return request_pending.value.includes(task.id);
  };

  const handleTask = async (task: TaskInterface) => {
    if (task.lastSessionStartedAt) {
      return store.dispatch(FINISH_TASK_SESSION, task);
    }

    const new_task = await store.dispatch(CREATE_TASK_SESSION, task);
    store.dispatch(SET_ACTIVE_TASK, new_task);
  };

  const handleInitTask = async (task: TaskInterface) => {
    request_pending.value.push(task.id);

    await handleTask(task);

    request_pending.value = request_pending.value.filter((task_id: string | number) => task_id !== task.id);
  };

  const getTaskIcon = (task: TaskInterface) => {
    if (task.lastSessionStartedAt) {
      return 'fas fa-pause';
    }

    return 'fas fa-play';
  };

  const getTaskTime = (task: TaskInterface) => {
    return task.total_time_spent || task.time_spent || 0;
  };

  const selectTask = (task: TaskInterface) => {
    editTaskModal.value.openModal(task);
  };

  const getTasksAggregate = computed(() => {
    const day = (task: TaskInterface) => new Date(task.createdAt || (+task.id)).toDateString();

    return Object.entries(groupBy(orderBy(tasks.value, ['createdAt', 'id'], ['desc', 'desc']), day));
  });

  const handleDeleteButtonClick = (task: TaskInterface) => {
    selected_task.value = task;
    deleteTaskModal.value.openModal();
  };
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 400px
  background-color: var(--accent-background) !important
  border-color: var(--border-color) !important
  color: var(--text-primary) !important

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: var(--accent-background)
    color: var(--text-primary)
    border-color: var(--border-color) !important

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px

  tr, td
    border-color: var(--border-color) !important

.tables
  display: flex
  gap: 10px
  flex-direction: column

.row-item
  display: flex
  align-items: center
  height: 100%
  width: 500px
  white-space: pre-wrap

.button
  color: var(--text-primary)
  background-color: var(--accent-background)
  border-color: var(--border-color)

.custom-border
  border: 1px solid var(--border-color) !important
</style>
