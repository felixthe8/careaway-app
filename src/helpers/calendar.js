// Calendar Plugin for Vue
const Calendar = {}

Calendar.install = function (Vue, options) {

  // Instance Method
  Vue.prototype.$renderCalendar = function (initial, state) {
      let moment = require("moment");

      // size default to month
      let SIZE = 25;

      if(state) {
        SIZE = 5;
      }

      // week day array
      let week = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
      // get today's date object
      let today = new Date();

      // get initial month request or set initial month to the current month
      initial = initial || today.getMonth();

      // get calendar start ~ first day of calendar month + days to monday
      let start = new Date(today.getFullYear(), initial, 1);
      start = new Date(start.getFullYear(), start.getMonth(), start.getDate() + (start.getDay() == 0?-6:1) - start.getDay());

      // careaway calendar month
      let calendar = [];

      let next = 0, count = 0;
      while(count < SIZE) {
        //skip saturdays and sundays
        if(start.getDay() === 0) {
          next = 1; //set next after first itr
          start.setDate(start.getDate() + next);
        } else if(start.getDay() === 6) {
          next = 1; //set next after first itr
          start.setDate(start.getDate() + next + next);
        }

        // add day object to month
        calendar[count] = {
          "object": moment(new Date(start.getFullYear(), start.getMonth(), start.getDate())).format("YYYY-MM-DD"),
          "date": start.getDate(),
          "code": start.getDay(),
          "month": start.getMonth(),
          "name": week[start.getDay()],
          "appointment": {},
          "meter": {},
          "checklist": {}
        }

        // update count & set next after first itr
        count++;
        next = 1;

        // increment date
        start.setDate(start.getDate() + next);
      }

      // return array of day objects
      return calendar;
  }

}

// Automatic installation of plugin within web context
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Calendar)
}

export default Calendar
