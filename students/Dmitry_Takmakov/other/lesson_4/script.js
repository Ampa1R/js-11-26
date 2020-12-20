'use strict';

let text = document.querySelector('span').innerText;
const button = document.querySelector('button');
button.addEventListener("click", (event) => {
    const regex = /\B'|'\B/g;
    const modifiedText = text.replace(regex, '"');
    document.querySelector('span').textContent = modifiedText;
});