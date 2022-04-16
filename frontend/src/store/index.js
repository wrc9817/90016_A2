import { createStore } from 'vuex'

export default createStore({
  state: {
    userName:null,
    userId:null
  },
  getters: {
  },
  mutations: {
    handleLogin(state,payload){
      state.userName = payload.userName
      state.userId = payload.userId
    }
  },
  actions: {
  },
  modules: {
  }
})
