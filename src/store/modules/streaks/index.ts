import { Module } from 'vuex';

import { State } from "@/store"

import StreakInterface from '@/interfaces/Streak.interface';

export interface StreakState {
  streaks: StreakInterface[]
}

export const Streak: Module<StreakState, State> = {
  state: {
    streaks: [],
  },

  actions: {

  },
};
