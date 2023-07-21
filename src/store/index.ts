import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import Project from "@/interfaces/Project.interface";
import { Notification as NotificationInterface } from "@/interfaces/Notification.interface";

import {
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  NEW_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_PROJECTS,
} from '@/store/types/mutations';

import { FETCH_PROJECTS } from '@/store/types/actions';

import http from '@/http';

interface State {
  projects: Project[],
  notifications: NotificationInterface[]
}

export const key : InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: [],
  },

  mutations: {
    [ADD_PROJECT]: (state, project_name: string) => state.projects.push({ id: new Date().toISOString(), name: project_name }),
    [EDIT_PROJECT]: (state, project_edited: Project) => state.projects = state.projects.map(proj => {
      if (proj.id === project_edited.id) {
        proj = project_edited;
      }

      return project_edited;
    }),
    [SET_PROJECTS]: (state, projects: Project[]) => state.projects = projects,

    [DELETE_PROJECT]: (state, project_id: string) => state.projects = state.projects.filter(project => project.id !== project_id),
    [NEW_NOTIFICATION]: (state, notification: NotificationInterface) => state.notifications.push({ ...notification, id: new Date().getTime()}),
    [DELETE_NOTIFICATION]: (state, notification_id: number) => state.notifications = state.notifications.filter(notification => notification.id !== notification_id),
  },

  actions: {
    [FETCH_PROJECTS]: ({ commit }) : Promise<void> => {
      return http.get('projects')
        .then(resp => commit(SET_PROJECTS, resp.data));
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
