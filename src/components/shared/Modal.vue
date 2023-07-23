<template>
  <div
    v-if="show"
    class="modal"
    :class="{'is-active': !! show}"
  >
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="header" />
      </header>

      <section class="modal-card-body">
        <slot name="body" />
      </section>

      <footer class="modal-card-foot">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ATModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
