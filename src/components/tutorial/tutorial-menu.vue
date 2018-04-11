<template>
    <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a @click = "routeTutorialWelcome">Welcome to CareAway</a></li>
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
              <li><a @click = "routeCreateMeterWidgetTutorial">Meter Widget Creation</a></li>
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
      this.$router.push('/Tutorial')
    },
     routeSetDiagnosisTutorial() {
      this.$router.push('/Tutorial/SetDiagnosis')
     },
     routeCreateMeterWidgetTutorial() {
      this.$router.push('/Tutorial/CreateMeter')
     }
   }
}
</script>
