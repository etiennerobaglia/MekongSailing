import { createRouter, createWebHashHistory } from 'vue-router'
import MapScroll from '../views/MapScrollView.vue'
import TwoMapsScroll from '../views/TwoMapsScrollView.vue'
import Auto from '../views/AutoView.vue'
import SplashScreen from '../views/SplashScreen.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splashscreen',
      component: SplashScreen
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: MapScroll
    },
    {
      path: '/two-maps-scroll',
      name: 'two-maps-scroll', 
      component: TwoMapsScroll
    },
    {
      path: '/auto',
      name: 'auto',
      component: Auto
    }
  ]
})

export default router
