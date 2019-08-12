<style lang="scss" scoped>
#printAll {
    width: 100%;
    .container {
                height: auto;
                width: 100%;
                padding: 50px 0;
                background: #c1ddce;
                font-family: sans-serif;
                text-align: center;
                color: #41b783;
            }
    .card {
        width: 560px;
        min-height: 400px;
        background: #fff;
        border-radius: 5px;
        margin: auto;
        padding: 5px 0;
    }
    .notes {
        .card {
            width: 300px;

        }
    }
}
</style>
<template>
<div>
    <card>
        <div class="row justify-content-around">
            <div slot="header">
                <h6 class="card-title">Print Options</h6>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"  @change="handleCheckAllChange" label="All"></el-checkbox>
                <el-checkbox-group v-model="checkedOptions"  @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="option in printOptions" :key="option" :label="option"></el-checkbox>
                </el-checkbox-group>
                
            </div>
        </div>
    </card>
    <table id="printAll">
        <tbody class="container">
            <tr>
                <!-- START TODO COL -->
                <td class="todos">
                    <div class="card">

                    </div>
                </td>
                <!-- END TODO COL -->
                <!-- START NOTES COL -->
                <td rowspan="2" class="notes" valign="top">
                    <div class="card">

                    </div>
                </td>
                <!-- END NOTES COL -->
            </tr>
            <tr>
                <!-- START TR COL -->
                <td class="trInfo">
                    <div class="card">

                    </div>
                </td>
                <!-- END TR COL -->
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
import moment from 'moment';
import { Checkbox, CheckboxButton, CheckboxGroup } from 'element-ui';

export default {
    components: {
        [Checkbox.name]: Checkbox,
        [CheckboxButton.name]: CheckboxButton,
        [CheckboxGroup.name]: CheckboxGroup
    },
    data() {
        return {
            submitted: '',
            current_user: '',
            printOptions: ["Tech Request", "Notes", "Todo List"],
            checkedOptions: [],
            checkAll: false,
            isIndeterminate: true
        }
    },
    created() {
        this.$store.dispatch('loadTechRequest', {
            id: this.$route.params.techRequestId
        });
        this.$store.dispatch('loadUser', {
            username: this.$store.getters.getUserSession.userCtx.name
        });
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        userLoadStatus() {
            return this.$store.getters.getUserLoadStatus;
        },
        techRequest() {
            return this.$store.getters.getTechRequest;
        },
        techRequestLoadStatus() {
            return this.$store.getters.getTechRequestLoadStatus;
        },
        today() {
            return moment().format('LL');
        }
    },
    watch: {
        userLoadStatus: function(val) {
            if(val == 2){
                this.current_user = this.user.first_name + " " + this.user.last_name.charAt(0).toUpperCase() + ".";
            }
        },
        techRequestLoadStatus: function(val) {
            if(val == 2) {
                this.submitted = moment(this.techRequest.submitted_on).format('LL');
            }
        }
    },
    methods: {
        handleCheckAllChange(val) {
            console.log(val);
        this.checkedOptions = val ? this.printOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(val) {
          console.log('hi');
          console.log(val);
        let checkedCount = val.length;
        this.checkAll = checkedCount === this.printOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.printOptions.length;
      }
    }
}
</script>