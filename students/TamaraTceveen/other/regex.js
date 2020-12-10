let str = document.querySelector('#testText').innerHTML;
console.log(str);


let regexp = [/\s'/g, /'\s/g, /^'/g, /'$/g];
let replace = [' "', '" ', '"', '"'];


function changeText(regExp, changeValue, motherText, newText, button) {
    document.querySelector(button).addEventListener('click', (event) => {
        let newStr = motherText;

        for (let i = 0; i < regExp.length; i++) {

            newStr = newStr.replace(regExp[i], changeValue[i]);

        }

        return document.querySelector(newText).innerHTML = newStr;
    });

}

changeText(regexp, replace, str, '#newText', '#regexPress');

