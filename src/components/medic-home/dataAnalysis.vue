<template>
  <div class = "aggregate-graphs">
    <h1 class = "title"> {{graphWarning}} </h1>
    <breakdownGraph v-if="ready" :code="medicalcode"/>
    <br>
    <aggregateWellness v-if="ready" :code="medicalcode"/>
    <br>
    <aggregateComplete v-if="ready" :code="medicalcode"/>
  </div>
</template>

<script>
import axios from 'axios';
import pieceLabel from 'chart.piecelabel.js';
import breakdownGraph from './reports/breakdownGraph';
import aggregateWellness from './reports/aggregateWellness';
import aggregateComplete from './reports/aggregateCompletion';
export default {
  name: 'aggregateReport',
  components: {breakdownGraph, aggregateWellness, aggregateComplete},
  data() {
      return {
        medicalcode: '',
        graphWarning: '',
        ready: false
      }
  },

  methods: {
     getCode(){
       var self = this;
        // return the medical code for the MP based on their username
        axios.get('http://localhost:8080/returnCode?username='+this.$store.getters.authenticatedUsername)
          .then(function(response) {
            // extract out medical code from the response
            self.medicalcode = response.data.medicalcode;
            // set flag to true after code has been returned, so graphs can start pulling 
            // necessary data
            self.ready = true;
          })
          .catch(function(err) {
            console.log(err);
            self.graphWarning = "Reports cannot be displayed at this time. Please try again."
          })
        }
  },

  mounted() {
      // return the MP's code
      this.getCode();
  },
}

</script>

<style lang="scss" scoped>
  .aggregate-graphs {
      padding-top: 2%;
      padding-left: 3%;
  }
</style>
