<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Average Patient Wellness From Past Week (Monday - Friday)</h1>
    <h2 class="subtitle"> {{wellnessWarning}} </h2>
    <chart v-if = 'showChart' 
      :elemID = 'chartID' 
      :type = 'chartType' 
      :chartLabels = 'days' 
      :chartValues = 'averageData'
      :maxValue = 'maxValue' 
      :xLabel = 'xLabel' 
      :yLabel = 'yLabel'/>
    <div class = "report" v-if="showReport">
      <p>{{averageWellness}} </p>
      <br>
      <ul>
        <li v-for= "positive in trends.positiveTrends">
           <i class="fas fa-arrow-circle-up fa-lg"></i> <b> {{days[positive.start]}} </b> to  <b> {{days[positive.end]}} </b> : Wellness increased by {{averageData[positive.end] - averageData[positive.start]}} percentage points
        </li>
      </ul>

      <ul>
        <li v-for= "negative in trends.negativeTrends">
           <i class="fas fa-arrow-circle-down fa-lg"></i> <b> {{days[negative.start]}} </b> to  <b> {{days[negative.end]}} </b> : Wellness decreased by {{averageData[negative.start] - averageData[negative.end]}} percentage points
        </li>
     </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Chart from 'chart.js';
import chart from './chart';
export default {
  name: 'aggregate-wellness',
  data() {
    return {
      wellnessWarning: '',
      wellness: {},
      averageWellness: '',
      // Create an array to hold the values for the average wellness
      // This will be passed in as the yLabel
      averageData: [],
      // Create an array to store the 5 dates that will be displayed on the graph
      // This will be passed in as the xLabel
      days: [],
      // Create an array to hold the starting and ending values of positive and negative trends on the graph
      trends: [],
      showReport: false,
      chartID: this.$options.name,
      chartType: 'line',
      showChart: false,
      maxValue: 100,
      xLabel: 'Patient Wellness',
      yLabel: 'Wellness Percentage'
    }
  },
  components: {chart},
  methods: {
    getInfo() {
     // STEP 1 - Generate the information for the chart 
     // Generate the 5 days of the previous week
      this.days = this.$generateDays();
      this.days.forEach(singleDay => {
      this.wellness[singleDay] = {
        // Value will hold the sum of the meter widget data
        value: 0,
        // Counter will be used to represent the number of patients who had meter widget data on a specific day
        counter: 0,
        }
      });
      var self = this;
      // Request to return meter widget data
      axios.get(this.$store.getters.getTreatmentMeterURL, {
        params: {
          medicalcode:this.$store.getters.medicalCode,
          // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
          startDate: self.days[0],
          finalDate: self.days.slice(-1)[0]
        }
      })
      .then(function (response) { 
        // Check the array in the response to see if it is empty. 
        if(response.data === undefined || response.data.length == 0) {
          self.wellnessWarning = 'Sorry, you need to add patients and have a full week of treatments before you can view this report'
        } else {
          for (var meter of response.data) {
            // Write the sum of the meter widget data
            self.wellness[meter.due_date].value += (parseFloat(meter.patient_input) / parseFloat(meter.scale[1]) ) * 100
            self.wellness[meter.due_date].counter++;
          }
          for(var key in self.wellness) {
            if(self.wellness.hasOwnProperty(key)) {
              // If no patients had a meter widget that day, set the average to 0 for that day
              if(self.wellness[key].counter == 0) {
                self.wellness[key].average = 0;
              } else {
                self.wellness[key].average = self.wellness[key].value / self.wellness[key].counter
              }
            }
          }
           // Turn the average data into an array.
          self.averageData = Object.keys(self.wellness).map(key => { return self.wellness[key].average })
          self.analyzeData();
          // Show the report
          self.showReport = true;
        }
        // STEP 2 - Display the chart itself
        self.showChart = true
      })
      .catch(function(err) {
         self.wellnessWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
         console.log(err);
      })
    },
    analyzeData() {
      this.averageWellness = "The average wellness for this week is "+ this.$getAverageWellness(this.averageData).toFixed(2)+"%";
      this.trends = this.$getTrends(this.averageData);  
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
  .fa-arrow-circle-up {
    color: #2ECC71;
  }
  .fa-arrow-circle-down {
    color: #E74C3C;
  }
</style>
