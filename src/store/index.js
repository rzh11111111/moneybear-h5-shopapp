// import Vue from 'vue'
// import Vuex from 'vuex'

import user from './modules/user'
import record from './modules/record'
import getters from './getters'
// Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    user,
    record
  },
  getters
})

export default store
