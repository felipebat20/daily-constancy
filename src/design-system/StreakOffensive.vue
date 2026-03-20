<template>
  <span
    class="streak-badge"
    :class="{ 'on-fire': offensive.today_is_in_streak }"
  >
    <div class="streak-badge__icon">
      <q-icon
        name="whatshot"
        size="18px"
      />
    </div>

    <span class="streak-badge__count">
      {{ offensive.days }}
    </span>

    <span class="streak-badge__label">
      day{{ offensive.days !== 1 ? 's' : '' }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  offensive: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.streak-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-tertiary);
    transition: all 0.3s ease;
  }

  &__count {
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  &__label {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &.on-fire {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ffcc33 100%);
    color: white;
    border-color: transparent;
    box-shadow: 
      0 2px 8px rgba(255, 107, 107, 0.3),
      0 0 20px rgba(255, 140, 83, 0.2);
    animation: pulse 2s ease-in-out infinite;

    .streak-badge__icon {
      color: white;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    .streak-badge__count {
      color: white;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .streak-badge__label {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  &:hover:not(.on-fire) {
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
    border-color: var(--primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:hover.on-fire {
    transform: translateY(-2px);
    box-shadow: 
      0 4px 12px rgba(255, 107, 107, 0.4),
      0 0 30px rgba(255, 140, 83, 0.3);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
</style>
