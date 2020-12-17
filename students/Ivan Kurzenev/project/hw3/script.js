const API = 'https://raw.githubusercontent.com/Variasco/js-11-26/master/students/Ivan%20Kurzenev/testfiles/';
// https://raw.githubusercontent.com/Variasco/js-11-26/master/students/Ivan%20Kurzenev/testfiles/dataCart.json

const sendRequest = (path) => {
  return new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
      console.log("timeout!");
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Error!', xhr.responseText);
        }
      }
    }

    xhr.open('GET', `${API}${path}`);

    xhr.send();
  });
}

class GoodsItem {
  constructor({ id_product, title, price }) {
    this.id = id_product;
    this.title = title;
    this.price = price;
  }

  render = () => 
    `<div class="item" data-id="${this.id}">
      <a class="item__link" href="#">
        <img class="item__image" src="img/${this.title}.jpg" alt="${this.title}">
      </a>
      <h4 class="item__title marginTop">${this.title}</h4>
      <p class="item__price marginTop">Цена: ${this.price} &#8381;</p>
      <button type="button" class="item__buy-button marginTop" name="add-to-basket">В корзину</button>
      <button type="button" class="item__buy-button marginTop" name="remove-from-basket">Удалить</button>
    </div>`;
}

class GoodsList {
  constructor(cart) {
    this.goods = [];
    this.cart = cart;

    document.querySelector('.goods').addEventListener('click', (event) => {
      if( event.target.name === 'add-to-basket') {
        const id = event.target.parentElement.dataset.id;
        const item = this.goods.find((goodsItem) => goodsItem.id_product === +id);
        
        if (item) {
          this.addToCart(item);
        } else {
          console.error (`Element not found! Id: ${id}`);
        }
      } else if (event.target.name === 'remove-from-basket') {
        const id = event.target.parentElement.dataset.id;
        this.deleteFromCart(id);
      }
    });

    // document.querySelector('.remove-button').addEventListener('click', (event) => {
    //   if( event.target.name === 'remove-from-basket') {
    //     this.deleteFromCart();
    //   }
    // });

    document.querySelector('.clear-cart').addEventListener('click', (event) => {
      if( event.target.name === 'clear-cart') {
        this.clearCart();
      }
    });
  }

  fetchData = () => {
    return new Promise((resolve, reject) => {
      sendRequest('data.json')
      .then((data) => {
        this.goods = data;
        resolve();
      })
      .catch((data) => {
        reject(data);
      });
    })
  }

  addToCart(item) {
    this.cart.addItem(item);
  }

  deleteFromCart(id) {
    this.cart.deleteItem(id);
  }

  clearCart() {
    this.cart.clear();
  }

  render() {
    const goodsList = this.goods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }

  totalPrice() {
    return this.goods.reduce((acc, curVal) => acc + curVal.price, 0);
  }
}

class Cart {
  constructor() {
    this.cartGoods = [];
  }

  addItem(item) {
    this.cartGoods.push(item);
    console.log(this.cartGoods);
  }

  deleteItem(id) {
    let index = 0;
    for (let good of this.cartGoods) {
      if (good.id_product === +id) {
        break;
      }
      index++;
    }

    this.cartGoods.splice(index, 1);
    console.log(this.cartGoods);
  }

  clear() {
    this.cartGoods = [];
    console.log(this.cartGoods);
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      sendRequest('dataCart.json')
        .then((data) => {
          this.basketGoods = data.content;
          this.amount = data.amount;
          this.countGoods = data.countGoods;
          resolve();
        })
        .catch((data) => {
          reject(data);
        });
    })
  }

  // buy() {
  // }

  // render() {
  // }

  // totalPrice() {
  // }
}

class CartItem {
  constructor({ title }) {
    this.title = title;
  }

  // render() {
  // }
}

const cart = new Cart();
const goodsList = new GoodsList(cart);
goodsList.fetchData()
  .then(() => {
    goodsList.render();
    goodsList.totalPrice();
  })
  .catch((data) => {
    alert(data);
  });