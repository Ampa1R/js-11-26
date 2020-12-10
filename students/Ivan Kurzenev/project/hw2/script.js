class GoodsItem {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }

  render = () => 
    `<div class="item">
      <a class="item__link" href="#">
        <img class="item__image" src="img/${this.title}.jpg" alt="${this.title}">
      </a>
      <h4 class="item__title marginTop">${this.title}</h4>
      <p class="item__price marginTop">Цена: ${this.price} &#8381;</p>
      <button type="button" class="item__buy-button marginTop">Купить</button>
    </div>`;
}

class GoodsList {
  constructor(cart) {
    this.goods = [];
    this.cart = cart;
  }

  fetchData() {
    this.goods = [
      { title: 'Наушники', price: 5000 },
      { title: 'Клавиатура', price: 3000 },
      { title: 'Мышь', price: 2500 },
      { title: 'Монитор', price: 18000 },
    ];
  }

  addToCart(item) {
    this.cart.add(item);
  }

  render() {
    const goodsList = this.goods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }

  totalPrice() {
    let sum = 0;
    this.goods.forEach(item => {
      sum += item.price;
    });
    console.log(sum);
    return sum;
  }
}

class Cart {
  constructor() {
    this.cartGoods = [];
  }

  fetchData() {

  }

  addItem() {

  }

  deleteItem() {

  }

  buy() {

  }

  clear() {

  }

  totalPrice() {

  }

  render() {

  }
}

class CartItem {
  constructor({ title }) {
    this.title = title;
  }

  render() {
    
  }
}

const cart = new Cart();
const goodsList = new GoodsList(cart);
goodsList.fetchData();
goodsList.render();
goodsList.totalPrice();