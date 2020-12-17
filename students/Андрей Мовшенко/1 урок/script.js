  const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

  const sendRequest = (path) => {
    return new Promise ((resolve, reject) => {
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

      xhr.open('GET', `${API}/${path}`)

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
      <div class="item" data-id="${this.id}">
      <a class="item__link" href="${this.link}">
      <img src="img/${this.title}.jpg" alt="#"></a>
      <h3>${this.title}</h3>
      <p>${this.price}</p>
      <button type="button" name="add-to-basket">В корзину</button>
      </div>
      `;
    }
  }

  class GoodsList {
    constructor(basket) {
      this.goods = [];
      this.basket=basket;

      document.querySelector('.goods').addEventListener('click', (event) => {
        if (event.target.name === 'add-to-basket') {
          const id = event.target.parentElement.dataset.id;
          const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
          if (item) {
            this.addToBasket(item);
          } else {
            console.error(`Can't find element with id ${id}`)
          }
        }
      });
    }


    fetchData() {
      return new Promise((resolve, reject) => {
        sendRequest('catalogData.json')
          .then((data) => {
            this.goods = data;
            resolve();
          });
      });
    }

    newFetchData(callback) {
      fetch (`${API}/catalogData.json`)
      .then((response) => {
        console.log (response);
        return response.json()
      })
      .then((data) => {
        console.log (data);
        this.goods = data;
        callback()
      });
    }

    addToBasket(item) {
      this.basket.addItem(item);
    }

    getTotalPrice () {
     return this.goods.reduce((acc, curVal) => {
       return acc + curVal.price;
     }, 0);
    }

  
    render () {
      const goodsList = this.goods.map(item => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }
  }


  class Basket {
    constructor() {
      this.basketGoods = [];
      this.amount = 0;
      this.countGoods = 0;
    }

    addItem (item) {
      this.basketGoods.push (item);
      console.log(this.basketGoods);
    }

    removeItem (id) {
      this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product != parseInt(id));
    }

    changeQuantity () {

    }

    clear () {

    }

    fetchData () {
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

   /* move () {

    }

    order () {

    }

    render ()*/
  }


 /* class BasketItem {
    constructor ({title, price}) {
      this.title = title;
      this.price = price;
    }


    changeQuantity () {
      
    }

    removeItem () {

    }

    render ()

  } */


  const basket = new Basket();
  const goodsList = new GoodsList(basket);
  goodsList.fetchData()
    .then(() => {
      goodsList.render();
      goodsList.getTotalPrice();
});