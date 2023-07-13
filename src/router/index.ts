import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Tasks from '../views/Tasks.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;