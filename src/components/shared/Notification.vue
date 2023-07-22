<template>
  <article
    class="message"
    :class="notification_type[notification.type]"
  >
    <div class="message-header">
      {{ notification.title }}
    </div>

    <div class="message-body position-relative">
      {{ notification.content }}

      <progress class="progress is-primary is-small" :value="progress_width" max="100">15%</progress>
    </div>
  </article>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { useStore } from '@/store';
  import { Notification as NotificationInterface, NotificationType } from '@/interfaces/Notification.interface';

  import { DELETE_NOTIFICATION } from '@/store/types/mutations';

  export default defineComponent({
    name: 'ATNotification',
    data() {
      return {
        progress_width: 0,
        interval: 0,
      };
    },

    props: {
      notification: {
        type: Object as PropType<NotificationInterface>,
        required: true,
      },
    },

    setup() {
      const store = useStore();

      return {
        store,
        notifications: computed(() => store.state.notifications),
        notification_type: {
          [NotificationType.SUCCESS]: 'is-success',
          [NotificationType.WARNING]: 'is-warning',
          [NotificationType.FAILED]: 'is-danger',
        }
      };
    },

    mounted() {
      this.initProgress()
    },

    methods: {
      initProgress() {
        this.interval = setInterval(() => {
          this.progress_width += (3.33 / 2);

          if (this.progress_width > 100) {
            clearInterval(this.interval);
            return this.store.commit(DELETE_NOTIFICATION, this.notification.id)
          }
        }, 50);
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

  .message-body { position: relative; overflow: hidden; }

  .progress {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    border-radius: 0;
  }
</style>
