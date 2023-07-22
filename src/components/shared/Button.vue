<template>
  <button
      class="button"
      :disabled="button.disabled"
    >
      <span class="icon">
        <i :class="button.icon"></i>
      </span>

      <span>{{ button.label }}</span>
    </button>
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
  })
</script>
