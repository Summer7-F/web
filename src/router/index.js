import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () { return import('../views/HomeView.vue') },
    meta: { title: '一城烟火，千年蜀韵' }
  },
  {
    path: '/heritage',
    name: 'heritage',
    component: function () { return import('../views/HeritageView.vue') },
    meta: { title: '古蜀文脉 · 千年回响' }
  },
  {
    path: '/explore',
    name: 'explore',
    component: function () { return import('../views/ExploreView.vue') },
    meta: { title: '锦城漫游 · 城市之间' }
  },
  {
    path: '/food',
    name: 'food',
    component: function () { return import('../views/FoodView.vue') },
    meta: { title: '川味人间 · 百味成都' }
  },
  {
    path: '/nature',
    name: 'nature',
    component: function () { return import('../views/NatureView.vue') },
    meta: { title: '熊猫与自然 · 生态成都' }
  },
  {
    path: '/travel',
    name: 'travel',
    component: function () { return import('../views/TravelView.vue') },
    meta: { title: '游蜀指南 · 行走成都' }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: function () { return import('../views/GalleryView.vue') },
    meta: { title: '蜀城光影 · 镜头里的成都' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path === from.path) return false
    if (to.hash) return { el: to.hash, top: 100, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.afterEach(function (to) {
  const title = to.meta.title ? '蜀运 SHU YUN · ' + to.meta.title : '蜀运 SHU YUN'
  document.title = title
})

export default router
