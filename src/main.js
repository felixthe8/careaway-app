import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'
import router from './router/routes'

// Helpers
import Calendar from './helpers/calendar';
import User from './helpers/user';
Vue.use(Calendar)
Vue.use(User);

// Require the main Sass manifest file
require('./assets/sass/main.scss');
require('./assets/sass/settings.scss');

new Vue({
  el: '#app',
  router,
  store:store,
  render: h => h(App)
})
