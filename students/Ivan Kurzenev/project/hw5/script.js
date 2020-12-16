const API = 'https://raw.githubusercontent.com/Variasco/js-11-26/master/students/Ivan%20Kurzenev/testfiles/';

const sendRequest = (path) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
      console.log("timeout!");
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Error!', xhr.responseText);
        }
      }
    }

    xhr.open('GET', `${API}${path}`);

    xhr.send();
  });
}

new Vue({
  el: '#app',
  data: {
    goods: [],
    cartGoods: [],
    searchValue: '',
  },
  mounted() {
    this.fetchData();
    this.fetchDataCart();
  },
  methods: {
    fetchData() {
      return new Promise((resolve, reject) => {
        sendRequest('data.json')
          .then((data) => {
            this.goods = data;
            resolve();
          })
          .catch((data) => {
            reject(data);
          });
      })
    },
    fetchDataCart() {
      return new Promise((resolve, reject) => {
        sendRequest('dataCart.json')
          .then((data) => {
            this.cartGoods = data.content;
            // this.amount = data.amount;
            // this.countGoods = data.countGoods;
            resolve();
          })
          .catch((data) => {
            reject(data);
          });
      })
    },
    addToCart(item) {
      const index = this.cartGoods.findIndex((cartItem) => cartItem.id_product === item.id_product);
      if (index > -1) {
        this.cartGoods[index].quantity += 1;
      } else {
        this.cartGoods.push(item);
      }
    },
    deleteFromCart(id) {
      this.cartGoods = this.cartGoods.filter((goodsItem) => goodsItem.id_product !== +id);
    },
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchValue.trim(), 'i');
      return this.goods.filter((goodsItem) => regexp.test(goodsItem.title));
    },
    totalPrice() {
      return this.goods.reduce((acc, curVal) => acc + curVal.price, 0);
    },
  },
});