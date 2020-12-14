const API_BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const CATALOG_RESOURCE ='catalogData.json'
const BASKET_RESOURCE ='getBasket.json'

function requestApiJson(resource)
{
    let p = new Promise((resolve,reject)=>
    {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        xhr.ontimeout = (ev) =>
        {
            reject();
        }
        xhr.onreadystatechange = (ev) =>
        {
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    let responseObj = JSON.parse(xhr.responseText);
                    console.log(responseObj);
                    resolve(responseObj);
                }
                else
                {
                    reject();
                }
            }
        }
        xhr.open("GET",`${API_BASE_URL}/${resource}`);
        xhr.send();
    });
    return p;
}



class GoodsItem {
  constructor({ id_product, product_name, price }) {
    this.id_product = id_product;
    this.product_name = product_name;
    this.price = price;
  }

  render() {
    return `
      <div class="item">
        <h4>${this.product_name}</h4>
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
    this.basket.goodsList = this; // Это плохое решение. Но в небольшом проекте допустимо
  }

  fetchGoods() {
      let result = new Promise((resolve,reject)=>
      {
        requestApiJson(CATALOG_RESOURCE).then((value)=>{
            console.log(value);
            this.goods = value;
            resolve();
        }).catch(()=>
        {
            reject();
        });
      });
      return result;
  }

  addToBasket(item) {
    this.basket.add(item);
  }

  render() {
    const goodsList = this.goods.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods').innerHTML = goodsList.join('');
  }
}

class Basket {
  constructor() {
    this.basketGoods = [];
  }
  add(good, count)
  {
    for (let i=0;i<this.basketGoods.length;i++)
      if (this.basketGoods[i].good === good)
      {
        this.basketGoods[i].addCount(count);
        return;
      }
    this.basketGoods.push(new BasketItem(good))
  }
  addById(id, count)
  {
      let index = goodsList.goods.findIndex(x=>x.id_product == id);
      console.log("addById",id,index);
      if (index >= 0)
        this.add(goodsList.goods[index],count);
  }
  fetchBacket() {
    let result = new Promise((resolve,reject)=>
    {
      requestApiJson(BASKET_RESOURCE).then((value)=>{
          console.log("fetchBacket",value);
          value.contents.forEach(element => {
              this.addById(element.id_product,element.quantity);
          });
          resolve();
      }).catch(()=>
      {
          reject();
      });
    });
    return result;
}  
  _trimZerroCounts()
  {
    for (let i=this.basketGoods.length-1;i>=0;i--)
      if (this.basketGoods[i].count <= 0)
        this.basketGoods.splice(i,1);
  }
  render() {
      console.log(this.basketGoods);
  }
  get totallPrice()
  {
    return this.basketGoods.reduce((a, b) => a + b.totallPrice, 0);
  }
}

class BasketItem {
  constructor(good, count = 1) {
    this.good = good;
    this.count = count;
  }
  get title()
  {
    return this.good.product_name;
  }
  get totallPrice()
  {
    return this.good.price*this.count;
  }
  addCount(countToAdd)
  {
    this.count += countToAdd;
  }
  render() {
  }
}

const basket = new Basket();
const goodsList = new GoodsList(basket);
goodsList.fetchGoods()
    .then(()=> {
        goodsList.render();
        return basket.fetchBacket();
    })
    .then(()=>{
        basket.render();
    })
    .catch(()=> {
        alert("Ошибка получения списка товаров");
    });
