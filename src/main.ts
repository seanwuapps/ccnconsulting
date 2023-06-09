import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@go-ui/vue/dist/go-ui.css';
import './global.scss';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
