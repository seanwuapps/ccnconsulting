import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Jobs from '@/pages/Jobs.vue';
import JobDetails from '@/pages/JobDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/jobs', component: Jobs },
  { path: '/jobs/:slug', component: JobDetails },
  {
    path: '/rate-calculator',
    component: () => import('@/pages/RateCalculator.vue'),
  },
  {
    path: '/candidate-rate/:encodedParams',
    component: () => import('@/pages/CandidateRate.vue'),
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
export default router;
