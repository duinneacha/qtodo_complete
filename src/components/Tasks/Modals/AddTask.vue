<template>
  <q-card>
  
    <modal-header>Add Task</modal-header>
    
    <q-form
      @submit.prevent="submitForm">



      <q-card-section>
        
        <modal-task-name 
          :name.sync="taskToSubmit.name"
          ref="modalTaskName"
          />
        <modal-due-date 
          :dueDate.sync="taskToSubmit.dueDate"
          @clear="clearDueDate"
          />

        <modal-due-time
          :dueTime.sync="taskToSubmit.dueTime"
          v-if="taskToSubmit.dueDate"
         />
          
      </q-card-section>

      <modal-buttons></modal-buttons>

      <!-- <pre> {{ taskToSubmit }} </pre> -->

    </q-form>

  </q-card>  
</template>

<script>

import { mapActions } from 'vuex';
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'

export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    submitTask() {
   
      if (!this.taskToSubmit.dueDate) {
        this.taskToSubmit.dueTime = null
      }

      this.addTask(this.taskToSubmit);
      this.$emit('closeDialog');

    }
  }
  
}
</script>

<style scoped>

</style>