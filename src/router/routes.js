import Vue from 'vue';
import axios from 'axios';
import Router from 'vue-router';
import {store} from '../store/store';
import homepage from '../components/homepage/homepage.vue';
import medicHome from '../components/medic-home/medic-homepage.vue';
import medicCalendar from '../components/medic-home/calendar.vue';
import medicDataAnalysis from '../components/medic-home/data-analysis.vue';
import patientHome from '../components/patient-home/patient-homepage.vue';
import adminHome from '../components/admin-home/admin-homepage.vue';
import error from '../components/error/error.vue';
import registration from '../components/homepage/sso_registration.vue';

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
             // Set the authenticated user and role type
             store.dispatch('signIn',response.data.role);
             store.dispatch('authenticatedUsername',response.data.username);
             next();
           }).catch( function(err) {
             console.log(err);
           });      
           // Checks if the request to login in was local         
         } else {
            // If the login local request roletype is medical professional log them into the system
            if(store.getters.authStatus === 'medical-professional') {
              next();
            } else {
              next({path: '/'});
            }
         }
       },
       component: medicHome,
       children:[ 
         {  path: '/MedicHome', 
            component: medicCalendar, 
            name: 'medicCalendar',  
            meta: {
              title: "CareAway Medical Home"
            }
        },
        {  path: '/MedicHome/Report', 
           component: medicDataAnalysis, 
           name: 'medicReport', 
           meta: {
             title: "CareAway Medical Reports"
           }
        }]      
    },
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
    },
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

