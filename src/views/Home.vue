<template>
  <div> 

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap> 
        <v-flex xs12 sm4>
          <v-card>
            <v-card-media src="http://www.preciseconchempvtltd.co.in/images/product2.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Product Categories</h3>
                <div>
                  <b>Count: </b>{{ productCategoryCount }}
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange"
                to="product-categories"
              >View All</v-btn> 
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm4>
          <v-card>
            <v-card-media src="http://www.preciseconchempvtltd.co.in/images/product4.jpg" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Stock Categories</h3>
                <div>
                  <b>Count: </b>{{ stockCategoryCount }}
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange"
                to="/stock-categories"
              >View All</v-btn> 
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script type="text/javascript">

  import Form from 'helpers/Form.js'
  
  export default {
    data:() => ({
      form : new Form,
      productCategoryCount: '',
      stockCategoryCount: ''
    }),

    mounted() {

      this.form.get('/api/product-categories')
        .then(data => {
          this.productCategoryCount = data.data.length
        })

      this.form.get('/api/stock-categories')
        .then(data => {
          this.stockCategoryCount = data.data.length
        })
    }
  }
</script>