<template>
  <div v-if="transfering">
    <h1>TRANSFER REQUEST</h1>
    <p>{{currentMed}} would like to transfer you to {{newMed}}.</p>
    <button @click="accept"> Accept </button>
    <button @click="deny"> Decline </button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "patienttransfer",
  props: ["currentMed"],
  data() {
    return {
      transfering: false,
      transfer: {},
      newMed: ""
    }
  },
  beforeMount() {
    // Gets if this patient's transfer information.
    axios.get("http://localhost:8080/getTransferInfo?patient=" + this.$store.getters.authenticatedUsername).then(result => {
      if(result.data.success) {
        this.update(result);
      } else {
        console.log(result.data.reason);
      }
      
    });
  },
  methods: {
    accept() {
      const accepting = {patient: this.$store.getters.authenticatedUsername, transfer: this.transfer};
      // Send request to accept transfer.
      axios.post("http://localhost:8080/acceptTransfer", accepting).then(result => {
        if(result.data.success) {
          console.log("Successful accept.");
          this.update(result);
          this.$emit("close");
        } else {
          console.log("Error " + result.data.message);
        }
      });
    },
    deny() {
      // Send request to remove transfer.
      axios.post("http://localhost:8080/removeTransfer", {patient: this.$store.getters.authenticatedUsername}).then(result => {
        if(result.data.success) {
          console.log("Successful deny.");
          this.update(result);
          this.$emit("close");
        } else {
          console.log("Error " + result.data.message);
        }
      })
      this.$emit("close");
    },
    update(result) {
      this.transfer = result.data.transfer;
      this.transfering = this.transfer.inProgress;
      this.newMed = this.transfer.newMp;
      console.log(this.transfer);
    }
  }

}
</script>
<style>

</style>