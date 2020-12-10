let products = [], goods = [], index = [], i = -1, z, x = 0;

function addProduct(arr, title, price, quantity, quantityMax=0) {
    function product(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.quantityMax= quantityMax;
    }
    arr.push(new product(title, price, quantity));
}
const renderGoodsItem = (title, price, quantity) => {
    i++;
    return `
    <div class="item" style="display: flex; flex-direction: column;">
    <h4 style="font-size: 24px; text-align: center;">${title}</h4>
    <p style="font-size: 14px; text-align: center;">${price}</p>
    <input type="number" placeholder="Максимум доступно: ${quantity}" id="${i}"></input>
    <button type="button" onclick="openCart(${i})" style="width: 80px; font-size: 18px; margin: auto; border-radius: 5px;">Купить</button>
    </div>
    `;
}

function checkValue(value,i){
    if (value>goods[i].quantityMax){
        alert("Превышено количество!");
    } else {
        goods[i].quantity = value;
        getTable(goods);
    }
}

function getTable(tableArr) {
    let table;
    if (tableArr == "") {
        document.querySelector("table").remove();
    } else {
        if (document.querySelector("table") !== null){
            document.querySelector("table").remove();
        }
        table = document.createElement("table");
        let tr, td, n, i, y, itog = 0;
        for (n = 0; n <= (goods.length); n++) {
            tr = document.createElement("tr");
            table.append(tr);
            for (i = 1; i <= 5; i++) {
                td = document.createElement("td");
                if (n == 0) {
                    if (i == 1) {
                        td.innerText = "Название товара";
                    } else if (i == 2) {
                        td.innerText = "Цена товара";
                    } else if (i == 3) {
                        td.innerText = "Количество товара";
                    } else if (i == 4) {
                        td.innerText = "Общая стоимость";
                    } else {
                        td.innerText = "";
                    }
                } else {
                    if (i == 1) {
                        td.innerText = goods[(n - 1)].title;
                    } else if (i == 2) {
                        td.innerText = goods[(n - 1)].price;
                    } else if (i == 3) {
                        kolvo = '<input type="number" class="'+(n-1)+'" onchange="checkValue(value, '+(n - 1)+');" placeholder="' + goods[(n - 1)].quantity + '"></input>';
                        td.innerHTML = kolvo;
                    } else if (i == 4) {
                        td.innerText = (goods[(n - 1)].price * goods[(n - 1)].quantity);
                        td.setAttribute("class", "price");
                    } else {
                        td.innerHTML = `<a href=# onclick="goods.splice(${n-1},1); index.splice(${n-1},1); getTable(goods);"> del </a>`;
                    }
                }
                tr.append(td);
            }
        }
        document.querySelector(".basket").append(table);
        tr = document.createElement("tr");
        table.append(tr);
        for (i = 1; i <= 4; i++) {
            td = document.createElement("td");
            td.innerText = "";
            if (i == 3) {
                td.innerText = "Итого:";
            } else if (i == 4) { 
                for (y = 0; y < document.querySelectorAll(".price").length; y++) {
                    itog = itog + (+(document.querySelectorAll(".price")[y].innerText));
                }
                td.innerText = itog;
            }
            tr.append(td);
        }
    }
}

function openCart(i) {
    if (document.getElementById(i).value > products[i].quantity) {
        alert("Превышено количество!");
    } else if (document.getElementById(i).value == "") {
        alert("Значение не может быть пустым!");
    } else if (document.getElementById(i).value < 0) {
        alert("Так не пойдет...");
    } else if(index == ""){
        index.push(products[i].title);
        addProduct(goods, products[i].title, products[i].price, document.getElementById(i).value, products[i].quantity);
        getTable(goods);
    } else if (index.indexOf(products[i].title) != -1){
        if ((parseInt(goods[index.indexOf(products[i].title)].quantity)+parseInt(document.getElementById(i).value))>(goods[index.indexOf(products[i].title)].quantityMax)){
            alert("Превышено количество!");
        } else{
            goods[index.indexOf(products[i].title)].quantity = (parseInt(goods[index.indexOf(products[i].title)].quantity)+parseInt(document.getElementById(i).value));
            getTable(goods);
        }
    } else {
        index.push(products[i].title);
        addProduct(goods, products[i].title, products[i].price, document.getElementById(i).value, products[i].quantity);
        getTable(goods);
    }
}

let renderProducts = (list) => {
    document.querySelector(".goods").innerHTML = (list.map(item => renderGoodsItem(item.title, item.price, item.quantity))).join("");
}

//Генерируем список товаров, запускаем вывод списка товаров...
/*addProduct(products, "Продукт 1", 100, 1);
addProduct(products, "Продукт 2", 200, 2);
addProduct(products, "Продукт 3", 300, 3);
addProduct(products, "Продукт 4", 400, 4);
addProduct(products, "Продукт 5", 500, 5);
addProduct(products, "Продукт 6", 600, 6);
addProduct(products, "Продукт 7", 700, 7);
addProduct(products, "Продукт 8", 800, 8);*/
const API = 'https://raw.githubusercontent.com/programmer-tm/js-11-26/master/students/%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B9%20%D0%9C%D0%B8%D0%BD%D0%B5%D0%B5%D0%B2/catalogData.json';
/*
const getData = () => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
        console.log('timeout!');
    }

    xhr.onreadystatechange = () => {
        console.log('ready state change', xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
            } else {
                console.log('Error!', xhr.responseText);
            }
        }
    }

    xhr.open('GET', `${API}/catalogData.json`);

    // xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}

getData(API);*/

function httpGet(url) {
    return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
    if (this.status == 200) {
        resolve(this.response);
    } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
    }
    };
    xhr.onerror = function() {
        reject(new Error("Network Error"));
    };
        xhr.send();
    });
}
httpGet(API)
    .then(
        response => {
            products = products.concat(JSON.parse(response));
            renderProducts(products);
        },
        error => alert(`Rejected: ${error}`)
    );
function message(){
    if (index == ""){
        z = 0;
    } else {
        z = index.length;
    }
    alert("Товаров в корзине:" + z);
}