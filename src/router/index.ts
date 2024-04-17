import DashBoard from '@/pages/admin/DashBoard.vue'
import UserCreate from '@/pages/auth/UserCreate.vue'
import UserHome from '@/pages/auth/UserHome.vue'
import UserLogin from '@/pages/auth/UserLogin.vue'
import ForumHome from '@/pages/forum/ForumHome.vue'
import TestPage from '@/pages/forum/TestPage.vue'
import PostDetail from '@/pages/post/PostDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ForumHome
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin
    },
    {
      path: '/register',
      name: 'register',
      component: UserCreate
    },
    {
      path: '/detail',
      name: 'detail',
      component: PostDetail
    },
    {
      path: '/admin',
      name: 'admin',
      component: DashBoard
    },
    {
      path: '/test',
      name: 'test',
      component: UserHome
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
