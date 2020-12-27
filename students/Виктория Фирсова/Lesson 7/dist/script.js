
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
            <p class="cart-item__title">{{item.title}}</p>
            <p>{{item.quantity}} x {{item.price}}</p>
            <button type="button" :data-itemid="item.id" v-on:click="removeFromBasket">Delete</button>
            </div>
    </div>
  `,
  methods: {
    removeFromBasket(sender) {
      console.log("removeFromBasket", sender.srcElement.dataset.itemid);
      this.$emit('remove',sender.srcElement.dataset.itemid);
      
      //let idToDelete = sender.srcElement.dataset.itemid;
      //console.log(this.goods);
      //this.goods.basketGoods.filter(x=>x.id == idToDelete).forEach(x=> goods.removeFromBasket(x));
    }
  }

});


Vue.component('v-header', {
  template: `
    <header class="header d-flex">
        <span class="logo">E-Shop</span>
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
        <h4>{{element.title}}</h4>
        <p>{{element.price}}</p>
        <button type="button" v-on:click="addToBasket">Add to basket</button>
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
            resolve();
          })
          .catch((error) => {
            this.errorMessage = 'Не удалось получить содержимое корзины!';
          });
      });
    },
    addToBasket(item) {
      sendRequest('addToBasket', 'POST', item)
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
          this.errorMessage = 'Не удалось добавить список товаров!';
        });
    },
    removeFromBasket(id) {
      console.log('removeFromBasket', id);
      const index = this.basketGoods.findIndex((basketItem) => basketItem.id == id);
      if (index == -1) return;
      var item = this.basketGoods[index];
      sendRequest('removeFromBasket', 'POST', item)
        .then((result) => {
          console.log('Result', result);
          if (!result.success) {
            console.log('removeItem Error');
            return;
          }

          this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(id));
        })
        .catch((error) => {
          this.errorMessage = 'Не удалось удалить товар!';
        });    },
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
