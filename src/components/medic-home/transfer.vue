<template>
  <div class="transfer">
    <p class="error" v-if="error.status">{{error.msg}}</p>
    <h5>Which Medical Professional would you like to transfer Patient Name to?</h5>
    <input v-model="mpCode" placeholder="MP Code" type="text">
    </input>
    <button class="button is-primary" @click="submit">Submit </button>
    <button class="button is-primary" @click="cancel">Cancel</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ["patient", "username"],
  data() {
    return {
      mpCode: '',
      error: {
        status: false,
        msg: ''
      }
    }
  },
  methods: {
    submit() {
      // Remove errors.
      this.error.status = false;
      if(this.check()) {
        const transfer = {
          inProgress: true,
          mpCode: this.mpCode
        }
        // axios request
        axios.post(this.$store.getters.makeTransferURL, {transfer : transfer, patient: this.username})
        .then(result => {
          if(result.data.success) {
            console.log("Successful transfer.");
            // Update this patient's transfer.
            this.$store.dispatch('updatePatientTransfer', result.data.transfer);
            // If successful transfer creation.
            this.$emit("close");
          } else {
            // Not successful.
            this.error.status = true;
            this.error.msg = result.data.message;
          }
        })
      }
    },
    check() {
      // Check to see if this medical professional's code doesn't match the one inputted.
      if(this.$store.getters.medicalCode === this.mpCode.toUpperCase()) {
        // The codes match, the medical professional cannot assign themselves to their own patient.
        this.error.status = true;
        this.error.msg = "Error, this is your own Medical Professional Code, please enter a different Medical Professional's Code."
        return false;
      }
      return true;
    },
    cancel() {
      this.$emit("close");
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/sass/settings.scss";

.error {
  color: red;
}
.transfer {
  padding: 5%;
}
.button {
  color: $white;
  background-color: $green;
  margin: 1% 0;

  &:hover {
    background-color: $green-dark;
  }
}
</style>
