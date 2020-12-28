<template>
  <section class="searchLine">
    <label for="search">Поиск</label>
    <input type="text" id="search" v-model="searchInput">
    <button @click="handleSearchButton">Найти</button>
  </section>
</template>


<script>

export default {
  name: "Search",

  data() {
    return {
      searchInput: ''
    }
  },

  methods: {
    handleSearchButton() {
      this.$emit('btn-srch', this.searchInput)
    }
  }

}
</script>

<style scoped>

</style>