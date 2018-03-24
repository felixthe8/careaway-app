<template>
  <div class = "autocomplete">
      <input 
        type = "text" 
        v-model="search" 
        @input="onChange" 
        @keyup.down = "onArrowDown"
        @keyup.up = "onArrowUp"
        @keyup.enter = "onEnter"/>
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
              arrowCounter: -1
          }
      },
      methods: {
          onChange() {
              this.isOpen = true;
              this.filterResults();
          },
          filterResults() {
            this.results = this.conditionList.filter(condition => condition.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
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
          onEnter() {
             this.search = this.results[this.arrowCounter];
             this.isOpen = false;
             this.arrowCounter = -1;
          },
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
  .autocomplete {
      position: relative;
      width: 130px;
  }
  .condition-results {
      padding: 0;
      margin: 0;
      border: 1px solid #EEEEEE;
      height: 120px;
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
