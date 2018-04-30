<template>

  <section class="section device-block">
    <div class="wrapper" v-for="section in sections" >
      <div class="columns" v-if="section.default === true">
        <div class="reverse">
          <div class="column device-block__description reverse-description">
            <p class="device-block__description--text">{{section.description}}</p>
          </div>
          <div class="column">
            <img class="device-block__device" :src="section.device">
          </div>
        </div>
      </div>
      <div class="columns" v-else>
        <div class="column reverse">
          <img class="device-block__device" :src="section.device">
        </div>
        <div class="column device-block__description  reverse">
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
            description: `Effect easy to use tools for both patients and doctors.` ,
            default: false
          },
          {
            device: require('../../assets/images/phone.svg'),
            description: `Mobile support comming soon.`,
            default: true
          },
          {
            device: require('../../assets/images/responsive.svg'),
            description: `Responsive design for easy use on all your devices coming soon.`,
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
    display: flex;
    width: 300px;
    height: 300px;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));
    margin: 0 auto;

    @media #{$tablet} {
      width: 550px;
      margin: auto;
    }
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

.reverse {
  display: flex;
  flex-direction: column-reverse;
  padding: 1rem;

  @media #{$tablet} {
    display: flex;
    flex-direction: row;
    padding-bottom: auto;
  }
}

.reverse-description {
    padding: 5rem 0;
}

</style>
