<template>
  <div class="row">
    <div class="col-12" v-loading="organizationsLoadStatus == 1">
      <card card-body-classes="table-full-width" no-footer-line>
        <h4 slot="header" class="card-title">Organizations</h4>
        <div>
          <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <el-select
              class="select-primary mb-3"
              style="width: 200px"
              v-model="pagination.perPage"
              placeholder="Per page">
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <fg-input>
              <el-input type="search"
                        class="mb-3"
                        clearable
                        prefix-icon="el-icon-search"
                        style="width: 200px"
                        placeholder="Search records"
                        v-model="searchQuery"
                        aria-controls="datatables">
              </el-input>
            </fg-input>

          </div>
          <el-table stripe
                    ref="displayTable"
                    style="width: 100%;"
                    :data="queriedData"
                    @current-change="handleCurrentChange"
                    @selection-change="handleSelectionChange">
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column>
          <!--   <el-table-column
              :min-width="135"
              fixed="right"
              label="Actions">
              <div slot-scope="props" class="table-actions">
                <n-button @click.native="handleLike(props.$index, props.row)"
                          class="like"
                          type="info"
                          size="sm" round icon>
                  <i class="fa fa-heart"></i>
                </n-button>
                <n-button @click.native="handleEdit(props.$index, props.row)"
                          class="edit"
                          type="warning"
                          size="sm" round icon>
                  <i class="fa fa-calendar"></i>
                </n-button>
                <n-button @click.native="handleDelete(props.$index, props.row)"
                          class="remove"
                          type="danger"
                          size="sm" round icon>
                  <i class="fa fa-times"></i>
                </n-button>
              </div>
            </el-table-column> -->
          </el-table>
        </div>
        <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
          <div class="">
            <p class="card-category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
          </div>
          <n-pagination class="pagination-no-border"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="total">
          </n-pagination>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import { Pagination as NPagination } from '@/components';
import Fuse from 'fuse.js';
import swal from 'sweetalert2';
import moment from 'moment';

export default {
  components: {
    NPagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
    data() {
        return {
            pagination: {
            perPage: 5,
            currentPage: 1,
            perPageOptions: [5, 10, 25, 50],
            total: 0
            },
            searchQuery: '',
            propsToSearch: ['name', 'organization_type'],
            tableColumns: [
            {
                prop: 'name',
                label: 'Name',
                minWidth: 250
            },
            {
                prop: 'organization_type',
                label: 'Type',
                minWidth: 250
            },
            {
                prop: 'num_requests',
                label: '# Tech Requests',
                minWidth: 160
            },
            {
                prop: 'num_camps',
                label: '# Camps',
                minWidth: 100
            }
            ],
            loadOptions: {
                limit: 500,
                descending: false,
                skip: 0
            },
            tableData: [],
            currentRow: null,
            searchedData: [],
            fuseSearch: null
        };
    },
    mounted() {
        // Fuse search initialization.
        this.fuseSearch = new Fuse(this.tableData, {
        keys: ['name', 'organization_type'],
        threshold: 0.3
        });
    },
    created(){
        this.$store.dispatch('loadOrganizations', this.loadOptions)
    },
    computed: {
        organizations() {
            return this.$store.getters.getOrganizations;
        },
        organizationsLoadStatus() {
            return this.$store.getters.getOrganizationsLoadStatus;
        },
        /***
         * Returns a page from the searched data or the whole data. Search is performed in the watch section below
         */
        queriedData() {
            let result = this.tableData;
            if (this.searchedData.length > 0) {
                result = this.searchedData;
            }
            return result.slice(this.from, this.to);
        },
        to() {
            let highBound = this.from + this.pagination.perPage;
            if (this.total < highBound) {
                highBound = this.total;
            }
            return highBound;
        },
        from() {
            return this.pagination.perPage * (this.pagination.currentPage - 1);
        },
        total() {
            return this.searchedData.length > 0
                ? this.searchedData.length
                : this.tableData.length;
        }
    },
    watch: {
        organizationsLoadStatus: function(val) {
            if(val == 2) {
                this.pagination.total = this.organizations.total_rows;
                this.pageCount = this.total / this.loadOptions.limit;
                // this.pagination.perPage = this.loadOptions.limit;

                this.tableData.splice(0, this.tableData.length);
                this.organizations.rows.forEach(org => {
                    let data = {};
                    let x = org.value || expense.doc;
                    data.id = x._id;
                    data.name = x.name.length > 35 ?
                        x.name.substring(0, 35) + '...' : x.name;
                    data.legal_organization = x.legal_organization.length > 25 ?
                        x.legal_organization.substring(0, 25) + '...' : x.legal_organization;
                    data.primary_contact = x.primary_contact;
                    data.secondary_contact = x.secondary_contact;
                    data.organization_type = x.organization_type.length > 25 ?
                        x.organization_type.substring(0, 25) + '...' : x.organization_type;
                    data.website = x.website;
                    data.social_media = x.social_media;
                    data.ein = x.ein;
                    data.acc_file = x.acc_file;
                    data.num_requests = x.requests.length > 0 ?
                        (x.requests.length + 1) : 0;
                    data.num_camps = x.camps.length > 0 ?
                        (x.camps.length + 1) : 0;
                    data.created_at = moment(x.created_at).format('LL');
                    
                    this.tableData.push(data);
                });
                console.log(this.tableData);
            }
        },
        /**
         * Searches through the table data by a given query.
         * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
         * @param value of the query
         */
        searchQuery(value) {
            let result = this.tableData;
            if (value !== '') {
                result = this.fuseSearch.search(this.searchQuery);
            }
            this.searchedData = result;
        }
    },
    methods: {
        setCurrentRow(row) {
            this.$refs.displayTable.setCurrentRow(row);
        },
        handleCurrentChange(row) {
            this.currentRow = row;
            this.$router.push({
                path: '/dashboard/organizations/organizations/view/' + row.id
            });
        },
        handleSelectionChange(val) {
            this.displayTable = val;
        },
        // handleLike(index, row) {
        //     swal({
        //         title: `You liked ${row.name}`,
        //         buttonsStyling: false,
        //         type: 'success',
        //         confirmButtonClass: 'btn btn-success btn-fill'
        //     });
        // },
        // handleEdit(index, row) {
        //     swal({
        //         title: `You want to edit ${row.name}`,
        //         buttonsStyling: false,
        //         confirmButtonClass: 'btn btn-info btn-fill'
        //     });
        // },
        // handleDelete(index, row) {
        //     swal({
        //         title: 'Are you sure?',
        //         text: `You won't be able to revert this!`,
        //         type: 'warning',
        //         showCancelButton: true,
        //         confirmButtonClass: 'btn btn-success btn-fill',
        //         cancelButtonClass: 'btn btn-danger btn-fill',
        //         confirmButtonText: 'Yes, delete it!',
        //         buttonsStyling: false
        //     }).then(result => {
        //         if (result.value) {
        //         this.deleteRow(row);
        //         swal({
        //             title: 'Deleted!',
        //             text: `You deleted ${row.name}`,
        //             type: 'success',
        //             confirmButtonClass: 'btn btn-success btn-fill',
        //             buttonsStyling: false
        //         });
        //         }
        //     });
        // },
        // deleteRow(row) {
        //     let indexToDelete = this.tableData.findIndex(
        //         tableRow => tableRow.id === row.id
        //     );
        //     if (indexToDelete >= 0) {
        //         this.tableData.splice(indexToDelete, 1);
        //     }
        // }
    }
};
</script>
<style>
</style>
