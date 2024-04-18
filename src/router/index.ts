import DashBoard from '@/pages/admin/DashBoard.vue'
import UserHome from '@/pages/auth/UserHome.vue'
import ForumHome from '@/pages/forum/ForumHome.vue'
import TestPage from '@/pages/forum/TestPage.vue'
import PostDetail from '@/pages/post/PostDetail.vue'
import PostList from '@/pages/post/PostList.vue'

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
      component: DashBoard
    },
    {
      path: '/post/detail',
      name: 'post.detail',
      component: PostDetail
    },
    {
      path: '/post/list',
      name: 'post.list',
      component: PostList
    },
    {
      path: '/user/home',
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
      name: 'error',
      component: import('../pages/PageNotFound.vue')
    }
  ]
})

export default router
