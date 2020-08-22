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
    },
    pushTask(state, curPage, focused_task_time, focus_textcard_idx, task){
      store.state.todo[curPage][focused_task_time][focus_textcard_idx].push(task);
    }, 
    deleteTask(state, curPage, focused_task_time, focus_textcard_idx){
      delete store.state.todo[curPage][focused_task_time][focus_textcard_idx];
    }
  }
});

export default store;

