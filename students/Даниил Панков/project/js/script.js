"use strict"

const API_URL = 'https://raw.githubusercontent.com/Tippman/js-11-26/master/students/%D0%94%D0%B0%D0%BD%D0%B8%D0%B8%D0%BB%20%D0%9F%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2/other';

new Vue({
    el: '#shop',
    data: {
        name: "ssdf",
        goods: [],
        filteredGoods: [],
        searchLine: '',
        basketGoods: [],
        isBasketActive: true,
    },

    computed: {
        totalPrice() {
            return this.basketGoods.reduce((totalPrice, current) => totalPrice + current.price, 0);
        }
    },

    methods: {
        search(event) {
            this.searchLine = event.target.value;
            const regExp = new RegExp(this.searchLine, 'i')
            this.filteredGoods = this.goods.filter(goodsItem => regExp.test(goodsItem.title));
        },

        makeGetRequest(url) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.timeout = 2000;

                xhr.ontimeout = () => { console.log('timeout') };

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            const data = JSON.parse(xhr.responseText);
                            resolve(data);
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                }

                xhr.open('GET', url, true);
                xhr.send();
            })
        },

        fetchData() {
            return this.makeGetRequest(`${API_URL}/products_list.json`)
                .then(data => this.goods = data)
                .then(data => this.filteredGoods = data);
        },

        fetchbasket() {
            return this.makeGetRequest(`${API_URL}/basket_list.json`)
                .then(data => this.basketGoods = data);
        },

        addToBasket(item) {
            this.basketGoods.push(item);
        },

        removeFromBasket(item) {
            this.basketGoods.pop(item);
        },

        clearBasket() {
            this.basketGoods = [];
        },

    },
    mounted() {
        this.fetchData();
        this.fetchbasket();
    }
});


// class GoodsItem {
//     constructor({ product_id, title, price, cover }) {
//         this.product_id = product_id;
//         this.title = title;
//         this.price = price;
//         this.cover = cover;
//     }

//     render() {
//         return `
//             <div class="card mt-3 mr-3 mb-3 ml-3">
//                 <img src=${this.cover} class="card-img-top item-preview" alt="${this.title}">
//                 <div class="card-body">
//                     <span class="card-subtitle font-weight-lighter font-italic text-muted float-right">#${this.product_id}</span>
//                     <h5 class="card-title">${this.title}</h5>
//                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                     <h6 class="card-subtitle mb-2 text-muted">Цена: ${this.price}$</h6>
//                     <a href="#" class="btn btn-primary float-right" data-product_id="${this.product_id}">Добавить</a>
//                 </div>
//             </div>
//     `;
//     }
// }

// class GoodsList {
//     constructor(basket) {
//         this.goods = [];
//         this.basket = basket;
//         this.goodsContainer = document.querySelector('.goods-list');
//     }

//     init() {
//         this.goodsContainer.addEventListener('click', (event) => {
//             this.containerClickHandler(event);
//         });
//     }

//     containerClickHandler(event) {
//         if (event.target.tagName !== 'A') return;
//         this.addToBasket(+event.target.dataset.product_id);

//     }

//     addToBasket(productId) {
//         this.basket.basketGoods.push(this.getProductById(productId));
//         this.basket.render();
//     }

//     getProductById(productId) {
//         return this.goods.find(i => i.product_id === productId);
//     }

//     fetchData() {
//         return makeGetRequest(`${API_URL}/products_list.json`)
//             .then((data) => {
//                 this.goods = data;
//             });
//     }

//     render() {
//         const goodsList = this.goods.map(item => {
//             const goodsItem = new GoodsItem(item);
//             return goodsItem.render();
//         });
//         document.querySelector('.goods-list').innerHTML = goodsList.join('');
//     }
// }

// class Basket {
//     constructor() {
//         this.basketGoods = [];
//         this.basketToggle = document.querySelector('.basket-toggle');
//         this.basketContainer = document.querySelector('.basket-container');
//         this.init();
//     }

//     init() {
//         this.render();
//         this.basketToggle.addEventListener('click', () => this.basketContainer.classList.toggle('visually-hidden'));
//         this.basketContainer.addEventListener('click', (event) => this.containerClickHandler(event));
//     }

// обработчик кликов по карзине
// containerClickHandler(event) {
//     // удалить объект из корзины
//     if (event.target.classList.value.split(' ').find(i => i === 'remove-item') !== -1) this.removeItem(+event.target.dataset.product_id);

//     // очистить корзину
//     if (event.target.id === 'clear-basket') this.clear();
// }

// removeItem(productId) {
//     // пока удаляет все объекты из корзины по ИД
//     this.basketGoods = this.basketGoods.filter(n => n.product_id !== productId);
//     this.render();
// }

// changeQuantity() {

// }

// clear() {
//     this.basketGoods = [];
//     this.render();
// }

// fetchData() {

// }



//     render() {
//         this.basketContainer.innerHTML = `<p class="h6">${this.getTotalPrice()}</p>
//             <ul id="basket-list" class="list-group"></ul>`;
//         const basketListContainer = document.querySelector('#basket-list');
//         if (this.basketGoods.length > 0) {
//             const basketGoodsList = this.basketGoods.map(item => {
//                 const basketItem = new BasketItem(item);
//                 return basketItem.render();
//             });
//             basketListContainer.innerHTML = basketGoodsList.join(' ');
//             this.basketContainer.insertAdjacentHTML("beforeend", `<button type="button" id="clear-basket" class="btn btn-secondary btn-sm">Очистить корзину</button>`);
//         };
//     }
// }

// class BasketItem {
//     constructor(item) {
//         this.product_id = item.product_id;
//         this.title = item.title;
//     }

//     changeQuantity() {

//     }

//     render() {
//         return `
//         <li class="list-group-item d-flex justify-content-between align-items-center">${this.title}<a class="remove-item" data-product_id="${this.product_id}">Удалить</a></li>`;
//     }
// }

// const basket = new Basket();
// const goodsList = new GoodsList(basket);

// goodsList.fetchData()
//     .then(() => goodsList.render())
//     .then(() => goodsList.init());