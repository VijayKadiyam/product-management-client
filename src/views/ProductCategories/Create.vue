<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Add a new product category
              <v-btn small color="primary"
                to="/product-categories"
              >View product categories</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="create"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-text-field prepend-icon="local_mall" name="name" label="Product category" id="name" type="text" 
                ref="name"
                v-model="form.name"
                :rules="[() => !form.errors.has('name') || form.errors.get('name') ]"
              ></v-text-field> 

              <v-text-field prepend-icon="code" name="hsn_code" label="HSN Code" id="hsn_code" type="text" 
                ref="hsn_code"
                v-model="form.hsn_code"
                :rules="[() => !form.errors.has('hsn_code') || form.errors.get('hsn_code') ]"
              ></v-text-field> 

              <v-subheader>
                Product Description

                <v-btn fab small color="primary" @click="addStockCategory">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-subheader>

              <v-layout row wrap
                v-for="stock_category in form.stock_categories"
                :key="stock_category.index"
              >  
                <v-flex xs4>
                  <v-select
                    ref="id"
                    :items="stock_categories"
                    v-model="stock_category.id"
                    label="Select stock category"
                    single-line 
                    @input="updateUnit(stock_category)"
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-text-field prepend-icon="money" name="value" label="Quantity" id="value" type="text" 
                    ref="value" 
                    v-model="stock_category.value" 
                  ></v-text-field>  
                </v-flex>
                <v-flex xs4>
                  <span>{{ stock_category.unit }}</span>
                </v-flex>

              </v-layout> 

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Create Product Category
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
        name: '',
        hsn_code: '',
        stock_categories: [] 
      }),
      stock_categories: []
    }),

    mounted() { 
      this.form.get('/api/stock-categories')
        .then(data  =>  {
          data.data.forEach(item => {  

            this.stock_categories.push({
              text: item.name,
              value: item.id, 
              unit_id: item.unit_id,
              unit: item.unit.unit
            }) 
          })
        }) 
    },

    methods: {

      create() {
        this.form.post('/api/product-categories')
          .then(data  =>  {
            this.$router.push('/product-categories');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }, 

      updateUnit(category) {  
        let stockCategory = this.stock_categories.find(item => item.value === category.id)
        category.unit = stockCategory.unit;

      },

      addStockCategory() {
        this.form.stock_categories.push({
          id: '',
          value: ''
        })
      }
    }
  }
</script>