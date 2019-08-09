<template>
    <div>
        <el-table :data="tableData" border stripe>
            <el-table-column
                prop="role"
                label="Role"
                sortable
                min-width="150"
                column-key="role"
            >
            </el-table-column>
        </el-table>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],

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
            if(val == 2) {
                this.users.rows.forEach(user => {
                    console.log(user);
                    // let u = {};
                    // u.id = user.doc._id;
                    // u.role = user.doc.role;
                    // u.name = user.doc.name;
                })
            }
        }
    },
}
</script>