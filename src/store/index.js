import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    data: [],
    orders:[]
  },
  mutations: {
    setData(state, val) {
      state.data = val;
    },
    setOrders(state, val){
      state.orders = val;
    }
  }
});

export default store;
