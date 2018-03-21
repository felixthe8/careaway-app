<template>

  <div class="scale">
    <button class="scale__button green-button" draggable="true" @drag="onDrag">Scale</button>

    <div class="scale__menu">
      <label>Reason for scale:</label>
      <input class="scale__menu--input" name="scale" type="text" id="scale">
      <label>Date Requested:</label>
      <input class="scale__menu--input" name="date" type="text" id="scale-date">
      <button id="scale" class="scale__menu--create green-button" @click="create">Create Event</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'scale',

  props: ['calendar'],

  data() {
    return {
      scale: { "type": "scale" }
    }
  },

  methods: {
    onDrag:function(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
      event.dropEffect = "move";
    },
    create: function() {
      this.scale = {
        text: document.getElementById("scale").value,
        date: document.getElementById("scale-date").value
      }
      // get element by date attribute
      for(var i=0; i < this.calendar.length; i++) {
        if(this.calendar[i].date == this.scale.date) {
          this.calendar[i].scale = this.scale;
        }
      }
      document.getElementsByClassName("scale__menu")[0].classList.remove("show-menu");
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.scale {
  padding: 1rem;

  &__button {
    padding: 5px 20px;
    cursor: move;
  }

  &__label {
    margin-left: 1rem;
  }

  &__button {

  }

  &__menu {
    display: none;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 0;
    background: $green-light;
    margin-left: 1rem;
    padding: 1rem;

    &--create {

    }
  }

}

.show-menu {
  display: block;
}
</style>
