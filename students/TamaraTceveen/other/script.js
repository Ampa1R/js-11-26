sizes = [
    { title: 'Large', price: 100, callories: 40 },
    { title: 'Small', price: 50, callories: 20 },
];
toppings = [
    { title: 'Pepper', price: 15, callories: 0 },
    { title: 'Mayo', price: 20, callories: 5 },
];
stuffings = [
    { title: 'Cheese', price: 10, callories: 20 },
    { title: 'Salad', price: 20, callories: 5 },
    { title: 'Potato', price: 15, callories: 10 },
];

class Hamburger {


    constructor(size, stuffing) {
        this.size = sizes.find(Element => Element.title == size);
        this.stuffing = stuffings.find(Element => Element.title == stuffing);
        this.topping = [];
    }

    addTopping(topping) {       // Добавить добавку
        this.topping.push(toppings.find(Element => Element.title == topping));
    }

    removeTopping(topping) {    // Убрать добавку 
        let remove = this.topping.filter(function (removeTopping) { return removeTopping.title !== topping });
        console.log(`Вы убрали топпинг ${topping}`);
        return this.topping = remove;
    }

    getToppings(topping) {     // Получить список добавок
        console.log(`Вы выбрали топпинг ${this.topping.map(item => { return topping = item.title })}`);
        return this.topping
    }

    getSize() {               // Узнать размер гамбургера
        console.log(`Вы выбрали размер ${this.size.title}`);
        return this.size.title;
    }

    getStuffing() {          // Узнать начинку гамбургера 
        console.log(`Ваша начинка ${this.stuffing.title}`);
        return this.stuffing.title;
    }

    calculatePrice() {        // Узнать цену 
        let totalPrice = 0;

        totalPrice += +this.size.price
        totalPrice += +this.stuffing.price

        let toppingPrice = this.topping.map(item => { return item.price });
        for (let price of toppingPrice) {
            totalPrice += price;
        }
        console.log(`Ваш гамбургер стоит ${totalPrice} рублей`);
        return totalPrice;
    }

    calculateCalories() {   // Узнать калорийность 
        let totalCallories = 0;

        totalCallories = +this.size.callories
        totalCallories += +this.stuffing.callories

        let toppingCallories = this.topping.map(item => { return item.callories });
        for (let calory of toppingCallories) {
            totalCallories += calory;
        }
        console.log(`Калорийность Вашего гамбургера ${totalCallories} калорий`);
        return totalCallories;

    }
}


let h = new Hamburger("Large", "Cheese");

console.log(h)
h.getSize();
h.addTopping("Mayo");
h.addTopping("Pepper");
h.getToppings();
h.getStuffing();
h.calculatePrice()
h.calculateCalories();
h.removeTopping('Mayo');
h.calculatePrice()
h.calculateCalories();
