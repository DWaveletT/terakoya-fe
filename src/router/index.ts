import UserHome from '@/pages/auth/UserHome.vue'
import ForumHome from '@/pages/forum/ForumHome.vue'
import TestPage from '@/pages/forum/TestPage.vue'

import PageNotFound from '../pages/PageNotFound.vue'
import PageForbid from '../pages/PageForbid.vue';
import PageLogin  from  '../pages/PageLogin.vue';

import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

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
      component:  () => import('../pages/admin/DashBoard.vue'),
      beforeEnter: (to, from, next) => {
        const auth = useAuth();

        if(auth.currentUser.role !== 2){
          next({ name: 'forbid' });
        } else {
          next();
        }
      }
    },
    {
      path: '/user',
      name: 'user.home',
      component:  () => import('../pages/auth/UserHome.vue'),
      
      beforeEnter: (to, from, next) => {
        const auth = useAuth();

        if(auth.getLogin() !== true){
          next({ name: 'login' });
        } else {
          next();
        }
      }
    },
    {
      path: '/post',
      name: 'post.list',
      component: () => import('../pages/post/PostList.vue'),
      
      beforeEnter: (to, from, next) => {
        const auth = useAuth();

        if(auth.getLogin() !== true){
          next({ name: 'login' });
        } else {
          next();
        }
      }
    },
    {
      path: '/post/new',
      name: 'post.new',
      component: () => import('../pages/post/PostNew.vue'),
      
      beforeEnter: (to, from, next) => {
        const auth = useAuth();

        if(auth.getLogin() !== true){
          next({ name: 'login' });
        } else {
          next();
        }
      }
    },
    {
      path: '/post/:pid',
      name: 'post.detail',
      component: () => import('../pages/post/PostDetail.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: PageLogin
    },
    {
      path: '/forbid',
      name: 'forbid',
      component: PageForbid
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: PageNotFound
    }
  ]
})

export default router
