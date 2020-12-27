export default () => {
    const app = new Vue({
        el: '#app',
        data: {
            catalog: {
                items: [],
                url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json'
            },
            basket: {
                items: [],
                url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json',
                show: false
            }
        },
        methods: {
            get(url) {
                return fetch(url)
                    .then(data => data.json())
            },
            add(product) {
                let find = this.basket.items.find(el => el.productId == product.productId);
                    if (!find) {
                        let newItem = Object.assign({}, product, { amount: 1 });
                        this.basket.items.push(newItem);
                    } else {
                        find.amount++;
                    }
            },        
            remove(id) {
                let find = this.basket.items.find(el => el.productId == id);
                if (find.amount > 1) {
                    find.amount--;
                } else {
                    this.basket.items.splice(this.basket.items.indexOf(find), 1);
                }
            }
        },
        async mounted() {
            try {
                this.catalog.items = await this.get(this.catalog.url);
                this.basket.items = (await this.get(this.basket.url)).content;
                
            }
            catch(err) {
                console.log(err);
            }
        }
    })
}