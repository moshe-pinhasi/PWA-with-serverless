import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    online: true
  },
  mutations: {
    setOnline(state, isOnline) {
      state.online = isOnline;
    }
  },
  actions: {},
  getters: {
    isOnline: state => state.online
  }
});

function updateOnlineStatus({ type }) {
  store.commit("setOnline", type === "online");
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

export default store;
