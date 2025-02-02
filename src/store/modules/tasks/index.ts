import { Module } from "vuex";

import TaskInterface from "@/interfaces/Task.interface";
import SessionInterface from "@/interfaces/FocusedSession.interface";
import { State } from "@/store";

import http from "@/http";

import { db } from '@/hooks/database';
import { hasApi } from '@/hooks/verify_api';

import {
  FETCH_TASKS,
  CREATE_NEW_TASK,
  UPDATE_TASK,
  SET_TASK,
  DELETE_TASK,
  SET_ACTIVE_TASK,
  FINISH_TASK_SESSION,
  CREATE_TASK_SESSION,
} from "@/store/types/actions";

import {
  NEW_TASKS,
  NEW_TASK,
  NEW_UPDATED_TASK,
  REMOVE_TASK,
  NEW_ACTIVE_TASK,
  NEW_REQUEST_PENDING,
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

  getters: { getActiveTask: (state) => state.active_task },

  mutations: {
    [NEW_TASKS]: (state, tasks: TaskInterface[]) => state.tasks = tasks,
    [NEW_TASK]: (state, task: TaskInterface) => state.tasks.push(task),
    [NEW_UPDATED_TASK]: (state, updated_task: TaskInterface) => {
      if (state.tasks.find(task => task.id === updated_task.id)) {
        return state.tasks = state.tasks.map(task => {
          if (task.id === updated_task.id) {
            task = updated_task;
          }

          return task;
        });
      }

      return state.tasks = [...state.tasks, updated_task];
    },

    [REMOVE_TASK]: (state, deleted_task: TaskInterface) => state.tasks = state.tasks.filter(task => task.id !== deleted_task.id),
    [NEW_ACTIVE_TASK]: (state, task: TaskInterface) => state.active_task = task,
  },

  actions: {
    [SET_TASK]: ({ commit }, task: TaskInterface) => commit(NEW_TASK, task),
    [FETCH_TASKS]: async ({ commit }, task_name: string) : Promise<void> => {
      if (hasApi()) {
        commit(NEW_REQUEST_PENDING, { topic: 'tasks', key: 'fetch_user_tasks', value: true });

        const url_params = new URLSearchParams();

        if (task_name) {
          url_params.append('description', task_name);
        }

        const response = await http().get('/tasks', { params: url_params });

        commit(NEW_REQUEST_PENDING, { topic: 'tasks', key: 'fetch_user_tasks', value: false });

        return commit(NEW_TASKS, response.data);
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

    [CREATE_NEW_TASK]: async ({ commit }, task: TaskInterface) => {
      if (hasApi()) {
        const task_parsed = {
          description: task.description,
        };

        const session = { time_spent: task.time_spent };

        if (task.project) {
          Object.assign(task_parsed, { project_id: task.project.id });
          Object.assign(session, { project_id: task.project.id });
        }

        const { data: new_task }: { data: TaskInterface} = await http().post('tasks', task_parsed);

        return commit(NEW_ACTIVE_TASK, { ...new_task });
      }

      return db.collection('tasks')
        .add({ ...task, project: { ...task.project } })
        .then(() => commit(NEW_TASK, task));
    },

    [FINISH_TASK_SESSION]: async ({ commit }, task: TaskInterface) => {
      if (hasApi()) {
        const active_session = (task.sessions || []).find((session: SessionInterface) => ! session.endAt);
        if (active_session?.id) {
          const { data } = await http().patch(`tasks/${task.id}/stopwatch`, { endAt: new Date().toJSON() });

          commit(NEW_UPDATED_TASK, data);
        }
      }
    },

    [CREATE_TASK_SESSION]: async ({ commit }, task: TaskInterface) => {
      if (hasApi()) {
        const startAt = new Date();

        const { data } = await http().post(`tasks/${task.id}/inProgress`, { startAt: startAt.toJSON() });

        commit(NEW_UPDATED_TASK, data);

        return data;
      }
    },

    [UPDATE_TASK]: async ({ commit }, task: TaskInterface) => {
      if (hasApi()) {
        return http().put(`tasks/${task.id}`, { description: task.description, project_id: task.project?.id || null })
          .then(resp => commit(NEW_UPDATED_TASK, resp.data));
      }

      return db.collection('tasks')
        .doc({ id: task.id })
        .update({ ...task, project: { ...task.project } })
        .then(() => commit(NEW_UPDATED_TASK, task));
    },

    [DELETE_TASK]: async ({ commit }, task: TaskInterface) => {
      if (hasApi()) {
        await http().delete(`tasks/${task.id}`);

        return commit(REMOVE_TASK, task);
      }

      return db.collection('tasks')
        .doc({ id: task.id })
        .delete()
        .then(() => commit(REMOVE_TASK, task));
    },

    [SET_ACTIVE_TASK]: ({ commit }, task: TaskInterface) => commit(NEW_ACTIVE_TASK, task),
  },
};
