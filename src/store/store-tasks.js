import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'


// State Object - all of our data goes in here
const state = {

  tasks: {},
  search: '',
  sort: 'name',
  tasksDownloaded: false

}

// Mutations Object - contains methods that manipulate the state - synchronous
const mutations = {
  updateTask(state, payload) {

    Object.assign(state.tasks[payload.id], payload.updates)

  },
  deleteTask(state, id) {

    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}


// Actions Objects - Methods that can be asynchronous
const actions = {
  updateTask({ dispatch }, payload) {

    dispatch('fbUpdateTask', payload)
  },
  deleteTask( { dispatch }, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask( { dispatch }, newTask) {
    let taskID = uid();
    let payload = {
      id: taskID,
      task: newTask
    }

    dispatch('fbAddTask', payload);

  },
  setSearch( { commit }, value) {
    commit('setSearch', value)
  },
  setSort( { commit }, value) {
    commit('setSort', value)
  },
  fbReadData( { commit }) {
    
    let userID =  firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/' + userID)

    // Initial check for data
    userTasks.once('value', snapshot => {
      commit('setTasksDownloaded', true)
    }, error => {
      showErrorMessage(error.message)
      this.$router.replace('/auth')
    })
    
    // Child Added
    userTasks.on('child_added', snapshot => {
      
      let task = snapshot.val()
      
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })

    // Child Updated
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }

      commit('updateTask', payload)

    })

    // Child Removed
    userTasks.on('child_removed', snapshot => {
      let taskID = snapshot.key
      commit('deleteTask', taskID)
    })
  },
  fbAddTask({}, payload) {
    
    let userID = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userID + '/' + payload.id)
    taskRef.set(payload.task, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task added')
      }
    })
  },
  fbUpdateTask({}, payload) {
    let userID = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userID + '/' + payload.id)
    taskRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        
        let keys = Object.keys(payload.updates)
        
        if (!(keys.includes('completed') && keys.length == 1)) {
          Notify.create('Task updated')
        }
      }
    })
  },
  fbDeleteTask({}, TaskID) {
    let userID = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userID + '/' + TaskID)
    taskRef.remove( error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task deleted')
      }
    })
  }

}

// Getters Object - methods that get the data from the state, which then can be used by components
const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks)
    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
          taskBProp = state.tasks[b][state.sort].toLowerCase()
      
      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1
      else return 0
    })

    keysOrdered.forEach((key) => {
      tasksSorted[key] = state.tasks[key]
    })


    return tasksSorted


  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
        tasksFiltered = {}
    if (state.search) {
      
      Object.keys(tasksSorted).forEach(function(key) {
        let task = tasksSorted[key],
            taskNameLowerCase = task.name.toLowerCase(),
            searchLowerCase = state.search.toLowerCase()

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })

      return tasksFiltered
    }
    return tasksSorted
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(key => {
       let task = tasksFiltered[key]
      
       if(!task.completed) {
          tasks[key] = task
       }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(key => {
       let task = tasksFiltered[key]
      
       if(task.completed) {
          tasks[key] = task
       }
    })
    return tasks
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