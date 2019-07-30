<template>
<div class="col">
    <div class="row">
        <div class="col-lg-8 col-md-7">
            <form @submit.prevent="addTechRequest">
                <card>
                    <h5 slot="header" class="title">Request Equiptment</h5>
                        <!-- BEGIN LEGAL INFO -->
                        <h6>General Information <small class="text-danger">*required</small></h6>
                        <div class="row">
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Organization's Name"
                                            placeholder="Organization's Name"
                                            v-model="form.organization.name"
                                            v-validate="'required'"
                                            name="organization name"
                                            :error="getError('organization name')"
                                            >
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Legal Organization"
                                            placeholder="Legal Organization"
                                            infoBlock="If differnt from Organization's Name"
                                            v-model="form.organization.legal_organization"
                                            name="legal organization"
                                            >
                                </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-7">
                                <fg-input type="text"
                                            label="Website"
                                            placeholder="Website"
                                            v-model="form.organization.website"
                                            name="website"
                                            >
                                </fg-input>
                            </div>
                        </div>
                        <!-- END LEGAL INFO -->
                        <!-- BEGIN LEGAL INFO -->
                        <h6>Legal Information <small class="text-danger">*required</small></h6>
                        <div class="row">
                            <div class="col-md-5">
                                <!-- <fg-input type="text"
                                            label="Organization Type"
                                            placeholder="Organization Type"
                                            v-model="form.organization.organization_type"
                                            >
                                </fg-input> -->
                                    <el-select class="select-info" placeholder="Organization Type" v-model="form.organization.organization_type">
                                        <el-option v-for="option in organizationTypes.types" class="select-info" style="width: 100%" :value="option" :label="option" :key="option">
                                        </el-option>
                                    </el-select>
                            </div>
                            <div class="col-md-7">
                            <fg-input type="text"
                                        label="EIN"
                                        placeholder="EIN"
                                        v-model="form.organization.ein"
                                        v-validate="'required'"
                                        name="ein"
                                        :error="getError('ein')"
                                        >
                            </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                            <fg-input type="text"
                                        label="ACC File Number"
                                        placeholder="ACC File Number"
                                        v-model="form.organization.acc_file.number"
                                        v-validate="'required'"
                                        name="acc file number"
                                        :error="getError('acc file number')"
                                        >
                            </fg-input>
                            </div>
                            <div class="col-md-6">
                            <fg-input type="text"
                                        label="ACC Listing Link"
                                        placeholder="ACC Listing Link"
                                        v-model="form.organization.acc_file.listing_link"
                                        v-validate="'required'"
                                        name="acc listing link"
                                        :error="getError('acc listing link')"
                                        >
                            </fg-input>
                            </div>
                        </div>
                        <!-- END LEGAL INFO -->
                        <!-- BEGIN PRIMARY CONTACT -->
                        <h6>Primary Contact <small class="text-danger">*required</small></h6>
                        <div class="row">
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Full Name"
                                            placeholder="Full Name"
                                            v-model="form.organization.primary_contact.full_name"
                                            v-validate="'required'"
                                            name="primary full name"
                                            :error="getError('primay full name')"
                                            >
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Role"
                                            placeholder="Role"
                                            v-model="form.organization.primary_contact.role"
                                            v-validate="'required'"
                                            name="organization role"
                                            :error="getError('organization role')"
                                            >
                                </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                            <fg-input type="text"
                                        label="Email"
                                        placeholder="Email"
                                        v-model="form.organization.primary_contact.email"
                                        v-validate="'required|email'"
                                        name="primary email"
                                        :error="getError('primary email')"
                                        >
                            </fg-input>
                            </div>
                            <div class="col-md-4">
                            <fg-input type="text"
                                        label="Phone #"
                                        placeholder="Phone #"
                                        v-model="form.organization.primary_contact.phone"
                                        v-validate="'required'"
                                        name="phone number"
                                        :error="getError('phone number')"
                                        >
                            </fg-input>
                            </div>
                        </div>
                        <!-- END PRIMARY CONTACT -->
                        <!-- BEGIN SECONDARY CONTACT -->
                        <h6>Secondary Contact</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Full Name"
                                            placeholder="Full Name"
                                            v-model="form.organization.secondary_contact.full_name">
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Role"
                                            placeholder="Role"
                                            v-model="form.organization.secondary_contact.role">
                                </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                            <fg-input type="text"
                                        label="Email"
                                        placeholder="Email"
                                        v-model="form.organization.secondary_contact.email">
                            </fg-input>
                            </div>
                            <div class="col-md-4">
                            <fg-input type="text"
                                        label="Phone #"
                                        placeholder="Phone #"
                                        v-model="form.organization.secondary_contact.phone">
                            </fg-input>
                            </div>
                        </div>
                        <!-- END SECONDARY CONTACT -->
                        <!-- Number of Equiptment -->
                        <div class="row">
                            <div class="col-md-3">
                                <h6># Of Desktops</h6>
                                <fg-input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    v-model="form.num_desktops">
                                </fg-input>
                            </div>
                            <div class="col-md-3">
                                <h6># Of Laptops</h6>
                                <fg-input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    v-model="form.num_laptops">
                                </fg-input>
                            </div>
                        </div>

                        <!-- NOTES -->
                        <hr>
                        <div class="row">
                            <div class="col-md-12">
                            <fg-input label="Additional Notes:">
                                <textarea class="form-control"
                                        placeholder="Additional notes"
                                        v-model="form.organization.notes">
                                </textarea>
                            </fg-input>
                            </div>
                        </div>
                        <!-- END NOTES -->
                </card>
                <n-button slot="footer"
                    type="primary"
                    native-type="submit"
                    block
                    size="lg">
                    Request Equiptment
                </n-button>
            </form>
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
                <p class="mt-2 text-muted"> Can't find your Organization?
                    <router-link :to="{ path: '/organizations/add'}">Click here</router-link>
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
                    label="Select Organization's Name"
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
            form: {
                organization: {
                    organization_id: '',
                    name: '',
                    legal_organization: '',
                    primary_contact: {
                        full_name: '',
                        role: '',
                        email: '',
                        phone: '',
                    },
                    secondary_contact: {
                        full_name: '',
                        role: '',
                        email: '',
                        phone: ''
                    },
                    organization_type: '',
                    website: '',
                    social_media: [],
                    ein: '',
                    acc_file: {
                        number: '',
                        listing_link: ''
                    },
                },
                num_desktops: 0,
                num_laptops: 0,
                status: 'new',
                notes: '',
                created_by: {},
                created_at: [],
                updated_by: {},
                updated_at: [],
                completed_at: []
            },
            organizationSearch: [],
            searchQuery: '',
            searchResult: [],
            organizationFound: false,
            fuseSearch: null
            
        };
    },
    mounted() {
        
    },
    created() {
        //load the organizations to search through them
        this.$store.dispatch('loadOrganizations', {
            limit: 1000,
            descending: false,
            skip: 0
        });

        this.$store.dispatch('loadUser', {
            username: this.userSession.userCtx.name
        });

        //dispatch the constant values saved in DB- ORGANIZATION_TYPES
        this.$store.dispatch('loadOrganizationTypes');
    },
    computed: {
        organizations() {
            return this.$store.getters.getOrganizations;
        },
        organizationsLoadStatus() {
            return this.$store.getters.getOrganizationsLoadStatus;
        },
        userSession() {
            return this.$store.getters.getUserSession;
        },
        userSessionLoadStatus() {
            return this.$store.getters.getUserSessionLoadStatus;
        },
        organizationTypes() {
            return this.$store.getters.getOrganizationTypes;
        },
        organizationTypesLoadStatus() {
            return this.$store.getters.getOrganizationTypesLoadStatus;
        },
        addTechRequestLoadStatus() {
            return this.$store.getters.getAddTechRequestLoadStatus;
        },
        addTechRequestResponse() {
            return this.$store.getters.getAddTechRequestResponse;
        }
    },
    watch: {
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
                    x.doc = org.doc;

                    temp.push(x);
                });
                this.organizationSearch = temp;
                
                // Fuse search initialization.
                this.fuseSearch = new Fuse(this.organizationSearch, {
                keys: ['name', 'ein'],
                threshold: 0.3
                });
            }
        },
        addTechRequestLoadStatus: function(val) {
            if(val == 2){
                console.log('We added it!');
            }
        },
    },
    methods: {
        addOrgInfo(org){
            //load information to form
            this.form.organization.organization_id = org.doc._id;
            this.form.organization.name = org.doc.name;
            this.form.organization.legal_organization = org.doc.legal_organization;
            this.form.organization.primary_contact = org.doc.primary_contact;
            this.form.organization.secondary_contact = org.doc.secondary_contact;
            this.form.organization.organization_type = org.doc.organization_type;
            this.form.organization.website = org.doc.website;
            this.form.organization.ein = org.doc.ein;
            this.form.organization.acc_file = org.doc.acc_file;
        },
        setCurrent(row) {
            this.$refs.searchTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            if(val){
                this.currentRow = val;
                this.confirmEIN(this.currentRow.doc.ein);

            }
        },
        confirmEIN(ein) {
            this.$prompt("Enter organization's EIN to confirm your oganization. (Format: XX-XXXXXXX)", {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    inputValidator: function(val) {
                       return val === ein ? true : false;
                    },
                    inputErrorMessage: 'Invalid EIN. Please make sure to enter it using the XX-XXXXXXX format and without any spaces.'
                }).then(({ value }) => {
                    this.addOrgInfo(this.currentRow);
                    this.$message({
                        type: 'success',
                        message: "Great! Please review your organization's information and update as needed."
                    });
                }).catch(() => {
                    this.$message({
                        type: 'danger',
                        message: 'Invalid EIN'
                    });       
                });
                //reset the search input
                this.searchQuery = "";
                //reset table display
                this.searchResult.splice(0, this.searchResult.length);
        },
        searchOrg(val) {
            this.searchResult = this.fuseSearch.search(val);
        },
        getError(fieldName) {
            return this.errors.first(fieldName);
        },
        async addTechRequest(){
            let isValidForm = this.$validator.validateAll();
            if(!isValidForm){
                console.log('Something went wrong trying to add the organization');
            } else {
                //make sure user selected a organization type
                if(this.form.organization.organization_type !== ''){
                    var d = new Date();
                    this.form.created_at.push(
                        d.getFullYear(),
                        d.getMonth(),
                        d.getDate(),
                        d.getHours(),
                        d.getMinutes(),
                        d.getSeconds()
                    );
                    this.form.created_by = this.userSession.userCtx;

                    //add the uploaded image to the organization to be saved in the DB
                    // if(this.upLoadName !== ""){
                    //     console.log(this.upLoadName);
                    //     this.form.organization._attachments[this.upLoadName.name] = {};
                    //     this.form.organization._attachments[
                    //         this.upLoadName.name
                    //     ][
                    //         'content_type'
                    //     ] = this.upLoadName.raw.type;
                    //     this.form.organization._attachments[
                    //         this.upLoadName.name
                    //     ][
                    //         'data'
                    //     ] = this.upLoadName.raw;
                    // }
                    // this.form.organization.thumbnail_name = this.upLoadName.name;

                    console.log(this.form);
                    console.log("adding organization to DB...");
                    this.$store.dispatch('addTechRequest', this.form);
                }
                else{
                    this.$message({
                        type: 'warning',
                        message: 'Make sure to select a type'
                    });
                }
                
            }
        }
    }
}
</script>