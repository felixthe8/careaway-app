import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {

    /* State Variables */

    // The user's selected security questions during registration
    questionSelected1:0,
    questionSelected2:0,
    questionSelected3:0,

    // Calendar State
    calendarState: false,

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

    /* End State Variables */

    /* URL Variables */

    // Breach URLs
    checkBreachURL: 'http://localhost:8080/isBreached',
    breachURL: 'http://localhost:8080/breach',

    // Login URLs
    loginURL: 'http://localhost:8080/login',
    LoginInfoURL: 'http://localhost:8080/getLoginInfo?token=',
    logoutURL: 'http://localhost:8080/logout',

    // Registration URLs
    registerURL: 'http://localhost:8080/register',
    resetCredURL: 'http://localhost:8080/reset-creds',
    getSecurityQURL:'http://localhost:8080/security-questions?username=',
    validateAnswerURL: 'http://localhost:8080/validate-answers',
    validateUsernameURL: 'http://localhost:8080/validate-username',
    ssoRegisterPatientURL: 'http://localhost:8080/ssoRegisterPatient',
    ssoRegisterMedicalURL: 'http://localhost:8080/ssoRegisterMed',
    returnCodeURL : 'http://localhost:8080/returnCode?username=',

    // User Info URLs
    userInfoURL: 'http://localhost:8080/get-user?username=',
    patientBreakdownURL: 'http://localhost:8080/getDiagnoses?medicalcode=',
    getPatientUserNamesURL: 'http://localhost:8080/getPatientUserNames',
    patientInfoURL: 'http://localhost:8080/get-patients?code=',
    getMedicalProfessional: 'http://localhost:8080/getMedicalProfessional?username=',

    // Diagnosis URLs
    getSingleDiagnosisURL: 'http://localhost:8080/getSingleDiagnosis',
    getDiagnosisListURL: 'http://localhost:8080/getDiagnosisList',
    saveDiagnosisURL : 'http://localhost:8080/getDiagnosisList',

    // Appointment URLs
    appointmentURL: 'http://localhost:8080/getAppt?username=',
    patientApptURL: 'http://localhost:8080/patient-appointment-info?username=',
    createAppointmentURL: 'http://localhost:8080/createAppointment',
    modifyAppointmentURL: 'http://localhost:8080/updateAppointment',
    deleteAppt: 'http://localhost:8080/deleteAppt',

    // Treatment URLs
    getTreatment: 'http://localhost:8080/getTreatment?username=',
    getPatientTreatmentURL: 'http://localhost:8080/getPatientTreatment?username=',
    updatePatientTreatmentURL: 'http://localhost:8080/updatePatientTreatment',
    deleteTreatment: 'http://localhost:8080/deleteTreatment?username=',

    // Treatment Meter URLs
    createMeterURL: 'http://localhost:8080/createTreatmentMeter?username=',
    updateTreatmentMeterURL: 'http://localhost:8080/updateTreatmentMeter?username=',
    getTreatmentMeterURL: 'http://localhost:8080/getTreatmentMeter',
    getSingleTreatmentMeterURL: 'http://localhost:8080/getSingleTreatmentMeter',

    // Treatment Checklist URLs
    createChecklistURL: 'http://localhost:8080/createTreatmentChecklist?username=',
    updateTreatmentChecklistURL: 'http://localhost:8080/updateTreatmentChecklist?username=',
    getTreatmentChecklistURL: 'http://localhost:8080/getTreatmentChecklist',
    getSingleTreatmentChecklistURL: 'http://localhost:8080/getSingleTreatmentChecklist',

    // Mail URLs
    createMailURL: 'http://localhost:8080/createMail?username=',
    getMailURL: 'http://localhost:8080/getMail?username=',
    deleteMailURL: 'http://localhost:8080/deleteMail?username=',

    /* End URL Variables */

    /* Data Tracking Variables */

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
    meters: [],
    currentMeter: {
        "label": "",
        "scale": ["",""],
        "due_date": "",
        "user": ""
    },
    checklists: [],
    currentChecklist: {},
    currentAppointment: {},
    editableAppointment: ""

    /* End Data Tracking Variables */

  },

  getters: {
    calendarState: (state) => {
      return state.calendarState;
    },
    checkBreachURL: (state) => {
      return state.checkBreachURL;
    },
    breachURL: (state) => {
      return state.breachURL;
    },
    loginURL: (state) => {
      return state.loginURL;
    },
    registerURL: (state) => {
      return state.registerURL;
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
    getMedicalProfessional: (state) => {
      return state.getMedicalProfessional;
    },
    patientBreakdownURL: (state) => {
      return state.patientBreakdownURL;
    },
    getTreatmentMeterURL: (state) => {
      return state.getTreatmentMeterURL;
    },
    updateTreatmentMeterURL: (state) => {
      return state.updateTreatmentMeterURL;
    },
    getSingleTreatmentMeterURL:(state) =>{
      return state.getSingleTreatmentMeterURL;
    },
    getTreatmentChecklistURL: (state) => {
      return state.getTreatmentChecklistURL;
    },
    updateTreatmentChecklistURL: (state) => {
      return state.updateTreatmentChecklistURL;
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
    deleteTreatment: (state) => {
      return state.deleteTreatment;
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
    currentMeter: (state) => {
      return state.currentMeter;
    },
    checklists: (state) => {
      return state.checklists;
    },
    currentChecklist: (state) => {
      return state.currentChecklist;
    },
    singlePatientCompletion:(state) => {
      return state.singlePatientCompletion;
    },
    singlePatientWellness:(state) => {
      return state.singlePatientWellness;
    },
    getCurrentPatient:(state) => {
      return state.currentPatient;
    },
    createMailURL:(state) => {
      return state.createMailURL;
    },
    getMailURL:(state) => {
      return state.getMailURL;
    },
    deleteMailURL:(state) => {
      return state.deleteMailURL;
    }
  },
  mutations: {
    calendarState: (state) => {
      state.calendarState = !state.calendarState;
    },
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
    currentMeter: (state, payload) => {
      state.currentMeter = payload;
    },
    currentChecklist: (state, payload) => {
      state.currentChecklist = payload;
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
        if(state.meters[i].due_date !== payload.due_date) {
          temp.push(state.meters[i]);
        }
      }
      state.meters = temp;
    },
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
        if(state.checklists[i].due_date !== payload.due_date) {
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
    calendarState: (context) => {
      context.commit('calendarState');
    },
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
    toggleMeter: (context, payload) => {
      context.commit("toggleMeter", payload);
    },
    toggleChecklist: (context, payload) => {
      context.commit("toggleChecklist", payload);
    },
    addMeter: (context, payload) => {
      context.commit('addMeter', payload);
    },
    deleteMeter: (context, payload) => {
      context.commit('deleteMeter', payload);
    },
    currentMeter: (context, payload) => {
      context.commit('currentMeter', payload);
    },
    addChecklist: (context, payload) =>  {
      context.commit('addChecklist', payload);
    },
    deleteChecklist: (context, payload) => {
      context.commit('deleteChecklist', payload);
    },
    currentChecklist: (context, payload) =>  {
      context.commit('currentChecklist', payload);
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
