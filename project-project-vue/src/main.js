import Vue from 'vue'
import router from './router'
import App from './App.vue'
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

let level = 0; // 0 is outer level, 1 is inner level
let focus_coord = {"row": 0, "col": 0}; // detect current date?

const GRID_SIZES = {
  "week": {"rows": 2, "cols": 4},
  "month": {"rows": 2, "cols": 3},
  "year": {"rows": 3, "cols": 4}
};

document.addEventListener("keydown", (event) => {
  let grid_size = GRID_SIZES[getCurrentPage()];

  if (event.keyCode == KEY_CODES["h"])
    focus_coord.row = (focus_coord.row - 1 + grid_size.rows) % grid_size.rows;
  else if (event.keyCode == KEY_CODES["j"])
    focus_coord.col = (focus_coord.col - 1 + grid_size.cols) % grid_size.cols;
  else if (event.keyCode == KEY_CODES["k"])
    focus_coord.col = (focus_coord.col + 1) % grid_size.cols;
  else if (event.keyCode == KEY_CODES["l"])
    focus_coord.row = (focus_coord.row + 1) % grid_size.rows;
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
  console.log(focus_coord);
});

