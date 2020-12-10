class GoodsItem {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
  }
  render() {
    return `<div class="item">
        <img src=${this.image} alt="product">
        <h4 class="prod_name">${this.title}</h4>
        <p class="prod_price">${this.price} <span>руб.</span></p>
        <button type="button" class="add_cart">Добавить в <i class="fa fa-shopping-cart"></i></button>
      </div>`;
  }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {title: 'Лампа', price: 3000, image: 'img/lamp.jpg'},
            {title: 'Кресло', price: 13000, image: 'img/arm-chair.jpg'},
            {title: 'Диван', price: 25000, image: 'img/divan.jpg'},
            {title: 'Торшер', price: 9500, image: 'img/torsher.jpg'},
            {title: 'Ваза', price: 2000, image: 'img/vase.jpg'},
            {title: 'Часы', price: 2700, image: 'img/clock.jpg'},
            {title: 'Ступка керамическая', price: 4300, image: 'img/stupka.jpg'},
            {title: 'Чайник', price: 1350, image: 'img/kettle.jpg'},
            {title: 'Стул', price: 2700, image: 'img/chair.jpg'},
            {title: 'Подвесная лампа', price: 7230, image: 'img/suspended_lamp.jpg'},
        ];
    }

    render() {
        const goodsList = this.goods.map(item => {
            const goodItem = new GoodsItem(item.title, item.price, item.image);
            return goodItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }

    calculateSumPrices() {
        let sum_prices = 0;
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.image);
            sum_prices += goodItem.price;
        })
        //return sum_prices
        console.log(sum_prices)
    }
}

class Basket {
    constructor() {
        this.basketGoods = [];
    }
    render() {


    }
    addToBasket() {


    }

    removeFromBasket() {

    }

    editBasket() {


    }
    calculateBasketCost() {


    }
}

class BasketItem {
    constructor(title, price, quantity=1) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
    render() {

    }
    editQuantity() {


    }
    calculateItemCost() {

    }
}



const list = new GoodsList();
list.fetchGoods();
list.render();
list.calculateSumPrices();