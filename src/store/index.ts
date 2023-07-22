import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import { Notification as NotificationInterface } from "@/interfaces/Notification.interface";

import {
  NEW_NOTIFICATION,
  DELETE_NOTIFICATION,
} from '@/store/types/mutations';

import { project, ProjectState } from './modules/projects';
import { task,TaskState } from './modules/tasks';

export interface State {
  notifications: NotificationInterface[],
  project: ProjectState,
  task: TaskState,
}

export const key : InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    project,
    task,
  },

  state: {
    notifications: [],
    task: { tasks: [] },
    project: { projects: [] },
  },

  mutations: {
    [NEW_NOTIFICATION]: (state, notification: NotificationInterface) => state.notifications.push({ ...notification, id: new Date().getTime()}),
    [DELETE_NOTIFICATION]: (state, notification_id: number) => state.notifications = state.notifications.filter(notification => notification.id !== notification_id),
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
