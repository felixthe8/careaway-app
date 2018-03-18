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
          
          <div v-if="getWidget(day).length > 0" @click="clickWidget(getWidget(day))">
            WIDGETY!!!!
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
    
export default {
  name: 'app',
  components: {
    meterWidget,
    checklistWidget
  },
  created: function() {
    // Fetch treatment plan
    /*axios.get(this.$store.getters.returnCodeURL+this.$store.getters.authenticatedUsername)
      .then(function(response) {
        // Extract out medical code from the response
        self.medicalcode = response.data.medicalcode;
        self.$store.dispatch('medicalCode', self.medicalcode);
      })
      .catch(function(err) {
        console.log(err);
      })*/

    /*while (x \
              \
               \
                \
                 \ getMonth()) {
      
    }*/

  },
  data() {
    return {
      widgets: [
        {
          label: "checklist",
          list: [],
          due_date: new Date(2018,2,19),
          created_at: new Date(Date.now()),
          updated_at: null
        },{
          label: "meter",
          question: '',
          scale: [1,10],
          due_date: new Date(2018,2,16),
          patient_input: null,
          created_at: new Date(Date.now()),
          updated_at: null,
        }
      ],
      selectedWidget: {label:'checkwist'},
      active: ''
    }
  },
  methods: {
    getCurrent: function() {
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
    getMonth: function(start) {
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
    displayWeek: function(event) {
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
    displayMonth: function(event) {
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
    next: function(event) {
      console.log("next");
    },
    previous: function(event) {
      console.log("previous");
    },
    getWidget: function(day) {
      //console.log(day);
      // object: Date (obj)
      // date: int (date of month)
      // code: int (day of week)
      // month: int (month-1)
      // name: str (day of week)
      var widgets = this.widgets.filter(function(item) {
        var dueDate = item.due_date;
        var compareDate = day.object;

        const sameYear = dueDate.getFullYear() === day.object.getFullYear();
        const sameMonth = dueDate.getMonth() === day.month;
        const sameDay = dueDate.getDate() === day.date;

        if (sameYear && sameMonth && sameDay) return true;
        return false;
      })
      return widgets;
    },
    clickWidget: function(widget, event) {
      widget = widget[0];
      this.selectedWidget = widget;
      this.active = widget.label;
    },
    close: function() {
      this.active = '';
    },
    save: function(payload) {
      console.log('pay');
      console.log(payload);
      // TODO axios call
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

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
