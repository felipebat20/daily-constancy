<template>
  <div class="ds-notification-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="ds-notification"
      :class="`ds-notification--${getNotificationVariant(notification.type)}`"
    >
      <div class="ds-notification__header">
        <q-icon
          :name="getNotificationIcon(notification.type)"
          class="ds-notification__icon"
        />

        <h4 class="ds-notification__title">
          {{ notification.title }}
        </h4>
      </div>

      <p class="ds-notification__content">
        {{ notification.content }}
      </p>

      <q-btn
        icon="close"
        flat
        round
        dense
        size="sm"
        class="ds-notification__close"
        @click="removeNotification(notification.id)"
        aria-label="Close notification"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useStore } from '@/store';
import { Notification as NotificationInterface, NotificationType } from '@/interfaces/Notification.interface';
import { DELETE_NOTIFICATION } from '@/store/types/mutations';

const store = useStore();

const notifications = computed(() => store.state.notifications);

const getNotificationVariant = (type: NotificationType) => {
  const variants: Record<NotificationType, string> = {
    [NotificationType.SUCCESS]: 'success',
    [NotificationType.WARNING]: 'warning',
    [NotificationType.FAILED]: 'danger',
  };
  return variants[type] || 'info';
};

const getNotificationIcon = (type: NotificationType) => {
  const icons: Record<NotificationType, string> = {
    [NotificationType.SUCCESS]: 'check_circle',
    [NotificationType.WARNING]: 'warning',
    [NotificationType.FAILED]: 'error',
  };
  return icons[type] || 'info';
};

const removeNotification = (id: number) => {
  store.commit(DELETE_NOTIFICATION, id);
};
</script>

<style scoped lang="scss">
.ds-notification-container {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 320px;
  pointer-events: none;
}

.ds-notification {
  pointer-events: auto;
  padding: var(--space-4);
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
  }

  &__icon {
    font-size: 1.25rem;
  }

  &__title {
    margin: 0;
    flex: 1;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
  }

  &__content {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: 1.4;
  }

  &__close {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    color: var(--text-tertiary);
    transition: color 0.2s ease;

    &:hover {
      color: var(--text-primary);
    }
  }

  &--success {
    border-left: 4px solid var(--success);

    .ds-notification__icon {
      color: var(--success);
    }
  }

  &--warning {
    border-left: 4px solid var(--warning);

    .ds-notification__icon {
      color: var(--warning);
    }
  }

  &--danger {
    border-left: 4px solid var(--danger);

    .ds-notification__icon {
      color: var(--danger);
    }
  }

  &--info {
    border-left: 4px solid var(--info);

    .ds-notification__icon {
      color: var(--info);
    }
  }
}
</style>
