import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import store from "./store/store";
import router  from "./router/router";

createApp(App).use(router).use(store).mount('#app')
