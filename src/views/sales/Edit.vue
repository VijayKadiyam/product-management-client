<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit bill <small>(Bill ID: {{ form.bill_no }})</small>
              <v-btn small color="primary"
                to="/sales"
              >View bills</v-btn>
            </h3>
            <v-spacer></v-spacer>
            <v-subheader>Total: Rs. {{ form.total_amount }} /- </v-subheader>
          </v-card-title> 

          <form 
            @submit.prevent="update"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text>  

              <v-text-field prepend-icon="format_list_numbered" name="bill_no" label="Bill No." id="bill_no" type="text" 
                ref="bill_no" 
                v-model="form.bill_no" 
                :rules="[() => !form.errors.has('bill_no') || form.errors.get('bill_no') ]"
              ></v-text-field> 

              <v-layout row wrap>  
                <v-flex xs6>
                  <v-subheader>Selct Customer&nbsp;
                    <router-link to="/customers/create">
                      [Add New Customer]
                    </router-link>
                  </v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    ref="customer_id"
                    :items="customers"
                    v-model="form.customer_id"
                    label="Select Customer"
                    single-line
                    :rules="[() => !form.errors.has('customer_id') || form.errors.get('customer_id') ]"
                  ></v-select>
                </v-flex> 
              </v-layout>  

              <br>

              <v-subheader>
                Bill Details 
                <v-btn fab small color="primary" @click="addProductCategory">
                  <v-icon>add</v-icon>
                </v-btn> 
                <v-spacer></v-spacer>
                <v-radio-group v-model="form.gst_including" :mandatory="false" @change="calculate">
                  <v-radio label="GST INCLUDED" :value=true></v-radio>
                  <v-radio label="GST NOT INCLUDED" :value=false></v-radio>
                </v-radio-group>
              </v-subheader> 

              <v-layout row wrap
                v-for="billing_detail in form.billing_details"
                :key="billing_detail.index"
              >  
                <v-flex xs3>
                  <v-select
                    ref="billing_detail.product_category_id"
                    :items="product_categories"
                    v-model="billing_detail.product_category_id"
                    label="Select product category"
                    single-line   
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-text-field prepend-icon="storage" name="quantity" label="Quantity" id="quantity" type="text" 
                    ref="billing_detail.qty" 
                    v-model="billing_detail.qty" 
                    @input="calculate"
                  ></v-text-field>  
                </v-flex> 
                <v-flex xs3>
                  <v-text-field prepend-icon="storage" name="cost_per_unit" label="Cost per unit" id="cost_per_unit" type="text" 
                    ref="billing_detail.cost_per_unit" 
                    v-model="billing_detail.cost_per_unit" 
                    @input="calculate"
                  ></v-text-field>  
                </v-flex> 
                <v-flex xs3>
                  <v-text-field prepend-icon="money" name="amount" label="Amount" id="amount" type="text" 
                    ref="billing_detail.amount" 
                    v-model="billing_detail.amount" 
                    @input="calculate"
                  ></v-text-field>  
                </v-flex> 
              </v-layout>

              <br><br>

              <v-subheader>
                Tax Details 
                <v-btn fab small color="primary" @click="addTaxCategory">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-subheader>

              <v-layout row wrap
                v-for="billing_tax in form.billing_taxes"
                :key="billing_tax.index"
              >  
                <v-flex xs4>
                  <v-select
                    ref="billing_tax.tax_id"
                    :items="taxes"
                    v-model="billing_tax.tax_id"
                    label="Select tax category"
                    single-line   
                    @input="calculate"
                  ></v-select>
                </v-flex> 
                <v-flex xs4>
                  <v-text-field prepend-icon="money" name="amount" label="Amount" id="amount" type="text" 
                    ref="billing_tax.amount" 
                    v-model="billing_tax.amount" 
                  ></v-text-field>  
                </v-flex> 
              </v-layout>

              <br><br>

              <v-subheader>
                Discount Details 
                <v-btn fab small color="primary" @click="addDiscountCategory">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-subheader>

              <v-layout row wrap
                v-for="billing_discount in form.billing_discounts"
                :key="billing_discount.index"
              >  
                <v-flex xs4>
                  <v-select
                    ref="billing_discount.discount_id"
                    :items="discounts"
                    v-model="billing_discount.discount_id"
                    label="Select discount category"
                    single-line  
                    @input="calculate" 
                  ></v-select>
                </v-flex> 
                <v-flex xs4>
                  <v-text-field prepend-icon="money" name="amount" label="Amount" id="amount" type="text" 
                    ref="billing_discount.amount" 
                    v-model="billing_discount.amount" 
                  ></v-text-field>  
                </v-flex> 
              </v-layout>

              <br>

              <v-layout row wrap>  
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="delivery_note" label="Delivery note" id="delivery_note" type="text" 
                    ref="delivery_note" 
                    v-model="form.delivery_note" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="delivery_note_date" label="Delivery note date" id="delivery_note_date" type="text" 
                    ref="delivery_note_date" 
                    v-model="form.delivery_note_date" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="supplier_reference" label="Supplier Reference" id="supplier_reference" type="text" 
                    ref="supplier_reference" 
                    v-model="form.supplier_reference" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="terms_of_payment" label="Terms of payment" id="terms_of_payment" type="text" 
                    ref="terms_of_payment" 
                    v-model="form.terms_of_payment" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="buyer_order_no" label="Buyer order no" id="buyer_order_no" type="text" 
                    ref="buyer_order_no" 
                    v-model="form.buyer_order_no" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="despatch_document_no" label="Document dispatch no" id="despatch_document_no" type="text" 
                    ref="despatch_document_no" 
                    v-model="form.despatch_document_no" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="despatch_through" label="Dispatch Through" id="despatch_through" type="text" 
                    ref="despatch_through" 
                    v-model="form.despatch_through" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs6>
                  <v-text-field prepend-icon="storage" name="destination" label="Destination" id="destination" type="text" 
                    ref="destination" 
                    v-model="form.destination" 
                  ></v-text-field> 
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="storage" name="terms_of_delivery" label="Delivery terms" id="terms_of_delivery" type="text" 
                    ref="terms_of_delivery" 
                    v-model="form.terms_of_delivery" 
                  ></v-text-field> 
                </v-flex>
              </v-layout> 

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update Bill
              </v-btn>
            </v-card-actions>
            
          </form> 

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">
  
  import Form from 'helpers/Form.js'

  export default {

    data: () => ({
      form: new Form({
        bill_no: '',
        customer_id: '',
        sub_total: '',
        gst_including: '',
        total_amount: '',
        delivery_note: '',
        delivery_note_date: '',
        supplier_reference: '',
        terms_of_payment: '',
        buyer_order_no: '',
        despatch_document_no: '',
        despatch_through: '',
        destination: '',
        terms_of_delivery: '',
        billing_details: [],
        billing_taxes: [],
        billing_discounts: []
      }),
      total_amount: '', 
      customers: [],
      product_categories: [],
      taxes: [],
      discounts: []
    }), 

    computed: {
    },

    mounted() { 
      this.form.get('/api/customers')
        .then(data => {
          data.data.forEach(item => {
            this.customers.push({
              id: item.id,
              text: item.name,
              value: item.id
            })
          })
        })

      this.form.get('/api/product-categories')
        .then(data => {
          data.data.forEach(item => {
            this.product_categories.push({
              id: item.id,
              text: item.name,
              value: item.id
            })
          })
        })

      this.form.get('/api/taxes')
        .then(data => {
          data.data.forEach(item => {
            this.taxes.push({
              id: item.id,
              text: item.name,
              value: item.id,
              percent: item.tax_percent
            })
          })
        })

      this.form.get('/api/discounts')
        .then(data => {

          data.data.forEach(item => {
            this.discounts.push({
              id: item.id,
              text: item.name,
              value: item.id,
              percent: item.discount_percent
            })
          })
        })

      this.form.get(`/api/billings/${this.$route.params.sale_id}`)
        .then(data => {  
          console.log(data.data)
          this.form = new Form(data.data)
          this.form.customer_id = parseInt(this.form.customer_id)
          this.form.gst_including = !! parseInt(this.form.gst_including)
          this.form.billing_details.forEach(item => item.product_category_id = parseInt(item.product_category_id))
          this.form.billing_taxes.forEach(item => item.tax_id = parseInt(item.tax_id))
          this.form.billing_discounts.forEach(item => item.discount_id = parseInt(item.discount_id))

          this.calculate();
        })

    },

    methods: {

      update() {
        this.form.patch(`/api/billings/${this.$route.params.sale_id}`)
          .then(data  =>  {
            this.$router.push('/sales');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }, 

      addProductCategory() {
        this.form.billing_details.push({
          product_category_id: Number,
          amount: '',
          qty: ''
        })
      },

      addTaxCategory() {
        this.form.billing_taxes.push({
          tax_id: '',
          amount: ''
        })
      },

      addDiscountCategory() {
        this.form.billing_discounts.push({
          discount_id: '',
          amount: ''
        })
      },

      calculate() {
        this.calcAmount();
        this.calcSubTotal();
        this.calcTaxes();
        this.calcDiscounts();
        this.calcTotalAmount();

      },

      calcAmount(e) {
        this.form.billing_details.forEach(detail => {
          detail.amount = detail.qty * detail.cost_per_unit
        })
      }, 

      calcSubTotal() {
        let sub_total = 0 ;
        this.form.billing_details.forEach(detail => {
          sub_total += parseFloat(detail.amount)
        })

        this.form.sub_total = sub_total;
      },

      calcTaxes() {  
        if(this.form.gst_including)
          this.form.billing_taxes.forEach(billingTax => {
            this.form.billing_details.forEach(detail => {
              let tax = this.taxes.find(tax => tax.id == billingTax.tax_id)
              if(tax)        
                detail.amount = Math.round(detail.amount  / ( 1 + tax.percent / 100 ) * 100) / 100;
            })
          })

        this.calcSubTotal();

        this.form.billing_taxes.forEach(billingTax => { 
          let tax = this.taxes.find(tax => tax.id == billingTax.tax_id)
          if(tax)
            return billingTax.amount = Math.round( tax.percent * this.form.sub_total / 100  * 100) / 100;
        })
      }, 

      calcDiscounts() { 
        this.form.billing_discounts.forEach(billingDiscount => {
          let discount = this.discounts.find(discount => discount.id == billingDiscount.discount_id)
          if(discount)
            return billingDiscount.amount = Math.round( discount.percent * this.form.sub_total / 100 * 100) / 100;
        })
      }, 

      calcTotalAmount() {
        let taxes = 0;
        this.form.billing_taxes.forEach(billingTax => {
          taxes += billingTax.amount
        })

        let discounts = 0;
        this.form.billing_discounts.forEach(billingDiscount => {
          discounts += billingDiscount.amount
        })

        this.form.total_amount = Math.floor(parseFloat(this.form.sub_total) + parseFloat(taxes) - parseFloat(discounts))
      }
    }
  }
</script>