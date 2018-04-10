<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a @click = "routeTutorialWelcome">Welcome to CareAway</a></li>
    </ul>
    <p class="menu-label">
      Appointment Scheduling
    </p>
    <ul class="menu-list">
      <li>
        <a> Appointment </a>
        <ul>
          <li><a @click="routeAppointmentCreationTutorial">Appointment Creation</a></li>
          <li><a>Appointment Update</a></li>
          <li><a>Appointment Deletion</a></li>
          <li><a>Appointment Status</a></li>
        </ul>
      </li> 
    </ul>
    <p class="menu-label">
      Medical Widgets
    </p>
    <ul class="menu-list">
      <li>
        <a>Checklist Widget</a>
        <ul>
          <li><a>Checklist Widget Creation</a></li>
          <li><a>Checklist Widget Interaction</a></li>
        </ul>
      </li>
      <li>
        <a> Meter Widget </a>
        <ul>
          <li><a>Meter Widget Creation</a></li>
          <li><a>Meter Widget Interaction</a></li>
        </ul>
      </li>
    <li>
      <a @click = "routeSetDiagnosisTutorial">Setting Patient Diagnosis</a>
    </li>
  </ul>  
 </aside>  
</template>

<script>
export default {
  name: 'tutorialMenu',
  methods: {
    routeTutorialWelcome(){
      this.$router.push('/Tutorial');
    },
    routeSetDiagnosisTutorial() {
      this.$router.push('/Tutorial/SetDiagnosis');
    },
    routeAppointmentCreationTutorial() {
      this.$router.push('/Tutorial/AppointmentCreation');
    }
  }
}
</script>
