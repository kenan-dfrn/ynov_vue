<template>
<div>
  <table id="customers">
    <tr>
      <th>Responsable</th>
      <th>Tâche</th>
      <th>Heures</th>
      <th>utilitaires</th>
    </tr>
    <tr v-for="(todo, index) in todoList" :key="`todo-${index}`" @click="select(index)">
      <td v-for="(item, index) in todo" :key="`todo-${index}`">{{item}}</td>
      <td>
        <span @click="updateTodo(index)">modif</span>
        <span @click="removeTodo(index)">supp</span>
      </td>
    </tr>
  </table>
  <p>total : {{list.length}} todo</p>
  <p>selection : {{selectedTodo.length}} todo</p>
  <button @click="removeSelected()">Supprimer la selection</button>
</div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    list: { type: Array, default: () => []}
  },
  data () {
    return {
      selectedTodo: []
    }
  },
  computed: {
    ...mapGetters(['todoList'])
  },
  methods: {
    updateTodo (index) {
      this.$store.dispatch('updateTodoItem', index)
    },
    removeTodo (index) {
      const action = { name: 'remove', pos: index}
      this.$store.dispatch('updateTodoList', { action, item: {}})
    },
    select (index) {
      if (this.selectedTodo.includes(index)) {
        const pos = this.selectedTodo.indexOf(index)
        this.selectedTodo.splice(pos, 1)
        return
      }
      this.selectedTodo.push(index)
    },
    removeSelected () {
      this.selectedTodo.sort((a, b) => b > a)
      this.selectedTodo.map(item => this.removeTodo(item))
      this.selectedTodo = []
    }
  },
}
</script>

<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #04AA6D;
  color: white;
}

#customers td span {
  margin-left: 15px;
}
</style>