// import the Vuex store
import store from '../store/store';
// User state mangagement plugin for the CareAway Treatment Planner
const User = {};
User.install = function(Vue, options) {
    Vue.prototype.$logout = function() {
        console.log("Logout plugin method");
        // clears the authenticated username 
        this.$store.dispatch('deauthenticatedUsername', '');
        // clears the medical code
        this.$store.dispatch('medicalCode', '');
        // clears the authenticated role
        this.$store.dispatch('signOut', '');
    }
}

export default User