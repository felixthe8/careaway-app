// Calendar Plugin for Vue
const Calendar = {}

Calendar.install = function (Vue, options) {

  // Instance Method
  Vue.prototype.$renderCalendar = function (start) {
      // week day array
      let week = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
      // get today's date object
      let today = new Date();
      // get the first day of the month
      if(start === 1) {
        start = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      } else if(start === 0) {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
      } else {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      }

      // start on monday
      start = new Date(start.getFullYear(), start.getMonth(), start.getDate() + (start.getDay() == 0?-6:1) - start.getDay());

      // careaway calendar month
      let month = [];

      let next = 0, count = 0;
      while(count < 25) {
        //skip saturdays and sundays
        if(start.getDay() === 0) {
          next = 1; //set next after first itr
          start.setDate(start.getDate() + next);
        } else if(start.getDay() === 6) {
          next = 1; //set next after first itr
          start.setDate(start.getDate() + next + next);
        }

        // add day object to month
        month[count] = {
          "object": new Date(start.getFullYear(), start.getMonth(), start.getDate()),
          "date": start.getDate(),
          "code": start.getDay(),
          "month": start.getMonth(),
          "name": week[start.getDay()],
          "appointment": {},
          "scale": {},
          "checklist": {}
        }

        // update count & set next after first itr
        count++;
        next = 1;

        // increment date
        start.setDate(start.getDate() + next);
      }

      // return array of day objects
      return month;
  }
}

// Automatic installation of plugin within web context
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Calendar)
}

export default Calendar
