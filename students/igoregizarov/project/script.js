class GoodItem {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `
      <div class="item">
        <h4>${this.title}</h4>
        <p>${this.price}</p>
      </div>
    `;
  }

}

class GoodsList {
  constructor() {
    this.goods = []
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
    let total = 0;
    this.goods.forEach(item => {
      total += item.price;
    });
    return total;
  }

  render() {
    const goodsList = this.goods.map(item => {
      const goodItem = new GoodItem(item);
      return goodItem.render();
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

  clear() {

  }

  frtchData() {

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


const goodsList = new GoodsList();
goodsList.fetchData();
goodsList.render();
goodsList.getTotalPrice();