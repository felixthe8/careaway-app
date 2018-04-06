<template>
  <div class = "breakdown">
    <h1 class = "title is-3 is-spaced"> Patient Breakdown by Diagnosis </h1>
    <h2 class="subtitle"> {{breakdownWarning}} </h2>
    <chart v-if = 'showChart' 
      class = 'control'
      v-bind:class = "{'is-loading': loading}"
      :elemID = 'chartID' 
      :type = 'chartType' 
      :chartLabels = 'chartLabels' 
      :chartValues = 'chartValues'
      :maxValue = 'maxValue' 
      :xLabel = 'xLabel' 
      :yLabel = 'yLabel'/>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';
import chart from './chart';
export default {
  name: 'aggregate-breakdown',
  data() {
      return {
        loading: true,
        conditionCount: {},
        breakdownWarning: '',
        chartID: this.$options.name,
        chartLabels: [],
        chartValues: [],
        chartType: 'bar',
        showChart: false,
        maxValue: 0,
        xLabel: 'Patient Diagnoses',
        yLabel: '# of Patients'
      }
  },
  components: {chart},
  methods: {
      getInfo() {
        // STEP 1 - Gather the information necessary to create the chart
        var self = this;
        // Return patients who are associated with the medical professional
        axios.get(this.$store.getters.patientBreakdownURL+this.$store.getters.medicalCode)
        .then(function(response) {
          // If there are no diagnoses returned
          if(response.data === undefined || response.data.length == 0) {
            self.breakdownWarning = 'Sorry, you need to add patients before you can view this report';
          } else {
          // Loop through the patient diagnoses that was returned. In the conditionCount object, use the diagnoses as keys
          for (var d of response.data) {
            if(!(d in self.conditionCount)) {
              // If the diagnosis does not exist as a key, add it and set the initial value to 1
              self.conditionCount[d] = 1;
            } else {
              self.conditionCount[d]++;
            }
          }
        }
        self.chartLabels = Object.keys(self.conditionCount)
        self.chartValues = Object.values(self.conditionCount)
        // Max value for this graph will be the greatest number of the conditions 
        self.maxValue = Math.max.apply(Math, self.chartValues)
        self.showChart = true;
        })
        .catch(function (err) {
          self.breakdownWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
        })
        // Remove the is-loading class
        this.loading = false
      }
  },
  mounted() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
  .subtitle {
      margin-left: 2%;
  }
</style>


