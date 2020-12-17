'use strict';

const API_URL = 'https://raw.githubusercontent.com/DmitryTakmakov/js-11-26/master/students/Dmitry_Takmakov/project/json/'

const makeGETRequest = (filename) => {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.timeout = 5000;

        xhr.ontimeout = () => {
            console.log(`GET request for ${this.filename} timed out!`);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    console.log('Error!', xhr.responseText);
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open('GET', `${API_URL}${filename}`);
        xhr.send();
    });
}

new Vue({
    el: '#app',
    data: {
        products: [],
        cartItemsList: [],
        searchLine: '',
        isCartVisible: false
    },
    mounted() {
        this.getData();
        this.getCartData();
    },
    methods: {
        getData() {
            return new Promise((resolve, reject) => {
                makeGETRequest('products.json')
                    .then((data) => {
                        this.products = data;
                        resolve();
                    });
            });
        },
        getCartData() {
            return new Promise((resolve, reject) => {
                makeGETRequest('basket_items.json')
                    .then((data) => {
                        this.cartItemsList = data.contents;
                        resolve();
                    });
            });
        },
        addProductToCart(product) {
            let id = this.cartItemsList.findIndex((cartItem) => cartItem.product_id === product.product_id);
            if (id > -1) {
                this.cartItemsList[id].quantity += 1;
            } else {
                this.cartItemsList.push(product);
                this.cartItemsList[this.cartItemsList.length - 1].quantity = 1;
            }
            console.log(this.cartItemsList);
        },
        removeProductFromCart(product_id) {
            this.cartItemsList = this.cartItemsList.filter((product) => product.product_id !== parseInt(product_id));
            console.log(this.cartItemsList);
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