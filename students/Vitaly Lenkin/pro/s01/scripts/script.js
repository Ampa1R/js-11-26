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

const eachGoodsItem = (title, price = 'Под заказ', image='') =>
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