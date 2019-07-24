<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button type="primary" @click="register('form')"> Register</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {

  },
  data() {
      return {
          form: {
              username: 'eedmounds',
              password: 'imcool',
              roles: ['user'],
              first_name: 'Erika',
              last_name: 'Edmounds',
              email: 'eedmounds@cool.com'
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
                  name: 'dashboard'
              })
          }
      }
  },
  methods: {
      register(form) {
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

          user.opts.metadata.created_at = [];
          user.opts.metadata.created_at.push(
              d.getFullYear(),
              d.getMonth(),
              d.getDate(),
              d.getHours(),
              d.getMinutes(),
              d.getSeconds()
          );

          console.log(user);  
          this.$store.dispatch('registerUser', user);
      }
  },
}
</script>
