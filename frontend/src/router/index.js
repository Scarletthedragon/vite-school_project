import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import ProfileView from '../views/Profile.vue'
import GameCategoryView from '../views/GameCategory.vue'
import AboutView from '../views/About.vue'
import ContactView from '../views/Contact.vue'
import { user } from '../auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/games/:slug', name: 'game-category', component: GameCategoryView, meta: { requiresAuth: true } },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/missions', name: 'missions', component: AboutView, meta: { requiresAuth: true } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { requiresAuth: true } }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !user.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
