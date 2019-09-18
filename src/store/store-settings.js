import { LocalStorage } from 'quasar'


// State Object - all of our data goes in here
const state = {
  settings: {
    show12HourTimeFormat: false,
    showTasksInOneList: false
  }
}

// Mutations Object - contains methods that manipulate the state - synchronous
const mutations = {
  setShow12HourTimeFormat(state, value) {
    state.settings.show12HourTimeFormat = value
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings)
  }
}


// Actions Objects - Methods that can be asynchronous
const actions = {
  setShow12HourTimeFormat({ commit, dispatch }, value) {
    commit('setShow12HourTimeFormat', value)
    dispatch('saveSettings')
  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit('setShowTasksInOneList', value)
    dispatch('saveSettings')
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings({ commit }) {
    
    let settings = LocalStorage.getItem('settings')
    
    if(settings) {
      commit('setSettings', settings)
    }
  }
}

// Getters Object - methods that get the data from the state, which then can be used by components
const getters = {
  settings: state => {
    return state.settings
  }
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