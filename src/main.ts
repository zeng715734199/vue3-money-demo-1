import { createApp } from 'vue';
import { createPinia } from 'pinia';
import dayjs from 'dayjs';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import App from './App.vue';
import router from './router';
import Layout from '@/components/Layout';

import { $_, $day, $id } from '@/lib/global';

const app = createApp(App);
const pinia = createPinia();

app.component('Layout', Layout);

app.use(router);
app.use(pinia);
provide($_, _);
provide($day, dayjs);
provide($id, nanoid);
// 路由准备完毕再挂载
router.isReady().then(() => app.mount('#app'));
