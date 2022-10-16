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
    state.user.uid = user.uid
    state.user.chara = user.chara
    state.user.favList = user.favList
    console.log(state.user);
  },
  signOut( state ) {
    state.isLogin = false
    state.user = {}
    state.user.uid = ""
    state.user.chara = ""
    state.user.favList = ""
  },
  setFavList( state, payload ) {
    if ( payload.isFav ) {
      state.user.favList = state.user.favList.filter( doc =>  doc !== payload.id )
    } else {
      state.user.favList.push(payload.id)
    }  
  }
}

const actions = {
  auth ( context, user ) {
    context.commit('auth', user)
  },
  signOut( context ) {
    context.commit('signOut') 
  },
  setFavList( context, payload ) {
    context.commit('setFavList', payload)
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