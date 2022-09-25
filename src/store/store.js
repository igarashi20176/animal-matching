import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
    count: 0,
    animals: [
        {
            id: 1,
            isCat: true,
            name: 'スコティッシュフォールド',
            gender: 'オス',
            age: 1,
            week: 5,
            chara: ['穏やか', '一人が好き', '慎重'],
            isFav: true,
            img: 'scottish',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        },
        {
            id: 2,
            isCat: true,
            name: 'マンチカン',
            gender: "メス",
            age: 3,
            week: 2,
            chara: ['活発', '好奇心旺盛', '甘えん坊'],
            isFav: false,
            img: 'munchkin',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        },
        {
            id: 3,
            isCat: true,
            name: 'ハナ',
            gender: "メス",
            age: 3,
            week: 2,
            chara: ['活発', '好奇心旺盛', '甘えん坊'],
            isFav: true,
            img: 'munchkin',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        },
        {
            id: 4,
            isCat: true,
            name: 'タマ',
            gender: "メス",
            age: 3,
            week: 2,
            chara: ['活発', '好奇心旺盛', '甘えん坊'],
            isFav: false,
            img: 'munchkin',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        }
    ],
}
const getters = {
    getCount( state ) {
        return state.animals.length
    },
    getAll( state ) {
        return state.animals
    },
    getAnimalByFav( state ) {
        return state.animals.filter( animal => animal.isFav === true )
    },
    getAnimalById( state ) {
        return id => {
            return state.animals.find( animal => animal.id === id )
        }
    }
}

const mutations = {
    // メモを保存する
    saveAnimal ( state, id ) {

    },
    // お気に入りを着け外しする
    toggleFav( state, id ) {
        let b = state.animals.find( animal => animal.id === id )
        b.isFav = !b.isFav
    }
}
const actions = {
    toggleFav( { commit }, id ) {
        commit('toggleFav', id)
    }
}

export default createStore({
    state,
    getters,
    mutations,
    actions,
    plugins: [createPersistedState({
        key: 'animalchart',
        storage: localStorage
    })]
})