<style scoped>
    #statusTag {
        border-radius: 0;
        font-size: 12px;
        text-align: center;
        min-width: 50%;
    }
</style>
<template>
    <div class="row">
        <div class="col-12" v-loading="techRequestsLoadStatus == 1">
            <card card-body-classes="table-full-width" no-footer-line>
                <h4 slot="header" class="card-title">Equiptment Requests</h4>
                <div>
                    <el-table
                        ref="displayTable"
                        :data="tableData"
                        style="width: 100%;"
                        @current-change="handleCurrentChange"
                        @selection-change="handleSelectionChange">
                            <el-table-column
                                prop="date"
                                label="Date"
                                sortable
                                min-width="150"
                                column-key="date"
                            >
                                <!-- :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                                :filter-method="filterHandler" -->
                            </el-table-column>
                            <el-table-column
                                prop="organization"
                                label="Organization"
                                min-width="250"
                            >
                            </el-table-column>
                            <!-- <el-table-column
                                prop="address"
                                label="Address"
                                :formatter="formatter"
                            >
                            </el-table-column> -->
                            <el-table-column
                                    prop="status"
                                    label="Status"
                                    min-width="150"
                                    :filters="[{ text: 'New', value: 'new' }, { text: 'Under Review', value: 'in review' }, { text: 'Approved', value: 'approved' }, { text: 'Hold', value: 'hold' }, { text: 'Denied', value: 'denied' }]"
                                    :filter-method="filterTag"
                                    filter-placement="bottom-end"
                                >
                                    <template slot-scope="scope">
                                        <el-tag
                                        id="statusTag"
                                        :type="scope.row.status === 'new' ? 'brand color'
                                               : scope.row.status === 'in review' ? 'info'
                                               : scope.row.status === 'approved' ? 'success'
                                               : scope.row.status === 'hold' ? 'warning'
                                               : 'danger'"
                                        disable-transitions>{{scope.row.status}}</el-tag>
                                    </template>
                            </el-table-column>
                    </el-table>

                </div>
            </card>
        </div>
    </div>
</template>
<script>
import { Tag } from 'element-ui';
import { Pagination as NPagination } from '@/components';
import moment from 'moment';

export default {
    components: {
        NPagination,
        [Tag.name]: Tag
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
                },
                {
                    prop: 'status',
                    label: 'Status',
                    minWidth: 100
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


                this.techRequests.rows.forEach(tech => {
                    let temp = {};

                    temp.id = tech.doc._id;
                    temp.date = moment(tech.doc.created_at).format('LL');
                    temp.organization = tech.doc.organization.name;
                    temp.status = tech.doc.status;

                    this.tableData.push(temp);
                });
            }
        }
    },
    methods: {
        resetDateFilter() {
        this.$refs.displayTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.displayTable.clearFilter();
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        setCurrentRow(row) {
            this.$refs.displayTable.setCurrentRow(row);
        },
        handleCurrentChange(row) {
            this.currentRow = row;
            //if the status of the request is new, the user needs to
            //verify the organization's information before they can do anything else
            if(row.status === "new") {
                this.$router.push({
                    path: '/tech-requests/verify/' + row.id
                });
            }else{
                this.$router.push({
                    path: '/tech-requests/view/' + row.id
                });
            }
        },
        handleSelectionChange(val) {
            this.displayTable = val;
        },
    },
}
</script>