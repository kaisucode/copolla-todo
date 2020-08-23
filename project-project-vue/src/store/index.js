import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0, 
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
      "metaCategories": [
        {"name": "CS_eg", "style": "green", "categories": ["rails", "ruby"]}, 
        {"name": "Gaming_eg", "style": "pink", "categories": ["project-project"]}, 
        {"name": "unlisted", "style": "brown", "categories": ["project-project"]}
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
    increment (state) {
      state.count++
      console.log(state.count);
    }, 
    setIdx (state, idx) {
      state.idx = idx;
    },
    initRead(state, read_state){
      state.todo = read_state;
      // yay this works!!!!
    },
    pushTask(state, data){
      store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].push(data.task);
    }, 
    insertTask(state, data){
      store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].splice(data.focused_task_idx+1, 0, data.task);
    }, 
    deleteTask(state, data){
      store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx].splice(data.focused_task_idx, 1);
    }, 
    editTask(state, data){
      store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx][data.focused_task_idx]["taskName"] = data.new_task_name;
    }, 

    // This is for (a) changing the data in a week of a specific month (e.g., first week of august), or (b) changin the data in a month of a specific year (e.g., august of 2020)
    modifyStickyNote(state, data){
      // store.state.todo[data.curPage][data.focused_task_time][data.focused_textcard_idx] = data.new_note;
      Vue.set(state.todo[data.curPage][data.focused_task_time], data.focused_textcard_idx, data.new_note)
    }
  }, 

});

export default store;

