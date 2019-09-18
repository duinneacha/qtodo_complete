<template>
        <!-- Task Name -->
        <div class="row q-mb-sm">
          <q-input
            class="col"
            outlined
            v-select-all
            :value="name"
            @input="$emit('update:name', $event)"
            label="Task Name"
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            clearable
            autofocus>
            
          </q-input>
        </div>  
</template>


<script>

import { selectAll } from 'src/directives/directive-select-all'
export default {
  props: ['name'],
  directives: {
    selectAll
  }
}
</script>

<style>

</style>
