const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const sendRequest = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.timeout = 10000;

  xhr.ontimeout = () => {
    console.log('timeout!');
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        return resolve(JSON.parse(xhr.responseText));
      } else {
        return reject('Error!', xhr.responseText);
      }
    }
  }

  xhr.open('GET', `${API}/catalogData.json`);

  xhr.send();
})

class GoodsItem {
  constructor({ product_name, price }) {
    this.title = product_name;
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
    sendRequest
      .then((response) => {
        console.log(response);
        this.goods = response;
        goodsList.render();
        goodsList.sumTotal();
      })
  }

  newFetchData(callback) {
    fetch(`${API}/catalogData.json`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.goods = data;
        callback();
      });
  }

  addToBasket(item, price) {

    const inBasket = new BasketItem(item, price);
    console.log('In basket', inBasket);
    const inBasketGoods = basket.basketGoods.push(inBasket);
    return inBasketGoods;

  }

  render() {
    const goodsList = this.goods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }

  sumTotal() {
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

  removeItem(title) {
    let remove = this.basketGoods.filter(function (removeItem) { return removeItem.title !== title });
    return this.basketGoods = remove;
  }

  list() {

  }
}

class BasketItem {
  constructor(product_name, price) {
    this.title = product_name;
    this.price = price;
  }

  render() {
    return `
      <div class="basketItem">
        <h4>${this.title}</h4>
        // <p>${this.count}</p>
        <p>${this.price}</p>
        <button>Remove</button>
      </div>
    `;
  }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);

goodsList.fetchData();
goodsList.addToBasket('Мышка', 1000);
goodsList.addToBasket('Ноутбук', 45600);
console.log('basket', basket);
basket.removeItem('Мышка');

console.log('basket remove', basket);

