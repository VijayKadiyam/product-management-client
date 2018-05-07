import * as types from '../mutation-types.js'

const state = {
  user: {
    id: '',
    name: '',
    email: '',
    api_token: '',
    role: ''
  }
}

const mutations = {
  // Initialize the local storage
  [types.AUTH_SET] (state, user) {
    console.log(user);
    if(user.id)
      localStorage.setItem('id', user.id)
    if(user.name)
      localStorage.setItem('name', user.name)
    if(user.email)
      localStorage.setItem('email', user.email)
    if(user.api_token)
      localStorage.setItem('api_token', user.api_token)
    if(user.roles &&user.roles.length){
      localStorage.setItem('role', user.roles[0].role)
      localStorage.setItem('role_id', user.roles[0].id)
    }
 }, 

  // Initialize the state variables
  [types.AUTH_INITIALIZE] (state) {
    state.user.id = localStorage.getItem('id')
    state.user.name = localStorage.getItem('name')
    state.user.email = localStorage.getItem('email')
    state.user.api_token = localStorage.getItem('api_token')
    state.user.role = localStorage.getItem('role')
    state.user.role_id = localStorage.getItem('role_id')
  },

  // Remove the local storage values
  [types.AUTH_REMOVE] (state) {
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('api_token')
    localStorage.removeItem('role')
    localStorage.removeItem('role_id')
  }
}
  
const actions = {
  // To initialize the local storage
  authSet ({ commit }, { data }) {
    commit(types.AUTH_SET, data)
  },

  // To initialize the state variables
  authInitialize({ commit }) {
    commit(types.AUTH_INITIALIZE);
  },

  // To remove the local storage
  authRemove({ commit }) {
    commit(types.AUTH_REMOVE);
  }
}


export default {
  state, mutations, actions
}