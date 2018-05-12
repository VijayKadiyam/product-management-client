<template>
  <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    class="grey lighten-4"
    v-model="nav.opened"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
          row
          v-if="item.heading"
          align-center
          :key="item.key"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <!-- <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex> -->
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="" 
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click="" 
            :to="child.url"
            v-if="permissions.includes(child.permission)"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile @click="" :key="item.text"  
          :to="item.url"
          v-if="permissions.includes(item.permission) || item.permission == true"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script type="text/javascript">
  
  import Form from 'helpers/Form.js'
  import { mapGetters } from 'vuex'
  
  export default {
    data: () => ({
      modules: [],
      permissions: [],
      items: [],
      form: new Form, 
    }),

    computed: {
      ...mapGetters([
        'nav', 'user', 'company'
      ]), 
    },

    mounted() { 

      this.updateRole();  
      this.updateItems();

    },

    methods: {

      updateRole() {
        this.form.get(`/api/roles/${this.user.role_id}`)
          .then(data => { 
            // console.log(data.data)
            this.permissions = data.data.permissions.map(permission => permission.permission) 
            this.updateItems(); 
          }) 
      },

      updateItems() {
        this.items = [ 
          { icon: 'dashboard', text: 'Dashboard', url: '/dashboard' }, 

          { heading: 'Sales' },
          { icon: 'attach_money', text: 'Product Sales', url: '/sales' , permission: 'product_sales' },
          
          { heading: 'Products' },
          { icon: 'local_mall', text: 'Product Categories', url: '/product-categories', permission: 'product_categories' },
          { icon: 'add_shopping_cart', text: 'Add/Edit Products', url: '/products', permission: 'add_edit_products' },
          
          { heading: 'Stocks' },
          { icon: 'account_balance', text: 'Stock Categories', url: '/stock-categories', permission: 'stock_categories' },
          { icon: 'shopping_cart', text: 'Add/Edit Stocks', url: '/stocks', permission: 'add_edit_stocks' },

          { heading: 'Contacts' },
          { icon: 'navigate_next', text: 'Suppliers', url: '/suppliers', permission: 'suppliers' }, 
          { icon: 'navigate_before', text: 'Customers', url: '/customers', permission: 'customers' }, 

          { heading: 'My Profile' },
          { icon: 'domain', text: 'Companies', url: '/companies', permission: true },
          // { icon: 'person_pin', text: 'My Details', url: '/mydetails' },
          { icon: 'settings', text: 'Settings', url: '/settings', permission: true },

          { heading: 'Utilities' }, 
          { icon: 'device_hub', text: 'Measurement Units', url: '/units', permission: 'units' }, 
          { icon: 'money_off', text: 'Tax Percents', url: '/taxes', permission: 'tax_percents' }, 
          { icon: 'money_off', text: 'Discount Percents', url: '/discounts', permission: 'discount_percents' }, 
          { icon: 'people', text: 'Users', url: '/users', permission: 'users' },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'User Roles and Permissions',
            model: false,
            children: [
              { icon: 'camera_roll', text: 'Roles', url: '/roles', permission: 'roles' },
              { icon: 'security', text: 'Permissions', url: '/permissions', permission: this.user.role == 'SuperAdmin' ? true : false },
              { icon: 'code', text: 'Assign permission to a role', url: '/roles/assign-permissions', permission: 'assign_permission_to_role' }
            ]
          },
          { icon: 'view_module', text: 'Modules', url: '/modules', permission: this.user.role == 'SuperAdmin' ? true : false },


          { heading: 'Reports' },
          { text: 'Sales Report', url: '/sales-report' , permission: true },
          // { text: 'Stocks Report', url: '/stocks-products-report' , permission: true },
          { text: 'Products Report', url: '/products-report' , permission: true },



        ];
      }
    }
  }
</script>