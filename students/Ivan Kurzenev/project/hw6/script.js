const API = 'https://raw.githubusercontent.com/Variasco/js-11-26/master/students/Ivan%20Kurzenev/testfiles/';

const sendRequest = (path) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
      console.log("timeout!");
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Error!', xhr.responseText);
        }
      }
    }

    xhr.open('GET', `${API}${path}`);

    xhr.send();
  });
}

Vue.component('v-header', {
  props: [
    'search',
  ],
  template: `
    <header class="header padding">
      <a href="index.html"><span class="logo">E-Shop</span></a>
      <slot />
      <button @click="handleIsCartVisible" type="button" class="cart-button">Корзина</button>
    </header>
  `,
  methods: {
    handleIsCartVisible(data) {
      this.$emit('display', data);
    },
  },
});

Vue.component('v-goods', {
  props: [
    'goods',
    'cartGoods',
    'isCartVisible',
    'totalPrice',
  ],
  template: `
    <main class="main container">
        <section class="goods">
            <v-item 
              v-for="item in goods" 
              :element="item"
              @addToCart="handleAddToCart"
            />
            <p v-if="goods.length <=0 " class="emptyGoods">
                Нет данных
            </p>
            <v-cart 
              v-if="isCartVisible"
              :cart-goods="cartGoods"
              :total-price="totalPrice"
              @deleteElement="handleDelete"
              @clear="handleClearCart"
            />
        </section>
    </main>
  `,
  methods: {
    handleAddToCart(data) {
      this.$emit('add', data);
    },
    handleDelete(data) {
      this.$emit('remove', data);
    },
    handleClearCart() {
      this.$emit('clear');
    }
  },
});

Vue.component('v-item', {
  props: [
    'element',
  ],
  template: `
    <div class="item">
        <a class="item__link" href="#">
            <img class="item__image" :src="element.path" :alt="element.title">
        </a>
        <h4 class="item__title marginTop">{{element.title}}</h4>
        <p class="item__price marginTop">Цена: {{element.price}} &#8381;</p>
        <button @click="addToCart" type="button" class="item__buy-button marginTop">В
            корзину</button>
    </div>
  `,
  methods: {
    addToCart() {
      this.$emit('addToCart', this.element)
    },
  },
});

Vue.component('v-cart', {
  props: [
    'cartGoods',
    'totalPrice',
  ],
  template: `
    <section class="cart">
        <v-cart-item 
          v-for="item in cartGoods"
          :element="item"
          @deleteElement="remove"
        />
        <p v-if="cartGoods.length <= 0" class="emptyGoods">
            Корзина пуста
        </p>
        <p class=" item__price marginTop">Общая цена: {{this.totalPrice}} &#8381;</p>
        <button @click="clearCart" type="button" class="item__buy-button marginTop">Очистить
            корзину</button>
    </section>
  `,
  methods: {
    remove(data) {
      this.$emit('deleteElement', data);
    },
    clearCart() {
      this.$emit('clear')
    }
  },
})

Vue.component('v-cart-item', {
  props: [
    'element',
  ],
  template: `
    <div class="cartItem">
        <div class="cartItem__left">
            <h4 class="item__title">{{element.title}} x{{element.quantity}}</h4>
            <p class="item__price marginTop">Цена: {{element.price}} &#8381;</p>
        </div>
        <div class="cartItem__right">
            <button @click="remove" type="button"
                class="item__buy-button">Удалить</button>
        </div>
    </div>
  `,
  methods: {
    remove() {
      this.$emit('deleteElement', this.element);
    },
  },
});

Vue.component('v-search', {
  props: ['value'],
  template: `
    <input :value="value" @input="$emit('input', $event.target.value)" type="search" class="search" placeholder="Search...">
  `
});

Vue.component('v-error', {
  props: ['message'],
  template: `
    <p class="error">
      {{this.message}}
    </p>
  `
});

new Vue({
  el: '#app',
  data: {
    goods: [],
    cartGoods: [],
    searchValue: '',
    isVisibleCart: false,
    errorMessage: '',
  },
  mounted() {
    this.fetchData();
    this.fetchDataCart();
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        sendRequest('data.json')
          .then((data) => {
            this.goods = data;
            resolve();
          })
          .catch(() => {
            this.errorMessage = `Не удалось загрузить данные списка товаров!`;
          });
      })
    },
    fetchDataCart() {
      return new Promise((resolve, reject) => {
        sendRequest('dataCart.json')
          .then((data) => {
            this.cartGoods = data.contents;
            // this.amount = data.amount;
            // this.countGoods = data.countGoods;
            resolve();
          })
          .catch(() => {
            alert(`Не удалось загрузить данные корзины!`)
          });
      })
    },
    addToCart(item) {
      const index = this.cartGoods.findIndex((element) => element.id_product === item.id_product);
      if (index > -1) {
        this.cartGoods[index].quantity += 1;
      } else {
        item.quantity = 1;
        this.cartGoods.push(item);
      }
    },
    deleteFromCart(item) {
      this.cartGoods = this.cartGoods.filter((element) => element.id_product !== item.id_product);
    },
    clearCart() {
      this.cartGoods = [];
    },
    isVisibleCartToggler() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchValue.trim(), 'i');
      return this.goods.filter((goodsItem) => regexp.test(goodsItem.title));
    },
    totalPrice() {
      return this.cartGoods.reduce((acc, curVal) => acc + curVal.price * curVal.quantity, 0);
    },
  },
});