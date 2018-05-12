<template>
   <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Products Report
            </h3> 
          </v-card-title>

          <v-card-text>

            <v-layout row wrap>
              <v-flex xs4>
                <v-select
                  ref="product_category_id"
                  :items="product_categories"
                  v-model="form.product_category_id"
                  label="Select Product Category"
                  single-line
                  :rules="[() => !form.errors.has('product_category_id') || form.errors.get('product_category_id') ]"
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
              :href="`${api.baseUrl}api/product-category-report?company_id=${company.id}&product_category_id=${form.product_category_id}&fromDate=${form.fromDate}&toDate=${form.toDate}`"
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
        product_category_id: '',
        fromDate: '',
        toDate: ''
      }),
      product_categories: []
    }),

    computed: {
      ...mapGetters([
        'api', 'company'
      ])
    },

    mounted() {  

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
    }
  }
</script>