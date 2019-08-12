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
                <div class="row" slot="header">
                    <div class="col-11">
                        <h4 class="card-title">Equiptment Requests</h4>
                    </div>
                    <div class="col-1">
                        <drop-down
                                position="right"
                                class="nav-item"
                                icon="now-ui-icons objects_spaceship">

                            <download-excel
                                v-show="allDownloaded"
                                class="dropdown-item"
                                :fields="json_fields"
                                worksheet="My Worksheet"
                                name="azstrut-all-tech-requests.xls" 
                                type="csv"
                                :data="allTechRequests">
                                Export All
                            </download-excel>
                            <download-excel
                                v-show="tableSelection.length > 0"
                                class="dropdown-item"
                                :fields="json_fields"
                                worksheet="My Worksheet"
                                name="azstrut-selected-tech-requests.xls" 
                                type="csv"
                                :data="tableSelection">
                                Export Selected
                            </download-excel>
                        <!-- <a class="dropdown-item">Print</a> -->
                        </drop-down>
                    </div>
                </div>
                <div>
                    <el-table
                        ref="displayTable"
                        :data="tableData"
                        style="width: 100%;"
                        @current-change="handleCurrentChange"
                        @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55"
                            >
                            </el-table-column>
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
import { CONFIG } from '@/config.js';

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
            tableSelection: [],
            allTechRequests:[],
            allDownloaded: false,
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
            ],
            json_fields: {
                    'ID': 'id',
                    'Submission Date': 'date',
                    'Status': 'doc.status',
                    'Organization Name': 'doc.organization.name',
                    'Organizaton EIN': 'doc.organization.ein',
                    'Primary Contact Name': 'doc.organization.primary_contact.full_name',
                    'Primary Contact Phone': 'doc.organization.primary_contact.phone',
                    'Primary Contact Email': 'doc.organization.primary_contact.email',
                    '# of Desktops': 'doc.num_desktops',
                    '# of Laptops': 'doc.num_laptops',
                    'Usage': 'doc.usage',
                    'Additional Equiptment': 'doc.other_items',
                    'Comments': 'doc.comments',
                },
            
        };
    },
    created() {
        this.$store.dispatch('loadTechRequests', this.loadOptions);
        this.downloadAllTR();
    },
    computed: {
        techRequests() {
            return this.$store.getters.getTechRequests;
        },
        techRequestsLoadStatus() {
            return this.$store.getters.getTechRequestsLoadStatus;
        },
        organizations() {
            return this.$store.getters.getOrganizations;
        },
        organizationsLoadStatus() {
            return this.$store.getters.getOrganizationsLoadStatus;
        }
    },
    watch: {
        organizationsLoadStatus: function(val) {
            if(val == 2) {
                /**
                 * if there is one organization found, allow
                 * the user to continue viewing the request.
                 * organization verification not needed
                 */
                if(this.organizations.rows.length === 1) {
                    this.viewTechRequest(this.currentRow.id);
                }else{
                    this.verifyOrg(this.currentRow.id);
                }
                
            }    
        },
        techRequestsLoadStatus: function(val) {
            if(val == 2) {

                /**
                 * laod tech request info to the display table
                 */
                this.techRequests.rows.forEach(tech => {
                    let temp = {};

                    temp.id = tech.doc._id;
                    temp.date = moment(tech.doc.submitted_on, "YYYY-MM-DD").format('LL');
                    temp.organization = tech.doc.organization.name;
                    temp.status = tech.doc.status;
                    temp.doc = tech.doc;

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

            /**
             * if the status of the request is new,
             * user must verify organization's info
             * before they can view the request 
             */
            if(row.status === "new") {
                /**
                 * check if we have an organization saved with
                 * the same ein as the tech request
                 */
                var ein = row.id.slice(3,13);                   //extract the ein from the tech request's _id

                this.$store.dispatch('findOrganizations', {
                    startkey: ein + '-',
                    endkey: ein + '-'
                });
            } else {
                this.viewTechRequest(row.id);
            }
        },
        handleSelectionChange(val) {
            this.tableSelection = val;
        },
        verifyOrg(techRequestid) {
            this.$router.push({
                path: '/tech-requests/verify/' + techRequestid
            });            
        },
        viewTechRequest(id){
            this.$router.push({
                    path: '/tech-requests/view/' + id
                });
        },
        downloadAllTR(){
            CONFIG.LOCAL_DB.allDocs({
                include_docs: true,
                startkey: 'tr-',
                endkey: 'tr-\uffff',
            }).then(response => {
                this.allDownloaded = true;
                response.rows.forEach(tr => {
                    this.allTechRequests.push({
                        date: moment(tr.doc.submitted_on, "YYYY-MM-DD").format('LL'),
                        id: tr.id,
                        doc: tr.doc
                    });
                });
            }).catch((err) => {
                console.log('Trouble downloading all tech requests');
            });
        },
    },
}
</script>