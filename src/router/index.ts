import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Tasks from '../views/Tasks.vue';
import Reports from '../views/ATReports.vue';
import Projects from '../views/Projects.vue';
import ProjectsForm from '../views/Projects/Form.vue';
import ProjectsList from '../views/Projects/List.vue';
import Streaks from '@/views/Streaks/StreaksIndex.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
  {
    path: '/streaks',
    name: 'Streaks',
    component: Streaks,
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
