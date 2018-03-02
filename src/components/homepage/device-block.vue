<template>

  <section class="section device-block">
    <div class="wrapper" v-for="section in sections" >
      <div class="columns" v-if="section.default === true">
        <div class="column device-block__description">
          <p class="device-block__description--text">{{section.description}}</p>
        </div>
        <div class="column">
          <img class="device-block__device" :src="section.device">
        </div>
      </div>
      <div class="columns" v-else>
        <div class="column">
          <img class="device-block__device" :src="section.device">
        </div>
        <div class="column device-block__description">
          <p class="device-block__description--text">{{section.description}}</p>
        </div>
      </div>
    </div>

  </section>

</template>

<script>
  export default {
    name: 'device-block',

    data() {
      return {
        sections: [
          {
            device: require('../../assets/images/laptop.svg'),
            description: 'Informational views available for easy use on Desktop devices.',
            default: false
          },
          {
            device: require('../../assets/images/phone.svg'),
            description: 'Mobile Support Coming Soon',
            default: true
          },
          {
            device: require('../../assets/images/responsive.svg'),
            description: 'Responsive easy to use design for all your devices',
            default: false
          }
        ]
      }
    }
  }

</script>

<style lang="scss">

@import "../../assets/sass/settings.scss";

.device-block {
  width: 100%;
  height: auto;

  &__device {
      width: 300px;
      height: 300px;
      filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));
  }

  &__description {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &--text {
          max-width: 50%;
      }
  }

}

</style>
