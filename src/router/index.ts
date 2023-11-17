import { createRouter, createWebHashHistory } from 'vue-router';
import Money from '@/views/Money';
import Labels from '@/views/Labels';
import Statistics from '@/views/Statistics/Statistics';
import NotFound from '@/views';
import EditLabel from '@/views/EditLabel';

const routes = [
  {
    path: '/',
    redirect: '/money',
  },
  {
    path: '/money',
    component: Money,
  },
  {
    path: '/labels',
    component: Labels,
  },
  {
    path: '/statistics',
    component: Statistics,
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/notFound',
  },
  {
    path: '/notFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
