<template>
   <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Billings
              <v-btn small color="primary"
                to="/sales/create"
              >Add New</v-btn>
            </h3>
            
            <v-spacer></v-spacer>

            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td v-html="props.item.customer_details"></td> 
              <td v-html="props.item.billing_details"></td> 
              <td v-html="props.item.tax_details"></td> 
              <td v-html="props.item.discount_details"></td> 
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0"
                  :to="`/sales/${props.item.id}/edit`"
                >
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn small flat color="primary" 
                  :href="`${api.baseUrl}api/billings/${props.item.id}/printChallan`"
                  @click="downloadChallan"
                  target="_blank"
                >Challan</v-btn> 
                <a
                  :href="`${api.baseUrl}api/billings/${props.item.id}/view`"
                  target="_blank" 
                >
                  <v-btn icon class="mx-0" 
                    target="_blank"
                  >
                    <v-icon color="blue">picture_as_pdf</v-icon>
                  </v-btn>
                </a>
                <a
                  :href="`${api.baseUrl}api/billings/${props.item.id}/print`"
                  target="_blank" 
                >
                  <v-btn icon class="mx-0" 
                    target="_blank"
                  >
                    <v-icon color="pink">print</v-icon>
                  </v-btn>
                </a>
                <!-- <v-btn icon class="mx-0" @click="">
                  <v-icon color="pink">delete</v-icon>
                </v-btn> -->
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">
  
  import { mapGetters } from 'vuex'
  import Form from 'helpers/Form.js'
  
  export default {

    data: () => ({
      form: new Form,
      search: '',
      headers: [
        { text: 'Customer Details', sortable:false, value: 'customer_details' }, 
        { text: 'Bill Details', sortable:false, value: 'billing_details' }, 
        { text: 'Tax Details', sortable:false, value: 'tax_details' }, 
        { text: 'Discount Details', sortable:false, value: 'discount_details' }, 
      ],
      items: []
    }),

    computed: {
      ...mapGetters([
        'bill_format', 'api'
      ])
    },

    mounted() {
      this.form.get('/api/billings')
        .then(data => {
          // console.log(data.data);

          data.data.forEach(item => {
            this.items.push({
              id: item.id,
              customer_details: `
                <b>Bill No</b>: ${this.bill_format}${item.bill_no}
                <br>
                <b>Company Name:</b> ${item.customer.name}
                <br>
                <b>Address:</b> ${item.customer.address}
                <hr>
                <b>Delivery Note: </b>  ${item.delivery_note ? item.delivery_note : ''}
                <br>
                <b>Delivery Note Date: </b> ${item.delivery_note_date ? item.delivery_note_date : ''}
                <br>
                <b>Supplier Reference: </b> ${item.supplier_reference ? item.supplier_reference : ''}
                <br>
                <b>Terms of payment: </b> ${item.terms_of_payment ? item.terms_of_payment : ''}
                <br>
                <b>Buyer order no: </b> ${item.buyer_order_no ? item.buyer_order_no : ''}
                <br>
                <b>Dispatch document no: </b> ${item.despatch_document_no ? item.despatch_document_no : ''}
                <br>
                <b>Dispatch through: </b> ${item.despatch_through ? item.despatch_through : ''}
                <br>
                <b>Destination: </b> ${item.destination ? item.destination : ''}
                <br>
                <b>Terms of delivery: </b> ${item.terms_of_delivery ? item.terms_of_delivery : ''}
              `,
              billing_details: `
                ${ 
                  item.billing_details.map(detail => {
                    return ` 
                      <br>
                      ${detail.product_category.name} 
                      <br>
                      <b>(Qty: </b> ${detail.qty}) 
                      <br>
                      <b>(Amount: </b>Rs. ${detail.amount} /-)
                    `
                  })
                } 
              `,
              tax_details: `
                <b>Sub Total: </> </b>Rs. ${item.sub_total} /- 
                ${
                  item.billing_taxes.map(tax => {
                    return ` 
                      <br> 
                      <b>${tax.tax.name}: </b>Rs ${tax.amount} /-
                    `
                  })
                }
                <br>
                <b>Total Amount: </b>Rs ${item.total_amount} /-
              `,
              discount_details: `
                ${
                  item.billing_discounts.map(discount => {
                    return `
                      <br>
                      ${discount.discount.name}: <b>Rs ${discount.amount}</b>
                    `
                  })
                }
              `
            }) 
          })
          // this.items = data.data;
        })
        .catch(errors => {

        })
    },

    methods: {

      downloadChallan() {
        // alert(1)
      }
    }

  }
</script>