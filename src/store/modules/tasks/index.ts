import { Module } from "vuex"

import TaskInterface from "@/interfaces/Task.interface"
import { State } from "@/store"

import http from "@/http"

import { db } from '@/hooks/database';
import { hasApi } from '@/hooks/verify_api';

import {
  FETCH_TASKS,
  CREATE_NEW_TASK,
  UPDATE_TASK,
} from "@/store/types/actions"

import {
  NEW_TASKS,
  NEW_TASK,
  NEW_UPDATED_TASK,
} from "@/store/types/mutations"

export interface TaskState {
  tasks: TaskInterface[],
}

export const task: Module<TaskState, State> = {
  state: {
    tasks: []
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
  },

  actions: {
    [FETCH_TASKS]: ({ commit }, task_name: string) : Promise<void> => {
      if (hasApi()) {
        let query = 'tasks';

        if (task_name) {
          query += `?description_like=${task_name}`
        }

        return http.get(query)
          .then(resp => commit(NEW_TASKS, resp.data));
      }

      return db.collection('tasks')
        .get()
        .then((resp: TaskInterface[]) => {
          if (task_name) {
            return commit(NEW_TASKS, resp.filter(task => task.description.includes(task_name)));
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
  },
}
