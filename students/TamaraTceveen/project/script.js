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
        <button>Купить</button>
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

  sumTotal(){
    let total = 0;
    const sumTotal = this.goods.map(item => {
      total += item.price;
      return total;
    })
    console.log(total);
  }
}

class Basket {
  constructor() {
    this.basketGoods = [];
  }

  render() {

  }

  removeItem() {

  }

  discountCode() {

  }

  order() {

  }
}

class BasketItem {
  constructor({ title, count = 1, price, picture }) {
    this.title = title;
    this.count = count;
    this.price = price;
    this.picture = picture;
  }

  render() {

  }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);
goodsList.fetchData();
goodsList.render();
goodsList.sumTotal();


