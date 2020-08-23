import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    times: {
      "week": "2020-33",
      "month": "2020-8",
      "year": "2020"
    },
    todo: {
      "week": {
        "2020-33":  [ [], [], [], [], [], [], [] ]
      }, 
      "month": {
        "2020-8": ["", "", "", "", "", ""]
      }, 
      "year": {
        "2020": ["", "", "", "", "", "", "", "", "", "", "", ""]
      }, 
      "categories": [
        {"name": "research", "color": "green", "categories": []}, 
        {"name": "learn", "color": "blue", "categories": []}, 
        {"name": "code", "color": "red", "categories": []}, 
        {"name": "read", "color": "yellow", "categories": []}
      ], 
      "backBurner": []
    }
  }, 
  getters: {
    getCategoryColor : (state) => (category) => {
      for (var cat in store.state.todo.categories) {
        if(store.state.todo.categories[cat].categories.includes(category)){
          return store.state.todo.categories[cat].color;
        }
      }
      return "white";
    },
    getCategoryTaskList: (state) => (category) => { 
      let tasklist = [];
      for (var date in store.state.todo.week) {
        for (var textcard in store.state.todo.week[date]) {
          for (var taskidx in store.state.todo.week[date][textcard]) {
            let task = store.state.todo.week[date][textcard][taskidx];
            if(task.category == category)
              tasklist.push(task.taskName);
          }
        }
      }
      return tasklist;
    },
    getMetacategoryTaskList: (state) => (metacategory, metacategoryindex) => {
      let tasklist = {};
      for (var date in store.state.todo.week) {
        for (var textcard in store.state.todo.week[date]) {
          for (var taskidx in store.state.todo.week[date][textcard]) {
            let task = store.state.todo.week[date][textcard][taskidx];
            if(store.state.todo.categories[metacategoryindex].categories.includes(task.category)){
              if(tasklist[task.category])
                tasklist[task.category].push(task.taskName);
              else
                tasklist[task.category] = [task.taskName];
            }
          }
        }
      }
      return tasklist;
    }
  },
  mutations: {
    updateCategoryName (state, data) {
      store.state.todo.categories[data.idx].name = data.newName;
    },
    initRead(state, read_state){
      state.todo = read_state;
    },
    pushTask(state, data){
      if (data.curPage == "backBurner")
        store.state.todo[data.curPage].push(data.task);
      else if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].push(data.task);
      else if (data.curPage == "categories")
        store.state.todo[data.curPage][data.focused_textcard_idx]["categories"].push(data.task.taskName);
    }, 
    insertTask(state, data){
      if (data.curPage == "backBurner")
        store.state.todo[data.curPage].splice(data.focused_task_idx+1, 0, data.task);
      else if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].splice(data.focused_task_idx+1, 0, data.task);
      else if (data.curPage == "categories"){
        store.state.todo[data.curPage][data.focused_textcard_idx]["categories"].splice(data.focused_task_idx+1, 0, data.task);
      }
    }, 
    deleteTask(state, data){
      if (data.curPage == "backBurner")
        store.state.todo[data.curPage].splice(data.focused_task_idx, 1);
      else if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].splice(data.focused_task_idx, 1);
      else if (data.curPage == "categories")
        Vue.delete(state.todo[data.curPage][data.focused_textcard_idx]["categories"], data.focused_task_idx);
    }, 
    editTask(state, data){
      if (data.curPage == "backBurner")
        store.state.todo[data.curPage][data.focused_task_idx]["taskName"] = data.new_task_name;
      else if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx][data.focused_task_idx]["taskName"] = data.new_task_name;
      else if (data.curPage == "categories")
        Vue.set(state.todo[data.curPage][data.focused_textcard_idx]["categories"], data.focused_task_idx, data.new_task_name);
    }, 

    updateTaskDescription(state, data){
      if (data.curPage == "backBurner")
        store.state.todo[data.curPage][data.focused_task_idx]["description"] = data.new_description;
      else if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx][data.focused_task_idx]["description"] = data.new_description;
    }, 

    // This is for (a) changing the data in a week of a specific month (e.g., first week of august), or (b) changin the data in a month of a specific year (e.g., august of 2020)
    modifyStickyNote(state, data){
      Vue.set(state.todo[data.curPage][data.focused_task_time], data.focused_textcard_idx, data.new_note)
    },
    timeChange(state, data) {
      state.times[data.curPage] = data.new_time;
      console.log("TIME CHANGE");

      if(!state.todo[data.curPage][data.new_time]){
        if(data.curPage=="week") 
          state.todo[data.curPage][data.new_time] = [ [], [], [], [], [], [], [] ];
        else if(data.curPage == "month")
          state.todo[data.curPage][data.new_time] = ["", "", "", "", "", ""];
        else if(data.curPage == "year")
          state.todo[data.curPage][data.new_time] = ["", "", "", "", "", "", "", "", "", "", "", ""];
      }
    }
  }, 

});

export default store;

