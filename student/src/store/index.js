import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
Vue.use(Vuex)


const state = {}
const actions = {}
const mutations = {}

const store = new Vuex.Store({
  modules: {
    user
  },
  actions,
  state,
  mutations,
})


export default store;
