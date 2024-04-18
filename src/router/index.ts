import DashBoard from '@/pages/admin/DashBoard.vue'
// import UserCreate from '@/components/user/UserCreate.vue'
// import UserHome from '@/pages/auth/UserHome.vue'
// import UserLogin from '@/components/user/UserLogin.vue'
import ForumHome from '@/pages/forum/ForumHome.vue'
// import TestPage from '@/pages/forum/TestPage.vue'
import PostDetail from '@/pages/post/PostDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import PageNotFound from '@/pages/PageNotFound.vue'
import PostList from '@/pages/post/PostList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ForumHome
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
      component: PostList
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: import('../pages/PageNotFound.vue')
    }
  ]
})

export default router
