import Vue from 'vue'
import router from './router'
import store from './store/index.js'
import App from './App.vue'
import { ipcRenderer } from 'electron'
import Swal from 'sweetalert2'

ipcRenderer.send('readData');
ipcRenderer.on('readData', (event, data) => {
  store.commit('initRead', JSON.parse(data));
});
function writeData(){
  Swal.fire({
    title: 'Attempting to write data!',
    text: 'Do you want to continue?',
    icon: 'error',
    confirmButtonText: 'LIT!!!!'
  });
  ipcRenderer.send('writeData', JSON.stringify(store.state.todo));
}

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
let focused_textcard_idx = 0;
let focused_task_idx = 0;
let focused_tasks;
let focused_task_id = "#blah";
let focused_task_time = "2020";
let copied_task = null;

const GRID_SIZES = {
  "week": {"rows": 2, "cols": 4},
  "month": {"rows": 2, "cols": 3},
  "year": {"rows": 3, "cols": 4}
};

document.addEventListener("keydown", (event) => {
  let key_down = "";
  let grid_size = GRID_SIZES[getCurrentPage()];
  for (let key in KEY_CODES){
    if (event.keyCode == KEY_CODES[key]){
      key_down = key;
      break;
    }
  }

  if (key_down == "") { // unrecognized key pressed 
    return;
  }

  if (key_down == "ENTER"){
    zoomed_in = true;
    curPage = getCurrentPage();
    focused_textcard_idx = focus_coord.row * grid_size.cols + focus_coord.col;

    if(curPage == "week")
      focused_task_time = "2020-8-1";
    else if(curPage == "month")
      focused_task_time = "2020-8";
    else if(curPage == "year")
      focused_task_time = "2020";
    else if(curPage == "category")
      alert("I can't");

    focused_tasks = store.state.todo[curPage][focused_task_time][focused_textcard_idx];
    focused_task_idx = 0;
    focused_task_id = `#textcard_${focus_coord.row}_${focus_coord.col}`;
  }
  if (key_down == "ESCAPE"){
    zoomed_in = false;
    $($(focused_task_id).find('li')[focused_task_idx]).removeClass("kevinFocus");
  }

  if(zoomed_in) {
    if("jk".includes(key_down)){
      $($(focused_task_id).find('li')[focused_task_idx]).removeClass("kevinFocus");

      if (key_down == "j")
        focused_task_idx = (focused_task_idx - 1 + focused_tasks.length) % focused_tasks.length;
      else if (key_down == "k") 
        focused_task_idx = (focused_task_idx + 1) % focused_tasks.length;

      $($(focused_task_id).find('li')[focused_task_idx]).addClass("kevinFocus");
    }

    // as of right now ipdxa are kind of sketched out, but we don't update what
    // stuff looks like, and writeData is not written

    else if (key_down == "i"){
      Swal.fire({
        title: 'Insert mode coming soon',
        text: 'pllz make it',
        icon: 'error',
        confirmButtonText: 'umm ok'
      });
      // let new_task_name = prompt("new task name?");
      // store.state.todo[curPage][focused_task_time][focused_textcard_idx] = 
      //   { 
      //     "taskName": new_task_name, 
      //     "category": "gaming", 
      //     "subtasks": [] 
      //   };
      // writeData();
    }
    else if (key_down == "d"){
      store.commit("deleteTask", {
        "curPage": curPage,
        "focused_task_time": focused_task_time,
        "focused_textcard_idx": focused_textcard_idx
      });
      writeData();
    }
    else if (key_down == "a"){
      (async (store) => {
        const {value: new_task_name } = await Swal.fire({
          input: 'textarea',
          inputPlaceholder: 'new task name?',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        });
        console.log("ehy");
        if (new_task_name) {
          console.log(new_task_name, curPage, focused_task_time, focused_textcard_idx);
          Swal.fire(new_task_name);
          store.commit("pushTask", {
            "curPage": curPage, 
            "focused_task_time": focused_task_time, 
            "focused_textcard_idx": focused_task_idx, 
            "task": {
              "taskName": new_task_name, 
              "category": "gaming", 
              "subtasks": [] 
            }
          });
          writeData();
        }
      })(store);
    }
    else if (key_down == "x"){
      copied_task = store.state.todo[curPage][focused_task_time][focused_textcard_idx]; 
      store.commit("deleteTask", {
        "curPage": curPage,
        "focused_task_time": focused_task_time,
        "focused_textcard_idx": focused_textcard_idx
      });
      writeData();
    }
    else if (key_down == "p"){
      // not quite right...
      store.commit("pushTask", {
        "curPage": curPage, 
        "focused_task_time": focused_task_time, 
        "focused_textcard_idx": focused_textcard_idx, 
        "task": copied_task
      });
      writeData();
    }
  }
  else if(!zoomed_in) {
    if (key_down == "d")
      router.push(pages[(pages.indexOf(getCurrentPage())-1 + pages.length) % pages.length]);
    else if (key_down == "f")
      router.push(pages[(pages.indexOf(getCurrentPage())+1) % pages.length]);
    if("hjlk".includes(key_down)){
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

