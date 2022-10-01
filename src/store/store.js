import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
    count: 0,
    animals: [
        {
            id: 1,
            isCat: true,
            name: '猫吉',
            gender: 'オス',
            age: 1,
            place: '中部',
            chara: ['穏やか', '一人が好き', '慎重'],
            isFav: true,
            img: 'scottish',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        },
        {
            id: 2,
            isCat: true,
            name: 'サクラ',
            gender: "メス",
            age: 3,
            place: '関東',
            chara: ['活発', '好奇心旺盛', '甘えん坊'],
            isFav: false,
            img: 'munchkin',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        },
        {
            id: 3,
            isCat: false,
            name: 'コリー',
            gender: "オス",
            age: 3,
            place: '近畿',
            chara: ['活発', '好奇心旺盛', '甘えん坊'],
            isFav: true,
            img: 'inu',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        },
        {
            id: 4,
            isCat: false,
            name: 'タマ',
            gender: "メス",
            age: 3,
            place: '九州',
            chara: ['活発', '好奇心旺盛', '甘えん坊'],
            isFav: false,
            img: 'shiba',
            remarks: '大きくてまんまるの目や頭とふっくらとしたマズルが特徴。ずんぐりむっくりな体型も相まって非常にチャーミング!',
            isHere: true
        }
    ],
    rank: "",
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
    },
    // お気に入りを着け外しする
    saveRank( state, rank ) {
        state.rank = rank
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
})