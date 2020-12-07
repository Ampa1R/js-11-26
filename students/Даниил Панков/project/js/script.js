"use strict"

class GoodsItem {
    constructor({ title, price, cover }) {
        this.title = title;
        this.price = price;
        this.cover = cover;
    }

    render() {
        return `
            <div class="card mt-3 mr-3 mb-3 ml-3" style="width: 18rem;">
                <img src=${this.cover} class="card-img-top item-preview" alt="${this.title}">
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <h6 class="card-subtitle mb-2 text-muted">Цена: ${this.price}$</h6>
                    <a href="#" class="btn btn-primary float-right">Добавить</a>
                </div>
            </div>
    `;
    }
}

class GoodsList {
    constructor(basket) {
        this.goods = [];
        this.basket = basket;
    }

    fetchData() {
        this.goods = [{
                title: "ACUVUE OASYS",
                price: 25,
                cover: "img/ac_oasys.jpeg"
            },
            {
                title: "ACUVUE Moist",
                price: 20,
                cover: "img/acuvue-moist.png"
            },
            {
                title: "Cooper Vision",
                price: 28,
                cover: "img/cooper_vision.png"
            },
            {
                title: "CooperVision Biofinity",
                price: 28,
                cover: "img/biofinity.png"
            },
            {
                title: "CooperVision XR toric",
                price: 35,
                cover: "img/XR.jpg"
            },
        ];
    }

    addToBasket(item) {
        this.basket.add(item);
    }

    // метод определения суммарной стоимости всех товаров
    getGoodsPrice() {
        return (this.goods.length === 0) ? 'Товаров нет' :
            this.goods.reduce((totalPrice, item) => totalPrice += item.price, 0);
    }

    render() {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }
}

class Basket {
    constructor() {
        this.basketGoods = [];
    }

    removeFromBasket(item) {

    }

    render() {

    }
}

class BasketItem {
    constructor({ title }) {
        this.title = title;
    }

    render() {

    }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);
goodsList.fetchData();
goodsList.render();