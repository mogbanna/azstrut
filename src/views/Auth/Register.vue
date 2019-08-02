<template>
  <div class="col-md-4 ml-auto mr-auto">
    <form @submit.prevent="register">
        <card class="card-login card-plain">
            <div slot="header">
                <div class="logo-container">
                    <img alt="Logo" src="@/assets/logo.png">
                </div>
            </div>

            <div>
                <fg-input v-model="form.first_name"
                        v-validate="'required'"
                        name="first name"
                        :error="getError('first name')"
                        placeholder="First Name"
                        addon-left-icon="now-ui-icons users_circle-08">
                </fg-input>

                <fg-input v-model="form.last_name"
                        v-validate="'required'"
                        name="last name"
                        :error="getError('last name')"
                        placeholder="Last Name"
                        addon-left-icon="now-ui-icons text_caps-small">
                </fg-input>

                <fg-input v-model="form.email"
                        v-validate="'required|email'"
                        name="email"
                        :error="getError('email')"
                        placeholder="Email"
                        addon-left-icon="now-ui-icons ui-1_email-85">
                </fg-input>
                <fg-input v-model="form.username"
                        v-validate="'required'"
                        name="username"
                        :error="getError('username')"
                        placeholder="Username"
                        addon-left-icon="now-ui-icons users_circle-08">
                </fg-input>
                <fg-input v-model="form.password"
                        v-validate="'required|min:5'"
                        type="password"
                        name="password"
                        :error="getError('password')"
                        placeholder="Password"
                        addon-left-icon="now-ui-icons ui-1_email-85">
                </fg-input>
            </div>

            <div slot="footer">
                <n-button type="primary"
                        native-type="submit"
                        round
                        block
                        >
                Register
                </n-button>
            </div>
        </card>
    </form>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
export default {
  name: 'login',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
      return {
          form: {
              username: '',
              password: '',
              roles: ['super'],
              first_name: '',
              last_name: '',
              email: ''
          }
      };
  },
  created() {
      
  },
  computed: {
      registerUserLoadStatus() {
          return this.$store.getters.getRegisterUserLoadStatus;
      },
      response() {
          return this.$store.getters.getResponse;
      }
  },
  watch: {
      registerUserLoadStatus: function(val) {
          if(val == 2) {
              this.$router.push({
                  name: 'Dashboard'
              })
          }
      },
      response: function(val) {
          console.log(val);
      }
  },
  methods: {
      getError(fieldName) {
      return this.errors.first(fieldName);
    },
    async register() {
      let isValidForm = await this.$validator.validateAll();
      if (!isValidForm) {
          console.log('Something happened');
      }else {
          let user = {};
          let d = new Date();

          user.username = this.form.username;
          user.password = this.form.password;
          user.opts = {};
          user.opts.roles = this.form.roles;
          user.opts.metadata = {};
          user.opts.metadata.first_name = this.form.first_name;
          user.opts.metadata.last_name = this.form.last_name;
          user.opts.metadata.email = this.form.email;  

          user.opts.metadata.updated_at = [];
          user.opts.metadata.created_at = [];
          user.opts.metadata.created_at.push(
              d.getFullYear(),
              d.getMonth(),
              d.getDate(),
              d.getHours(),
              d.getMinutes(),
              d.getSeconds()
          );
 
          this.$store.dispatch('registerUser', user);
      }
    }
  },
}
</script>
