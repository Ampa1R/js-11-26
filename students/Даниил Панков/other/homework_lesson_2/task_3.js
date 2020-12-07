"use strict"

class BurgerList {
    constructor() {
        this.burgersSizes = {
            small: {
                price: 50,
                calories: 20
            },
            big: {
                price: 100,
                calories: 40
            }
        };
    }

}

class BurgerItem {
    constructor(size, filling, additional = 0) {
        this.size = size;
        this.filling = filling;
        this.additional = additional;
    }

    getBurgerCost() {
        const burgerCost = this.size.price + this.filling.price + this.additional.price;
        console.log(burgerCost);
        return burgerCost;
    }

    getBurgerCalories() {
        const burgerCalories = this.size.calories + this.filling.calories + this.additional.calories;
        console.log(burgerCalories);
        return burgerCalories;
    }
}

class FillingList {
    constructor() {
        this.fillings = {
            cheese: {
                price: 10,
                calories: 20
            },
            salad: {
                price: 20,
                calories: 5
            },
            fries: {
                price: 15,
                calories: 10
            }


        }
    }
}

class AdditionalList {
    constructor() {
        this.additionals = {
            flavor: {
                price: 15,
                calories: 0
            },
            mazik: {
                price: 20,
                calories: 5
            }
        }
    }
}

const bugerList = new BurgerList();
const fillingList = new FillingList();
const additionalList = new AdditionalList();

// Размер: small, big:
const userSize1 = bugerList.burgersSizes['small'];

// Начинка: cheese, salad, fries:
const userFilling1 = fillingList.fillings['fries'];

// Допы (необязательно): flavor, mazik:
const userAdditional1 = additionalList.additionals['mazik']

const userBurger = new BurgerItem(userSize1, userFilling1, userAdditional1);

userBurger.getBurgerCost();
userBurger.getBurgerCalories();