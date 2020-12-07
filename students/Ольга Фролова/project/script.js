
 class GoodsItem {
	constructor({title, price}) {
		this.title = title;
		this.price = price;
	}
	render () {
		return  `<div class="item">
          <h4>${this.title}</h4>
          <p>${this.price} рублей</p>
          <button class = 'buy'>купить</button>
        </div>
      `;
	}
}
class GoodsList {
    constructor () {
        this.goods = [];
        this.fetchData();
    }
    
    fetchData (){
        this.goods = [
            { title: 'Ноутбук', price: 30000 },
            { title: 'Клавиатура', price: 1000 },
            { title: 'Мышь', price: 500 },
            { title: 'Монитор', price: 10000 },
          ];
          this.render();
    }
        render () {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }
    count () {
        /* Первый вариант
        this.cost = this.goods.reduce(function (prev,curr) { 
            return prev + curr.price}, 0);
                        */
//      Второй вариант
        this.cost = 0; 
        for(let i = 0; i < this.goods.length; i++)  {
            this.cost += this.goods[i].price;
        }
        console.log(this.cost);
    }
}
class BasketItem {
    constructor({title, price}) {
        this.title = title;
        this.price = price;
    }
    render() { // просто для примера
        return `<p> ${this.title} <span> ${this.price} рублей </span></p>`;
    }

}
class Basket {
    constructor() {
        this.basketGoods = [];
        this.fetchData();
    }
    fetchData (){ // просто для примера
        this.basketGoods = [
            { title: 'Ноутбук', price: 30000 },
            { title: 'Клавиатура', price: 1000 },
          ];
          this.render();
    }
    render() {
        const basketList = this.basketGoods.map(item => {
            const basketItem = new BasketItem(item);
            return basketItem.render();
        });
        document.querySelector('.cart').innerHTML = basketList.join('');
    }
    
}

const goodsList = new GoodsList(); 
goodsList.count();

const basket = new Basket(); //Надо по событию (клику на кнопку "купить")
