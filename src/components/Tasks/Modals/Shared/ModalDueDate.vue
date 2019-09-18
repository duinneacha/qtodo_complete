<template>
  
  <!-- Due Date -->
  <div class="row q-mb-sm">
    <q-input
      label="Due Date"
      outlined
      :value="dueDate"
      @input="$emit('update:dueDate', $event)"
      >
      <template v-slot:append>
        
        <q-icon
          v-if="dueDate"
          @click="$emit('clear')"
          name="close"
          class="cursor-pointer" >
        </q-icon>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date 
              :value="dueDate" 
              @input="$emit('update:dueDate', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
props: ['dueDate']
}
</script>

<style>

</style>