<template>

  <div class = "aggregate-graphs">
    <div id = "patientLabel">
      <patientSelector @selected = "routeIndividualReport"/>
    </div>
    <div id="graphs">
      <breakdownGraph/>
      <br>
      <aggregateWellness/>
      <br>
      <aggregateComplete/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import breakdownGraph from './reports/breakdown-graph';
import aggregateWellness from './reports/aggregate-wellness';
import aggregateComplete from './reports/aggregate-completion';
import patientSelector from './patient-selector.vue';
export default {
  name: 'dataAnalysis',
  methods: {
    routeIndividualReport() {
      this.$router.push('/MedicHome/IndividualReport');
    }
  },
  created(){
      this.$store.dispatch("singlePatientWellness",null);
      this.$store.dispatch("singlePatientCompletion",null);
  },
  components: {breakdownGraph, aggregateWellness, aggregateComplete, patientSelector},
}
</script>

<style lang="scss" scoped>
  .aggregate-graphs {
      padding: 10% 3% 2% 3%;
  }
  #patientLabel{
    float: right;
  }
  #graphs {
    margin-top: 5%;
  }
</style>
