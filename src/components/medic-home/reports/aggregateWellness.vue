<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Average Patient Wellness From Past Week (Monday - Friday)</h1>
    <h2 class="subtitle"> {{wellnessWarning}} </h2>
    <canvas id = "aggregate-wellness" width = "750" height = "300"> </canvas>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: '',
  data() {
      return {
          wellnessWarning: ''
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
          
          new Chart(document.getElementById("aggregate-wellness"), {
            type: 'bar',
            data: {
              labels: days,
              datasets: [{
                label: "Average Wellness",
                backgroundColor: Array(days.length).fill("#2e4053"),
                // Turn the average data into an array. Must reverse the array because the days were instantiated backwards
                data: Object.keys(wellness_obj).map(key => { return wellness_obj[key].average }).reverse()
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
        }
      })
      .catch(function(err) {
         self.wellnessWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
         console.log(err);
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

