import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import article from './modules/article'

Vue.use(Vuex)


const state = {}
const actions = {}
const mutations = {}

const store = new Vuex.Store({
  modules: {
    user,
    article
  },
  actions,
  state,
  mutations,
})


export default store;
