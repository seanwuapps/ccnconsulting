import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import RateCalculator from "./RateCalculator.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/rate-calculator", component: RateCalculator },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
export default router;
