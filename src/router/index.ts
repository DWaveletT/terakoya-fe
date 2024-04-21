import UserHome from '@/pages/auth/UserHome.vue'
import ForumHome from '@/pages/forum/ForumHome.vue'
import TestPage from '@/pages/forum/TestPage.vue'

import PageNotFound from '../pages/PageNotFound.vue'

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
      path: '/admin',
      name: 'admin',
      component:  () => import('../pages/admin/DashBoard.vue')
    },
    {
      path: '/post',
      name: 'post.list',
      component: () => import('../pages/post/PostList.vue')
    },
    {
      path: '/post/new',
      name: 'post.new',
      component: () => import('../pages/post/PostNew.vue')
    },
    {
      path: '/post/:pid',
      name: 'post.detail',
      component: () => import('../pages/post/PostDetail.vue')
    },
    {
      path: '/user',
      name: 'user.home',
      component: UserHome
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: PageNotFound
    }
  ]
})

export default router
