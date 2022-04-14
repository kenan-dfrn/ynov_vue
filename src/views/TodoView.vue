<template>
  <div>
    <h1>Ma p'tite todolist</h1>

    <TodoAdd @addTodo="add($event)" @updateTodo="update($event)" :toUpdate="updateItem"  />
    <TodoList :list="todoList" @updateTodo="select($event)" @removeTodo="remove($event)"/>

  </div>
</template>

<script>
import TodoAdd from '@/components/TodoAdd.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  components: { TodoAdd, TodoList },
  data () {
    return {
      todoList: [],
      updateItem: null,
      currentItem: null
    }
  },
  methods: {
    add(event) {
      this.todoList.push(event)
    },
    select(event) {
      this.updateItem = {...this.todoList[event]}
      this.currentItem = event
    },
    update(event) {
      this.$set(this.todoList, this.currentItem, event)
      this.updateItem = null
      this.currentItem = null
    },
    remove(event) {
      this.todoList.splice(event, 1)
    }
  },
}
</script>

<style>

</style>