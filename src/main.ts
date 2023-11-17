import { createApp } from 'vue';
import { createPinia } from 'pinia';
import dayjs from 'dayjs';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import App from './App.vue';
import router from './router';
import Layout from '@/components/Layout';

import { $_, $Day, $Id } from '@/lib/global';

const app = createApp(App);
const pinia = createPinia();

app.component('Layout', Layout);

app.use(router);
app.use(pinia);
app.mount('#app');

provide($_, _);
provide($Day, dayjs);
provide($Id, nanoid);
// 路由准备完毕再挂载
// router.isReady().then(() => app.mount('#app'));
