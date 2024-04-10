import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import MapAuto from '../components/MapAuto.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/about',
      name: 'about',
      component: MapAuto
    }
  ]
})

export default router
