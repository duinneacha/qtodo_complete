<template>
  <q-page>
    <!-- <p>Todo Page</p> -->

      <div class="q-pa-md absolute full-width full-height column">

        <template v-if="tasksDownloaded">
          
          <div class="row q-mb-lg">
            <search />
            <sort />
          </div>

          <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No Search Results</p>

          
          <q-scroll-area class="q-scroll-area-tasks">

            <no-tasks
              v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"
              @showAddTask="showAddTask = true"
            ></no-tasks>

            <tasks-todo
              v-if="Object.keys(tasksTodo).length"
              :tasksTodo="tasksTodo"
            />
          

            

            <tasks-completed 
              v-if="Object.keys(tasksCompleted).length"
              :tasksCompleted="tasksCompleted"
              class="q-mb-xl"
            />
          </q-scroll-area>
          
          

          <div class="absolute-bottom text-center q-mb-lg no-pointer-events">

            <q-btn
              @click="showAddTask = true"
              class="all-pointer-events"
              round
              color="primary"
              size="24px"
              icon="add">

            </q-btn>
          </div>
        </template>

        <template v-else>
          
           <div class="absolute-center">
            <q-spinner-hourglass
              color="primary"
              size="3em"
            />
            <q-tooltip :offset="[0, 8]">QSpinnerHourGlass</q-tooltip>
          </div>

        </template>

      </div>
      <q-dialog v-model="showAddTask">
        <add-task @closeDialog="showAddTask = false" />
      </q-dialog>
      

      

  </q-page>
</template>


<script>

  import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {

    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapGetters('settings', ['settings']),
    ...mapState('tasks', ['search','tasksDownloaded'])

    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
    
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    
    'add-task' : require('components/Tasks/Modals/AddTask.vue').default,
    'tasks-todo' : require('components/Tasks/TasksTodo.vue').default,
    'tasks-completed' : require('components/Tasks/TasksCompleted.vue').default,
    'no-tasks' : require('components/Tasks/NoTasks.vue').default,
    'search' : require('components/Tools/Search.vue').default,
    'sort' : require('components/Tools/Sort.vue').default

  }
  
}
</script>


<style scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;

}
</style>
