<template>
  <div class = "aggregate-graphs">
    <p id = patientName>{{patient}}</p>
    <comparisonGraph/>
    <br>
    <singleWellness/>
    <br>
    <singleComplete/>
  </div>
</template>

<script>
import axios from 'axios';
import pieceLabel from 'chart.piecelabel.js';
import comparisonGraph from './reports/comparison-graph';
import singleWellness from './reports/single-wellness';
import singleComplete from './reports/single-completion';
import patientHomepageVue from '../patient-home/patient-homepage.vue';
export default {
  name: 'singleReport',
  data() {
      return {
        patientList: [],
        // Create an array to store the 5 dates made from moment.js
        patient: '',

      }
  },
  methods:{

    getPatientName(){
      this.patient = this.$store.state.username;
      

      },
  },
  mounted(){
    this.getPatientName()
  },
  
  components: {comparisonGraph, singleWellness, singleComplete},
}

</script>

<style lang="scss" scoped>
  .aggregate-graphs {
      padding: 2% 3% 0 3%;
  }
  #patientName{
    font-size: 30pt;
  }
</style>
