import moment from 'moment';
import Chart from 'chart.js';

const Report = {};

Report.install = function(Vue, options) {
    // Generate the dates of the past Monday - Friday
    Vue.prototype.$generateDays = function () {
        var days = [];
        for (var i = 0; i <= 4; i++ ) {
            var singleDay = moment().day(-2).subtract(i,'days').format("YYYY-MM-DD");
            days.unshift(singleDay);
        }
        return days;
    }

    Vue.prototype.$emptyBar = function(id, days) {
        // Generate an empty bar graph
        new Chart(document.getElementById(id), {
            type: 'bar',
            data: {
              labels: days,
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                        suggestedMax: 100
                      },
                     
                    }]
                  },
                }   
        })
    }

    Vue.prototype.$emptyDoughnut = function(id) {
        // Generate an empty doughnut graph with no data
        new Chart(document.getElementById(id), {
            type: 'doughnut',
            data: {
                labels: ["No Patients"],
                datasets: [{
                    data: [1],
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                legend: {
                    display: true,
                    position: "left",
                    labels: {fontSize: 14},
                    // By default Chart JS removes data when you click it on the legend. Override the default action so it does nothing. 
                    onClick: null
                  },
            }
        })
    }

}
export default Report