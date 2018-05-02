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
    patientSelected: false,

    // Appointment boolean values.
    showAppointmentCreation: false,
    showAppointmentMod: false,

    /* End State Variables */

    /* URL Variables */

    // Breach URLs
    checkBreachURL: 'https://api.careaway.me/isBreached',
    breachURL: 'https://api.careaway.me/breach',

    // Login URLs
    loginURL: 'https://api.careaway.me/login',
    LoginInfoURL: 'https://api.careaway.me/getLoginInfo?token=',
    logoutURL: 'https://api.careaway.me/logout',

    // Registration URLs
    registerURL: 'https://api.careaway.me/register',
    resetCredURL: 'https://api.careaway.me/reset-creds',
    getSecurityQURL:'https://api.careaway.me/security-questions?username=',
    validateAnswerURL: 'https://api.careaway.me/validate-answers',
    validateUsernameURL: 'https://api.careaway.me/validate-username',
    ssoRegisterPatientURL: 'https://api.careaway.me/ssoRegisterPatient',
    ssoRegisterMedicalURL: 'https://api.careaway.me/ssoRegisterMed',
    returnCodeURL : 'https://api.careaway.me/returnCode?username=',

    // User Info URLs
    userInfoURL: 'https://api.careaway.me/get-user?username=',
    patientBreakdownURL: 'https://api.careaway.me/getDiagnoses?medicalcode=',
    getPatientUserNamesURL: 'https://api.careaway.me/getPatientUserNames',
    patientInfoURL: 'https://api.careaway.me/get-patients?code=',
    getMedicalProfessional: 'https://api.careaway.me/getMedicalProfessional?username=',

    // Diagnosis URLs
    getSingleDiagnosisURL: 'https://api.careaway.me/getSingleDiagnosis',
    getDiagnosisListURL: 'https://api.careaway.me/getDiagnosisList',
    saveDiagnosisURL : 'https://api.careaway.me/saveDiagnosis',
    feedbackURL : 'https://api.careaway.me/feedback',

    // Appointment URLs
    appointmentURL: 'https://api.careaway.me/getAppt?username=',
    patientApptURL: 'https://api.careaway.me/patient-appointment-info?username=',
    createAppointmentURL: 'https://api.careaway.me/createAppointment',
    modifyAppointmentURL: 'https://api.careaway.me/updateAppointment',
    deleteAppt: 'https://api.careaway.me/deleteAppt',

    // Treatment URLs
    getTreatment: 'https://api.careaway.me/getTreatment?username=',
    getPatientTreatmentURL: 'https://api.careaway.me/getPatientTreatment?username=',
    updatePatientTreatmentURL: 'https://api.careaway.me/updatePatientTreatment',
    deleteTreatment: 'https://api.careaway.me/deleteTreatment?username=',

    // Treatment Meter URLs
    createMeterURL: 'https://api.careaway.me/createTreatmentMeter?username=',
    updateTreatmentMeterURL: 'https://api.careaway.me/updateTreatmentMeter?username=',
    getTreatmentMeterURL: 'https://api.careaway.me/getTreatmentMeter',
    getSingleTreatmentMeterURL: 'https://api.careaway.me/getSingleTreatmentMeter',

    // Treatment Checklist URLs
    createChecklistURL: 'https://api.careaway.me/createTreatmentChecklist?username=',
    updateTreatmentChecklistURL: 'https://api.careaway.me/updateTreatmentChecklist?username=',
    getTreatmentChecklistURL: 'https://api.careaway.me/getTreatmentChecklist',
    getSingleTreatmentChecklistURL: 'https://api.careaway.me/getSingleTreatmentChecklist',

    // Mail URLs
    createMailURL: 'https://api.careaway.me/createMail?username=',
    getMailURL: 'https://api.careaway.me/getMail?username=',
    deleteMailURL: 'https://api.careaway.me/deleteMail?username=',

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
    editableAppointment: "",

    /* End Data Tracking Variables */

    appointments: [],

    // Transfer URLs
    makeTransferURL: 'https://api.careaway.me/mpTransfer',
    removeTransferURL: 'https://api.careaway.me/removeTransfer',

    isTutorial: false,
    mpTutorialOnly: 'NOTE: This feature is only available under the Medical Professional Account',
    patientTutorialOnly: 'NOTE: This feature is only available under the Patient Account',

    setDiagnosisTutorial:{
      modal: 'https://dl.dropboxusercontent.com/s/088vxz3pyep06dp/set-diagnosis-modal.png',
      modalAutocomplete : 'https://dl.dropboxusercontent.com/s/xfo1y1fgb3h2rh5/set-diagnosis-autocomplete.png',
      autocompleteDemo: 'https://dl.dropboxusercontent.com/s/bmm9ysxb76kroqp/autocomplete-demo.gif',
      success : 'https://dl.dropboxusercontent.com/s/amu317pvb4aq1dn/set-diagnosis-success.gif'
    },

    meterCreationTutorial: {
      widgetBox: 'https://dl.dropboxusercontent.com/s/sekkifl00u4n6ug/meter-widget.png',
      dragDemo: 'https://dl.dropboxusercontent.com/s/0yzoyplso9tr2cz/meter-drag-demo.gif',
      createDemo: 'https://dl.dropbox.com/s/ge2o85jdn3ak2ac/meter-input-demo.gif'
    },

    meterInteractionTutorial: {
      widgetBox: 'https://dl.dropboxusercontent.com/s/3611lyia0qbqj68/meter-widget-patient.png',
      widgetInteract: 'https://dl.dropboxusercontent.com/s/6bh6hrqu8xfl8z2/meter-widget-interact.gif'
    },

    checklistCreationTutorial: {
      widgetBox: 'https://dl.dropboxusercontent.com/s/vq18bzj3n4f40b2/checklist-widget.png',
      dragDemo: 'https://dl.dropboxusercontent.com/s/wy0p34ntcopdhhf/checklist-drag-demo.gif',
      createDemo: 'https://dl.dropboxusercontent.com/s/uen001a3kbmn6cz/checklist-input-demo.gif'
    },

    checklistInteractionTutorial: {
      widgetBox: 'https://dl.dropboxusercontent.com/s/i5itox2elq58e4k/checklist-widget-patient.png',
      widgetInteract: 'https://dl.dropboxusercontent.com/s/wwpwkeyblo3synh/checklist-interaction.gif'
    },

    appointmentCreation: {
      mpAppointment: 'https://dl.dropbox.com/s/wmda4opt88z97fe/MPAppointmentCreation.PNG',
      patientAppointment: 'https://dl.dropbox.com/s/ngsy6wdjxsgacsf/PatientAppointmentCreation%20.PNG',
      mpChoosePatient: "https://dl.dropbox.com/s/zcnernbe2sj0cxo/MPAppointmentChoosePatient.PNG",
      patientChooseMP: "https://dl.dropbox.com/s/lcax36tt8rsinxg/PatientAppointmentChoosePatient.PNG",
      mpAppointmentGif: "https://dl.dropbox.com/s/px3twb7usg1d7kj/MPAppointment.gif",
      patientAppointmentGif:"https://dl.dropbox.com/s/i5es9phbid9scmy/PatientAppointment.gif"
    },
    appointmentCalendar: "https://dl.dropbox.com/s/z886104nef4om5z/AppointmentUpdateCalendar.PNG",
    appointmentUpdate:{
      appointmentEditStatus: "https://dl.dropbox.com/s/mw36uyaydjp8zdx/AppointmentStatus.PNG",
      appointmentUpdate: "https://dl.dropbox.com/s/1bflxfhx60swhya/appointmentUpdate.gif"
    },
    appointmentDeletion:{
      deletion: "https://dl.dropbox.com/s/14e7w7u8iszzt3c/AppointmentStatus.PNG"
    },
    appointmentStatus:{
      requestor: "https://dl.dropbox.com/s/oiuxfm461gupiwl/AppointmentStatus.PNG",
      requestee: "https://dl.dropbox.com/s/6oyzwzfyd70al2a/RequesteeAppointmentStatus.PNG"
    },

    calendarViews:{
      month: "https://dl.dropbox.com/s/p37tcu86cnmnb91/MonthView.PNG",
      week: "https://dl.dropbox.com/s/rpsje0w69cmsz01/WeekView.PNG",
      medicalAppointmentView: "https://dl.dropbox.com/s/8f98uew6t4l8z1p/MedicalAppointmentView.PNG",
      selectPatient: "https://dl.dropbox.com/s/n48ks3ttezh2n3n/select%20patient.PNG",
      patientView: "https://dl.dropbox.com/s/74gpjfuvhz5v9rl/MedicalPatientView.PNG"
    }
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
    patientSelected: (state) => {
      return state.patientSelected;
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
    feedbackURL : (state) => {
      return state.feedbackURL;
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
    makeTransferURL: (state) => {
      return state.makeTransferURL;
    },
    removeTransferURL: (state) => {
      return state.removeTransferURL;
    },
    isTutorial: (state) => {
      return state.isTutorial;
    },
    mpTutorialOnly: (state) => {
      return state.mpTutorialOnly;
    },
    patientTutorialOnly: (state) => {
      return state.patientTutorialOnly;
    },
    setDiagnosisTutorialModal: (state) => {
      return state.setDiagnosisTutorial.modal;
    },
    setDiagnosisTutorialAutocomplete: (state) => {
      return state.setDiagnosisTutorial.modalAutocomplete;
    },
    setDiagnosisTutorialAutocompleteDemo: (state) => {
      return state.setDiagnosisTutorial.autocompleteDemo;
    },
    setDiagnosisTutorialSuccess: (state) => {
      return state.setDiagnosisTutorial.success;
    },
    meterCreationTutorialWidget: (state) => {
      return state.meterCreationTutorial.widgetBox;
    },
    meterCreationTutorialDragDemo: (state) => {
      return state.meterCreationTutorial.dragDemo;
    },
    meterCreationTutorialCreateDemo: (state) => {
      return state.meterCreationTutorial.createDemo;
    },
    meterInteractionTutorialWidget: (state) => {
      return state.meterInteractionTutorial.widgetBox;
    },
    meterInteractionTutorialInteract: (state) => {
      return state.meterInteractionTutorial.widgetInteract;
    },
    checklistCreationTutorialWidget: (state) => {
      return state.checklistCreationTutorial.widgetBox;
    },
    checklistCreationTutorialDragDemo: (state) => {
      return state.checklistCreationTutorial.dragDemo;
    },
    checklistCreationTutorialCreateDemo: (state) => {
      return state.checklistCreationTutorial.createDemo;
    },
    checklistInteractionTutorialWidget: (state) => {
      return state.checklistInteractionTutorial.widgetBox;
    },
    checklistInteractionTutorialInteract: (state) => {
      return state.checklistInteractionTutorial.widgetInteract;
    },
    mpAppointmentCreation: (state) => {
      return state.appointmentCreation.mpAppointment;
    },
    patientAppointmentCreation: (state) => {
      return state.appointmentCreation.patientAppointment;
    },
    mpAppointmentChoosePatient: (state) => {
      return state.appointmentCreation.mpChoosePatient;
    },
    patientChooseMP: (state) => {
      return state.appointmentCreation.patientChooseMP;
    },
    mpAppointmentGif: (state) => {
      return state.appointmentCreation.mpAppointmentGif;
    },
    patientAppointmentGif: (state) => {
      return state.appointmentCreation.patientAppointmentGif;
    },
    appointmentEditStatusTutorial: (state) => {
      return state.appointmentUpdate.appointmentEditStatus;
    },
    appointmentUpdateCalendarTutorial: (state) => {
      return state.appointmentCalendar;
    },
    appointmentUpdateTutorial: (state) => {
      return state.appointmentUpdate.appointmentUpdate;
    },
    appointmentDeletionTutorial: (state) =>{
      return state.appointmentDeletion.deletion;
    },
    appointmentStatusRequestor: (state) => {
      return state.appointmentStatus.requestor;
    },
    appointmentStatusRequestee:(state)=>{
      return state.appointmentStatus.requestee;
    },
    calendarMonthView: (state) => {
      return state.calendarViews.month;
    },
    calendarWeekView: (state) => {
      return state.calendarViews.week;
    },
    medicalAppointmentView: (state) =>{
      return state.calendarViews.medicalAppointmentView;
    },
    selectPatient: (state) =>{
      return state.calendarViews.selectPatient;
    },
    patientView: (state) =>{
      return state.calendarViews.patientView;
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
    patientSelected: (state, value) => {
      state.patientSelected = value;
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
    },
    updatePatientTransfer: (state, payload) => {
      state.currentPatient.transfer = payload;
    },
    isTutorial: (state) => {
      state.isTutorial = !state.isTutorial;
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
    patientSelected: (context, payload) => {
      context.commit('patientSelected', payload);
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
    },
    updatePatientTransfer: (context, payload) => {
      // Used whenever a transfer request alters a patient's info in the server.
      context.commit('updatePatientTransfer', payload);
    },
    alternateTutorials: (context) => {
      context.commit('isTutorial');
    }
  }
});
