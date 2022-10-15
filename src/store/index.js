import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const state = {
  isLogin: false,
  user: {
    uid: "",
    chara:"",
    favList: ""
  }
}

const mutations = {
  auth( state, user ) {
    state.isLogin = true
    state.user.uid = user.id
    state.user.chara = user.chara
    state.user.favList = user.favList
  },
  signOut( state ) {
    state.isLogin = false
    state.user = {}
  }
}

const actions = {
  auth ( context, user ) {
    context.commit('auth', user)
  },
  signOut( context ) {
    context.commit('signOut') 
  }
}

export default createStore({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({
      key: 'animal-matching',
      storage: localStorage
  })]
})