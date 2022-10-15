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
<<<<<<< HEAD
    state.user.uid = user.id
=======
    state.user.uid = user.uid
>>>>>>> addFirebase
    state.user.chara = user.chara
    state.user.favList = user.favList
  },
  signOut( state ) {
    state.isLogin = false
    state.user = {}
<<<<<<< HEAD
=======
  },
  setFavList( state, payload ) {
    if ( payload.isFav ) {
      state.user.favList = state.user.favList.filter( doc =>  doc !== payload.id )
    } else {
      state.user.favList.push(payload.id)
    }  
>>>>>>> addFirebase
  }
}

const actions = {
  auth ( context, user ) {
    context.commit('auth', user)
  },
  signOut( context ) {
    context.commit('signOut') 
<<<<<<< HEAD
=======
  },
  setFavList( context, payload ) {
    context.commit('setFavList', payload)
>>>>>>> addFirebase
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