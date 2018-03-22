// import home from '../../../careaway-home/src/App.vue';

import Vue from 'vue';
import axios from 'axios';
import Router from 'vue-router';
import {store} from '../store/store'
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

        {  path: '/' ,
            name: 'Home', 
            component: homepage,
            meta: {
                title: "CareAway Homepage"
            },
        },
        {
            path: '/MedicHome/:jwt',
            name: 'MedicHome',
            beforeEnter: (to, from, next) => {          
                if(to.query.jwt){
                    axios.get('http://localhost:8080/getLoginInfo?token='+to.query.jwt).then(response => {
                        axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                        store.dispatch('signIn',response.data.role);
                        store.dispatch('authenticatedUsername',response.data.username);
                        next();
                        }).catch(function(err) {
                        console.log(err);
                    });               
                }
                else{
                    if((store.getters.authStatus) === 'medical-professional') {
                        console.log("Secure entry");
                        console.log(store.getters.authStatus);
                        next();
                    } else {
                        next({path: '/',});
                    }
                }
            },
            component: medicHome,
            children:[ 
                {path: '/MedicHome', 
                    component: medicCalendar, 
                    name: 'medicCalendar',  meta: {
                    title: "CareAway Medical Home"
                }},
                {path: '/MedicHome/Report', component: medicDataAnalysis, name: 'medicReport', meta: {
                    title: "CareAway Medical Reports"
                }}
            ]
        },

        {
            path: '/PatientHome',
            name: 'patientHome',
            meta: {
                title: "CareAway Patient Home"
            },
            beforeEnter: (to, from, next) => {
                console.log(to);
                console.log(from);
                if(to.query.jwt){
                    console.log('sso');
                    axios.get('http://localhost:8080/getLoginInfo?token='+to.query.jwt).then(response => {
                        axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                        store.dispatch('signIn',response.data.role);
                        store.dispatch('authenticatedUsername',response.data.username);
                        next();
                        }).catch(function(err) {
                        console.log(err);
                    });               
                }
                else {
                    if((store.getters.authStatus) === 'patient') {
                        console.log("Secure entry");
                        console.log(store.getters.authStatus);
                        next();
                    } else {
                        next({path: '/',});
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
                if(to.query.jwt){
                    console.log('sso');
                    axios.get('http://localhost:8080/getLoginInfo?token='+to.query.jwt).then(response => {
                        axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                        store.dispatch('signIn',response.data.role);
                        store.dispatch('authenticatedUsername',response.data.username);
                        next();
                        }).catch(function(err) {
                        console.log(err);
                    });               
                }
                else{
                if((store.getters.authStatus) === 'system-admin') {
                    next()
                } else {
                    next({path: '/',});
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
                console.log("HERE");        
                if(to.query.jwt){
                    axios.get('http://localhost:8080/getLoginInfo?token='+to.query.jwt).then(response => {
                        axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
                        store.dispatch('signIn',response.data.role);
                        store.dispatch('authenticatedUsername',response.data.username);
                        store.dispatch('saveUsername', response.data.username);
                        store.dispatch('alternateSSORegistration');
                        next();
                        }).catch(function(err) {
                        console.log(err);
                    });               
                }
                else{
                    next({path: '/',});
                }
                next();
            }
        },
         // wildcard catch all route; Redirects to error page
        {
            path: '*',
            name: 'Error',
            meta: {
                title: "Error"
            },
            component: error
        }
 ]})

 router.beforeEach((to, from, next) => {
     document.title = (to.meta.title || 'CareAway Treatment Planner');
     next()
 })

 export default router

