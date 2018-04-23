import Vue from 'vue';
import axios from 'axios';
import Router from 'vue-router';
import {store} from '../store/store';
import homepage from '../components/homepage/homepage.vue';
import profile from '../components/shared/profile.vue';
import medicHome from '../components/medic-home/medic-homepage.vue';
import medicAppointments from '../components/medic-home/medic-appointments.vue';
import patientTreatment from '../components/medic-home/patient-treatment.vue';
import medicSendFeedback from '../components/medic-home/send-feedback.vue';
import medicDataAnalysis from '../components/medic-home/data-analysis.vue';
import medicSingleDataAnalysis from '../components/medic-home/single-analysis.vue';
import patientHome from '../components/patient-home/patient-homepage.vue';
import adminHome from '../components/admin-home/admin-homepage.vue';
import error from '../components/error/error.vue';
import registration from '../components/homepage/sso_registration.vue';
import cookies from 'browser-cookies';

Vue.use(Router);
Vue.use(store);

const router = new Router ({
  mode: 'history',
  routes: [
    // Homepage Route
    {  path: '/' ,
       name: 'Home',
       component: homepage,
       meta: {
         title: "CareAway Homepage"
       }
    },

    {  path : '/profile',
       name: 'Profile',
       component: profile,
       beforeEnter: (to, from , next) => {
        if(store.getters.authStatus == null || store.getters.authStatus.length == 0) {
          next({path: '/'});
        }
        else {
          next()
        }
       },
       children: [
          // Medical Professional Homepage (:jwt is stating it's expecting a query)
          {  path: '/MedicHome/:jwt',
             name: 'MedicHome',
             beforeEnter: (to, from, next) => {
              // Check if there is a jwt query string attached use third party request handler to log user into the client
              if(to.query.jwt) {
                // Calls the careaway server to get more information about the user
                axios.get(store.getters.getLoginInfoURL + to.query.jwt).then(response => {
                // Set CSRF token in the response header
                axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                cookies.set('user', response.data.cookie);
                // Set the authenticated user and role type
                store.dispatch('signIn',response.data.role);
                store.dispatch('authenticatedUsername',response.data.username);
                axios.get(store.getters.returnCodeURL+store.getters.authenticatedUsername)
                .then(function(response) {
                // Extract out medical code from the response
                store.dispatch('medicalCode', response.data.medicalcode);
                next();
                }).catch(function(err) {
                console.log(err);
                })
                }).catch( function(err) {
                  console.log(err);
                });
              // Checks if the request to login in was local
              } else {
                  // If the login local request roletype is medical professional log them into the system
                  if(store.getters.authStatus === 'medical-professional') {
                    axios.get(store.getters.returnCodeURL+store.getters.authenticatedUsername)
                    .then(function(response) {
                      store.dispatch('medicalCode', response.data.medicalcode);
                      next();
                    })
                    .catch(function(err) {
                    console.log(err);
                    })
                  } else {
                    next({path: '/'});
                  }
                }
             },
          component: medicHome,
          children:[
            {  path: '/MedicHome',
              component: medicAppointments,
              name: 'medicAppointments',
              meta: {
                title: "CareAway Medical Home"
              }
            },
            {  path: '/patient-treatment',
               component: patientTreatment,
               name: 'patientTreatment',
               meta: {
                title: "Patient Treatment Creation"
               }
            },
            {  path: '/MedicHome/Report',
               component: medicDataAnalysis,
               name: 'medicReport',
               meta: {
                 title: "CareAway Medical Reports"
               }
            },
            {  path: '/MedicHome/IndividualReport', 
               component: medicSingleDataAnalysis, 
               name: 'medicSingleReport', 
               meta: {
                 title: "CareAway Medical Reports"
               }
            },
            {
              path: '/MedicHome/Feedback',
              component: medicSendFeedback,
              name: 'sendFeedback',
              meta: {
                title: "Send Feedback to Careaway!"
              }
            },
         ]
        }, // End Medical Professional routes

        {  path: '/PatientHome',
           name: 'patientHome',
           meta: {
            title: "CareAway Patient Home"
           },
           beforeEnter: (to, from, next) => {
            // Check if there is a jwt query string attached use third party request handler to log user into the client
            if(to.query.jwt){
              // Calls the careaway server to get more information about the user
              axios.get(store.getters.getLoginInfoURL + to.query.jwt).then(response => {
                // Set CSRF token in the response header
                axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                // Set the authenticated user and role type
                store.dispatch('signIn',response.data.role);
                store.dispatch('authenticatedUsername',response.data.username);
                cookies.set('user', response.data.cookie);
                next();
              }).catch(function(err) {
                  console.log(err);
                });
              // If the login local request roletype is a patient log them into the system
            } else {
                if(store.getters.authStatus === 'patient') {
                  next();
                } else {
                    next({path: '/'});
                }
              }
           }, 
          component: patientHome
        } , // End Patient routes

        {
          path: '/AdminHome',
          name: 'adminHome',
          meta: {
            title: "CareAway Admin Home"
          },
          beforeEnter: (to, from, next) => {
            // Check if there is a jwt query string attached use third party request handler to log user into the client
            if(to.query.jwt) {
              // Calls the careaway server to get more information about the user
              axios.get(store.getters.getLoginInfoURL + to.query.jwt).then(response => {
                // Set CSRF token in the response header
                axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                // Set the authenticated user and role type
                store.dispatch('signIn',response.data.role);
                store.dispatch('authenticatedUsername',response.data.username);
                cookies.set('user', response.data.cookie);
                next();
              }).catch(function(err) {
                console.log(err);
              });
              // If the login local request roletype is a system admin log them into the system
            } else {
              if(store.getters.authStatus === 'system-admin') {
                next();
              } else {
                next({path: '/'});
              }
            }
          },
          component: adminHome
        }, // End System Admin routes

       ]
    },

    {  path: '/Registration' ,
       name: 'Registration',
       component: registration,
       meta: {
         title: "Registration"
       },
       beforeEnter: (to, from, next) => {
         if(to.query.jwt){
            // Calls the careaway server to get more information about the user
            axios.get(store.getters.getLoginInfoURL + to.query.jwt).then(response => {
              // Set CSRF token in the response header
              axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
              // Set the authenticated user and role type
              store.dispatch('signIn',response.data.role);
              store.dispatch('authenticatedUsername',response.data.username);
              store.dispatch('saveUsername', response.data.username);
              cookies.set('user', response.data.cookie);
              next();
            }).catch(function(err) {
              console.log(err);
            });
          } else {
            // If it's from any other place redirect them to the homepage
            next({path: '/'});
          }
            next();
        }
      },
    // Wildcard catch all route; Redirects to error page
    {  path: '*',
       name: 'Error',
       meta: {
         title: "Error"
       },
       component: error
    }
 ]});

 router.beforeEach((to, from, next) => {
     document.title = to.meta.title || 'CareAway Treatment Planner';
     next();
 });

 export default router;
