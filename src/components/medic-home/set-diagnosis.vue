<template>
  <div class = "diagnosis-input">
    <div class = "search">  
        <input 
            type = "text"
            class = "input is-rounded"
            v-model="search" 
            @input="onChange" 
            @keyup.down = "onArrowDown"
            @keyup.up = "onArrowUp"
            @keyup.enter = "onEnter"
            placeholder="Set Diagnosis"
            :class = "[ {'is-danger': inputError}, {'is-success':inputSuccess} ]" />
            <span @click = "saveDiagnosis"><i class="fas fa-arrow-circle-right fa-2x"></i> </span>
    </div>
      <ul class = "condition-results" v-show="isOpen">
          <li class = "condition"
            :class = "{ 'is-selected': i === arrowCounter }" 
            v-for= "(result,i) in results" 
            :key="i" 
            @click = "setResult(result)"> 
              {{result}} 
          </li>
      </ul>
  </div>
</template>


<script>
import axios from'axios';
  export default {
      name: 'setDiagnosis',
      data() {
          return {
            search: '',
            conditionList: [],
            results: [],
            isOpen: false,
            arrowCounter: -1,
            inputError: false,
            inputSuccess: false
          }
      },
      methods: {
          onChange() {
            // When the user types into the input box, toggle to show the matching fields
            this.isOpen = true;
            // Call to filter the matching fields
            this.filterResults();
          },
          filterResults() {
            // Based on the input value provided by the user, return an array that returns all elements in the array that contain the user input
            this.results = this.conditionList.filter(condition => condition.toLowerCase().indexOf(this.search.toLowerCase()) > -1).sort();
          },
          setResult(result) {
            // When the user clicks on a field in the list, store it 
            this.search = result;
            // Close the matching fields
            this.isOpen = false;
          },
          onArrowDown() {
              // User can keep going down the potential matching fields till they hit the end
              if(this.arrowCounter < this.results.length - 1) {
                  this.arrowCounter = this.arrowCounter + 1;
              }  else {
                   // Reset to the beginning when you hit the end of the list
                   this.arrowCounter = 0;
               }
          },
          onArrowUp() {
              // User can keep going up the potential matching fields till they hit the top
              if(this.arrowCounter > 0) {
                  this.arrowCounter = this.arrowCounter - 1;
               }  else {
                    // Reset to the end when you hit the top of the list
                   this.arrowCounter = this.results.length - 1;
               }
          },
          // Function to handle when the user is going through the list using the arrows and they press Enter.
          onEnter() {
             // Store the value at the index of the matching fields array  
             this.search = this.results[this.arrowCounter];
             // Close the list
             this.isOpen = false;
             this.arrowCounter = -1;
          },
          // Check if the user clicks outside the Set Diagnosis view. If they do, close it. 
          handleClickOutside(evt) {
              if(!this.$el.contains(evt.target)) {
                  // Close the matching fields list
                  this.isOpen = false;
                  this.arrowCounter = -1;
              }
          }, 
          // Function that returns the diganoses from the data store
          getDiagnoses() {
            var self = this;  
            axios.get(this.$store.getters.getDiagnosisListURL)
            .then(response => {
              // Store the returned diagnosis list  
              self.conditionList = response.data.conditions;
            })
            .catch(err => {
              console.log(err);
            })
          },
          saveDiagnosis() {
            // Check if the user input isn't a valid diagnosis
            if(!this.conditionList.includes(this.search)) {
                // Toggle the is-danger class to make the input box red
                this.inputError = true;
                this.alertError();
            } else {
                // Otherwise, the diagnosis is valid. Toggle the is-danger class to make the box green
                this.inputSuccess = true;
                this.alertSuccess();
                var self = this;
                // PUT request to store the updated patient diagnosis
                axios.put(this.$store.getters.saveDiagnosisURL, {
                  username: self.$store.getters.getCurrentPatient.userName,
                  updatedDiagnosis: self.search
                })
                .then(function(response){
                  // After response is fulfilled, overwrite the information about the current user  
                  var currentPatient = self.$store.getters.getCurrentPatient
                  // Overwrite the current user's diagnosis
                  currentPatient.diagnosis = self.search
                  // Store the updated current user
                  self.$store.dispatch('setCurrentPatient', currentPatient);
                })
                .catch (function(err){
                    console.log(err);
                })
                
            }
          },
          alertError() {
              // Toggle the is-danger class to make the input box red
            this.inputError = true;
            // Input box will remain red for a period of time, then revert back to normal color
            var time = setTimeout(() => {
                clearTimeout(time);
                this.inputError = false;
            }, 1800)
          },
          alertSuccess() {
            // Input box will remain green for a period of time, then revert back to normal color
            var time = setTimeout(() => {
                clearTimeout(time);
                this.inputSuccess = false;
                // Clear out the search value
                this.search = '';
            }, 1800)
          }
      },
      created() {
          this.getDiagnoses();
          document.addEventListener('click', this.handleClickOutside);
      },
      beforeDestroy() {
          document.removeEventListener('click', this.handleClickOutside);
      }
  }

</script>

<style lang = "scss" scoped>
  .diagnosis-input {
      position: relative;
      width: 95%;
      margin-left: 2%;
  }
  .search {
      display: inline-flex;
  }
 .fa-arrow-circle-right{
    margin-left: 5%;
    transform: translateY(25%);
    color: #92CC92;
}
.fa-arrow-circle-right:hover {
    cursor: pointer;
}
  .condition-results {
      padding: 0;
      margin: 0;
      border: 1px solid #EEEEEE;
      overflow: auto;
      position: absolute;
      width: 100%;
      z-index: 1;
  }
  .condition{
      list-style: none;
      text-align: left;
      padding: 4px 2px;
      cursor: pointer;
  }
  .condition:hover, .condition.is-selected {
     background-color: #4AAE9B;
     color: white;
  }
</style>
