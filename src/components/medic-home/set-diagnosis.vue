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
            placeholder="Set Patient Diagnosis"
            :class = "[ {'is-danger': inputError}, {'is-success':inputSuccess} ]" />
            <span @click = "saveDiagnosis"><i class="fas fa-angle-right fa-2x"></i> </span>
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
              this.isOpen = true;
              this.filterResults();
          },
          filterResults() {
            this.results = this.conditionList.filter(condition => condition.toLowerCase().indexOf(this.search.toLowerCase()) > -1).sort();
          },
          setResult(result) {
              this.search = result;
              this.isOpen = false;
          },
          onArrowDown() {
              if(this.arrowCounter < this.results.length - 1) {
                  this.arrowCounter = this.arrowCounter + 1;
              }  else {
                   // Reset to the beginning when you hit the end of the list
                   this.arrowCounter = 0;
               }
          },
          onArrowUp() {
              if(this.arrowCounter > 0) {
                  this.arrowCounter = this.arrowCounter - 1;
               }  else {
                    // Reset to the end when you hit the top
                   this.arrowCounter = this.results.length - 1;
               }
          },
          // Function to handle when the user is going through the list using the arrows.
          onEnter() {
             this.search = this.results[this.arrowCounter];
             // Close the list
             this.isOpen = false;
             this.arrowCounter = -1;
          },
          // Check if the user clicks outside the Set Diagnosis view. If they do, close it. 
          handleClickOutside(evt) {
              if(!this.$el.contains(evt.target)) {
                  this.isOpen = false;
                  this.arrowCounter = -1;
              }
          }, 
          getDiagnoses() {
            var self = this;  
            axios.get(this.$store.getters.getDiagnosisListURL)
            .then(response => {
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
                // Input box will remain red for a period of time, then revert back to normal color
                var time = setTimeout(() => {
                    clearTimeout(time);
                    this.inputError = false;
                }, 1800)
            } else {
                // Otherwise, the diagnosis is valid. Toggle the is-danger class to make the box green
                this.inputSuccess = true;
                // Input box will remain red for a period of time, then revert back to normal color
                var time = setTimeout(() => {
                    clearTimeout(time);
                    this.inputSuccess = false;
                    // Clear out the search value
                    this.search = '';
                }, 1800)

            }
          }
      },
      created() {
          this.getDiagnoses();
          document.addEventListener('click', this.handleClickOutside);
      },
      destroyed() {
          document.removeEventListener('click', this.handleClickOutside);
      }

  }

</script>

<style lang = "scss" scoped>
  .diagnosis-input {
      position: relative;
      width: 90%;
      margin-left: 2%;
  }
  .search {
      display: inline-flex;
  }
 .fa-angle-right{
    margin-left: 5%;
    transform: translateY(25%);
    color: #92CC92;
}
.fa-angle-right:hover {
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
