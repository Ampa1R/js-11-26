<template>
  <section class="cart"
           v-bind:isVisibleCart="isVisibleCart"
           v-show="isVisibleCart"
           @btn-deleteItem="handleDeleteItem"
  >

    <h3 v-if="!cart.length">Нет Данных</h3>
    <section class="cartLineTotal" v-if="cart.length">
      <p>Всего предметов: {{ cartTotalGoods }}</p>
      <button @click="handleClearCart">Очистить корзину</button>
      <p>На общую цену: {{ cartTotalPrice }}</p>
    </section>
    <section class="cartItemsContainer" v-show="cart.length">
      <v-cart-item v-for="el in cart" :key="el.id" v-bind:item="el"/>
    </section>
  </section>
</template>

<script>
import CartItem from "./cartItem";

export default {
  name: "Cart",
  components: {
    'v-cart-item': CartItem
  },
  props: {
    cart: {
      type: Array,
      required: false,
      default() {
        return {
          contents: []
        }
      }
    },
    cartTotalGoods: {
      type: Number,
      default() {
        return 0;
      }
    },
    cartTotalPrice: {
      type: Number,
      default() {
        return 0;
      }
    },

    isVisibleCart: {
      type: Boolean,
      required: false
    }
  },

  methods: {
    handleClearCart() {
      this.$emit('clearCart')
    },

    handleDeleteItem(input) {
      console.log('cartEvent');
      this.$emit('btn-deleteItem', input)
    }
  }
}
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1vh 1vw;
}

.cartItemsContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2vh 2vw;
  border: 1px solid darkcyan;
}

.cartLineTotal {
  display: flex;
  justify-content: space-between;
}
</style>