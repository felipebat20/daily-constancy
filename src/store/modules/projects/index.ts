import { Module } from "vuex";

import Project from "@/interfaces/Project.interface";
import { State } from "@/store";

import {
  ADD_PROJECT,
  REMOVE_PROJECT,
  SET_PROJECTS,
  UPDATE_EDITED_PROJECT,
} from "@/store/types/mutations";

import {
  CREATE_NEW_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  FETCH_PROJECTS,
} from "@/store/types/actions";

import http from "@/http";
import { db } from '@/hooks/database';
import { hasApi } from '@/hooks/verify_api';

export interface ProjectState {
  projects: Project[],
}

export const project: Module<ProjectState, State> = {
  state: {
    projects: [],
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
    [REMOVE_PROJECT]: (state, project_id: number) => state.projects = state.projects.filter(project => project.id !== project_id),
  },

  actions: {
    [FETCH_PROJECTS]: ({ commit }) : Promise<void> => {
      if (hasApi()) {
        return http().get('projects')
          .then(resp => commit(SET_PROJECTS, resp.data));
      }

      return db.collection('projects')
        .get()
        .then((resp: Project[]) => commit(SET_PROJECTS, resp));
    },

    [CREATE_NEW_PROJECT]: ({ commit }, project_name: string) => {
      const project = { name: project_name };

      if (hasApi()) {
        return http().post('projects', project)
          .then(resp => commit(ADD_PROJECT, resp.data));
      }

      const new_project = { ...project, id: new Date().getTime() };

      return db.collection('projects')
        .add(new_project)
        .then(() => commit(ADD_PROJECT, new_project));
    },

    [EDIT_PROJECT]: ({ commit }, project: Project) => {
      if (hasApi()) {
        return http().put(`projects/${project.id}`, project)
          .then(resp => commit(UPDATE_EDITED_PROJECT, resp.data));
      }

      return db.collection('projects')
        .doc({ id: project.id })
        .update(project)
        .then(() => commit(UPDATE_EDITED_PROJECT, project));
    },

    [DELETE_PROJECT]: ({ commit }, { id: project_id }) => {
      if (hasApi()) {
        return http().delete(`projects/${project_id}`)
          .then(() => commit(REMOVE_PROJECT, project_id));
      }

      return db.collection('projects')
        .doc({ id: project_id })
        .delete()
        .then(() => commit(REMOVE_PROJECT, project_id));
    },
  },
};
