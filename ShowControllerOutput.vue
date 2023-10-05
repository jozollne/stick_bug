<template>
  <div>
    <v-card>
      {{ eingabe.y_data }}
      {{ eingabe.x_data }}
      {{ eingabe.sw_data }}
    </v-card>

    <div style="position: relative; width: 2000px; height: 2000px; border: 1px solid black;">
      <div 
        :style="{
          position: 'absolute', 
          top: currentY + 'px', 
          left: currentX + 'px', 
          width: '10px', 
          height: '10px', 
          backgroundColor: 'red'
        }"
      ></div>
    </div>
  </div>
</template>
  
  <script lang="ts"> 
import { defineComponent, PropType } from '@vue/runtime-dom'
import axios from 'axios'
import Eingabe from '../../types/DatenbankTypes'

export default defineComponent({
  data() {
    return {
      movementIntervalX: null as any,
      movementIntervalY: null as any,
      // Laden Animation
      loadingUpdate: false,
      loadingDelete: false,
      // id der Notiz
      id: 0, // Initialized as a number
      // rules
      rules: [
        (value: string) => !!value || 'Required.', // Specified type
        (value: string) => (value && value.length >= 3) || 'Min 3 characters', // Specified type
      ],
      //#endregion
      //#region auswahl welches Panel aktiv ist
      activePanel: '' as string | number[], // Provide appropriate type
      //#endregion
      clicked: false,
      // Startpunkte
      currentX: 500,
            currentY: 500
          };
        },
        watch: {
    'eingabe.x_data': function(newVal) {
      if (this.movementIntervalX) {
        clearInterval(this.movementIntervalX);
      }
      if (newVal < 250) {
        this.movementIntervalX = setInterval(() => this.moveLeft(), 100);
      } else if (newVal > 750) {
        this.movementIntervalX = setInterval(() => this.moveRight(), 100);
      } else {
        clearInterval(this.movementIntervalX);
      }
    },

    'eingabe.y_data': function(newVal) {
      if (this.movementIntervalY) {
        clearInterval(this.movementIntervalY);
      }
      if (newVal < 250) {
        this.movementIntervalY = setInterval(() => this.moveUp(), 100);
      } else if (newVal > 750) {
        this.movementIntervalY = setInterval(() => this.moveDown(), 100);
      } else {
        clearInterval(this.movementIntervalY);
      }
    }
  },

  props: {
    eingabe: {
      required: true,
      type: Object as PropType<Eingabe>
    }
  },

  methods: {
    remove(id: number) {
      this.id = id
      const options = {
        method: 'DELETE',
        url: 'http://192.168.10.254:3000/data/' + id,
        data: {}
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });

      this.loadingDelete = true
      
      setTimeout(() => {
        this.activePanel = ''
        this.$emit('refresh')
        this.loadingDelete = false
      },1000)
    },

    moveLeft() {     
      this.currentX -= 10;
    },
    moveRight() {
      this.currentX += 10;
    },
    moveUp() {
      this.currentY -= 10;
    },
    moveDown() {
      this.currentY += 10;
    },
    
    beforeDestroy() {
    if (this.movementIntervalX) {
      clearInterval(this.movementIntervalX);
    }
    if (this.movementIntervalY) {
      clearInterval(this.movementIntervalY);
    }
  }
  },
});
</script>
