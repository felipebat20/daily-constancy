import { Module } from 'vuex';

import { State } from "@/store";

import StreakInterface from '@/interfaces/Streak.interface';

import {
  CREATE_STREAK,
  FETCH_STREAKS,
  DELETE_STREAK,
  EDIT_STREAK,
  FETCH_STREAK,
  FETCH_STREAK_FOCUS_SUMMARIES,
} from '@/store/types/actions';

import { db } from '@/hooks/database';
import {
  NEW_STREAK,
  NEW_STREAKS,
  UPDATE_STREAK,
  REMOVE_STREAK,
  NEW_ACTIVE_STREAK,
  NEW_FOCUS_SUMMARIES,
} from '@/store/types/streaks/mutations';

import { hasApi } from '@/hooks/verify_api';
import http from '@/http';
import FocusSummary from '@/interfaces/FocusSummary.interface';
import { NEW_REQUEST_PENDING } from '@/store/types/mutations';

export interface StreakState {
  streaks: StreakInterface[]
  streak: StreakInterface
  focus_summaries: FocusSummary[],
}

export const streak: Module<StreakState, State> = {
  state: {
    streaks: [],
    streak: {} as StreakInterface,
    focus_summaries: [],
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

    [NEW_ACTIVE_STREAK]: (state, streak: StreakInterface) => state.streak = streak,
    [NEW_FOCUS_SUMMARIES]: (state, focus_summaries: FocusSummary[]) => state.focus_summaries = focus_summaries,
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
        commit(NEW_REQUEST_PENDING, { topic: 'streak', key: 'fetch_all', value: true });
        const { data: streaks } = await http().get('/streaks');

        commit(NEW_REQUEST_PENDING, { topic: 'streak', key: 'fetch_all', value: false });
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

    [FETCH_STREAK]: async ({ commit }, streak_id: string) => {
      const { data: streak } = await http().get(`/streaks/${streak_id}`);

      return commit(NEW_ACTIVE_STREAK, streak);
    },

    [FETCH_STREAK_FOCUS_SUMMARIES]: async ({ commit }, streak_id: string) => {
      commit(NEW_REQUEST_PENDING, { topic: 'streak', key: 'focus_summaries', value: true });

      const { data: focus_summaries } = await http().get(`/streaks/${streak_id}/focus_summaries`);

      commit(NEW_FOCUS_SUMMARIES, focus_summaries);
      commit(NEW_REQUEST_PENDING, { topic: 'streak', key: 'focus_summaries', value: false });

      return focus_summaries;
    },
  },
};
