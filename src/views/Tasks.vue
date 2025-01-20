<template>
  <Form :class="{ 'custom-margin': ! $q.screen.gt.xs }" />

  <div class="main-container">
    <div
      class="tasks-container"
      :class="{'desktop': $q.screen.gt.xs}"
    >
      <DCTasksContainer />
    </div>

    <div
      v-if="$q.screen.gt.xs"
      class="side-right-bar"
    >
      <StreaksHomeCard />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useQuasar } from 'quasar';

  import Form from '@/components/Form.vue';
  import DCTasksContainer from '@/components/tasks/DCTasksContainer.vue';
  import StreaksHomeCard from '@/components/tasks/partials/StreaksHomeCard.vue';

  export default defineComponent({
    name: 'App',
    components: {
      Form,
      DCTasksContainer,
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
    gap: 10px;
    max-width: 100%;
    padding: 1.25rem;
    gap: 20px;

    .tasks-container {
      width: 100%;

      &.desktop { width: calc(100% - 452px); }
    }

    .side-right-bar {
      min-width: 368px;

      > div {
        border: 3px solid var(--border-color);
        padding: 18px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }

  .custom-margin {
    width: 100%;
  }
</style>
