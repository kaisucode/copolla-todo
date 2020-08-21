import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    entry: "hello", 
    count: 0
  }, 
  mutations: {
    increment (state){
      state.count++;
    }
  }, 
  actions: {
    incrementTwice(){
      store.dispatch('INCREMENT');
      store.dispatch('INCREMENT');
    }
  }
})
