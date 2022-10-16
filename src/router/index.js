import { createRouter, createWebHistory } from 'vue-router'
import Chart from '../views/ChartList.vue'
import AnimalList from "../views/AnimalList.vue";
import Add from "../views/AnimalListAdd.vue";
import Store from "../store";

const routes = [
    {
        path: '/chart',
        name: 'chart',
        component: Chart,
    },
    {
        path: '/list',
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
            next({ name: "sign-in", params: { errMsg: "追加はログインが必要になります" } })
        } else {
            next()
        }
    } else {
        next()
    } 
})

export default router