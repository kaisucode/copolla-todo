import Vue from 'vue'
import VueRouter from 'vue-router'
import Week from '../views/Week'
import Month from '../views/Month'
import Year from '../views/Year'
import Help from '../views/Help'
import Categories from '../views/Categories'

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
    path: '/categories',
    name: 'Catagories',
    component: Categories
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
