"use strict"

const API_URL = 'https://raw.githubusercontent.com/Tippman/js-11-26/master/students/%D0%94%D0%B0%D0%BD%D0%B8%D0%B8%D0%BB%20%D0%9F%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2/other';

Vue.component('v-header', {
    props: ['search'],
    template: `
        <header class="main-header">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">L-Shop</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Future Link</a>
                        </li>
                    </ul>
                    <div class="input-group input-group-sm mb-3">
                        <input type="text" class="form-control col-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" @input="search"
                        >
                    </div>
                    <button class="btn btn-outline-success my-2 my-sm-0 cart-button basket-toggle" type="button" @click="isBasketActive = !isBasketActive"><span>Корзина</span></button>
                </div>
                <v-basket></v-basket>
            </nav>
        </header>
    `
});

Vue.component('v-basket', {
    template: `
            <div class="basket-container" v-bind:class="{visually_hidden: isBasketActive}">
                <p class="h6" v-if="basketGoods.length === 0">Корзина пуста</p>
                <p class="h6" v-else>Стоимость корзины: {{ totalPrice }}$</p>
                <ul id="basket-list" class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="basketItem in basketGoods">{{basketItem.title}}<a class="remove-item" :data-product_id="basketItem.product_id" @click="removeFromBasket(basketItem)">Удалить</a></li>
                </ul>
                <button type="button" id="clear-basket" class="btn btn-secondary btn-sm" v-if="basketGoods.length !== 0" @click="clearBasket">Очистить корзину</button>
            </div>
    `
});

Vue.component('v-goods-list', {
    props: ['goods'],
    template: `
        <main class="main-content">
            <section class="goods-list">
                <p v-if="goods.length === 0">Список товаров пуст</p>
                <v-goods-item v-for="item in goods" :elem="item"></v-goods-item>
            </section>
        </main>
    `
});


Vue.component('v-goods-item', {
    props: ['elem'],
    template: `
        <div class="card mt-3 mr-3 mb-3 ml-3">
            <img :src="item.cover" class="card-img-top item-preview" :alt="elem.title">
            <div class="card-body">
                <span class="card-subtitle font-weight-lighter font-italic text-muted float-right">{{ elem.product_id }}</span>
                <h5 class="card-title">{{ elem.title }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <h6 class="card-subtitle mb-2 text-muted">Цена: {{ elem.price}}$</h6>
                <a href="#" class="btn btn-primary float-right" :data-product_id="elem.product_id" @click="addToBasket">Добавить</a>
            </div>
        </div>
    `
});



new Vue({
    el: '#shop',
    data: {
        name: "ssdf",
        goods: [],
        filteredGoods: [],
        searchLine: '',
        basketGoods: [],
        isBasketActive: true,
    },

    computed: {
        search(event) {
            // this.searchLine = event.target.value;
            const regExp = new RegExp(this.searchLine, 'i')
            this.filteredGoods = this.goods.filter(goodsItem => regExp.test(goodsItem.title));
        },

        totalPrice() {
            return this.basketGoods.reduce((totalPrice, current) => totalPrice + current.price, 0);
        }
    },

    methods: {
        makeGetRequest(url) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.timeout = 2000;

                xhr.ontimeout = () => { console.log('timeout') };

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            const data = JSON.parse(xhr.responseText);
                            resolve(data);
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                }

                xhr.open('GET', url, true);
                xhr.send();
            })
        },

        fetchData() {
            return this.makeGetRequest(`${API_URL}/products_list.json`)
                .then(data => this.goods = data)
                .then(data => this.filteredGoods = data);
        },

        fetchbasket() {
            return this.makeGetRequest(`${API_URL}/basket_list.json`)
                .then(data => this.basketGoods = data);
        },

        addToBasket(item) {
            const index = this.basketGoods.findIndex((basketItem) => basketItem.product_id === item.product_id);
            if (index > -1) {
                this.basketGoods[index].quantity += 1;
            } else {
                this.basketGoods.push(item);
            }
            console.log(this.basketGoods);
        },

        removeFromBasket(item) {
            this.basketGoods.pop(item);
        },

        clearBasket() {
            this.basketGoods = [];
        },

    },
    mounted() {
        this.fetchData();
        this.fetchbasket();
    }
});