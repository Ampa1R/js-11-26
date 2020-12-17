class Hamburger {
    constructor(size = "small", toppings, filings ) {
        this.size = size;
        this.toppings = toppings;
        this.filings = filings;
    }

    calculatePrice() {
        let price = this.size.price + this.toppings.price + this.filings.price;
        console.log(price);
    };
    calculateCalories() {
        let calories = this.size.calories + this.toppings.calories + this.filings.calories;
        console.log(calories);
    }
}
class ToppingsList {
    constructor() {
        this.toppings = {
            cheese: {
                price: 10,
                calories: 20
            },
            salad: {
                price: 20,
                calories: 5
            },
            potato: {
                price: 15,
                calories: 10
            }
        };
    }

}
class FilingList {
    constructor() {
        this.filings = {
            seasoning: {
                price: 15,
                calories: 0
            },
            mayonnaise: {
                price: 20,
                calories: 5
            }
        }
    }
}
class HamburgerSize {
    constructor() {
        this.size = {
            small: {
                price: 50,
                calories: 20
            },
            big: {
                price: 100,
                calories: 40
            }
        }
    }
}

let toppingsList = new ToppingsList();
let hamburgerSize = new HamburgerSize();
let filingList = new FilingList();
let userSize = hamburgerSize.size['big'];
let userToppings = toppingsList.toppings['potato'];
let userFiling = filingList.filings['seasoning'];
let hamburger = new Hamburger(userSize, userToppings, userFiling );
hamburger.calculatePrice();
hamburger.calculateCalories();
