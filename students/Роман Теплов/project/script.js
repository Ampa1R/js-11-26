class GoodsItem {
    constructor({ title, price }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `
      <div class="item">
        <h4>${this.title}</h4>
        <p>${this.price}</p>
        <button type="button">Add to basket</button>
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
        this.goods = [
            { title: 'Ноутбук', price: 30000 },
            { title: 'Клавиатура', price: 1000 },
            { title: 'Мышь', price: 500 },
            { title: 'Монитор', price: 10000 },
        ];
    }

    addToBasket(item) {
        this.basket.add(item);
    }

    render() {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }

    addSum(){
        let sumList = 0;
        this.goods.forEach((good)=>{
            let goodPrice = good.price;
            sumList += goodPrice;
        });
        console.log(sumList);
    }
}

class Basket {
    constructor() {
        this.basketGoods = [];
    }

    render() {

    }

    clear(){ // - то что я добавил

    }
}

class BasketItem {
    constructor({ title }) {
        this.title = title;
    }

    render() {

    }
    clear(){ // - то что я добавил

    }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);
goodsList.fetchData();
goodsList.render();
goodsList.addSum();
