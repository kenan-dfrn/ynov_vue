<template>
  <div>
    <span v-if="error">{{error}}</span>
    <select v-model="form.owner">
      <option v-for="(owner, index) in ownerList" :key="`owner-select-${index}`" :value="owner">{{ owner }}</option>
    </select>
    <input v-model="form.title" type="text">
    <input v-model="form.time" type="number">
    <button @click="addToTodo">{{ getUpdateItem ? 'update' : 'add'}}</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {
        owner: '',
        title: '',
        time: 0
      },
      error: '',
      ownerList: [ 'kenan', 'julien', 'marine' ]
    }
  },

  computed: {
    ...mapGetters(['getUpdateItem']),
  },
  methods: {
    addToTodo() {
      if (!this.form.title || !this.form.owner) {
        this.error = 'Veuillez remplir tous les champs'
        return
      }

      if (!this.form.time >= 1) {
        this.error = 'La tache ne doit pas être inférieur à 1 heure'
        return
      } else if (this.form.time > 10) {
        this.error = 'La tache ne doit pas être supérieure à 10 heure'
        return
      }

      let action = {}
      this.getUpdateItem ? action = { name: 'update', pos: null } :  action = { name: 'add', pos: null }

      this.$store.dispatch('updateTodoList', { action, item: {...this.form}} )
      Object.assign(this.$data, this.$options.data())
    }
  },
}
</script>

<style lang="scss">

</style>