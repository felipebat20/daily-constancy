import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import { Notification as NotificationInterface } from "@/interfaces/Notification.interface";

import {
  NEW_NOTIFICATION,
  DELETE_NOTIFICATION,
} from '@/store/types/mutations';

import { VERIFY_API } from '@/store/types/actions';

import { project, ProjectState } from './modules/projects';
import { task, TaskState } from './modules/tasks';
import { StreakState } from './modules/streaks';

import httpClient from '@/http';
import TaskInterface from '@/interfaces/Task.interface';

export interface State {
  notifications: NotificationInterface[],
  project: ProjectState,
  task: TaskState,
  streak: StreakState,
}

export const key : InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    project,
    task,
  },

  state: {
    notifications: [],
    task: { tasks: [], active_task: {} as TaskInterface },
    project: { projects: [] },
    streak: { streaks: [] },
  },

  mutations: {
    [NEW_NOTIFICATION]: (state, notification: NotificationInterface) => state.notifications.push({ ...notification, id: new Date().getTime()}),
    [DELETE_NOTIFICATION]: (state, notification_id: number) => state.notifications = state.notifications.filter(notification => notification.id !== notification_id),
  },

  actions: {
    [VERIFY_API]: () => {
      httpClient.get('tasks')
        .then(() => {
          sessionStorage.setItem('AVAILABLE_API', '1');
        })
        .catch(() => {
          sessionStorage.setItem('AVAILABLE_API', '0');
        });
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
