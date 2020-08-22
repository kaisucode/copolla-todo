import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

Vue.config.productionTip = false;

new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount('#app');


const KEY_CODES = {
  "h": 72,
  "j": 74, 
  "k": 75, 
  "l": 76, 
  "d": 68, 
  "f": 70,
  "a": 65, 
  "i": 73
};

const pages = ["week", "month", "year", "about"];

function getCurrentPage(){
  return window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == KEY_CODES["h"]){
    
  }
  else if (event.keyCode == KEY_CODES["j"]){
    
  }
  else if (event.keyCode == KEY_CODES["k"]){
    
  }
  else if (event.keyCode == KEY_CODES["l"]){
    
  }
  else if (event.keyCode == KEY_CODES["d"]){
    let next_page = pages[(pages.indexOf(getCurrentPage())-1 + pages.length) % pages.length];
    router.push(next_page);
  }
  else if (event.keyCode == KEY_CODES["f"]){
    let next_page = pages[(pages.indexOf(getCurrentPage())+1) % pages.length];
    router.push(next_page);
  }
  else if (event.keyCode == KEY_CODES["a"]){
    
  }
  else if (event.keyCode == KEY_CODES["i"]){
    
  }
});

