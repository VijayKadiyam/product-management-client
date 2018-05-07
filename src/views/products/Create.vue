<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Add a product
              <v-btn small color="primary"
                to="/products"
              >View products</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="create"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text>  

              <v-layout row wrap> 

                <v-flex xs6>
                  <v-subheader>Product Category</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    ref="product_category_id"
                    :items="product_categories"
                    v-model="form.product_category_id"
                    label="Select Product"
                    single-line
                    :rules="[() => !form.errors.has('product_category_id') || form.errors.get('product_category_id') ]"
                  ></v-select>
                </v-flex>

              </v-layout> 

              <v-text-field prepend-icon="money" name="qty" label="Quantity" id="qty" type="text" 
                ref="qty"
                v-model="form.qty"
                :rules="[() => !form.errors.has('qty') || form.errors.get('qty') ]"
              ></v-text-field> 

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Add Product
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
        product_category_id: '',
        qty: '' 
      }),
      product_categories: []
    }),

    mounted() { 
      this.form.get('/api/product-categories')
        .then(data => {
          data.data.forEach(item => {
            this.product_categories.push({
              id: item.id, text: item.name, value: item.id
            })
          })
        })
    },

    methods: {

      create() {
        this.form.post('/api/products')
          .then(data  =>  {
            this.$router.push('/products');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }, 
    }
  }
</script>