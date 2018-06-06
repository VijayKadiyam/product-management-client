<template>
   <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Production
              <v-btn small color="primary"
                to="/products/create"
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
              <td v-html="props.item.qty"></td> 
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0"
                  :to="`/products/${props.item.id}/edit`"
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
        { text: 'Product Category', sortable:false, value: 'product_category' }, 
        { text: 'Product Description', sortable:false, value: 'product_description' }, 
        { text: 'Quantity Added', sortable:false, value: 'qty' }, 
      ],
      items: []
    }),

    mounted() {
      this.form.get('/api/products')
        .then(data => {
          // console.log(data.data)
          data.data.forEach(item => {
            this.items.push({
              id: item.id,
              product_category: `
                ${item.product_category.name}
                <br>
                Date: ${item.created_at}
              `,
              product_description: `
                ${
                  item.product_category.stock_categories.map(stock => {
                    return `
                      <br>
                      ${stock.name}: ${stock.pivot.value} ${stock.unit.unit}
                    `
                  })
                }
              `,
              qty: item.qty
            })
          })
        })
        .catch(errors => {

        })
    }

  }
</script>