import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Layout from '@/components/Layout';

const app = createApp(App);
const pinia = createPinia();

app.component('Layout', Layout);

app.use(router);
app.use(pinia);
// 路由准备完毕再挂载
router.isReady().then(() => app.mount('#app'));
