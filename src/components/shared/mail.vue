<template>

  <div class="mail">
      <button class="mail__button" @click="toggleMail">
          <div class="mail__button--counter" v-if="count > 0">{{count}}</div>
          <i class="fas fa-envelope"></i>
      </button>

      <div class="mail__menu">
        <div class="mail__menu--current-message">{{message}}</div>
        <hr class="line">
        <input class="input" name="message" type="text" id="message">
        <button id="meter" class="mail__menu--create green-button" @click="create">Send</button>
      </div>
  </div>

</template>

<script>
export default {
  name: "mail",

  data() {
    return {
      count: 0,
      message: "no messages"
    }
  },

  methods: {
    toggleMail: function() {
      document.getElementsByClassName("mail__menu")[0].classList.toggle("show-mail");
    }
  }

}
</script>

<style lang="scss">
@import "../../assets/sass/settings.scss";

.mail {
  &__button {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 8px 8px;
    margin: 1rem;
    font-size: 1em;
    color: $green;
    border: 1px solid $green;
    border-radius: 20px;

    &--counter {
      position: absolute;
      font-size: .75em;
      top: -10px;
      right: 0;
      padding: 2px 6px;
      border-radius: 20px;
      color: $white;
      background: $green;
    }
  }

  &__menu {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 3rem;
      padding: 1rem;
      border: 2px solid $green;
      border-radius: 10px;
      background: $white;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
      transform: scale(0) translateY(500px);
      opacity: 0;
      transition: all ease 1s;

      &--current-message {
        text-align: center;
        color: gray;
      }
  }
}

.line {
  margin: 1rem;
}

.show-mail {
  transform: scale(1) translateY(0);
  opacity: 1;
}

</style>
