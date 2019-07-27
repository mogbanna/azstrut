<template>
  <div class="row">
    <div class="col-lg-8 col-md-7" v-loading="organizationLoadStatus == 1">
       <card>
        <h5 slot="header" class="title text-center">Organization</h5>
        <form>
            <collapse :active-index="0">
                <collapse-item title="Legal Information" name="1">
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Type</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.organization_type }}</h6>
                        </div>
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">EIN</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.ein }}</h6>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">ACC File #</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.acc_file.number }}</h6>
                        </div>
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">ACC Listing Link</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.acc_file.listing_link }}</h6>
                        </div>
                    </div>
                </collapse-item>
                <collapse-item title="Primary Contact" name="2">
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Full Name</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.primary_contact.full_name }}</h6>
                        </div>
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Role</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.primary_contact.role }}</h6>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Email</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.primary_contact.email }}</h6>
                        </div>
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Phone #</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.primary_contact.phone }}</h6>
                        </div>
                    </div>                    
                </collapse-item>
                <collapse-item title="Secondary Contact" name="3">
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Full Name</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.secondary_contact.full_name }}</h6>
                        </div>
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Role</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.secondary_contact.role }}</h6>
                        </div>
                    </div>
                    <div class="row mt-3 mb-6">
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Email</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.secondary_contact.email }}</h6>
                        </div>
                        <div class="col-md-6">
                            <h6 class="card-title text-muted">Phone</h6>
                            <h6 class="card-subtitle mb-2 text-primary">{{ organization.secondary_contact.phone }}</h6>
                        </div>
                    </div>
                </collapse-item>
            </collapse>
            <!-- BEGIN LEGAL INFO -->
            <!-- <h5 class="title">Legal Information</h5> -->
            
            
            <!-- END LEGAL INFO -->
            <!-- BEGIN PRIMARY CONTACT -->
            <!-- <h5 class="title">Primary Contact</h5> -->
            <!-- <hr> -->
            
            <!-- END PRIMARY CONTACT -->
            <!-- BEGIN SECONDARY CONTACT -->
                <!-- <h5 class="title">Secondary Contact</h5> -->
            
            <!-- if NO Secondary Contact entered -->
            <!-- <div v-else>
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="card-subtitle mb-2 text-muted">N/A</h6>
                    </div>
                </div>
            </div> -->
            <!-- END SECONDARY CONTACT -->
            <!-- NOTES -->
            <hr>
            <p>Notes</p>
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
            <div v-if="showT1 || showT2 || showT3">
                <tab-pane ref="tab-1" v-if="showT1" v-loading="" label="Tech Requests">
                    Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
                    users after installed base benefits.
                    <br><br>
                    Dramatically visualize customer directed convergence without revolutionary ROI.
                </tab-pane>

                <tab-pane ref="tab-2" v-if="showT2" v-loading="" label="Camps">
                    Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
                    deliverables for real-time schemas.
                    <br><br>Dramatically maintain clicks-and-mortar solutions without functional solutions.
                </tab-pane>

                <tab-pane ref="tab-3" v-if="showT3" v-loading="" label="Donations">
                    Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
                    deliverables for real-time schemas.
                    <br><br>Dramatically maintain clicks-and-mortar solutions without functional solutions.
                </tab-pane>
            </div>
            <div v-else>
                <tab-pane ref="tab-4" label="Details">
                    <strong> Looks like this organization doesn't have any extra information associated with it yet.</strong>
                    <br>
                    Once an organization has made requests for tech, a camp, or made a donation,
                    options to view the associated inormation here.
                </tab-pane>
            </div>
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
import { Tabs, TabPane, Collapse, CollapseItem } from '@/components'
import { Table, TableColumn } from 'element-ui'
import { functor } from 'd3';
import { CONFIG } from '../../../config.js'

export default {
    data() {
        return {
            orgImg: 'img/noThumb.png',
            showT1: false,
            showT2: true,
            showT3: false,
            secondaryContact: false,
            requestsTable: [],
            campsTable: [],
            donationsTable: []
        };
    },
    components: {
        Tabs,
        TabPane,
        Collapse,
        CollapseItem,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
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
                //load image
                if(this.organization.thumbnail_name.length > 1){
                    this.orgImg = CONFIG.REMOTE_DB_URL + '/' +
                        this.organization._id + '/' + this.organization.thumbnail_name;
                }
                //check for organization.requests 

                //check for organization.camps

                //check for organization.donations
            }
        }
        
    },
    methods: {
        
    },
}
</script>
