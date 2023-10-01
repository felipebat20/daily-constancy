import { Module } from "vuex";

import TaskInterface from "@/interfaces/Task.interface";
import { State } from "@/store";

import http from "@/http";

import { db } from '@/hooks/database';
import { hasApi } from '@/hooks/verify_api';

import {
  FETCH_TASKS,
  CREATE_NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_ACTIVE_TASK,
} from "@/store/types/actions";

import {
  NEW_TASKS,
  NEW_TASK,
  NEW_UPDATED_TASK,
  REMOVE_TASK,
  NEW_ACTIVE_TASK,
} from "@/store/types/mutations";

export interface TaskState {
  tasks: TaskInterface[],
  active_task: TaskInterface,
}

export const task: Module<TaskState, State> = {
  state: {
    tasks: [],
    active_task: {} as TaskInterface,
  },

  mutations: {
    [NEW_TASKS]: (state, tasks: TaskInterface[]) => state.tasks = tasks,
    [NEW_TASK]: (state, task: TaskInterface) => state.tasks.push(task),
    [NEW_UPDATED_TASK]: (state, updated_task: TaskInterface) => state.tasks = state.tasks.map(task => {
      if (task.id === updated_task.id) {
        task = updated_task;
      }

      return task;
    }),
    [REMOVE_TASK]: (state, deleted_task: TaskInterface) => state.tasks = state.tasks.filter(task => task.id !== deleted_task.id),
    [NEW_ACTIVE_TASK]: (state, task: TaskInterface) => state.active_task = task,
  },

  actions: {
    [FETCH_TASKS]: ({ commit }, task_name: string) : Promise<void> => {
      if (hasApi()) {
        let query = 'tasks';

        if (task_name) {
          query += `?description_like=${task_name}`;
        }

        return http.get(query)
          .then(resp => commit(NEW_TASKS, resp.data));
      }

      return db.collection('tasks')
        .get()
        .then((resp: TaskInterface[]) => {
          if (task_name) {
            return commit(NEW_TASKS, resp.filter(task => task.description.toLocaleLowerCase().includes(task_name.toLowerCase())));
          }

          return commit(NEW_TASKS, resp);
        });
    },

    [CREATE_NEW_TASK]: ({ commit }, task: TaskInterface) : Promise<void> => {
      if (hasApi()) {
        return http.post('tasks', task)
          .then(resp => commit(NEW_TASK, resp.data));
      }

      return db.collection('tasks')
        .add({ ...task, project: { ...task.project } })
        .then(() => commit(NEW_TASK, task));
    },

    [UPDATE_TASK]: ({ commit }, task: TaskInterface) => {
      if (hasApi()) {
        return http.put(`tasks/${task.id}`, task)
          .then(resp => commit(NEW_UPDATED_TASK, resp.data));
      }

      return db.collection('tasks')
        .doc({ id: task.id })
        .update({ ...task, project: { ...task.project } })
        .then(() => commit(NEW_UPDATED_TASK, task));
    },

    [DELETE_TASK]: ({ commit }, task: TaskInterface) => {
      if (hasApi()) {
        return http.delete(`tasks/${task.id}`)
          .then(resp => commit(REMOVE_TASK, resp.data));
      }

      return db.collection('tasks')
        .doc({ id: task.id })
        .delete()
        .then(() => commit(REMOVE_TASK, task));
    },

    [SET_ACTIVE_TASK]: ({ commit }, task: TaskInterface) => commit(NEW_ACTIVE_TASK, task),
  },
};
