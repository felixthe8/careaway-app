<template>
  <div class = "a-completion">
    <h1 class = "title is-3 is-spaced"> Average Patient Task Completion From Past Week (Monday - Friday)</h1>
    <h2 class="subtitle"> {{completionWarning}} </h2>
    <canvas id = "aggregate-complete" width = "750" height = "300"> </canvas>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: '',
  data() {
      return {
          completionWarning: '',
          // Create an array to store the 5 dates made from moment.js
          days: [],
      }
  },
  methods: {
    getInfo() {
      // Create a completion object to hold the treatment completion data
      var completion_obj = {};
      for(var i = 0; i <=4; i++) {
        var singleDay = moment().day(-2).subtract(i,'days').format("YYYY-MM-DD");
        this.days.unshift(singleDay);
        completion_obj[singleDay] = {
          // Value will hold the sum of the checklist widget data
          complete: 0,
          // Counter will represent the number of patients who had checklist widget data on a specific day
          taskCount: 0
        }
      }
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
        if(response.data.every((item) => {return item.length == 0} )) {
          self.completionWarning = 'Sorry, you need to add patients and have a full week of treatments before you can view this report'
        } else {
          // Loop through each object holding checklist data
          for (var checklist of response.data) {
            for(var task of checklist.list) {
              // If the task has been 'checked' (ie. completed), then increment the completed counter for that day
              if(task.check) {
                completion_obj[checklist.due_date].complete +=1
              }
              // When a new task is encountered, add that new task and increment the task counter
              completion_obj[checklist.due_date].taskCount +=1
            }
          }
          // Compute the completion percentage for each day
          for(var key in completion_obj) {
            if(completion_obj.hasOwnProperty(key)) {
              // If there was no patient checklist data for that day, set the completion percentage to 0 for that day
              if(completion_obj[key].taskCount == 0) {
                completion_obj[key].average = 0;
              } else {
                // Task completion percentage is the number of tasks completed / total tasks for that day
                completion_obj[key].average = Math.round( (completion_obj[key].complete / completion_obj[key].taskCount) * 100 )
              }
            }
          }

          console.log(completion_obj);
          new Chart (document.getElementById("aggregate-complete"), {
            type: 'bar',
            data: {
              labels: self.days,
              datasets: [{
                label: "Completion Percentage",
                backgroundColor: Array(self.days.length).fill('#3892f1'),
                // Turn the completion percentage data into an array. Must reverse the array because the days were instantiated backwards
                data: Object.keys(completion_obj).map(key => {return completion_obj[key].average}).reverse()
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
                    return 'Patient Completion: '+data.datasets[0].data[tooltipItems.index] + '%'
                  }
                }
              }
            }
          })
        }
      })
      .catch(function(err) {
        console.log(err);
        self.completionWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
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

