<template>
  <div class = "breakdown">
    <h1 class = "title is-3 is-spaced"> Patient Breakdown by Diagnosis: {{diagnosis}} </h1>
    <h2 class="subtitle"> {{breakdownWarning}} </h2>
    <canvas id = "checklist-comparison" width = "450" height = "300"> </canvas>
    <canvas id = "meter-comparison" width = "450" height = "300"> </canvas>
  </div>
</template>

<script>
import axios from 'axios';
import colorScheme from 'color-scheme';
import moment from 'moment';
export default {
  name: 'comparison',
  data() {
      return {
        diagnosis: '',
        diagnosisWarning: '',
        averageAggregatedData: [],
        averagePatientData:[],
           // Create an array to store the 5 dates that will be displayed on the graph
        days: [],
        completionAggregatedCheckListData: {},
        completionAggregatedMeterData: {},
        completionSingleCheckListData: {},
        completionSingleMeterData: {},
          // Create an array to hold the starting and ending values of positive and negative trends on the graph
        trends: [],
        showReport: false,
        ignoreEmpty: false,
      }
  },
  methods: {
      getPatientWellness(){
         var self = this;
      // Request to return meter widget data
      axios.get(this.$store.getters.getSingleTreatmentmeterURL, {
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
          self.diagnosisWarning = 'Sorry, you need to add patients and have a full week of treatments before you can view this report'
        } else {
          // Loop through each object holding meter widget treatment data
          for (var meter of response.data) {
              // Write the sum of the meter widget data 
              self.completionSingleMeterData[meter.due_date].value += (parseFloat(meter.patient_input) / parseFloat(meter.scale[1]) ) * 100
              // Increment the counter
              self.completionSingleMeterData[meter.due_date].counter+=1
            
          }
          // Compute the average of the meter widget data for each day
          for(var key in self.completionSingleMeterData) {
            if(self.completionSingleMeterData.hasOwnProperty(key)) {
              // If no patients had a meter widget that day, set the average to 0 for that day
              if(self.completionSingleMeterData[key].counter == 0) {
                self.completionSingleMeterData[key].average = 0;
              } else {
                // Average is the sum of meter widget data divided by the number of patients who had data for that day 
                self.completionSingleMeterData[key].average = self.completionSingleMeterData[key].value / self.completionSingleMeterData[key].counter;
              }
            }
          }
           // Turn the average data into an array. Must reverse the array because the days were instantiated backwards
          self.averagePatientData = Object.keys(self.completionSingleMeterData).map(key => { return self.completionSingleMeterData[key].average }).reverse();
        }
      })
      .catch(function(err) {
         self.wellnessWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
         console.log(err);
      });
      },
    
      getInfo() {
        for(var i = 0; i <=4; i++) {
        var singleDay = moment().day(-2).subtract(i,'days').format("YYYY-MM-DD");
        this.days.unshift(singleDay);
        this.completionAggregatedCheckListData[singleDay] = {
          // Value will hold the sum of the checklist widget data
          complete: 0,
          // Counter will represent the number of patients who had checklist widget data on a specific day
          taskCount: 0
        };
        this.completionAggregatedMeterData[singleDay] = {
          // Value will hold the sum of the checklist widget data
          value: 0,
          // Counter will represent the number of patients who had checklist widget data on a specific day
          counter: 0
        };
        this.completionSingleCheckListData[singleDay] = {
          // Value will hold the sum of the checklist widget data
          complete: 0,
          // Counter will represent the number of patients who had checklist widget data on a specific day
          taskCount: 0
        };
        this.completionSingleMeterData[singleDay] = {
          // Value will hold the sum of the checklist widget data
          value: 0,
          // Counter will represent the number of patients who had checklist widget data on a specific day
          counter: 0
        };
        }
        var self = this;
        // Return patients who are associated with the medical professional
        axios.get(this.$store.getters.getSingleDiagnosisURL, {
        params: {
          username:self.$store.state.username,
          medicalcode:self.$store.getters.medicalCode,
          // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
          startDate: self.days[0],
          finalDate: self.days.slice(-1)[0]
        }
      })
        .then(function(response) {
          // If there are no diagnoses returned
          if(response.data.length == 0 || response.diagnosis == "") {
            self.breakdownWarning = 'Sorry, you need to add patients before you can view reports';
          } else {
          self.diagnosis = response.data.diagnosis;
          // Loop through each object holding checklist data
          for (var checklist of response.data.checklist) {
            for(var task of checklist.list) {
              // If the task has been 'checked' (ie. completed), then increment the completed counter for that day
              if(task.check) {
                self.completionAggregatedCheckListData[checklist.due_date].complete +=1
              }
              // When a new task is encountered, add that new task and increment the task counter
              self.completionAggregatedCheckListData[checklist.due_date].taskCount +=1
            }
          }
          // Compute the completion percentage for each day
          for(var key in self.completionAggregatedCheckListData) {
            if(self.completionAggregatedCheckListData.hasOwnProperty(key)) {
              // If there was no patient checklist data for that day, set the completion percentage to 0 for that day
              if(self.completionAggregatedCheckListData[key].taskCount == 0) {
                self.completionAggregatedCheckListData[key].average = 0;
              } else {
                // Task completion percentage is the number of tasks completed / total tasks for that day
                self.completionAggregatedCheckListData[key].average = Math.round( (self.completionAggregatedCheckListData[key].complete / self.completionAggregatedCheckListData[key].taskCount) * 100 )
              }
            }
          }
          self.getPatientWellness();
          for (var meterResponse of response.data.meter) {
              // Write the sum of the meter widget data 
              self.completionAggregatedMeterData[meterResponse.due_date].value += (parseFloat(meterResponse.patient_input) / parseFloat(meterResponse.scale[1]) ) * 100;
              // Increment the counter
              self.completionAggregatedMeterData[meterResponse.due_date].counter+=1;
            
          }
          // Compute the average of the meter widget data for each day
          for(var key in self.completionAggregatedMeterData) {
            if(self.completionAggregatedMeterData.hasOwnProperty(key)) {
              // If no patients had a meter widget that day, set the average to 0 for that day
              if(self.completionAggregatedMeterData[key].counter == 0) {
                self.completionAggregatedMeterData[key].average = 0;
              } else {
                // Average is the sum of meter widget data divided by the number of patients who had data for that day 
                self.completionAggregatedMeterData[key].average = self.completionAggregatedMeterData[key].value / self.completionAggregatedMeterData[key].counter
              }
            }
          }
           // Turn the average data into an array. Must reverse the array because the days were instantiated backwards
          self.averageAggregatedData = Object.keys(self.completionAggregatedMeterData).map(key => { return self.completionAggregatedMeterData[key].average }).reverse();

         var scheme = new colorScheme;
         var palette = scheme.from_hue(21).scheme('triade').variation('default').colors();
         // Need to append a '#' at the front of each hex code generated because it is required for the colors on Chart JS and color-scheme does not do this
         for(var i = 0; i < palette.length; i++) {
           palette[i] = '#'+palette[i];
         }
         
         new Chart (document.getElementById("checklist-comparison"), {
            type: 'line',
            
            data: {
              labels: self.days,
              datasets: [{
                label: "Completion Percentage",
                borderColor:'#DC1702',
                fill: false,
                // Turn the completion percentage data into an array. Must reverse the array because the days were instantiated backwards
                data: Object.keys(self.completionAggregatedCheckListData).map(key => {return self.completionAggregatedCheckListData[key].average}).reverse()
              }, 
              {
                type: 'line',
                data: Array(self.days.length),
                fill: false,

              }]
            },
            options: {
              responsive: false,
              maintainAspectRatio: true,
              scales: {
                xAxes: [{
                  barPercentage: 0.55,
                  scaleLabel: {display: true, labelString: "Date", fontSize: 14}
                }],
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    suggestedMax: 100
                  },
                  scaleLabel: {display: true, labelString: "Completion Percentage", fontSize: 14}
                }]
              },
              legend: {
                display: true,
                position: "right",
                labels: {fontSize: 14}
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItems, data) {
                    // Overwrite the tooltip function to reformat the presented data
                    return 'Patient Completion: '+data.datasets[0].data[tooltipItems.index] + '%'
                  }
                }
              }
            }
          });
          new Chart (document.getElementById("meter-comparison"), {
            type: 'line',
            
            data: {
              labels: self.days,
              datasets: [{
                label: "Completion Percentage",
                borderColor:'#DC1702',
                fill: false,
                // Turn the completion percentage data into an array. Must reverse the array because the days were instantiated backwards
                data: self.averageAggregatedData,
              }, 
              {
                type: 'line',
                data: self.averagePatientData,
                fill: false,

              }]
            },
            options: {
              responsive: false,
              maintainAspectRatio: true,
              scales: {
                xAxes: [{
                  barPercentage: 0.55,
                  scaleLabel: {display: true, labelString: "Date", fontSize: 14}
                }],
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    suggestedMax: 100
                  },
                  scaleLabel: {display: true, labelString: "Completion Percentage", fontSize: 14}
                }]
              },
              legend: {
                display: true,
                position: "right",
                labels: {fontSize: 14}
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItems, data) {
                    // Overwrite the tooltip function to reformat the presented data
                    return 'Patient Completion: '+data.datasets[0].data[tooltipItems.index] + '%'
                  }
                }
              }
            }
          });
          
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


