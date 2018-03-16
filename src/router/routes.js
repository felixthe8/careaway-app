// import home from '../../../careaway-home/src/App.vue';

import Vue from 'vue';
import Router from 'vue-router';
import {store} from '../store/store'
import homepage from '../components/homepage/homepage.vue';
import medicHome from '../components/medic-home/medic-homepage.vue';
import medicCalendar from '../components/medic-home/medic-calendar.vue';
import medicDataAnalysis from '../components/medic-home/dataAnalysis.vue';
import patientHome from '../components/patient-home/patient-homepage.vue';
import error from '../components/error/error.vue';

Vue.use(Router);
Vue.use(store);

const router = new Router ({
  mode: 'history',
  routes: [
    {
      path: '/' ,
      name: 'Home',
      component: homepage,
      meta: {
        title: "CareAway Homepage"
      }
    },
    {
      path: '/MedicHome',
      name: 'MedicHome',
      beforeEnter: (to, from, next) => {
        if((store.getters.authStatus) == 'medical-professional') {
          next()
        } else {
          next({path: '/',});
        }
      },
      component: medicHome,
      children: [
        {
          path: '/MedicHome',
          name: 'medicCalendar',
          component: medicCalendar,
          meta: {
            title: "CareAway Medical Home"
          }
        },
        {
          path: '/MedicHome/Report',
          component: medicDataAnalysis,
          name: 'medicReport',
          meta: {
            title: "CareAway Medical Reports"
          }
        }
      ]
    },

    {
      path: '/PatientHome',
      name: 'patientHome',
      meta: {
        title: "CareAway Patient Home"
      },
      beforeEnter: (to, from, next) => {
        if((store.getters.authStatus) == 'patient') {
          next()
        } else {
          next({path: '/',});
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
  ]
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title || 'CareAway Treatment Planner');
  next()
})

export default router
