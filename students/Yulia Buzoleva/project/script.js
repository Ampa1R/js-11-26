const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const sendRequest = (path) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
  
    xhr.timeout = 10000;
  
    xhr.ontimeout = () => {
      console.log('timeout!');
    }
  
    xhr.onreadystatechange = () => {
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
  
    xhr.send();
  });
}

class GoodsItem {
    constructor({ id_product, product_name, price }) {
        this.id = id_product;
        this.title = product_name;
        this.price = price;
    }

    render() {
        return `
            <div class="item">
                <div class="item-img">
                </div>
                <div class="item-text" data-id="${this.id}">
                    <h4>${this.title}</h4>
                    <p>${this.price}</p>
                    <button type="button" name="add-to-basket">Add to basket</button>
                </div>
            </div>
            `
    }
}

class GoodsList {
    constructor(basket) {
        this.goods = [];
        this.filteredGoods = [];
        this.basket = basket;

        //По клику на кнопку Добавить в корзину запускается функция добавления в корзину addToBasket
        document.querySelector('.goods').addEventListener('click', (event) => {
            if (event.target.name === 'add-to-basket') {
                //console.log(event);
                const id = event.target.parentElement.dataset.id;
                const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
                if (item) {
                    this.addToBasket(item);
                } else {
                    console.error (`Can't find element with id ${id}`);
                }
            }
        });

        // при вводе в поле input запускается функция search, которая сравнивает введеное 
        //значение с названием товара, отфильтровывает подходящие товары и выводит их на экран
        document.querySelector('.search').addEventListener('input', (event) => {
            this.search(event.target.value);
        });

        /*document.querySelector('.search').addEventListener('keydown', (event) => {
            console.log(event);
            this.search(event.target.value);
        });*/
    }

    fetchData() {
        return new Promise((resolve, reject) => {
            sendRequest('catalogData.json')
                .then((data) => {
                    this.goods = data;
                    this.filteredGoods = data;
                    resolve();
                });
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
        this.basket.addItem(item);
    }

    render() {
        const goodsList = this.filteredGoods.map(item => {
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

    search(value) {
        const regexp = new RegExp(value.trim(), 'i');
        this.filteredGoods = this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        this.render();
    }
}


class Basket {
    constructor() {
        this.basketGoods = [];
        this.amount = 0;
        this.countGoods = 0;
    }

    addItem(item) {
        //проверка на то, включает ли уже корзина товар, если да, то просто увеличивается кол-во
        const index =  this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
        if (index > -1) {
            this.basketGoods[index].quantity += 1;
            //this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index] + 1}
        // если в корзине такого товара еще нет, то добавляем его
        } else {
            this.basketGoods.push(item);
            console.log(this.basketGoods);
        }
    }

    removeItem(id) {
        this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
        console.log(this.basketGoods);
    }

    render() {

    }
    
    chooseAllItems(){

    }

    makeOrder() {

    }

    fetchData() {
        return new Promise((resolve, reject) => {
            sendRequest('getBasket.json')
                .then((data) => {
                    this.basketGoods = data.contents;
                    this.amount = data.amount;
                    this.countGoods = data.countGoods;
                    console.log(this);
                    resolve();
                });
        });
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
basket.fetchData();
const goodsList = new GoodsList(basket);
goodsList.fetchData()
    .then(() => {
        goodsList.render();
        goodsList.getTotalPrice();
    });