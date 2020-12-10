'use strict';

class Products {
    constructor({
        title,
        price,
        cover
    }) {
        this.title = title;
        this.price = price;
        this.cover = cover;
    }

    renderProduct() {
        return `<div class="card" style="width: 18rem;">
        <img src="${this.cover}" class="card-img-top" alt="${this.title}">
        <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">Record price: ${this.price}</p>
            <a href="#" class="btn btn-primary"><i class="fas fa-cart-plus"></i> Add to cart</a>
        </div>
    </div>`;
    }
}

class ProductsList {
    constructor() {
        this.products = [];
        this.getData();
    }

    getData() {
        this.products = [{
                title: "Alphazone - Rockin'",
                price: 500,
                cover: "static/images/alphazone-rockin.jpg"
            },
            {
                title: "Mayhem - Distorted Soul",
                price: 400,
                cover: "static/images/mayhem-distorted_soul.jpg"
            },
            {
                title: "Marcos & J K Walker - DayKeeper",
                price: 600,
                cover: "static/images/marcos_jk_walker-daykeeper.jpg"
            },
            {
                title: "Planet Punk - Troja.wav",
                price: 400,
                cover: "static/images/planet_punk-trojawav.jpg"
            },
            {
                title: "Cominotto - Species",
                price: 300,
                cover: "static/images/cominotto-species.jpg"
            }
        ];
        this.renderProductsList();
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
        title,
        price,
        cover,
        quantity
    }) {
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

const productsList = new ProductsList();
productsList.getProductsListTotalPrice();