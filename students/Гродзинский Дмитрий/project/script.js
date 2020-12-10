const goods = [
  { title: 'Ноутбук', price: 30000 },
  { title: 'Клавиатура', price: 1000 },
  { title: 'Мышь', price: 500 },
  { title: 'Монитор', price: 10000 },
];

const renderGoodsItem = (title = 'товар', price = 0) => {
  return `
        <div class="item mb-4 shadow-sm">
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>${title}</li>
            </ul>
            <h1 class="card-title pricing-card-title">${price}</h1>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary">купить</button>
            </div>
          </div>
        </div>
      `;
}

const renderGoods = (list) => {
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods').innerHTML = goodsList.join(" ");
}

renderGoods(goods);
