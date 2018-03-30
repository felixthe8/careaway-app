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
    showMeter: false,
    showChecklist: false,

    // Appointment boolean values.
    showAppointmentCreation: false,
    showAppointmentMod: false,
    editableAppointment: "",

    // URLS
    checkBreachURL: 'http://localhost:8080/isBreached',
    breachURL: 'http://localhost:8080/breach',
    loginURL: 'http://localhost:8080/login',
    registerPatientURL: 'http://localhost:8080/registerPatient',
    registerMedicalProURL: 'http://localhost:8080/registerMed',
    resetCredURL: 'http://localhost:8080/reset-creds',
    getSecurityQURL:'http://localhost:8080/security-questions?username=',
    validateAnswerURL: 'http://localhost:8080/validate-answers',
    validateUsernameURL: 'http://localhost:8080/validate-username',
    ssoRegisterPatientURL: 'http://localhost:8080/ssoRegisterPatient',
    ssoRegisterMedicalURL: 'http://localhost:8080/ssoRegisterMed',
    LoginInfoURL: 'http://localhost:8080/getLoginInfo?token=',
    returnCodeURL : 'http://localhost:8080/returnCode?username=',
    patientBreakdownURL: 'http://localhost:8080/getDiagnoses?medicalcode=',
    getSingleDiagnosisURL: 'http://localhost:8080/getSingleDiagnosis',
    getTreatmentchecklistURL: 'http://localhost:8080/getTreatmentchecklist',
    getSingleTreatmentchecklistURL: 'http://localhost:8080/getSingleTreatmentchecklist',
    getPatientUserNamesURL: 'http://localhost:8080/getPatientUserNames',
    getPatientTreatmentURL: 'http://localhost:8080/getPatientTreatment?username=',
    updatePatientTreatmentURL: 'http://localhost:8080/updatePatientTreatment',
    getDiagnosisListURL: 'http://localhost:8080/getDiagnosisList',
    saveDiagnosisURL : 'http://localhost:8080/getDiagnosisList',

    patientInfoURL: 'http://localhost:8080/get-patients?code=',
    userInfoURL: 'http://localhost:8080/get-user?username=',
    logoutURL: 'http://localhost:8080/logout',

    // Appointment URLs
    appointmentURL: 'http://localhost:8080/getAppt?username=',
    patientApptURL: 'http://localhost:8080/patient-appointment-info?username=',
    createAppointmentURL: 'http://localhost:8080/createAppointment',
    modifyAppointmentURL: 'http://localhost:8080/updateAppointment',
    deleteAppt: 'http://localhost:8080/deleteAppt',

    // Widget URLs
    createMeterURL: 'http://localhost:8080/createTreatmentMeter?username=',
    createChecklistURL: 'http://localhost:8080/createTreatmentChecklist?username=',
    deleteTreatment: 'http://localhost:8080/deleteTreatment?username=',
    getTreatment: 'http://localhost:8080/getTreatment?username=',

    getTreatmentMeterURL: 'http://localhost:8080/getTreatmentMeter',
    getSingleTreatmentMeterURL: 'http://localhost:8080/getSingleTreatmentMeter',
    getTreatmentChecklistURL: 'http://localhost:8080/getTreatmentChecklist',
    getSingleTreatmentChecklistURL: 'http://localhost:8080/getSingleTreatmentChecklist',

    // Login Data
    validUsername: '',
    username: '',
    validPassword: '',
    authenticatedUsername: '',
    medicalCode: '',
    authStatus: '',
    singlePatientCompletion: [],
    singlePatientWellness: [],

    // Treatment Plan Data
    currentPatient: {},
    appointments: [],
    currentAppointment: {},
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
    logoutURL: (state) => {
      return state.logoutURL;
    },
    returnCodeURL: (state) => {
      return state.returnCodeURL;
    },
    patientBreakdownURL: (state) => {
      return state.patientBreakdownURL;
    },
    getTreatmentMeterURL: (state) => {
      return state.getTreatmentMeterURL;
    },
    getSingleTreatmentMeterURL:(state) =>{
      return state.getSingleTreatmentMeterURL;
    },
    getTreatmentChecklistURL: (state) => {
      return state.getTreatmentChecklistURL;
    },
    getSingleTreatmentChecklistURL:(state) =>{
      return state.getSingleTreatmentChecklistURL;
    },
    getPatientTreatmentURL: (state) => {
      return state.getPatientTreatmentURL;
    },
    updatePatientTreatmentURL: (state) => {
      return state.updatePatientTreatmentURL;
    },
    getDiagnosisListURL: (state) => {
      return state.getDiagnosisListURL;
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
    getSingleTreatmentchecklistURL:(state) => {
      return state.getSingleTreatmentchecklistURL;
    },
    getPatientUserNamesURL:(state) => {
      return state.getPatientUserNamesURL;
    },
    getSingleDiagnosisURL:(state) =>{
      return state.getSingleDiagnosisURL;
    },
    getLoginInfoURL: (state) => {
      return state.LoginInfoURL;
    },
    showLogin: (state) => {
      return state.showLogin;
    },
    showRegistration: (state) => {
      return state.showRegistration;
    },
    showReset: (state) => {
      return state.showReset
    },
    showQuestions: (state) => {
      return state.showQuestions;
    },
    showPassword: (state) => {
      return state.showPassword;
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
    showMeter: (state) => {
      return state.showMeter;
    },
    showChecklist: (state) => {
      return state.showChecklist;
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
    getEditableAppointment: (state) => {
      return state.editableAppointment;
    },
    createMeterURL: (state) => {
      return state.createMeterURL;
    },
    createChecklistURL: (state) => {
      return state.createChecklistURL;
    },
    deleteTreatmentURL: (state) => {
      return state.deleteTreatmentURL;
    },
    getTreatment: (state) => {
      return state.getTreatment;
    },
    modifyAppointmentURL: (state) => {
      return state.modifyAppointmentURL;
    },
    currentAppointment: (state) => {
      return state.currentAppointment;
    },
    saveDiagnosisURL : (state) => {
      return state.saveDiagnosisURL;
    },
    appointments: (state) => {
      return state.appointments;
    },
    meters: (state) => {
      return state.meters;
    },
    checklists: (state) => {
      return state.checklists;
    },
    singlePatientCompletion:(state) => {
      return state.singlePatientCompletion;
    },
    singlePatientWellness:(state) => {
      return state.singlePatientWellness;
    },
    getCurrentPatient:(state) => {
      return state.currentPatient;
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
    toggleMeter: (state) => {
      state.showMeter = !state.showMeter;
    },
    toggleChecklist: (state) => {
      state.showChecklist = !state.showChecklist;
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
      function findOldAppointment(element){
        return element.date === payload.originalAppointment.date && element.startTime === payload.originalAppointment.startTime;
      }
      var index = state.appointments.findIndex(findOldAppointment);
      state.appointments[index] = payload.newAppointment;
    },
    deleteAppointment: (state, payload) => {
      var temp = [];
      for(var i=0; i<state.appointments.length; i++) {
        if(state.appointments[i].date !== payload.date && state.appointments[i].startTime !== payload.startTime){
          temp.push(state.appointments[i]);
        }
      }
      state.appointments = temp;
    },
    // Widget Operations
    addMeter: (state, payload) => {
      state.meters.push(payload);
    },
    editMeter: (state, payload) => {
      function findOldMeter(element){
        return element.date === payload.originalMeter.date;
      }
      var index = state.meters.findIndex(findOldMeter);
      state.meters[index] = payload.newMeter;
    },
    deleteMeter: (state, payload) => {
      var temp = [];
      for(var i=0; i < state.meters.length; i++) {
        if(state.meters[i].date !== payload.date) {
          temp.push(state.meters[i]);
        }
      }
      state.meters = temp;
    },
    //
    addChecklist: (state, payload) => {
      state.checklists.push(payload);
    },
    editChecklist: (state, payload) => {
      function findOldChecklist(element){
        return element.date === payload.originalChecklist.date;
      }
      var index = state.checklists.findIndex(findOldChecklist);
      state.checklists[index] = payload.newChecklist;
    },
    deleteChecklist: (state, payload) => {
      var temp = [];
      for(var i=0; i < state.checklists.length; i++) {
        if(state.checklists[i].date !== payload.date) {
          temp.push(state.checklists[i]);
        }
      }
      state.checklists = temp;
    },
    // end widgets
    singlePatientWellness:(state,payload) =>{
      state.singlePatientWellness = payload;
    },
    singlePatientCompletion:(state,payload)=>{
      state.singlePatientCompletion = payload;
    },
    editableAppointment: (state, payload) => {
      state.editableAppointment = payload;
    },
    setCurrentPatient: (state, payload) => {
      state.currentPatient = payload;
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
    },
    singlePatientWellness:(context,payload) => {
      context.commit('singlePatientWellness',payload);
    },
    singlePatientCompletion:(context,payload) => {
      context.commit('singlePatientCompletion',payload);
    },
    editableAppointment: (context, payload) => {
      context.commit('editableAppointment', payload);
    },
    setCurrentPatient: (context, payload) => {
      context.commit('setCurrentPatient', payload);
    }
  }
});
