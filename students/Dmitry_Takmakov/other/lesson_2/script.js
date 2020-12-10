'use strict';

class Hamburger {
    constructor(size, price, nutritionalValue) {
        this.size = size;
        this.price = price;
        this.nutritionalValue = nutritionalValue;
        this.toppingsList = [];
    }

    // Топпинги вводятся в виде списка - это общая логика для двух методов работы с ними.
    addTopping(toppings) {
        for (let i = 0; i < toppings.length; i++) {
            switch (toppings[i]) {
                case "cheese":
                    this.price += 10;
                    this.nutritionalValue += 20;
                    this.toppingsList.push("cheese");
                    break;
                case "salad":
                    this.price += 20;
                    this.nutritionalValue += 5;
                    this.toppingsList.push('salad');
                    break;
                case "potatoes":
                    this.price += 15;
                    this.nutritionalValue += 10;
                    this.toppingsList.push('potatoes');
                    break;
                case "mayo":
                    this.price += 20;
                    this.nutritionalValue += 5;
                    this.toppingsList.push('mayo');
                    break;
                case "spices":
                    this.price += 15;
                    this.toppingsList.push('spices');
                    break;
            }
        }
    }

    removeToppingName(topping) {
        for (let i = 0; i < this.toppingsList.length; i++) {
            const element = this.toppingsList[i];
            if (element == topping) {
                let removedTopping = this.toppingsList.splice(i, 1);
                console.log(removedTopping);
            }
        }
    }

    removeTopping(toppings) {
        for (let i = 0; i < toppings.length; i++) {
            switch (toppings[i]) {
                case "cheese":
                    this.price -= 10;
                    this.nutritionalValue -= 20;
                    this.removeToppingName("cheese");
                    break;
                case "salad":
                    this.price -= 20;
                    this.nutritionalValue -= 5;
                    this.removeToppingName("salad");
                    break;
                case "potatoes":
                    this.price -= 15;
                    this.nutritionalValue -= 10;
                    this.removeToppingName("potatoes");
                    break;
                case "mayo":
                    this.price -= 20;
                    this.nutritionalValue -= 5;
                    this.removeToppingName("mayo");
                    break;
                case "spices":
                    this.price -= 15;
                    this.removeToppingName("spices");
                    break;
            }
        }
    }

    getToppings() {
        console.log(`The toppings are as follows: ${this.toppingsList}.`);
    }

    getSize() {
        console.log(`This is a ${this.size} borgar!`);
    }

    getStuffing() {
        if (this.toppingsList.length == 0) {
            console.log('This borgar has only meat patty and buns!');
        } else {
            console.log(`This borgar has meat patty, buns and the following toppings: ${this.toppingsList}.`);
        }
    }

    calculatePrice() {
        console.log(`The price of this borgar is ${this.price}.`);
    }

    calculateCalories() {
        console.log(`This borgar has ${this.nutritionalValue} calories! You're getting fat!`);
    }
}

const smolBorgar = new Hamburger('small', 50, 20);
const bigBorgar = new Hamburger('large', 100, 40);
const toppings = ['cheese', 'mayo', 'salad'];
// Проверяем, как все работает.
smolBorgar.calculatePrice();
smolBorgar.calculateCalories();
// Добавляем топпинги
smolBorgar.addTopping(toppings);
// Проверяем, как все работает после добавления топпингов.
smolBorgar.calculatePrice();
smolBorgar.calculateCalories();
// Для разнообразия помучаем большой боргар)
bigBorgar.addTopping(toppings);
bigBorgar.getToppings();