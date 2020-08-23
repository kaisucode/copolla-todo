import Vue from 'vue'
import router from './router'
import store from './store/index.js'
import App from './App.vue'
import { ipcRenderer } from 'electron'
import Swal from 'sweetalert2'
import scrollTo from "jquery.scrollto"

ipcRenderer.send('readData');
ipcRenderer.on('readData', (event, data) => {
  store.commit('initRead', JSON.parse(data));
});
function writeData(){
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
  "x": 88,
  "p": 80,
  "ENTER": 13,
  "ESCAPE": 27
};

const pages = ["week", "month", "year", "categories"];

function getCurrentPage(){
  let page = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  if(!pages.includes(page)){
    return "week";
  }
  else{
    return page;
  }
}

let zoomed_in = false; // where are you navigating

let focus_coord = {"row": 0, "col": 0}; // detect current date?
let curPage = "week";
let focused_textcard_idx = 0;
let focused_textcard_id = "#textcard_0_0";
let focused_tasks = [];

let focused_task_idx = 0;
let focused_task_time = "2020";
let copied_task = null;

$(focused_textcard_id).addClass("alekFocus");

const GRID_SIZES = {
  "week": {"rows": 2, "cols": 4},
  "month": {"rows": 2, "cols": 3},
  "year": {"rows": 3, "cols": 4}, 
  "categories": {"rows": 1, "cols": 4}
};

function inToDoPage(){
  return ["week", "month", "year", "categories"].includes(getCurrentPage());
}

document.addEventListener("keydown", (event) => {
  let key_down = "";
  let grid_size = GRID_SIZES[getCurrentPage()];
  for (let key in KEY_CODES){
    if (event.keyCode == KEY_CODES[key]){
      key_down = key;
      break;
    }
  }

  if (key_down == "") // unrecognized key pressed 
    return;

  if(inToDoPage()){
    curPage = getCurrentPage();

    if(!zoomed_in) {
      if (key_down == "d")
        router.push(pages[(pages.indexOf(getCurrentPage())-1 + pages.length) % pages.length]);
      else if (key_down == "f")
        router.push(pages[(pages.indexOf(getCurrentPage())+1) % pages.length]);
    }

    if (key_down == "ENTER" && (curPage == "week" || curPage == "categories")){
      zoomed_in = true;
      curPage = getCurrentPage();
      focused_textcard_idx = focus_coord.row * grid_size.cols + focus_coord.col;
      $(focused_textcard_id).addClass("selectedFocus");

      if(curPage == "week"){
        focused_task_time = "2020-8-1";
        focused_tasks = store.state.todo[curPage][focused_task_time][focused_textcard_idx];
      }
      else if (curPage == "categories"){
        focused_tasks = store.state.todo[curPage][focused_textcard_idx]["categories"];
      }
      focused_task_idx = 0;
      focused_textcard_id = `#textcard_${focus_coord.row}_${focus_coord.col}`;
      $($(focused_textcard_id).find('li')[focused_task_idx]).addClass("kevinFocus");
      $(focused_textcard_id).addClass("selectedFocus");
    }
    else if (key_down == "ESCAPE"){
      zoomed_in = false;
      $($(focused_textcard_id).find('li')[focused_task_idx]).removeClass("kevinFocus");
      $(focused_textcard_id).removeClass("selectedFocus");
    }

    if(((curPage == "week" || curPage == "categories") && !zoomed_in) || (curPage == "month" || curPage == "year")) {
      if("hjlk".includes(key_down)){
        $(focused_textcard_id).removeClass("alekFocus");

        if (key_down == "h")
          focus_coord.col = (focus_coord.col - 1 + grid_size.cols) % grid_size.cols;
        else if (key_down == "j")
          focus_coord.row = (focus_coord.row + 1) % grid_size.rows;
        else if (key_down == "k")
          focus_coord.row = (focus_coord.row - 1 + grid_size.rows) % grid_size.rows;
        else if (key_down == "l")
          focus_coord.col = (focus_coord.col + 1) % grid_size.cols;

        focused_textcard_idx = focus_coord.row * grid_size.cols + focus_coord.col;
        focused_textcard_id = `#textcard_${focus_coord.row}_${focus_coord.col}`;

        $(focused_textcard_id).addClass("alekFocus");
        $("body").scrollTo(focused_textcard_id);
      }
    }

    if(curPage == "month" || curPage == "year"){
      if(key_down == "i")
        handleStickyNoteEdit();
    }
    else if(curPage == "week" || curPage == "categories") {
      if(zoomed_in) {
        if("jk".includes(key_down))
          handleTaskNavigation(key_down);
        else if (key_down == "i")
          handleTaskEdit();
        else if (key_down == "d")
          handleTaskDelete();
        else if (key_down == "a")
          handleTaskAppend();
        else if (key_down == "x")
          handleTaskCut();
        else if (key_down == "p")
          handleTaskInsert();
      }
    }
  }
});

function handleTaskEdit(){
  let old_note;
  let data = {
      "curPage": curPage,
      "focused_textcard_idx": focused_textcard_idx,
      "focused_task_idx": focused_task_idx, 
  };
  if (curPage == "week"){
    old_note = store.state.todo[curPage][focused_task_time][focused_textcard_idx][focused_task_idx]["taskName"];
    data["focused_task_time"] = focused_task_time;
  }
  else if (curPage == "categories")
    old_note = store.state.todo[curPage][focused_textcard_idx]["categories"][focused_task_idx];
  (async (store) => {
    const {value: new_task_name } = await Swal.fire({
      input: 'text',
      inputValue: old_note, 
      inputPlaceholder: 'change task name',
      inputAttributes: {
        'aria-label': 'new task name'
      },
      icon: 'error',
      showCancelButton: true
    });
    store.commit("editTask", {
      ...data, 
      "new_task_name": new_task_name
    });
    writeData();
  })(store);
}

function handleTaskDelete(){
  let data = {
      "curPage": curPage,
      "focused_textcard_idx": focused_textcard_idx,
      "focused_task_idx": focused_task_idx, 
  };
  if (curPage == "week")
    data["focused_task_time"] = focused_task_time;
  store.commit("deleteTask", data);
  writeData();
}

function handleTaskAppend(){
  let data = {
      "curPage": curPage,
      "focused_textcard_idx": focused_textcard_idx
  };
  if (curPage == "week")
    data["focused_task_time"] = focused_task_time;

  (async (store) => {
    const {value: new_task_name } = await Swal.fire({
      input: 'text',
      inputPlaceholder: 'New task name?',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      icon: 'info',
      showCancelButton: true
    });
    if (new_task_name) {
      store.commit("pushTask", {
        ...data, 
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

function handleTaskCut(){
  let data = {
    "curPage": curPage,
    "focused_textcard_idx": focused_textcard_idx, 
    "focused_task_idx": focused_task_idx
  };
  if (curPage == "week"){
    data["focused_task_time"] = focused_task_time;
    copied_task = store.state.todo[curPage][focused_task_time][focused_textcard_idx][focused_task_idx]; 
  }
  else if (curPage == "categories")
    copied_task = store.state.todo[data.curPage][data.focused_textcard_idx]["categories"][data.focused_task_idx];
  store.commit("deleteTask", data);
  writeData();
}

function handleTaskInsert(){
  let data = {
    "curPage": curPage,
    "focused_textcard_idx": focused_textcard_idx, 
    "focused_task_idx": focused_task_idx, 
    "task": copied_task
  };
  console.log(copied_task);
  if (curPage == "week")
    data["focused_task_time"] = focused_task_time;
  store.commit("insertTask", data);
  writeData();
}

function handleStickyNoteEdit(){
  if(curPage == "month")
    focused_task_time = "2020-8";
  else if(curPage == "year")
    focused_task_time = "2020";

  (async (store) => {
    console.log(store.state.todo[curPage][focused_task_time][focused_textcard_idx]);
    let old_note = store.state.todo[curPage][focused_task_time][focused_textcard_idx];
    const {value: new_note } = await Swal.fire({
      input: 'textarea',
      inputValue: old_note,
      inputPlaceholder: 'yay! write some stuff here.',
      inputAttributes: {
        'aria-label': 'new task name'
      },
      icon: 'success',
      showCancelButton: true
    });
    store.commit("modifyStickyNote", {
      "curPage": curPage, 
      "focused_task_time": focused_task_time, 
      "focused_textcard_idx": focused_textcard_idx, 
      "new_note": new_note
    });
    writeData();
  })(store);
}

function handleTaskNavigation(key_down){
  $($(focused_textcard_id).find('li')[focused_task_idx]).removeClass("kevinFocus");

  if (key_down == "j")
    focused_task_idx = (focused_task_idx + 1) % focused_tasks.length;
  else if (key_down == "k") 
    focused_task_idx = (focused_task_idx - 1 + focused_tasks.length) % focused_tasks.length;

  let focused_task_id = $(focused_textcard_id).find('li')[focused_task_idx];
  $(focused_task_id).addClass("kevinFocus");
  $(focused_textcard_id).scrollTo(focused_task_id);
}

