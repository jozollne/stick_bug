<template>
  <div class="app" :class="(mode === 'dark') ? 'dark' : ''">
    <WebSocketData/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import WebSocketData from './components/WebSocketData.vue';

export default defineComponent ({
  data() {
    return {
      eingaben: [],
      mode: 'dark'
    };
  },

  components: {
    WebSocketData
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
