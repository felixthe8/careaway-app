<template>

  <div class="calendar-wrapper">
    <div class="calendar">

      <div class="columns is-mobile calendar__menu">
        <div class="item"><div class="calendar__menu--arrow-left" @click="previous"></div></div>
        <div class="item calendar__menu--label current-month">
          <h1 v-if="!this.$store.getters.calendarState">{{months[calendar[12].month]}}</h1>
        </div>
        <div class="item calendar__menu--label current-week">
          <h1 v-if="this.$store.getters.calendarState">Week of {{months[calendar[0].month]}} {{calendar[0].day}}</h1>
        </div>
        <div class="item"><div class="calendar__menu--arrow-right" @click="next"></div></div>

        <button class="item calendar__menu--button"
          @click="displayMonthly"><h1 class="text">Month</h1>
        </button>

        <button class="item calendar__menu--button active"
          @click="displayWeekly"><h1 class="text">Week</h1>
        </button>
      </div>

      <div class="columns is-multiline monthly">
        <div class="column is-one-fifth calendar__day"
          @dragover="dragOver"
          @drop="drop"
          v-for="day, index in calendar.length"
          :date="calendar[index].date"
          :class="{
            'no-right' : (index+1)%5 === 0,
            'no-bottom': (index > 19)
          }">

          <div class="calendar__day--date"
            :class="{
                'today' : getCurrent.date === calendar[index].day
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
      week: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"],
      user: "",
      appointments: null,
      meters: null,
      checklists: null,
      weekView: false,
    }
  },

  created: function() {
    // Get current user from store
    this.user = this.$store.getters.authenticatedUsername;
    // Get current appointments from store
    this.appointments = this.$store.getters.appointments;
    // Get current widgets from store
    this.meters = this.$store.getters.meters;
    this.checklists = this.$store.getters.checklists;
  },

  mounted: function() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      //Init
      this.getWindowWidth();
    });
  },

  methods: {
    getWindowWidth(event) {
      // get change in window size
      let windowWidth = document.documentElement.clientWidth;
      if(windowWidth < 760) {
        this.displayWeekly();
      }
    },

    /* Next Previous Button Click Handlers */
    next: function(event) {
      let state = this.$store.getters.calendarState;
      // default to current month
      let next = this.getWeek(this.calendar[0].object, 7);
      if(!state) {
        next = this.getMonth(this.calendar[12].object, 1);
      }
      this.calendar = this.$renderCalendar(next, state);
      this.getEvents(this.user, this.appointments, this.meters, this.checklists);
    },
    previous: function(event) {
      let state = this.$store.getters.calendarState;
      // default to current month
      let previous = this.getWeek(this.calendar[0].object, -7);
      if(!state) { previous = this.getMonth(this.calendar[12].object, -1); }
      this.calendar = this.$renderCalendar(previous, this.$store.getters.calendarState);
      this.getEvents(this.user, this.appointments, this.meters, this.checklists);
    },
    /* End Previous Button Click Handlers */

    /* Tab Click Handlers */
    displayWeekly: function(event) {
      if(!this.weekView) {
        this.weekView = true;
        this.$store.dispatch("calendarState");
        this.calendar = this.$renderCalendar(new Date(), true);
        this.getEvents(this.user, this.appointments, this.meters, this.checklists);

        // get day elements from html add week height
        let days = document.getElementsByClassName("monthly")[0].children;
        Array.from(days).forEach((item)=> { item.classList.add("week-height"); });

        // add/remove active class to tabs
        document.getElementsByClassName("calendar__menu--button")[0].classList.add("active");
        document.getElementsByClassName("calendar__menu--button")[1].classList.remove("active");
      }
    },
    displayMonthly: function(event) {
      if(this.weekView) {
        this.weekView = false;
        this.$store.dispatch("calendarState");
        this.calendar = this.$renderCalendar();
        this.getEvents(this.user, this.appointments, this.meters, this.checklists);

        // Get day elements from html remove week height
        let days = document.getElementsByClassName("monthly")[0];
        // Add class to every cell
        Array.from(days.children).forEach((item)=> { item.classList.remove("week-height"); });

        // add/remove active class to tabs
        document.getElementsByClassName("calendar__menu--button")[1].classList.add("active");
        document.getElementsByClassName("calendar__menu--button")[0].classList.remove("active");
      }
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
    getEvents: function(user, appointments, meters, checklists) {
        // load current events on the calendar
        for(var i=0; i < this.calendar.length; i++) {
          // get current appointments based on calendar date
          // --> find appointments where the current date iteration
          //     matches appointment in vue store
          let appointmentMatch = appointments.find(appointment  => (moment(appointment.date).isSame(moment(this.calendar[i].date))) && (appointment.appointee === user || appointment.initiator === user));
          // if there is a match update the calendar
          if(appointmentMatch) {
              this.calendar[i].appointment = appointmentMatch;
          }

          // if on patient treatment view
          if(this.$store.getters.patientSelected) {
            // get current meters based on calendar date
            // --> find meters where the current date iteration
            //     matches meter in vue store
            let meterMatch = meters.find(meter  => meter.due_date === this.calendar[i].date);
            // if there is a match update the calendar
            if(meterMatch) {
              this.calendar[i].meter = meterMatch;
            }

            // get current checklists based on calendar date
            // --> find checklists where the current date iteration
            //     matches checklist in vue store
            let checklistMatch = checklists.find(checklist  => checklist.due_date === this.calendar[i].date);
            // if there is a match update the calendar
            if(checklistMatch) {
              this.calendar[i].checklist = checklistMatch;
            }
          }
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
      document.getElementsByClassName("meter-status-modal")[0].classList.add("is-active");
      // find current meter based on day
      let current = this.calendar.filter(day => day.date === date)[0];
      // update vuex
      this.$store.dispatch("currentMeter", current.meter);
    },
    toggleChecklist(date) {
      // show checklist status modal
      document.getElementsByClassName("checklist-status-modal")[0].classList.add("is-active");
      // find current checklist based on day
      let current = this.calendar.filter(day => day.date === date)[0];
      // update vuex
      this.$store.dispatch("currentChecklist", current.checklist);
    },
    /* End Modal Toggle Functions */

    /* Widget Drag Drop Event Handlers */
    dragOver: function(event) {
      event.preventDefault();
    },
    drop: function(event) {
      event.preventDefault();
      let date = event.target.getAttribute("date");
      let now = moment(new Date()).format("YYYY-MM-DD");
      if(date < now) {
        alert("Must choose date greater than today's date, try again.");
        return;
      }

      if(this.$store.getters.showMeter === true) {
        document.getElementById("meter-date").value = date;
        document.getElementsByClassName("meter-modal")[0].classList.add("is-active");
        this.$store.dispatch("toggleMeter");
      }

      if(this.$store.getters.showChecklist === true) {
        document.getElementById("checklist-date").value = date;
        document.getElementsByClassName("checklist-modal")[0].classList.add("is-active");
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


.calendar-wrapper {
  position: relative;
}

.calendar {
  position: relative;
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
    top: -2%;
    width: 100%;
    justify-content: center;

    @media #{$tablet} {
      width: auto;
      top: -4.9%;
      right: 10px;
    }

    .item {
      padding: 5px;
    }

    &--label {
      color: $purple-dark;
    }

    &--button {
      display: none;
      color: $white;
      cursor: pointer;

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
      cursor: pointer;

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
      cursor: pointer;

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

    @media #{$tablet} {
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
      color: $purple-dark;

      @media #{$tablet} {
        margin-top: -20%;
      }
    }

    &--button {
      background: $green-light !important;
      font-size: 8px;
      cursor: pointer;
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

.monthly {
  transition: all ease 1s;
}

.active {
  background-color: $white;
  color: $purple-dark;
}

.week-height {
  height: 200px;
  width: 100%;

  @media #{$tablet} {
    height: 500px;
    width: auto;
  }
}

</style>
