<template>
  <div class="row">
    <div class="col-lg-8 col-md-7">
       <card>
        <h5 slot="header" class="title">Edit Profile</h5>
        <form>
        <div class="row">
            <div class="col-md-5">
            <fg-input type="text"
                        label="Company"
                        :disabled="true"
                        placeholder="Paper dashboard"
                        v-model="form.name">
            </fg-input>
            </div>
            <div class="col-md-3">

            <fg-input type="text"
                        label="Username"
                        placeholder="Username"
                        v-model="form.legal_organization">
            </fg-input>
            </div>
            <div class="col-md-4">
            <fg-input type="email"
                        label="Username"
                        placeholder="Email"
                        v-model="form.website">
            </fg-input>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
            <fg-input type="text"
                        label="First Name"
                        placeholder="First Name"
                        v-model="form.organization_type">
            </fg-input>
            </div>
            <div class="col-md-6">
            <fg-input type="text"
                        label="Last Name"
                        placeholder="Last Name"
                        v-model="form.primary_contact.full_name">
            </fg-input>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
            <fg-input type="text"
                        label="Address"
                        placeholder="Home Address"
                        v-model="form.primary_contact.role">
            </fg-input>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
            <fg-input type="text"
                        label="City"
                        placeholder="City"
                        v-model="form.primary_contact.email">
            </fg-input>
            </div>
            <div class="col-md-4">
            <fg-input type="text"
                        label="Country"
                        placeholder="Country"
                        v-model="form.primary_contact.phone">
            </fg-input>
            </div>
            <div class="col-md-4">
            <fg-input label="Postal Code"
                        placeholder="ZIP Code"
                        v-model="form.ein">
            </fg-input>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
            <fg-input label="About Me">
                <textarea class="form-control"
                        placeholder="ZIP Code"
                        v-model="form.notes">
                </textarea>
            </fg-input>
            </div>
        </div>
        </form>
    </card>
    </div>
    <div class="col-lg-4 col-md-5">
        <card class="card-user">
            <div slot="image" class="image">
                <img src="img/bg5.jpg" alt="...">
            </div>
            <div>
                <div class="author">
                    <a href="#">
                    <img class="avatar border-gray" src="img/mike.jpg" alt="...">
                    <h5 class="title">Mike Andrew</h5>
                    </a>
                    <p class="description">
                    michael24
                    </p>
                </div>
                <p class="description text-center">
                    "Lamborghini Mercy <br>
                    Your chick she so thirsty <br>
                    I'm in that two seat Lambo"
                </p>
                </div>
                <div slot="footer" class="button-container">
                <n-button href="#" type="neutral" icon round size="lg">
                    <i class="fa fa-facebook-square"></i>
                </n-button>
                <n-button href="#" type="neutral" icon round size="lg">
                    <i class="fa fa-twitter"></i>
                </n-button>
                <n-button href="#" type="neutral" icon round size="lg">
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
            form: {
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
                organization_type: 'Other 501c3 Nonprofit',
                website: 'www.wearesocool.com',
                social_media: {
                    facebook: 'www.facebook.com/wesocool',
                    twitter: '@weSOcool',
                    instagram: '@SoSoCool'
                },
                ein: 'ABCD-1234',
                acc_file: {
                    number: '87654',
                    listing_link: 'www.fileLink.com/us'
                },
                requests: [],
                camps: [],
                notes: 'This organization is Too Cool',
                created_by: {},
                created_at: [],
                updated_at: []
            }
        };
    },
    created() {
        console.log('hello');
    },
    computed: {
        
    },
    watch: {
        
    },
    methods: {
        
    },
}
</script>