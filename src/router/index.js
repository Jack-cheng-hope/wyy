import { createRouter, createWebHistory } from 'vue-router'
// import MusicDetails from '../views/MusicDetails.vue'

import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/musicdetails',
    name: 'musicDetails',
    component: () => import('../views/MusicDetails.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    // 组件内路由守卫，判断是否登录
    beforeEnter: (to, from, next) => {
      // ...
      if (store.state.isLogin || localStorage.getItem('token') || store.state.token) {
        next()
      } else {
        // 没有登陆
        next('/login')
      }
    },
    component: () => import('@/views/userInfo.vue'),
  },
  {
    path: '/recommedplaylist',
    name: 'recommedplaylist',
    component: () => import('@/components/Recommended/RecomdPlayList.vue'),
  },
  {
    path: '/collectionlist',
    name: 'collectionlist',
    component: () => import('@/components/PubilcPlayList/collectionList.vue'),
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/components/video/video.vue')
  }

]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/video') {
    // 隐藏歌曲播放器
    store.state.isShowFooterBar = false
    store.state.isNavShow = false
    next()
  } else {
    store.state.isShowFooterBar = true
    next()
  }
})
export default router
