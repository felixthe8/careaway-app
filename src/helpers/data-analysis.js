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

  Vue.prototype.$getAverageWellness = function (data) {
    return data.reduce((a,b) => a+b,0) / data.length;
  }

  Vue.prototype.$getTrends = function(data) {
    // Create 2 arrays - 1 for holding the positive trends and 1 for holding the negative trends
    var positiveTrends = [], negativeTrends = [];
    var startIndex = 0;
    // Determine the positive trends first. Loop through the data
    for(var i = 0; i < data.length; i++) {
      // If the data at one index is less than the one at the next, this is the start of a positive trend
      if(data[i] <= data[i+1]) {
        continue;
      } else {
          // When the if condition fails, push the starting index and ending index of the positive trend into an array  
          positiveTrends.push({
          start: startIndex, 
          end: i
        })
        // Set the new starting index
        startIndex = i + 1
        }
      }
    // Remove the instances where start and end values are the same. 
    positiveTrends = positiveTrends.filter(trend => trend.start != trend.end);
    // Determine the negative trends next. Reset the startIndex variable to 0. 
    startIndex = 0;
    for(var i = 0; i < data.length; i++) {
      // If the data at one index is greater than the one at the next, this is the start of a negative trend. 
      if(data[i] >= data[i+1]) {
        continue;
      } else {
          // When the condition fails, pushing the starting index and ending index of the negative trend to the array
          negativeTrends.push({
            start: startIndex, 
            end: i
          })
          startIndex = i + 1
        } 
      }
    // Remove the instances where start and end values are the same. 
    negativeTrends = negativeTrends.filter(trend => trend.start != trend.end);
    return {positiveTrends, negativeTrends};
  }

}
export default Report