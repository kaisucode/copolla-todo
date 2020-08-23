import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    idx: -1,
    todo: {
      "week": {
        "2020-8-1":  [
            [ { "taskName": "play theland", 
              "category": "gaming", 
              "subtasks": [{ "subtaskName": "kill 3 animals", "completed": true }, { "subtaskName": "kill 2 animals", "completed": false }] }, 
            { "taskName": "play hollow knight", 
              "category": "gaming", 
              "subtasks": [{ "subtaskName": "kill 3 animals", "completed": true }, { "subtaskName": "kill 2 animals", "completed": false }] }
            ], 
            [{ "taskName": "incorporate SQL", "category": "rails", "subtasks": [] }], 
            [], 
            [], 
            [], 
            [], 
            []
          ]
      }, 
      "month": {
        "2020-8": ["blah", "blah", "blah", "blah", "blah", "blah"]
      }, 
      "year": {
        "2020": ["blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah"]
      }, 
      "categories": [
        {"name": "research", "style": "green", "categories": ["rails", "ruby"]}, 
        {"name": "learn", "style": "blue", "categories": ["aasddf"]}, 
        {"name": "code", "style": "red", "categories": ["bruh"]}, 
        {"name": "read", "style": "yellow", "categories": ["project-project"]}
      ], 
      "backBurner": [{ 
        "taskName": "watch sherlock again", 
        "taskDescription": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", 
        "category": "gaming", 
        "subtasks": [{ "subtaskName": "kill 3 animals", "completed": true }, { "subtaskName": "kill 2 animals", "completed": false }] 
      }]
    }
  }, 
  mutations: {
    setIdx (state, idx) {
      state.idx = idx;
    },
    initRead(state, read_state){
      state.todo = read_state;
      // yay this works!!!!
    },
    pushTask(state, data){
      if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].push(data.task);
      else if (data.curPage == "categories")
        store.state.todo[data.curPage][data.focused_textcard_idx]["categories"].push(data.task.taskName);
    }, 
    insertTask(state, data){
      if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].splice(data.focused_task_idx+1, 0, data.task);
      else if (data.curPage == "categories"){
        store.state.todo[data.curPage][data.focused_textcard_idx]["categories"].splice(data.focused_task_idx+1, 0, data.task);
      }
    }, 
    deleteTask(state, data){
      if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].splice(data.focused_task_idx, 1);
      else if (data.curPage == "categories")
        Vue.delete(state.todo[data.curPage][data.focused_textcard_idx]["categories"], data.focused_task_idx);
    }, 
    editTask(state, data){
      if (data.curPage == "week")
        store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx][data.focused_task_idx]["taskName"] = data.new_task_name;
      else if (data.curPage == "categories")
        Vue.set(state.todo[data.curPage][data.focused_textcard_idx]["categories"], data.focused_task_idx, data.new_task_name);
    }, 

    // This is for (a) changing the data in a week of a specific month (e.g., first week of august), or (b) changin the data in a month of a specific year (e.g., august of 2020)
    modifyStickyNote(state, data){
      Vue.set(state.todo[data.curPage][data.focused_task_time], data.focused_textcard_idx, data.new_note)
    }
  }, 

});

export default store;

