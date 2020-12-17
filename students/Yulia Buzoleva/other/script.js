const text = document.querySelector('.text');
const regexp = /\B\'|'\B/g;
newText = text.textContent.replace(regexp, '"');
text.innerHTML = newText;

document.querySelector('.form').addEventListener('click', (event) => {
    //if (event.target.name === 'submit') {
    //console.log(event);
        //const id = event.target.parentElement.dataset.id;
        //const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(id));
        const name = event.target.parentElement.name;
        //console.log(name);
    if (name === "inp-name") {
        const regexp = /\d/ig;
        if (event.target.value.test = true) {
            console.log(`Вы ввели недопустимое значение`)
        }
    } else {
        console.error (`Can't find element with id`);
    }
})
