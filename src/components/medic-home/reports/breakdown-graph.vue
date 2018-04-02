<template>
  <div class = "breakdown">
    <h1 class = "title is-3 is-spaced"> Patient Breakdown by Diagnosis </h1>
    <h2 class="subtitle"> {{breakdownWarning}} </h2>
    <canvas id = "patient-breakdown" width = "650" height = "350"> </canvas>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';
export default {
  name: 'breakdown',
  data() {
      return {
        breakdownWarning: '',
      }
  },
  methods: {
      getInfo() {
        var self = this;
        // Return patients who are associated with the medical professional
        axios.get(this.$store.getters.patientBreakdownURL+this.$store.getters.medicalCode)
        .then(function(response) {
          // If there are no diagnoses returned
          if(response.data.length == 0) {
            self.breakdownWarning = 'Sorry, you need to add patients before you can view this report';
            self.$emptyDoughnut("patient-breakdown");
          } else {
          // Object that will hold the diagnosis count
          var conditionCount = {};
          // Loop through the patient diagnoses that was returned. In the conditionCount object, use the diagnoses as keys
          for (var d of response.data) {
            if(!(d in conditionCount)) {
              // If the diagnosis does not exist as a key, add it and set the initial value to 1
              conditionCount[d] = 1;
            } else {
              // Increment an value of a condition
              conditionCount[d]+=1;
            }
          } 
          // Create arrays for the graph values and labels
          var conditionLabels = Object.keys(conditionCount);
          var conditionValues = Object.values(conditionCount);
          self.$makeBreakdownGraph("patient-breakdown", conditionLabels, conditionValues)
        }
       
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


