<template>
  <div class = "a-completion">
    <h1 class = "title is-3 is-spaced"> Average Patient Task Completion From Past Week (Monday - Friday)</h1>
    <h2 class="subtitle"> {{completionWarning}} </h2>
    <chart v-if = 'showChart' 
      :elemID = 'chartID' 
      :type = 'chartType' 
      :chartLabels = 'days' 
      :chartValues = 'completionData'
      :maxValue = 'maxValue' 
      :xLabel = 'xLabel' 
      :yLabel = 'yLabel'/>
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
import chart from './chart';
export default {
  name: 'aggregate-completion',
  data() {
      return {
        completionWarning: '',
        completionData: [],
        // Create an array to store the 5 dates made from moment.js
        days: [],
        completion: {},
        totalComplete: 0,
        totalAssigned: 0,
        showReport: false,
        chartID: this.$options.name,
        chartType: 'bar',
        maxValue: 100,
        xLabel: 'Patient Wellness',
        yLabel: 'Wellness Percentage',
        showChart: false,
      }
  },
  components: {chart},
  methods: {
    getInfo() {
      // STEP 1 - Generate the information for the chart
      // Generate the 5 days from the previous week
      this.days = this.$generateDays();
      this.days.forEach(singleDay => {
      this.completion[singleDay] = {
        // Number of completed tasks
        complete: 0,
        // Number of tasks on a given day
        taskCount: 0,
        }
      });
      var self = this;
      axios.get(this.$store.getters.getTreatmentChecklistURL, {
        params: {
          medicalcode:this.$store.getters.medicalCode,
          // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
          startDate: self.days[0],
          finalDate: self.days.slice(-1)[0]
        }
      })
      .then(function(response) {
        if(response.data === undefined || response.data.length == 0) {
          self.completionWarning = 'Sorry, you need to add patients and have a full week of treatments before you can view this report'
        } else {
          // Loop through each object holding checklist data
          for (var checklist of response.data) {
            for(var task of checklist.list) {
              // If the task has been 'checked' (ie. completed), then increment the completed counter for that day
              if(task.check) {
                self.completion[checklist.due_date].complete++
              }
              // When a new task is encountered, add that new task and increment the task counter
              self.completion[checklist.due_date].taskCount++
            }
          }
          // Compute the completion percentage for each day
          for(var key in self.completion) {
            if(self.completion.hasOwnProperty(key)) {
              // If there was no patient checklist data for that day, set the completion percentage to 0 for that day
              if(self.completion[key].taskCount == 0) {
                self.completion[key].average = 0;
              } else {
                // Task completion percentage is the number of tasks completed / total tasks for that day
                self.completion[key].average = Math.round( (self.completion[key].complete / self.completion[key].taskCount) * 100 )
              }
            }
          }

        self.analyzeData(self.completion);
        // Show the report
        self.showReport = true;
        }
        self.completionData = Object.keys(self.completion).map(key => {return self.completion[key].average})
        self.showChart = true;
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
