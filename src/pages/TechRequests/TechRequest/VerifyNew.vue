<template>
<div class="col">
    <div class="row">
        <div class="col-lg-8 col-md-7">
                <card>
                    <h5 class="title">Verify Organization on Request</h5>
                        <p class="text-muted">Please use the search to match this information with
                            the organizations we have on record. <br>This helps us make sure we don't keep
                            duplicate files on record :)
                        </p>
                        <card>
                            <!-- <h5 slot="header" class="title">Submitted Info</h5> -->
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h6 class="card-title text-muted">Organization Name</h6>
                                        <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.name }}</h6>
                                    </div>
                                    <div class="col-md-6">
                                        <h6 class="card-title text-muted">EIN</h6>
                                        <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.ein }}</h6>
                                    </div>
                                </div>
                            </div>
                        </card>
                        <card v-if="organizationFound">
                            <h6 slot="header" class="title text-danger">* Update to the following *</h6>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h6 class="card-title text-muted">Organization Name</h6>
                                        <h6 class="card-subtitle mb-2 text-primary">{{ organization.name }}</h6>
                                    </div>
                                    <div class="col-md-6">
                                        <h6 class="card-title text-muted">EIN</h6>
                                        <h6 class="card-subtitle mb-2 text-primary">{{ organization.ein }}</h6>
                                    </div>
                                </div>
                            </div>
                        </card>
                </card>
                <n-button 
                    v-if="organizationFound"
                    slot="footer"
                    type="primary"
                    @click.native="updateTechRequest()"
                    block
                    size="lg">
                    Accept Changes
                </n-button>
        </div>
        <div class="col-lg-4 col-md-5">
            <card class="card-nav-tabs text-center">
                <el-input type="search"
                            class="mt-3 mb-1"
                            clearable
                            prefix-icon="el-icon-search"
                            style="width: 250px"
                            placeholder="Search Organizations"
                            v-model="searchQuery"
                            aria-controls="datatables">
                </el-input>
                <p class="mt-2 text-muted"> No matching Organization?
                    <router-link :to="{ path: '/organizations/add/' + techRequest._id}">Click here</router-link>
                </p>
                <el-table
                    ref="searchTable"
                    stripe
                    :data="searchResult"
                    empty-text="No Matches Yet"
                    style="width: 100%"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    >
                <el-table-column
                    label="Click Organization's Name"
                    prop="name">
                </el-table-column>
                </el-table>
            </card>
        </div>
    </div>
</div>

   
</template>
<script>
import { Select, Option } from 'element-ui';
import { Modal } from '@/components'
import Fuse from 'fuse.js';
import moment from 'moment';

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        Modal
    },
    data() {
        return {
            current_user: '',
            organization: {
                name: '',
                ein: ''
            },
            organizationSearch: [],
            searchQuery: '',
            searchResult: [],
            organizationFound: false,
            fuseSearch: null                // !!!!!!!!!!!!   consider changing to server sider search!!!!
            
        };
    },
    mounted() {
        
    },
    created() {
        //load the tech request
        this.$store.dispatch('loadTechRequest', {
            id: this.$route.params.techRequestId
        });

        //load the organizations to search through them
        this.$store.dispatch('loadOrganizations', {
            limit: 1000,
            descending: false,
            skip: 0
        });

    },
    computed: {
        organizations() {
            return this.$store.getters.getOrganizations;
        },
        organizationsLoadStatus() {
            return this.$store.getters.getOrganizationsLoadStatus;
        },
        techRequest() {
            return this.$store.getters.getTechRequest;
        },
        techRequestLoadStatus() {
            return this.$store.getters.getTechRequestLoadStatus;
        },
        updateTechRequestLoadStatus() {
            return this.$store.getters.getUpdateTechRequestLoadStatus;
        },
        userSession() {
            return this.$store.getters.getUserSession;
        },
        userSessionLoadStatus() {
            return this.$store.getters.getUserSessionLoadStatus;
        },
        user() {
            return this.$store.getters.getUser;
        },
        userLoadStatus() {
            return this.$store.getters.getUserLoadStatus;
        }
    },
    watch: {
        userLoadStatus: function(val) {
            if(val == 2) {
                this.current_user = this.user.first_name + " " + this.user.lastName.charAt(0).toUpperCase() + ".";
            }
        },
        userSessionLoadStatus: function(val) {
            if(val == 2) {
                //get the user's name for the tech request's notes
                this.$store.dispatch('loadUser', {
                    id: this.userSession.userCtx.name
                });
            }
        },
        updateTechRequestLoadStatus: function(val) {
            if(val == 2) {
                this.$router.push({
                    path: "/tech-requests/view/" + this.techRequest._id
                });
            }            
        },
        searchQuery: function(val) {
            if(val !== ""){
                //allow user to type organization name before starting search
                setTimeout(() => {
                    this.searchOrg(val);                    
                }, 500);
            }else {
                this.searchResult.splice(0, this.searchResult.length);
            }
        },
        organizationsLoadStatus: function(val) {
            if(val == 2){
                //clear data
                this.organizationSearch.slice(0, this.organizationSearch.length);

                let temp = [];
                this.organizations.rows.forEach(org => {
                    let x = {};
                    x.name = org.doc.name;
                    x.ein = org.doc.ein;

                    temp.push(x);
                });
                this.organizationSearch = temp;
                
                // Fuse search initialization.
                this.fuseSearch = new Fuse(this.organizationSearch, {
                keys: ['name', 'ein'],
                threshold: 0.3
                });
            }
        }
    },
    methods: {
        addOrgInfo(org){
            this.organization.name = org.name;
            this.organization.ein = org.ein;
        },
        setCurrent(row) {
            this.$refs.searchTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            if(val){
                this.organizationFound = true;
                this.currentRow = val;
                this.addOrgInfo(val);
            }
        },
        searchOrg(val) {
            this.searchResult = this.fuseSearch.search(val);
        },
        updateTechRequest(){
            let tr = this.techRequest;
            
            //udpate organization info on tech request
            tr.organization.name = this.organization.name;
            tr.organization.ein = this.organization.ein;
            tr.notes = [{
                text: "Organization information verified & updated.",
                submitted_by: this.current_user,
                submitted_on: moment().format("LL")
            }];
            

            this.$store.dispatch('updateTechRequest', tr);
        }
    }
}
</script>