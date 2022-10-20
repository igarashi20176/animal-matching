import { createStore } from 'vuex'

const state = {
  isLogin: false,
  user: {
    uid: "",
    name: "",
    chara:"",
    favList: ""
  }
}

const mutations = {
  auth( state, user ) {
    state.isLogin = true
    state.user.uid = user.uid,
    state.user.name = user.name
    state.user.chara = user.chara
    state.user.favList = user.favList
  },
  signOut( state ) {
    state.isLogin = false
    state.user.uid = ""
    state.user.name = ""
    state.user.chara = ""
    state.user.favList = ""
  },
  setFavList( state, payload ) {
    if ( payload.isFav ) {
      // trueの時, お気に入りリストから外す
      state.user.favList = state.user.favList.filter( doc =>  doc !== payload.id )
    } else {
      // falseのとき, お気に入りリストに登録
      state.user.favList.push(payload.id)
    }  
  },
  setChara( state, chara ) {
    state.user.chara = chara
  },
  resetChara( state ) {
    state.user.chara = ""
  }
}

const actions = {
}

export default createStore({
  state,
  mutations,
  actions,
})
