<style scoped>
    #statusTag {
        border-radius: 0;
        font-size: 12px;
        text-align: center;
        width: 100%;
    }
    #addition{
        color: #f96332;
        font-weight: bold;
    }
</style>

<template>
    <div id="printAll">
        <div class="row justify-content-around">
            <div id="mainCol" class="col-8">

                <!-- BEGIN TODO ROW -->
                <div class="row" id="toDoRow">
                    <card class="card-tasks" no-footer-line>
                        <template slot="header">
                            <h6 class="card-title">Todo List</h6>
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
                                <h5 class="title">Tech Request</h5>
                            </div>
                            <div class="col-3">
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
                                        <!-- START ADDITIONAL EQUIPTMENT -->
                                        <div class="row">
                                            <div class="col">
                                                <div class="statistics">
                                                    <div class="info">
                                                        <h6 class="stats-title">Additional Equiptment</h6>
                                                        <el-button-group>
                                                            <el-button id="addition" type="plain" v-for="item in additional_equiptment" :key="item">{{ item.replace(",", "") }}</el-button>
                                                        </el-button-group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- END ADDITIONAL EQUIPTMENT -->
                                        <!-- START USAGE EQUIPTMENT -->
                                        <div class="row">
                                            <div class="col">
                                                <div class="statistics">
                                                    <div class="info">
                                                        <h6 class="stats-title">Usage</h6>
                                                        <p id="addition">{{ techRequest.usage }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- END USAGE EQUIPTMENT -->
                                    </div>
                                </div>
                            </div>
                            <!-- COMMENTS -->
                            <p>Comments</p>
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="blockquote blockquote-primary">
                                        {{ techRequest.organization.notes }}
                                    </p>
                                </div>
                            </div>
                            <!-- END COMMENTS -->
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
                        <div class="row" slot="header">
                            <div class="col-9">
                                <h6 class="card-title" >Actions</h6>
                            </div>
                            <div class="col-3">
                                <drop-down
                                position="right"
                                class="nav-item"
                                icon="now-ui-icons objects_spaceship">

                                    <a class="dropdown-item" @click="$router.push('/print/' + techRequest._id)">Print View</a>
                                    <!-- <a class="dropdown-item" v-print="'#printAll'">Print Page</a>
                                    <a class="dropdown-item" v-print="'#requestInfoRow'">Print Request</a> -->
                                </drop-down>
                            </div>
                        </div>
                        <div class="card-body py-0">
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
                    <card>
                        <div slot="header">
                            <h6 class="card-title">Notes</h6>
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
    Button,
    ButtonGroup
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
        [Button.name]: Button,
        [ButtonGroup.name]: ButtonGroup
    },
    data() {
        return {
            current_user: "",
            statusTagColor: "",
            input: {
                note: "",
                todo: ""
            },
            additional_equiptment: [],
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
            currentRow: null,
            organization_verified: false,
            searchResult: [],
        };
    },
    created() {
        //load user info
        this.$store.dispatch('loadUser', {
            username: this.$store.getters.getUserSession.userCtx.name
        });

        //make sure to check for what the current status is and set the color accordingly
        this.$store.dispatch('loadTechRequest', {
            id: this.$route.params.techRequestId
        });
    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        },
        userLoadStatus() {
            return this.$store.getters.getUserLoadStatus;
        },
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
        userSessionLoadStatus() {
            return this.$store.getters.getUserSessionLoadStatus;
        },
        updateTechRequestLoadStatus() {
            return this.$store.getters.getUpdateTechRequestLoadStatus;
        },
        updateTechRequestResponse() {
            return this.$store.getters.getUpdateTechRequestResponse;
        }
    },
    watch: {
        userLoadStatus: function(val) {
            if(val == 2){
                this.current_user = this.user.first_name + " " + this.user.last_name.charAt(0).toUpperCase() + ".";
            }
        },
        techRequestLoadStatus: function (val) {
            if (val == 2) {
                this.additional_equiptment = this.techRequest.other_items.trim().split(', ');

                //check if this is the first time opening the techRequest
                if (this.techRequest.status === "new") {
                    this.techRequest.status = 'in review';
                    this.techRequest.notes = [];
                    //add default todo list
                    this.techRequest.todos = this.defaultTodos;
                    //add the first note
                    this.techRequest.notes.push({
                        text: "Request received.",
                        submitted_by: this.current_user,
                        submitted_on: moment().format("LL")
                    });

                    //update the request in the DB
                    this.updateTR();
                }
            }
        },
        updateTechRequestLoadStatus: function (val) {
            if (val == 2) {
                this.$message({
                    message: 'Successfully Updated',
                    type: 'success'
                });
                //reload the tech request so we can have the right _rev number for next update
                this.$store.dispatch('loadTechRequest', {
                    id: this.$route.params.techRequestId
                });

            }
        },
        updateTechRequestResponse: function(val) {
            if(!val.ok){
                this.$message({
                    message: 'Trouble connecting to the Database. Please try again..',
                    type: 'danger'
                });
            }
        }
    },
    methods: {
        addNote(text) {
            if (text.length > 1) {
                let t = text;
                let by = this.current_user; 
                let on = moment().format('LL'); 

                this.techRequest.notes.push({
                    text: t,
                    submitted_by: by,
                    submitted_on: on
                });
                //update the DB
                this.updateTR();
            }
            this.input.note = "";
        },
        updateStatus(status) {

            let text = "Status changed to '" + status + "'.";
            let submitted_by = this.current_user;
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
            this.updateTR();
        },
        confirmStatusUpdate(status) {
            let message = "Are you sure you want to update this request's status to: ''" + status + "'? You cannot undo this action.";
            let errorMessage = "Status was NOT updated.";

            this.$confirm(message, 'Update Status', {
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
            }).then(() => {
                this.updateStatus(status);
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
            if (val.length > 5){
                this.techRequest.todos.push({
                    message: val,
                    done: false
                });
            //update the DB
            this.updateTR();

            //clear input for to add another todo 
            this.input.todo = "";
            }
        },
        removeTodo(index) {
            this.$confirm('Are you sure you want to delete this todo?', 'Delete Todo', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                type: 'danger'
            }).then(() => {
                if (index >= 0) {
                    //remove todo
                    this.techRequest.todos.splice(index, 1);
                    //update the DB
                    this.updateTR();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'The todo was NOT deleted'
                });
            });
        },
        updateTR(){
            this.$store.dispatch('updateTechRequest', this.techRequest);
        }
    },
}
</script>
