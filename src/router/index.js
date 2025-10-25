import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../pages/LoginPage.vue'
import Tasks from '../pages/TasksPage.vue'
import Signup from '../pages/SignupPage.vue'
import ForgotPassword from '../pages/ForgotPasswordPage.vue'
import ResetPassword from '../pages/ResetPasswordPage.vue'
import AddUser from '../pages/AddUser.vue'
import VerifyToken from '../pages/VerifyToken.vue'

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/verify-reset-token', component: VerifyToken },
  { path: '/reset-password', component: ResetPassword },
  { path: '/tasks', component: Tasks, meta: { requiresAuth: true } },
  { path: '/add-user', component: AddUser, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const token = auth.token || localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }
})

export default router
