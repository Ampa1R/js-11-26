<template>
  <div class="item">
    <div class="pic"></div>
    <h4>{{ item.product_name }}</h4>
    <p v-if="item.price">Цена: {{ item.price }}</p>
    <p v-else>Цена по запросу</p>
    <button class="add-button" v-on:click="handleAddToCart">Купить</button>
  </div>
</template>

<script>
export default {
  name: "CatalogueItem",

  props: {
    item: Object,
    default: {
      id: -1,
      product_name: 'Нет данных',
      price: 0
    }
  },

  methods: {
    handleAddToCart() {
      this.$emit('btn-addToCart', this.item)
    }
  }
}
</script>

<style scoped>
.item {
    border: 1px solid black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.item .pic {
    height: 80px;
    width: 80px;
    border: 1px solid black;
}
</style>