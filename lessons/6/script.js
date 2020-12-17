Vue.component('v-header', {
    template: `
        <h1>Vue component</h1>
    `,
});

Vue.component('v-main', {
    template: `
        <main>
            <h2>{{ title }}</h2>
            <v-card
                v-for="item in items"
                v-bind:title="item.title"
                :price="item.price"
                class="something"
                v-on:addToCard="handleAddToCard"
            >
                <button v-if="item.price">Купить</button>
            </v-card>
        </main>
    `,
    props: ['title'],
    data() {
        return {
            items: [
                { title: 'Мышь', price: 1500 },
                { title: 'Компьютер' },
            ]
        };
    },
    methods: {
        handleAddToCard(data) {
            console.log('add to card handler', data);
        },
    },
    computed: {

    },
    mounted() {

    },
    
});

Vue.component('v-card', {
    props: ['title', 'price'],
    template: `
        <div class="card">
            <h4>{{ title }}</h4>
            <p v-if="price">{{ price }} руб.</p>
            <p v-else>Цена по запросу</p>
            <button v-on:click="handleClick">В корзину</button>
            <slot />
        </div>
    `,
    methods: {
        handleClick() {
            console.log('button clicked');
            this.$emit('addToCard', this.title);
        },
    }
});

const app = new Vue({
    el: '#app',
});
