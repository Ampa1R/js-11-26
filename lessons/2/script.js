// Функция-конструктор
/*
function MenuItem (name = 'Home') {
  this.color = 'green';
  this.name = name;
  this.makeRed = function () {
    this.color = 'red';
  }
}

MenuItem.prototype.makeOrange = function () {
  this.color = 'orange';
}

const menuItem1 = new MenuItem();
const menuItem2 = new MenuItem('About');

function MainMenuItem(name = 'Main Page', width = 200) {
  MenuItem.call(this, name);
  this.width = width;
}

MainMenuItem.prototype = Object.create(MenuItem.prototype);
MainMenuItem.prototype.constructor = MainMenuItem;

const mainMenuItem1 = new MainMenuItem();
const mainMenuItem2 = new MainMenuItem('Catalog', 150);
*/

// es6 class

class MenuItem {
  static someStaticProperty = 'foo';

  constructor(name = 'Home') {
    this.color = 'green';
    this.name = name;
  }

  makeRed() {
    this.color = 'red';
  }
}

class MainMenuItem extends MenuItem {
  static COLOR_ONE = 'RED';
  static COLOR_TWO = 'GREEN';
  static COLOR_THREE = 'BLUE';

  constructor(name = 'Home Page', width = 200) {
    super(name);
    this.width = width;
  }

  makeOrange() {
    this.color = 'orange';
  }

  static someStaticMethod() {
    console.log('foo');
    this.anotherStaticMethod();
  }

  static anotherStaticMethod() {
    console.log('bar');
  }
}

const menuItem1 = new MenuItem();
const menuItem2 = new MenuItem('About');

const mainMenuItem1 = new MainMenuItem();
const mainMenuItem2 = new MainMenuItem('Catalog', 150);




class Car {
  #fuel = '123';
  #foo
  #bar
  #name

  constructor(name = '123') {
    this.#name = name;
    this.#foo = 1;
    this.#bar = 2;
    this.#privateMethod();

    this._amount = 100;
  }

  ride() {
    if (this.#fuel >= 10) {
      this.#fuel -= 10;
    } else {
      console.error('fuel is less than 10%');
    }
  }

  fill() {
    this.#fuel += 30;
  }

  #privateMethod() {
    console.log('private method called');
  }

  get amount() {
    console.log('call amount getter');
    return this._amount;
  }

  set amount(value) {
    console.log('call amount setter');
    if (value < 0) {
      this._amount = 0;
    } else if (value > 100) {
      this._amount = 100
    } else {
      this._amount = value;
    }
  }
}

const car = new Car();
