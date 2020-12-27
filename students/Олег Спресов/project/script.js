const API = 'http://localhost:3000/api';

const sendRequest = (path, method = 'GET', body = {}) => {
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

    xhr.open(method, `${API}/${path}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(body));
  });
}

Vue.component('v-error', {
  props: ['message'],
  template: `
    <div class="error">
      Ошибка! {{ message }}
    </div>
  `,
});

Vue.component('v-search', {
  props: ['value'],
  template: `
    <div>
      <input type="text" :value="value" @input="$emit('input', $event.target.value)"  class="search" placeholder="Search..." />
    </div>
  `,
});

Vue.component('v-basket', {
  props: ['goods'],
  template: `

    <div class="cart">
        <div class="cart-item" v-for="item in goods">
            <img :src="item.image" alt="product_basket">
            <p class="cart-item__title">{{item.title}}</p>
            <p>{{item.quantity}} x {{item.price}}</p>
            <button @click="$emit('delete', item.id)">Удалить</button>
        </div>
    </div>
  `,
});


Vue.component('v-header', {
  template: `
    <header class="header">
        <a class="logo" href="#"><img src="img/logo.svg" alt="logo"></a>
        <slot />
        <div class="basket">
            <button @click="handleClick" type="button" class="cart-button">Корзина <i class="fa fa-shopping-cart"></i></button>
        </div>
        <slot name="basket" />
    </header>
  `,
  methods: {
    handleClick() {
      this.$emit('change-is-cart-visible');
    }
  }
});

Vue.component('v-goods', {
  props: ['goods'],
  template: `
    <main>
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
  }
});

Vue.component('v-item', {
  props: ['element'],
  template: `
    <div class="item">
        <img :src="element.image" alt="product">
        <h4 class="prod_name">{{element.title}}</h4>
        <p class="prod_price">{{element.price}}</p>
        <button type="button" v-on:click="addToBasket" class="add_cart">
                        Добавить в <i class="fa fa-shopping-cart"></i></button>
    </div>
  `,
  methods: {
    addToBasket() {
      this.$emit('addToBasket', this.element);
    }
  }
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
            this.errorMessage = 'Не удалось получить список товаров!';
          });
      });
    },
    fetchBasketData() {
      return new Promise((resolve, reject) => {
        sendRequest('basket')
          .then((data) => {
            this.basketGoods = data;
            // this.amount = data.amount;
            // this.countGoods = data.countGoods;
            resolve();
          })
          .catch((error) => {
            this.errorMessage = 'Не удалось получить содержимое корзины!';
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
            // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
          } else {
            this.basketGoods.push({ ...item, quantity: 1 });
          }
        })
        .catch((error) => {
          this.errorMessage = 'Не удалось добавить элемент в корзину!';
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
          this.errorMessage = 'Не удалось удалить элемент из корзины!';
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
    },
    // someComputedProp: {
    //   get() {
    //     return this.name.toUpperCaes();
    //   },
    //   set(value) {
    //     this.name = value.split('/');
    //   }
    // }
  },
})
