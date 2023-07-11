<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        Descrição da tarefa
      </div>

      <div class="column">
        <TimerDisplay :timeInSeconds="0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import TimerDisplay from './TimerDisplay.vue'

  export default defineComponent({
    name: 'ATTask',
    components: { TimerDisplay },
  });
</script>

<style scoped>
  .box { background-color: #FAF0CA; }
</style>