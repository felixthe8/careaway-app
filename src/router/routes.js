// import home from '../../../careaway-home/src/App.vue';

import Vue from 'vue';
import Router from 'vue-router';
import {store} from '../store/store'
import homepage from '../components/homepage/homepage.vue';
import medicHome from '../components/medic-home/medic-homepage.vue';
import patientHome from '../components/patient-home/patient-homepage.vue';
import error from '../components/error/error.vue';

Vue.use(Router);
Vue.use(store);

const router = new Router ({
 routes: [
        {  path: '/' ,
            name: 'Home', 
            component: homepage,
            meta: {
                title: "CareAway Homepage"
            }
        },

        {
            path: '/MedicHome',
            name: 'MedicHome',
            meta: {
                title: "CareAway Medic Home"
            },
            beforeEnter: (to, from, next) => {
                console.log(store.getters.authenticationStatusMP);
                if(!(store.getters.authenticationStatusMP)) {
                    console.log("Not Authenticated");
                    next({path: '/',});
                } else {
                    console.log("Secure entry");
                    next()
                }
            },
            component: medicHome
        },

        {
            path: '/PatientHome',
            name: 'patientHome',
            meta: {
                title: "CareAway Patient Home"
            },
            beforeEnter: (to, from, next) => {
                console.log(store.getters.authenticationStatusPatient);
                if(!(store.getters.authenticationStatusPatient)) {
                    console.log("Not Authenticated");
                    next({path: '/',});
                } else {
                    console.log("Secure entry");
                    next()
                }
            },
            component: patientHome

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

