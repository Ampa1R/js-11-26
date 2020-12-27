"use strict"

let text = "Due to a great number of radio stations, which play 'the greatest hits of the ’80s, ’90s and today', older styles of pop continue to be a strong part of America’s music culture. Sounds from even earlier in rock history do not fade away.";

let regexp = /\B'|'\B/g;
let newText = text.replace(regexp, '"');
console.log(text);
console.log(newText);