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
}


class GoodsItem {
    constructor({
        product_name,
        price
    }) {
        this.title = product_name;
        this.price = price;
    }

    render() {
        return `
      <div class="item">
        <h4>${this.title}</h4>
        <p>${this.price}</p>
        <button type="button">Add to basket</button>
      </div>
    `;
    }
}

class GoodsList {
    constructor(basket) {
        this.goods = [];
        this.basket = basket;
    }

    addToBasket(item) {
        this.basket.add(item);
    }


    fetchData() {
        return new Promise ((resolve, reject) => {
            sendRequest('catalogData.json')
            .then(
                (data) => {
                    resolve(this.goods = data);
                }); 
            
        })
    }
    
    render() {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsList.join('');
    }
    sum() {
        let sum = 0;
        this.goods.map(item => {
            return sum += item.price;
        });
        document.querySelector('.goods').append("Итоговая сумма : " + sum);
    }

}

class Basket {
    constructor() {
        this.basketGoods = [];
    }

    addItem() {

    }

    removeItem() {

    }

    changeQuantity() {

    }

    fetchData() {

    }

    getTotalPrice() {

    }

    render() {

    }
}

class BasketItem {
    constructor({
        title
    }) {
        this.title = title;
    }

    changeQuantity() {

    }

    removeItem() {}

    render() {

    }
}

const basket = new Basket();
const goodsList = new GoodsList();
goodsList.fetchData().then(() => {
    goodsList.render();
    goodsList.sum();
});
