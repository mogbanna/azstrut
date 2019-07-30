import clickOutside from './directives/click-ouside.js';
import { Loading } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll';

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
    install(Vue) {
        Vue.directive('click-outside', clickOutside);
        Vue.directive('Loading', Loading);
        Vue.directive('vue-infinite-scroll', infiniteScroll);
    }
};

export default GlobalDirectives;