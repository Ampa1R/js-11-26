const SIZES = [
    {size: 'big', price: 100, calory: 40},
    {size: 'little', price: 50, calory: 20}
    ]

const STUFFINGS = [
    {stuffing: 'chees', price: 10, calory: 20},
    {stuffing: 'salad', price: 20, calory: 5},
    {stuffing: 'potato', price: 15, calory: 10}
    ]


class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = 0;
    }

    getSize() {
        return SIZES.filter(gamsize => gamsize.size == this.size)

    }

    getStuffing() {
        return STUFFINGS.filter(gamstuffing => gamstuffing.stuffing == this.stuffing)

    }
    calculatePrice() {
        const gamPrice = this.getSize()[0].price + this.getStuffing()[0].price
        console.log(`Стоимость гамбургера составляет ${gamPrice} рублей`)


    }

    calculateCalories() {
        const gamCalory = this.getSize()[0].calory + this.getStuffing()[0].calory
        console.log(`Ну а калорийность гамбургера составляет ${gamCalory} калорий`)
    }
}
const gamburger = new Hamburger('big', 'salad');
gamburger.calculatePrice();
gamburger.calculateCalories();


