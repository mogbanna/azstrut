<template>
  <navbar :show-navbar="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}">
        <navbar-toggle-button @click.native="toggleSidebar">
        </navbar-toggle-button>
      </div>
      <a class="navbar-brand" href="#pablo">
        {{$route.name}}
      </a>
<!-- temp back button -->
            <n-button
                    type="neutral"
                    @click.native="$router.go(-1)"
                    round=""
                    icon="">
                    <i class="now-ui-icons arrows-1_minimal-left"></i>                
                </n-button>
    </div>
    <button @click="toggleNavbar" class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navigation"
            aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-bar navbar-kebab"></span>
      <span class="navbar-toggler-bar navbar-kebab"></span>
      <span class="navbar-toggler-bar navbar-kebab"></span>
    </button>

    <template slot="navbar-menu">

      <form>
        <div class="input-group no-border">
          <fg-input placeholder="Search..." addon-right-icon="now-ui-icons ui-1_zoom-bold">
          </fg-input>
        </div>
      </form>

      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#pablo">
            <i class="now-ui-icons media-2_sound-wave"></i>
            <p>
              <span class="d-lg-none d-md-block">Stats</span>
            </p>
          </a>
        </li>
        <drop-down tag="li"
                   position="right"
                   class="nav-item"
                   icon="now-ui-icons location_world">

          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </drop-down>

        <li class="nav-item">
          <a class="nav-link" href="#pablo">
            <i class="now-ui-icons users_single-02"></i>
            <p>
              <span class="d-lg-none d-md-block">Account</span>
            </p>
          </a>
        </li>
        <li class="nav-item" @click="logout()">
          <a class="nav-link">
            <i class="now-ui-icons ui-1_simple-remove"></i>
            <p>
              <span class="d-lg-none d-md-block">Account</span>
            </p>
          </a>
        </li>
      </ul>
    </template>
  </navbar>
</template>
<script>
import { RouteBreadCrumb, Navbar, NavbarToggleButton } from '@/components';
import { CollapseTransition } from 'vue2-transitions';

export default {
  components: {
    RouteBreadCrumb,
    Navbar,
    NavbarToggleButton,
    CollapseTransition
  },
  data() {
    return {
      activeNotifications: false,
      showNavbar: false,
    };
  },
  computed: {
      logoutUserLoadStatus() {
          return this.$store.getters.getLogoutUserLoadStatus;
    },
    response() {
        return this.$store.getters.getResponse;
    },
    routeName() {
        const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  watch: {
      logoutUserLoadStatus: function(val) {
          if(val == 2) {
              console.log('Successfully logged out');
              this.$router.push({
                  name: 'Login'
              })
          }
      }
  },
  methods: {
    logout() {
        console.log('Logging out...');
        this.$store.dispatch('logoutUser');
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
<style>
</style>
