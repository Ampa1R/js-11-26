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

Vue.component('v-error', {
  props: ['message'],
  template: `
    <div class="error">
    Ошибка! {{message}}
    </div>
  `
});

Vue.component('v-header', {
  template: `
    <header class="header center">
      <span class="logo">E-shop</span>
      <slot />
      <button @click="handleClick" type="button" class="cart-button">Корзина</button>
      <slot name="basket" />
    </header>
  `,
  methods: {
    handleClick() {
      this.$emit('change-is-cart-visible');
    }
  }
});

Vue.component('v-search', {
  props: ['searchValue'],
  template: `
    <input type="text" 
    v-bind:value="searchValue"
    v-on:input="$emit('input', $event.target.value)" 
    class="search" placeholder="Search..." />
  `,
})


Vue.component('v-basket', {
  props: ['goods'],
  template: `
    <div class="cart">
      <div class="cart-item" v-for="item in goods">
        <p>{{item.title}}</p>
        <p>{{item.quantity}} x {{item.price}}</p>
        <button @click="$emit('delete', item.id)">Удалить</button>
      </div>
    </div>
  `,
})

Vue.component('v-goods', {
  props: ['goods'],
  template: `
  <main class="center">
    <section class="goods">
      <v-item
        v-for="item in goods"
        v-bind:element="item"
        v-on:addToBasket="handleAddToBasket"
      />
      <div v-if="!goods.length" class="goods-empty">
        Нет данных
      </div>
    </section>
  </main>
  `,
  methods: {
    handleAddToBasket(data) {
      this.$emit('add', data);
    },
  },
});

Vue.component('v-item', {
  props: ['element'],
  template: `
    <div class="item">
      <h4>{{element.title}}</h4>
      <p>{{element.price}}</p>
      <button type="button" v-on:click="addToBasket">Add to basket</button>
    </div>
  `,
  methods: {
    addToBasket() {
      this.$emit('addToBasket', this.element);
    }
  },

});

new Vue({
  el: '#app',
  data: {
    goods: [],
    basketGoods: [],
    searchValue: '',
    isVisible: false,
    errorMessage: '',
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

/* class GoodsItem {
  constructor({ id, title, price }) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  render() {
    return `
      <div class="item" data-id="${this.id}">
        <h4>${this.title}</h4>
        <p>${this.price}</p>
        <button type="button" name="add-to-basket">Купить</button>
      </div>
    `;
  }
}

class GoodsList {
  constructor(basket) {
    this.goods = [];
    this.filteredGoods = [];
    this.basket = basket;

    document.querySelector('.goods').addEventListener('click', (event) => {
      if (event.target.name === 'add-to-basket') {
        const id = event.target.parentElement.dataset.id;
        const item = this.goods.find((goodsItem) => goodsItem.id === parseInt(id));
        if (item) {
          this.addToBasket(item);
        } else {
          console.error(`Can't find element with id ${id}`)
        }
      }
    });

    document.querySelector('.search').addEventListener('input', (event) => {
      this.search(event.target.value);
    });
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      sendRequest('catalogData.json')
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
          resolve();
        });
    });
  }

  newFetchData(callback) {
    fetch(`${API}/catalogData.json`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.goods = data;
        callback();
      });
  }

  addToBasket(item) {
    this.basket.addItem(item);
  }

  getTotalPrice() {
    return this.goods.reduce((acc, curVal) => {
      return acc + curVal.price;
    }, 0);
  }

  render() {
    const goodsList = this.filteredGoods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }

  search(value) {
    const regexp = new RegExp(value.trim(), 'i');
    this.filteredGoods = this.goods.filter((goodsItem) => regexp.test(goodsItem.title));
    this.render();
  }
}

class Basket {
  constructor() {
    this.basketGoods = [];
    this.amount = 0;
    this.countGoods = 0;
  }

  addItem(item) {
    const index = this.basketGoods.findIndex((basketItem) => basketItem.id === item.id);
    if (index > -1) {
      this.basketGoods[index].quantity += 1;
      // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
    } else {
      this.basketGoods.push(item);
    }
    console.log(this.basketGoods);
  }

  removeItem(id) {
    this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(id));
    console.log(this.basketGoods);
  }

  changeQuantity() {

  }

  clear() {

  }

  fetchData() {
    return new Promise((resolve, reject) => {
      sendRequest('getBasket.json')
        .then((data) => {
          this.basketGoods = data.contents;
          this.amount = data.amount;
          this.countGoods = data.countGoods;
          console.log(this);
          resolve();
        });
    });
  }

  applyPromoCode() {

  }

  getDeliveryPrice() {

  }

  createOrder() {

  }

  getTotalPrice() {

  }

  render() {

  }
}

class BasketItem {
  constructor({ title }) {
    this.title = title;
  }

  changeQuantity() {

  }

  removeItem() {
  }

  changeType() {
  }

  render() {

  }
}

const basket = new Basket();
basket.fetchData();
const goodsList = new GoodsList(basket);
goodsList.fetchData()
  .then(() => {
    goodsList.render();
    goodsList.getTotalPrice();
  }); */