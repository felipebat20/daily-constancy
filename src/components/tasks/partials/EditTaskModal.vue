<template>
  <Modal
    v-if="show_modal"
    :show="show_modal"
  >
    <template #header>
      <p class="modal-card-title mb-0">
        Edit your task
      </p>

      <button
        class="delete"
        aria-label="close"
        @click="closeModal"
      />
    </template>

    <template #body>
      <form @submit.prevent.stop="updateTask">
        <div class="field">
          <label
            for="projectName"
            class="label"
          >
            Description
          </label>

          <input
            v-model="task.description"
            type="text"
            class="input"
            id="projectName"
            autofocus
          >
        </div>

        <div class="field">
          <label
            for="projectName"
            class="label"
          >
            Project
          </label>

          <div class="select">
            <select v-model="project_id">
              <option :value="0">
                Select a project
              </option>

              <option
                v-for="project in projects"
                :key="project.id"
                :value="project.id"
              >
                {{ project.name }}
              </option>
            </select>
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <button
        @click="updateTask"
        class="button is-success"
      >
        Save task
      </button>

      <button
        class="button"
        @click="closeModal"
      >
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { defineExpose, ref, PropType, computed, defineProps } from 'vue';
  import type { Ref } from 'vue';

  import TaskInterface from '@/interfaces/Task.interface';
  import Modal from '@/components/shared/Modal.vue';

  import { useStore } from '@/store';
  import { UPDATE_TASK }  from '@/store/types/actions';

  const show_modal = ref(false);

  const store = useStore();
  const project_id = ref(0);

  const task: Ref<TaskInterface> = ref({} as TaskInterface);

  const projects = computed(() => store.state.project.projects);
  const openModal = (update_task: TaskInterface) => {
    task.value = { ...update_task};
    project_id.value = update_task.project?.id;

    return show_modal.value = true;
  };

  const closeModal = () => show_modal.value = false;

  const updateTask = () => {
    const project = projects.value.find(proj => proj.id === project_id.value);

    return store.dispatch(UPDATE_TASK, {
      ...task.value,
      project,
    }).then(closeModal);
  };

  defineExpose({
    openModal,
    closeModal,
  });
</script>
