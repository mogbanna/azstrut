<template>
    <div class="row">
        <card card-body-classes="table-full-width" no-footer-line>
            <el-table
                :data="tableData"
                row-key="id"
                style="width: 100%">
                    <el-table-column
                        v-for="column in tableColumns" 
                        :key="column.label"
                        :prop="column.prop"
                        :label="column.label"
                        :min-width="column.minWidth">
                    </el-table-column>
            </el-table>
        </card>
    </div>
</template>
<script>
import { Pagination as NPagination } from '@/components';
import moment from 'moment';

export default {
    components: {
        NPagination
    },
    data() {
        return {
            loadOptions: {
                limit: 1000,
                descending: true,
                skip: 0
            },
            tableData: [],
            tableColumns: [
                {
                    prop: 'date',
                    label: 'Date',
                    minWidth: 50
                },
                {
                    prop: 'organization',
                    label: 'Organization',
                    minWidth: 250
                }
            ]
            
        };
    },
    created() {
        this.$store.dispatch('loadTechRequests', this.loadOptions);
    },
    computed: {
        techRequests() {
            return this.$store.getters.getTechRequests;
        },
        techRequestsLoadStatus() {
            return this.$store.getters.getTechRequestsLoadStatus;
        }
    },
    watch: {
        techRequestsLoadStatus: function(val) {
            if(val == 2) {

                //get tomrrows date as starting point to compare tech request dates
                let compare_date = moment().add(1, 'day').format('L');

                this.techRequests.rows.forEach(tech => {
                    let temp = {};
                    temp.id = tech.doc._id;
                    temp.date = moment(tech.doc.created_at).format('L');

                    if(temp.date < compare_date){
                        compare_date = temp.date;
                    }else{
                        temp.date = '';
                        temp.children = [];
                        let t = {};
                        t.id = tech.doc.organization.name;
                        t.organization = tech.doc.organization.name;
                        temp.children.push(t);
                    }

                    this.tableData.push(temp);
                });
            }
        }
    },
}
</script>