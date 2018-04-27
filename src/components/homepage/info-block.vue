<template>
  <section class="section info-block">
    <img class="info-block__webpage" src="../../assets/images/webpage.png">
    <p class="info-block__description">{{description}}</p>
  </section>
</template>


<script>
  export default {
    name: 'header-block',

    data() {
      return {
        description: 'Careaway is a medical treatment platform that provides optimal communication between medical professionals and their patients.'
      }
    }
  }
</script>


<style lang="scss">
@import "../../assets/sass/settings.scss";

.info-block {
  width: 100%;
  height: auto;

  &__webpage {
    display: block;
    margin: 0 auto;
    width: 70%;
    transform: translateY(-75px);
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.4));

    @media #{$tablet} {
        width: 50%;
        transform: translateY(-100px);
    }
  }

  &__description {
    text-align: center;
    padding-bottom: 50px;
  }

}

</style>
