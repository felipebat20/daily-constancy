import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import { Notification as NotificationInterface } from "@/interfaces/Notification.interface";

import {
  NEW_NOTIFICATION,
  DELETE_NOTIFICATION,
  NEW_TASKS,
  NEW_TASK,
  NEW_UPDATED_TASK,
} from '@/store/types/mutations';

import {
  FETCH_TASKS,
  CREATE_NEW_TASK,
  UPDATE_TASK,
} from '@/store/types/actions';

import http from '@/http';
import TaskInterface from '@/interfaces/Task.interface';
import { ProjectState, project } from './modules/projects';

export interface State {
  notifications: NotificationInterface[],
  tasks: TaskInterface[],
  project: ProjectState,
}

export const key : InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    project,
  },

  state: {
    notifications: [],
    tasks: [],
    project: {
      projects: [],
    },
  },

  mutations: {
    [NEW_NOTIFICATION]: (state, notification: NotificationInterface) => state.notifications.push({ ...notification, id: new Date().getTime()}),
    [DELETE_NOTIFICATION]: (state, notification_id: number) => state.notifications = state.notifications.filter(notification => notification.id !== notification_id),

    [NEW_TASKS]: (state, tasks: TaskInterface[]) => state.tasks = tasks,
    [NEW_TASK]: (state, task: TaskInterface) => state.tasks.push(task),
    [NEW_UPDATED_TASK]: (state, updated_task: TaskInterface) => state.tasks = state.tasks.map(task => {
      if (task.id === updated_task.id) {
        task = updated_task;
      }

      return task;
    }),
  },

  actions: {
    [FETCH_TASKS]: ({ commit }) : Promise<void> => {
      return http.get('tasks')
        .then(resp => commit(NEW_TASKS, resp.data));
    },

    [CREATE_NEW_TASK]: ({ commit }, task: TaskInterface) : Promise<void> => {
      return http.post('tasks', task)
        .then(resp => commit(NEW_TASK, resp.data));
    },

    [UPDATE_TASK]: ({ commit }, task: TaskInterface) => {
      return http.put(`tasks/${task.id}`, task)
        .then(resp => commit(NEW_UPDATED_TASK, resp.data));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
