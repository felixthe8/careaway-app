<template>
  <div class = "breakdown">
    <h1 class = "title is-3 is-spaced"> Patient Breakdown by Diagnosis </h1>
    <h2 class="subtitle"> {{breakdownWarning}} </h2>
    <canvas id = "patient-breakdown" width = "450" height = "300"> </canvas>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'breakdown',
  data() {
      return {
        breakdownWarning: ''
      }
  },
  props: ['code'],
  methods: {
      getInfo() {
        // return patients who are associated with the medical professional
        axios.get('http://localhost:8080/patientBreakdown?medicalcode='+this.code)
        .then(function(response) {
          // object that will hold the diagnosis count
          var conditionCount = {};
                
          for(var i = 0; i < response.data.patients.length; i++) {
            // if the diagnosis hasn't been encountered, add it to the object as a key and initialize it with a value of 1
            if(!(response.data.patients[i].diagnosis in conditionCount)) {
              conditionCount[response.data.patients[i].diagnosis] = 1
            } else { // otherwise, increment the existing value by 1
                conditionCount[response.data.patients[i].diagnosis]+=1;
                }
          }

          var ctx = document.getElementById("patient-breakdown").getContext('2d');
          var breakdown = new Chart (ctx, {
            type: 'doughnut',
            data: {
              labels: Object.keys(conditionCount),
              datasets: [{
                data: Object.values(conditionCount),
                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
              }]
            },
            options: {
              responsive: false,
              maintainAspectRatio: true,
              animation: {
                duration: 1000
              },
              legend: {
                display: true,
                position: "left",
                labels: {fontSize: 14}
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItems, data) {
                    return ' '+data.datasets[0].data[tooltipItems.index] + ' patient(s)'
                  }
                }
              }
            }
          })       
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


