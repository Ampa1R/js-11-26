class Main {
    constructor() {
        document.querySelector('.submit').addEventListener('click', (event) => {
            const inputs = document.querySelectorAll('.input');
            console.log(inputs);
            this.check(inputs)
        });
    }

    check(inputs) {

        const checkedInputs = inputs.find((input) => input.name === "name");
        console.log(checkedInputs);
    }
}

const main = new Main();