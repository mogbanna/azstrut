<template>
<div class="col">
    <form @submit.prevent="addOrganization">
        <div class="row justify-content-center">
            <div class="col-lg-10 col-md-9">
                <card>
                    <h5 slot="header" class="title">Add Organization</h5>
                    <!-- BEGIN GENERAL INFO -->
                    <h6>General Information <small class="text-danger">*required</small></h6>
                        <div class="row">
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Legal Name"
                                            placeholder="Legal Name"
                                            v-model="form.name"
                                            v-validate="'required'"
                                            name="organization name"
                                            :error="getError('organization name')"
                                            >
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Legal Name"
                                            placeholder="Legal Name"
                                            infoBlock="If differnt from Organization's Name"
                                            v-model="form.legal_organization"
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
                                            v-model="form.website"
                                            name="website"
                                            >
                                </fg-input>
                            </div>
                        </div>
                        <!-- END GENERAL INFO -->
                        <!-- BEGIN LEGAL INFO -->
                        <h6>Legal Information <small class="text-danger">*required</small></h6>
                        <div class="row">
                            <div class="col-md-4">
                            <!-- <fg-input type="text"
                                        label="Organization Type"
                                        placeholder="Organization Type"
                                        v-model="form.organization_type">
                            </fg-input> -->
                                <el-select class="select-info" placeholder="Organization Type" v-model="form.organization_type">
                                    <el-option v-for="option in organizationTypes.types" class="select-info" :value="option" :label="option" :key="option">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="col-md-8">
                            <fg-input type="text"
                                        label="EIN"
                                        placeholder="EIN"
                                        v-model="form.ein"
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
                                        v-model="form.acc_file.number"
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
                                        v-model="form.acc_file.listing_link"
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
                                            v-model="form.primary_contact.full_name"
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
                                            v-model="form.primary_contact.role"
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
                                        v-model="form.primary_contact.email"
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
                                        v-model="form.primary_contact.phone"
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
                                            v-model="form.secondary_contact.full_name">
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input type="text"
                                            label="Role"
                                            placeholder="Role"
                                            v-model="form.secondary_contact.role">
                                </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                            <fg-input type="text"
                                        label="Email"
                                        placeholder="Email"
                                        v-model="form.secondary_contact.email">
                            </fg-input>
                            </div>
                            <div class="col-md-4">
                            <fg-input type="text"
                                        label="Phone #"
                                        placeholder="Phone #"
                                        v-model="form.secondary_contact.phone">
                            </fg-input>
                            </div>
                        </div>
                        <!-- END SECONDARY CONTACT -->
                        <!-- NOTES -->
                        <hr>
                        <div class="row">
                            <div class="col-md-12">
                            <fg-input label="Notes:">
                                <textarea class="form-control"
                                        placeholder="Additional notes"
                                        v-model="form.notes">
                                </textarea>
                            </fg-input>
                            </div>
                        </div>
                        <!-- END NOTES -->
                    </card>
                    <div class="row justify-content-center">
                        <n-button slot="footer"
                                    type="primary"
                                    native-type="submit"
                                    block
                                    size="lg">
                            Add New Organization
                        </n-button>
                </div>
            </div>
        </div>
    </form>
</div>

   
</template>
<script>
import { Upload, Select, Option } from 'element-ui';
import { Modal } from '@/components'

export default {
    components: {
        [Upload.name]: Upload,
        [Select.name]: Select,
        [Option.name]: Option,
        Modal
    },
    data() {
        return {
            form: {
                _id: "",
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
                ein: '',
                acc_file: {
                    number: '',
                    listing_link: ''
                },
                notes: '',
                created_by: {},
                created_at: [],
                updated_at: []
            },
            from_tr: false,     //flag indictating the route originated from verifying a new tech request
        };
    },
    created() {
        //check if the route has a param for the tech request id
        if(this.$route.params.techRequestId){
            this.from_tr = true;
            //load the tech request to add the new organization
            this.$store.dispatch('loadTechRequest', {
                id: this.$route.params.techRequestId
            });
        }
        //dispatch the constant values saved in DB- ORGANIZATION_TYPES
        this.$store.dispatch('loadUser', {
            username: this.userSession.userCtx.name
        });

        this.$store.dispatch('loadOrganizationTypes');
    },
    computed: {
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
        techRequest() {
            return this.$store.getters.getTechRequest;
        },
        techRequestLoadStatus() {
            return this.$store.getters.getTechRequestLoadStatus;
        },
        addOrganizationLoadStatus() {
            return this.$store.getters.getAddOrganizationLoadStatus;
        },
        addOrganizationResponse() {
            return this.$store.getters.getAddOrganizationResponse;
        }
    },
    watch: {
        techRequestLoadStatus: function(val) {
            if(val == 2){
                var org = this.techRequest.organization;
                //load up form with organization information from the tech request
                this.form.name = org.name;
                this.form.legal_organization = org.legal_organization;
                this.form.website = org.website;
                this.form.primary_contact = org.primary_contact;
                this.form.secondary_contact = org.secondary_contact;
                this.form.organization_type = org.organization_type;
                this.form.ein = org.ein;
                this.form.acc_file = org.acc_file;
            }
        },
        addOrganizationLoadStatus: function(val) {
            if(val == 2){
                console.log('We added it!');
                /**
                 * check if route came from verifying a tech_req. 
                 * send user to view that tech_req if it did 
                 */
                if(this.from_tr){
                    this.$router.push({
                        path: '/tech-requests/view/' + this.$route.params.techRequestId
                    });
                } else {
                    this.$router.push({
                        path: '/organizations/view/' + this.addOrganizationResponse.id
                    });
                }
            }
        }
    },
    methods: {
        getError(fieldName) {
            return this.errors.first(fieldName);
        },
        async addOrganization(){
            let isValidForm = this.$validator.validateAll();
            if(!isValidForm){
                console.log('Something went wrong trying to add the organization');
            } else {
                //make sure user selected a organization type
                if(this.form.organization_type !== ''){
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

                    //only allow numbers & a dash(-) using regular expression matching
                    let ein_regex = /[^0-9-]/g;
                    //only allow letters and numbers for organization type
                    let type_regex = /[^a-zA-Z0-9]/g;

                    //create UUID for org _id using EIN & org name
                    this.form._id = "org-"
                                    + this.form.ein.replace(ein_regex, "").toLowerCase() 
                                    + "-" 
                                    + this.form.organization_type.replace(type_regex, "").toLowerCase();
                    this.$store.dispatch('addOrganization', this.form);
                }
                else{
                    this.$notify({
                        message: 'Make sure to select a type',
                        type: 'warning'
                    });
                }
                
            }
        }
    }
}
</script>