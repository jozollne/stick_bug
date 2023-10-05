<template>
  <div class="app" :class="(mode === 'dark') ? 'dark' : ''">
    <!--<WebSocketData/>-->
    <Monitor/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
//import WebSocketData from './components/WebSocketData.vue';
import Monitor from './components/Monitor.vue';


export default defineComponent ({
  data() {
    return {
      eingaben: [],
      mode: 'dark'
    };
  },

  components: {
  //WebSocketData,
  Monitor
},


    methods: {  
  },
})
</script>

<style>
  .dark {
    height: 1000vh;
    background-color: #313131;
    color: #000000;
  }
</style>
