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

export default {
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
        Modal
    },
    data() {
        return {
            organization: {
                organization_id: '',
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
        updateOrganizationLoadStatus() {
            return this.$store.getters.getUpdateOrganizationLoadStatus;
        },
        techRequest() {
            return this.$store.getters.getTechRequest;
        },
        techRequestLoadStatus() {
            return this.$store.getters.getTechRequestLoadStatus;
        },
        updateTechRequestLoadStatus() {
            return this.$store.getters.getUpdateTechRequestLoadStatus;
        }
    },
    watch: {
        updateOrganizationLoadStatus: function(val){
            if(val == 2) {
                console.log('updated org successfully!');
                this.$router.push({
                    path: "/tech-requests/view/" + this.techRequest._id
                });
            }
        },
        updateTechRequestLoadStatus: function(val) {
            console.log('updated TR successfully!');
            console.log("trying to update organization's requests");
            console.log(this.techRequest);
            //update the requests associated with this organization
            this.organization.requests.push(this.techRequest._id);
            this.$store.dispatch('updateOrganization', this.organization);
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
                    x.id = org.doc._id;
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
            //load information to form
            this.organization.organization_id = org.id;
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

            //update id for tech requests becuase it was assigned a random one when it comes from WP site
            let regex = /[^a-zA-Z0-9]/g;                     
            //create UUID for request _id using org EIN, org name & date it was created
            tr._id =
                            this.organization.ein.replace(regex, "").toLowerCase() 
                            + "!" 
                            + this.organization.name.replace(regex, "").toLowerCase()
                            + "-"
                            + tr.submitted_on
                            + "!tr";
            tr.created_at = tr.submitted_on.split("-");

            //convert the strings from the split method to int- for consistency
            for(var i = 0; i < tr.created_at.length; i++){
                tr.created_at[i] = parseInt(tr.created_at[i]);
            }   

            let d = new Date();
            tr.created_at.push(
                d.getHours(),
                d.getMinutes(),
                d.getSeconds()
            );

            console.log(tr);
            console.log("adding TR to DB...");
            this.$store.dispatch('updateTechRequest', tr);
        }
    }
}
</script>