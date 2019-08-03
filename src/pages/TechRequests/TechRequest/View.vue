<style scoped>
    #statusTag {
        border-radius: 0;
        font-size: 12px;
        text-align: center;
        width: 100%;
    }
</style>

<template>
    <div>
        <div class="row justify-content-around">
            <div id="mainCol" class="col-8">

                <!-- BEGIN TODO ROW -->
                <div class="row" id="toDoRow">
                    <card class="card-tasks" no-footer-line v-if="organization_verified">
                        <template slot="header">
                            <h6 class="title">Todo List</h6>
                            <p class="category mt-1 mb-0">Keep a list of what needs to be done next with this Equiptment Request</p>
                        </template>

                        <div class="table-full-width table-responsive pt-0">
                            <el-table 
                                :data="techRequest.todos"
                                >
                                    <el-table-column 
                                        prop="done"
                                        min-width="15"
                                        column-key="done"
                                        >
                                            <template slot-scope="scope">
                                                <el-checkbox :checked="scope.row.done" ></el-checkbox>
                                            </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="message"
                                        min-width="100"
                                        column-key="message"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        align="right">
                                            <template slot-scope="scope">
                                                <button type="button" rel="tooltip" title=""
                                                    class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral"
                                                    data-original-title="Remove"
                                                    @click="removeTodo(scope.$index)">
                                                <i class="now-ui-icons ui-1_simple-remove"></i>
                                            </button>
                                            </template>
                                    </el-table-column>
                            </el-table>
                        </div>

                        <template slot="footer">
                            <hr>
                            <div class="row">
                                <div class="col-6">
                                    <fg-input
                                        type="text"
                                        placeholder="New Todo"
                                        v-model="input.todo">

                                    </fg-input>
                                </div>
                                <div class="col-6">
                                    <button
                                        type="button"
                                        class="btn btn-info btn-round btn-icon btn-icon-mini btn-info"
                                        v-on:click="addTodo(input.todo)">
                                            <i class="now-ui-icons ui-1_simple-add"></i>
                                    </button>
                                </div>
                            </div>
                            <!-- <i class="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago -->
                        </template>
                    </card>
                </div>
                <!-- END TODO ROW -->

                <!-- BEGIN REQUEST INFO ROW -->
                <div id="requestInfoRow" class="row">
                    <card>
                        <div class="row" slot="header">
                            <div class="col-8">
                                <h5 class="title">Equiptment Request</h5>
                            </div>
                            <div class="col-3 pt-2">
                                <el-tag id="statusTag" :type="techRequest.status === 'new' ? 'brand color'
                                                        : techRequest.status === 'in review' ? 'info'
                                                        : techRequest.status === 'approved' ? 'success'
                                                        : techRequest.status === 'hold' ? 'warning'
                                                        : 'danger'">
                                    {{ techRequest.status }}
                                </el-tag>
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
            </div>
            <!-- END MAIN COLUMN -->

<!-- FIGURE OUT HOW TO SET A LIMIT ON THE SIZE OF THE NOTES TIMELINE SO THAT IT IS SCROLLABLE! -->
            <!-- BEGIN RIGHT COLUMN -->
            <div class="col-3 ml-1">

                <!-- BEGIN STATUS UPDATE / VERIFY ORG ROW -->
                <div class="row"  v-loading="organizationsLoadStatus == 1">
                    <card>
                        <div slot="header" class="text-center">
                            <h5 class="title text-danger" v-if="!organization_verified">Please Verify Organization !</h5>
                            <h6 class="title" v-else>Update Status</h6>
                        </div>
                        <div class="cardbody py-0" v-if="!organization_verified">
                            <div class="row">
                                <el-table
                                    ref="orgTable"
                                    stripe
                                    :data="searchResult"
                                    empty-text="No Matches Yet"
                                    style="width: 100%"
                                    highlight-current-row
                                    @current-change="handleCurrentChange"
                                    >
                                <el-table-column
                                    label="Saved Organizations"
                                    prop="name">
                                </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="card-body py-0" v-else>
                            <div class="row">
                                <n-button 
                                    type="success" 
                                    block 
                                    
                                    @click.native="confirmStatusUpdate('approved')">
                                    <i class="now-ui-icons ui-2_like"></i>
                                    Approve
                                </n-button>
                            </div>
                            <div class="row">
                                    <n-button 
                                        class="col" 
                                        type="warning" 
                                        block                                        
                                        @click.native="confirmStatusUpdate('hold')">
                                        Hold
                                    </n-button>
                                    <n-button 
                                        class="col" 
                                        type="danger" 
                                        simple 
                                        block 
                                        @click.native="confirmStatusUpdate('denied')">
                                        Deny
                                    </n-button>
                            </div>
                        </div>
                    </card>
                </div>
                <!-- END STATUS UPDATE / VERIFY ORGANIZATION ROW -->

                <!-- BEGIN NOTES ROW -->
                <div id="notesRow" class="row">
                    <card v-if="organization_verified">
                        <div slot="header">
                            <h6 class="title">Notes</h6>
                            <!-- allow user to submit the note by hitting enter -->
                            <fg-input>
                                <textarea 
                                    v-on:keyup.enter="addNote(input.note)"
                                    class="form-control"
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
                                                :timestamp="note.submitted_on"
                                                placement="top">
                                                {{note.text}}
                                                <br>
                                                <span style="color: #409EFF">-{{ note.submitted_by }}</span>
                                            </el-timeline-item>
                                        </el-timeline>
                            </el-container>
                        </el-container>
                    </card>
                </div>
                <!-- END NOTES ROW -->
            </div>

        </div>
    </div>
</template>
<script>
import {
    CONFIG
} from '@/config.js'
import moment from 'moment';
import {
    StatsCard,
    Table as NTable,
    // Checkbox,
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
    Tag,
    Checkbox,
    Button
} from 'element-ui';
import swal from 'sweetalert2';

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
        AnimatedNumber,
        [Checkbox.name]: Checkbox,
        [Button.name]: Button
    },
    data() {
        return {
            statusTagColor: "",
            input: {
                note: "",
                todo: ""
            },
            defaultTodos: [{
                    message: 'Verify all information submitted by organization',
                    done: false,
                },
                {
                    message: 'Check that organization is active via ACC',
                    done: false,
                },
                {
                    message: 'Visit social media pages of organization',
                    done: false,
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
            ],
            currentRow: null,
            organization_verified: false,
            searchResult: []
        };
    },
    mounted() {

    },
    created() {

        //make sure to check for what the current status is and set the color accordingly
        this.$store.dispatch('loadTechRequest', {
            id: this.$route.params.techRequestId
        });
        //load user info
        this.$store.dispatch('loadUser', {
            username: this.$store.getters.getUserSession.userCtx.name
        });
    },
    computed: {
        techRequest() {
            return this.$store.getters.getTechRequest;
        },
        techRequestLoadStatus() {
            return this.$store.getters.getTechRequestLoadStatus;
        },
        organizations() {
            return this.$store.getters.getOrganizations;
        },
        organizationsLoadStatus() {
            return this.$store.getters.getOrganizationsLoadStatus;
        },
        user() {
            return this.$store.getters.getUser;
        },
        userLoadStatus() {
            return this.$store.getters.getUserLoadStatus;
        },
        // userSession() {
        //     return this.$store.getters.getUserSession;
        // },
        // userSessionLoadStatus() {
        //     return this.$store.getters.getUserSessionLoadStatus;
        // }
        updateTechRequestLoadStatus() {
            return this.$store.getters.getUpdateTechRequestLoadStatus;
        },
        updateTechRequestResponse() {
            return this.$store.getters.getUpdateTechRequestResponse;
        }
    },
    watch: {
        techRequestLoadStatus: function (val) {
            if (val == 2) {

                //check if this is the first time opening the techRequest
                if (this.techRequest.status === "new") {

                    //determine whether or not organization has been verified and added to the DB yet
                    this.$store.dispatch('searchOrganizations', {
                        query: this.techRequest.organization.name,
                        fields: ['name'],
                        limit: 50,
                        skip: 0
                    });

                    //update the status
                    this.techRequest.status = 'in review';

                    //set the default todo list
                    this.techRequest.todos = this.defaultTodos;

                    //add the first note
                    this.techRequest.notes.push({
                        text: "Request received",
                        submitted_by: this.user.first_name + " " + this.user.last_name.charAt(0).toUpperCase() + ".",
                        submitted_on: moment().format("LL")
                    });

                    //update the request in the DB
                    this.$store.dispatch('updateTechRequest', this.techRequest);
                }
                this.organization_verified = true;
            }
        },
        organizationsLoadStatus: function (val) {
            if (val == 2) {
                let orgs = this.organizations;

                /*if more than one organization returned, display table to user 
                so they can choose which organization will be associated with this request */
                if (orgs.total_rows > 1) {
                    /*loop through each organization and provide the 
                    name in the table for the user to select
                    if user selects a name, we need to update the 
                    information displayed on the form with the
                    in the database */
                    orgs.rows.forEach(org => {
                        let temp = {};
                        temp.id = org.doc._id;
                        temp.name = org.doc.name;
                        this.searchResult.push(temp);
                    });
                } else if (orgs.total_rows == 1) {
                    //only one match for organization in DB, so user can continue editing tech request
                    this.organization_verified = true;
                } else {
                    //there are no organizations matching this request, so use needs to go add the organization
                    // this.$router.push({
                    //     path: ''
                    // });
                }
            }
        },
        techRequest: {
            handler(val) {
                // console.log(val);
                // console.log('_____________');
                // console.log(newV);
            },
            deep: true
        },
        updateTechRequestLoadStatus: function (val) {
            if (val == 2) {
                console.log('Updated request successfully');

                //reload the tech request so we can have the right _rev number for next update
                this.$store.dispatch('loadTechRequest', {
                    id: this.$route.params.techRequestId
                });

            }
        }
    },
    methods: {
        addNote(text) {
            if (text.length > 1) {
                let t = text;
                let by = this.user.first_name + " " + this.user.last_name.charAt(0) + "."; //change to logged in user's name
                let on = moment().format('LL'); //change to today's date using monment

                this.techRequest.notes.push({
                    text: t,
                    submitted_by: by,
                    submitted_on: on
                });
                this.$message({
                    message: 'Note added successfully',
                    type: 'success'
                });
                //update the DB
                this.$store.dispatch('updateTechRequest', this.techRequest);
            }
            this.input.note = "";
        },
        updateStatus(status) {

            let text = "Report's status changed to '" + status + "'.";
            let submitted_by = this.user.first_name + " " + this.user.last_name.charAt(0) + ".";
            let submitted_on = moment().format('LL');
            let color = "";

            switch (status) {

                case "approved":
                    this.techRequest.status = "approved";
                    color = "#67C23A";
                    this.techRequest.notes.push({
                        text: text,
                        submitted_by: submitted_by,
                        submitted_on: submitted_on,
                        color: color
                    });
                    break;

                case "hold":
                    this.techRequest.status = "hold";
                    color = "#E6A23C";
                    this.techRequest.notes.push({
                        text: text,
                        submitted_by: submitted_by,
                        submitted_on: submitted_on,
                        color: color
                    });
                    break;

                case "denied":
                    this.techRequest.status = "denied";
                    color = "#F56C6C";
                    this.techRequest.notes.push({
                        text: text,
                        submitted_by: submitted_by,
                        submitted_on: submitted_on,
                        color: color
                    });
                    break;
                default:
                    break;
            }
            //update DB
            this.$store.dispatch('updateTechRequest', this.techRequest);
        },
        confirmStatusUpdate(status) {
            let message = "Are you sure you want to update this request's status to: ''" + status + "'? You cannot undo this action."
            let approveMessage = "Successfully change this request's status to: ''" + status + "'.";
            let errorMessage = "Status was NOT updated."

            this.$confirm(message, 'Updating Status', {
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
            }).then(() => {
                this.updateStatus(status);
                this.$message({
                    message: approveMessage,
                    type: 'success'
                });
            }).catch(() => {
                this.$message({
                    message: errorMessage,
                    type: 'danger'
                });
            });
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        setCurrentRow(row) {
            this.$refs.todoTable.setCurrentRow(row);
        },
        addTodo(val) {
            //todo must be at least 5 characters long-- to help prevent accidental things being added
            if (val.length > 5)

                this.techRequest.todos.push({
                    message: val,
                    done: false
                });

            //update the DB
            this.$store.dispatch('updateTechRequest', this.techRequest);

            //clear input for to add another todo 
            this.input.todo = "";

        },
        removeTodo(index) {
            this.$confirm('Are you sure you want to delete this todo?', 'Danger', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                type: 'danger'
            }).then(() => {
                if (index >= 0) {

                    //remove todo
                    this.techRequest.todos.splice(index, 1);

                    //update the DB
                    this.$store.dispatch('updateTechRequest', this.techRequest);
                }

                this.$message({
                    type: 'success',
                    message: 'Successfully deleted todo'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'The todo was NOT deleted'
                });
            });
        }
    },
}
</script>
