class Hamburger {
    size;
    filling;
    isSpiced;
    isWithSauce;
    price = 0;
    calories = 0;

    constructor() {
        while (true) {
            let size = +prompt(`Выберите размер гамбургера, 1 - маленький, 2 - большой`);
            if (size === 1) {
                this.size = this.chooseSize(1);
                break
            } else if (size === 2) {
                this.size = this.chooseSize(2);
                break
            } else {
                alert('Неправильный размер, на выбор варианты 1 и 2');
            }
        }


        while (true) {
            let filling = +prompt(`Выберите начинку гамбургера, 1 - сыр, 2 - салат, 3 - картофель`);
            if (filling === 1) {
                this.filling = this.chooseFilling(1);
                break;
            } else if (filling === 2) {
                this.filling = this.chooseFilling(2);
                break;
            } else if (filling === 3) {
                this.filling = this.chooseFilling(3);
                break;
            } else {
                alert('Неправильная начинка, на выбор варианты 1, 2 и 3');
            }
        }

        while (true) {
            let spice = +prompt('Посыпать гамбургер специями? 1 - да, 2 - нет');
            if (spice === 1) {
                this.isSpiced = this.chooseSpice(1);
                break;
            } else if (spice === 2) {
                this.isSpiced = this.chooseSpice(2);
                break;
            } else {
                alert('Неправильный выбор, варианты 1 и 2');
            }
        }


        while (true) {
            let sauce = +prompt('Полить гамбургер соусом? 1 - да, 2 - нет');
            if (sauce === 1) {
                this.isWithSauce = this.chooseSauce(1);
                break;
            } else if (sauce === 2) {
                this.isWithSauce = this.chooseSauce(2);
                break;
            } else {
                alert('Неправильный выбор, варианты 1 и 2');
            }
        }

        alert(`Вы купили ${this.size} гамбургер, начинка ${this.filling}, ${this.isSpiced ? 'со специями' : ''} ${this.isWithSauce ? 'с соусом' : ''}. 
        Общая цена: ${this.price}, общая калорийность: ${this.calories}`)
    }

    chooseSize(a) {
        switch (a) {
            case 1:
                this.price += 50;
                this.calories += 20;
                return 'маленький';
            case 2:
                this.price += 100;
                this.calories += 40;
                return 'большой';
        }
    }

    chooseFilling(a) {
        switch (a) {
            case 1:
                this.price += 10;
                this.calories += 20;
                return 'сыр';
            case 2:
                this.price += 20;
                this.calories += 5;
                return 'салат';
            case 3:
                this.price += 15;
                this.calories += 10;
                return 'картофель'
        }
    }

    chooseSpice(a) {
        switch (a) {
            case 1:
                this.price += 15;
                return true;
            case 0:
                return false;
        }
    }

    chooseSauce(a) {
        switch (a) {
            case 1:
                this.price += 20;
                this.calories += 5;
                return true;
            case 2:
                return false;
        }
    }

}