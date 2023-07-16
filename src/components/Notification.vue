<template>
  <div class="notification">
    <article class="message is-success">
      <div class="message-header">
        Atention
      </div>

      <div class="message-body">
        Here we go a nice notification text
      </div>
    </article>

    <article class="message is-warning">
      <div class="message-header">
        Atention
      </div>

      <div class="message-body">
        Here we go a nice notification text
      </div>
    </article>

    <article class="message is-danger">
      <div class="message-header">
        Atention
      </div>

      <div class="message-body">
        Here we go a nice notification text
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ATNotification',
  });
</script>

<style scoped>
  .notification {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 1;
    background: none;
  }
</style>