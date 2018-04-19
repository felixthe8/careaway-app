<template>
  <div>
        Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. 
    Man request adapted spirits set pressed. Up to denoting subjects sensible feelings it indulged directly. We dwelling elegance do shutters appetite yourself diverted. Our next drew much you with rank. Tore many held age hold rose than our. She literature sentiments any contrasted. Set aware joy sense young now tears china shy. 
    Attended no do thoughts me on dissuade scarcely. Own are pretty spring suffer old denote his. By proposal speedily mr striking am. But attention sex questions applauded how happiness. To travelling occasional at oh sympathize prosperous. His merit end means widow songs linen known. Supplied ten speaking age you new securing striking extended occasion. Sang put paid away joy into six her. 
    Greatly hearted has who believe. Drift allow green son walls years for blush. Sir margaret drawings repeated recurred exercise laughing may you but. Do repeated whatever to welcomed absolute no. Fat surprise although outlived and informed shy dissuade property. Musical by me through he drawing savings an. No we stand avoid decay heard mr. Common so wicket appear to sudden worthy on. Shade of offer ye whole stood hoped. 
    By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. Abroad no chatty others my silent an. Fat way appear denote who wholly narrow gay settle. Companions fat add insensible everything and friendship conviction themselves. Theirs months ten had add narrow own. 
    Received shutters expenses ye he pleasant. Drift as blind above at up. No up simple county stairs do should praise as. Drawings sir gay together landlord had law smallest. Formerly welcomed attended declared met say unlocked. Jennings outlived no dwelling denoting in peculiar as he believed. Behaviour excellent middleton be as it curiosity departure ourselves. 
    Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever. Elinor her his secure far twenty eat object. Late any far saw size want man. Which way you wrong add shall one. As guest right of he scale these. Horses nearer oh elinor of denote. 
    In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no. 
    There worse by an of miles civil. Manner before lively wholly am mr indeed expect. Among every merry his yet has her. You mistress get dashwood children off. Met whose marry under the merit. In it do continual consulted no listening. Devonshire sir sex motionless travelling six themselves. So colonel as greatly shewing herself observe ashamed. Demands minutes regular ye to detract is. 
    So by colonel hearted ferrars. Draw from upon here gone add one. He in sportsman household otherwise it perceived instantly. Is inquiry no he several excited am. Called though excuse length ye needed it he having. Whatever throwing we on resolved entrance together graceful. Mrs assured add private married removed believe did she. 
    Click the button below to try out the Appointment Creation.
  <br>
  <a class="button is-link is-rounded try" @click ="displayAppointmentCreation">{{tryButton}}</a>
  <appointmentCreation
    :appointeeType="appointeeType"
    :appointee="appointee"
    :isMed="isMed"
    v-if = "showAppointmentCreation" />
  </div>
</template>

<script>
  import appointmentCreation from '../../shared/appointment/appointment-creation.vue';
  export default {
    name:"tutorial-appointment-creation",
    components:{
        appointmentCreation
    },
    data(){
        return{
            appointeeType: "Medical Professional",
            appointee:[{firstName: "John", lastName: "Doe"}],
            isMed: true
        }
    },
    computed:{
      showAppointmentCreation() {
        return this.$store.getters.showAppointmentCreation;
      },
    },
    methods:{
      displayAppointmentCreation() {
        this.$store.dispatch('alternateAppointmentCreation');
      },
    }
  }
</script>
