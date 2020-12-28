<template>
  <section class="catalogue" v-if="goods.length">
    <h3 v-if="!goods.length">Нет Данных</h3>
      <v-catalogue-item v-for="el in goods" :key="el.id" v-bind:item="el"
                        v-on:btn-addToCart="handleAddToCart"/>
  </section>
</template>

<script>
import CatalogueItem from './catalogueItem';

export default {
  name: "catalogue",

  components: {
    'v-catalogue-item': CatalogueItem
  },

  props: {
    goods: Array,
    default() {
      return []
    }
  },

  methods: {
    handleAddToCart(input) {
      this.$emit('btn-addToCart', input)
    }
  }
}
</script>

<style scoped>
.catalogue {
  padding: 2vh 2vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid green;
}
</style>