import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Tasks from '../views/Tasks.vue';
import Projects from '../views/Projects.vue';
import ProjectsForm from '../views/Projects/Form.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/projects/create',
    name: 'NewProjects',
    component: ProjectsForm,
  },
  {
    path: '/projects/:id',
    name: 'EditProjects',
    component: ProjectsForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;