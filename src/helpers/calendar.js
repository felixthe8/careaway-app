// Calendar Plugin for Vue
const Calendar = {}

Calendar.install = function (Vue, options) {
    // TODO: add new prototype methods global constants
  // Instance Method
  Vue.prototype.$renderCalendar = function (initial, state) {
      let moment = require("moment");

      // week day array
      let week = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
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
        start = new Date(today.getFullYear(), initial.getMonth(), 1);
      }
      else {
        SIZE = 5;
        // get week start ~ first day of calendar month + days to monday
        let start = new Date(today.getFullYear(), today.getMonth, initial.getDate());
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
          "name": week[start.getDay()],
          "appointment": {},
          "meter": {},
          "checklist": {}
        }
        // TODO: change object to null

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
