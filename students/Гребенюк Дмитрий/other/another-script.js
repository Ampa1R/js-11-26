class Hamburger {
    constructor (size = "M",  stuffing = []){
        this.size = size;
        this.stuffing = [];
         this.toppingsList = [
            {title : "chees", price : 10, calories : 20},
            {title : "salad", price : 20, calories : 5},
            {title : "potato", price : 15, calories : 10},
            {title : "seasoning", price : 15, calories : 0},
            {title : "mayonnaise", price : 20, calories : 5} 
        ];
    }
    
    addTopping(topping){
        
    };
    removeTopping(topping){
        
    };
    getToppings(){
    };
    getSize(){
        
    };
    getStuffing(){
       this.stuffing = toppingsList[1];
    };
    calculatePrice(){
        
    };
    calculateCalories(){
        
    }
}
class ToppingsList {
    constructor (){
        this.toppingsList = [
            {title : "chees", price : 10, calories : 20},
            {title : "salad", price : 20, calories : 5},
            {title : "potato", price : 15, calories : 10},
            {title : "seasoning", price : 15, calories : 0},
            {title : "mayonnaise", price : 20, calories : 5} 
        ];
    }
     
}
let hamburger = new Hamburger("M",);
let toppingsList = new ToppingsList();
