'use strict';


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


Vue.component('v-search', {
    template: `
      <section class="searchLine">
      <label for="search">Поиск</label>
      <input type="text" id="search" v-model="searchInput">
      <button @click="handleSearchButton">Найти</button>
      </section>
    `,
    data() {
        return {
            searchInput: ''
        }
    },
    methods: {
        handleSearchButton() {
            this.$emit('btn-srch', this.searchInput)
        }
    }
})


Vue.component('v-cart', {
    template: `
      <section class="cart" v-show="isVisibleCart">
      <h3 v-if="!cart.length">Нет Данных</h3>
      <v-cart-item v-for="el in cart" v-bind:item="el"/>
      </section>
    `,

    props: {
        isVisibleCart: Boolean,
        cart: Array
    }
})

Vue.component('v-cart-item', {
    template: `
      <div class="item">
      <div class="pic"></div>
      <h4>{{ item.product_name }}</h4>
      <p v-if="item.price">Цена: {{ item.price }}</p>
      <p> В корзине: {{ item.quantity }}</p>
      <button class="cart-button">Убрать из корзины</button>
      </div>
    `,
    props: {
        item: Object,
        required: false,
        default: {
            id: -1,
            product_name: 'Нет данных',
            price: 0,
            quantity: 0
        }
    }
})


Vue.component('v-catalogue', {
    template: `
      <section class="catalogue">
      <h3 v-if="!goods.length">Нет Данных</h3>
      <v-catalogue-item v-if="goods.length" v-for="el in goods" v-bind:item="el" v-on:addToCart="handleAddToCart"/>
      </section>
    `,

    props: {
        goods: Array
    },

    methods: {
        handleAddToCart(data) {
            this.$emit('add', data)
        }
    }
})


Vue.component('v-catalogue-item', {
    template: `
      <div class="item">
      <div class="pic"></div>
      <h4>{{ item.product_name }}</h4>
      <p v-if="item.price">Цена: {{ item.price }}</p>
      <p v-else>Цена по запросу</p>
      <button class="add-button" v-on:click="handleClick">Купить</button>
      </div>
    `,

    props: {
        item: Object
    },


    methods: {
        handleClick() {
            console.log('button clicked');
            this.$emit('addToCart', this.item)
        }
    }

})


const app = new Vue({
    el: '#app',

    data: {
        goods: [],
        cart: [],
        cartTotalPrice: 0,
        cartTotalGoods: 0,
        isVisibleCart: true,
        searchValue: ''
    },


    mounted() {
        this.fetchData();
        this.fetchCartData();
    },

    methods: {
        fetchData() {
            // fetch(`${API}/catalogData.json`)
            fetch(`goods.json`)
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
            // fetch(`${API}/getBasket.json`)
            fetch(`cart.json`)
                .then(response => response.json())
                .then(data => {
                    this.cartTotalPrice = data.amount;
                    // console.log(this.cartTotalPrice)
                    this.cartTotalGoods = data.countGoods;
                    // console.log(this.cartTotalGoods)
                    data.contents.forEach((e) => {
                        const el = {
                            product_name: e.product_name,
                            price: e.price,
                            quantity: e.quantity
                        }
                        this.cart.push(el);
                    });
                })
                .catch(e => console.log(e))
        },

        async sendToCart(data) {
            try {
                const response = await fetch('cart.json', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                console.log('Успех', JSON.stringify(json))
            } catch (e) {
                console.log(e);
            }
        },


        addToCart(item) {
            this.fetchCartData();


        },


        handleShowHideButton() {
            return this.isVisibleCart = !this.isVisibleCart;
        },

        handleSearchButton(input) {
            this.searchValue = input;
        },

        handleAdd() {

        }


    },

    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchValue.trim(), 'i');
            return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        },

        totalPrice() {
            return this.goods.reduce((acc, el) => acc + el.price, 0)
        }

    }
})