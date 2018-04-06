<template>
  <div class = "breakdown">
    <h1 class = "title is-3 is-spaced"> Patient Breakdown by Diagnosis </h1>
    <h2 class="subtitle"> {{breakdownWarning}} </h2>
    <chart v-if = 'showChart' 
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
import * as chromatism from 'chromatism';
import Chart from 'chart.js';
import pieceLabel from 'chart.piecelabel.js';
import chart from './chart';
export default {
  name: 'breakdown',
  data() {
      return {
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
          if(response.data.length == 0 || response.data === undefined) {
            self.breakdownWarning = 'Sorry, you need to add patients before you can view this report';
          } else {
          // Loop through the patient diagnoses that was returned. In the conditionCount object, use the diagnoses as keys
          for (var d of response.data) {
            if(!(d in self.conditionCount)) {
              // If the diagnosis does not exist as a key, add it and set the initial value to 1
              self.conditionCount[d] = 1;
            } else {
              // Increment an value of a condition
              self.conditionCount[d]+=1;
            }
          }
        }
        self.chartLabels = Object.keys(self.conditionCount)
        self.chartValues = Object.values(self.conditionCount) 
        self.maxValue = Math.max.apply(Math, self.chartValues)
        // STEP 2 - Display the chart
        self.showChart = true
       
        })
        .catch(function (err) {
          self.breakdownWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
        })
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


