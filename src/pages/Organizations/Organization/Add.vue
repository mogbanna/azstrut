<template>
<div class="col">
    <form @submit.prevent="addOrganization">
        <div class="row">
            <div class="col-lg-8 col-md-7">
            <card>
                <h5 slot="header" class="title">Add Organization</h5>
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
            </div>
            <div class="col-lg-4 col-md-5">
                <card class="card-user">
                    <div slot="image" class="image">
                        <img src="img/motherBoards.jpg" alt="...">
                    </div>
                    <div>
                        <div class="author">
                            <div class="row justify-content-center">
                                <div class="col-sm-4">
                                    <div class="picture-container">
                                    <el-upload class="picture"
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :on-change="handlePreview"
                                                :auto-upload="false"
                                                :show-file-list="false">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar border-gray picture-src">
                                    </el-upload>
                                    <h6 class="description">Choose Picture</h6>
                                    </div>
                                </div>
                            </div>
                            <!-- <a href="#"> -->
                            <!-- <img class="avatar border-gray" src="img/mike.jpg" alt="..."> -->
                            <!-- <h5 class="title">Mike Andrew</h5> -->
                            <fg-input type="text"
                                        label="Legal Name"
                                        placeholder="Legal Name"
                                        v-model="form.name"
                                        v-validate="'required'"
                                        name="legal name"
                                        :error="getError('legal name')"
                                        >
                            </fg-input>
                            <fg-input type="text"
                                        label="Legal Organization (if different from above)"
                                        placeholder="Legal Organization"
                                        v-model="form.legal_organization"
                                        >
                            </fg-input>
                            <!-- </a>
                            <p class="description">
                            michael24
                            </p> -->
                        </div>
                        <p class="description text-center">
                            <fg-input type="text"
                                        label="Website"
                                        placeholder="Website"
                                        v-model="form.website">
                            </fg-input>
                        </p>
                        </div>
                        <div slot="footer" class="button-container">
                            <h6>click to add social media links</h6>
                        <n-button @click.native="modalUp('facebook')" type="neutral" icon round size="lg">
                            <i class="fa fa-facebook-square"></i>
                        </n-button>
                        <n-button @click.native="modalUp('twitter')" type="neutral" icon round size="lg">
                            <i class="fa fa-twitter"></i>
                        </n-button>
                        <n-button @click.native="modalUp('instagram')" type="neutral" icon round size="lg">
                            <i class="fa fa-instagram"></i>
                        </n-button>
                        <n-button @click.native="modalUp('google-plus')" type="neutral" icon round size="lg">
                            <i class="fa fa-google-plus-square"></i>
                        </n-button>
                    </div>
                    <modal :show.sync="modals.mini" class="modal-primary" :show-close="false" header-classes="justify-content-center" type="mini">
                        <h6 slot="header"> 
                            Paste social media link below for {{ modals.social }}
                        </h6>
                        <fg-input type="text"
                            :placeholder="'ex. ' + modals.social + '.com/myProfile'"
                            v-model="modals.link">
                        </fg-input>
                        <template slot="footer">
                            <n-button wide type="default" @click.native="addMedia(modals.link)">Add</n-button>
                        </template>
                    </modal>
                </card>
            </div>
        </div>
    <div class="row justify-content-center">
        <n-button slot="footer"
                    type="primary"
                    native-type="submit"
                    block
                    size="lg">
            Add New Organization
          </n-button>
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
                name: 'AZSSoCool',
                legal_organization: 'AZSoCool NON PROFIT',
                primary_contact: {
                    full_name: 'Maryanna Milton',
                    role: 'Board Member',
                    email: 'mmm@socool.com',
                    phone: '773-212-8954',
                },
                secondary_contact: {
                    full_name: 'Edwin Mcdonald',
                    role: 'Board Member',
                    email: 'edwin@socool.com',
                    phone: '312-398-0986'
                },
                organization_type: '',
                website: 'www.wearesocool.com',
                social_media: [],
                ein: 'ABCD-1234',
                acc_file: {
                    number: '87654',
                    listing_link: 'www.fileLink.com/us'
                },
                requests: [],
                camps: [],
                thumbnail_name: '',
                _attachments: {},
                notes: 'This organization is Too Cool',
                created_by: {},
                created_at: [],
                updated_at: []
            },
            imageUrl: 'img/default-avatar.png',
            upLoadName: '',
            select_display: [{value: "hi", label: 'bye'}],
            modals: {
                mini: false,
                social: '',
                link: ''
          }
        };
    },
    created() {
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
        addOrganizationLoadStatus() {
            return this.$store.getters.getAddOrganizationLoadStatus;
        },
        addOrganizationResponse() {
            return this.$store.getters.getAddOrganizationResponse;
        }
    },
    watch: {
        addOrganizationLoadStatus: function(val) {
            if(val == 2){
                console.log('We added it!');
            }
        }
    },
    methods: {
        addMedia(link){
            if(link){
                this.form.social_media.push({
                    label: this.modals.social,
                    value: link
                });
            };
            this.modals.mini = false;
        },
        modalUp(type) {
            this.modals.social = type;
            this.modals.link = '';
            //open the modal
            this.modals.mini = true;
        },
        handlePreview(file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.upLoadName = file;
        },
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

                    //add the uploaded image to the organization to be saved in the DB
                    if(this.upLoadName !== ""){
                        console.log(this.upLoadName);
                        this.form._attachments[this.upLoadName.name] = {};
                        this.form._attachments[
                            this.upLoadName.name
                        ][
                            'content_type'
                        ] = this.upLoadName.raw.type;
                        this.form._attachments[
                            this.upLoadName.name
                        ][
                            'data'
                        ] = this.upLoadName.raw;
                    }
                    this.form.thumbnail_name = this.upLoadName.name;

                    let regex = /[^a-zA-Z0-9]/g;                      //only allow letters and numbers using regular expression matching
                    //create UUID for org _id using EIN & org name
                    this.form._id = this.form.ein.replace(regex, "").toLowerCase() 
                                    + "!" 
                                    + this.form.name.replace(regex, "").toLowerCase();



                    console.log(this.form._id);
                    console.log("adding organization to DB...");
                    // this.$store.dispatch('addOrganization', this.form);
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