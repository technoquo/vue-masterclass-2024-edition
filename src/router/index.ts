import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to)=> {
  const { user } = storeToRefs(useAuthStore());

  if (!user.value && !['/login', '/register'].includes(to.path)) {
    return {
      name: '/login' 
    };
  }
});

export default router;
