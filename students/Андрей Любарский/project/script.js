'use strict';


class Item {

    constructor(itm) {
        this.product_name = itm.product_name;
        this.price = itm.price;
        this.id = 0;
    }

    render() {
        return `
            <div class="item">
                <div class="pic"></div>
                <h4>${this.product_name}</h4>
                <p>Цена: ${this.price}</p>
                <button class="add-button" id="${this.id}">Купить</button>
            </div>
            `
    }
}

class CatalogueGoods {
    constructor() {
        this.goods = [];
        this.API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
        this.fetchGoods();
    }


    fetchGoods() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `${this.API}/catalogData.json`);
            xhr.onload = function () {
                if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };

            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }

            xhr.send();

        });

    }


    render() {
        const items = this.goods.map( itm => {
            const item = new Item(itm);
            return item.render();
        });
        document.querySelector('.catalogue').insertAdjacentHTML('beforeend', items.join(''));
    }


    init() {
        this.fetchGoods()
            .then((res) => {
                res.forEach((el) => {
                    this.goods.push(el);
                })
            })
            .then(() => this.render())
            .catch(err => console.log(err));
        this.render();
    }

}


class CartItem extends Item {
    constructor(itm) {
        super(product_name, price);
        this.id = itm.id;
        this.quantity = 0;
    }

    render(itm) {
        return `
            <div class="item">
                <div class="pic"></div>
                <h4>${itm.product_name}</h4>
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
catalogue.init();

const cart = new Cart();
// cart.render();



