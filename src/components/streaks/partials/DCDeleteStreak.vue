<template>
  <q-dialog
    v-model="show_modal"
    persistent
  >
    <q-card :style="{ minWidth: $q.screen.width > 450 ? '450px' : '100%' }">
      <q-card-section>
        <div class="text-h6">
          Delete streak
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span>
          Are you sure that you want to delete this streak?
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          no-caps
          v-close-popup
        />

        <q-btn
          label="Delete streak"
          :loading="request_pending"
          color="negative"
          no-caps
          @click="handleDeleteStreak"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';

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

  const handleOpenModal = (deletable_streak: StreakInterface) => {
    streak.value = deletable_streak;

    show_modal.value = true;
  };

  defineExpose({ show_modal, handleOpenModal });
</script>
