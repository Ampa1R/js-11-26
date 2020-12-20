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
                }
            }
        }

        xhr.open('GET', `${API}/${path}`);

        // xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send();
    })
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
        <h4>${this.title}</h4>
        <p>${this.price}</p>
        <button type="button" name="add-to-basket">Add to basket</button>
      </div>
    `;
  }
}

class GoodsList {
  constructor(basket) {
    this.goods = [];
    this.filteredGoods = [];
    this.basket = basket;
    

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

    document.querySelector('.search').addEventListener('input', (event) => {
      this.search(event.target.value);
    });

    // document.querySelector('.search').addEventListener('keydown', (event) => {
    //   console.log(event);
    //   this.search(event.target.value);
    // });
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
    sum() {
        let sum = 0;
        this.goods.map(item => {
            return sum += item.price;
        });
        document.querySelector('.goods').append("Итоговая сумма : " + sum);
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
    const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
    if (index > -1) {
      this.basketGoods[index].quantity += 1;
      // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
    } else {
      this.basketGoods.push(item);
    }
    console.log(this.basketGoods);
  }

  removeItem(id) {
    this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
    console.log(this.basketGoods);
  }

  changeQuantity() {

  }

  clear() {

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

  applyPromoCode() {

  }

  getDeliveryPrice() {

  }

  createOrder() {

  }

  getTotalPrice() {

  }

  render() {

  }
}

class BasketItem {
  constructor({ title }) {
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
basket.fetchData();
const goodsList = new GoodsList(basket);
goodsList.fetchData().then(() => {
    goodsList.render();
    goodsList.sum();
});
