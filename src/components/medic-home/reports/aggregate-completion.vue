<template>
  <div class = "a-completion">
    <h1 class = "title is-3 is-spaced"> Average Patient Task Completion From Past Week (Monday - Friday)</h1>
    <h2 class="subtitle"> {{completionWarning}} </h2>
    <canvas id = "aggregate-complete" width = "750" height = "300"> </canvas>
    <div class = "report" v-if="showReport">
      <p> Total completed tasks for this period: {{totalComplete}} </p>
      <p> Total assigned tasks for this period: {{totalAssigned}}</p>
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
        completionWarning: '',
        // Create an array to store the 5 dates made from moment.js
        days: [],
        completionData: {},
        totalComplete: 0,
        totalAssigned: 0,
        showReport: false
      }
  },
  methods: {
    getInfo() {
      // Generate the 5 days of the previous week
      this.days = this.$generateDays();
      this.days.forEach(singleDay => {
      this.completionData[singleDay] = {
          // This vaule will hold the number of completed tasks
          complete: 0,
          //  This will hold the number of tasks on a specific day
          taskCount: 0,
        }
      });
      var self = this;
      // Request to return checklist widget data
      axios.get(this.$store.getters.getTreatmentchecklistURL, {
        params: {
          medicalcode:this.$store.getters.medicalCode,
          // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
          startDate: self.days[0],
          finalDate: self.days.slice(-1)[0]
        }
      })
      .then(function(response) {
        if(response.data.length == 0) {
          self.completionWarning = 'Sorry, you need to add patients and have a full week of treatments before you can view this report'
          self.$emptyBar("aggregate-complete",self.days);
        } else {
          // Loop through each object holding checklist data
          for (var checklist of response.data) {
            for(var task of checklist.list) {
              // If the task has been 'checked' (ie. completed), then increment the completed counter for that day
              if(task.check) {
                self.completionData[checklist.due_date].complete +=1
              }
              // When a new task is encountered, add that new task and increment the task counter
              self.completionData[checklist.due_date].taskCount +=1
            }
          }
          // Compute the completion percentage for each day
          for(var key in self.completionData) {
            if(self.completionData.hasOwnProperty(key)) {
              // If there was no patient checklist data for that day, set the completion percentage to 0 for that day
              if(self.completionData[key].taskCount == 0) {
                self.completionData[key].average = 0;
              } else {
                // Task completion percentage is the number of tasks completed / total tasks for that day
                self.completionData[key].average = Math.round( (self.completionData[key].complete / self.completionData[key].taskCount) * 100 )
              }
            }
          }
           // Define the graph and it's styles
          new Chart (document.getElementById("aggregate-complete"), {
            type: 'bar',
            data: {
              labels: self.days,
              datasets: [{
                label: "Completion Percentage",
                backgroundColor: Array(self.days.length).fill('#3892f1'),
                // Turn the completion percentage data into an array. 
                data: Object.keys(self.completionData).map(key => {return self.completionData[key].average})
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
                labels: {fontSize: 14},
                // By default Chart JS removes data when you click it on the legend. Override the default action so it does nothing. 
                onClick: null
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
          })
        self.analyzeData(self.completionData);
        // If the GET was successfully completed and the graph has been made, then show the report
        self.showReport = true;
        }
      })
      .catch(function(err) {
        console.log(err);
        self.completionWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
      })
    },
    analyzeData(data) {
      // Loop through the object that holds the completion data for each day
      for(var day in data) {
         if(data.hasOwnProperty(day)) {
           // Sum the completed tasks
           this.totalComplete += data[day].complete;
           // Sum the assigned tasks
           this.totalAssigned += data[day].taskCount;
         }
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
</style>

