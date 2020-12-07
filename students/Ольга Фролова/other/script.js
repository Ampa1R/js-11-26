'use strict';
class ProductItem {
    constructor () {
        this.title = title;
        this.price = price;
        this.calories = calories;
    }
    boundChoice () {
        switch (i) {
            case 1:

            case 2:
                
            case 3:
        }
        return 
    }
    optionalChoice () {

    }
}
class ProductList {
    constructor () {
        this.products = [];
        this.choice = [];
        this.topping = [];
        
    }
    fetchProduct () {
        this.products = [
            {title: 'Маленький гамбургер', price: 50, calories: 20},
            {title: 'Большой гамбургер', price: 100, calories: 40}
        ]
    }
    fetchChoice () {
        this.choice = [
            {title: 'Сыр', price: 10, calories: 20},
            {title: 'Салат', price: 20, calories: 5},
            {title: 'Картофель', price: 15, calories: 10}
        ]
    }
    fetchTopping () {
        this.topping = [
            {title: 'Приправа', price: 15, calories: 0},
            {title: 'Майонез', price: 20, calories: 5}
        ]
    }
    
}