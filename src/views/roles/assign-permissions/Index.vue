<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-layout row wrap>  
            <v-flex xs6>
              <v-subheader>Select Role &nbsp; 
                <router-link to="/roles/create">[Add New Role]</router-link>
              </v-subheader>

            </v-flex>
            <v-flex xs6>
              <v-select
                autocomplete
                name="role_id"
                ref="role_id"
                :items="roles"
                v-model="form.role_id"
                label="Select Role"
                :rules="[() => !form.errors.has('role_id') || form.errors.get('role_id') ]"
                @input="getPermissions"
              ></v-select>
            </v-flex>  
          </v-layout>

          <v-card-title primary-title>
            <h3 class="headline mb-0">Assign Permissions to Roles</h3>
          </v-card-title> 

          <form 
            @submit.prevent="create"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text>  
              <v-layout row wrap>
                <v-flex xs12
                  v-for="module in modules"
                  :key="module.index"
                >
                  <v-subheader>{{ module.module }}</v-subheader> 
                  <v-layout row wrap>
                    <v-flex xs4
                      v-for="permission in module.permissions"
                      :key="permission.index"
                    >
                      <v-switch :label="permission.label" :value="permission.id" v-model="form.permissionIds"></v-switch> 
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Assign Permission
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
        role_id: '',
        permissionIds: []
      }),
      roles: [],
      modules: [],
      permissions: [],
    }),

    mounted() {

      this.form.get('/api/roles')
        .then(data => {
          data.data.forEach(item => {
            this.roles.push({
              text: item.role,
              value: item.id
            })
          })
        })

      this.form.get('/api/modules')
        .then(data => { 
          console.log(data.data)
          data.data.forEach(item => { 
            this.modules.push({
              id: item.id,
              module: item.module,
              permissions: item.permissions
            })
          })
        })

    },

    methods: {

      create() {
        this.form.post('/api/roles/assign-permissions')
          .then(data  =>  {
            this.$router.push('/roles');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      },

      getPermissions() { 
        this.form.permissionIds = []
        this.form.get(`/api/roles/${this.form.role_id}`)
          .then(data => {
            data.data.permissions.forEach(permission => {
              this.form.permissionIds.push(permission.id)
            })
          }) 
      }
    }
  }
</script>