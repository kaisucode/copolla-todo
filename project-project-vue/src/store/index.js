import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0, 
    todo: {
      "week": {
        2020: {
          8: [
            [{ 
              "taskName": "play theland", 
              "taskDescription": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", 
              "category": "gaming", 
              "subtasks": [{ "subtaskName": "kill 3 animals", "completed": true }, { "subtaskName": "kill 2 animals", "completed": false }] 
            }], 
            [], 
            [], 
            [], 
            [], 
            [], 
            []
          ]
        }
      }, 
      "month": {
        2020: {
          8: ["blah", "blah", "blah", "blah", "blah", "blah"]
        }
      }, 
      "year": {
        2020: ["blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah", "blah"]
      }, 
      "categories": [
        {"name": "CS_eg", "style": "green", "tasks": [{"name": "project-project"}]}, 
        {"name": "Gaming_eg", "style": "pink", "tasks": [{"name": "project-project"}]}, 
        {"name": "unlisted", "style": "brown", "tasks": [{"name": "project-project"}]}
      ], 
      "back-burner": [{ 
        "taskName": "play theland", 
        "taskDescription": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", 
        "category": "gaming", 
        "subtasks": [{ "subtaskName": "kill 3 animals", "completed": true }, { "subtaskName": "kill 2 animals", "completed": false }] 
      }], 
    },  
  },
  mutations: {
    increment (state) {
      state.count++
      console.log(state.count);
    }
  }
});

export default store;
