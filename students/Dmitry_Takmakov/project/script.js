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

class Products {
    constructor({
        product_id,
        title,
        price,
        cover
    }) {
        this.product_id = product_id;
        this.title = title;
        this.price = price;
        this.cover = cover;
    }

    renderProduct() {
        return `<div class="card">
        <img src="${this.cover}" class="card-img-top" alt="${this.product_id}">
        <div class="card-body" data-id="${this.product_id}">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">Record price: $${this.price}</p>
            <button type="button" class="btn btn-primary" name="add-to-basket-button"><i class="fas fa-cart-plus"></i> Add to cart</button>
        </div>
    </div>`;
    }
}

class ProductsList {
    constructor(basket) {
        this.products = [];
        this.basket = basket;
        this.getData()
            .then(() => {
                this.renderProductsList();
                this.getProductsListTotalPrice();
            });

        document.querySelector('.products_list').addEventListener('click', (event) => {
            if (event.target.name === 'add-to-basket-button') {
                let pid = event.target.parentElement.dataset.id;
                let product = this.products.find((product) => product.product_id === parseInt(pid));
                if (product) {
                    this.addToBasket(product);
                } else {
                    console.error(`Can't find the product with ID ${pid}!`);
                }
            }
        });
    }

    getData() {
        return new Promise((resolve, reject) => {
            makeGETRequest('products.json')
                .then((data) => {
                    this.products = data;
                    resolve();
                });
        });
    }

    addToBasket(product) {
        this.basket.addProductToBasket(product);
    }

    renderProductsList() {
        let productsList = this.products.map(product => {
            let productItem = new Products(product);
            return productItem.renderProduct();
        });
        document.querySelector('.products_list').innerHTML = productsList.join("");
    }

    getProductsListTotalPrice() {
        let totalPrice = 0;
        for (let i = 0; i < this.products.length; i++) {
            const element = this.products[i].price;
            totalPrice += element;
        }
        console.log(totalPrice);
    }
}

class Basket {
    constructor() {
        this.basketItemsList = [];
        this.basketTotalPrice = 0;
        this.itemsCount = 0;
    }

    getData() {
        return new Promise((resolve, reject) => {
            makeGETRequest('basket_items.json')
                .then((data) => {
                    this.basketTotalPrice = data.totalPrice;
                    this.itemsCount = data.itemsCount;
                    this.basketItemsList = data.contents;
                    console.log(this);
                    resolve();
                });
        });
    }

    addProductToBasket(product) {
        let id = this.basketItemsList.findIndex((basketItem) => basketItem.product_id === product.product_id);
        if (id > -1) {
            this.basketItemsList[id].quantity += 1;
        } else {
            this.basketItemsList.push(product);
            this.basketItemsList[this.basketItemsList.length - 1].quantity = 1;
        }
        console.log(this.basketItemsList);
    }

    removeProductFromBasket(product_id) {
        this.basketItemsList = this.basketItemsList.filter((product) => product.product_id !== parseInt(product_id));
    } 

    getTotalBasketItemsPrice() {

    }

    renderBasket() {

    }

    makeOrder() {

    }
}

class BasketItem {
    constructor({
        product_id,
        title,
        price,
        cover,
        quantity
    }) {
        this.product_id = product_id;
        this.title = title;
        this.price = price;
        this.cover = cover;
        this.quantity = quantity;
    }

    getBasketItemPrice() {

    }

    deleteBasketItem() {

    }

    updateBasketItem() {

    }

    renderBasketItem() {

    }
}

const basket = new Basket();
const productsList = new ProductsList(basket);
basket.getData();