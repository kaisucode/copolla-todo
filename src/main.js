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
  "u": 85,
  "ENTER": 13,
  "ESCAPE": 27,
  "SPACE": 32, 
  "[": 219,
  "]": 221, 
  "r": 82, 
  "s": 83, 
  "y": 89
};

const GRID_SIZES = {
  "week": {"rows": 2, "cols": 4},
  "month": {"rows": 2, "cols": 3},
  "year": {"rows": 3, "cols": 4}, 
  "categories": {"rows": 1, "cols": 4}
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

function getCategories(){
  let cats = [];
  let cat_lookup_table = {};
  for (var i in store.state.todo.categories) {
    let meta_category = store.state.todo.categories[i];
    for (var j in meta_category.categories) {
      cats.push(meta_category.categories[j]);
      cat_lookup_table[meta_category.categories[j]] = meta_category.name;
    }
  }
  return {"category_list": cats, "meta_category_table": cat_lookup_table};
}

function getCategoriesAlt(){
  let cats = {};
  cats["none"] = {"none": "none"};
  for (var i in store.state.todo.categories) {
    let meta_category = store.state.todo.categories[i];
    cats[meta_category.name] = {};
    for (var j in meta_category.categories) {
      cats[meta_category.name][meta_category.categories[j]] = meta_category.categories[j];
    }
  }
  return cats;
}

function inToDoPage(){
  return ["week", "month", "year", "categories"].includes(getCurrentPage());
}

function getToDoTimeKey(page, offset){
  let now = new Date();
  console.log("getting with offset " + offset);

  // years start at 1900
  let yr = now.getYear() + 1900;
  if(page == "year")
    return "" + yr + offset; 

  // months are 0 indexed
  let month = now.getMonth() + 1; 

  if(page == "month"){
    let m_off = offset % 12;
    let y_off = Math.sign(offset)*Math.floor(Math.abs(offset) / 12);
    if (0 <= month + m_off < 12)
      return (yr+y_off) + "-" + (month+m_off);
    else if (month + m_off < 0)
      return (yr+y_off-1) + "-" + (month+m_off+12);
    else if (month + m_off >= 12)
      return (yr+y_off+1) + "-" + (month+m_off-12);
  }

  // if (page == "week")
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var whichday = Math.floor(diff / oneDay);
  let weirdweek = Math.floor(whichday / 7);

  if(0 <= weirdweek + offset < 52){
    return yr + "-" + (weirdweek+offset);
  }
  else {
    alert("THIS ERROR IS BECAUSE ALEK doesnt know what a calendar is. im sorry.");
  }
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
      if ("df".includes(key_down)){
        if (key_down == "d")
          router.push(pages[(pages.indexOf(getCurrentPage())-1 + pages.length) % pages.length]);
        else if (key_down == "f")
          router.push(pages[(pages.indexOf(getCurrentPage())+1) % pages.length]);
        time_offset = 0;
        curPage = getCurrentPage();
        let new_time = getToDoTimeKey(curPage, time_offset);
        store.commit("timeChange", {"new_time": new_time, "curPage": curPage});
        writeData();
        focused_task_idx = 0;
        focus_coord.row = 0;
        focus_coord.col = 0;
      }

      if(curPage != "categories"){
        if("[]".includes(key_down)){
          if (key_down == "[")
            time_offset -= 1;
          else if (key_down == "]")
            time_offset += 1;

          let new_time = getToDoTimeKey(curPage, time_offset);
          store.commit("timeChange", {"new_time": new_time, "curPage": curPage});
          writeData();
        }
      }
    }

    if (key_down == "ENTER" && (curPage == "week" || curPage == "categories")){
      zoomed_in = true;
      curPage = getCurrentPage();
      focused_textcard_idx = focus_coord.row * grid_size.cols + focus_coord.col;
      focused_task_idx = 0;
      focused_textcard_id = `#textcard_${focus_coord.row}_${focus_coord.col}`;
      $(focused_textcard_id).addClass("selectedFocus");

      if(curPage == "week"){
        focused_task_time = getToDoTimeKey(curPage, time_offset);

        if (focused_textcard_idx == 7)
            focused_tasks = store.state.todo["backBurner"];
        else
            focused_tasks = store.state.todo[curPage][focused_task_time][focused_textcard_idx];
      }
      else if (curPage == "categories"){
        focused_tasks = store.state.todo[curPage][focused_textcard_idx]["categories"];
      }
      $($(focused_textcard_id).find('li')[focused_task_idx]).addClass("kevinFocus");
      $(focused_textcard_id).addClass("selectedFocus");
    }
    else if (key_down == "ESCAPE"){
      zoomed_in = false;
      $($(focused_textcard_id).find('li')[focused_task_idx]).removeClass("kevinFocus");
      $(focused_textcard_id).removeClass("selectedFocus");
    }

     if (key_down == "u")
      handleTaskUndo();

    if(curPage == "categories" && !zoomed_in)
      if(key_down == "r")
        handleRenameCategory();

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
        let isBackBurner = (focused_textcard_idx == 7 && curPage == "week");

        if(curPage == "week" && zoomed_in)
          if(key_down == "s")
            handleEditDescription(isBackBurner);


        if("jk".includes(key_down))
          handleTaskNavigation(key_down);
        else if (key_down == "i")
          handleTaskEdit(isBackBurner);
        else if (key_down == "d")
          handleTaskDelete(isBackBurner);
        else if (key_down == "a")
          handleTaskAppend(isBackBurner);
        else if (key_down == "x")
          handleTaskCut(isBackBurner);
        else if (key_down == "y")
          handleTaskCopy(isBackBurner);
        else if (key_down == "p")
          handleTaskInsert(isBackBurner);
        else if (key_down == "SPACE")
          handleTaskToggle(isBackBurner);
      }
    }
  }
});

function handleTaskUndo(){
  if(undo_tasks.length > 0){
    let prev_state = undo_tasks.pop();
    store.commit("initRead", JSON.parse(prev_state));
  }
  else {
    Swal.fire({
      icon: 'error',
      title: "You have reached the end of undo history. I am sorry."
    });
  }
}

function handleTaskEdit(isBackBurner){
  let old_note;
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
    "focused_textcard_idx": focused_textcard_idx,
    "focused_task_idx": focused_task_idx, 
  };
  if (isBackBurner){
    old_note = store.state.todo[data.curPage][focused_task_idx]["taskName"];
  }
  else if (data.curPage == "week"){
    old_note = store.state.todo[curPage][focused_task_time][focused_textcard_idx][focused_task_idx]["taskName"];
    data["focused_task_time"] = focused_task_time;
  }
  else if (data.curPage == "categories"){
    old_note = store.state.todo[curPage][focused_textcard_idx]["categories"][focused_task_idx];
  }
  (async (store) => {
    const {value: new_task_name } = await Swal.fire({
      input: 'text',
      title: "Edit Task Name",
      inputValue: old_note, 
      inputPlaceholder: 'change task name',
      inputAttributes: {
        'aria-label': 'new task name'
      },
      icon: 'error',
      showCancelButton: true
    });
    if (new_task_name){
      undo_tasks.push(JSON.stringify(store.state.todo));
      store.commit("editTask", {
        ...data, 
        "new_task_name": new_task_name
      });
      writeData();
    }
  })(store);
}

function handleTaskDelete(isBackBurner){
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
      "focused_textcard_idx": focused_textcard_idx,
      "focused_task_idx": focused_task_idx, 
  };
  if (data.curPage == "week")
    data["focused_task_time"] = focused_task_time;
  undo_tasks.push(JSON.stringify(store.state.todo));

  focused_task_idx = Math.max(0, focused_task_idx-1);
  let focused_task_id = $(focused_textcard_id).find('li')[focused_task_idx];
  $(focused_task_id).addClass("kevinFocus");
  $(focused_textcard_id).find("span").scrollTo(focused_task_id);
  store.commit("deleteTask", data);
  writeData();
}

function handleTaskAppend(isBackBurner){
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
    "focused_textcard_idx": focused_textcard_idx
  };
  if (data.curPage == "week")
    data["focused_task_time"] = focused_task_time;

  (async (store) => {
    const {value: new_task_name } = await Swal.fire({
      input: 'text',
      title: "Append Task",
      inputPlaceholder: 'New task name?',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      icon: 'info',
      showCancelButton: true
    });
    if (new_task_name) {

      let new_task_category = "none";
      if(curPage != "categories"){
        let category_data = getCategoriesAlt();
        const { value: new_new_task_category } = await Swal.fire({
          title: "Categorize task (optional)",
          input: "select",
          inputOptions: category_data
        });
        new_task_category = new_new_task_category;
      }

      undo_tasks.push(JSON.stringify(store.state.todo));
      store.commit("pushTask", {
        ...data, 
        "task": {
          "taskName": new_task_name, 
          "category": new_task_category, 
          "description": "", 
          "completed": false
        }
      });
      writeData();
    }
  })(store);
}

function handleTaskCopy(isBackBurner){
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
    "focused_textcard_idx": focused_textcard_idx, 
    "focused_task_idx": focused_task_idx
  };
  if (isBackBurner){
    copied_task = store.state.todo[data.curPage][focused_task_idx]; 
  }
  else if (data.curPage == "week"){
    data["focused_task_time"] = focused_task_time;
    copied_task = store.state.todo[curPage][focused_task_time][focused_textcard_idx][focused_task_idx];
  }
  else if (data.curPage == "categories")
    copied_task = store.state.todo[data.curPage][data.focused_textcard_idx]["categories"][data.focused_task_idx];
}

function handleTaskCut(isBackBurner){
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
    "focused_textcard_idx": focused_textcard_idx, 
    "focused_task_idx": focused_task_idx
  };
  if (isBackBurner){
    copied_task = store.state.todo[data.curPage][focused_task_idx]; 
  }
  else if (data.curPage == "week"){
    data["focused_task_time"] = focused_task_time;
    copied_task = store.state.todo[curPage][focused_task_time][focused_textcard_idx][focused_task_idx];
  }
  else if (data.curPage == "categories")
    copied_task = store.state.todo[data.curPage][data.focused_textcard_idx]["categories"][data.focused_task_idx];

  undo_tasks.push(JSON.stringify(store.state.todo));
  focused_task_idx = Math.max(0, focused_task_idx-1);
  let focused_task_id = $(focused_textcard_id).find('li')[focused_task_idx];
  $(focused_task_id).addClass("kevinFocus");
  $(focused_textcard_id).find("span").scrollTo(focused_task_id);
  store.commit("deleteTask", data);
  writeData();
}

function handleTaskInsert(isBackBurner){
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
    "focused_textcard_idx": focused_textcard_idx, 
    "focused_task_idx": focused_task_idx, 
    "task": copied_task
  };
  if (data.curPage == "week")
    data["focused_task_time"] = focused_task_time;

  undo_tasks.push(JSON.stringify(store.state.todo));
  store.commit("insertTask", data);
  writeData();
}

function handleTaskToggle(isBackBurner){
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
    "focused_textcard_idx": focused_textcard_idx,
    "focused_task_idx": focused_task_idx, 
  };
  if (data.curPage == "week"){
    data["focused_task_time"] = focused_task_time;
  }
  if (data.curPage == "categories")
    return;
  undo_tasks.push(JSON.stringify(store.state.todo));
  store.commit("toggleTask", data);
  writeData();
}

function handleTaskNavigation(key_down){
  if (focused_tasks.length == 0)
    return;

  $($(focused_textcard_id).find('li')[focused_task_idx]).removeClass("kevinFocus");

  if (key_down == "j")
    focused_task_idx = Math.min(focused_task_idx+1, focused_tasks.length-1);
    // focused_task_idx = (focused_task_idx + 1) % focused_tasks.length;
  else if (key_down == "k") 
    focused_task_idx = Math.max(focused_task_idx-1, 0);
    // focused_task_idx = (focused_task_idx - 1 + focused_tasks.length) % focused_tasks.length;

  let focused_task_id = $(focused_textcard_id).find('li')[focused_task_idx];
  $(focused_task_id).addClass("kevinFocus");
  $(focused_textcard_id).find("span").scrollTo(focused_task_id);
}

function handleStickyNoteEdit(){
  focused_task_time = getToDoTimeKey(curPage, time_offset);

  (async (store) => {
    let old_note = store.state.todo[curPage][focused_task_time][focused_textcard_idx];
    const {value: new_note } = await Swal.fire({
      input: 'textarea',
      title: "edit description",
      inputValue: old_note,
      inputPlaceholder: 'yay! write some stuff here.',
      inputAttributes: {
        'aria-label': 'new task name'
      },
      icon: 'success',
      showCancelButton: true
    });
    if (new_note){
      undo_tasks.push(JSON.stringify(store.state.todo));
      store.commit("modifyStickyNote", {
        "curPage": curPage, 
        "focused_task_time": focused_task_time, 
        "focused_textcard_idx": focused_textcard_idx, 
        "new_note": new_note
      });
      writeData();
    }
  })(store);
}

function handleRenameCategory(){
  (async (store) => {
    const {value: new_category_name } = await Swal.fire({
      input: 'text',
      title: 'New (meta)Category Name?',
      inputPlaceholder: 'category XXX',
      icon: 'warning',
      showCancelButton: true
    });
    if (new_category_name) {
      store.commit("updateCategoryName", {"idx": focused_textcard_idx, "newName": new_category_name})
      writeData();
    }
  })(store);
}

function handleEditDescription(isBackBurner){
  let old_description;
  let data = {
    "curPage": isBackBurner ? "backBurner" : curPage,
    "focused_textcard_idx": focused_textcard_idx,
    "focused_task_idx": focused_task_idx, 
  };

  if (isBackBurner){
    old_description = store.state.todo[data.curPage][focused_task_idx]["description"];
  }
  else if (data.curPage == "week"){
    old_description = store.state.todo[curPage][focused_task_time][focused_textcard_idx][focused_task_idx]["description"];
    data["focused_task_time"] = focused_task_time;
  }

  (async (store) => {
    const {value: new_description } = await Swal.fire({
      input: 'textarea',
      title: 'New description',
      inputPlaceholder: "description",
      inputValue: old_description,
      icon: 'warning',
      showCancelButton: true
    });
    if (new_description) {
      undo_tasks.push(JSON.stringify(store.state.todo));
      store.commit("updateTaskDescription", {
        ...data, 
        "new_description": new_description
      });
      writeData();
    }
  })(store);
}


let zoomed_in = false; // where are you navigating
let curPage = getCurrentPage();
let focus_coord = {"row": 0, "col": 0}; // detect current date?
let focused_textcard_idx = 0;
let focused_textcard_id = "#textcard_0_0";
let focused_tasks = [];
let focused_task_idx = 0;
let focused_task_time = "2020";
let time_offset = 0;
let copied_task = null;
let undo_tasks = []; // for now at least: stores JSON.stringify of the state

$(focused_textcard_id).addClass("alekFocus");
(() => {
  let new_time = getToDoTimeKey(curPage, time_offset);
  store.commit("timeChange", {"new_time": new_time, "curPage": curPage});
  writeData();
})();


