import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    
    // The user's selected security questions during registration
    questionSelected1:0,
    questionSelected2:0,
    questionSelected3:0,

    // Boolean value for controlling if the modals will display 
    showRegistration: false,
    showLogin: false,
    resetRegistrationForm: false,
    showReset: false,
    showQuestions: false,
    showPassword: false,
    ssoRegistration: false,

    // URLS
    checkBreachURL: 'http://localhost:8080/isBreached',
    breachURL: 'http://localhost:8080/breach',
    loginURL: 'http://localhost:8080/login',
    registerPatientURL: 'http://localhost:8080/registerPatient',
    registerMedicalProURL: 'http://localhost:8080/registerMed',
    resetCredURL: 'http://localhost:8080/reset-creds',
    getSecurityQURL:'http://localhost:4100/account/api/security-questions?username=',
    validateAnswerURL: 'http://localhost:4100/account/api/validate-answers',
    validateUsernameURL: 'http://localhost:8080/validate-username',
    ssoRegisterPatientURL: 'http://localhost:8080/ssoRegisterPatient',
    ssoRegisterMedicalURL: 'http://localhost:8080/ssoRegisterMed',
    returnCodeURL : 'http://localhost:8080/returnCode?username=',
    patientBreakdownURL: 'http://localhost:8080/getDiagnoses?medicalcode=',
    getTreatmentmeterURL: 'http://localhost:8080/getTreatmentmeter',
    getSingleTreatmentmeterURL: 'http://localhost:8080/getSingleTreatmentmeter',
    getTreatmentchecklistURL: 'http://localhost:8080/getTreatmentchecklist',
    getSingleTreatmentchecklistURL: 'http://localhost:8080/getSingleTreatmentchecklist',
    getPatientUserNamesURL: 'http://localhost:8080/getPatientUserNames',
    validUsername: '',
    username: '',
    validPassword: '',
    authenticatedUsername: '',
    medicalCode: '',
    authStatus: ''
  },
  getters: {
    checkBreachURL: (state) => {
      return state.checkBreachURL;
    },
    breachURL: (state) => {
      return state.breachURL;
    },
    loginURL: (state) => {
      return state.loginURL
    },
    registerPatientURL: (state) => {
      return state.registerPatientURL;
    },
    registerMedicalProURL:(state) => {
      return state.registerMedicalProURL;
    },
    resetCredURL: (state) => {
      return state.resetCredURL;
    },
    getSecurityQURL: (state) => {
      return state.getSecurityQURL;
    },
    validateAnswerURL: (state) => {
      return state.validateAnswerURL;
    }, 
    validateUsernameURL:  (state) => {
      return state.validateUsernameURL;
    },
    ssoRegisterPatientURL:  (state) => {
      return  state.ssoRegisterPatientURL;
    },
    ssoRegisterMedicalURL:  (state) => {
      return state.ssoRegisterMedicalURL;
    },
    returnCodeURL: (state) => {
      return state.returnCodeURL;
    },
    patientBreakdownURL: (state) => {
      return state.patientBreakdownURL;
    },
    getTreatmentmeterURL: (state) => {
      return state.getTreatmentmeterURL;
    },
    getSingleTreatmentmeterURL:(state) =>{
      return state.getSingleTreatmentmeterURL;
    },
    getTreatmentchecklistURL: (state) => {
      return state.getTreatmentchecklistURL;
    },
    getSingleTreatmentchecklistURL:(state) => {
      return state.getSingleTreatmentchecklistURL;
    },
    getPatientUserNamesURL:(state) => {
      return state.getPatientUserNamesURL;
    },
    showLogin: (state) => {
      return state.showLogin;
    },
    authenticatedUsername: (state) => {
      return state.authenticatedUsername;
    },
    medicalCode: (state) => {
      return state.medicalCode;
    },
    authStatus: (state) => {
      return state.authStatus;
    }
  }, 
  mutations: {
    // function to flip the value of showLogin 
    alternateLogin: (state) => {
       state.showLogin = !state.showLogin;
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
    saveUsername: (state, name) => {
      state.username = name;
    },
    alternateSSORegistration: (state) =>{
      state.ssoRegistration = !state.ssoRegistration;
    },
    authenticatedUsername: (state, payload) =>  {
      state.authenticatedUsername = payload;
    },
    medicalCode: (state, payload) => {
      state.medicalCode = payload;
    },
    authStatus: (state,payload) => {
      state.authStatus = payload;
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
    alternateReset: (context) => {
      context.commit('alternateReset');
    },
    alternateQuestions: (context) => {
      context.commit('alternateQuestions');
    },
    alternatePassword: (context) => {
      context.commit('alternatePassword');
    },
    saveUsername:(context,payload) =>{
      context.commit('saveUsername',payload);
    },
    alternateSSORegistration:(context) =>{
      context.commit('alternateSSORegistration');
    },
    authenticatedUsername: (context, payload) => {
      context.commit('authenticatedUsername', payload);
    },
    deauthenticatedUsername: (context, payload) => {
      context.commit('authenticatedUsername', payload);
    },
    medicalCode: (context, payload) => {
      context.commit('medicalCode', payload);
    },
    signIn: (context, payload) => {
      context.commit('authStatus', payload)
    },
    signOut: (context,payload) => {
      context.commit('authStatus', payload);
    }
  }
});