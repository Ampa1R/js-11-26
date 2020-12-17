const text = document.querySelector('.before').innerText;

const result = text.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');

document.querySelector('.after').insertAdjacentText('beforeend', result);


class Form {
    constructor() {
        this.form = document.hwForm;
        this.name = '';
        this.phone = '';
        this.email = '';
        this.rndText = '';
        this.submitButton = document.getElementById('submit');
        this.submitButton.addEventListener('click', e => this.submitHandler(e));
    }


    getValues() {
        this.name = this.form.name.value;
        this.phone = this.form.phone.value;
        this.email = this.form.email.value;
        this.rndText = this.form.rndText.value;
    }


    submitHandler(e) {
        e.preventDefault();
        this.getValues();
        this.validateForm();
    }


    validateForm(name = this.name, phone = this.phone, email = this.email) {
        const nameRegExp = /^[a-zA-Z]*$/;
        const phoneRegExp = /^[+]\d{1,3}[(]\d{3}[)]\d{3}[-]\d{4}$/;
        const emailRegExp = /[\w\-\.]*?[@][\s\S]*?[.][a-zA-Z]{1,10}/;

        if (!nameRegExp.test(name)) {
            const nameInput = document.getElementById('name');
            nameInput.classList.add('red');
            nameInput.insertAdjacentHTML('afterend', `<p class="red">В имени должны быть только буквы</p>`)
        }

        if (!phoneRegExp.test(phone)) {
            const phoneInput = document.getElementById('phone');
            phoneInput.classList.add('red');
            phoneInput.insertAdjacentHTML('afterend', `<p class="red">Телефон имеет вид +7(000)000-0000</p>`)
        }

        if (!emailRegExp.test(email)) {
            const emailInput = document.getElementById('email');
            emailInput.classList.add('red');
            emailInput.insertAdjacentHTML('afterend', `<p class="red">E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.</p>`)
        }
    }
}

const form = new Form();

