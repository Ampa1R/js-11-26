const goods = [
    { title: 'Ноутбук', price: 30000 },
    { title: 'Клавиатура', price: 1000 },
    { title: 'Мышь', price: 500 },
    { title: 'Монитор', price: 10000 },
];

class GoodsItem {
    constructor({ title, price }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `
            <div class="item">
                <div class="item-img">
                </div>
                <div class="item-text">
                    <h4>${this.title}</h4>
                    <p>${this.price}</p>
                </div>
            </div>
            `
    }
}

const renderGoodsItem = (title = 'Товар отсутствует на складе', price = 'Для уточнения цены свяжитесь с менеджером') => {
    return `
        <div class="item">
            <div class="item-img">
            </div>
            <div class="item-text">
                <h4>${title}</h4>
                <p>${price}</p>
            </div>
        </div>
        `;
}

class GoodsList {
    constructor() {
        this.goods = [];
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

    render () {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.goods.map(item => {
            totalPrice += item.price;
        });
        console.log(`Общая сумма всех товаров составляет: ${totalPrice} рублей`);
    }
}

const goodsList = new GoodsList();
goodsList.fetchData();
goodsList.render();
goodsList.getTotalPrice();

class Basket {
    constructor() {
        this.basketGoods = [];
    }

    render() {

    }
    
    chooseAllItems(){

    }

    makeOrder() {

    }

    addPromocode() {

    }
}

class BasketItem {
    constructor({title}) {
        this.title = title;
    }

    render() {

    }
    
    deleteFromBasket() {

    }

    chooseQuantity() {

    }
}