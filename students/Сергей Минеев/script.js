const goods = [
  { title: 'Ноутбук', price: 30000 },
  { title: 'Клавиатура', price: 1000 },
  { title: 'Мышь', price: 500 },
  { title: 'Монитор', price: 10000 },
];

const renderGoodsItem = (title, price) => { //смысла в аргументах по умолчанию не вижу... Ибо функция вызывается по факту обхода массива... Проще делать на уровне массива проверки... Либо на уровне функции его формирования, если да кабы...
    return `
      <div class="item" style="display: flex; flex-direction: column;">
	<!-- А сюда можно пихнуть картинушек -->
        <h4 style="font-size: 24px; text-align: center;">${title}</h4>
        <p style="font-size: 14px; text-align: center;">${price}</p>
	<button type="button" class="cart-button-bye" style="width: 80px; font-size: 18px; margin: auto; border-radius: 5px;">Купить</button>
      </div>
    `;
}

const renderGoods = (list = [{title: "Нет товара", price: "Безценный"}]) => { // А вот тут можно задать параметр, если вдруг не будет товаров в корзине, а её откроют...
  document.querySelector('.goods').innerHTML = (list.map(item => renderGoodsItem(item.title, item.price))).join(""); // запятые формируются из функции map (она генерит новый массив). Посему, преобразовываем массив в строку без разделителя и отправляем в функцию. Ну и обойдёмся без лишних переменных, а сразу это вытащим на экран юзеру...
}

renderGoods(goods);
