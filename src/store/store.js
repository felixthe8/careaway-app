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
    showAppointment: false,

    // Appointment boolean values.
    showAppointmentCreation: false,
    showAppointmentMod: false,

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
    getTreatmentchecklistURL: 'http://localhost:8080/getTreatmentchecklist',

    patientInfoURL: 'http://localhost:8080/get-patients?code=',
    userInfoURL: 'http://localhost:8080/get-user?username=',

    // Appointment URLs
    appointmentURL: 'http://localhost:8080/getAppt?username=',
    patientApptURL: 'http://localhost:8080/patient-appointment-info?username=',
    createAppointmentURL: 'http://localhost:8080/createAppointment',
    modifyAppointmentURL: 'http://localhost:8080/updateAppointment',
    deleteAppt: 'http://localhost:8080/deleteAppt',

    validUsername: '',
    username: '',
    validPassword: '',
    authenticatedUsername: '',
    medicalCode: '',
    authStatus: '',
    appointments: [],
    currentAppointment: {}
  },
  getters: {

    checkBreachURL: (state) => {
      return state.checkBreachURL;
    },
    breachURL: (state) => {
      return state.breachURL;
    },
    loginURL: (state) => {
      return state.loginURL;
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
    getTreatmentchecklistURL: (state) => {
      return state.getTreatmentchecklistURL;
    },
    getAppointmentURL: (state) =>  {
      return state.appointmentURL;
    },
    getPatientApptURL: (state) => {
      return state.patientApptURL;
    },
    getPatientInfoURL: (state) => {
      return state.patientInfoURL;
    },
    getUserURL: (state) => {
      return state.userInfoURL;
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
    },
    showAppointment: (state) => {
      return state.showAppointment;
    },
    deleteAppt: (state) => {
      return state.deleteAppt;
    },
    showAppointmentCreation: (state) => {
      return state.showAppointmentCreation;
    },
    showAppointmentMod: (state) => {
      return state.showAppointmentMod;
    },
    createAppointmentURL: (state) => {
      return state.createAppointmentURL;
    },
    modifyAppointmentURL: (state) => {
      return state.modifyAppointmentURL;
    },
    currentAppointment: (state) => {
      return state.currentAppointment;
    },
    appointments: (state) => {
      return state.appointments;
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
    },
    alternateAppointmentCreation: (state) => {
      state.showAppointmentCreation = !state.showAppointmentCreation;
    },
    alternateAppointmentModification: (state) => {
      state.showAppointment = false;
      state.showAppointmentMod = true;
    },
    alternateAppointmentMod: (state) => {
      state.showAppointmentMod = !state.showAppointmentMod;
    },
    alternateAppointment: (state) => {
      state.showAppointment = !state.showAppointment;
    },
    storeAppointment: (state, payload) => {
      state.currentAppointment = payload;
    },
    addAppointment: (state, payload) => {
      state.appointments.push(payload);
    },
    editAppointment: (state, payload) => {
      var index = state.appointments.indexOf(payload.oldAppt);
      state.appointments[index] = payload.newAppt;
    },
    deleteAppointment: (state, payload) => {
      var temp = [];
      console.log(temp);
      console.log("THIS IS THE PAYLOAD");
      console.log(payload);
      console.log(state.appointments[0] === payload);
      for(var i=0; i<state.appointments.length; i++) {
        if(state.appointments[i] !== payload){
          temp.push(state.appointments[i]);
        }
      };
      console.log("THIS IS THE TEMP");
      console.log(temp);
      state.appointments = temp;
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
    },
    alternateAppointment: (context) => {
      context.commit("alternateAppointment");
    },
    alternateAppointmentCreation: (context) => {
      context.commit("alternateAppointmentCreation");
    },
    alternateAppointmentModification: (context) => {
      context.commit("alternateAppointmentModification");
    },
    alternateAppointmentMod: (context) => {
      context.commit("alternateAppointmentMod");
    },
    storeAppointment: (context, payload) => {
      context.commit('storeAppointment', payload);
    },
    addAppointment: (context, payload) => {
      context.commit('addAppointment', payload);
    },
    editAppointment: (context, payload) => {
      context.commit('editAppointment', payload);
    },
    deleteAppointment: (context, payload) => {
      context.commit('deleteAppointment', payload);
    }
  }
});
