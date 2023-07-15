import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';

import Project from "../interfaces/Project.interface";

interface State {
  projects: Project[],
}

export const key : InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
  },

  mutations: {
    'ADD_PROJECT': (state, project_name: string) => state.projects.push({ id: new Date().toISOString(), name: project_name }),
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
