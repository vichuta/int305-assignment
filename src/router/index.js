import { createRouter, createWebHistory } from 'vue-router'
import QueryView from '../views/QueryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/query/:id',
      name: 'query',
      component: QueryView
    }
  ]
})

export default router
