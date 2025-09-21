import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserList from '../views/users/UserList.vue'
import UserForm from '../views/users/UserForm.vue'
import PortfolioList from '../views/portfolios/PortfolioList.vue'
import PortfolioDetail from '../views/portfolios/PortfolioDetail.vue'
import PortfolioForm from '../views/portfolios/PortfolioForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/users/new',
    name: 'UserForm',
    component: UserForm
  },
  {
    path: '/users/:id/edit',
    name: 'UserEdit',
    component: UserForm,
    props: true
  },
  {
    path: '/portfolios',
    name: 'PortfolioList',
    component: PortfolioList
  },
  {
    path: '/portfolios/new',
    name: 'PortfolioForm',
    component: PortfolioForm
  },
  {
    path: '/portfolios/:id',
    name: 'PortfolioDetail',
    component: PortfolioDetail,
    props: true
  },
  {
    path: '/portfolios/:id/edit',
    name: 'PortfolioEdit',
    component: PortfolioForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


