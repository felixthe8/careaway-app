<template>
  <section class="section service-block">
    <div class="columns">
      <div class="column" v-for="service in services">
        <img class="service-block__icon" :src="service.icon">
        <p class="service-block__description">{{service.description}}</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'header-block',
    data() {
      return {
        services: [
          {
            "description": "Appointment Scheduling",
            "icon": "http://placehold.it/50x50"
          },
          {
            "description": "Appointment Requests",
            "icon": "http://placehold.it/50x50"
          },
          {
            "description": "Treatment Plan Creation Tools",
            "icon": "http://placehold.it/50x50"
          },
          {
            "description": "Treatment Plan Interaction",
            "icon": "http://placehold.it/50x50"
          },
          {
            "description": "Easy Doctor Communication",
            "icon": "http://placehold.it/50x50"
          },
          {
            "description": "Data Report Generation",
            "icon": "http://placehold.it/50x50"
          }
        ]
      }
    }
  }
</script>


<style lang="scss">
@import "../../assets/sass/settings.scss";
.service-block {
  background: $green;
  text-align: center;
  &__icon {
    border-radius: 50%;
  }
  &__description {
    color: $white;
  }
}
</style>
