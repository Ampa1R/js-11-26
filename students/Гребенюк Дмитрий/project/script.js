class GoodsItem {
    constructor({
        title,
        price
    }) {
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
        //this.basket = basket;
    }
     

    fetchData() {
        this.goods = [
            {
                title: 'Ноутбук',
                price: 30000
            },
            {
                title: 'Клавиатура',
                price: 1000
            },
            {
                title: 'Мышь',
                price: 500
            },
            {
                title: 'Монитор',
                price: 10000
            },
    ];
    }

//    addToBasket(item) {
//        this.basket.add(item);
//    }
    
    render() {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }
    sum (){
        let sum = 0;
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return sum+= goodsItem.price;
        });
        document.querySelector('.goods').append("Итого " + sum) ;
    }
    
}

//class Basket {
//    constructor() {
//        this.basketGoods = []; //товары в корзине
//        this.basketPrice = 0; //Цена всех добалвленных товаров
//        this.basketArrange() {};// Оформить заказ
//        this.basketForm = {};// Форма заполнения данных Юзера
//        this.continue(){};// Продолжить покупки
//        this.basketPromo(){};// Промокод
//        
//
//    }
//
//
//    render() {
//
//    }
//}

//class BasketItem {
//    constructor(
//        title
//    ) {
//        this.title = title; Название
//        this.price = price; Цена
//        this.quantity = 0; Количество
//        this.image = ""; Изображение
//        this.removeItem(){}; Удаление товаров
//    }
//    
//
//    render() {
//
//    }
//}

//const basket = new Basket();
const goodsList = new GoodsList();
goodsList.fetchData();
goodsList.render();
goodsList.sum();
