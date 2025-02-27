import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import { Notification as NotificationInterface } from "@/interfaces/Notification.interface";
import { RequestsManager } from '@/interfaces/RequestsManager';

import {
  NEW_NOTIFICATION,
  DELETE_NOTIFICATION,
  NEW_REQUEST_PENDING,
} from '@/store/types/mutations';

import { VERIFY_API } from '@/store/types/actions';

import { project, ProjectState } from './modules/projects';
import { task, TaskState } from './modules/tasks';
import { streak, StreakState } from './modules/streaks';

import httpClient from '@/http';
import TaskInterface from '@/interfaces/Task.interface';
import StreakInterface from '@/interfaces/Streak.interface';

export interface State {
  notifications: NotificationInterface[],
  project: ProjectState,
  task: TaskState,
  streak: StreakState,
  requests_pending: RequestsManager,
}

export const key : InjectionKey<Store<State>> = Symbol();

interface RequestPending {
  topic: string,
  key: string,
  value: boolean,
}

export const store = createStore<State>({
  modules: {
    project,
    task,
    streak,
  },

  state: {
    notifications: [],
    task: { tasks: [], active_task: {} as TaskInterface },
    project: { projects: [] },
    streak: {
      streaks: [],
      streak: {} as StreakInterface,
      focus_summaries: [],
    },

    requests_pending: {
      tasks: { fetch_user_tasks: false },
      streak: { fetch_all: false },
    },
  },

  mutations: {
    [NEW_NOTIFICATION]: (state, notification: NotificationInterface) => state.notifications.push({ ...notification, id: new Date().getTime()}),
    [DELETE_NOTIFICATION]: (state, notification_id: number) => state.notifications = state.notifications.filter(notification => notification.id !== notification_id),
    [NEW_REQUEST_PENDING]: (state, { topic, key, value }: RequestPending) => state.requests_pending[topic][key] = value,
  },

  actions: {
    [VERIFY_API]: () => {
      httpClient().get('tasks')
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
