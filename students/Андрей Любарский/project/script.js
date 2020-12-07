'use strict';

const goods = [
    {title: 'Ноутбук', price: 30000},
    {title: 'Клавиатура', price: 1000},
    {title: 'Мышь', price: 500},
    {title: 'Монитор', price: 10000},
];


class Item {

    constructor(itm) {
        this.title = itm.title;
        this.price = itm.price;
        this.id = 0;
    }

    render() {
        return `
            <div class="item">
                <div class="pic"></div>
                <h4>${this.title}</h4>
                <p>Цена: ${this.price}</p>
                <button class="add-button" id="${this.id}">Купить</button>
            </div>
            `
    }
}

class CatalogueGoods {
    constructor() {
        this.goods = [];
        this.fetchGoods(goods);
    }

    fetchGoods(goods) {
        goods.forEach((el, i) => {
            el.id = i + 1;
            this.goods.push(el);
        });
    }

    //

    render() {
        const items = this.goods.map((itm, i) => {
            const item = new Item(itm);
            return item.render();
        });
        document.querySelector('.catalogue').insertAdjacentHTML('beforeend', items.join(''));
    }
}


class CartItem extends Item {
    constructor(itm) {
        super(title, price);
        this.id = itm.id;
        this.quantity = 0;
    }

    render(itm) {
        return `
            <div class="item">
                <div class="pic"></div>
                <h4>${itm.title}</h4>
                <p>Цена: ${itm.price}</p>
                <p>Количество: ${itm.quantity}</p>
                <button class="remove-button" id="${itm.id}">Не покупать</button>
            </div>
        `
    }

}


class Cart {
    constructor() {
        this.goods = [];
    }

    addItem(item) {
        if (this.goods.some(el => el.id === item.id)) {
            this.goods.forEach(el => {
                if (el.id === item.id) el.quantity += 1;
            });
        } else {
            const itm = new CartItem(item);
            itm.quantity = 1;
            this.goods.push(itm);
        }
    }

    removeItem(id) {
        this.goods.forEach((el, i) => {
            if (el.id === id) this.goods.splice(i, 1)
        })
    }


    clearCart() {
        this.goods.splice(0);
        this.render();
    }

    getTotalPrice() {
        return this.goods.reduce((res, el) => {
            res += el.price * el.quantity
        }, 0);
    }

    getTotalQuantity() {
        return this.goods.reduce((res, el) => {
            res + el.quantity
        }, 0);
    }


    render() {
        const items = this.goods.map(itm => CartItem.render(itm));
        document.querySelector('.cart').innerHTML = '';
        document.querySelector('.cart').insertAdjacentHTML('beforeend', items.join(''));
        if (this.goods.length) {
            document.querySelector('.cart').insertAdjacentHTML('afterend', `<p>В корзине ${this.getTotalQuantity()} товаров на общую сумму ${this.getTotalPrice()}</p>`);
        } else {
            document.querySelector('.cart').insertAdjacentHTML('afterend', `<p>Корзина пуста</p>`);
        }
    }

}


const catalogue = new CatalogueGoods();
catalogue.render();

const cart = new Cart();
// cart.render();


/***************************************************************************************************************/
/*Задача со звёздочкой довольно скучная, в условии ни разу не прописано, что начинок несколько, так что везде
справляемся свитчами, верифицируем данные на этапе ввода. Итог выводим в строку. */
/***************************************************************************************************************/


class Hamburger {
    size;
    filling;
    isSpiced;
    isWithSauce;
    price = 0;
    calories = 0;

    constructor() {
        let size = +prompt(`Выберите размер гамбургера, 1 - маленький, 2 - большой`);
        if (size === 1) {
            this.size = this.chooseSize(1);
        } else if (size === 2) {
            this.size = this.chooseSize(2);
        } else {
            alert('Неправильный размер, на выбор варианты 1 и 2');
            size = +prompt(`Выберите размер гамбургера, 1 - маленький, 2 - большой`);
        }


        let filling = +prompt(`Выберите начинку гамбургера, 1 - сыр, 2 - салат, 3 - картофель`);
        if (filling === 1) {
            this.filling = this.chooseFilling(1);
        } else if (filling === 2) {
            this.filling = this.chooseFilling(2);
        } else if (filling === 3) {
            this.filling = this.chooseFilling(3);
        } else {
            alert('Неправильная начинка, на выбор варианты 1, 2 и 3');
            filling = +prompt(`Выберите начинку гамбургера, 1 - сыр, 2 - салат, 3 - картофель`);
        }


        let spice = +prompt('Посыпать гамбургер специями? 1 - да, 2 - нет');
        if (spice === 1) {
            this.isSpiced = this.chooseSpice(1);
        } else if (spice === 2) {
            this.isSpiced = this.chooseSpice(2);
        } else {
            alert('Неправильный выбор, варианты 1 и 2');
            spice = +prompt('Посыпать гамбургер специями? 1 - да, 2 - нет');
        }


        let sauce = +prompt('Полить гамбургер соусом? 1 - да, 2 - нет');
        if (sauce === 1) {
            this.isWithSauce = this.chooseSauce(1);
        } else if (sauce === 2) {
            this.isWithSauce = this.chooseSauce(2);
        } else {
            alert('Неправильный выбор, варианты 1 и 2');
            sauce = +prompt('Полить гамбургер соусом? 1 - да, 2 - нет');
        }

        alert(`Вы купили ${this.size} гамбургер, начинка ${this.filling}, ${this.isSpiced ? 'со специями' : ''} ${this.isWithSauce ? 'с соусом' : ''}. 
        Общая цена: ${this.price}, общая калорийность: ${this.calories}`)
    }

    chooseSize(a) {
        switch (a) {
            case 1:
                this.price += 50;
                this.calories += 20;
                return 'маленький';
            case 2:
                this.price += 100;
                this.calories += 40;
                return 'большой';
        }
    }

    chooseFilling(a) {
        switch (a) {
            case 1:
                this.price += 10;
                this.calories += 20;
                return 'сыр';
            case 2:
                this.price += 20;
                this.calories += 5;
                return 'салат';
            case 3:
                this.price += 15;
                this.calories += 10;
                return 'картофель'
        }
    }

    chooseSpice(a) {
        switch (a) {
            case 1:
                this.price += 15;
                return true;
            case 0:
                return false;
        }
    }

    chooseSauce(a) {
        switch (a) {
            case 1:
                this.price += 20;
                this.calories += 5;
                return true;
            case 2:
                return false;
        }
    }

}

