  class GoodsItem {
    constructor({ title, price }) {
      this.title = title;
      this.price = price;
    }

    render() {
      return `
      <div class="goods-item">
      <a class="item__link" href="${this.link}">
      <img src="img/${this.title}.jpg" alt="#"></a>
      <h3>${this.title}</h3>
      <p>${this.price}</p>
      <button>В корзину</button></div>
      `;
    }
  }

  class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchData() {
      this.goods = [
        { title: 'Ноутбук', price: 30000 },
        { title: 'Клавиатура', price: 1000 },
        { title: 'Монитор', price: 10000 },
        { title: 'Мышь', price: 500 },
      ];
    }

    getTotalPrice () {
      let total = 0
      this.goods.forEach(item => {
        total += item.price;
      });
      console.log(total);
      return total;
    }

    render () {
      const goodsList = this.goods.map(item => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      });
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }
  }
    
  const goodsList = new GoodsList();
  goodsList.fetchData();
  goodsList.render();

  class Basket {
    constructor() {
      this.basketGoods = [];
    }

    addItem () {

    }

    removeItem () {

    }

    changeQuantity () {

    }

    clear () {

    }

    move () {

    }

    order () {

    }

    render ()
  }

  class BasketItem {
    constructor ({title, price}) {
      this.title = title;
      this.price = price;
    }


    changeQuantity () {
      
    }

    removeItem () {

    }

    render ()

  }