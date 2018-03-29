<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Individual Patient Wellness From Past Week (Monday - Friday)</h1>
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
          signalWellness: false,
      }
  },
  methods: {
    getInfo() {
     // Create a wellness object to hold and store the wellness data computations
     var wellness_obj = {};
     // Generate the 5 days of the previous week
      for(var i = 0; i <=4; i++) {
        // Loop will begin from the previous Friday and count backwards 1 day at a time till the Monday of that week
        var singleDay = moment().day(-2).subtract(i,'days').format("YYYY-MM-DD");
        this.days.unshift(singleDay);
        wellness_obj[singleDay] = {
          // Value will hold the sum of the meter widget data
          value: 0,
          // Counter will be used to represent the number of patients who had meter widget data on a specific day
          counter: 0,
        }
      }
      var self = this;
      // Request to return meter widget data
      axios.get(this.$store.getters.getSingleTreatmentMeterURL, {
        params: {
          username:self.$store.state.username,
          // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
          startDate: self.days[0],
          finalDate: self.days.slice(-1)[0]
        }
      })
      .then(function (response) {
        // Check each individual array in the response to see if they are empty. If they are, do not create the graph
        if(response.data.every((item) => { return item.length == 0})) {
          self.wellnessWarning = 'Sorry, this patient does not have the data for this report'
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
           // Turn the average data into an array. Must reverse the array because the days were instantiated backwards
          self.averageData = Object.keys(wellness_obj).map(key => { return wellness_obj[key].average }).reverse();
          self.$store.dispatch("singlePatientWellness",self.averageData);
          self.$emit('completeWellness');
          // Define the graph and it's styles
          new Chart(document.getElementById("aggregate-wellness"), {
            type: 'bar',
            data: {
              labels: self.days,
              datasets: [{
                label: "Average Wellness",
                backgroundColor: Array(self.days.length).fill("#2e4053"),
                data: self.averageData
              }, {
                // Create the 'Severe Pain' line
                data: Array(self.days.length).fill(20),
                type: 'line',
                label: "Severe Pain",
                borderColor: "#ff0000",
                backgroundColor: "#e6b0aa",
                borderWidth: 3,
                fill: true,
              }, {
                // Create the 'Moderate Pain' line
                data: Array(self.days.length).fill(50),
                type: 'line',
                label: "Moderate Pain",
                borderColor: "#f4d03f",
                backgroundColor: "#fcf3cf",
                borderWidth: 3,
                fill: true,
              }, {
                // Create the 'Some Pain' line
                data: Array(self.days.length).fill(80),
                type: 'line',
                label: "Some Pain",
                borderColor: "#3273dc",
                backgroundColor: "#d6eaf8",
                borderWidth: 3,
                fill: true,
              }, {
                // Create the 'Little Pain' line
                data: Array(self.days.length).fill(99),
                type: 'line',
                label: "Little Pain",
                borderColor: "#117a65",
                backgroundColor: "#d4efdf",
                borderWidth: 3,
              }]
            },
            options: {
             responsive: false,
             maintainAspectRatio: true,
             hover: {mode: null},
             legend: {
               display: true,
               position: "right",
               labels: {fontSize: 14}
             },
             scales: {
               xAxes: [{
                  barPercentage: 0.55,
                  scaleLabel: {display: true, labelString: "Date", fontSize: 14}
                }],
               yAxes: [{
                 ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                  },
                   scaleLabel: {display: true, labelString: "Wellness Percentage", fontSize: 14}
                }]
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItems, data) {
                    return 'Patient Wellness: '+data.datasets[0].data[tooltipItems.index] + '%'
                  }
                }
              },
              elements: {point: {radius: 0}}
            }
          });
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
    getTrends(data) {
      // Create 2 arrays - 1 for holding the positive trends and one for holding the negative trends
      var positiveTrends = [], negativeTrends = [];
      var startIndex = 0;
      // Determine the positive trends first. Loop through the data
      for(var i = 0; i < data.length; i++) {
        // If the data at one index is less than the one at the next, this is the start of a positive trend
        if(data[i] <= data[i+1]) {
          continue;
        } else {
          // When the if condition fails, push the starting index and ending index of the positive trend into an array
          positiveTrends.push({
            start: startIndex,
            end: i
          })
          // Set the new starting index
          startIndex = i + 1
        }
      }
      // Remove the instances where start and end values are the same.
      positiveTrends = positiveTrends.filter(trend => trend.start != trend.end);

      // Determine the negative trends next. Reset the startIndex variable to 0.
      startIndex = 0;
      for(var i = 0; i < data.length; i++) {
            // If the data at one index is greater than the one at the next, this is the start of a negative trend.
            if(data[i] >= data[i+1]) {
              continue;
            } else {
              // When the condition fails, pushing the starting index and ending index of the negative trend to the array
              negativeTrends.push({
                start: startIndex,
                end: i
              })
              startIndex = i + 1
            }
      }
      // Remove the instances where start and end values are the same.
      negativeTrends = negativeTrends.filter(trend => trend.start != trend.end);
      return {positiveTrends, negativeTrends};
    },
    getTrendsIgnore(data) {
      // Create 2 arrays - 1 for holding the positive trends and one for holding the negative trends
      var positiveTrends = [], negativeTrends = [];
      // Keep track of the start index when a new trend begins
      // Keep a marker of the last index that was read in the data array so we know where to read next
      var startIndex = 0, marker = 0;
      // From the original data, strip out the values that aren't 0s and make a new array
      var filteredData = data.filter(value => value != 0)
      // Determine the positive trends
      for(var i = 0; i < filteredData.length; i++) {
       if(filteredData[i] <= filteredData[i+1]) {
          continue;
        } else {
           positiveTrends.push({
            // Find starting value from the original data set and determine its index
            start: data.indexOf(filteredData[startIndex], marker),
            // Find the ending value from the original data set and determine its index. Start search from where the start value was last found
            end: data.indexOf(filteredData[i], marker)
          })
          // Set the new starting index
          startIndex = i + 1;
          // The new marker becomes the 1 index past where the last value was read
          marker = positiveTrends.slice(-1)[0].end + 1
        }
      }
       // Remove the instances where start and end values are the same.
      positiveTrends = positiveTrends.filter(trend => trend.start != trend.end);
      // Reset the value of startIndex
      startIndex = 0;
      // Reset the marker
      marker = 0;
      // Determine the negative trends
      for(var i =0; i < filteredData.length; i++) {
        if(filteredData[i] >= filteredData[i+1]) {
          continue;
        } else {
          negativeTrends.push({
            start: data.indexOf(filteredData[startIndex], marker),
            end: data.indexOf(filteredData[i] , marker)
          })
          // Set the new starting index
          startIndex = i + 1
          marker = negativeTrends.slice(-1)[0].end + 1
        }
      }
      negativeTrends = negativeTrends.filter(trend => trend.start != trend.end);
      return {positiveTrends, negativeTrends};

    },
    analyzeData() {
      // Call to determine the average wellness
      this.getAvg(this.averageData);
      // If the user chose to ignore the empty values
      if(this.ignoreEmpty) {
        this.trends = this.getTrendsIgnore(this.averageData);
      } else {
        // Otherwise, the use didn't choose to ignore the empty values
        this.trends = this.getTrends(this.averageData);
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
