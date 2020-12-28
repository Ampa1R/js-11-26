<template>
  <div id="app">
    <v-header @btn-srch="handleSearchButton"
              v-bind:cart="this.cart"
              :cartTotalPrice="this.cartTotalPrice"
              :cartTotalGoods="this.cartTotalGoods"
              @clearCart="handleClearCart"
              @btn-deleteItem="handleDeleteItem"
    />
    <main>
      <v-catalogue v-bind:goods="filteredGoods" @btn-addToCart="addToCart"/>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'

import Header from './components/header.vue'
import Catalogue from './components/catalogue.vue'


// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API = 'http://localhost:8080/api'

export default {
  name: 'App',

  components: {
    'v-header':Header,
    'v-catalogue':Catalogue
  },

  data() {
    return {
      goods: [],
      cart: [],
      cartTotalPrice: 0,
      cartTotalGoods: 0,
      searchValue: ''
    }
  },

  methods: {

    fetchData() {
      fetch(`${API}/catalogue`)
          .then(response => response.json())
          .then(data => {
            data.forEach((e, i) => {
              const el = {
                id: i + 1,
                product_name: e.product_name,
                price: e.price
              }
              this.goods.push(el);
            });
          })
          .catch(e => console.log(e));
    },

    fetchCartData() {
      fetch(`${API}/cart`)
          .then(response => response.json())
          .then(data => {
            this.cartTotalPrice = data.reduce((acc, val) =>{
              return acc + val.price * val.quantity;
            },0);
            this.cartTotalGoods = data.reduce((acc, val) =>{
              return acc + val.quantity
            },0);
            data.forEach((e) => {
              const el = {
                id: e.id,
                product_name: e.product_name,
                price: e.price,
                quantity: e.quantity
              }
              this.cart.push(el);
            });
          })
          .catch(e => console.log(e));

    },

    async addToCart(data) {
      try {
        const response = await fetch(`${API}/cartAdd`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        console.log('Успех', json)
      } catch (e) {
        console.log(e);
      }
      this.fetchCartData();
    },

    handleSearchButton(input) {
      this.searchValue = input;
    },

    handleClearCart() {
      fetch(`${API}/clearCart`)
          .then(response => response.json())
          .then(data => {
            console.log('success' + data);
          })
          .catch(e => console.log('1123' + e));

      this.fetchCartData();
    },

    async handleDeleteItem(data) {
      try {
        const response = await fetch(`${API}/deleteItem/${data}`,{
          method: 'DELETE'
        });
        const json = await response.json();
        console.log('Успех', json)
      } catch (e) {
        console.log(e);
      }

      this.fetchCartData();
    }
  },

  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchValue.trim(), 'i');
      return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
    },
  },

  mounted() {
      this.fetchData();
      this.fetchCartData();
    },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  height: 100vh;
  /*border: 1px solid orange;*/
  padding: 5vh 5vw;
  margin: 0 5vw;
}
</style>