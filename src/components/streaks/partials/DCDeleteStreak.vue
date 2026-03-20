<template>
  <DSModal
    v-model="show_modal"
    title="Delete Streak"
    :loading="request_pending"
    confirm-label="Delete Streak"
    variant="danger"
    @confirm="handleDeleteStreak"
    @cancel="handleCancel"
  >
    <template #body>
      <p class="delete-streak-modal__message">
        Are you sure you want to delete this streak?
      </p>
    </template>
  </DSModal>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';

import DSModal from '@/design-system/DSModal.vue';

import { useStore } from '@/store';
import StreakInterface from '@/interfaces/Streak.interface';
import { DELETE_STREAK } from '@/store/types/actions';

const store = useStore();
const show_modal = ref(false);
const request_pending = ref(false);
const streak = ref({} as StreakInterface);

const handleDeleteStreak = async () => {
  request_pending.value = true;

  if (streak.value.id) {
    await store.dispatch(DELETE_STREAK, streak.value);
    show_modal.value = false;
  }

  request_pending.value = false;
};

const handleCancel = () => {
  show_modal.value = false;
};

const handleOpenModal = (deletable_streak: StreakInterface) => {
  streak.value = deletable_streak;
  show_modal.value = true;
};

defineExpose({ show_modal, handleOpenModal });
</script>

<style scoped lang="scss">
.delete-streak-modal {
  &__message {
    margin: 0;
    font-size: var(--text-base);
    color: var(--text-primary);
  }
}
</style>
