<template>

    <div class = "aggregate-graphs">
        <div class = "breadown">
            <h1 class = "title is-3"> Patient Breakdown by Diagnosis </h1>
          <canvas id = "patient-breakdown" width = "450" height = "300"> </canvas>
        </div>
    </div>

</template>



<script>
import axios from 'axios'
export default {
  name: 'aggregateReport',

  methods: {
      showBreakdown(){
          
          // return the medical code for the MP based on their username
          axios.get('http://localhost:4400/treatment_plan/api/returnCode?username='+this.$store.getters.authenticatedUsername)
          .then(function(response) {
              // extract out medical code
              const mc = response.data.medicalcode;
               // return patients who are associated with the medical professional
               axios.get('http://localhost:4400/treatment_plan/api/get-patient-breakdown?medicalcode='+mc)
               .then(function(response) {
                
                var conditionCount = {};
                for(var i = 0; i < response.data.patients.length; i++) {
                    console.log(response.data.patients[i].accountType.diagnosis);
                    if(!(response.data.patients[i].accountType.diagnosis in conditionCount)) {
                        conditionCount[response.data.patients[i].accountType.diagnosis] = 1
                    } else {
                        conditionCount[response.data.patients[i].accountType.diagnosis]+=1;
                    }
                }
                console.log(conditionCount);
                // console.log(Object.keys(conditionCount));
                // console.log(Object.values(conditionCount));

                var ctx = document.getElementById("patient-breakdown").getContext('2d');
                var breadown = new Chart (ctx, {
                    type: 'pie',
                    
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
                            position: "left"
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
                 console.log(err);
            })
              
          })
          .catch(function(err) {
              console.log(err);
          })
         
      }
  },

  mounted() {
      this.showBreakdown();
  }
}

</script>



<style lang="scss" scoped>

  .aggregate-graphs {
      padding-top: 2%;
      padding-left: 5%;
  }

</style>
