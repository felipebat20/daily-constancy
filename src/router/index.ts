import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Tasks from '../views/Tasks.vue';
import Projects from '../views/Projects.vue';
import ProjectsForm from '../views/Projects/Form.vue';
import ProjectsList from '../views/Projects/List.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
  },
  {
    component: Projects,
    path: '/projects',
    children: [
      {
        path: '',
        name: 'Projects',
        component: ProjectsList,
      },
      {
        path: 'create',
        name: 'NewProjects',
        component: ProjectsForm,
      },
      {
        path: ':id',
        name: 'EditProjects',
        component: ProjectsForm,
        props: true,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
