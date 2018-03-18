<template>
<div id="timeBox"> 
  <div class="dropDown">
    <a v-on:click="show" class="drop-down">
      <p id="symbol">&#9716;</p> &nbsp;
      <p> {{hour}}:{{minute}} </p>
    </a>
    <div class="drop-down-content" v-if="showTime">
      <div class="listcontent">
        <div class="hour">
          <ul v-for="hour in hours">
            <li>
              <a class="link" v-on:click="selectHour(hour)">
                {{hour}}
              </a>
            </li>
          </ul>
        </div>
        <div class="minute">
          <ul v-for="minute in minutes">
            <li >
              <a class="link" v-on:click="selectMin(minute)">
                {{minute}}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="x">
        <a v-on:click="show">Done</a>
      </div> 
    </div>
  </div>
  <div class="tod">
    <a v-on:click="toggle">{{timeOfDay}}</a>
  </div>
  &nbsp;
</div>
</template>

<script>
export default {
  props: ['hour', 'minute', 'pm'],
  data() {
    return {
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: ['00', '30'],
      showTime: false,
      pmbool: this.pm,
      timeOfDay: "PM"
    }
  }, 
  beforeMount() {
    if(this.pm) {
      this.timeOfDay = "PM";
    } else {
      this.timeOfDay = "AM";
    }
  },
  methods: {
    toggle() {
      this.$emit('togglePM');
      this.pmbool = !this.pmbool;
      if(this.pmbool) {
        this.timeOfDay = "PM";
      } else {
        this.timeOfDay = "AM";
      }
    },
    checkTime() {
    }, 
    show() {
      this.showTime = !this.showTime; 
    }, 
    selectHour(hour) {
      this.$emit('changeHour', hour);
    },
    selectMin(min) {
      this.$emit('changeMin', min);
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../../../assets/sass/settings.scss";
  .dropDown {
    display: inline-block;
    flex: 1;
  }
  .hour {
    text-align: center;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    border-right: 1px grey solid;
  }
  .minute {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    width: 100%
  }
  .drop-down {
    background-color: none;
    color: black;
    border: none;
    font-size: 1em;
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .drop-down:focus {
    outline: none;
  }
  .drop-down-content {
    background-color: white;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1000;
    width: 15%;
    height: 80px;
    margin-top: 1%;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .drop-down-content::after {
    content: " ";
    position: absolute;
    bottom: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
  .listcontent {
    z-index: 100;
    display: flex;
    flex-direction: row;
    height: 70%;
    padding: 3% 0;
    margin-top: 1%;
  }
  #symbol {
    padding: 0 3%;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  ul:hover {
    background-color: #F5F5F5;
  }
  .link {
    color: black;
  }
  .tod {
    padding: 0 2%;
  }
  .x {
    height: 20%;
    margin: 0 auto;
  }
</style>