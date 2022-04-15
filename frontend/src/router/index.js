import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '../components/layout/layout'
import Login from '../views/login.vue'
const routes = [{
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    name: 'home',
    component: HomeView,
  }]
}, 
{
  path:'/login',
  component:Login
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router