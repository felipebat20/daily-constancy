import { Module } from 'vuex';

import { State } from "@/store";

import StreakInterface from '@/interfaces/Streak.interface';

import {
  CREATE_STREAK,
  FETCH_STREAKS,
  DELETE_STREAK,
  EDIT_STREAK,
} from '@/store/types/actions';

import { db } from '@/hooks/database';
import {
  NEW_STREAK,
  NEW_STREAKS,
  UPDATE_STREAK,
  REMOVE_STREAK,
} from '@/store/types/streaks/mutations';

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
    [REMOVE_STREAK]: (state, streak: StreakInterface) => state.streaks = state.streaks.filter((({ id }) => id !== streak.id)),
    [UPDATE_STREAK]: (state, updated_streak: StreakInterface) => state.streaks = state.streaks.map(streak => {
      if (streak.id === updated_streak.id) {
        return updated_streak;
      }

      return streak;
    }),
  },

  actions: {
    [CREATE_STREAK]: async ({ commit }, { name, projects }: { name: string, projects: string[] | undefined }) => {
      if (hasApi()) {
        const { data } = await http().post('/streaks', {
          name,
          projects,
        });

        return commit(NEW_STREAK, data);
      }

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

    [DELETE_STREAK]: async ({ commit }, streak: StreakInterface) => {
      await http().delete(`/streaks/${streak.id}`);

      return commit(REMOVE_STREAK, streak);
    },

    [EDIT_STREAK]: async ({ commit }, streak: StreakInterface) => {
      const { data: updated_streak } = await http().put(`/streaks/${streak.id}`, streak);

      return commit(UPDATE_STREAK, updated_streak);
    },
  },
};
