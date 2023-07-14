import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';

import Project from "../interfaces/Project.interface";

interface State {
  projects: Project[],
}

export const key : InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [
      {
        id: new Date().toISOString(),
        name: 'Typescript é legal',
      },
    ],
  },
});