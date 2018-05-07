<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Add a new user
              <v-btn small color="primary"
                to="/users"
              >View users</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="create"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-text-field prepend-icon="person" name="name" label="Name" type="text"
                ref="name"
                v-model="form.name"
                :rules="[() => !form.errors.has('name') || form.errors.get('name') ]"
              ></v-text-field>

              <v-text-field prepend-icon="email" name="email" label="Email" type="email"
                ref="email"
                v-model="form.email"
                :rules="[() => !form.errors.has('email') || form.errors.get('email') ]"
              ></v-text-field>

              <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"
                ref="password"
                v-model="form.password"
                :rules="[() => !form.errors.has('password') || form.errors.get('password') ]"
              ></v-text-field>

              <v-text-field prepend-icon="lock" name="password_confirmation" label="Confirm Password" id="password_confirmation" type="password"
                ref="password_confirmation"
                v-model="form.password_confirmation"
              ></v-text-field> 

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
                  ></v-select>
                </v-flex>  
              </v-layout>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Create User
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
        email: '',
        password: '',
        password_confirmation: '',
        role_id: ''
      }),
      companies: [],
      roles: []
    }),

    mounted() {

      this.form.get('/api/roles')
        .then(data => {
          data.data.forEach(role => {
            if(role.role != "SuperAdmin")
              this.roles.push({
                id: role.id,  
                text: role.role,
                value: role.id
              })
          })
        })

      this.form.get('/api/companies')
        .then(data  =>  {
          data.data.forEach(item => {
            this.companies.push({
              text: item.name,
              value: item.id
            })
          })
        })
    },  

    methods: {

      create() {
        this.form.post('/api/users')
          .then(data  =>  {
            this.$router.push('/users');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }
    }
  }
</script>