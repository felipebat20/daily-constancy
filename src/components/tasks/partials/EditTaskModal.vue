<template>
  <q-dialog
    v-model="show_modal"
    :show="show_modal"
  >
    <q-card
      :style="{'min-width': ! $q.screen.gt.xs ? '100%' : '450px'}"
      class="column"
    >
      <q-card-section class="row items-center q-pb-md q-pt-sm">
        <p class="text-base m-0">
          Edit your task
        </p>

        <q-space />

        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="task.description"
          type="text"
          label="Description"
          class="input"
          id="projectName"
          autofocus
          dense
          outlined
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <ProjectsSelect
          v-model="project_id"
          :project_id="project_id"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          class="button"
          @click="closeModal"
        >
          Cancel
        </q-btn>

        <q-btn
          color="green-5"
          :loading="request_pending"
          no-caps
          @click="updateTask"
        >
          Save task
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import { defineExpose, ref, PropType, computed, defineProps } from 'vue';
  import type { Ref } from 'vue';

  import TaskInterface from '@/interfaces/Task.interface';
  import Modal from '@/components/shared/Modal.vue';
  import ProjectsSelect from '@/components/shared/ProjectsSelect.vue';

  import { useStore } from '@/store';
  import { UPDATE_TASK }  from '@/store/types/actions';

  const show_modal = ref(false);

  const store = useStore();
  const project_id = ref(0);

  const task: Ref<TaskInterface> = ref({} as TaskInterface);
  const request_pending = ref(false);

  const projects = computed(() => store.state.project.projects);
  const openModal = (update_task: TaskInterface) => {
    console.log(update_task);

    task.value = { ...update_task};
    project_id.value = update_task.project?.id;

    return show_modal.value = true;
  };

  const closeModal = () => show_modal.value = false;

  const updateTask = async () => {
    request_pending.value = true;
    const project = projects.value.find(proj => proj.id === project_id.value);

    await store.dispatch(UPDATE_TASK, {
      ...task.value,
      project,
    });

    request_pending.value = false;

    return closeModal();
  };

  defineExpose({
    openModal,
    closeModal,
  });
</script>
