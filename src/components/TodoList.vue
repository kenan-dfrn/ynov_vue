<template>
<div>
  <table id="customers">
    <tr>
      <th>Responsable</th>
      <th>Tâche</th>
      <th>Heures</th>
      <th>utilitaires</th>
    </tr>
    <tr v-for="(todo, index) in list" :key="`todo-${index}`" @click="select(index)">
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
export default {
  props: {
    list: { type: Array, default: () => []}
  },
  data () {
    return {
      selectedTodo: []
    }
  },
  methods: {
    updateTodo (index) {
      this.$emit('updateTodo', index)
    },
    removeTodo (index) {
      this.$emit('removeTodo', index)
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