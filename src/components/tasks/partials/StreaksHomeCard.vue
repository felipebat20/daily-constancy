<template>
  <q-card
    bordered
    class="streaks-container"
  >
    <div class="streak-title">
      Habits in progress
    </div>

    <div
      class="spinner-container"
      v-if="request_pending"
    >
      <QSpinnerFacebook
        color="yellow"
        background-color="purple"
        size="140"
      />

      <div>
        Fetching streaks. Hang on...
      </div>
    </div>

    <div v-else-if="! streaks.length">
      <div class="text-h6">
        No streaks found
      </div>
    </div>

    <q-list
      class="flex flex-col gap-2"
      bordered
      separator
      v-else
    >
      <q-item
        v-for="streak in streaks"
        :key="streak.id"
        class="flex gap-2 justify-between q-px-none"
      >
        <div class="flex gap-2 items-center">
          <div class="offensive-container">
            <StreakOffensive
              v-if="streak.offensive"
              :offensive="streak.offensive"
            />
          </div>

          <span class="text-base">
            {{ streak.name }}
          </span>
        </div>

        <div class="action-container">
          <q-btn
            :to="`streaks/${streak.id}`"
            icon="visibility"
            outline
            text-color="orange-5"
          >
            <q-tooltip>
              See
            </q-tooltip>
          </q-btn>
        </div>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { QSpinnerFacebook} from 'quasar';

  import StreakOffensive from '@/design-system/StreakOffensive.vue';
  import { useStore } from '@/store';

  import { FETCH_STREAKS } from '@/store/types/actions';

  const store = useStore();

  store.dispatch(FETCH_STREAKS);

  const streaks = computed(() => store.state.streak.streaks);

  const request_pending = computed(() => {
    const { streak: streak_request_pending = {} } = store.state.requests_pending;

    return streak_request_pending.fetch_all;
  });
</script>

<style lang="scss" scoped>
  .streak-item {
    display: grid;
    grid-template-areas: "offensive name action";
    grid-template-columns: 60px 210px 40px;

    .offensive-container {
      grid-area: offensive;
      display: flex;
    }
    .name-container {
      grid-area: name;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action-container { grid-area: action; }
  }

  .streak-title {
    font-weight: 500;
    font-size: 18px;
  }

  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
