import moment from 'moment';

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
}
export default Report