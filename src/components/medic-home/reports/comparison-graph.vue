<template>
  <div class = "Comparison">
    <h1 class = "title is-3 is-spaced"> Patient Breakdown by Diagnosis: {{diagnosis}} </h1>
    <h2 class="subtitle"> {{diagnosisWarning}} </h2>
    <canvas id = "checklist-comparison" width = "700" height = "400"> </canvas>
    <canvas id = "meter-comparison" width = "700" height = "400"> </canvas>
    <ul>
        <li v-for= "message in trends">
          <b>{{message}}</b> 
        </li>
      </ul>
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
        // Creates diagnosis label and Warning
        diagnosis: '',
        diagnosisWarning: '',
        // Creates an array to store the average wellness for patients with same diagnosis
        averageAggregatedWellnessData: [],
        // Creates an array to store the average checklist for patients with same diagnosis
        averageAggregatedCompletionData: [],
        // Creates an array to store the average wellness for the individual patient
        averagePatientWellnessData:[],
        // Creates an array to store the average checklist for the individual patient
        averagePatientCompletionData:[],
        // Create an array to store the 5 dates that will be displayed on the graph
        days: [],
        // Create an array to store average aggregated data 
        completionAggregatedCheckListData: {},
        completionAggregatedMeterData: {},
        // Create an array to hold the starting and ending values of positive and negative trends on the graph
        trends: [],
        showReport: false,
        ignoreEmpty: false,
      }
  },
  methods: {
      getInfo() {
        for(var i = 0; i <=4; i++) {
        // Uses moments to find the first day (monday) to last day (friday)
        var singleDay = moment().day(-2).subtract(i,'days').format("YYYY-MM-DD");
        this.days.unshift(singleDay);
        // Checklist Widget
        this.completionAggregatedCheckListData[singleDay] = {
          // Value will hold the sum of the checklist widget data
          complete: 0,
          // Counter will represent the number of patients who had checklist widget data on a specific day
          taskCount: 0
        };
        // Meter Widget
        this.completionAggregatedMeterData[singleDay] = {
          // Value will hold the sum of the meter widget data
          value: 0,
          // Counter will represent the number of patients who had meter widget data on a specific day
          counter: 0
        };
        }
        var self = this;
        // Gets all widgets of patients with the same diagnosis
        axios.get(this.$store.getters.getSingleDiagnosisURL, {
        params: {
          //Pass Username for diagnosis
          username:self.$store.state.username,
          //Pass Medical Code for Doctor
          medicalcode:self.$store.getters.medicalCode,
          // Pass the first and last elements from the day array. These dates will be used to filter the response in the backend
          startDate: self.days[0],
          finalDate: self.days.slice(-1)[0]
        }
      })
      .then(function(response) {
        // If there are no diagnoses returned
        if(response.data.length == 0 || response.diagnosis == "") {
          self.diagnosisWarning = 'Sorry, you need to add patients before you can view reports';
        } else {
          // Gets Diagnosis of Patient
          self.diagnosis = response.data.diagnosis;
          // Loop through each object holding checklist data
          for (var checklist of response.data.checklist) {
            // Loops through each tasks of checklist data
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
          self.averageAggregatedWellnessData = Object.keys(self.completionAggregatedMeterData).map(key => { return self.completionAggregatedMeterData[key].average }).reverse();
          self.averageAggregatedCompletionData = Object.keys(self.completionAggregatedCheckListData).map(key => {return self.completionAggregatedCheckListData[key].average}).reverse();
          // Average Single Patient Data from Vuex
          self.averagePatientWellnessData = self.$store.getters.singlePatientWellness;
          self.averagePatientCompletionData = self.$store.getters.singlePatientCompletion;
          self.getAverageComparison();
        // Sets the Cholor Scheme and Pallette of graphs
        // CheckList Chart
         new Chart (document.getElementById("checklist-comparison"), {
            // Sets Chart type to  Line Graph
            type: 'line',
            data: {
              // Array of labels 
              labels: self.days,
              // Data Sets for charts
              datasets: [{
                // Label for Line Data Set
                label: "Average Completion",
                // Picked Color Gold for Other Patients
                borderColor:'#FFD700',
                // No Fill under the Lines
                fill: false,
                // Turn the completion percentage data into an array. Must reverse the array because the days were instantiated backwards
                data: self.averageAggregatedCompletionData
              }, 
              {
                // Make another line for Individual Patient
                type: 'line',
                // Gets Single Patient Data from Vuex
                data: self.averagePatientCompletionData,
                // Label for Individual Data Set
                label:"Individual Completion",
                // Picked Color Red for Individual Patient Data
                borderColor: '#DC1702',
                // No fill under line
                fill: false,

              }]
            },
            options: {
              // Telementric Options for Graphs
              // Non Responsive Graph
              responsive: false,
              // Maintains Charts Aspect RAtio
              maintainAspectRatio: true,
              // Scales X Axis
              scales: {
                xAxes: [{
                  // Dates for X Axis
                  barPercentage: 0.55,
                  scaleLabel: {display: true, labelString: "Date", fontSize: 14}
                }],
                // Scales Y Axis
                yAxes: [{
                  ticks: {
                    // Percentages starts at Zero
                    beginAtZero: true,
                    // Ends at 100 Percent
                    suggestedMax: 100
                  },
                  // Completion Label for Checklist
                  scaleLabel: {display: true, labelString: "Completion Percentage", fontSize: 14}
                }]
              },
              // Legend Data for Y axis
              legend: {
                display: true,
                position: "right",
                labels: {fontSize: 14}
              },
              // Hover Tool Tips
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
          // Meter Chart
          new Chart (document.getElementById("meter-comparison"), {
            // Sets type to Line Graph
            type: 'line',
            // Fills in data for Chart
            data: {
              // Labels are the days
              labels: self.days,
              // Data Sets
              datasets: [{
                // Label for Average Wellness
                label: "Average Patient Wellness",
                // Label Color is Gold
                borderColor:'#FFD700',
                // No Fill for Line Graph
                fill: false,
                // Turn the completion percentage data into an array. Must reverse the array because the days were instantiated backwards
                data: self.averageAggregatedWellnessData,
              }, 
              {
                // Label for Individual Patient Wellness
                label: "Individual Patient Wellness ",
                // Retrieves Indiviudal Patient Wellness from Vuex
                data:  self.averagePatientWellnessData,
                // Label Color is Red
                borderColor: '#DC1702',
                // No Fill for Line Graph
                fill: false,
              }]
            },
            // Options for Line Graph
            options: {
              // Non Responsive
              responsive: false,
              // Maintain Aspect Ratio
              maintainAspectRatio: true,
              // Sets Scales for X - Axis
              scales: {
                xAxes: [{
                  barPercentage: 0.55,
                  scaleLabel: {display: true, labelString: "Date", fontSize: 14}
                }],
                // Sets Scales for Y - Axis
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    suggestedMax: 100
                  },
                  scaleLabel: {display: true, labelString: "Wellness Percentage", fontSize: 14}
                }]
              },
              // Sets Legends for Y - Axis
              legend: {
                display: true,
                position: "right",
                labels: {fontSize: 14}
              },
              // Tool Tips for on Hover
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
          self.diagnosisWarning = 'Sorry. Information for this report cannot be displayed at this time. Try again later.';
        })
      },
      getAverageComparison(){
        // Finding Areas where Patient Wellness deviates from Average Wellness
        for(var i = 0; i < this.days.length; i++){
          // Pushes Messages to Trends based on Deviation from Average
            if(this.averagePatientWellnessData[i] > this.averageAggregatedWellnessData[i]){
              this.trends.push(this.$store.state.username + " has been responding to the Treatments better than Average on " +  this.days[i]);
            }
            else if (this.averagePatientWellnessData[i] < this.averageAggregatedWellnessData[i]){
              this.trends.push(this.$store.state.username + " has been responding to Treatment worse than Average on " + this.days[i] );
            }
        }
      },
  },
  created(){
      this.$store.dispatch("singlePatientWellness",null);
      this.$store.dispatch("singlePatientCompletion",null);
      
    
  },
  // Mounted Functions 
  mounted() {
    // Calls Get Info for Graphs
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
  .subtitle {
      margin-left: 2%;
  }
</style>


