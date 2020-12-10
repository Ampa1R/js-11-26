'use strict';

const goods = [
    {title: 'Ноутбук', price: 30000},
    {title: 'Клавиатура', price: 1000},
    {title: 'Мышь', price: 500},
    {title: 'Монитор', price: 10000}
];

const renderGoodsItem = (title = 'Название товара', price = 'Стоимость - по запросу.') =>
    `
        <div class="item">
            <img class='product_img' src="" alt="">
            <h4 class='product_name'>${title}</h4>
            <p class='product_price'>${price}\n\u20bd</p>
            <button type="button" class="buy_button">Купить</button>
        </div>
    `;

const renderGoods = (list = [null]) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods').innerHTML = goodsList.join('');  // .join(''); - убрали запятые после каждого товара (объединение элементов массива в строку, с возможностью в скобках указать нужный разделитель).
};

renderGoods(goods);
