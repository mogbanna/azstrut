import clickOutside from './directives/click-ouside.js';
import { Loading } from 'element-ui'

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
    install(Vue) {
        Vue.directive('click-outside', clickOutside);
        Vue.directive('Loading', Loading);
    }
};

export default GlobalDirectives;