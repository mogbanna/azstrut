import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import DashboardPlugin from './dashboard-plugin';

Vue.use(DashboardPlugin);


/**
 * https://www.npmjs.com/package/vue-json-excel
 */
// import JsonExcel from 'vue-json-excel';
// Vue.component('DownloadExcel', JsonExcel);

/**
 * https://www.npmjs.com/package/vue-print-nb
 */
// import Print from 'vue-print-nb';
// Vue.use(Print);

import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import MessageBox from 'element-ui';
locale.use(lang);

Vue.prototype.$msgbox = MessageBox;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');