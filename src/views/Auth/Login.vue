<template>
  <div class="col-md-4 ml-auto mr-auto">
    <form @submit.prevent="login">
      <card class="card-login card-plain">

        <div slot="header">
          <div class="logo-container">
            <img src="img/now-logo.png" alt="">
          </div>
        </div>

        <div>
          <fg-input v-model="form.username"
                    v-validate="'required'"
                    name="username"
                    :error="getError('username')"
                    class="no-border form-control-lg"
                    placeholder="Username"
                    addon-left-icon="now-ui-icons ui-1_email-85">
          </fg-input>

          <fg-input v-model="form.password"
                    v-validate="'required|min:5'"
                    type="password"
                    name="password"
                    :error="getError('password')"
                    class="no-border form-control-lg"
                    placeholder="Password"
                    addon-left-icon="now-ui-icons ui-1_lock-circle-open">
          </fg-input>
        </div>

        <div slot="footer">
          <n-button native-type="submit" type="primary" round block>
            Get Started
          </n-button>
          <div class="pull-left">
            <h6>
              <router-link class="link footer-link" to="/register">
                Create Account
              </router-link>
            </h6>
          </div>

          <div class="pull-right">
            <h6><a href="#pablo" class="link footer-link">Need Help?</a></h6>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  computed: {
      loginUserLoadStatus() {
          return this.$store.getters.getLoginUserLoadStatus;
      },
      response() {
          return this.$store.getters.getResponse;
      }
  },
  watch: {
      loginUserLoadStatus: function(val) {
          if(val == 2) {
              this.$router.push({
                  path: '/dashboard'
              });
          }
      }
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    async login() {
      let isValidForm = await this.$validator.validateAll();
      if (!isValidForm) {
          console.log("There's and issue logging in..");
      }else {
          console.log(this.form);
          this.$store.dispatch('loginUser', {
              username: this.form.username,
              password: this.form.password
          });
      }
    }
  }
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
