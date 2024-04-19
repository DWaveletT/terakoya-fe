import DashBoard from '@/pages/admin/DashBoard.vue'
import UserHome from '@/pages/auth/UserHome.vue'
import ForumHome from '@/pages/forum/ForumHome.vue'
import TestPage from '@/pages/forum/TestPage.vue'
import PostDetail from '@/pages/post/PostDetail.vue'
import PostList from '@/pages/post/PostList.vue'
import PostNew from '@/pages/post/PostNew.vue'

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
      component: DashBoard
    },
    {
      path: '/post',
      name: 'post.list',
      component: PostList
    },
    {
      path: '/post/new',
      name: 'post.new',
      component: PostNew
    },
    {
      path: '/post/:pid',
      name: 'post.detail',
      component: PostDetail
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
