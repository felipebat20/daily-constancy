<template>
  <div class="notification">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import Notification from './shared/Notification.vue';

  import { useStore } from '../store';

  export default defineComponent({
    name: 'ATNotifications',
    components: { Notification },
    setup() {
      const store = useStore();

      return {
        notifications: computed(() => store.state.notifications),
      };
    },
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

  .message-body { position: relative; overflow: hidden; }

  .progress {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    border-radius: 0;
  }
</style>
