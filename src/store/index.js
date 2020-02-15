import Vue from "vue";
import Vuex from "vuex";

//import modules
import orderList from './modules/orderList'
import searchData from './modules/searchData'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    orderList,
    searchData,
  }
  // state: {},
  // mutations: {},
  // actions: {},
  // modules: {}
});
