<template>
    <div>
        <div class="row justify-content-around">
            <div id="mainCol" class="col-8">
                <div id="requestInfoRow" class="row">
                    <card>
                        <div class="row" slot="header">
                            <div class="col-8">
                                <h4 class="card-title">Equiptment Request</h4>
                            </div>
                            <div class="col-3 pt-2">
                                <el-tag style="width: 100%">{{ techRequest.status }}</el-tag>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row" id="numEqupitment">
                                <div class="card card-stats card-raised">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="statistics">
                                                    <div class="info">
                                                        <div class="icon icon-default">
                                                            <i class="now-ui-icons tech_laptop"></i>
                                                        </div>
                                                        <h3 class="info-title text-primary">
                                                            <animated-number :value="techRequest.num_laptops"></animated-number>
                                                        </h3>
                                                        <h6 class="stats-title">Laptops</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="statistics">
                                                    <div class="info">
                                                        <div class="icon icon-default">
                                                            <i class="now-ui-icons tech_tv"></i>
                                                        </div>
                                                        <h3 class="info-title text-primary">
                                                            <animated-number :value="techRequest.num_desktops"></animated-number>
                                                        </h3>
                                                        <h6 class="stats-title">Desktops</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <card class="card-contributions">
                                    <div class="row justify-content-center" slot="header">
                                        <h5 class="text-muted">Organization Details</h5>
                                    </div>
                                    <collapse :active-index="0">
                                        <collapse-item title="General Information" name="0">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Name</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.name }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Legal Name</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.legal_name }}</h6>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Website</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.website }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Social Media</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.social_media }}</h6>
                                                </div>
                                            </div>
                                        </collapse-item>
                                        <collapse-item title="Legal Information" name="1">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Type</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.organization_type }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">EIN</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.ein }}</h6>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">ACC File #</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.acc_file.number }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">ACC Listing Link</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.acc_file.listing_link }}</h6>
                                                </div>
                                            </div>
                                        </collapse-item>
                                        <collapse-item title="Primary Contact" name="2">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Full Name</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.primary_contact.full_name }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Role</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.primary_contact.role }}</h6>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Email</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.primary_contact.email }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Phone #</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.primary_contact.phone }}</h6>
                                                </div>
                                            </div>                    
                                        </collapse-item>
                                        <collapse-item title="Secondary Contact" name="3">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Full Name</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.secondary_contact.full_name }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Role</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.secondary_contact.role }}</h6>
                                                </div>
                                            </div>
                                            <div class="row mt-3 mb-6">
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Email</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.secondary_contact.email }}</h6>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="card-title text-muted">Phone</h6>
                                                    <h6 class="card-subtitle mb-2 text-primary">{{ techRequest.organization.secondary_contact.phone }}</h6>
                                                </div>
                                            </div>
                                        </collapse-item>
                                    </collapse>
                                    <!-- NOTES -->
                                    <p>Notes</p>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p class="blockquote blockquote-primary">
                                                {{ techRequest.organization.notes }}
                                            </p>
                                        </div>
                                    </div>
                                        <!-- END NOTES -->
                                    <!-- <p class="card-description">
                                        After a very successful two-year run, we’re going to be changing the way that contributions work.
                                    </p> -->

                                    <div class="row" slot="footer">
                                        <div class="col-6">
                                            <div class="card-stats justify-content-center">
                                                <!-- <n-switch v-model="allContributions" on-text="ON" off-text="OFF"></n-switch>
                                                <span>All public contributions</span> -->
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="card-stats justify-content-center">
                                                <!-- <n-switch v-model="pastWeekContributions" on-text="ON" off-text="OFF"></n-switch>
                                                <span>Past week contributions</span> -->
                                            </div>
                                        </div>
                                    </div>
                                </card>
                                <!-- END ORGANIZATION INFO CARD -->

                            </div>
                        </div>
                    </card>
                    <!-- END REQUEST DETAILS CARD -->

                </div>
                <!-- END REQUEST INFO ROW -->

                <!-- BEGIN TODO ROW -->
                <div class="row" id="toDoRow">
                    <card class="card-tasks" no-footer-line>
                        <template slot="header">
                            <h5 class="title">Task List</h5>
                            <p class="category">Backend Development</p>
                        </template>

                        <div class="table-full-width table-responsive">
                            <n-table :data="taskData">
                            <template slot-scope="{row}">
                                <td>
                                <checkbox v-model="row.done"></checkbox>
                                </td>
                                <td class="img-row">
                                <div class="img-wrapper img-raised">
                                    <img :src="row.image" class="img-raised">
                                </div>
                                </td>
                                <td class="text-left">{{row.message}}</td>
                                <td class="td-actions text-right">
                                <button type="button" rel="tooltip" title=""
                                        class="btn btn-info btn-round btn-icon btn-icon-mini btn-neutral"
                                        data-original-title="Edit Task">
                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                </button>
                                <button type="button" rel="tooltip" title=""
                                        class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral"
                                        data-original-title="Remove">
                                    <i class="now-ui-icons ui-1_simple-remove"></i>
                                </button>
                                </td>
                            </template>
                            </n-table>
                        </div>

                        <template slot="footer">
                            <hr>
                            <i class="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago
                        </template>
                    </card>
                </div>
                <!-- END TODO ROW -->

            </div>
            <!-- END MAIN COLUMN -->

            <!-- BEGIN RIGHT COLUMN -->
            <div class="col-3 ml-1">

                <div class="row card">
                    <div class="col">
                        <n-button>One</n-button>
                    </div>
                    <div class="col">
                        <n-button>two</n-button>
                    </div>
                    <div class="col">
                        <n-button>three</n-button>
                    </div>
                </div>
                <div id="notesRow" class="row">
                    <card>
                        <div slot="header">
                            <!-- allow user to submit the note by hitting enter -->
                            <h6 class="card-title text-mute">
                                Request Notes:
                            </h6>
                            <fg-input>
                                <textarea class="form-control"
                                        placeholder="Additional notes"
                                        v-model="input.note">
                                </textarea>
                            </fg-input>
                        </div>
                        <el-container>
                            <el-container>
                                    <el-timeline reverse>
                                        <!-- <el-timeline-item timestamp="2018/4/12" placement="top">
                                        <el-card>
                                            <h4>Update Github template</h4>
                                            <p>Tom committed 2018/4/12 20:46</p>
                                        </el-card>
                                        </el-timeline-item> -->
                                            <el-timeline-item
                                                v-for="(note, index) in techRequest.notes"
                                                :key="index"
                                                :color="note.color"
                                                :size="note.size"
                                                :timestamp="note.submitted_on">
                                                {{note.text}}
                                            </el-timeline-item>
                                        </el-timeline>
                            </el-container>
                        </el-container>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    StatsCard,
    Table as NTable,
    Checkbox,
    Collapse,
    CollapseItem,
    AnimatedNumber
} from '@/components';

import {
    Container,
    Timeline,
    TimelineItem,
    Select,
    Option,
    Tag
} from 'element-ui';

export default {
    components: {
        StatsCard,
        NTable,
        Checkbox,
        [Container.name]: Container,
        [Timeline.name]: Timeline,
        [TimelineItem.name]: TimelineItem,
        [Select.name]: Select,
        [Option.name]: Option,
        [Tag.name]: Tag,
        Collapse,
        CollapseItem,
        AnimatedNumber
    },
    data() {
        return { 
            input: {
                note: ""
            },
            techRequest: {
                num_laptops: 40,
                num_desktops: 20,
                organization: {
                    name: "IBEX Youth Academy",
                    legal_name: "No legal name",
                    website: "www.ibex.org",
                    social_media: "facebook",
                    organization_type: "Other NonProfit",
                    ein: "2327DASf",
                    acc_file: {
                        number: "45673hsadf",
                        listing_link: "www.listinglink.com/IBEX",
                    },
                    primary_contact: {
                        full_name: "Anna Agboola",
                        role: "Board Member",
                        email: "aa@ibex.com",
                        phone: "708-773-8676",
                    },
                    secondary_contact: {
                        full_name: "Erika Edmounds",
                        role: "Non Board Member",
                        email: "ee@ibex.com",
                        phone: "773-657-8676",
                    },
                    notes: "We have a new tech department opening up and we would be using the laptops for the kids we already have in our organization"
                },
                status: "New",
                notes: [{
                    text: "Spoke with Jerry from IT. He said he'd email me the links for the organizatin's social media",
                    submitted_by: "Maryanna M",
                    submitted_on: "Feb. 12, 2019",
                    color: '#0bbd87',
                },
                {
                    text: "Images on website suggest international work",
                    submitted_by: "Maryanna M",
                    submitted_on: "Feb. 12, 2019"
                },
                {
                    text: "All submitted info from form checks out!",
                    submitted_by: "Joe Shmoe",
                    submitted_on: "Feb. 16, 2019"
                },
                {
                    text: "Approved for phone discussion",
                    submitted_by: "Maryanna M",
                    submitted_on: "Feb. 12, 2019"
                },
                {
                    text: "Sandy explained organiation will be opening a tech lab for children in AZ. Desktops will be used to help tech basic computer literacy to children",
                    submitted_by: "Maryanna M",
                    submitted_on: "April. 9, 2019"
                },
                {
                    text: "Scheduled Pcikup",
                    submitted_by: "Maryanna M",
                    submitted_on: "April. 10, 2019"
                },
                {
                    text: "Scheduled Pcikup",
                    submitted_by: "Maryanna M",
                    submitted_on: "April. 10, 2019"
                },
                {
                    text: "Scheduled Pcikup",
                    submitted_by: "Maryanna M",
                    submitted_on: "April. 10, 2019"
                },
                {
                    text: "Scheduled Pcikup",
                    submitted_by: "Maryanna M",
                    submitted_on: "April. 10, 2019"
                }
                ],
            },
            taskData: [{
                    message: 'Sign contract for "What are conference organizers afraid of?"',
                    done: true,
                    image: 'img/emilyz.jpg'
                },
                {
                    message: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
                    done: false,
                    image: 'img/james.jpg'
                },
                {
                    message: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
                    done: true,
                    image: 'img/mike.jpg'
                }
            ],
            requestStatuses: [{
                    value: "On Hold",
                    label: "On Hold",
                },
                {
                    value: "Deny",
                    label: "Deny"
                },
                {
                    value: "Approve",
                    lable: "Approve"
                }
            ]
        }
    },
}
</script>
