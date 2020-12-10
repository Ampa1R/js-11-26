const API =
  "https://raw.githubusercontent.com/rikkets2/jsbasic/master/javascript/";
const sendRequest = (path) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.ontimeout = () => {
      console.log("timeout!");
    };
    xhr.open("GET", `${API}/${path}`);
    xhr.send();
    console.log(xhr);
    setTimeout(() => {
      if (xhr.status == 200 && xhr.readyState === 4) {
        console.log("Ok");
        console.log(JSON.parse(xhr.responseText));
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject();
      }
    }, 1000);
  });
};
class GoodsItem {
  constructor({ title, price, image }) {
    this.title = title;
    this.price = price;
    this.image = image;
  }
  render() {
    return `<div class= "item"> <img src="img/${this.image}" alt="КАРТИНКА"> <h4>${this.title}</h4> <p>${this.price}</p> <button onclick = myFunction("${this.title}","${this.price}","${this.image}") "class"= "addtocart">КУПИТЬ</button> </div> `;
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchData(callback) {
    sendRequest("catalog.json").then((resolve) => {
      this.goods = resolve;
      callback();
    });
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
    this.goods = [];
  }
  render() {
    const CartList = this.goods.map((item) => {
      item.render();
    });
    document.querySelector(".cart").innerHTML = CartList.join("");
  }
  AllList() {
    //CПИСОК ТОВАРОВ ПО НАЗВАНИЯМ
    let arr = [];
    let arr2 = [];
    let list = {};
    this.goods.forEach((elem) => {
      list[elem.title] = 0;
      arr.push(elem.title);
    });
    for (const j of arr) {
      list[j]++;
    }
    return list; //CПИСОК ТОВАРОВ ПО НАЗВАНИЯМ
  }
  deleteitem(name = null) {
    //УДАЛЕНИЕ ЭЛЕМЕНТОВ

    for (let i = 0; i < this.goods.length; i++) {
      let d = null;
      if (name === this.goods[i].title);
      {
        d = this.goods.indexOf(this.goods[i]);
        console.log(this.goods[i]);
        console.log(d);
        this.goods.splice(d, 1);
        console.log(this.goods);
        break;
      }
      {
        break;
      }
    }
  }

  clearCart() {}
  totalprice() {
    let totalprice = 0;
    this.goods.forEach(function (elem) {
      return (totalprice += +elem.price);
    });
    return totalprice;
  }
}
class CartItem {
  constructor({ title, price, image }) {
    this.title = title;
    this.price = price;
    this.image = image;
  }
  render() {
    return `<div class= "cart"> <img src="img/${this.image}" alt="КАРТИНКА"> <h4>${this.title}</h4> <p>${this.price}</p> <button> + </button> <button> УДАЛИТЬ </button> <h4>КОЛИЧЕСТВО:</h4> `;
  }

  additem() {}
}
const goodsList = new GoodsList();
goodsList.fetchData(() => {
  goodsList.render();
  goodsList.totalprice();
});
const CartList = new Cart();
function myFunction(title, price, image) {
  //ФУНКЦИЯ ПЕРЕДАЧИ ТОВАРА В КОРЗИНУ
  const cartitem = new CartItem({ title, price, image });
  CartList.goods.push(cartitem);
  console.log(CartList.goods);
}
