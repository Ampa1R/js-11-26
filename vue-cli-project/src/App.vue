<template>
  <div id="app">
    <Header
      v-bind:search="searchValue"
      :is-cart-visible="isVisible"
      :cart-goods="basketGoods"
      @change-is-cart-visible="isVisible = !isVisible"
    ></Header>
    <Goods v-bind:goods="filteredGoods" v-on:add="addToBasket"></Goods>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Goods from "./components/Goods.vue";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const sendRequest = (path) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
      console.log('timeout!');
    }

    xhr.onreadystatechange = () => {
      // console.log('ready state change', xhr.readyState);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.log('Error!', xhr.responseText);
          reject(xhr.responseText);
        }
      }
    }

    xhr.open('GET', `${API}/${path}`);

    // xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
  });
}

export default {
  name: "App",
  components: {
    Header,
    Goods,
  },
  data() {
    return  {
      goods: [],
      basketGoods: [],
      searchValue: '',
      isVisible: true,
    }
  },
  mounted() {
    this.fetchData();
    this.fetchBasketData();
  },
  methods: {
    fetchData() {
      return new Promise((resolve) => {
        sendRequest('catalogData.json')
          .then((data) => {
            this.goods = data;
            resolve();
          });
      });
    },
    fetchBasketData() {
      return new Promise((resolve) => {
        sendRequest('getBasket.json')
          .then((data) => {
            this.basketGoods = data.contents;
            resolve();
          });
      });
    },
    addToBasket(item) {
      const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
      if (index > -1) {
        this.basketGoods[index].quantity += 1;
        // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
      } else {
        this.basketGoods.push(item);
      }
      console.log(this.basketGoods);
    },
    removeItem(id) {
      this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
      console.log(this.basketGoods);
    },
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchValue.trim(), 'i');
      return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
    },
  },
};
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafc;
}

header {
  display: flex;
  background: #fff;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.cart-button {
  border: none;
  border-radius: 20px;
  padding: 7px 20px;
  background: #0b5bb8;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  color: #fff;
}

.cart-button:focus {
  outline: none;
  background: #0c50a0;
}

.cart-button:hover {
  background: #3b7eb9;
}

.goods {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  flex-basis: calc(25% - 40px);
  margin: 20px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
}

.cart {
  position: absolute;
  right: 30px;
  top: 70px;
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  width: 300px;
}

.cart-item {
  margin-bottom: 20px;
}

.cart-item__title {
  font-weight: bold;
}
</style>
