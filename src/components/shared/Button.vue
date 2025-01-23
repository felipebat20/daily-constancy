<template>
  <q-btn
    class="custom-border"
    no-caps
    unelevated
    :loading="button.loading"
    :disabled="button.disabled"
  >
    <div class="flex gap-1">
      <span class="icon">
        <i :class="button.icon" />
      </span>

      <span>{{ button.label }}</span>
    </div>
  </q-btn>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import ButtonInterface from '../../interfaces/Button.interface';

  export default defineComponent({
    name: 'ATButton',
    props: {
      button: {
        type: Object as PropType<ButtonInterface>,
        required: true,
      },
    },
  });
</script>

<style lang="scss" scoped>
  .custom-border { border-color: var(--border-color) !important; }
</style>
