<template>
  <div class="row">
    <div class="col-lg-8 col-md-7">
       <card>
        <h5 slot="header" class="title text-center">Organization</h5>
        <form>
            <!-- BEGIN LEGAL INFO -->
            <h5 class="title">Legal Information</h5>
            <!-- <div class="row blockquote mb-0 mx-1">
                <h6 class="card-title ml-1"><small>Type</small></h6>
                <h6 class="card-title text-primary ml-auto mr-1">{{ organization.organization_type }}</h6>
            </div>
            <div class="row blockquote mb-0 mx-1">
                <h6 class="card-title ml-1"><small>EIN</small></h6>
                <h6 class="card-title text-primary text-muted ml-auto mr-1">{{ organization.ein }}</h6>
            </div>
            <div class="row blockquote mb-0 mx-1">
                <h6 class="card-title ml-1"><small>ACC File</small></h6>
                <h6 class="card-title text-primary text-muted ml-auto mr-1">{{ organization.acc_file.number }}</h6>
            </div>
            <div class="row blockquote mb-0 mx-1">
                <h6 class="card-title ml-1"><small>Listing Link</small></h6>
                <h6 class="card-title text-primary text-muted ml-auto mr-1">{{ organization.acc_file.listing_link }}</h6>
            </div> -->
            <div class="row">
                <div class="col-md-6">
                    <h6 class="card-title text-primary">Type</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.organization_type }}</h6>
                </div>
                <div class="col-md-6">
                    <h6 class="card-title text-primary">EIN</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.ein }}</h6>
                </div>
            </div>
            <div class="row mt-3 mb-4">
                <div class="col-md-6">
                    <h6 class="card-title text-primary">ACC File #</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.acc_file.number }}</h6>
                </div>
                <div class="col-md-6">
                    <h6 class="card-title text-primary">ACC Listing Link</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.acc_file.listing_link }}</h6>
                </div>
            </div>
            <!-- END LEGAL INFO -->
            <!-- BEGIN PRIMARY CONTACT -->
            <h5 class="title">Primary Contact</h5>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <h6 class="card-title text-primary">Full Name</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.full_name }}</h6>
                </div>
                <div class="col-md-6">
                    <h6 class="card-title text-primary">Role</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.role }}</h6>
                </div>
            </div>
            <div class="row mt-3 mb-4">
                <div class="col-md-6">
                    <h6 class="card-title text-primary">Email</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.email }}</h6>
                </div>
                <div class="col-md-6">
                    <h6 class="card-title text-primary">Phone #</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.phone }}</h6>
                </div>
            </div>
            <!-- END PRIMARY CONTACT -->
            <!-- BEGIN SECONDARY CONTACT -->
                <h5 class="title">Secondary Contact</h5>
            <div v-if="secondaryContact">
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="card-title text-primary">Full Name</h6>
                        <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.full_name }}</h6>
                    </div>
                    <div class="col-md-6">
                        <h6 class="card-title text-primary">Role</h6>
                        <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.role }}</h6>
                    </div>
                </div>
                <div class="row mt-3 mb-6">
                    <div class="col-md-6">
                        <h6 class="card-title text-primary">Email</h6>
                        <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.email }}</h6>
                    </div>
                    <div class="col-md-6">
                        <h6 class="card-title text-primary">Phone</h6>
                        <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.phone }}</h6>
                    </div>
                </div>
            </div>
            <!-- if NO Secondary Contact entered -->
            <div v-else>
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="card-subtitle mb-2 text-muted">N/A</h6>
                    </div>
                </div>
            </div>
            <!-- END SECONDARY CONTACT -->
            <!-- NOTES -->
            <hr>
            <h5 class="title">Notes</h5>
            <div class="row">
                <div class="col-md-12">
                    <p class="blockquote blockquote-primary">
                        {{ organization.notes }}
                    </p>
                </div>
            </div>
            <!-- END NOTES -->
        </form>
        <hr>
        <!-- START REQEST AND CAMP TABS -->
        <tabs type="primary">
            <tab-pane ref="tab-1" v-if="showT1" label="Tech Requests">
                Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
                users after installed base benefits.
                <br><br>
                Dramatically visualize customer directed convergence without revolutionary ROI.
            </tab-pane>

            <tab-pane ref="tab-3" v-else label="Details">
                <strong> Looks like this organization doesn't have any extra information with it yet.</strong>
                <br>
                Once an organization has made requests for tech, a camp, or made a donation,
                options to view the associated inormation here.
            </tab-pane>

            <tab-pane ref="tab-2" v-if="showT2" label="Camps">
                Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
                deliverables for real-time schemas.
                <br><br>Dramatically maintain clicks-and-mortar solutions without functional solutions.
            </tab-pane>

            <tab-pane ref="tab-3" v-if="showT2" label="Donations">
                Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
                deliverables for real-time schemas.
                <br><br>Dramatically maintain clicks-and-mortar solutions without functional solutions.
            </tab-pane>
            
        </tabs>
        <!-- END TABS -->
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
                                <img class="avatar border-gray picture-src" :src="orgImg">
                            </el-upload>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                    <!-- <img class="avatar border-gray" :src="orgImg" alt="..."> -->
                    <h5 class="title">{{ organization.name }}</h5>
                    </a>
                    <p class="description">
                    {{ organization.legal_name }}
                    </p>
                </div>
                <p class="description text-center">
                    {{ organization.website }}
                </p>
                </div>
                <div slot="footer" class="button-container">
                    <h6>click to add social media links</h6>
                <n-button href="" type="neutral" icon round size="lg">
                    <i class="fa fa-facebook-square"></i>
                </n-button>
                <n-button href="" type="neutral" icon round size="lg">
                    <i class="fa fa-twitter"></i>
                </n-button>
                <n-button href="" type="neutral" icon round size="lg">
                    <i class="fa fa-instagram"></i>
                </n-button>
                <n-button href="" type="neutral" icon round size="lg">
                    <i class="fa fa-google-plus-square"></i>
                </n-button>
            </div>
        </card> 

    </div>
  </div>



</template>
<script>
import {Tabs, TabPane} from '@/components'
import { functor } from 'd3';
import { CONFIG } from '../../../config.js'

export default {
    data() {
        return {
            orgImg: 'img/noThumb.png',
            showT1: false,
            showT2: false,
            showT3: false,
            secondaryContact: false
        };
    },
    components: {
        Tabs,
        TabPane
    },
    created() {
        this.$store.dispatch('loadOrganization', {
            id: this.$route.params.organizationId
        });
    },
    computed: {
        organization() {
            return this.$store.getters.getOrganization;
        },
        organizationLoadStatus() {
            return this.$store.getters.getOrganizationLoadStatus;
        }
    },
    watch: {
        organizationLoadStatus: function(val) {
            if(val == 2) {
                if(this.organization.thumbnail_name.length > 1){
                    this.orgImg = CONFIG.REMOTE_DB_URL + '/' +
                        this.organization._id + '/' + this.organization.thumbnail_name;
                }
            }
        }
        
    },
    methods: {
        
    },
}
</script>
