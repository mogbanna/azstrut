<style lang="scss" scoped>
.container {
    max-width:100%;
    background:#e9e9e9;
    padding:50px 0px;
    .main {
        max-width:600px;
        background:#ffffff;
        padding:0px 25px;
        .wrapper {
            margin:0;
            padding:0;
            .header {
                background:#ffffff;
                color:#1a1a1a;
                line-height:150%;
                text-align:center;
                border-bottom:1px solid #e9e9e9;
                font: 300 14px;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                .logo {
                    background-color:#ffffff;
                    img {
                        width: 150px;
                    }
                }
            }
            .top-info {
                background:#ffffff;
                color:#000000;
                line-height:150%;
                text-align:center;
                font:300 16px;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                h3 {
                    text-align:center;
                    text-transform:uppercase;
                }
                p span {
                    font-size:18px;
                    font-weight:bold;
                }
            }
            .indentify {
                color:#000000;
                line-height:150%;
                text-align:left;
                font:300 16px; 
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                td {
                    font-size:24px;
                    span {
                        text-decoration:underline;
                    }
                    h2 {
                        display:inline-block;
                        font-family:Arial;
                        font-size:24px;
                        font-weight:bold;
                        margin-top:5px;
                        margin-right:0;
                        margin-bottom:5px;
                        margin-left:0;
                        text-align:left;
                        line-height:100%;
                    }
                }
            }
            .products-table {
                border:0;
                color:#000000;
                line-height:150%;
                text-align:left;
                font:300 14px/30px;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                .table-header {
                    background:#efefef;
                    th {
                        text-align:left;
                        border:1px solid #eee;
                    }
                }
                .products-row {
                    td{
                        vertical-align:middle;
                        border-left:1px solid #eee;
                        border-bottom:1px solid #eee;
                        border-right:0;
                        border-top:0;
                        text-align: right;
                    }
                    #product-name {
                        text-align: left;
                        word-wrap: break-word;
                    }
                }
            }
            .organization-details {
                color:#000000;
                line-height:150%;
                text-align:left;
                font:300 14px; 
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
            .contact-details {
                color:#000000;
                line-height:150%;
                text-align:left;
                font:300 14px;
                font-style: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
            .contact-us {
                color:#000000;
                line-height:150%;
                text-align:left;
                font:300 16px;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
        }
    }
    
}
</style>
<template>
<table class="container" border="0" align="center" cellpadding="0" cellspacing="0" width="100%" >
    <tr>
      <td>
        <table class="main" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td class="wrapper">
                <table class="header" border="0" cellpadding="20" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td class="logo" valign="top" align="left" width="30%">
                        <img alt="Swiggy" src="img/logoSM.png">
                      </td>
                      <td valign="top" align="center" width="70%" style="text-align: left; verticle-align: middle;">
                        <h3 style="margin-top: 10px; margin-bottom: 0px; margin: ">Tech Request</h3>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <br>
                <table class="identify" border="0" cellpadding="20" cellspacing="0" width="100%" style="">
                  <tbody>
                     <tr>
                          <td style="text-align: left;"  valign="top" width="75%">
                              Submitted on: <strong>{{ submitted }}</strong>
                          </td>
                          <td valign="top" width="25%" style="border: 1px solid black; text-transform: uppercase; text-align: center;">
                              <strong>{{ techRequest.status }}</strong>
                          </td>
                      </tr>
                  </tbody>
                </table>
                <br>
                <table class="top-info" border="0" cellpadding="10" cellspacing="0" width="100%">
                  <tbody>
                      <tr>
                          <td valign="top">
                              <p>Laptops: <span>{{ techRequest.num_laptops }}</span></p>
                          </td>
                          <td valign="top">
                              <p>Desktops: <span>{{ techRequest.num_desktops }}</span></p>
                          </td>
                     </tr>
                     <tr>
                         <td colspan="2" style="text-align: left">
                            Additional Equiptment: <strong>{{ techRequest.other_items }}</strong>
                         </td>
                     </tr>
                     <tr>
                         <td colspan="2" style="text-align: left;">
                             Usage: <strong>{{ techRequest.usage }}</strong>
                         </td>
                     </tr>
                     <tr>
                         <td colspan="2">
                             Comments: <strong>{{ techRequest.comments }}</strong>
                         </td>
                     </tr>
                  </tbody>
                </table>
                <!-- <table class="products-table" align="center" cellspacing="0" cellpadding="6" width="95%" border=".5px">
                  <thead>
                    <tr class="table-header">
                      <th scope="col" width="30%">Product</th>
                      <th scope="col" width="15%">Quantity</th>
                      <th scope="col" width="20%">Price</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr class="products-row" width="100%">
                      <td id="product-name" width="30%">
                        Chilli Chicken
                      </td>
                      <td width="15%">
                        1
                      </td>
                      <td width="20%" style="border-right:1px solid #eee;"><span>Rs.190</span></td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <th scope="row" colspan="2" style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">Cart Subtotal </th>
                      <th style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0"><span>Rs.190</span></th>
                    </tr>
                    <tr>
                      <th scope="row" colspan="2" style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                        Vat</th>
                      <td style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0"><span>Rs.10</span></td>
                    </tr>
                    <tr>
                      <th scope="row" colspan="2" style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                        Packing Charges</th>
                      <td style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0"><span>Rs.10</span></td>
                    </tr>

                    <tr>
                      <th scope="row" colspan="2" style="text-align:right;background:#efefef;text-align:right;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">Order Total</th>
                      <td style="background:#efefef;text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0;color:#7db701;font-weight:bold"><span>Rs.210</span></td>
                    </tr>
                  </tfoot>
                </table> -->
                <table class="organization-details" border="0" cellpadding="20" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td valign="top">
                        <h4 style="font-size:24px;margin:0;padding:0;margin-bottom:10px;">{{ techRequest.organization.name }}</h4>
                        <p style="margin:0;margin-bottom:10px;padding:0;">Website: <strong>{{ techRequest.organization.website }}</strong></p>
                        <p style="margin:0;margin-bottom:10px;padding:0;">Legal Name: <strong>{{ techRequest.organization.legal_name }}</strong></p>
                      </td>
                      <td valign="top">
                        <p style="margin:0; margin-top: 44px; margin-bottom:10px;padding:0;">ACC File #: <strong>{{ techRequest.organization.acc_file.number }}</strong></p>
                        <p style="margin:0;margin-bottom:10px;padding:0;">ACC File Link: <strong>{{ techRequest.organization.acc_file.listing_link }}</strong></p>
                      </td><td valign="top">
                        <p style="margin:0; margin-top: 44px; margin-bottom:10px;padding:0;">EIN: <strong>{{ techRequest.organization.ein }}</strong></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="contact-details" border="0" cellpadding="20" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td valign="top">
                        <h4 style="font-size:24px;margin:0;padding:0;margin-bottom:10px;">Contact Info</h4>
                        <p>
                          {{ techRequest.organization.primary_contact.full_name }} - {{ techRequest.organization.primary_contact.role }}
                          <br /> {{ techRequest.organization.primary_contact.phone }}
                          <br /> {{ techRequest.organization.primary_contact.email }}
                        </p>
                      </td>
                      <td valign="top">
                        <h4 style="font-size:24px;margin:0;padding:0;margin-bottom:10px;">Contact Info</h4>
                        <p>
                          {{ techRequest.organization.primary_contact.full_name }} - {{ techRequest.organization.primary_contact.role }}
                          <br /> {{ techRequest.organization.primary_contact.phone }}
                          <br /> {{ techRequest.organization.primary_contact.email }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br>
                <br>

                <table class="contact-us" cellspacing="0" cellpadding="6" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td valign="top" style="text-transform:capitalize">
                        <p style="font-size:12px;line-height:130%">Please call <b> 212456</b> in case of any doubts or questions. Please reply back to email in case of any issues with prices, packing charges, taxes and other menus issues.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br>

                <br>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9;font-family:Arial,Helvetica,sans-serif;font-size:12px;padding:0px">
                  <tbody>
                    <tr>
                      <td align="center" width="47%">
                        <table border="0" cellspacing="0" cellpadding="0" height="50" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9b9b9b">
                          <tbody>
                            <tr>
                              <td align="center">
                                Printed on {{ today }} by {{ current_user }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br>
                <br>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
</template>
<script>
import moment from 'moment';
export default {
    data() {
        return {
            submitted: '',
            current_user: '',
        }
    },
    created() {
        this.$store.dispatch('loadTechRequest', {
            id: this.$route.params.techRequestId
        });
        this.$store.dispatch('loadUser', {
            username: this.$store.getters.getUserSession.userCtx.name
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
        today() {
            return moment().format('LL');
        }
    },
    watch: {
        userLoadStatus: function(val) {
            if(val == 2){
                this.current_user = this.user.first_name + " " + this.user.last_name.charAt(0).toUpperCase() + ".";
            }
        },
        techRequestLoadStatus: function(val) {
            if(val == 2) {
                this.submitted = moment(this.techRequest.submitted_on).format('LL');
            }
        }
    },
}
</script>