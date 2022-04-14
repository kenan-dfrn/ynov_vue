<template>
  <div>
    <span v-if="error">{{error}}</span>
    <select v-model="form.owner">
      <option v-for="(owner, index) in ownerList" :key="`owner-select-${index}`" :value="owner">{{ owner }}</option>
    </select>
    <input v-model="form.title" type="text">
    <input v-model="form.time" type="number">
    <button @click="addToTodo">{{ toUpdate ? 'update' : 'add'}}</button>
  </div>
</template>

<script>
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
  props: {
    toUpdate: { type: Object, default: () => null}
  },
  updated () {
    if (this.toUpdate) {
      this.form = this.toUpdate
    }
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

      this.toUpdate ? this.$emit('updateTodo', {...this.form}) : this.$emit('addTodo', {...this.form})
      Object.assign(this.$data, this.$options.data())
    }
  },
}
</script>

<style lang="scss">

</style>