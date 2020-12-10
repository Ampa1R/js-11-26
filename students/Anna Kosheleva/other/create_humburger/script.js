
class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    addTopping(topping) {
        if (!this.toppings.includes(topping)) {
            return this.toppings.push(topping);
        };
    }

    removeTopping(topping) {
        return this.toppings = this.toppings.filter(x => x !== topping);
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.stuffing;
    }

    calculatePrice() {
        const priceArr = this.toppings.map(x => Hamburger.TOPPINGS[x].price);
        priceArr.push(Hamburger.SIZES[this.size].price, Hamburger.STUFFINGS[this.stuffing].price);
        let price = priceArr.reduce((acc, prices) => acc + prices, 0);
        return price;
    }

    calculateCalories() {
        const caloriesArr = this.toppings.map(x => Hamburger.TOPPINGS[x].calories);
        caloriesArr.push(Hamburger.SIZES[this.size].calories, Hamburger.STUFFINGS[this.stuffing].calories);
        let calories = caloriesArr.reduce((acc, itemcalories) => acc + itemcalories, 0);
        return calories;
    }
}

Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_LARGE = 'SIZE_LARGE';

Hamburger.SIZES = {
    [Hamburger.SIZE_SMALL]: {
        price: 30,
        calories: 50,
    },
    [Hamburger.SIZE_LARGE]: {
        price: 50,
        calories: 100,
    },
};

Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD';
Hamburger.STUFFING_MEAT = 'STUFFING_MEAT';

Hamburger.STUFFINGS = {
    [Hamburger.STUFFING_CHEESE]: {
        price: 15,
        calories: 20,
    },
    [Hamburger.STUFFING_SALAD]: {
        price: 20,
        calories: 5,
    },
    [Hamburger.STUFFING_MEAT]: {
        price: 35,
        calories: 15,
    },
};

Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';
Hamburger.TOPPING_SAUCE = 'TOPPING_SAUCE';

Hamburger.TOPPINGS = {
    [Hamburger.TOPPING_SPICE]: {
        price: 10,
        calories: 0,
    },
    [Hamburger.TOPPING_SAUCE]: {
        price: 15,
        calories: 5,
    },
};

const hamburger = new Hamburger();

console.log("ИТОГО: ");




