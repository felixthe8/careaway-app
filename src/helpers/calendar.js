// Calendar Plugin for Vue
const Calendar = {}

Calendar.install = function (Vue, options) {

  // Calendar contstants
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  Vue.prototype.$weekDays = function() {
    return weekDays;
  }

  Vue.prototype.$months = function() {
    return months;
  }

  // Instance Method to get information from current date.
  Vue.prototype.$current = function () {
    // get today's date object
    let current = new Date();
    // get current monday
    let monday = new Date(current.getFullYear(), current.getMonth(), current.getDate() + (current.getDay() == 0?-6:1) - current.getDay());
    //get current friday
    let friday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4);
    return {
      "date": current.getDate(),
      "day": current.getDay(),
      "month": current.getMonth(),
      "year": current.getFullYear(),
      "monday": monday.getDate(),
      "friday": friday.getDate()
    };
  }

  // Instance Method
  Vue.prototype.$renderCalendar = function (initial, state) {
      let moment = require("moment");

      // get today's date object
      let today = new Date();

      // state default to month
      let SIZE = 25;
      // if is set, get initial month request or set initial month to the current month
      initial = initial || today;
      // initialize start date variable
      let start = new Date();

      if(!state) {
        // get month start ~ first day of calendar month + days to monday
        start = new Date(initial.getFullYear(), initial.getMonth(), 1);
      }
      else {
        SIZE = 5;
        // get week start ~ first day of calendar month + days to monday
        start = new Date(initial.getFullYear(), initial.getMonth(), initial.getDate());
      }

      // set start to current monday
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
          "object": new Date(start.getFullYear(), start.getMonth(), start.getDate()),
          "date": moment(new Date(start.getFullYear(), start.getMonth(), start.getDate())).format("YYYY-MM-DD"),
          "day": start.getDate(),
          "code": start.getDay(),
          "month": start.getMonth(),
          "name": weekDays[start.getDay()],
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
