import Vue from 'vue'
import VueRouter from 'vue-router'

import Week from '../views/Week'
import Month from '../views/Month'
import Year from '../views/Year'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Week',
    component: Week
  },
  {
    path: '/week',
    name: 'Week',
    component: Week
  },
  {
    path: '/month',
    name: 'Month',
    component: Month
  },
  {
    path: '/year',
    name: 'Year',
    component: Year
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
