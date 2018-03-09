<template>
  <div class = "a-wellness">
    <h1 class = "title is-3 is-spaced"> Overall Patient Wellness </h1>
    <h2 class="subtitle"> {{wellnessWarning}} </h2>
    <canvas id = "aggregate-wellness" width = "600" height = "300"> </canvas>
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

      /*
        moment().day(-2)goes back two days further than the beginning of the week, i.e., last Friday.
      */
     var days = [];
     // generate the 5 days of the previous week
      for(var i = 0; i <=4; i++) {
        console.log(moment().day(-2).subtract(i,'days').format("YYYY-MM-DD"));
        days.unshift(moment().day(-2).subtract(i,'days').format("YYYY-MM-DD"));
      }

      new Chart(document.getElementById("aggregate-wellness"), {
         type: 'bar',
         data: {
           labels: days,
           datasets: [{
             label: "Average Wellness",
             backgroundColor: Array(days.length).fill("#2e4053"),
             data: [29,30,40,67,70]
           }, 
           {
             data: Array(days.length).fill(20),
             type: 'line',
             label: "Severe Pain",
             borderColor: "#ff0000",
             backgroundColor: "#e6b0aa",
             borderWidth: 4,
             fill: true
           },
           {
             data: Array(days.length).fill(50),
             type: 'line',
             label: "Moderate Pain",
             borderColor: "#f4d03f",
             backgroundColor: "#fcf3cf",
             borderWidth: 4,
             fill: true,
             spanGaps: true
            
           },
           {
             data: Array(days.length).fill(80),
             type: 'line',
             label: "Some Pain",
             borderColor: "#3273dc",
             backgroundColor: "#d6eaf8",
             borderWidth: 4,
             fill: true
           },
           {
             data: Array(days.length).fill(99),
             type: 'line',
             label: "Little Pain",
             borderColor: "#117a65",
             backgroundColor: "#d4efdf",
             borderWidth: 4
           }]
         },
         options: {
           responsive: false,
           maintainAspectRatio: true,
            scales: {
              xAxes: [{barPercentage: 0.55}],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  suggestedMax: 100,
                }
              }]
            },
            elements: {point: {radius: 0}}           

         }
      });
      // https://stackoverflow.com/questions/38726245/last-7-days-javascript
      // Do the last Friday, and compute the last 5 days off of that. 
      // https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-week-in-javascript
      // console.log(moment().endOf('isoWeek').format("YYYY-MM-DD"));
      
      // https://stackoverflow.com/questions/31632967/chartjs-how-to-set-custom-scale-in-bar-chart
      
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

