//сумма
const sum = (a, b) => {
    // a, b - числа
    if (checkArguments(a) && checkArguments(b)){
        return a + b;
    } else {
        return 'Error';
    }
}

//разница
const minus = (a, b) => {
    // a, b - числа
    if (checkArguments(a) && checkArguments(b)){
        return a - b;
    } else {
        return 'Error';
    }
}

//умножение
const multiply = (a,b) => {
    // a, b - числа
    if (checkArguments(a) && checkArguments(b)){
        return a * b;
    } else {
        return 'Error';
    }
}

//деление
const split = (a, b) => {
    // a, b - числа
    if (checkArguments(a) && checkArguments(b) && b != 0){
        return a / b;
    } else {
        return 'Error';
    }
}

//функция для проверки аргументов
let checkArguments = (x) => {
    let calcResult = true;
    if (x===null || typeof(x) === 'string' || x===undefined) {
        calcResult = false;
    }

    return calcResult;
}

module.exports = {
    sum: sum,
    minus: minus,
    multiply: multiply,
    split: split
}