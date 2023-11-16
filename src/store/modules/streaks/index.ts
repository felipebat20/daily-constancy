import { Module } from 'vuex';

import { State } from "@/store";

import StreakInterface from '@/interfaces/Streak.interface';

import { CREATE_STREAK, FETCH_STREAKS } from '@/store/types/actions';
import { db } from '@/hooks/database';
import { NEW_STREAK, NEW_STREAKS } from '@/store/types/streaks/mutations';
import { hasApi } from '@/hooks/verify_api';
import http from '@/http';

export interface StreakState {
  streaks: StreakInterface[]
}

export const streak: Module<StreakState, State> = {
  state: {
    streaks: [],
  },

  mutations: {
    [NEW_STREAK]: (state, streak: StreakInterface) => state.streaks.push(streak),
    [NEW_STREAKS]: (state, streaks: StreakInterface[]) => state.streaks = streaks,
  },

  actions: {
    [CREATE_STREAK]: ({ commit }, streak: StreakInterface) => {
      db.collection('streaks')
        .add({ ...streak })
        .then(() => commit(NEW_STREAK, streak));
    },

    [FETCH_STREAKS]: async ({ commit }) => {
      if (hasApi()) {
        const { data: streaks } = await http().get('/streaks');

        return commit(NEW_STREAKS, streaks);
      }

      db.collection('streaks')
        .get()
        .then((resp: StreakInterface[]) => commit(NEW_STREAKS, resp));
    },
  },
};
