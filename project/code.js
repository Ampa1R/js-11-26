const API = 'https://github.com/begemot39/js-11-26/tree/master/project';

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

fetchData(callback) {
  sendRequest('data.json', (data) => {
    this.goods = data;
    callback();
  });
}



addToBasket(item) {
  this.basket.add(item);
}

getTotalPrice() {
  const total = this.goods.reduce((acc, curVal) => acc + curVal.price, 0);

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
    fetch(`${API}/data.json`)
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