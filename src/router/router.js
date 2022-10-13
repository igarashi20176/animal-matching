import { createRouter, createWebHistory } from 'vue-router'
import Chart from '../views/ChartList.vue'
import AnimalList from "../views/AnimalList.vue";
import Add from "../views/AnimalListAdd.vue";

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
        path: '/add',
        name: 'add',
        component: Add
    },
    {
        path: '/register',
        name: "register",
        component: () => import("../views/Register.vue")
    },
    {
        path: '/sign-in',
        name: "signIn",
        component: () => import("../views/Register.vue")
    },
    // {
    //     path: '/edit/:id',
    //     name: 'edit',
    //     component: Edit
    // },
    {
        path: '/*',
        redirect: '/list'
    }
]

const router = createRouter({
    history: createWebHistory(),
    // routes: routesの省略↓
    routes,
    // グローバルに <router-link 'exact'>を設定
    // linkExactActiveClass
})

export default router