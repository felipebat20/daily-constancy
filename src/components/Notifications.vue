<template>
  <div class="notifications-container">
    <DSNotification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import DSNotification from '@/design-system/DSNotification.vue';

import { useStore } from '../store';

export default defineComponent({
  name: 'ATNotifications',
  components: { DSNotification },

  setup() {
    const store = useStore();

    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notifications-container {
  pointer-events: none;
}
</style>
