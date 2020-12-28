'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


Vue.component('ItemCard', {
    template:{

    },

})


const app = new Vue({
    el: '#app',

    data: {
        goods: [],
        cart: [],
        cartTotalPrice: 0,
        cartTotalGoods: 0,
        isVisibleCart: true,
        searchInputValue: '',
        searchValue: ''
    },


    beforeMount() {
    },


    mounted() {
        this.fetchData();
        this.fetchCartData();
    },

    methods: {
        fetchData() {
            // fetch(`${API}/catalogData.json`)
            fetch(`goods.json`)
                .then(response => response.json())
                .then(data => {
                    data.forEach((e, i) => {
                        const el = {
                            id: i + 1,
                            product_name: e.product_name,
                            price: e.price
                        }
                        this.goods.push(el);
                    });
                })
                .catch(e => console.log(e));

        },

        fetchCartData() {
            // fetch(`${API}/getBasket.json`)
            fetch(`cart.json`)
                .then(response => response.json())
                .then(data => {
                    this.cartTotalPrice = data.amount;
                    // console.log(this.cartTotalPrice)
                    this.cartTotalGoods = data.countGoods;
                    // console.log(this.cartTotalGoods)
                    data.contents.forEach((e) => {
                        const el = {
                            product_name: e.product_name,
                            price: e.price,
                            quantity: e.quantity
                        }
                        this.cart.push(el);
                    });
                })
                .catch(e => console.log(e))
        },

        async sendToCart(data) {
            try {
                const response = await fetch('cart.json', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                console.log('Успех', JSON.stringify(json))
            } catch (e) {
                console.log(e);
            }
        },


        addToCart(item) {
            this.fetchCartData();


        },


        handleShowHideButton() {
            return this.isVisibleCart = !this.isVisibleCart;
        },

        handleSearchButton(){
            this.searchValue = this.searchInputValue;
        }

    },

    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchValue.trim(), 'i');
            return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));

        },

        totalPrice() {
            return this.goods.reduce((acc, el) => acc + el.price, 0)
        }

    }
})