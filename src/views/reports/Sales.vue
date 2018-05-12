<template>
   <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Sales Report
            </h3> 
          </v-card-title>

          <v-card-text>

            <v-layout row wrap>
              <v-flex xs4>
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

            <v-layout row wrap>
              <v-flex xs6>
                From Date: 
                <br>
                <v-date-picker v-model="form.fromDate" :landscape="true" :reactive="true"></v-date-picker>
              </v-flex>
              <v-flex xs6>
                To Date: 
                <br>
                <v-date-picker v-model="form.toDate" :landscape="true" :reactive="true"></v-date-picker>
              </v-flex>
            </v-layout>

            <a
              :href="`${api.baseUrl}api/customer-ledger?company_id=${company.id}&customer_id=${form.customer_id}&fromDate=${form.fromDate}&toDate=${form.toDate}`"
              target="_blank" 
            >
              <v-btn color="primary"
                target="_blank"
              >
                Get Report
              </v-btn>
            </a> 
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">  

  import { mapGetters } from 'vuex'

  import Form from 'helpers/Form.js'

  export default {
    data:() => ({
      form: new Form({
        customer_id: '',
        fromDate: '',
        toDate: ''
      }),
      customers: []
    }),

    computed: {
      ...mapGetters([
        'api', 'company'
      ])
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
    }
  }
</script>