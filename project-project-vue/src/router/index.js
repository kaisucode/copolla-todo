import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index'
import Week from '../views/Week'
import Month from '../views/Month'
import Year from '../views/Year'
import Categories from '../views/Categories'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
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
    path: '/categories',
    name: 'Catagories',
    component: Categories
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
