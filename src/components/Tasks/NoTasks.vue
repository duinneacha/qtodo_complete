
<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >

    <q-banner class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="done_outline" color="primary" />
        </template>
        You have no Tasks
        <template v-slot:action>
          <q-btn 
            @click="$root.$emit('showAddTask')"
            flat 
            color="primary" 
            label="Add Task" />
        </template>
      </q-banner>
  </transition>
</template>

<script>
export default {
  
}
</script>