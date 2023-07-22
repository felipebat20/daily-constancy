import { Module } from "vuex"

import TaskInterface from "@/interfaces/Task.interface"
import { State } from "@/store"

import http from "@/http"

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
}
