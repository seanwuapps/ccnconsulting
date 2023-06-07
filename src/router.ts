import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/pages/Home.vue') },
  { path: '/jobs', component: () => import('@/pages/Jobs.vue') },
  { path: '/jobs/:slug', component: () => import('@/pages/JobDetails.vue') },
  {
    path: '/rate-calculator',
    component: () => import('@/pages/RateCalculator.vue'),
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
export default router;
