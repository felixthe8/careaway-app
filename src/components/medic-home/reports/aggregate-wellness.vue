<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Average Patient Wellness From Past Week (Monday - Friday)</h1>
    <h2 class="subtitle"> {{wellnessWarning}} </h2>
    <canvas id = "aggregate-wellness" width = "750" height = "300"> </canvas>
    <div class = "report" v-if="showReport">
      <input type = "checkbox" id = "empty-selection" v-model="ignoreEmpty" @change="analyzeData">
      <label for = "empty-selection">Ignore Missing Data</label>
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
export default {
  name: '',
  data() {
      return {
          wellnessWarning: '',
          averageWellness: '',
          // Create an array to hold the values for the average wellness
          averageData: [],
           // Create an array to store the 5 dates that will be displayed on the graph
          days: [],
          // Create an array to hold the starting and ending values of positive and negative trends on the graph
          trends: [],
          showReport: false,
          ignoreEmpty: false,
      }
  },
  methods: {
    getInfo() {
     // Create a wellness object to hold and store the wellness data computations
     var wellness_obj = {};
     // Generate the 5 days of the previous week
      this.days = this.$generateDays();
      this.days.forEach(singleDay => {
      wellness_obj[singleDay] = {
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
        // Check the array in the response to see if it is empty. If it is, do not create the graph
        if(response.data.length == 0) {
          self.wellnessWarning = 'Sorry, you need to add patients and have a full week of treatments before you can view this report'
           self.$emptyBar("aggregate-wellness",self.days);
        } else {
          // Loop through each object holding meter widget treatment data
          for (var meter of response.data) {
              // Write the sum of the meter widget data
              wellness_obj[meter.due_date].value += (parseFloat(meter.patient_input) / parseFloat(meter.scale[1]) ) * 100
              // Increment the counter
              wellness_obj[meter.due_date].counter+=1

          }
          // Compute the average of the meter widget data for each day
          for(var key in wellness_obj) {
            if(wellness_obj.hasOwnProperty(key)) {
              // If no patients had a meter widget that day, set the average to 0 for that day
              if(wellness_obj[key].counter == 0) {
                wellness_obj[key].average = 0;
              } else {
                // Average is the sum of meter widget data divided by the number of patients who had data for that day
                wellness_obj[key].average = wellness_obj[key].value / wellness_obj[key].counter
              }
            }
          }
           // Turn the average data into an array.
          self.averageData = Object.keys(wellness_obj).map(key => { return wellness_obj[key].average })
          self.$makeWellnessGraph("aggregate-wellness",self.days, self.averageData);
        // Call to run the functions to analyze the data
        self.analyzeData();
        // If the GET was successfully completed and the graph has been made, then show the report
        self.showReport = true;
        }
      })
      .catch(function(err) {
         self.wellnessWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
         console.log(err);
      })
    },
    getAvg(numbers) {
      // If we choose to ignore empty input, then we must strip out the values that are 0
      if(this.ignoreEmpty) {
        numbers = numbers.filter(value => value!=0)
      }
      // Compute the average for the week
      var average = numbers.reduce((a,b) => a+b,0) / numbers.length;
      this.averageWellness = "The average wellness for this week is "+average.toFixed(2)+"%";
    },
    analyzeData() {
      // Call to determine the average wellness
      this.getAvg(this.averageData);
      // If the user chose to ignore the empty values
      if(this.ignoreEmpty) {
        this.trends = this.$getTrendsIgnore(this.averageData);
      } else {
        // Otherwise, the use didn't choose to ignore the empty values
        this.trends = this.$getTrends(this.averageData);
      }
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
