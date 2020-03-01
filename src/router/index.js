import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import List from '../views/orderList';
import EditFamilyData from '../views/EditFamilyData'
import LoginPage from '../components/LoginPage'
import NavTab from '../components/NavTab'
import HistoryOrder from '../views/HistoryOrder'

Vue.use(VueRouter);

const routes = [
  {
    path: '/NavTab',
    component: NavTab,
    children: [
      {
        path: "/Home",
        name: "Home",
        component: Home
      },
      {
        path: '/List',
        name: 'List',
        component: List
      },
      {
        path: '/EditFamilyData',
        name: 'EditFamilyData',
        component: EditFamilyData
      },
      {
        path: '/HistoryOrder',
        name: 'HistoryOrder',
        component: HistoryOrder
      }    
    ]
  },
  {
    path: '/',
    redirect: {name: 'LoginPage'}
  },
  {
    path: "/Login",
    name: "LoginPage",
    component: LoginPage
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: Home
  // },
  // {
  //   path: '/List',
  //   name: 'List',
  //   component: List
  // },
  // {
  //   path: '/EditFamilyData',
  //   name: 'EditFamilyData',
  //   component: EditFamilyData
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
