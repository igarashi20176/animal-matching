import { createRouter, createWebHistory } from 'vue-router'
import Chart from '../views/ChartList.vue'
import Animal from "../views/AnimalList.vue";
import DetailItem from "../views/DetailItem.vue";

const routes = [
    {
        path: '/chart',
        name: 'chart',
        component: Chart,
    },
    {
        path: '/animal/:filter?',
        name: 'animal',
        component: Animal
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: DetailItem
    },
    // {
    //     path: '/edit/:id',
    //     name: 'edit',
    //     component: Edit
    // },
    {
        path: '/*',
        redirect: '/animal'
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