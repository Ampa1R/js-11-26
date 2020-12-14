const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const sendRequest = (path) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
  
    xhr.timeout = 10000;
  
    xhr.ontimeout = () => {
      console.log('timeout!');
    }
  
    xhr.onreadystatechange = () => {
      // console.log('ready state change', xhr.readyState);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.log('Error!', xhr.responseText);
          reject(xhr.responseText);
        }
      }
    }
  
    xhr.open('GET', `${API}/${path}`);
  
    // xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.send();
  });
}

class GoodsItem {
    constructor({ product_name, price }) {
      this.title = product_name;
      this.price = price;
    }

    render() {
        return `
            <div class="item">
                <div class="item-img">
                </div>
                <div class="item-text">
                    <h4>${this.title}</h4>
                    <p>${this.price}</p>
                    <button type="button">Add to basket</button>
                </div>
            </div>
            `
    }
}

class GoodsList {
    constructor(basket) {
        this.goods = [];
        this.basket = basket;
    }

    fetchData(callback) {
        sendRequest('catalogData.json', (data) => {
            this.goods = data;
            callback();
        });
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

    addToBasket(item) {
        this.basket.add(item);
    }

    render () {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }

    getTotalPrice() {
        return this.goods.reduce((acc, curVal) => {
            return acc + curVal.price;
        }, 0);
    }
}


class Basket {
    constructor() {
        this.basketGoods = [];
    }

    render() {

    }
    
    chooseAllItems(){

    }

    makeOrder() {

    }

    addPromocode() {

    }
}

class BasketItem {
    constructor({title}) {
        this.title = title;
    }

    render() {

    }
    
    deleteFromBasket() {

    }

    chooseQuantity() {

    }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);
//goodsList.fetchData();
//goodsList.render();
//goodsList.getTotalPrice();
goodsList.fetchData(() => {
    goodsList.render();
    goodsList.getTotalPrice();
});