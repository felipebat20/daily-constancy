import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import Project from "@/interfaces/Project.interface";
import { Notification as NotificationInterface } from "@/interfaces/Notification.interface";

import {
  ADD_PROJECT,
  UPDATE_EDITED_PROJECT,
  REMOVE_PROJECT,
  NEW_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_PROJECTS,
} from '@/store/types/mutations';

import { 
  FETCH_PROJECTS,
  CREATE_NEW_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT, 
} from '@/store/types/actions';

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
    [ADD_PROJECT]: (state, project: Project) => state.projects.push(project),
    [UPDATE_EDITED_PROJECT]: (state, project_edited: Project) => state.projects = state.projects.map(proj => {
      if (proj.id === project_edited.id) {
        proj = project_edited;
      }

      return proj;
    }),
    [SET_PROJECTS]: (state, projects: Project[]) => state.projects = projects,

    [REMOVE_PROJECT]: (state, project_id: string) => state.projects = state.projects.filter(project => project.id !== project_id),
    [NEW_NOTIFICATION]: (state, notification: NotificationInterface) => state.notifications.push({ ...notification, id: new Date().getTime()}),
    [DELETE_NOTIFICATION]: (state, notification_id: number) => state.notifications = state.notifications.filter(notification => notification.id !== notification_id),
  },

  actions: {
    [FETCH_PROJECTS]: ({ commit }) : Promise<void> => {
      return http.get('projects')
        .then(resp => commit(SET_PROJECTS, resp.data));
    },

    [CREATE_NEW_PROJECT]: ({ commit }, project_name: string) => {
      const project = { name: project_name };
      
      return http.post('projects', project)
        .then(resp => commit(ADD_PROJECT, resp.data));
    },

    [EDIT_PROJECT]: ({ commit }, project: Project) => {
      return http.put(`projects/${project.id}`, project).then(resp => commit(UPDATE_EDITED_PROJECT, resp.data));
    },

    [DELETE_PROJECT]: ({ commit }, { id: project_id }) => {
      return http.delete(`projects/${project_id}`).then(() => commit(REMOVE_PROJECT, project_id));
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
