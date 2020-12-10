const API = 'https://raw.githubusercontent.com/Rikanda/js-11-26/master/students/%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%8C%D1%8F%20%D0%A1%D0%BA%D0%BE%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BB%D0%BE%D0%B2%D0%B0/project/'

const sendRequest = (path, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.timeout = 10000;

  xhr.ontimeout = () => {
    console.log('timeout!');
  }

  xhr.onreadystatechange = () => {
 
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      } else {
        console.log('Error!', xhr.responseText);
      }
    }
  }

  xhr.open('GET', `${API}/${path}`);

  

  xhr.send();
}

class GoodsItems {
constructor({title, price}) {
  this.title = title;
  this.price = price;
}
render() {
  return `
  <div class="item">
    <h4>${this.title}</h4>
    <p>${this.price+ " \u20bd"}</p>
    <button class ="buy">${"Купить"}</button>
  </div>
`; 
}
}


class GoodList {
constructor(){
  this.goods = [];
  this.basket = basket;
}
// fetchData(){
//   this.goods = [
//     { title: 'Ноутбук', price: 30000 },
//     { title: 'Клавиатура', price: 1000 },
//     { title: 'Мышь', price: 500 },
//     { title: 'Монитор', price: 10000 },
//   ];
// }

fetchData(callback) {
  sendRequest('catalogData.json', (data) => {
    this.goods = data;
    callback();
  });
}



addToBasket(item) {
  this.basket.add(item);
}

getTotalPrice() {
  const total = this.goods.reduce((acc, curVal) => acc + curVal.price, 0);

  // let total=0;
  // this.goods.forEach(item => {
  //     total+=item.price;
  //   });
  console.log(total);
  return total;
  
}

render(){
  const goodsList = this.goods.map(item => {
    const goodsItem = new GoodsItems(item);
    return goodsItem.render();

  });
  document.querySelector('.goods').innerHTML = goodsList.join('');

}
}


class Basket {
  constructor() {
    this.BasketGoods = [];
  }

  
  addItem() {

  }

  removeItem() {

  }

 

  clear() {

  }

//содержимое корзины

  fetchData(callback) {
    fetch(`${API}/getBasket.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.goods = data;
        callback();
      });
  }

  getTotalPrice() {

  }
  render(){
  
  }
  
  }
  
  class BasketItem {
    constructor({title}){
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
const goodList = new GoodList(basket);
//goodList.fetchData();
goodList.render();
//goodList.getTotalPrice();
goodList.fetchData(() => {
  goodList.render();
  goodList.getTotalPrice();
});




