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
            description: `All the tools to manage your patients are just a click away. Register and find out what you're missing !` ,
            default: false
          },
          {
            device: require('../../assets/images/phone.svg'),
            description: `CareAway for Mobile is coming soon. Stay tuned for the announcment !`,
            default: true
          },
          {
            device: require('../../assets/images/responsive.svg'),
            description: `Ready for use on your desktop, laptop, and tablet. CareAway for Mobile is right around the corner !`,
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
  background: $green-light;

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
