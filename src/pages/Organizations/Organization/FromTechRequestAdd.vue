<template>
<div class="col" v-loading="techRequestLoadStatus == 1">
    <form @submit.prevent="addOrganization">
        <div class="row justify-content-center">
            <div class="col-10">
            <card>
                <h5 slot="header" class="title">Add Organization</h5>

                    <!-- BEGIN GENERAL INFO -->
                    <h6>General Information </h6>
                    <div class="row">
                        <div class="col-md-6">
                            <fg-input type="text"
                                        label="Organization Name"
                                        placeholder="Organization Name"
                                        v-model="techRequest.organization.name"
                                        v-validate="'required'"
                                        name="organization name"
                                        :error="getError('organization name')"
                                        >
                            </fg-input>
                        </div>
                        <div class="col-md-6">
                            <fg-input type="text"
                                        label="Organization Legal Name"
                                        placeholder="Organization Legal Name"
                                        v-model="techRequest.organization.legal_name"
                                        name="organization legal name"
                                        >
                            </fg-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                        <fg-input type="text"
                                    label="Website"
                                    placeholder="Website"
                                    v-model="techRequest.organization.website"
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
                            <el-select class="select-info" placeholder="Organization Type" v-model="techRequest.organization.organization_type">
                                <el-option v-for="option in organizationTypes.types" class="select-info" :value="option" :label="option" :key="option">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="col-md-8">
                        <fg-input type="text"
                                    label="EIN"
                                    placeholder="EIN"
                                    v-model="techRequest.organization.ein"
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
                                    v-model="techRequest.organization.acc_file.number"
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
                                    v-model="techRequest.organization.acc_file.listing_link"
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
                                        v-model="techRequest.organization.primary_contact.full_name"
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
                                        v-model="techRequest.organization.primary_contact.role"
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
                                    v-model="techRequest.organization.primary_contact.email"
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
                                    v-model="techRequest.organization.primary_contact.phone"
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
                                        v-model="techRequest.organization.secondary_contact.full_name">
                            </fg-input>
                        </div>
                        <div class="col-md-6">
                            <fg-input type="text"
                                        label="Role"
                                        placeholder="Role"
                                        v-model="techRequest.organization.secondary_contact.role">
                            </fg-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                        <fg-input type="text"
                                    label="Email"
                                    placeholder="Email"
                                    v-model="techRequest.organization.secondary_contact.email">
                        </fg-input>
                        </div>
                        <div class="col-md-4">
                        <fg-input type="text"
                                    label="Phone #"
                                    placeholder="Phone #"
                                    v-model="techRequest.organization.secondary_contact.phone">
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
                                    v-model="techRequest.organization.notes">
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
                ein: 'ABCD-1234',
                acc_file: {
                    number: '',
                    listing_link: ''
                },
                requests: [],
                camps: [],
                thumbnail_name: '',
                _attachments: {},
                notes: '',
                created_by: {},
                created_at: [],
                updated_at: []
            },
        };
    },
    created() {
        //load the tech request info
        this.$store.dispatch('loadTechRequest', {
                id: this.$route.params.techRequestId
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
            if(val == 2) {
                //populate the data from the tech request into the form
                let org = this.techRequest.organization;
    
                this.form.name = org.name;
                this.form.legal_organization = org.legal_organization;
                this.form.primary_contact = org.primary_contact;
                this.form.secondary_contact = org.secondary_contact;
                this.form.organization_type = org.organization_type;
                this.form.website = org.website;
                this.form.ein = org.ein;
                this.form.acc_file = org.acc_file;
            }
                
        },
        addOrganizationLoadStatus: function(val) {
            if(val == 2){
                this.$router.push({
                    path: '/dashboard/tech-requests/requests/view/' + this.techRequest._id
                });
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
                let org = {};
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

                    //add this request to the organization's tech requests record & its status
                    this.form.requests.push({
                        id: this.techRequest._id,
                        status: this.techRequest.status
                    });


                   console.log(this.form);
                    console.log("adding organization to DB...");
                    this.$store.dispatch('addOrganization', this.form);
                
                
            }
        }
    }
}
</script>