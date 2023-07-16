<template>
  <div class="notification">
    <article
      v-for="notification in notifications"
      :key="notification.id"
      class="message"
      :class="getNotificationTypeClass(notification)"
    >
      <div class="message-header">
        {{ notification.title }}
      </div>

      <div class="message-body">
        {{ notification.content }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { useStore } from '@/store';
  import { Notification as NotificationInterface, NotificationType } from '../interfaces/Notification.interface';

  export default defineComponent({
    name: 'ATNotification',
    setup() {
      const store = useStore();

      return {
        notifications: computed(() => store.state.notifications),
      };
    },

    methods: {
      getNotificationTypeClass(notification: NotificationInterface) {
        const types = {
          [NotificationType.SUCCESS]: () => 'is-success',
          [NotificationType.WARNING]: () => 'is-warning',
          [NotificationType.FAILED]: () => 'is-danger',
        }

        if (types[notification.type]) {
          return types[notification.type]();
        }

        return 'is-success';
      },
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
</style>