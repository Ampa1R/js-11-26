const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const sendRequest = (path) => {
    return new Promise((resolve, reject) => {


        const xhr = new XMLHttpRequest();

        xhr.timeout = 10000;

        xhr.ontimeout = () => {
            console.log('timeout!');
        }

        xhr.onreadystatechange = () => {
            // console.log('ready state change', xhr.readyState);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    console.log('Error!', xhr.responseText);
                }
            }
        }

        xhr.open('GET', `${API}/${path}`);

        // xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send();
    })
};
Vue.component('v-error', {
  props: ['message'],
  template: `
    <div class="error">
      Ошибка! {{ message }}
    </div>
  `,
});
Vue.component('v-header', {
    template: `
        <header class="header d-flex">
            <span class="logo">E-Shop</span>
             <slot/>
            <button type="button" class="basketButton" @click="basketClick">Корзина</button>
            <slot name="basket" />
        </header>
    `,
    methods: {
        basketClick() {
            this.$emit('show-basket')
        },
    },
});
Vue.component('v-search', {
    props : ['value'],
    template: `
        <input type="text" :value="value" @input="$emit('input', $event.target.value)"  class="search" placeholder="Search..." />
    `,
});
Vue.component('v-goods', {
    props: ['goods'],
    template: `
    <main>
        <section class="goods">
            <v-item
              v-for="item in goods"
              v-bind:element="item"
              v-on:addToBasket="handleAddToBasket"
            />
            <div v-if="!goods.length" class="goods-empty">
                Нет данных
            </div>
        </section>
    </main>         
    `,
    methods: {
        handleAddToBasket(data) {
            this.$emit('add', data);
        },
    }
});
Vue.component('v-basket', {
    props: ['goods'],
    template: `
            <div class="basketGoods">
                <div class="basketItem" v-for="item in goods">
                        <p> {{item.product_name}} </p>
                        <p>{{item.quantity}} </p>
                </div>
            </div>
        `,
});
Vue.component('v-item', {
    props: ['element'],
    template: `
        <div class="item">
            <h4>{{element.product_name}}</h4>
            <p>{{element.price}}</p>
            <button type @click="addToBasket(item)">Addtobasket</button>
        </div>
    `,
    methods: {
        addToBasket() {
            this.$emit('addToBasket', this.element);
        }
    }


});


new Vue({
    el: '#app',
    data: {
        goods: [],
        basketGoods: [],
        searchValue: '',
        visible: false,
         errorMessage: '',
    },
    mounted() {
        this.fetchData();
        this.fetchBasketData();
    },
    methods: {
        fetchData() {
            return new Promise((resolve, reject) => {
                sendRequest('catalogData.json')
                    .then((data) => {
                        this.goods = data;
                        resolve();
                    });
            });
        },
        fetchBasketData() {
            return new Promise((resolve, reject) => {
                sendRequest('getBasket.json')
                    .then((data) => {
                        this.basketGoods = data.contents;
                        //                    this.amount = data.amount;
                        //                    this.countGoods = data.countGoods;
                        resolve();
                    });
            });
        },
        addToBasket(item) {
            const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
            if (index > -1) {
                this.basketGoods[index].quantity += 1;
                // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
            } else {
                this.basketGoods.push(item);
            }
            console.log(this.basketGoods);
        },
        removeItem(item) {
            const index = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
            if (this.basketGoods[index].quantity > 1) {
                this.basketGoods[index].quantity -= 1;
            } else {
                const id = this.basketGoods.findIndex((basketItem) => basketItem.id_product === item.id_product);
                this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== item.id_product);

            }
            console.log(this.basketGoods);
        },
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchValue.trim(), 'i');
            return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        },
        getSum() {
            let sum = 0;
            this.goods.map(item => {
                return sum += item.price;
            });
        },
    },
})
