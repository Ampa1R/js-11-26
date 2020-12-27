
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

Vue.component('v-header', {
  props: [ 'isCartVisible', 'cartGoods'],
  template: `
    <header class="header d-flex">
        <span class="logo">E-Shop</span>
        <slot />
        <button @click="handleClick" type="button" class="cart-button">Корзина</button>
        <v-basket v-bind:isCartVisible="isCartVisible" v-bind:cartGoods = "cartGoods" />

    </header>
  `,
  methods: {
    handleClick() {
      this.$emit('change-is-cart-visible');
    },
    searchclick() {
      this.$emit('searchclick')
    }
  }
});

Vue.component('v-goods', {
  props: ['goods'],
  template: `
    <main>
        <section class="goods">
          <div v-for="item in goods">
            <v-item
              
              v-bind:element="item"
              v-on:addToBasket="handleAddToBasket"
            />
            </div>
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
        <h4>{{element.product_name}}</h4>
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

Vue.component('v-basket', {
  props: ['isCartVisible', 'cartGoods'],
  template: `
        <div v-if="isCartVisible" class="cart">
          <div v-for="item in cartGoods">
            <v-basketitem  v-bind:item="item" />
          </div>
        </div>
  `
});

Vue.component('v-basketitem', {
  props: ['item'],
  template: `
            <div class="cart-item">
                <p class="cart-item__title">{{item.product_name}}</p>
                <p>{{item.quantity}} x {{item.price}}</p>
            </div>
  `
});

Vue.component('v-search', {
  props: ['search'],
  template: `
        <input type="text" :value="value" @input="$emit('input', $event)" class="search" placeholder="Search..." />
  `
});

new Vue({
  el: '#app',
  data: {
    goods: [],
    basketGoods: [],
    searchValue: 'aaa',
    isVisible: true,
  },
  mounted() {
    this.fetchData();
    this.fetchBasketData();
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        sendRequest('catalogData.json')
          .then((data) => {
            this.goods = data;
            resolve();
          });
      });
    },
    fetchBasketData() {
      return new Promise((resolve, reject) => {
        sendRequest('getBasket.json')
          .then((data) => {
            this.basketGoods = data.contents;
            // this.amount = data.amount;
            // this.countGoods = data.countGoods;
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
    handleSearchInput(event) {
      console.log(event);
      this.searchValue = event.target.value;
    }
  },
  computed: {
    filteredGoods() {
      console.log(this.searchValue);
      const regexp = new RegExp(this.searchValue.trim(), 'i');
      return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
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
