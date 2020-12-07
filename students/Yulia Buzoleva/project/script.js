const goods = [
    { title: 'Ноутбук', price: 30000 },
    { title: 'Клавиатура', price: 1000 },
    { title: 'Мышь', price: 500 },
    { title: 'Монитор', price: 10000 },
    { title: 'Ноутбук' },
    { price: 10000 },
];

const renderGoodsItem = (title = 'Товар отсутствует на складе', price = 'Для уточнения цены свяжитесь с менеджером') => {
    return `
        <div class="item">
            <div class="item-img">
            </div>
            <div class="item-text">
                <h4>${title}</h4>
                <p>${price}</p>
            </div>
        </div>
        `;
}

const renderGoods = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods').innerHTML = goodsList.join('');
}

renderGoods(goods);