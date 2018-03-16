<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Average Patient Wellness From Past Week (Monday - Friday)</h1>
    <h2 class="subtitle"> {{wellnessWarning}} </h2>
    <canvas id = "aggregate-wellness" width = "750" height = "300"> </canvas>
    <div class = "report">
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
export default {
  name: '',
  data() {
      return {
          wellnessWarning: '',
          averageWellness: '',
          averageData: [],
           // Create an array to store the 5 dates made from moment.js
          days: [],
          trends: []

      }
  },
  methods: {
    getInfo() {
      // Create an array to store the 5 dates made from moment.js
     var days = [];
     // Create a wellness object to hold and store the wellness data computations
     var wellness_obj = {};
     // generate the 5 days of the previous week
      for(var i = 0; i <=4; i++) {
        // Loop will begin from the previous Friday and count backwards 1 day at a time till the Monday of that week
        var singleDay = moment().day(-2).subtract(i,'days').format("YYYY-MM-DD");
        days.unshift(singleDay);
        wellness_obj[singleDay] = {
          // Value will hold the sum of the meter widget data
          value: 0,
          // Counter will be used to represent the number of patients who had meter widget data on a specific day
          counter: 0,
        }  
      }
      // Write the day array to the data
      this.days = days;
      var self = this;
      // Request to return meter widget data
      axios.get(this.$store.getters.getTreatmentmeterURL, {
        params: {
          medicalcode:this.$store.getters.medicalCode,
          // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
          startDate: days[0],
          finalDate: days.slice(-1)[0]
        }
      })
      .then(function (response) { 
        // Check each individual array in the response to see if they are empty. If they are, do not create the graph
        if(response.data.every((item) => { return item.length == 0})) {
          self.wellnessWarning = 'Sorry, you need to add patients and have a full week of treatments before you can view this report'
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
          self.averageData = Object.keys(wellness_obj).map(key => { return wellness_obj[key].average }).reverse()
          
          new Chart(document.getElementById("aggregate-wellness"), {
            type: 'bar',
            data: {
              labels: days,
              datasets: [{
                label: "Average Wellness",
                backgroundColor: Array(days.length).fill("#2e4053"),
                data: self.averageData
              }, {
                // Create the 'Severe Pain' line
                data: Array(days.length).fill(20),
                type: 'line',
                label: "Severe Pain",
                borderColor: "#ff0000",
                backgroundColor: "#e6b0aa",
                borderWidth: 3,
                fill: true,
              }, {
                // Create the 'Moderate Pain' line
                data: Array(days.length).fill(50),
                type: 'line',
                label: "Moderate Pain",
                borderColor: "#f4d03f",
                backgroundColor: "#fcf3cf",
                borderWidth: 3,
                fill: true,
              }, {
                // Create the 'Some Pain' line
                data: Array(days.length).fill(80),
                type: 'line',
                label: "Some Pain",
                borderColor: "#3273dc",
                backgroundColor: "#d6eaf8",
                borderWidth: 3,
                fill: true,
              }, {
                // Create the 'Little Pain' line 
                data: Array(days.length).fill(99),
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
        
        self.getAvg(self.averageData);
        self.trends = self.getTrends(self.averageData);
        }
      })
      .catch(function(err) {
         self.wellnessWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
         console.log(err);
      })
    },
    getAvg(numbers) {
      var average = numbers.reduce((a,b) => a+b,0) / numbers.length;
      this.averageWellness = "The average wellness for this week is "+average+"%";
    },
    getTrends(data) {
      var positiveTrends = [], negativeTrends = [];
      var startIndex = 0;

      for(var i = 0; i < data.length -1; i++) {
        if(data[i] <= data[i+1]) {
          continue;
        }  
        positiveTrends.push(
          {
            start: startIndex, 
            end: i
          }
        )
        startIndex = i + 1
      }
      // Remove the instances where start and end values are the same. 
      positiveTrends = positiveTrends.filter(trend => trend.start != trend.end);
      console.log(positiveTrends);

      startIndex = 0;
      for(var i = 0; i < data.length -1; i++) {
        if(data[i] >= data[i+1]) {
          continue;
        }  
        negativeTrends.push(
          {
            start: startIndex, 
            end: i
          }
        )
        startIndex = i + 1
      }
      negativeTrends = negativeTrends.filter(trend => trend.start != trend.end);
      console.log(negativeTrends);

      return {positiveTrends, negativeTrends};


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

