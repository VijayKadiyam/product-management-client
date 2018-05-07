<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit module
              <v-btn small color="primary"
                to="/modules"
              >View modules</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="update"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-text-field prepend-icon="view_module" name="module" label="Module" id="module" type="text" 
                ref="module"
                v-model="form.module"
                :rules="[() => !form.errors.has('module') || form.errors.get('module') ]"
              ></v-text-field>  

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update Module
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
        module: '' 
      })
    }),

    mounted() {
      this.form.get(`/api/modules/${this.$route.params.module_id}`)
        .then(data => {
          this.form = new Form(data.data)
        })
    },

    methods: {

      update() {
        this.form.patch(`/api/modules/${this.$route.params.module_id}`)
          .then(data  =>  {
            this.$router.push('/modules');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }
    }
  }
</script>