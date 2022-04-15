import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: [],
    updateItem: null
  },
  getters: {
    todoList: state => state.todoList,
    getUpdateItem: state => state.updateItem,
  },
  actions: {
    updateTodoList({getters, commit}, payload) {
      let currentList = [...getters.todoList]
      const action = payload.action
      const item = payload.item

      switch (action.name) {
        case 'remove':
          currentList.splice(action.pos, 1)
          break;

        case 'update':
          const pos = currentList.indexOf(getters.currentItem)
          currentList[pos] = payload
          break;

        case 'remove':
          currentList.splice(action.pos, 1)
          break;
  
        default:
          currentList.push(item)
          break;
      }

      commit('setTodoList', currentList)
    },
    updateTodoItem({getters, commit}, index) {
      const item = getters.todoList[index]
      commit('setTodoItem', item)
    }
  },
  mutations: {
    setTodoList (state, payload) {
      state.todoList = payload
    },
    setTodoItem (state, payload) {
      state.updateItem = payload
    }
  },
  modules: {
  }
})
