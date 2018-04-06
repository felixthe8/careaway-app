<template>
  <div class = "box">
     <canvas :id = 'elemID' :width = 'width' :height = 'height'> </canvas>
  </div>
  
</template>

<script>
import * as chromatism from 'chromatism';
import Chart from 'chart.js';
import pieceLabel from 'chart.piecelabel.js';
export default {
  name: 'chart',
  data() {
    return {
      width: 750,
      height: 350
    }
  },
  props: ['elemID', 'type', 'chartLabels', 'chartValues', 'xLabel', 'yLabel', 'maxValue'],
  methods: {
    drawChart() {
      var self = this;
      new Chart (document.getElementById(this.elemID), {
        type: self.type,
        data: {
          labels: self.chartLabels,
          datasets: [{
            label: self.yLabel,
            data: self.chartValues,
            backgroundColor: (self.type === 'bar' ? Array(self.chartLabels.length).fill('#ed2939') : '#ed2939'),
            borderWidth: 3,
            fill: false
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
            position: "right",
            labels: {fontSize: 14},
            // By default Chart JS removes data when you click it on the legend. 
            // Override the default action so it does nothing. 
            onClick: null
          },
          scales: {
            xAxes: [{
               barPercentage: 0.75,
              scaleLabel: {display: true, labelString: self.xLabel, fontSize: 14}
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                suggestedMax: self.maxValue,
              },
              scaleLabel: {display: true, labelString: self.yLabel, fontSize: 14}
            }]
          },
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6
            }
          }
        }    
      })
    }
  },
  mounted(){
    this.drawChart()
  }
}
</script>



