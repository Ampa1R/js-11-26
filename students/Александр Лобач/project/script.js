'use strict'

const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title = '...', price = 'Нет в наличие') => {
    return `<div class="catalog-column">
                <div class="catalog-item">
                
                    <h3 class="item-heading">${title}</h3>
                    <p class="item-description">Lorem ipsum dolor sit amet.</p>
                    <p class="item-price">${price} &#8381;</p>
                    <button type="button" class="btn btn-primary item-to-cart-button">Добавить в корзину</button>
                </div>
            </div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.catalog').innerHTML = goodsList.join('');
}

renderGoodsList(goods);