<template>
  <header class="header d-flex">
      <span class="logo">E-Shop</span>
      <input type="text" v-model="search" class="search" placeholder="Search..." />
      <button @click="handleClick" type="button" class="cart-button">Корзина</button>
      <div v-if="isCartVisible" class="cart">
          <div class="cart-item" v-for="item in cartGoods" :key="item.product_name">
              <p class="cart-item__title">{{item.product_name}}</p>
              <p>{{item.quantity}} x {{item.price}}</p>
          </div>
      </div>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['search', 'isCartVisible', 'cartGoods'],
  methods: {
    handleClick() {
      this.$emit('change-is-cart-visible');
    }
  }
}
</script>
