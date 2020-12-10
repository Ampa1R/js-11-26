var goods = [
  { title: "Ноутбук", price: 30000, image: "1.jpg" },
  { title: "Клавиатура", price: 1000, image: "2.jpg" },
  { title: "Мышь", price: 500, image: "3.jpg" },
  { title: "Монитор", price: 10000, image: "4.jpg" },
];
const renderGoods = (list) => {
  list.forEach(function (element) {
    var elem = document.createElement("div");
    elem.setAttribute("class", "item");
    elem.innerHTML = `<img src="img/${element.image}" alt="КАРТИНКА">
      <h4>${element.title}</h4>
      <p>${element.price}</p>
      <button>КУПИТЬ</button>`;
    document.querySelector(".goods").append(elem);
  });
};
renderGoods(goods);
