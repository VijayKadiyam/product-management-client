<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit permission
              <v-btn small color="primary"
                to="/permissions"
              >View permissions</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="update"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-layout row wrap>  
                <v-flex xs6>
                  <v-subheader>Select Module &nbsp; 
                    <router-link to="/modules/create">[Add New Module]</router-link>
                  </v-subheader>

                </v-flex>
                <v-flex xs6>
                  <v-select
                    autocomplete
                    name="module_id"
                    ref="module_id"
                    :items="modules"
                    v-model="form.module_id"
                    label="Select Module"
                    :rules="[() => !form.errors.has('module_id') || form.errors.get('module_id') ]"
                  ></v-select>
                </v-flex>  
              </v-layout>

              <v-text-field prepend-icon="exit_to_app" name="label" label="Label" id="label" type="text" 
                ref="label"
                v-model="form.label"
                :rules="[() => !form.errors.has('label') || form.errors.get('label') ]"
              ></v-text-field> 

              <v-text-field prepend-icon="security" name="permission" label="Permission" id="permission" type="text" 
                disabled
                ref="permission"
                v-model="form.permission"
                :rules="[() => !form.errors.has('permission') || form.errors.get('permission') ]"
              ></v-text-field>  

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update Permission
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
        permission: '',
        label: ''
      }),
      modules: []
    }),

    mounted() {
      this.form.get(`/api/permissions/${this.$route.params.permission_id}`)
        .then(data => {
          this.form = new Form(data.data)
          this.form.module_id = parseInt(data.data.module_id)
        })

      this.form.get('/api/modules')
        .then(data => {
          data.data.forEach(item => {
            this.modules.push({
              text: item.module,
              value: item.id
            })
          })
        })
    },

    methods: {

      update() {
        this.form.patch(`/api/permissions/${this.$route.params.permission_id}`)
          .then(data  =>  {
            this.$router.push('/permissions');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }
    }
  }
</script>