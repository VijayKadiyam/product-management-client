<template>
   <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Product categories
              <v-btn small color="primary"
                to="/product-categories/create"
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
              <td v-html="props.item.product_category"></td> 
              <td v-html="props.item.product_description"></td>  
              <td> 
                {{ props.item.quantity_left }} 
                <v-btn flat small color="primary" 
                  @click="updateProductCategoryQuantity(props.item.id)"
                > 
                  [ Refresh ]
                </v-btn> 
              </td>  
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0"
                  :to="`/product-categories/${props.item.id}/edit`"
                >
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
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

  import Form from 'helpers/Form.js'
  
  export default {

    data: () => ({
      form: new Form,
      search: '',
      headers: [
        { text: 'Product Category Name', sortable:false, value: 'product_category' },
        { text: 'Product Description', value: 'product_description' }, 
        { text: 'Quantity left', value: 'quantity_left' }, 
        { text: 'Actions', value: '' }
      ],
      items: []
    }),

    mounted() {
      this.form.get('/api/product-categories')
        .then(data => { 
          data.data.forEach(item => {
            this.items.push({
              id: item.id,
              product_category: `
                ${item.name}
                <br>
                <b>HSN Code: </b>${item.hsn_code}
              `,
              product_description: `
                ${
                  item.stock_categories.map(stock => {
                    return `
                      <br>
                      ${stock.name}: ${stock.pivot.value} ${stock.unit.unit}
                    `
                  })
                }
              `,
              quantity_left: item.quantity_left
            }); 
          })

          // this.items = data.data 
          
        })
        .catch(errors => {

        })
    },

    methods: {
      updateProductCategoryQuantity(id) {
        this.form.get(`/api/product-categories/${id}/refresh-quantity`)
          .then(data => {
            location.reload();
          })
      }
    }

  }
</script>