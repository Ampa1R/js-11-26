function validate()
{
    let nameElement = document.getElementById("name");
    let phoneElement = document.getElementById("phone");
    let emailElement = document.getElementById("email");
    let textElement = document.getElementById("text");

    let errorInName = !(/^[a-zA-Zа-яА-ЯёЁ']+$/.test(nameElement.value));
    let errorInPhone = !(/^\+7\(\d{3}\)\d{4}-\d{4}$/.test(phoneElement.value));
    let errorInEmail = !(/^[a-zA-Z]+.?[a-zA-Z]?@[a-zA-Z]+.[a-zA-Z]+$/.test(emailElement.value));

    let hasError = errorInName || errorInPhone;

    nameElement.classList.toggle("error",errorInName);
    phoneElement.classList.toggle("error",errorInPhone);
    emailElement.classList.toggle("error",errorInEmail);
    return !hasError;
}

document.getElementById("form1").onsubmit = validate;
Array.from(document.getElementsByClassName("VerifiedInput")).forEach(element => {
    element.onchange = validate;
});