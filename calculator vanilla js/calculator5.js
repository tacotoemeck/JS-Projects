// assign grid area to the buttons
const buttons = document.querySelectorAll('button');


buttons.forEach(button => {
    button.style.gridArea = button.id;
})

let currentFormula = [];
let currentValue = [0];
let valueEntered = false;

const operatorValues = ['/', '*', '+']

function updateCurrentValue() {


    if (this.classList.value == 'number' || this.id == 'subtract' || this.id == 'decimal' || this.id == 'add') {

        switch (this.innerText) {
            case '-':
                if (currentValue == '0') {
                    currentValue = ['-']
                    displayCurrentValue()
                }
                if (currentValue == '-') {
                    return;
                }
                else {
                    currentFormula += currentValue;
                    displayCurrentFormula();
                    currentValue = ['-']
                    displayCurrentValue();
                }
                break;
            case '+':
                currentFormula += currentValue;
                displayCurrentFormula()
                currentValue = this.innerText;
                displayCurrentValue()
                console.log('add')
                break;

            case '.':
                if (currentValue == '0') {
                    currentValue += '.';
                    displayCurrentValue();
                    return;
                }
                if (currentValue == '-') {
                    currentValue += '0.'
                    displayCurrentValue()
                    return;
                }
                if (currentValue.includes('.')) return;

                else {
                    currentValue += '.';
                    displayCurrentValue()
                }
                break;
            case '0':
                if (currentValue == '-0') return;

            default:
                if (currentValue == '0') {
                    currentValue = [this.innerText];
                    displayCurrentValue()
                    return;
                }
                currentValue += this.innerText;
                displayCurrentValue()
        }
    }
}

buttons.forEach(button => {
    button.addEventListener('click', updateCurrentValue)
})


function displayCurrentValue() {
    display.innerText = currentValue;
}

function displayCurrentFormula() {
    formulaDisplay.innerText = currentFormula;
}

function operatorAction() {

}

buttons.forEach(button => {
    button.addEventListener('click', operatorAction)
})