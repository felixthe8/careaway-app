import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // boolean value for controlling if the login modal will display 
    showRegistration: false,
    showLogin: false,
    resetRegistrationForm: false,
    questionSelected1:0,
    questionSelected2:0,
    questionSelected3:0,
    validUsername: '',
    showReset: false,
    showQuestions: false,
    showPassword: false,
    showAdmin: false,
    username: '',
    validPassword: '',
    authenticatedUsername: '',
    isAuthenticatedMP: false,
    isAuthenticatedPatient: false,
    isAuthenticatedAdmin: false,
    ssoRegistration: false
  },
  getters: {
    showLogin: (state) => {
      return state.showLogin;
    },
    authenticationStatusMP: (state)  => {
      return state.isAuthenticatedMP;
    },
    authenticationStatusPatient: (state)  => {
      return state.isAuthenticatedPatient;
    },
    authenticationStatusAdmin: (state)  => {
      return state.isAuthenticatedAdmin;
    },
    authenticatedUsername: (state) => {
      return state.authenticatedUsername;
    }
  }, 
  mutations: {
    // function to flip the value of showLogin 
    alternateLogin: (state) => {
       state.showLogin = !state.showLogin;
    },
    updateAuthStatusMP: (state, payload) => {
      state.isAuthenticatedMP = payload.authStatus;
    },
    updateAuthStatusPatient: (state, payload) => {
      state.isAuthenticatedPatient = payload.authStatus;
    },
    updateAuthStatusAdmin: (state, payload) => {
      state.isAuthenticatedAdmin = payload.authStatus;
    },
    alternateRegistration: (state) =>{
      state.showRegistration = !state.showRegistration;
    },
    resetRegForm:(state) =>{
      state.resetRegistrationForm = !state.resetRegistrationForm;
    },
    changeQuestionValue1: (state, value) => {
      state.questionSelected1=value;
    },
    changeQuestionValue2: (state, value) => {
      state.questionSelected2=value;
    },
    changeQuestionValue3: (state, value) => {
      state.questionSelected3=value;
    }, 
    alternateReset: (state) => {
      state.showReset = !state.showReset;
    },
    alternateQuestions: (state) => {
      state.showQuestions = !state.showQuestions;
    },
    alternatePassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    alternateAdmin: (state) => {
      state.showAdmin = !state.showAdmin;
    },
    saveUsername: (state, name) => {
      state.username = name;
    },
    alternateSSORegistration: (state) =>{
      state.ssoRegistration = !state.ssoRegistration;
    },
    authenticatedUsername: (state, payload) =>  {
      state.authenticatedUsername = payload;
    }
  },

  actions: {
    // action that will call the AlternateLogin mutation
    alternateLogin: (context) => {
      context.commit('alternateLogin');
    },
    alternateRegistration: (context) =>{
      context.commit('alternateRegistration');
    },
    signInMP: (context , payload) => {
      context.commit('updateAuthStatusMP', {authStatus: true});
    },
    signOutMP: (context) => {
      context.commit('updateAuthStatusMP', {authStatus: false});
    },
    signInPatient: (context , payload) => {
      context.commit('updateAuthStatusPatient', {authStatus: true});
    },
    signOutPatient: (context) => {
      context.commit('updateAuthStatusPatient', {authStatus: false});
    },
    signInAdmin: (context , payload) => {
      context.commit('updateAuthStatusAdmin', {authStatus: true});
    }, 
    signOutAdmin: (context) => {
      context.commit('updateAuthStatusAdmin', {authStatus: false});
    },
    alternateReset: (context) => {
      context.commit('alternateReset');
    },
    alternateQuestions: (context) => {
      context.commit('alternateQuestions');
    },
    alternatePassword: (context) => {
      context.commit('alternatePassword');
    },
    alternateAdmin:(context) => {
      context.commit('alternateAdmin');
    },
    saveUsername:(context,payload) =>{
      context.commit('saveUsername',payload);
    },
    alternateSSORegistration:(context) =>{
      context.commit('alternateSSORegistration');
    },
    authenticatedUsername: (context, payload) => {
      context.commit('authenticatedUsername', payload);
    }
  }
});