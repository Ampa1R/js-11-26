//... Data Base
const goods = [{
   title: 'Ноутбук',
   price: 30000,
   image: "nout.webp"
}, {
   title: 'Клавиатура',
   price: 1900,
   image: "kbd01.jpg"
}, {
   title: 'Мышь',
   price: 2500,
   image: "mouse.jpeg"
}, {
   title: 'Монитор',
   price: 30000,
   image: "mon.jpg"
}, {
   title: 'Ноутбук',
   price: 45000,
   image: "nout02.png"
}, {
   title: 'Клавиатура',
   price: 7000,
   image: "kbd02.jpg"
}, {
   title: 'Мышь',
   price: 700,
   image: "mouse02.jpeg"
}, {
   title: 'Монитор',
   price: 35000,
   image: "mon02.jpg"
}, {
   title: 'Ноутбук',
   price: 30000,
   image: "nout.webp"
}, {
   title: 'Клавиатура',
   price: 1000
}, {
   title: 'Мышь',
   price: 500
}, {
   title: 'Монитор',
}, ];


//
//... Declarations

/*
//... Old school
//для теста
const eachGoodsItem = (title, price = 'Под заказ', image = '') =>
   `
<!-- Product -->
<div class="card">
<a class="card-link" href="#">
<img src="images/${(image) ? image: 'nophoto.png'}" alt="photo product-1" class="card-img">
</a>
<div class="card-info">
<a href="" class="card-title">${title}</a>
<div class="card-descr"></div>
<div class="card-price">${price}
<img src="images/stars.png" alt="Raiting stars" class="card-stars">
</div>
</div>
<a href="#" class="add-to-cart">Add to Cart</a>
</div>
`;

const renderGoods = (list = []) => {
   const goodsList = list.map(item => eachGoodsItem(item.title, item.price, item.image));
   document.querySelector('.goods').innerHTML = goodsList.join('');
};

renderGoods(goods);

*/

//
//... класс Продукт
class ProductClass {

   constructor({
      title,
      price,
      image
   }) {
      this.title = title;
      this.price = price ? price : 'Под заказ';
      this.image = image;
   }

   wrap() {
      return `
         <!-- Product -->
         <div class="card">
            <a class="card-link" href="#">
               <img src="images/${(this.image) ? this.image: 'nophoto.png'}" alt="photo product-1" class="card-img">
            </a>
            <div class="card-info">
               <a href="" class="card-title">${this.title}</a>
               <div class="card-descr"></div>
               <div class="card-price">${this.price}
                  <img src="images/stars.png" alt="Raiting stars" class="card-stars">
               </div>
            </div>
            <a href="#" class="add-to-cart">Add to Cart</a>
         </div>
      `;
   }
}
//... класс Галерея продуктов
class ProductGalleryClass {
   constructor(list = []) {
      this.productList = list;
   }
   render() {

      const productList = this.productList.map(item => new ProductClass(item).wrap());
      document.querySelector('.goods').innerHTML += productList.join('');

   }
   getTotal() {
      return this.productList.reduce(
         (acc, curVal) => { return acc + curVal.price; }, 0);
   }
}

const goodsList = new ProductGalleryClass(goods);
goodsList.render();
goodsList.getTotal();


//
//... Реализация корзины
const 
   selectedList = [],
   compareList = [],    //TODO нужен класс для объекта Сравнение товаров
   favorityList = [];   //TODO нужен класс для объекта Избранное


class Cart {
   constructor() {
     this.list = [];
     this.total = 0;
     this.pos = 0;
     this.id = null;   //reserved
     this.orderNo = null;
     this.orderId = null;
   }
 
   render() {}
   addItem() {}
   addSelected() {}
   deleteItem() {}
   deleteSelected() {}
   deleteAll() {}
   toShop() {}
   toOrder() {}
   showItem() {}
   createFromOrder() {}
   help() {}
   cancelCart() {}
   sortItems() {}
 }
 
 class CartItem {
   constructor(product, qty) {
     this.product = product;
     this.qty = qty;
   }
   stockLimit() {}
   stockQty() {}
   stockDelay() {}
   stockCheck() {} 
   render() {}
 }