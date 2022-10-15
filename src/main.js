import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import router  from "./router";
import store from "./store";

<<<<<<< HEAD
createApp(App).use(router).use(store).mount('#app')
=======
createApp(App).use(store).use(router).mount('#app')
>>>>>>> addFirebase
