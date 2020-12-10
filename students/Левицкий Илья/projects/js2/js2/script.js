class GoodsItem {
  constructor({ title, price, image }) {
    this.title = title;
    this.price = price;
    this.image = image;
  }
  render() {
    return `<div class= "item">
  <img src="img/${this.image}" alt="КАРТИНКА">
  <h4>${this.title}</h4>
  <p>${this.price}</p>
  <button>КУПИТЬ</button>
  </div>
  `;
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchData() {
    this.goods = [
      { title: "Ноутбук", price: 30000, image: "1.jpg" },
      { title: "Клавиатура", price: 1000, image: "2.jpg" },
      { title: "Мышь", price: 500, image: "3.jpg" },
      { title: "Монитор", price: 10000, image: "4.jpg" },
    ];
  }
  render() {
    const goodsList = this.goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector(".goods").innerHTML = goodsList.join("");
  }
  totalprice() {
    let totalprice = 0;
    this.goods.forEach(function (elem) {
      return (totalprice += elem.price);
    });
    return (this.totalprice = totalprice);
  }
}
class Cart {
  constructor() {
    this.cartgoods = [];
  }
  render() {}
  //ОФОРМИТЬ ЗАКАЗ
  //ОЧИСТИТЬ КОРЗИНУ
}
class CartItem {
  constructor() {
    this.title = title;
  }
  render() {}
  //УДАЛИТЬ ОБЪЕКТ ИЗ КОРЗИНЫ
  //ДОБАВИТЬ ТАКОЙ ЖЕ ТОВАР
  //
  //
}

const goodsList = new GoodsList();
goodsList.fetchData();
goodsList.render();
goodsList.totalprice();
