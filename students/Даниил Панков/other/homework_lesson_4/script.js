"use strict"

let str = "The side 'bar includes a Cheatshee't, full Reference', and Help. 'You can also Sav'e & Share with' the Community, and view patterns you cret'e or favorite in My Patterns.Explore re'sults 'with the Tools below'. Replace & List output 'custom result's'. Details lists capture groups. Explain describes your expression in plain English.";

let regexp = /\B'(.+?)'\B/g;
let newStr = str.replace(regexp, '"$1"');
console.log(str);
console.log(newStr);