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
let curPage = "week";
let focus_textcontent_idx = 0;
let focused_task_idx = 0;
let focused_tasks;

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

  if (key_down == "ENTER"){
    zoomed_in = true;
    curPage = getCurrentPage();
    focus_textcontent_idx = focus_coord.row * grid_size.cols + focus_coord.col;

    let curSubThing;
    if(curPage == "week")
      curThing = "2020-8-1";
    else if(curPage == "month")
      curThing = "2020-8";
    else if(curPage == "year")
      curThing = "2020";
    else if(curPage == "category")
      alert("I can't");

    let focused_tasks = store.state.todo[curPage][curThing][idx];
    focused_task_idx = 0;
  }
  if (key_down == "ESCAPE")
    zoomed_in = false;

  if (key_down == "d")
    router.push(pages[(pages.indexOf(getCurrentPage())-1 + pages.length) % pages.length]);
  else if (key_down == "f")
    router.push(pages[(pages.indexOf(getCurrentPage())+1) % pages.length]);


  if(zoomed_in) {
    if (key_down == "j"){
      focused_task_idx = (focused_task_idx - 1 + focused_tasks.length) % focused_tasks.length;



    }
    else if (key_down == "k") {
      focused_task_idx = (focused_task_idx + 1) % focused_tasks.length;
    }
    // else if (key_down == "a")
    // else if (key_down == "i")
    // else if (key_down == "x")
    // else if (key_down == "p")
    // else if (key_down == "d")

    if (key_down == "a"){
      let grid_size = GRID_SIZES[getCurrentPage()];
      store.commit('setIdx', idx);
      // $("#commandEntry").focus();
      let test = prompt("this is a test");
      console.log(test);
    }
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

