import { createRouter, createWebHistory } from 'vue-router'
import Chart from '../templates/ChartList.vue'
import AnimalList from "../templates/AnimalList.vue";
import Add from "../templates/AnimalListAdd.vue";

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
    // {
    //     path: '/edit/:id',
    //     name: 'edit',
    //     component: Edit
    // },
    {
        path: '/*',
        redirect: '/chart'
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