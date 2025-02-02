<template>
  <div class="main-container">
    <div
      class="tasks-container flex flex-col gap-5 p-5"
      :class="{'desktop': $q.screen.gt.xs}"
    >
      <Form :class="{ 'custom-margin': ! $q.screen.gt.xs }" />

      <TasksContainer />
    </div>

    <div
      v-if="$q.screen.gt.xs"
      class="side-right-bar py-5"
    >
      <StreaksHomeCard />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useQuasar } from 'quasar';

  import Form from '@/components/Form.vue';
  import TasksContainer from '@/components/tasks/TasksContainer.vue';
  import StreaksHomeCard from '@/components/tasks/partials/StreaksHomeCard.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
      TasksContainer,
      StreaksHomeCard,
    },

    setup() {
      const $q = useQuasar();

      return { $q };
    }
  });
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    max-width: 100%;
    gap: 20px;

    .tasks-container {
      width: 100%;

      &.desktop { width: calc(100% - 452px); }
    }

    .side-right-bar {
      min-width: 368px;

      > div {
        padding: 18px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }

  .custom-margin { width: 100%; }
</style>
