
const API = 'https://raw.githubusercontent.com/JuliaSarvanova/js-11-26/master/students/Сарванова%20Юлия/project/';

const sendRequest = (path) => {
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
          console.log('Error!', xhr.responseText);
          reject(xhr.responseText);
        }
      }
    }
  
    xhr.open('GET', `${API}/${path}`);
  
    xhr.send();
  });
}

Vue.component('v-error', {
    props: ['message'],
    template:`
        <div class="error">
            Ошибка! {{ message }}
        </div>
    `,
});

Vue.component('v-search', {
    props: ['value'],
    template:`
        <div>
            <input type="text" :value="value" @input="$emit('input', $event.target.value)" class="search" placeholder="Search...">
        </div>
    `,
});

Vue.component('v-basket', {
    props: ['goods'],
    template:`
        <div class="cart">
            <div class="cart-item" v-for="item in goods">
                <p class="cart-item__title">{{item.title}}</p>
                <p>{{item.quantity}} x {{item.price}}</p>
                <button @click="$emit('delete', item.id)">Удалить</button>
            </div>
        </div>
    `,
});

Vue.component('v-header', {
    template:`
        <header class="header padding-site">
            <span class="logo">E-Shop</span>
            <slot />
            <button @click="handleClick" type="button" class="cart-button">Корзина</button>
            <slot name="basket" />
        </header>
    `,

    methods: {
        handleClick() {
            this.$emit('change-is-cart-visible')
        }
    }
});

Vue.component('v-goods', {
    //принимаем св-во "goods"
    props: ['goods'],
    template:`
        <main class="padding-site">
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
        }
    }
})

Vue.component('v-item', {
    props: ['element','title'],
    template:`
        <div class="item">
            <h4>{{element.title}}</h4>
            <p>{{element.price}}</p>
            <button type="button" v-on:click="addToBasket(item)">Add to basket</button>
        </div>
    `,
    methods: {
        addToBasket() {
            this.$emit('addToBasket', this.element);
        }
    }
})

new Vue({
    el: '#app',
    data: {
      goods: [],
      basketGoods: [],
      searchValue: '',
      isVisible: false,
      errorMessage: [],
    },
    mounted() {
      this.fetchData();
      this.fetchBasketData();
    },
    methods: {
      fetchData() {
        return new Promise((resolve, reject) => {
          sendRequest('catalog.json')
            .then((data) => {
              this.goods = data;
              resolve();
            }).catch((error) => {
                this.errorMessage = 'Не удалось получить список товаров!';
            })
        });
      },
      fetchBasketData() {
        return new Promise((resolve, reject) => {
          sendRequest('basket.json')
            .then((data) => {
              this.basketGoods = data.contents;
              // this.amount = data.amount;
              // this.countGoods = data.countGoods;
              resolve();
            }).catch((error) => {
                this.errorMessage = 'Не удалось получить содержимое корзины!';
            })
        });
      },
      addToBasket(item) {
        const index = this.basketGoods.findIndex((basketItem) => basketItem.id === item.id);
        if (index > -1) {
          this.basketGoods[index].quantity += 1;
          // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
        } else {
          this.basketGoods.push(item);
        }
        console.log(this.basketGoods);
      },
      removeItem(id) {
        this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(id));
        console.log(this.basketGoods);
      }
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