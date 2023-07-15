import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import Project from "../interfaces/Project.interface";

import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT } from '@/store/types/mutations';

interface State {
  projects: Project[],
}

export const key : InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
  },

  mutations: {
    [ADD_PROJECT]: (state, project_name: string) => state.projects.push({ id: new Date().toISOString(), name: project_name }),
    [EDIT_PROJECT]: (state, project_edited: Project) => state.projects = state.projects.map(proj => {
      if (proj.id === project_edited.id) {
        proj = project_edited;
      }

      return project_edited;
    }),

    [DELETE_PROJECT]: (state, project_id: string) => state.projects = state.projects.filter(project => project.id !== project_id),
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
