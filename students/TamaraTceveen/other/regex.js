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

// form

let inputs = document.querySelectorAll('input');

let regexps = [
    ['name', /^[a-zA-Z ]+$/, '*Имя должно содержать только буквы'],
    ['phone', /^\+7\(\d{3}\)\d{3}\-\d{4}$/, '*Телефон вида +7(000)000-0000'],
    ['mail', /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/, '*Почта должна содержать @ и иметь доменное имя']
]

function checkAll() {
    document.querySelector('#buttonForm').addEventListener('click', (event) => {
        for(let i = 0; i<inputs.length; i++){
            if(inputs[i].type=='text' && inputs[i].id == regexps[i][0]){    
                console.log('!',inputs[i],regexps[i]);
                check(inputs[i],regexps[i]);
            } 
        }
    });
};

console.log(inputs);

function check(inForm, regex) {
    if (regex[1].test(inForm.value)){
        document.querySelector('#'+inForm.id + 'Message').innerHTML = '';
        inForm.style.border = '';
    } else {
        document.querySelector('#'+inForm.id + 'Message').innerHTML = regex[2];
        inForm.style.border = '1px solid red';
    }
};

checkAll();

