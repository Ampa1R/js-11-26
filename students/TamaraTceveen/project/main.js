import Vue from 'vue/dist/vue.js';
import error from './components/error.vue';
import header from './components/header.vue';
import search from './components/search.vue';
import basket from './components/basket.vue';
import goods from './components/goods.vue';
import item from './components/item.vue';

console.log(header);

const API = 'http://localhost:3000/api';

const sendRequest = (path, method = 'GET', body = {}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
      console.log('timeout!');
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.log('Error! not 200', xhr.responseText, xhr.status);
          reject('Error!', xhr.responseText);
        }
      }
    }

    xhr.open(method, `${API}/${path}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(body));
  });
}

new Vue({
    el: '#app',
    data: {
      goods: [],
      basketGoods: [],
      searchValue: '',
      isVisible: false,
      errorMessage: '',
    },
    components: {
        'v-error': error,
        'v-header': header,
        'v-search': search,
        'v-basket': basket,
        'v-goods': goods,
        'v-item': item
    },
    mounted() {
      this.fetchData();
      this.fetchBasketData();
    },
    methods: {
      fetchData() {
        return new Promise((resolve, reject) => {
          sendRequest('catalog')
            .then((data) => {
              this.goods = data;
              resolve();
            })
            .catch((error) => {
              this.errorMessage = 'Не удалось получить список товаров'
            });
        });
      },
      fetchBasketData() {
        return new Promise((resolve, reject) => {
          sendRequest('basket')
            .then((data) => {
              this.basketGoods = data;
              resolve();
            })
            .catch((error) => {
              this.errorMessage = 'Не удалось получить список товаров'
            });
        });
      },
      addToBasket(item) {
        sendRequest('basket', 'POST', item)
          .then((result) => {
            console.log('Result', result);
            if (!result.success) {
              console.log('addToBasket Error');
              return;
            }
  
            const index = this.basketGoods.findIndex((basketItem) => basketItem.id === item.id);
            if (index > -1) {
              this.basketGoods[index].quantity += 1;
            } else {
              this.basketGoods.push({ ...item, quantity: 1 });
            }
          })
          .catch((error) => {
            this.errorMessage = 'Не удалось добавить список товаров!';
          });
      },
      removeItem(id) {
        sendRequest(`basket/${id}`, 'DELETE')
          .then((result) => {
            console.log('Result', result);
            if (!result.success) {
              console.log('addToBasket Error');
              return;
            }
            this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(id));
            console.log(this.basketGoods);
          })
          .catch((error) => {
            this.errorMessage = 'Не удалось удалить элемент из корзины'
          });
      },
    },
    computed: {
      filteredGoods() {
        const regexp = new RegExp(this.searchValue.trim(), 'i');
        return this.goods.filter((goodsItem) => regexp.test(goodsItem.title));
      },
      totalPrice() {
        return this.goods.reduce((acc, curVal) => {
          return acc + curVal.price;
        }, 0);
      }
    }
  })