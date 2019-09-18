<template>
  <!-- Due Time -->
  <div 
    class="row q-mb-sm">
    <q-input
      label="Due Time"
      class="col"
      outlined 
      :value="dueTime"
      @input="$emit('update:dueTime', $event)"
      >
      <template v-slot:append>
      <q-icon
          v-if="dueTime"
          @click="$emit('update:dueTime', '')"
          name="close"
          class="cursor-pointer" >
        </q-icon>
        
          <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time 
              :value="dueTime" 
              @input="$emit('update:dueTime', $event)"
              />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

</template>

<script>
export default {
  props: ['dueTime']
}
</script>

<style>

</style>