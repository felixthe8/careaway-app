<template>
    <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a @click = "routeTutorialWelcome">Welcome to CareAway</a></li>
    </ul>
    <p class="menu-label">
      Checklist Widget
    </p>
    <ul class="menu-list">
      <li><a @click = "routeCreateChecklistWidgetTutorial">Checklist Widget Creation</a></li>
      <li><a @click = "routeInteractChecklistWidgetTutorial">Checklist Widget Interaction</a></li>
    </ul>
    <p class="menu-label"> 
      Meter Widget
    </p>
    <ul class="menu-list">
      <li><a @click = "routeCreateMeterWidgetTutorial">Meter Widget Creation</a></li>
      <li><a @click = "routeInteractMeterWidgetTutorial">Meter Widget Interaction</a></li>
    </ul>

    <p class="menu-label">
      Set Diagnosis
    </p>
    <ul class="menu-list">
      <li><a @click = "routeSetDiagnosisTutorial">Setting Patient Diagnosis</a></li>
    </ul>      
    </aside>
</template>

<script>
export default {
   name: 'tutorialMenu',
   methods: {
    routeTutorialWelcome(){
      this.$router.push('/Tutorial')
    },
     routeSetDiagnosisTutorial() {
      this.$router.push('/Tutorial/SetDiagnosis')
     },
     routeCreateMeterWidgetTutorial() {
      this.$router.push('/Tutorial/CreateMeter')
     },
     routeCreateChecklistWidgetTutorial() {
       this.$router.push('/Tutorial/CreateChecklist')
     },
     routeInteractMeterWidgetTutorial() {
       this.$router.push('/Tutorial/InteractMeter')
     },
     routeInteractChecklistWidgetTutorial() {
       this.$router.push('/Tutorial/InteractChecklist')
     },
     
   }
}
</script>
