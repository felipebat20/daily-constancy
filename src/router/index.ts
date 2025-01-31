import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import loadLayoutMiddleware from './middleware/loadLayoutMiddleware';

import Tasks from '../views/Tasks.vue';
import Reports from '../views/ATReports.vue';
import Projects from '../views/Projects.vue';
import ProjectsList from '../views/Projects/ProjectsList.vue';
import Streaks from '@/views/Streaks/DCStreaks.vue';
import StreaksList from '@/components/streaks/index/StreaksIndex.vue';
import StreakShow from '@/views/Streaks/show/DCStreak.vue';
import DCLogin from '@/views/Auth/DCLogin.vue';
import DCRegister from '@/views/Auth/DCRegister.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tasks',
    component: Tasks,
    meta: { layout: 'DCDefault' }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { layout: 'DCDefault' }
  },
  {
    path: '/streaks',
    name: 'Streaks',
    component: Streaks,
    meta: { layout: 'DCDefault' },
    children: [
      {
        path: '',
        component: StreaksList,
      },
      {
        path: ':streak_id',
        component: StreakShow
      }
    ]
  },
  {
    component: Projects,
    path: '/projects',
    meta: { layout: 'DCDefault' },
    children: [
      {
        path: '',
        name: 'Projects',
        component: ProjectsList,
      }
    ]
  },

  {
    component: DCLogin,
    name: 'login',
    path: '/login',
    meta: {
      layout: 'DCAuthLayout',
    }
  },
  {
    component: DCRegister,
    name: 'register',
    path: '/register',
    meta: {
      layout: 'DCAuthLayout',
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(loadLayoutMiddleware);

export default router;
