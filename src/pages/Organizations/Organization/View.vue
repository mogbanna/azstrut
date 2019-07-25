<template>
  <div class="row">
    <div class="col-lg-8 col-md-7">
       <card>
        <h5 slot="header" class="title">Add Organization</h5>
        <form>
            <!-- BEGIN LEGAL INFO -->
            <h6>Legal Information <small class="text-danger">*required</small></h6>
            <div class="row">
                <div class="col-md-4">
                    <h4 class="card-title">Organization Type</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.type }}</h6>
                </div>
                <div class="col-md-8">
                    <h4 class="card-title">EIN</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.ein }}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <h4 class="card-title">ACC File #</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.acc_file.number }}</h6>
                </div>
                <div class="col-md-6">
                    <h4 class="card-title">ACC Listing Link</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.acc_file.listing_link }}</h6>
                </div>
            </div>
            <!-- END LEGAL INFO -->
            <!-- BEGIN PRIMARY CONTACT -->
            <h6>Primary Contact <small class="text-danger">*required</small></h6>
            <div class="row">
                <div class="col-md-6">
                    <h4 class="card-title">Full Name</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.full_name }}</h6>
                </div>
                <div class="col-md-6">
                    <h4 class="card-title">Role</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.role }}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <h4 class="card-title">Email</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.email }}</h6>
                </div>
                <div class="col-md-4">
                    <h4 class="card-title">Phone #</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.primary_contact.phone }}</h6>
                </div>
            </div>
            <!-- END PRIMARY CONTACT -->
            <!-- BEGIN SECONDARY CONTACT -->
            <h6>Secondary Contact</h6>
            <div class="row">
                <div class="col-md-6">
                    <h4 class="card-title">Full Name</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.full_name }}</h6>
                </div>
                <div class="col-md-6">
                    <h4 class="card-title">Role</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.role }}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <h4 class="card-title">Email</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.email }}</h6>
                </div>
                <div class="col-md-4">
                    <h4 class="card-title">Phone</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{{ organization.secondary_contact.phone }}</h6>
                </div>
            </div>
            <!-- END SECONDARY CONTACT -->
            <!-- NOTES -->
            <hr>
            <div class="row">
                <div class="col-md-12">
                    <p class="blockquote blockquote-primary">
                        {{ organization.notes }}
                    </p>
                </div>
            </div>
            <!-- END NOTES -->
        </form>
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
                                <img v-if="imageUrl" :src="imageUrl" class="picture-src">
                            </el-upload>
                            <h6 class="description">Choose Picture</h6>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                    <img class="avatar border-gray" src="img/recycledTech.png" alt="...">
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
export default {
    data() {
        return {
            
        };
    },
    components: {

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
        
    },
    methods: {
        
    },
}
</script>
