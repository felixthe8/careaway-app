<template>


  <div class="calendar-wrapper">
    <div class="calendar">

      <div class="columns is-mobile calendar__menu">
        <div class="item"><div class="calendar__menu--arrow-left" @click="previous"></div></div>
        <div class="item calendar__menu--label current-month"><h1>{{getCurrent().monthName}}</h1></div>
        <div class="item calendar__menu--label current-week"><h1>Week of the {{getCurrent().monday}}th</h1></div>
        <div class="item"><div class="calendar__menu--arrow-right" @click="next"></div></div>

        <div class="item calendar__menu--button active" @click="displayMonth"><h1 class="text">Month</h1></div>
        <div class="item calendar__menu--button" @click="displayWeek"><h1 class="text">Week</h1></div>
      </div>

      <div class="columns is-multiline monthly">
        <div class="column is-one-fifth calendar__day"
          v-for="day, index in getMonth()"
          :class="{
            'no-right' : (index+1)%5 === 0,
            'no-bottom': (index > 19),
            'weekly': day.date < getCurrent().monday || day.date > getCurrent().friday,
            'no-bottom__mobile': day.date === getCurrent().friday
          }">

          <div class="calendar__day--date"
            :class="{
                'today' : getCurrent().date === day.date
          }">{{day.date}}</div>

          <div class="blocked"
            v-if="day.month != getCurrent().month"
            :class="{
              'rounded-left': (index === 0),
              'rounded-right': (index === 24),
          }"></div>
          
          <div v-if="getWidget(day).length > 0">
            <div v-for="widget in getWidget(day)">
              <div class="widget-box" :class="getCompletedStatus(widget).className" @click="clickWidget(widget)">
                <div><i class="fas" :class="icons[widget.label]" style="margin-right:6px" />{{ titleize(widget.label) }}</div>
                <div class="status-text">{{ getCompletedStatus(widget).status }}</div>
              </div>
            </div>
          </div>
          
          <div class="calendar__day--label" v-if="index < 5">{{day.name}}</div>
        </div>

      </div>
    </div>
    <meter-widget :widget="selectedWidget" :active="active" v-on:close="close" v-on:save="save" />
    <checklist-widget :widget="selectedWidget" :active="active" v-on:close="close" v-on:save="save" />
  </div>

</template>

<script>
import meterWidget from './meter';
import checklistWidget from './checklist';
import axios from 'axios';
    
export default {
  name: 'app',
  components: {
    meterWidget,
    checklistWidget
  },
  created: function() {
    // Fetch treatment plan
    /*axios.get(this.$store.getters.getPatientTreatmentURL+this.$store.getters.authenticatedUsername)
      .then(response => {
        this.widgets = response.data.treatment;
      })
      .catch(err => {
        console.log(err);
      })*/
  },
  data() {
    return {
      icons: {
        checklist:'fa-clipboard-list',
        meter:'fa-tachometer-alt'
      },
      widgets: [
        {
          label: "checklist",
          list: [{question: 'Doki doki',check: false}],
          due_date: '2018-03-20',
          created_at: new Date(Date.now()),
          updated_at: null
        },{
          label: "meter",
          question: 'ASASAAAAA',
          scale: [1,10],
          due_date: '2018-03-21',
          patient_input: null,
          created_at: new Date(Date.now()),
          updated_at: null,
        },{
          label: "meter",
          question: 'Shoooopiiiii',
          scale: [1,10],
          due_date: '2018-03-22',
          patient_input: null,
          created_at: new Date(Date.now()),
          updated_at: null,
        },{
          label: "meter",
          question: 'Met',
          scale: [1,10],
          due_date: '2018-03-23',
          patient_input: null,
          created_at: new Date(Date.now()),
          updated_at: null,
        }
      ],
      selectedWidget: {},
      active: ''
    }
  },
  methods: {
    getCurrent() {
      // get today's date object
      let current = new Date();
      // get current monday
      let monday = new Date(current.getFullYear(), current.getMonth(), current.getDate() + (current.getDay() == 0?-6:1) - current.getDay());
      //get current friday
      let friday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4);
      // month array
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return {
        "date": current.getDate(),
        "day": current.getDay(),
        "month": current.getMonth(),
        "monthName": months[current.getMonth()],
        "year": current.getFullYear(),
        "monday": monday.getDate(),
        "friday": friday.getDate()
      };
    },
    getMonth(start) {
      // week day array
      let week = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
      // get today's date object
      let today = new Date();
      // get the first day of the month
      if(start === 1) {
        start = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      } else if(start === 0) {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      } else {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
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
          "object": start,
          "date": start.getDate(),
          "code": start.getDay(),
          "month": start.getMonth(),
          "name": week[start.getDay()]
        }

        // update count & set next after first itr
        count++;
        next = 1;

        // increment date
        start.setDate(start.getDate() + next);
      }

      // return array of day objects
      return month;
    },
    displayWeek(event) {
      let days = document.getElementsByClassName("monthly")[0].children;
      Array.from(days).forEach((item)=> {
        if(item.classList.contains("weekly"))
          item.classList.add("weekly--toggle");
        else
          item.classList.add("week-height");
      });

      document.getElementsByClassName("calendar__menu--button")[0].classList.add("active");
      document.getElementsByClassName("calendar__menu--button")[1].classList.remove("active");
    },
    displayMonth(event) {
        let days = document.getElementsByClassName("monthly")[0].children;
        Array.from(days).forEach((item)=> {
          if(item.classList.contains("weekly"))
            item.classList.remove("weekly--toggle");
          else
            item.classList.remove("week-height");
        });
        document.getElementsByClassName("calendar__menu--button")[1].classList.add("active");
        document.getElementsByClassName("calendar__menu--button")[0].classList.remove("active");
    },
    next(event) {
      console.log("next");
    },
    previous(event) {
      console.log("previous");
    },
    dateStrToDateObj(dateStr) {
      var dateArray = dateStr.split('-');
      return {
        year: parseInt(dateArray[0]),
        month: parseInt(dateArray[1]),
        day: parseInt(dateArray[2])
      }
    },
    getWidget(day) {
      // object: Date (obj)
      // date: int (date of month)
      // code: int (day of week)
      // month: int (month-1)
      // name: str (day of week)
      var widgets = this.widgets.filter(item => {
        var dueDate = this.dateStrToDateObj(item.due_date);

        const sameYear = dueDate.year === day.object.getFullYear();
        const sameMonth = dueDate.month-1 === day.month;
        const sameDay = dueDate.day === day.date;

        if (sameYear && sameMonth && sameDay) return true;
        return false;
      })
      return widgets;
    },
    clickWidget(widget, event) {
      var dueDate = this.dateStrToDateObj(widget.due_date);
      var todayDate = new Date();

      const sameYear = dueDate.year === todayDate.getFullYear();
      const sameMonth = dueDate.month-1 === todayDate.getMonth();
      const sameDay = dueDate.day === todayDate.getDate();

      if (!sameYear || !sameMonth || !sameDay) return;

      this.selectedWidget = widget;
      this.active = widget.label;
    },
    close() {
      this.active = '';
    },
    save(payload) {
      const obj = {
        treatment: payload,
        username: this.$store.getters.authenticatedUsername
      }
      axios.put(this.$store.getters.updatePatientTreatmentURL,obj)
      .then(function(response) {
        // Updated
      })
      .catch(function(err) {
        console.log(err);
      })
    },
    titleize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    getCompletedStatus(widget) {
      var due_date = this.dateStrToDateObj(widget.due_date);
      due_date = new Date(due_date.year, due_date.month-1, due_date.day);
      var today = new Date();
      
      due_date.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      
      var status = {
        status: 'Planned',
        className: widget.label+'-planned'
      }

      if (due_date > today) {
        return status;
      }
      
      status.status = 'Incomplete';
      status.className = widget.label+'-incomplete';

      if (widget.label == 'checklist') {
        for (var i=0;i<widget.list.length;i++) {
          if (!widget.list[i].check) {
            return status;
          }
        }
      } else {
        if (widget.patient_input === null || widget.patient_input === '') return status;
      }

      status.status = 'Completed';
      status.className = widget.label+'-completed';

      return status;
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.widget-box {
  padding-bottom: 6px;
  cursor: pointer;
  border-radius:3px;
}

.meter-incomplete {
  background-color: $blue-light;
}

.checklist-incomplete {
  background-color: $green-light;
}

.meter-completed {
  background-color: $blue-dark;
}

.checklist-completed {
  background-color: $green-dark;
}

.meter-planned {
  background-color: $blue;
}

.checklist-planned {
  background-color: $green;
}

.status-text {
  font-size: 12px;
}

.weekly {
  display: none;

  @media #{$tablet} {
    display: block;
  }

  &--toggle {
      display: none;
  }
}

.monthly {
  display: block;

  @media #{$smallTablet} {
    display: flex;
  }
}

.calendar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 2rem;
  max-width: 650px;
  border: 2px solid $green;
  border-radius: 10px 0 10px 10px;
  padding: 10px;

  @media #{$tablet} {
    margin: 2rem auto;
  }

  &__menu {
    position: absolute;
    top: -5.3%;
    right: 10px;

    .item {
      padding: 5px;
    }

    &--label {
      color: $purple-dark;

      &.current-week {
        @media #{$tablet} {
          display: none;
        }
      }

      &.current-month {
        display: none;
        @media #{$tablet} {
          display: block;
        }
      }
    }

    &--button {
      display: none;

      @media #{$tablet} {
        display: block;
      }
      
      background-color: $white;
      padding: 0 20px;
      text-align: center;
      border: 2px solid $green;
      background: $green;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .text {
        width: 75px;
      }
    }

    &--arrow-left {
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 8px solid $purple-dark;
      margin: 8px 0;

      &:hover {
        border-right: 8px solid $purple;
      }
    }

    &--arrow-right {
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 8px solid $purple-dark;
      margin: 8px 0;

      &:hover {
        border-left: 8px solid $purple;
      }
    }
  }

  &__day {
    position: relative;
    text-align: center;
    border-bottom: 2px solid $green;
    width: 100%;
    height: 100px;

    @media #{$smallTablet} {
      border-right: 2px solid $green;
      border-bottom: 0;
      height: 500px;
      width: 20%;
    }

    @media #{$tablet} {
      height: 100px;
      border-bottom: 2px solid $green;
    }

    &--date {
      text-align: left;
      font-size: .75em;
      color: $purple-dark;

      &.today {
        color: $green;
      }
    }

    &--label {
      margin-top: -20%;
      color: $purple-dark;
    }

    &.no-right {
      border-right: none;
    }

    &.no-bottom {
      border-bottom: none;

      &__mobile {
        border-bottom: 2px solid $green;
      }
    }

  }
}

.active {
  background: none;
}

.week-height {
  height: 500px;
}

.blocked {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: $green-light;
  opacity: .5;
  width: 100%;
  height: 100%;

  &.rounded-left {
    border-top-left-radius: 10px;
  }

  &.rounded-right {
    border-bottom-right-radius: 10px;
  }
}

</style>
