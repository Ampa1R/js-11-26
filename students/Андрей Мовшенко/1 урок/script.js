  const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

  const sendRequest = (path) => {
    return new Promise ((resolve, reject) => {
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
            console.log('Error!', xhr.responseText);
            reject(xhr.responseText);
          }
        }
      }

      xhr.open('GET', `${API}/${path}`)

      xhr.send();
    });
  }

  Vue.component('v-error', {
    props: ['message'],
    template: `
    <div>
      Ошибка! {{ message }}
    </div> 
    `,
  });

  Vue.component('v-search', {
    props: ['value'],
    template: `
    <input type="text" :value="value" @input="$emit('input', $event)" class="search" v-model="value" placeholder="Search..."/>
    `,
  });

  Vue.component('v-basket', {
    props: ['goods'],
    template: `
    <div class="cart">
      <div class="cart-item" v-for="Item in goods">
        <p class="cart-item__title">{{item.product_name}}</p>
        <p>{{item.quantity}} x {{item.price}}</p>
      </div>
    </div>
    `,
  });

  Vue.component('v-header', {
    template: `
     <header class="center">
       <span class="logo">E-Shop</span>
       <slot />
       <button @click="handleClick" class="cart-button" type="button">Корзина</button>
       <slot name="basket" />
     </header>
    `,
    methods: {
      handleClick () {
        this.$emit('change-is-cart-visible');
      }
    }
  });

  Vue.component('v-goods', {
    props: ['goods'],
    template: `
    <main>
      <div class="goods center">
        <v-item 
          v-for="item in goods" 
          v-bind:element="item"
          v-on:addToBasket="handleAddToBasket"
          />
        <div v-if="!goods.lenght" class="goods-empty">Нет данных</div>
      </div>
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
        <h3>{{element.product_name}}</h3>
        <p>{{element.price}}</p>
        <button type="button" v-on:click="addToBasket">В корзину</button>
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
      fetchData(){
        return new Promise((resolve, reject) => {
          sendRequest('catalogData.json')
            .then((data) => {
              this.goods = data;
              resolve();
            })
            .catch ((error) => {
              this.errorMessage = 'Не удалось получить список товаров'
            });
        });
      },
      fetchBasketData() {
        return new Promise((resolve, reject) => {
          sendRequest('catalogData.json')
            .then((data) => {
              this.goods = data;
              resolve();
            })
            .catch ((error) => {
              this.errorMessage = 'Не удалось получить список товаров'
            });
        });
      },
      addToBasket(item){
        const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
        if (index > -1) {
          this.basketGoods[index].quantity += 1;
        } else {
          this.basketGoods.push(item);
        }
        console.log(this.basketGoods);
      },
      removeItem (id){
        this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product != parseInt(id));
        console.log(this.basketGoods);
      },
      handleSearchInput(event) {
        console.log (event);
        this.searchValue = event.target.value; 
      }
    },
    computed: {
      filteredGoods() {
        const regexp = new RegExp(this.searchValue.trim(), 'i');
        return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
      },
      totalPrice() {
        return this.goods.reduce((acc, curVal) => {
        return acc + curVal.price;
    }, 0);

      }
    },
  })
 
