import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message.js'

// State Object - all of our data goes in here
const state = {
  loggedIn: false
}

// Mutations Object - contains methods that manipulate the state - synchronous
const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}


// Actions Objects - Methods that can be asynchronous
const actions = {
  registerUser({}, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  loginUser({}, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  logoutUser() {
    
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged( (user) => {
      Loading.hide()
      if (user) {

        // User Logs In
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/')
        dispatch('tasks/fbReadData', null, { root: true })
      } else {

        // User Logs Out
        commit('tasks/clearTasks', null,  { root: true })
        commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth')
      }
    })
  }
}

// Getters Object - methods that get the data from the state, which then can be used by components
const getters = {

}

// The objects need to be exported,
// namespaces is there to allow multiple stores within the app
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}