<template>
   <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Stocks
              <v-btn small color="primary"
                to="/stocks/create"
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
              <td v-html="props.item.date"></td> 
              <td v-html="props.item.stockCategory"></td> 
              <td class="text-xs-left">{{ props.item.qty }}</td> 
              <td class="text-xs-left">{{ props.item.price }}</td> 
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0"
                  :to="`/stocks/${props.item.id}/edit`"
                >
                  <v-icon color="teal">edit</v-icon>
                </v-btn> 
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
        { text: 'Date', sortable:false, value: 'date' },
        { text: 'Stock Category Name', sortable:false, value: 'stockCategory' },
        { text: 'Quantity', value: 'qty' }, 
        { text: 'Latest Purchase Price', sortable:false, value: 'price' },
      ],
      items: []
    }),

    mounted() {
      this.form.get('/api/stocks')
        .then(data => { 
          data.data.forEach(item  =>  {
            this.items.push({
              id: item.id,
              date: `
                <b>Date: </b>${item.date}
                <br>
                ${item.invoice_no}
              `,
              stockCategory: `
                ${item.stock_category.name} 
                <br>
                <b>Supplier: </b> ${item.supplier.name}
              `,
              price: 'Rs ' + item.price,
              qty: item.qty
            }) 
          }) 
        })
        .catch(errors => {

        })
    }

  }
</script>