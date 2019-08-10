<template>
  <div class="row justify-content-center">
    <div class="col-lg-10 col-md-9" v-loading="organizationLoadStatus == 1">
       <card>
            <h5 slot="header" class="title text-center">Organization</h5>
            <form>
                <collapse :active-index="0">
                    <collapse-item title="General Information" name="0">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="card-title text-muted">Name</h6>
                                <h6 class="card-subtitle mb-2 text-primary">{{ organization.name }}</h6>
                            </div>
                            <div class="col-md-6">
                                <h6 class="card-title text-muted">Legal Name</h6>
                                <h6 class="card-subtitle mb-2 text-primary">{{ organization.legal_name }}</h6>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <h6 class="card-title text-muted">Website</h6>
                                <h6 class="card-subtitle mb-2 text-primary">{{ organization.website}}</h6>
                            </div>
                        </div>
                    </collapse-item>
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
                //load the tr's associated with this organization
            }
        }
        
    },
    methods: {
        
    },
}
</script>
