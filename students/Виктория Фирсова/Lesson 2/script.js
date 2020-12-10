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
}

class Basket {
  constructor() {
    this.basketGoods = [];
  }
  add(good)
  {
    for (let i=0;i<this.basketGoods.length;i++)
      if (this.basketGoods[i].good === good)
      {
        this.basketGoods[i].addCount(1);
        return;
      }
    this.basketGoods.push(new BasketItem(good))

  }
  _trimZerroCounts()
  {
    for (let i=this.basketGoods.length-1;i>=0;i--)
      if (this.basketGoods[i].count <= 0)
        this.basketGoods.splice(i,1);
  }
  render() {

  }
  get totallPrice()
  {
    return this.basketGoods.reduce((a, b) => a + b.totallPrice, 0);
  }
}

class BasketItem {
  constructor(good, count = 1) {
    this.good = good;
    this.count = count;
  }
  get title()
  {
    return this.good.title;
  }
  get totallPrice()
  {
    return this.good.price*this.count;
  }
  addCount(countToAdd)
  {
    this.count += countToAdd;
  }
  render() {

  }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);
goodsList.fetchData();
goodsList.render();

// goodsList.addToBasket(goodsList.goods[0]);
// goodsList.addToBasket(goodsList.goods[0]);
// goodsList.addToBasket(goodsList.goods[1]);
// console.log(goodsList.basket.totallPrice);
