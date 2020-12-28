<template>
  <div>
    <header>
      <span class="logo">E-Shop</span>

      <v-search @btn-srch="handleSearchButton"/>
      <button type="button" class="cart-button" v-on:click="isVisibleCart = !isVisibleCart" v-if="isVisibleCart">Скрыть
        корзину
      </button>
      <button type="button" class="cart-button" v-on:click="isVisibleCart = !isVisibleCart" v-if="!isVisibleCart">
        Показать
        корзину
      </button>
    </header>
    <v-cart v-bind:cart="cart"
            :is-visible-cart="isVisibleCart"
            :cartTotalPrice="cartTotalPrice"
            :cartTotalGoods="cartTotalGoods"
            @clearCart="handleClearCart"
            @btn-deleteItem="handleDeleteItem"
    />


  </div>
</template>

<script>
import Search from './search'
import Cart from './cart'


export default {
  name: "Header",

  components: {
    'v-cart': Cart,
    'v-search': Search
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
    searchInput: {
      type: String,
    }
  },

  methods: {
    handleSearchButton(input) {
      this.$emit('btn-srch', input)
    },

    handleClearCart() {
      this.$emit('clearCart')
    },

    handleDeleteItem(input) {
      console.log('headerEvent')
      this.$emit('btn-deleteItem', input);
    }
  },

  data() {
    return {
      isVisibleCart: true
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5vh;
  border: 1px solid crimson;
  padding: 2vh 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-button {
  cursor: pointer;
  height: 5vh;
  width: 10vw;
  border-radius: 10px;
}
</style>