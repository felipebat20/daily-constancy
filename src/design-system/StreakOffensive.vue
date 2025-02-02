<template>
  <span
    class="offensive"
    :class="{ 'on-fire': offensive.today_is_in_streak }"
  >
    <div class="icon">
      <q-icon
        name="whatshot"
        size="23px"
      />
    </div>

    <div>
      <span class="days text-base">
        {{ offensive.days }}
      </span>
    </div>
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
  .offensive {
    gap: 4px;
    font-size: 15px;
    font-weight: 700;

    &.on-fire { color: rgb(255, 171, 51); }
    .days {
      display: inline;
      vertical-align: baseline;
    }
  }
</style>
