import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(elementUI, { locale });

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


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');