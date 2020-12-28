'use strict';

import makeRequest from './request';

Vue.component('v-nothing-found', {
    template: `
        <p>Ошибка! Данные не получены!</p>
    `
});

Vue.component('v-header', {
    props: ['cartVisible', 'cartItems', 'search', 'error'],
    template: `
        <header>
            <nav class="navbar navbar-light d-flex bg-light">
                <a class="navbar-brand flex-grow-1">Vinyl Webshop</a>
                <v-search
                    @newSearch="newSearchInput"
                ></v-search>
                <button @click="cartClickHandler" type="submit"><i
                        class="fas fa-shopping-cart"></i></button>
                <div v-if="cartVisible" class="cart">
                    <ul class="list-group mb-3">
                        <v-basket
                            v-for="item in cartItems"
                            :key="item.product_id"
                            :element="item"
                            @delete="deleteHandler"
                        ></v-basket>
                        <v-nothing-found v-if="error" />
                    </ul>
                </div>
            </nav>
        </header>
    `,
    methods: {
        cartClickHandler() {
            this.$emit('change-cart-visibility');
        },
        newSearchInput(data) {
            this.$emit('search', data);
        },
        deleteHandler(data) {
            this.$emit('delete-item', data);
        }
    }
});

Vue.component('v-basket', {
    props: ['element'],
    template: `
    <li class="d-flex justify-content-between lh-sm cart-item">
        <div>
            <img :src="element.cover" :alt="element.title">
        </div>
        <div>
            <h6 class="my-0">{{ element.title }}</h6>
        </div>
        <span class="text-muted">{{ element.quantity }}</span> x
        <span class="text-muted">$ {{ element.price }}</span>
        <button @click="$emit('delete', element.product_id)"><i class="fas fa-trash-alt"></i></button>
    </li>
    `
});

Vue.component('v-search', {
    template: `
    <form class="d-flex searchbar">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
            @input="searchInput">
    </form>
    `,
    methods: {
        searchInput() {
            this.$emit('newSearch', this.$el.lastChild.value);
        }
    }
});

Vue.component('v-product-list', {
    props: ['products', 'error'],
    template: `
        <main>
            <div class="products_list">
                    <v-product
                        v-for="product in products"
                        :key="product.product_id"
                        :element="product"
                        @addProductToCart="addToCartHandler"
                    ></v-product>
                <v-nothing-found v-if="error" />
                <div v-if="!products.length" class="empty-products">
                    Ничего не найдено :(
                </div>
            </div>
        </main>
    `,
    methods: {
        addToCartHandler(data) {
            this.$emit('add', data);
        }
    }
});

Vue.component('v-product', {
    props: ['element'],
    template: `
        <div class="card">
            <img :src="element.cover" class="card-img-top" :alt="element.product_id">
            <div class="card-body">
                <h5 class="card-title">{{ element.title }}</h5>
                <p class="card-text">Record price: $ {{ element.price }}</p>
                <button type="button" class="btn btn-primary" @click="addProductToCart"><i
                        class="fas fa-cart-plus"></i> Add to cart</button>
            </div>
        </div>
    `,
    methods: {
        addProductToCart() {
            this.$emit('addProductToCart', this.element);
        }
    }
});

new Vue({
    el: '#app',
    data: {
        products: [],
        cartItemsList: [],
        searchLine: '',
        isCartVisible: false,
        isError: false
    },
    mounted() {
        this.getData();
        this.getCartData();
    },
    methods: {
        getData() {
            return new Promise((resolve, reject) => {
                makeRequest('products')
                    .then((data) => {
                        this.products = data;
                        resolve();
                    })
                    .catch(() => {
                        this.isError = true;
                    });
            });
        },
        getCartData() {
            return new Promise((resolve, reject) => {
                makeRequest('basket')
                    .then((data) => {
                        this.cartItemsList = data;
                        resolve();
                    })
                    .catch(() => {
                        this.isError = true;
                    });
            });
        },
        addProductToCart(product) {
            makeRequest('basket', 'POST', product)
                .then((res) => {
                    console.log('Result: ', res);
                    if (!res.success) {
                        console.log('Error adding to basket.');
                        return;
                    }
                    let id = this.cartItemsList.findIndex((cartItem) => cartItem.product_id === product.product_id);
                    if (id > -1) {
                        this.cartItemsList[id].quantity += 1;
                    } else {
                        this.cartItemsList.push(product);
                        this.cartItemsList[this.cartItemsList.length - 1].quantity = 1;
                    }
                })
                .catch((err) => {
                    console.log(`Can't add item ${product} to cart.`, err);
                });
        },
        removeProductFromCart(product_id) {
            makeRequest(`basket/${product_id}`, 'DELETE')
                .then((res) => {
                    console.log('Result: ', res);
                    if (!res.success) {
                        console.log('Error deleting item from cart');
                        return;
                    }
                    this.cartItemsList = this.cartItemsList.filter((product) => product.product_id !== parseInt(product_id));
                })
                .catch((err) => {
                    console.log(`Can't remove item #${product_id} to cart.`, err);
                });
        },
        setNewSearchValue(value) {
            this.searchLine = value;
        }
    },
    computed: {
        filteredProducts() {
            const regularExpression = new RegExp(this.searchLine.trim(), 'i');
            return this.products.filter((product) => regularExpression.test(product.title));
        },
        totalPrice() {
            return this.products.reduce((accumulated, current) => {
                return accumulated + current.price;
            }, 0);
        }
    }
});