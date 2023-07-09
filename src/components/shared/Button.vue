<template>
  <button
      class="button"
      @click="$emit('click')"
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

  interface Button {
    disabled: boolean
    icon: string
    label: string
  }


  export default defineComponent({
    name: 'ATButton',
    props: {
      button: {
        type: Object as PropType<Button>,
        required: true,
      },
    },
  })
</script>