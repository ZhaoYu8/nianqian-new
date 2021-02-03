import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    increment(state, val) {
      state.data = val;
    }
  }
});

export default store;
