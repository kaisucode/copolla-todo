import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/index.js'
import $ from "jquery"

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
  "i": 73, 
  "ENTER": 13,
  "ESCAPE": 27
};

const pages = ["week", "month", "year", "categories"];

function getCurrentPage(){
  return window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
}

let zoomed_in = false; // where are you navigating
let focus_coord = {"row": 0, "col": 0}; // detect current date?

const GRID_SIZES = {
  "week": {"rows": 2, "cols": 4},
  "month": {"rows": 2, "cols": 3},
  "year": {"rows": 3, "cols": 4}
};

document.addEventListener("keydown", (event) => {
  let key_down = "";
  for (let key in KEY_CODES){
    if (event.keyCode == KEY_CODES[key]){
      key_down = key;
      break;
    }
  }

  if (key_down == "ENTER")
    zoomed_in = true;
  if (key_down == "ESCAPE")
    zoomed_in = false;

  if (key_down == "d")
    router.push(pages[(pages.indexOf(getCurrentPage())-1 + pages.length) % pages.length]);
  else if (key_down == "f")
    router.push(pages[(pages.indexOf(getCurrentPage())+1) % pages.length]);

  if(zoomed_in) {
    let idx = blah blah
      if (key_down == "j"){
        store.state.todo[getCurrentPage()]["2020"]["8"][idx];
      }
      // else if (key_down == "k")
      // else if (key_down == "a")
      // else if (key_down == "i")
      // else if (key_down == "x")
      // else if (key_down == "p")
      // else if (key_down == "d")
  }
  else if(!zoomed_in) {
    if("hjlk".includes(key_down)){
      let grid_size = GRID_SIZES[getCurrentPage()];
      $(`#textcard_${focus_coord.row}_${focus_coord.col}`).removeClass("alekFocus");

      if (key_down == "h")
        focus_coord.col = (focus_coord.col - 1 + grid_size.cols) % grid_size.cols;
      else if (key_down == "j")
        focus_coord.row = (focus_coord.row - 1 + grid_size.rows) % grid_size.rows;
      else if (key_down == "k")
        focus_coord.row = (focus_coord.row + 1) % grid_size.rows;
      else if (key_down == "l")
        focus_coord.col = (focus_coord.col + 1) % grid_size.cols;

      $(`#textcard_${focus_coord.row}_${focus_coord.col}`).addClass("alekFocus");
    }
  }

});

