import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuefire from "vuefire";
import firebase from "./services/firebase";

import "./registerServiceWorker";
import "./services/notifications";

Vue.use(Vuefire);
Vue.config.productionTip = false;

new Vue({
  firebase: {
    cat: firebase.database.ref("cat").orderByChild("created_at")
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
