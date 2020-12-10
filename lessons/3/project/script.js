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

  getTotalPrice() {
    return this.goods.reduce((acc, curVal) => {
      return acc + curVal.price;
    }, 0);
  }

  render() {
    const goodsList = this.goods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }
}

class Basket {
  constructor() {
    this.basketGoods = [];
  }

  addItem() {

  }

  removeItem() {

  }

  changeQuantity() {
    
  }

  clear() {

  }

  fetchData() {

  }

  applyPromoCode() {

  }

  getDeliveryPrice() {

  }

  createOrder() {

  }

  getTotalPrice() {

  }

  render() {

  }
}

class BasketItem {
  constructor({ title }) {
    this.title = title;
  }

  changeQuantity() {
  
  }

  removeItem() {
  }

  changeType() {
  }

  render() {

  }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);
goodsList.fetchData();
goodsList.render();
goodsList.getTotalPrice();
