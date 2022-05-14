import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Layout from "../components/layout/layout";
import Login from "../views/login.vue";
import CommentDetail from "../views/commentDetail.vue";
import Feature from '../views/feature.vue'
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/detail",
        component: CommentDetail,
      },
      {
        path:'/feature',
        component:Feature
      }
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  base:"assignment2",
  history: createWebHashHistory(),
  routes,
});

export default router;
