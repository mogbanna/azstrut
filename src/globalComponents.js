import fgInput from './components/Inputs/formGroupInput.vue';
import DropDown from './components/Dropdown.vue';
import Card from './components/Cards/Card.vue';
import Button from './components/Button.vue';

import { Input, InputNumber, Tooltip, Popover, MessageBox, Message, Table, TableColumn } from 'element-ui';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
    install(Vue) {
        Vue.component('fg-input', fgInput);
        Vue.component('drop-down', DropDown);
        Vue.component('card', Card);
        Vue.component('n-button', Button);
        Vue.component(Input.name, Input);
        Vue.component(InputNumber.name, InputNumber);
        Vue.component(Table.name, Table);
        Vue.component(TableColumn.name, TableColumn);
        Vue.use(Tooltip);
        Vue.use(Popover);
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$prompt = MessageBox.prompt;
        Vue.prototype.$message = Message;
    }
};

export default GlobalComponents;