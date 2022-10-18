import { createRouter, createWebHistory } from 'vue-router'
import Matching from '../views/AnimalMatching.vue'
import AnimalList from "../views/AnimalList.vue";
import Add from "../views/AnimalListAdd.vue";
import Store from "../store";

const routes = [
    {
        path: '/matching',
        name: 'matching',
        component: Matching,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/list:chara?',
        name: 'list',
        component: AnimalList
    },
    {
        path: '/add:id?',
        name: 'add',
        component: Add,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: "register",
        component: () => import("../views/Register.vue")
    },
    {
        path: '/sign-in:errMsg?',
        name: "sign-in",
        component: () => import("../views/SignIn.vue")
    },
    {
        path: '/*',
        redirect: '/list'
    }
]

const router = createRouter({
    history: createWebHistory(),
    // routes: routesの省略↓
    routes
})

router.beforeEach((to, from, next) => {
    if ( to.matched.some(record => record.meta.requiresAuth) ) {
        if( !Store.state.isLogin ) {
            next({ name: "sign-in", params: { errMsg: "この機能はログインが必要になります" } })
        } else {
            next()
        }
    } else {
        next()
    } 
})

export default router