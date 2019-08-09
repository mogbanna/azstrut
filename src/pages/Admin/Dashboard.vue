<template>

<div>
    <div class="row">
      <div class="col-xl-3 col-md-6 col-sm-6 col-xs-6">
        <stats-card
        @click.native="$router.push('/administrator/users')"
          type="info"
          :title="users_count"
          subTitle="Users"
          icon="now-ui-icons emoticons_satisfied">
          <!-- <span slot="footer">
            <i class="now-ui-icons arrows-1_refresh-69"></i>
            Update now
          </span> -->
        </stats-card>
      </div>
      <div class="col-xl-3 col-md-6 col-sm-6 col-xs-6">
        <!-- @click.native="$router.push('/administrator/users')" -->
        <stats-card
          type="warning"
          :title="users_count"
          subTitle="Count"
          icon="now-ui-icons emoticons_satisfied"
          >
          <!-- <span slot="footer">
            <i class="now-ui-icons arrows-1_refresh-69"></i>
            Update now
          </span> -->
        </stats-card>
      </div>
    </div>
</div>

</template>
<script>
import { StatsCard } from '@/components';
export default {
    components: {
        StatsCard
    },
    data() {
        return {
            users_count: ""
        }
    },
    created() {
        this.$store.dispatch('loadUsers', {
            limit: 500,
            descending: true,
            skip: 0
        });
    },
    computed: {
        users() {
            return this.$store.getters.getUsers;
        },
        usersLoadStatus() {
            return this.$store.getters.getUsersLoadStatus;
        }
    },
    watch: {
        usersLoadStatus: function(val) {
            if(val == 2){
                this.users_count = this.users.total_rows.toString();
            }
        }
    },
    
}
</script>