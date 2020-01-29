import Vue from "vue";
import Vuex from "vuex";

//import modules
import test from './modules/test'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    test
  }
  // state: {},
  // mutations: {},
  // actions: {},
  // modules: {}
});
