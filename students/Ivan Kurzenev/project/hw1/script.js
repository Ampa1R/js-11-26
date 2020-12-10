const goods = [
  { title: 'Наушники', price: 5000 },
  { title: 'Клавиатура', price: 3000 },
  { title: 'Мышь', price: 2500 },
  { title: 'Монитор', price: 18000 },
];

const renderGoodsItem = (title = "title", price = "price", link = "#") => 
`<div class="item">
  <a class="item__link" href="${link}">
  <img class="item__image" src="img/${title}.jpg" alt="${title}">
  </a>
  <h4 class="item__title marginTop">${title}</h4>
  <p class="item__price marginTop">Цена: ${price} &#8381;</p>
  <button type="button" class="item__buy-button marginTop">Купить</button>
</div>`;

const renderGoods = (list = goods) => {
  const goodsList = list.map((item) => renderGoodsItem(item.title, item.price));
  // document.querySelector('.goods').innerHTML = goodsList;
  document.querySelector('.goods').innerHTML = goodsList.join('');
}

renderGoods(goods);
