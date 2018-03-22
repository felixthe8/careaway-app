<template>

  <div class="calendar-wrapper">
    <div class="calendar">

      <div class="columns is-mobile calendar__menu">
        <div class="item"><div class="calendar__menu--arrow-left" @click="previous"></div></div>
        <div class="item calendar__menu--label current-month"><h1>{{months[calendar[15].month]}}</h1></div>
        <div class="item calendar__menu--label current-week"><h1>Week of the {{getCurrent.monday}}th</h1></div>
        <div class="item"><div class="calendar__menu--arrow-right" @click="next"></div></div>

        <div class="item calendar__menu--button" @click="monthly"><h1 class="text">Month</h1></div>
        <div class="item calendar__menu--button active" @click="weekly"><h1 class="text">Week</h1></div>
      </div>

      <div class="columns is-multiline monthly">
        <div class="column is-one-fifth calendar__day"
          @dragover="dragOver"
          @drop="drop"
          v-for="day, index in calendar.length"
          :class="{
            'no-right' : (index+1)%5 === 0,
            'no-bottom': (index > 19),
            'weekly': calendar[index].date < getCurrent.monday || calendar[index].date > getCurrent.friday,
            'no-bottom__mobile': calendar[index].date === getCurrent.friday
          }">

          <div class="calendar__day--date"
            :class="{
                'today' : getCurrent.date === calendar[index].date
          }">{{calendar[index].date}}</div>

          <div class="blocked"
            v-if="calendar[index].month != getCurrent.month"
            :class="{
              'rounded-left': (index === 0),
              'rounded-right': (index === 24),
          }"></div>

          <div class="calendar__day--label" v-if="index < 5">{{calendar[index].name}}</div>

          <div class="calendar__day--appointment"
            v-if="calendar[index].appointment.created">
              <button class="button is-primary is-rounded" @click="toggleCreate">
                {{calendar[index].appointment.date}}
              </button>
          </div>
          <div class="calendar__day--scale">{{calendar[index].scale.text}}</div>
          <div class="calendar__day--checklist">{{calendar[index].checklist.text}}</div>

        </div>

      </div>

    </div>
  </div>

</template>

<script>

export default {
  name: 'app',

  props: ['calendar'],

  data() {
    return {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      week: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"],
      state: 0
    }
  },

  methods: {
    next: function(event) {
      if(this.state < 1)
        this.state = this.state + 1;
      this.calendar = this.$renderCalendar(this.state);
    },
    previous: function(event) {
      if(this.state > -1)
        this.state = this.state - 1;
      this.calendar = this.$renderCalendar(this.state);
    },
    weekly: function(event) {
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
    monthly: function(event) {
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
    toggleCreate: function() {
      this.$store.dispatch("alternateAppointment");
    },
    dragOver: function(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move"
    },
    drop: function(event) {
      event.preventDefault();

      //if scale
      console.log(event.dataTransfer.getData("text/plain"));
      let date = event.target.getAttribute("date");
      document.getElementById("scale-date").value = date;
      document.getElementsByClassName("scale__menu")[0].classList.add("show-menu");

      //if checklist
      // let date = event.target.getAttribute("date");
      // document.getElementById("checklist-date").value = date;
      // document.getElementsByClassName("checklist__menu")[0].classList.add("show-menu");
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
