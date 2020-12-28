<template>
  <div class="item">
    <div class="pic"></div>
    <h4>{{ item.product_name }}</h4>
    <p v-if="item.price >= 0">Цена: {{ item.price }}</p>
    <p> В корзине: {{ item.quantity }}</p>
    <input type="button" value="Убрать из корзины" class="remove-button" @click="handleDeleteItem">
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: Object,
    default: {
      id: -1,
      product_name: 'Нет данных',
      price: -1,
      quantity: 0
    }
  },

  methods:{
    handleDeleteItem(){
      this.$emit('btn-deleteItem', this.item.id);
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