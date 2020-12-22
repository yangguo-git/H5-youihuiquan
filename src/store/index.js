import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:'',
    isBoolean:false
  },
  mutations: {
    saveUserInfo(state,payLoad){
       state.userInfo = payLoad
    }
  },
  actions: {
  },
  modules: {
  }
})
