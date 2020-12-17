"use strict"

const validate = () => {
    const
        nameReg = /^[aA-zZаА-яЯёЁ]+$/g,
        phoneReg = /^\+7\(\d{3}\)\d{3}-\d{4}$/g,
        eMailRegex = /^[aA-zZ0-9]+@[aA-zZ]+\.[A-z]{2,4}$/g,
        inputName = document.forms.form.name.value,
        inputPhone = document.forms.form.phone.value,
        inputEmail = document.forms.form.eMail.value;

    if (!inputName.match(nameReg)) {
        alert('Имя не должно быть пустым и должно состоять только из букв');
        return false;
    } else if (!inputPhone.match(phoneReg)) {
        alert('Телефон должен быть введен по форме +7(000)000-0000');
        return false;
    } else if (!inputEmail.match(eMailRegex)) {
        alert('почта введена некорректно');
        return false;
    } else {
        alert('Форма корректна и "типа" отправлена');
    }
    return false;
};