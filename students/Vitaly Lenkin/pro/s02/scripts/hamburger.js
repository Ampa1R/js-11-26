var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var sizeSel = document.getElementById('size');
var stufSel = document.getElementById('stuffing');
var toppSel = document.getElementById('topping');
var createHamb = document.getElementById('create');
var item = document.querySelectorAll('.delete');

var hamburgerMenu = {
   size: {
      little: {name: 'Малый', price: 50, calories: 20}, 
      normal: {name: 'Средний', price: 75, calories: 30}, 
      big: {name: 'Большой', price: 100, calories: 40}
   },
   stuffing: {
      cheese: {name: 'с сыром', price: 10, calories: 20},
      salad: {name: 'с салатом', price: 20, calories: 5},
      potato: {name: 'с картошкой', price: 15, calories: 10}      
   },
   topping: {
      none: {name: 'по желанию', price: 0, calories: 0},
      standard: {name: 'с приправой', price: 15, calories: 0},
      mayonez: {name: 'с майонезом', price: 20, calories: 5}      
   }
};

class CreateHamburger {
   constructor (size = '', stuffing = '', topping = '') {
      this.size = size;
      this.stuffing = stuffing;
      this.topping = topping;
   }
   //... Расчет полной стоимости гамбургера согласно опциям
   totalPrice(){
      return hamburgerMenu.size[this.size].price + hamburgerMenu.stuffing[this.stuffing].price + hamburgerMenu.topping[this.topping].price;
   }
   //... Расчет калорийности гамбургера согласно опциям
   totalCalories(){
      return hamburgerMenu.size[this.size].calories + hamburgerMenu.stuffing[this.stuffing].calories + hamburgerMenu.topping[this.topping].calories;

   }
   //... Инициализация формы ввода опций
   initForm() {
      //... Размещаем опции размера гамбургера
      for ( let key in hamburgerMenu.size) {
         let op = document.createElement('option');
         op.className = 'uk-option uk-text-meta sizeOpt';
         op.value = key;
         op.appendChild(document.createTextNode(hamburgerMenu.size[key].name));
         sizeSel.appendChild(op);
      };
      //... Размещаем опции начинки гамбургера
      for (let key in hamburgerMenu.stuffing) {
         let op = document.createElement('option');
         op.className = 'uk-option uk-text-meta stufOpt';
         op.value = key;
         op.appendChild(document.createTextNode(hamburgerMenu.stuffing[key].name));
         stufSel.appendChild(op);
      };
      //... Размещаем опции заправки гамбургера
      for (let key in hamburgerMenu.topping) {
         let op = document.createElement('option');
         op.className = 'uk-option uk-text-meta toppOpt';
         op.value = key;
         op.appendChild(document.createTextNode(hamburgerMenu.topping[key].name));
         toppSel.appendChild(op);
      }
   }
   //... Создаем гамбургер по клику согласно опциям
   createOne (e) {      
      e.preventDefault();       
      //... Читаем поля формы
      let selectedSize = sizeSel.value;
      let selectedStaf = stufSel.value;
      let selectedTopp = toppSel.value;
               
      //... Создаем строку для гамбургера
      let li = document.createElement('li');

      const gamb = new CreateHamburger (
         selectedSize, 
         selectedStaf, 
         selectedTopp 
         // (selectedTopp == 'по желанию') ? '' : selectedTopp // проверяем, но не здесь
      );
      // li.className = 'uk-margin list-item';
      li.style = 'width: 100%; display: flex; flex-direction: row; align-items:center;';
      //... Всю сборку записываем в строку
      //li.appendChild(document.createTextNode(`
      //... Можно прямо в элемент без лишней переменной... но пока так
      let liHTML = 
      `
      <div style="width:30%">Гамбургер  <b>${hamburgerMenu.size[selectedSize].name.toUpperCase()}</b> </div>
      <div style="width:20%"> ${hamburgerMenu.stuffing[selectedStaf].name} </div>
      <div style="width:20%"> ${(gamb.topping == 'none') ? '' : hamburgerMenu.topping[selectedTopp].name}</div> 
      <div style="width:26%"> --  ${gamb.totalPrice()} Р (<b>${gamb.totalCalories()}</b> калорий)</div>
      `;
      li.innerHTML = liHTML;
      
      //... Создаем кнопку для удаления строки
      let deleteBtn = document.createElement('button');      
      deleteBtn.className = 'uk-button uk-button-danger uk-button-small uk-align-center-right uk-flex delete';      
      deleteBtn.appendChild(document.createTextNode('X'));
      // deleteBtn.appendChild(document.createTextNode('<span uk-icon="close"></span>'));
      li.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', gamb.removeItem);
      itemList.appendChild(li);
   }
   //... Удаление строки по клику
   removeItem(e) {
      if (e.target.classList.contains('delete')) {
         if (confirm('Точно удалять?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
         }
      }
   }
}
//... Инициализируем пустой гамбургер, чтобы получить доступ к форме
const gamb = new CreateHamburger();
gamb.initForm();
//... Вешаем обработчик на кнопку "создать"
createHamb.addEventListener('click', gamb.createOne);
// gamb.createOne();    // трейсер
// console.log( gamb )  // трейсер
//!item.forEach(addEventListener('click', gamb.removeItem)); // убрал в элементы

// console.log ( gamb, gamb.totalPrice(), gamb.totalCalories() );


