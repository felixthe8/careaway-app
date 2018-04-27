<template>
  <section class="section service-block">
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="service in services">
        <service class="service-block__icon" :icon="service.icon"/>
        <p class="service-block__description">{{service.description}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import service from './service.vue';
  export default {
    name: 'header-block',
    components: {service},
    data() {
      return {
        services: [
          {
            "description": "Appointment Scheduling",
            "icon": "fas fa-calendar-alt"
          },
          {
            "description": "Appointment Requests",
            "icon": "fas fa-phone"
          },
          {
            "description": "Treatment Plan Creation Tools",
            "icon": "fas fa-user-md"
          },
          {
            "description": "Treatment Plan Interaction",
            "icon": "fas fa-universal-access"
          },
          {
            "description": "Easy Doctor Communication",
            "icon": "fas fa-comments"
          },
          {
            "description": "Data Report Generation",
            "icon": "fas fa-chart-pie"
          }
        ]
      }
    }
  }
</script>


<style lang="scss">
@import "../../assets/sass/settings.scss";

.service-block {
  background: $green-dark;
  text-align: center;

  &__icon {
    border-radius: 10%;
    border: 2px solid $white;
    color: $white;
    padding: 30px;
    font-size: 12px;
    margin-bottom: 10px;
  }

  &__description {
    color: $white;
    font-weight: bold;
  }

}

</style>
