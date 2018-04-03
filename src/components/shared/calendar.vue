<template>

  <div class="calendar-wrapper">
    <div class="calendar">

      <div class="columns is-mobile calendar__menu">
        <div class="item"><div class="calendar__menu--arrow-left" @click="previous"></div></div>
        <div class="item calendar__menu--label current-month">
          <h1 v-if="!this.$store.getters.calendarState">{{months[calendar[12].month]}}</h1>
        </div>
        <div class="item calendar__menu--label current-week">
          <h1 v-if="this.$store.getters.calendarState">Week of {{months[calendar[4].month]}} {{getCurrent.monday}}</h1>
        </div>
        <div class="item"><div class="calendar__menu--arrow-right" @click="next"></div></div>

        <div class="item calendar__menu--button" @click="monthly"><h1 class="text">Month</h1></div>
        <div class="item calendar__menu--button active" @click="weekly"><h1 class="text">Week</h1></div>
      </div>

      <div class="columns is-multiline monthly">
        <div class="column is-one-fifth calendar__day"
          @dragover="dragOver"
          @drop="drop"
          v-for="day, index in calendar.length"
          :date="calendar[index].date"
          :class="{
            'no-right' : (index+1)%5 === 0,
            'no-bottom': (index > 19),
            'no-bottom__mobile': calendar[index].date === getCurrent.friday,
            /* 'calendar__day__blocked': calendar[index].month != calendar[12].month */
          }">

          <div class="calendar__day--date"
            :class="{
                'today' : getCurrent.date === calendar[index].date
          }">{{calendar[index].day}}</div>

          <div class="calendar__day--label" v-if="index < 5">{{calendar[index].name}}</div>

          <div class="calendar__day--appointment"
            v-if="calendar[index].appointment.created">
              <button class="button calendar__day--button"
                @click="toggleAppointment(calendar[index].appointment.date)"
                :id="calendar[index].appointment.date">
                {{calendar[index].appointment.date}}
              </button>
          </div>

          <div class="calendar__day--meter"
            v-if="calendar[index].meter.due_date">
            <button class="button calendar__day--button"
              :date="calendar[index].meter.due_date"
              @click="toggleMeter(calendar[index].meter.due_date)">
                {{calendar[index].meter.label}}
            </button>
          </div>

          <div class="calendar__day--checklist"
            v-if="calendar[index].checklist.due_date">
            <button class="button calendar__day--button"
              :date="calendar[index].checklist.due_date"
              @click="toggleChecklist(calendar[index].checklist.due_date)">
                {{calendar[index].checklist.label}}
            </button>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<script>

import moment from 'moment';

export default {
  name: 'app',

  props: ['calendar'],

  data() {
    return {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      week: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"]
    }
  },

  methods: {

    /* Next Previous Button Click Handlers */
    next: function(event) {
      let state = this.$store.getters.calendarState;
      // default to current month
      let next = this.getWeek(this.calendar[0].object, 7);
      if(!state) { next = this.getMonth(this.calendar[12].object, 1); }
      this.calendar = this.$renderCalendar(next, state);
      this.getEvents();
    },
    previous: function(event) {
      let state = this.$store.getters.calendarState;
      // default to current month
      let previous = this.getWeek(this.calendar[0].object, -7);
      if(!state) { previous = this.getMonth(this.calendar[12].object, -1); }
      this.calendar = this.$renderCalendar(previous, this.$store.getters.calendarState);
      this.getEvents();
    },
    /* End Previous Button Click Handlers */

    /* Tab Click Handlers */
    weekly: function(event) {
      this.$store.dispatch("calendarState");
      this.calendar = this.$renderCalendar(this.calendar[0].object, true);
      this.getEvents();

      // get day elements from html add week height
      let days = document.getElementsByClassName("monthly")[0].children;
      Array.from(days).forEach((item)=> { item.classList.add("week-height"); });

      // add/remove active class to tabs
      document.getElementsByClassName("calendar__menu--button")[0].classList.add("active");
      document.getElementsByClassName("calendar__menu--button")[1].classList.remove("active");
    },
    monthly: function(event) {
        this.$store.dispatch("calendarState");
        this.calendar = this.$renderCalendar();
        this.getEvents();

        // get day elements from html remove week height
        let days = document.getElementsByClassName("monthly")[0].children;
        Array.from(days).forEach((item)=> { item.classList.remove("week-height"); });

        // add/remove active class to tabs
        document.getElementsByClassName("calendar__menu--button")[1].classList.add("active");
        document.getElementsByClassName("calendar__menu--button")[0].classList.remove("active");
    },
    /* End Tab Click Handlers */

    /* Calendar Helper Functions */
    getMonth(current, shift) {
      current = moment(current);
      return new Date(current.add(shift, 'months'));
    },
    getWeek(current, shift) {
      current = moment(current);
      return new Date(current.add(shift, 'days'));
    },
    getEvents: function() {
      // updates events on calendar
      let appointments = this.$store.getters.appointments;
      let meters = this.$store.getters.meters;
      let checklists = this.$store.getters.checklists;
      for(var i=0; i < this.calendar.length; i++) {
        // get current events based on calendar date
        let appointmentMatch = appointments.find(appointment  => appointment.date === this.calendar[i].date);
        if(appointmentMatch) { this.calendar[i].appointment = appointmentMatch; }
        let meterMatch = meters.find(meter  => meter.due_date === this.calendar[i].date);
        if(meterMatch) { this.calendar[i].meter = meterMatch; }
        let checklistMatch = checklists.find(checklist  => checklist.due_date === this.calendar[i].date);
        if(checklistMatch) { this.calendar[i].checklist = checklistMatch; }
      }
    },
    /* End Calendar Helper Functions */

    /* Modal Toggle Functions */
    toggleAppointment: function(index) {
      this.$store.dispatch("editableAppointment", index);
      this.$store.dispatch("alternateAppointment");
    },
    toggleMeter(date) {
      // show meter status modal
      document.getElementsByClassName("meter-status-modal")[0].classList.add("show-modal");
      // find current meter based on day
      let current = this.calendar.filter(day => day.date === date)[0];
      // update vuex
      this.$store.dispatch("currentMeter", current.meter);
    },
    toggleChecklist(date) {
      // show checklist status modal
      document.getElementsByClassName("checklist-status-modal")[0].classList.add("show-modal");
      // find current checklist based on day
      let current = this.calendar.filter(day => day.date === date)[0];
      // update vuex
      this.$store.dispatch("currentChecklist", current.checklist);
    },
    /* End Modal Toggle Functions */

    /* Widget Drag Drop Event Handlers */
    dragOver: function(event) {
      event.preventDefault();

      // define hover style
      // event.target.style.background = "red";
    },
    drop: function(event) {
      event.preventDefault();

      if(this.$store.getters.showMeter === true) {
        let date = event.target.getAttribute("date");
        document.getElementById("meter-date").value = date;
        document.getElementsByClassName("meter-modal")[0].classList.add("show-modal");
        this.$store.dispatch("toggleMeter");
      }

      if(this.$store.getters.showChecklist === true) {
        let date = event.target.getAttribute("date");
        document.getElementById("checklist-date").value = date;
        document.getElementsByClassName("checklist-modal")[0].classList.add("show-modal");
        this.$store.dispatch("toggleChecklist");
      }
    }
  },

  computed: {
    getCurrent: function() {
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
  }
}
</script>

<style lang="scss">

@import '../../assets/sass/settings.scss';

.calendar-wrapper {
  position: relative;
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
    }

    &--button {
      display: none;

      @media #{$tablet} {
        display: block;
      }

      background-color: $green;
      padding: 0 20px;
      text-align: center;
      border: 2px solid $green;
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

    &--button {
      background: $green-light !important;
      font-size: 8px;
    }

    &__blocked {
      background-color: $green-light;
      opacity: .5;
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
  background-color: $white;
}

.week-height {
  height: 500px;
}

</style>
